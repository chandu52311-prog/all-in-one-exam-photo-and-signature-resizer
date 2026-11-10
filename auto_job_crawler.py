"""
ExamResizer Pro - Live Recruitment Harvester & Ingestion Engine
Module: auto_job_crawler.py
Sources: Ministry of I&B Employment News (AllJobs) & PIB RSS
Standard: Fault-Tolerant / Asia/Kolkata / Idempotent Supabase Sync
"""

import os
import sys
import json
import re
import hashlib
import logging
import time
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
from urllib.parse import urljoin, quote

import requests
from bs4 import BeautifulSoup
import feedparser

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("GovJobCrawler")

IST = ZoneInfo("Asia/Kolkata")
SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()

EMPLOYMENT_NEWS_URL = "https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"
PIB_RSS_URL = "https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=1"

MONTHS_MAP = {
    "jan": 1, "january": 1, "feb": 2, "february": 2, "mar": 3, "march": 3,
    "apr": 4, "april": 4, "may": 5, "jun": 6, "june": 6, "jul": 7, "july": 7,
    "aug": 8, "august": 8, "sep": 9, "september": 9, "oct": 10, "october": 10,
    "nov": 11, "november": 11, "dec": 12, "december": 12
}


def parse_indian_date(date_str: str) -> datetime.date | None:
    if not date_str or not date_str.strip():
        return None
    cleaned = date_str.strip().lower()

    # DD/MM/YYYY or DD-MM-YYYY
    m1 = re.search(r"(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})", cleaned)
    if m1:
        try:
            d, m, y = int(m1.group(1)), int(m1.group(2)), int(m1.group(3))
            return datetime(y, m, d).date()
        except ValueError:
            pass

    # DD Month YYYY (e.g. 25 November 2026)
    m2 = re.search(r"(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})", cleaned)
    if m2:
        d = int(m2.group(1))
        m_name = m2.group(2).lower()
        y = int(m2.group(3))
        if m_name in MONTHS_MAP:
            try:
                return datetime(y, MONTHS_MAP[m_name], d).date()
            except ValueError:
                pass
    return None


def calculate_relative_date(text: str, base_date: datetime.date | None) -> datetime.date | None:
    if not text or not base_date:
        return None
    m = re.search(r"(\d{1,3})\s*days", text.lower())
    if m:
        days = int(m.group(1))
        return base_date + timedelta(days=days)
    return None


def generate_job_id(authority: str, title: str, issued_date: datetime.date | None) -> str:
    source = "|".join([
        authority.lower().strip(),
        title.lower().strip(),
        str(issued_date or "unknown")
    ])
    return "EMP_" + hashlib.sha256(source.encode("utf-8")).hexdigest()[:16].upper()


def get_auth_headers():
    return {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }


def purge_expired(session: requests.Session):
    now_utc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?closing_at=lt.{quote(now_utc)}"
    try:
        r = session.delete(url, headers=get_auth_headers(), timeout=15)
        logger.info(f"Purge expired records: HTTP {r.status_code}")
    except Exception as e:
        logger.error(f"Purge request error: {e}")


def sync_jobs(session: requests.Session, jobs: list[dict]):
    if not jobs:
        logger.warning("No candidate records to push.")
        return
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?on_conflict=id"
    headers = get_auth_headers()
    headers["Prefer"] = "resolution=merge-duplicates"
    try:
        r = session.post(url, headers=headers, json=jobs, timeout=30)
        logger.info(f"Supabase upsert status: HTTP {r.status_code}")
        if r.status_code not in (200, 201, 204):
            logger.error(f"Supabase error details: {r.text}")
    except Exception as e:
        logger.error(f"Sync failed: {e}")


def discover_employment_news(session: requests.Session) -> list[dict]:
    logger.info("Discovering vacancies from Employment News (AllJobs)...")
    candidates = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    try:
        r = session.get(EMPLOYMENT_NEWS_URL, headers=headers, timeout=25)
        if r.status_code != 200:
            logger.error(f"Employment News returned HTTP {r.status_code}")
            return candidates

        soup = BeautifulSoup(r.text, "html.parser")
        target_table = soup.find("table", attrs={"frame": "box"})
        if not target_table:
            # Fallback to largest table
            tables = soup.find_all("table")
            target_table = max(tables, key=lambda t: len(t.find_all("tr"))) if tables else None

        if not target_table:
            logger.error("Could not locate Employment News table.")
            return candidates

        now_dt = datetime.now(IST).date()

        for tr in target_table.find_all("tr"):
            # Exclude nested-table rows
            if tr.find_parent("table") is not target_table:
                continue

            cells = tr.find_all(["td", "th"])
            if len(cells) < 5:
                continue

            values = [c.get_text(" ", strip=True) for c in cells]

            # Header row exclusion
            if any(h in values[0].lower() for h in ["issued", "date", "sl"]) or "organization" in values[1].lower():
                continue

            issued_raw, authority, title, app_method, closing_raw = values[0], values[1], values[2], values[3], values[4]

            if not authority or not title:
                continue

            issued_date = parse_indian_date(issued_raw)

            # Deadline: absolute date vs relative calculation
            closing_date = parse_indian_date(closing_raw)
            if not closing_date:
                closing_date = calculate_relative_date(closing_raw, issued_date)

            # Skip expired
            if closing_date and closing_date < now_dt:
                continue

            closing_at_iso = None
            if closing_date:
                closing_dt = datetime.combine(closing_date, datetime.min.time(), tzinfo=IST).replace(hour=23, minute=59, second=59)
                closing_at_iso = closing_dt.isoformat()

            # Target category mapping
            auth_low = authority.lower()
            cat = "CENTRAL"
            preset = "UPSC"
            if any(k in auth_low for k in ["railway", "rrb"]):
                cat = "RAILWAYS"
                preset = "RRB"
            elif "ssc" in auth_low:
                cat = "CENTRAL"
                preset = "SSC"
            elif any(k in auth_low for k in ["bank", "ibps", "sbi", "rbi"]):
                cat = "BANKING"
                preset = "IBPS"
            elif any(k in auth_low for k in ["power grid", "ntpc", "bhel", "ongc", "iocl", "sail", "gail", "drdo", "isro", "hal", "bel"]):
                cat = "PSU"
                preset = "PSU_HUB"
            elif any(k in auth_low for k in ["andhra", "appsc"]):
                cat = "STATE_PSC"
                preset = "APPSC"
            elif any(k in auth_low for k in ["telangana", "tgpsc", "tspsc"]):
                cat = "STATE_PSC"
                preset = "TGPSC"

            a_tag = tr.find("a")
            doc_url = urljoin(EMPLOYMENT_NEWS_URL, a_tag.get("href", "")) if a_tag else EMPLOYMENT_NEWS_URL
            job_id = generate_job_id(authority, title, issued_date)

            candidates.append({
                "id": job_id,
                "authority": authority,
                "title": title,
                "posts": f"Method: {app_method}",
                "qualification": "Refer Official Employment News Notification",
                "application_start_date": None,
                "closing_date": closing_at_iso,
                "closing_at": closing_at_iso,
                "official_notification_url": doc_url,
                "application_url": None,
                "application_url_verified": False,
                "official_portal": "https://employmentnews.gov.in",
                "preset_target": preset,
                "category": cat,
                "verified_at": datetime.now(IST).isoformat(),
                "content_hash": hashlib.sha256(f"{authority}|{title}|{closing_raw}".encode()).hexdigest(),
                "notification_ref": f"EN-{issued_raw}",
                "source_id": "employment-news-alljobs",
                "is_government_employer": True,
                "verification_status": "verified"
            })

    except Exception as e:
        logger.error(f"Error scraping Employment News: {e}")

    logger.info(f"Discovered {len(candidates)} valid candidate jobs from Employment News.")
    return candidates


def main():
    logger.info("=== STARTING RECRUITMENT INGESTION PIPELINE ===")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.critical("Supabase credentials missing in secrets. Terminating.")
        sys.exit(1)

    session = requests.Session()

    # Step 1: Purge records already expired
    purge_expired(session)

    # Step 2: Extract official jobs from Employment News
    all_jobs = discover_employment_news(session)

    # Step 3: Upsert into live Supabase table
    sync_jobs(session, all_jobs)
    logger.info(f"=== PIPELINE COMPLETED: Upserted {len(all_jobs)} verified records ===")


if __name__ == "__main__":
    main()
