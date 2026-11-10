"""
ExamResizer Pro - Official Government Discovery Adapter
Module: crawler/sources.py
Sources: Employment News (MIB) & PIB RSS
"""

import hashlib
import logging
from typing import List, Dict, Any
from datetime import datetime, time
from zoneinfo import ZoneInfo
from urllib.parse import urljoin

from curl_cffi import requests as cr
from bs4 import BeautifulSoup

from crawler.timeutil import IST, find_dates

logger = logging.getLogger("GovJobSources")

EMPLOYMENT_NEWS_URL = "https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"


def discover_employment_news(session: cr.Session) -> List[Dict[str, Any]]:
    """
    Parses the official Ministry of Information & Broadcasting AllJobs portal.
    Exposes: Issued Date, Organization, Post, Method, Last Date.
    """
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
        table = soup.find("table")
        if not table:
            return candidates

        rows = table.find_all("tr")
        now_dt = datetime.now(IST).date()

        for tr in rows[1:]:
            cols = [td.get_text(" ", strip=True) for td in tr.find_all("td")]
            if len(cols) < 5:
                continue

            issued_date_str = cols[0]
            authority = cols[1]
            title = cols[2]
            appointment_method = cols[3]
            closing_date_str = cols[4]

            # Parse Closing Date strictly
            dates = find_dates(closing_date_str)
            if not dates:
                continue

            closing_d = dates[0][2]
            if closing_d < now_dt:
                continue  # Skip already expired notices

            closing_dt = datetime.combine(closing_d, time(23, 59, 59, 999000), tzinfo=IST)

            # Target category mapping
            auth_low = authority.lower()
            cat = "CENTRAL"
            preset = "UPSC"
            if "railway" in auth_low or "rrb" in auth_low:
                cat = "RAILWAYS"
                preset = "RRB"
            elif "ssc" in auth_low:
                cat = "CENTRAL"
                preset = "SSC"
            elif any(p in auth_low for p in ["power grid", "ntpc", "bhel", "ongc", "iocl", "sail", "gail"]):
                cat = "PSU"
                preset = "PSU_HUB"
            elif "andhra" in auth_low or "appsc" in auth_low:
                cat = "STATE_PSC"
                preset = "APPSC"
            elif "telangana" in auth_low or "tgpsc" in auth_low or "tspsc" in auth_low:
                cat = "STATE_PSC"
                preset = "TGPSC"

            # Check links
            a_tag = tr.find("a")
            doc_url = urljoin(EMPLOYMENT_NEWS_URL, a_tag.get("href", "")) if a_tag else EMPLOYMENT_NEWS_URL

            cand_id = f"EMP_{hashlib.md5((authority + title + closing_date_str).encode()).hexdigest()[:16].upper()}"

            candidates.append({
                "id": cand_id,
                "authority": authority,
                "title": title,
                "posts": f"Method: {appointment_method}",
                "qualification": "Refer Official Gazette / Employment News Notice",
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
                "notification_ref": f"EN-Issue-{issued_date_str}",
                "source_id": "employment-news-alljobs",
                "is_government_employer": True,
                "verification_status": "verified"
            })

    except Exception as e:
        logger.error(f"Failed to harvest Employment News: {e}")

    return candidates
