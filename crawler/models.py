"""
ExamResizer Pro - Data Models
Module: crawler/models.py
Strict Datetime Validation, Timezone Normalization, and Safe Verification Defaults
"""

from dataclasses import dataclass
from datetime import date, datetime, time
from typing import Optional, Union
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")


class Rejected(Exception):
    def __init__(self, reason: str, detail: str = ""):
        super().__init__(f"{reason}: {detail}")
        self.reason = reason
        self.detail = detail


@dataclass
class Lead:
    source_id: str
    title: str
    url: str
    listed_pub: Optional[date] = None
    listed_close: Optional[date] = None
    snippet: str = ""


@dataclass
class Job:
    id: str
    authority: str
    title: str
    posts: str
    qualification: str
    application_start_date: Optional[Union[date, datetime]]
    closing_date: Union[date, datetime]
    official_notification_url: str
    application_url: Optional[str]
    official_portal: str
    preset_target: Optional[str]
    category: str
    verified_at: datetime
    content_hash: str
    notification_ref: Optional[str]
    source_id: str
    is_government_employer: bool = False
    verification_status: str = "pending"
    application_url_verified: bool = False

    def to_row(self) -> dict:
        def iso_timestamp(val: Optional[Union[date, datetime]], is_start: bool = False) -> Optional[str]:
            if val is None:
                return None
            if isinstance(val, datetime):
                if val.tzinfo is None or val.utcoffset() is None:
                    raise ValueError(f"Datetime field ({val}) must be explicitly timezone-aware")
                return val.astimezone(IST).isoformat()
            if isinstance(val, date):
                t = time(0, 0, 0) if is_start else time(23, 59, 59, 999000)
                return datetime.combine(val, t, tzinfo=IST).isoformat()
            raise TypeError(f"Unsupported datetime type: {type(val)}")

        def closing_deadline_timestamp(val: Union[date, datetime]) -> str:
            if isinstance(val, datetime):
                if val.tzinfo is None or val.utcoffset() is None:
                    raise ValueError(f"Closing datetime ({val}) must be explicitly timezone-aware")
                return val.astimezone(IST).isoformat()
            if isinstance(val, date):
                return datetime.combine(val, time(23, 59, 59, 999000), tzinfo=IST).isoformat()
            raise TypeError(f"Unsupported closing date type: {type(val)}")

        closing_iso = closing_deadline_timestamp(self.closing_date)

        return {
            "id": self.id,
            "authority": self.authority,
            "title": self.title,
            "posts": self.posts,
            "qualification": self.qualification,
            "application_start_date": iso_timestamp(self.application_start_date, is_start=True),
            "closing_date": closing_iso,
            "closing_at": closing_iso,
            "official_notification_url": self.official_notification_url,
            "application_url": self.application_url,
            "application_url_verified": self.application_url_verified,
            "official_portal": self.official_portal,
            "preset_target": self.preset_target,
            "category": self.category,
            "verified_at": iso_timestamp(self.verified_at),
            "is_government_employer": self.is_government_employer,
            "verification_status": self.verification_status,
            "content_hash": self.content_hash,
            "notification_ref": self.notification_ref,
            "source_id": self.source_id,
        }
