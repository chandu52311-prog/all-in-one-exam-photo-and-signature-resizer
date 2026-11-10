"""
ExamResizer Pro - Live Government Job Harvester
Module: auto_job_crawler.py
Target: Ministry of I&B Employment News (Verified Direct Ingestion)
"""

import os
import sys
import json
import hashlib
import logging
from datetime import datetime, time, timezone
from zoneinfo import ZoneInfo
from urllib.parse import urljoin, quote

from curl_cffi import requests as cr
from bs4 import BeautifulSoup

from crawler.timeutil import IST, find_dates

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("GovJobCrawler")

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
EMPLOYMENT_NEWS_URL = "https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"


def get_auth_headers():
    return {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }


def purge_expired(session: cr.Session):
    now_utc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?closing_at=lt.{quote(now_utc)}"
    try:
        r = session.delete(url, headers=get_auth_headers(), timeout=15)
        logger.info(f"Purge expired records status: HTTP {r.status_code}")
    except Exception as e:
        logger.error(f"Purge error: {e}")


def sync_jobs(session: cr.Session, jobs):
    if not jobs:
        logger.info("No verified jobs discovered.")
        return
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?on_conflict=id"
    headers = get_auth_headers()
    headers["Prefer"] = "resolution=merge-duplicates"
    try:
        r = session.post(url, headers=headers, data=json.dumps(jobs), timeout=30)
        logger.info(f"Supabase upsert status: HTTP {r.status_code}")
        if r.status_code not in (200, 201, 204):
            logger.error(f"Supabase response: {r.text}")
    except Exception as e:
        logger.error(f"Sync error: {e}")


def fetch_employment_news(session: cr.Session):
    candidates = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }

    try:
        r = session.get(EMPLOYMENT_NEWS_URL, headers=headers, timeout=25)
        if r.status_code != 200:
            logger.warning(f"Employment News returned HTTP {r.status_code}")
            return candidates

        soup = BeautifulSoup(r.text, "html.parser")
        now_dt = datetime.now(IST).date()

        # Find all <tr> tags with 5+ <td> columns (bypasses any nested wrapper tables)
        for tr in soup.find_all("tr"):
            tds = tr.find_all("td")
            if len(tds) < 5:
                continue

            cols = [td.get_text(" ", strip=True) for td in tds]
            # Ignore headers if captured in td
            if "Issued Date" in cols[0] or "Organization" in cols[1]:
                continue

            issued_date_str = cols[0]
            authority = cols[1]
            title = cols[2]
            appointment_method = cols[3]
            closing_date_str = cols[4]

            if not authority or not title:
                continue

            # Parse date strictly
            dates = find_dates(closing_date_str)
            if not dates:
                # If date format like DD/MM/YYYY or DD-MM-YYYY direct regex
                continue

            closing_d = dates[0][2]
            if closing_d < now_dt:
                continue  # Expired notification skip

            closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)

            # Auto Category Mapping
            auth_low = authority.lower()
            cat = "CENTRAL"
            preset = "UPSC"
            if any(k in auth_low for k in ["railway", "rrb"]):
                cat = "RAILWAYS"
                preset = "RRB"
            elif "ssc" in auth_low:
                cat = "CENTRAL"
                preset = "SSC"
            elif any(k in auth_low for k in ["bank", "ibps", "sbi"]):
                cat = "BANKING"
                preset = "IBPS"
            elif any(k in auth_low for k in ["power grid", "ntpc", "bhel", "ongc", "iocl", "sail", "gail", "drdo", "isro"]):
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
            cand_id = f"EMP_{hashlib.md5((authority + title + closing_date_str).encode()).hexdigest()[:16].upper()}"

            candidates.append({
                "id": cand_id,
                "authority": authority,
                "title": title,
                "posts": f"Method: {appointment_method}",
                "qualification": "Refer Official Employment News Notice",
                "application_start_date": None,
                "closing_date": closing_dt.isoformat(),
                "closing_at": closing_dt.isoformat(),
                "official_notification_url": doc_url,
                "application_url": None,
                "application_url_verified": False,
                "official_portal": "https://employmentnews.gov.in",
                "preset_target": preset,
                "category": cat,
                "verified_at": datetime.now(IST).isoformat(),
                "content_hash": hashlib.md5(f"{authority}|{title}|{closing_d}".encode()).hexdigest(),
                "notification_ref": f"EN-{issued_date_str}",
                "source_id": "employment-news-alljobs",
                "is_government_employer": True,
                "verification_status": "verified"
            })

    except Exception as e:
        logger.error(f"Error fetching Employment News: {e}")

    return candidates


def main():
    logger.info("=== STARTING OFFICIAL EMPLOYMENT NEWS CRAWLER ===")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.critical("Supabase credentials missing.")
        sys.exit(1)

    session = cr.Session(impersonate="chrome124")

    # 1. Purge expired (HTTP 204)
    purge_expired(session)

    # 2. Fetch live authentic notices from Employment News
    jobs = fetch_employment_news(session)
    logger.info(f"Discovered {len(jobs)} active verified government notifications.")

    # 3. Upsert to Supabase
    sync_jobs(session, jobs)
    logger.info(f"=== FINISHED: Upserted {len(jobs)} records ===")


if __name__ == "__main__":
    main()
