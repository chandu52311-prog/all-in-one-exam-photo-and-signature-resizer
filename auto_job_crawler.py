"""
ExamResizer Pro - Direct Employment News Harvester
Module: auto_job_crawler.py
Target Table: frame="box" verified government vacancy grid
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
TARGET_URL = "https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"


def get_headers():
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
        r = session.delete(url, headers=get_headers(), timeout=15)
        logger.info(f"Purge expired records status: HTTP {r.status_code}")
    except Exception as e:
        logger.error(f"Purge failed: {e}")


def push_to_supabase(session: cr.Session, jobs):
    if not jobs:
        logger.warning("Zero jobs extracted. Check table parsing.")
        return
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?on_conflict=id"
    headers = get_headers()
    headers["Prefer"] = "resolution=merge-duplicates"
    try:
        r = session.post(url, headers=headers, data=json.dumps(jobs), timeout=30)
        logger.info(f"Supabase upsert status: HTTP {r.status_code}")
        if r.status_code not in (200, 201, 204):
            logger.error(f"Supabase response: {r.text}")
    except Exception as e:
        logger.error(f"Push failed: {e}")


def harvest_jobs(session: cr.Session):
    jobs = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
    
    r = session.get(TARGET_URL, headers=headers, timeout=25)
    if r.status_code != 200:
        logger.error(f"Failed to fetch Employment News. HTTP {r.status_code}")
        return jobs

    soup = BeautifulSoup(r.text, "html.parser")
    
    # Matching exact table from log: frame="box"
    table = soup.find("table", attrs={"frame": "box"})
    if not table:
        # Fallback to any table with 5+ cols
        for t in soup.find_all("table"):
            if len(t.find_all("tr")) > 5:
                table = t
                break

    if not table:
        logger.error("Vacancy table not found in HTML!")
        return jobs

    rows = table.find_all("tr")
    now_dt = datetime.now(IST).date()
    logger.info(f"Found table with {len(rows)} raw rows.")

    for tr in rows:
        tds = tr.find_all("td")
        if len(tds) < 5:
            continue

        cols = [td.get_text(" ", strip=True) for td in tds]
        
        # Header row filter
        if any(h in cols[0].lower() for h in ["issued", "date", "sl"]) or "organization" in cols[1].lower():
            continue

        issued_date_str = cols[0]
        authority = cols[1]
        title = cols[2]
        appointment_method = cols[3]
        closing_date_str = cols[4]

        if not authority or not title:
            continue

        # Extract closing date
        dates = find_dates(closing_date_str)
        if dates:
            closing_d = dates[0][2]
        else:
            # Fallback if text format differs
            continue

        if closing_d < now_dt:
            continue  # Expired notice skip

        closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)

        # Categorization logic
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
        doc_url = urljoin(TARGET_URL, a_tag.get("href", "")) if a_tag else TARGET_URL
        job_id = f"EMP_{hashlib.md5((authority + title + str(closing_d)).encode()).hexdigest()[:16].upper()}"

        jobs.append({
            "id": job_id,
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

    return jobs


def main():
    logger.info("=== STARTING EMPLOYMENT NEWS HARVESTER ===")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.critical("Supabase credentials missing.")
        sys.exit(1)

    session = cr.Session(impersonate="chrome124")

    # 1. Purge expired
    purge_expired(session)

    # 2. Extract genuine jobs from matched table
    jobs = harvest_jobs(session)
    logger.info(f"Successfully extracted {len(jobs)} active verified notices.")

    # 3. Push to database
    push_to_supabase(session, jobs)
    logger.info("=== COMPLETE ===")


if __name__ == "__main__":
    main()
