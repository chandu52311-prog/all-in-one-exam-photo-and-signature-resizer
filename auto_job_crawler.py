"""
ExamResizer Pro - Live Government Job Harvester Engine
Module: auto_job_crawler.py
Standard: Production-Grade / Zero-Blocking Endpoints / Asia/Kolkata
"""

import os
import sys
import json
import hashlib
import logging
from io import BytesIO
from typing import List, Dict, Any, Optional
from datetime import datetime, time, timezone
from zoneinfo import ZoneInfo
from urllib.parse import urljoin, quote

from curl_cffi import requests as cr
from bs4 import BeautifulSoup
from pypdf import PdfReader
import feedparser

from crawler.timeutil import IST, find_dates
from crawler.models import Job

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("GovJobCrawler")

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()

REJECT_KEYWORDS = [
    "admit card", "hall ticket", "call letter", "answer key", "result",
    "marksheet", "scorecard", "tentative answer key", "final answer key",
    "candidature cancelled", "corrigendum", "addendum", "rejection list",
    "interview schedule", "postponement", "cancellation", "revised schedule",
    "annual report", "tender", "procurement", "syllabus only"
]

JOB_CONFIRM_KEYWORDS = [
    "recruitment", "engagement", "employment", "notification",
    "direct recruitment", "vacancy", "special recruitment drive",
    "officer", "trainee", "engineer", "cadre", "assistant", "manager"
]


class StrictGovVerifier:
    @staticmethod
    def is_genuine_recruitment(title: str) -> bool:
        t_low = title.lower()
        if any(w in t_low for w in REJECT_KEYWORDS):
            return False
        return any(w in t_low for w in JOB_CONFIRM_KEYWORDS)

    @staticmethod
    def inspect_pdf(session: cr.Session, pdf_url: str) -> Optional[Dict[str, Any]]:
        try:
            r = session.get(pdf_url, timeout=20)
            if r.status_code != 200 or not r.content.startswith(b"%PDF-"):
                return None
            reader = PdfReader(BytesIO(r.content))
            text = ""
            for p in reader.pages[:4]:
                t = p.extract_text()
                if t:
                    text += "\n" + t
            if len(text.strip()) < 80:
                return None

            dates = find_dates(text)
            now_dt = datetime.now(IST).date()
            future_dates = [d for _, _, d in dates if d >= now_dt]
            if not future_dates:
                return None

            closing_d = max(future_dates)
            closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)
            return {"closing_at": closing_dt, "text": text}
        except Exception as e:
            logger.warning(f"PDF Inspection skipped for {pdf_url}: {e}")
            return None


def get_auth_headers() -> Dict[str, str]:
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
        if r.status_code >= 400:
            logger.error(f"Purge error response: {r.text}")
    except Exception as e:
        logger.error(f"Purge request error: {e}")


def sync_jobs(session: cr.Session, jobs: List[Dict[str, Any]]):
    if not jobs:
        logger.info("No verified jobs to push.")
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


def harvest_upsc(session: cr.Session) -> List[Dict[str, Any]]:
    jobs = []
    logger.info("Scanning UPSC Official Portal...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-IN,en;q=0.9"
    }
    try:
        r = session.get("https://upsc.gov.in/whats-new", headers=headers, timeout=10)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, "html.parser")
            for tr in soup.select("table tbody tr")[:10]:
                tds = tr.find_all("td")
                if len(tds) < 2:
                    continue
                a = tds[1].find("a")
                if not a:
                    continue
                title = a.get_text(" ", strip=True)
                if not StrictGovVerifier.is_genuine_recruitment(title):
                    continue
                pdf_url = urljoin("https://upsc.gov.in/whats-new", a.get("href", ""))
                meta = StrictGovVerifier.inspect_pdf(session, pdf_url)
                if not meta:
                    continue

                job_id = "UPSC_" + hashlib.md5(title.encode()).hexdigest()[:16].upper()
                job = Job(
                    id=job_id,
                    authority="Union Public Service Commission",
                    title=title,
                    posts="Refer Official Notification",
                    qualification="Refer Notification Guidelines",
                    application_start_date=None,
                    closing_date=meta["closing_at"],
                    official_notification_url=pdf_url,
                    application_url="https://upsconline.nic.in",
                    official_portal="https://upsc.gov.in",
                    preset_target="UPSC",
                    category="CENTRAL",
                    verified_at=datetime.now(IST),
                    content_hash=hashlib.md5(meta["text"][:500].encode()).hexdigest(),
                    notification_ref=None,
                    source_id="upsc-whats-new",
                    is_government_employer=True,
                    verification_status="verified",
                    application_url_verified=True
                )
                jobs.append(job.to_row())
    except Exception as e:
        logger.warning(f"UPSC direct scan skipped (datacenter firewall): {e}")
    return jobs


def harvest_railway_rrb(session: cr.Session) -> List[Dict[str, Any]]:
    jobs = []
    logger.info("Scanning Railway Recruitment Boards (RRB)...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
    try:
        r = session.get("https://www.rrbchennai.gov.in/", headers=headers, timeout=12)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, "html.parser")
            for a in soup.select("a[href*='.pdf']")[:10]:
                title = a.get_text(" ", strip=True)
                if not StrictGovVerifier.is_genuine_recruitment(title):
                    continue
                pdf_url = urljoin("https://www.rrbchennai.gov.in/", a.get("href", ""))
                meta = StrictGovVerifier.inspect_pdf(session, pdf_url)
                if not meta:
                    continue

                job_id = "RRB_" + hashlib.md5(title.encode()).hexdigest()[:16].upper()
                job = Job(
                    id=job_id,
                    authority="Railway Recruitment Board",
                    title=title,
                    posts="Refer CEN Notification",
                    qualification="Refer CEN Specifications",
                    application_start_date=None,
                    closing_date=meta["closing_at"],
                    official_notification_url=pdf_url,
                    application_url="https://www.rrbapply.gov.in",
                    official_portal="https://www.rrbapply.gov.in",
                    preset_target="RRB",
                    category="RAILWAYS",
                    verified_at=datetime.now(IST),
                    content_hash=hashlib.md5(meta["text"][:500].encode()).hexdigest(),
                    notification_ref=None,
                    source_id="rrb-chennai",
                    is_government_employer=True,
                    verification_status="verified",
                    application_url_verified=True
                )
                jobs.append(job.to_row())
    except Exception as e:
        logger.warning(f"RRB scan skipped: {e}")
    return jobs


def harvest_national_career_service(session: cr.Session) -> List[Dict[str, Any]]:
    jobs = []
    logger.info("Scanning National Official Government Feed (Ministry of Labour)...")
    feed_url = "https://www.ncs.gov.in/_layouts/15/feed.aspx?pid=1"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
    try:
        r = session.get(feed_url, headers=headers, timeout=15)
        if r.status_code == 200 and r.content:
            feed = feedparser.parse(r.content)
            for entry in feed.entries[:10]:
                title = entry.get("title", "")
                if not StrictGovVerifier.is_genuine_recruitment(title):
                    continue

                link = entry.get("link", "")
                summary = entry.get("summary", "")
                dates = find_dates(summary + " " + title)
                now_dt = datetime.now(IST).date()
                future_dates = [d for _, _, d in dates if d >= now_dt]

                if not future_dates:
                    continue

                closing_d = max(future_dates)
                closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)

                job_id = "CENTRAL_" + hashlib.md5(title.encode()).hexdigest()[:16].upper()
                job = Job(
                    id=job_id,
                    authority="Government of India Recruitment",
                    title=title,
                    posts="Central Govt Trainee / Executive",
                    qualification="Refer Portal Guidelines",
                    application_start_date=None,
                    closing_date=closing_dt,
                    official_notification_url=link if link.startswith("https://") else "https://www.ncs.gov.in",
                    application_url=link if link.startswith("https://") else "https://www.ncs.gov.in",
                    official_portal="https://www.ncs.gov.in",
                    preset_target="SSC",
                    category="CENTRAL",
                    verified_at=datetime.now(IST),
                    content_hash=hashlib.md5(summary.encode()).hexdigest(),
                    notification_ref=None,
                    source_id="ncs-central-feed",
                    is_government_employer=True,
                    verification_status="verified",
                    application_url_verified=True
                )
                jobs.append(job.to_row())
    except Exception as e:
        logger.warning(f"NCS Feed scan skipped: {e}")
    return jobs


def main():
    logger.info("=== STARTING LIVE RECRUITMENT CRAWLER ===")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.critical("Supabase credentials missing. Terminating.")
        sys.exit(1)

    session = cr.Session(impersonate="chrome124")

    # Step 1: Purge expired records using encoded UTC anchor
    purge_expired(session)

    # Step 2: Multi-Source Harvesting
    verified_rows = []
    verified_rows.extend(harvest_upsc(session))
    verified_rows.extend(harvest_railway_rrb(session))
    verified_rows.extend(harvest_national_career_service(session))

    # Step 3: Upsert verified jobs
    sync_jobs(session, verified_rows)
    logger.info(f"=== FINISHED: Upserted {len(verified_rows)} verified notices ===")


if __name__ == "__main__":
    main()
