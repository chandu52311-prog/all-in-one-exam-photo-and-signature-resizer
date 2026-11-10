"""
Time handling for ExamResizer Pro Crawler.
EXPIRY RULE: Date-only deadlines expire at 23:59:59.999 IST.
"""
import re
from datetime import date, datetime, time
from typing import List, Optional, Tuple
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")
MONTHS = {m: i for i, m in enumerate(
    ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}

_DATE_PATTERNS = [
    (re.compile(r"\b(\d{4})-(\d{2})-(\d{2})\b"), lambda g: (int(g[0]), int(g[1]), int(g[2]))),
    (re.compile(r"\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b"), lambda g: (int(g[2]), int(g[1]), int(g[0]))),
    (re.compile(r"\b(\d{1,2})(?:st|nd|rd|th)?[\s,.\-]+(?:of\s+)?([A-Za-z]{3,9})\.?,?[\s.\-]+(\d{4})\b"),
     lambda g: (int(g[2]), MONTHS.get(g[1][:3].lower(), 0), int(g[0]))),
    (re.compile(r"\b([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b"),
     lambda g: (int(g[2]), MONTHS.get(g[0][:3].lower(), 0), int(g[1]))),
]


def now_ist() -> datetime:
    return datetime.now(IST)


def end_of_day(d: date) -> datetime:
    return datetime.combine(d, time(23, 59, 59, 999000), tzinfo=IST)


def start_of_day(d: date) -> datetime:
    return datetime.combine(d, time(0, 0, 0), tzinfo=IST)


def is_active(start: Optional[datetime], closing: Optional[datetime], now: Optional[datetime] = None) -> bool:
    now = now or now_ist()
    if closing is None or now > closing:
        return False
    return not (start is not None and start > now)


def find_dates(text: str) -> List[Tuple[int, int, date]]:
    out, taken = [], []
    for rx, conv in _DATE_PATTERNS:
        for m in rx.finditer(text):
            if any(m.start() < e and m.end() > s for s, e in taken):
                continue
            y, mo, d = conv(m.groups())
            try:
                dt = date(y, mo, d)
            except ValueError:
                continue
            if not 2000 <= y <= 2100:
                continue
            out.append((m.start(), m.end(), dt))
            taken.append((m.start(), m.end()))
    return sorted(out)
