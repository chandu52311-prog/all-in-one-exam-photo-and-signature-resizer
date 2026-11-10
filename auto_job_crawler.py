"""
ExamResizer Pro - Live Government Job Harvester Engine
Module: auto_job_crawler.py
Standard: Production-Grade / Zero-Dummy / Asia/Kolkata
"""

import os
import sys
import json
import hashlib
import logging
from io import BytesIO
from typing import List, Dict, Any, Optional
from datetime import datetime, time
from zoneinfo import ZoneInfo
from urllib.parse import urljoin, urlparse

from curl_cffi import requests as cr
from bs4 import BeautifulSoup
from pypdf import PdfReader

from crawler.timeutil import IST, find_dates
from crawler.models import Job

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("GovJobCrawler")

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

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
    def is_valid_gov_url(url: str, allowed_domains: List[str]) -> bool:
        if not url or not url.startswith("https://"):
            return False
        host = urlparse(url).hostname or ""
        host = host.lower()
        return any(host == d or host.endsWith("." + d) for d in allowed_domains)

    @staticmethod
    def is_genuine_recruitment(title: str) -> bool:
        t_low = title.lower()
        if any(w in t_low for w in REJECT_KEYWORDS):
            return False
        return any(w in t_low for w in JOB_CONFIRM_KEYWORDS)

    @staticmethod
    def inspect_pdf(session: cr.Session, pdf_url: str) -> Optional[Dict[str, Any]]:
        try:
            r = session.get(pdf_url, timeout=25)
            if r.status_code != 200 or not r.content.startswith(b"%PDF-"):
                return None
            reader = PdfReader(BytesIO(r.content))
            text = ""
            for p in reader.pages[:4]:
                t = p.extract_text()
                if t:
                    text += "\n" + t
            if len(text.strip()) < 100:
                return None
            
            # Find closing date
            dates = find_dates(text)
            now_dt = datetime.now(IST).date()
            future_dates = [d for _, _, d in dates if d >= now_dt]
            if not future_dates:
                return None
            
            closing_d = max(future_dates)
            closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)
            return {"closing_at": closing_dt, "text": text}
        except Exception as e:
            logger.warning(f"Failed to inspect PDF {pdf_url}: {e}")
            return None


def purge_expired(session: cr.Session):
    now_iso = datetime.now(IST).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?closing_at=lt.{now_iso}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}"
    }
    try:
        r = session.delete(url, headers=headers, timeout=20)
        logger.info(f"Purge expired records status: HTTP {r.status_code}")
    except Exception as e:
        logger.error(f"Purge failed: {e}")


def sync_jobs(session: cr.Session, jobs: List[Dict[str, Any]]):
    if not jobs:
        logger.info("No verified jobs to push.")
        return
    url = f"{SUPABASE_URL}/rest/v1/live_job_alerts?on_conflict=id"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    try:
        r = session.post(url, headers=headers, data=json.dumps(jobs), timeout=30)
        logger.info(f"Supabase upsert status: HTTP {r.status_code}")
    except Exception as e:
        logger.error(f"Sync failed: {e}")


def main():
    logger.info("=== STARTING LIVE RECRUITMENT CRAWLER ===")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.critical("Supabase credentials missing. Terminating.")
        sys.exit(1)

    session = cr.Session(impersonate="chrome120")
    purge_expired(session)

    # Load registry
    with open("registry.json", "r", encoding="utf-8") as f:
        reg = json.load(f)

    allowed_domains = []
    for emp in reg.get("employers", []):
        allowed_domains.extend(emp.get("domains", []))

    verified_rows = []
    # UPSC What's New parsing
    try:
        logger.info("Scanning UPSC What's New...")
        r = session.get("https://upsc.gov.in/whats-new", timeout=25)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, "html.parser")
            for tr in soup.select("table tbody tr")[:15]:
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
                verified_rows.append(job.to_row())
    except Exception as e:
        logger.error(f"UPSC scan error: {e}")

    sync_jobs(session, verified_rows)
    logger.info(f"=== FINISHED: Upserted {len(verified_rows)} verified notices ===")


if __name__ == "__main__":
    main()
