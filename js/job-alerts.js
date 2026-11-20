/**
 * ExamResizer - Live Government Recruitment & Examination Notifications
 * Frontend reads only verified records from Supabase.
 * No fabricated notification, vacancy, deadline or application URL is rendered.
 */

const SUPABASE_API_URL = "https://znkwwzasysqkvtclmktd.supabase.co/rest/v1";
const SUPABASE_ANON_KEY = "sb_publishable_2BqA77mr-KyhwkqRcYMh0g_tQbM_zE9";
const IST = "Asia/Kolkata";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const OFFICIAL_PORTALS = {
  UPSC: "https://upsc.gov.in/",
  SSC: "https://ssc.gov.in/",
  RAILWAYS: "https://www.rrbapply.gov.in/",
  STATE_PSC: "https://www.indiacode.nic.in/",
  APPSC: "https://psc.ap.gov.in/",
  TGPSC: "https://www.tgpsc.gov.in/",
  STATE_GOVT: "https://www.india.gov.in/topics/labour-employment",
  BANKING: "https://www.ibps.in/",
  SBI: "https://sbi.co.in/web/careers",
  DEFENCE: "https://www.indianarmy.nic.in/",
  PSU: "https://employmentnews.gov.in/",
  IBPS: "https://www.ibps.in/"
};

const CATEGORIES = [
  { key: "ALL", label: "All Active Alerts" },
  { key: "UPSC", label: "UPSC" },
  { key: "UPSC_CSE", label: "UPSC Civil Services" },
  { key: "UPSC_IFS", label: "UPSC Forest Service" },
  { key: "UPSC_ESE", label: "UPSC Engineering Services" },
  { key: "UPSC_CDS", label: "UPSC CDS" },
  { key: "UPSC_NDA", label: "UPSC NDA" },
  { key: "UPSC_CAPF", label: "UPSC CAPF" },
  { key: "SSC", label: "SSC" },
  { key: "SSC_CGL", label: "SSC CGL" },
  { key: "SSC_CHSL", label: "SSC CHSL" },
  { key: "SSC_MTS", label: "SSC MTS" },
  { key: "SSC_CPO", label: "SSC CPO" },
  { key: "SSC_GD", label: "SSC GD" },
  { key: "SSC_JE", label: "SSC JE" },
  { key: "SSC_STENOGRAPHER", label: "SSC Stenographer" },
  { key: "RAILWAYS", label: "Railways (RRB)" },
  { key: "RRB_NTPC_GRAD", label: "RRB NTPC Graduate" },
  { key: "RRB_NTPC_UNDERGRAD", label: "RRB NTPC Undergraduate" },
  { key: "RRB_GROUP_D", label: "RRB Group D" },
  { key: "RRB_JE", label: "RRB JE" },
  { key: "RRB_ALP", label: "RRB ALP" },
  { key: "RRB_TECHNICIAN", label: "RRB Technician" },
  { key: "RPF", label: "RPF Recruitment" },
  { key: "STATE_PSC", label: "State PSCs" },
  { key: "APPSC", label: "APPSC" },
  { key: "TGPSC", label: "TGPSC" },
  { key: "STATE_GOVT", label: "State Government" },
  { key: "STATE_AP", label: "Andhra Pradesh Government" },
  { key: "STATE_TG", label: "Telangana Government" },
  { key: "BANKING", label: "Banking" },
  { key: "IBPS_PO", label: "IBPS PO" },
  { key: "IBPS_CLERK", label: "IBPS Clerk" },
  { key: "SBI_PO", label: "SBI PO" },
  { key: "SBI_CLERK", label: "SBI Clerk" },
  { key: "RBI", label: "RBI" },
  { key: "DEFENCE", label: "Defence" },
  { key: "ARMY", label: "Indian Army" },
  { key: "NAVY", label: "Indian Navy" },
  { key: "AIR_FORCE", label: "Indian Air Force" },
  { key: "PSU", label: "PSU & Power" },
  { key: "NTPC", label: "NTPC" },
  { key: "BHEL", label: "BHEL" },
  { key: "POWERGRID", label: "POWERGRID" },
  { key: "NHPC", label: "NHPC" },
  { key: "ONGC", label: "ONGC" },
  { key: "IOCL", label: "IOCL" },
  { key: "GAIL", label: "GAIL" },
  { key: "ARCHIVED", label: "Archived" }
];

function parseIST(value, endOfDay = false) {
  if (!value || typeof value !== "string") return null;
  const cleaned = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    const timePart = endOfDay ? "23:59:59.999" : "00:00:00.000";
    const date = new Date(`${cleaned}T${timePart}+05:30`);
    return Number.isFinite(date.getTime()) ? date : null;
  }
  const date = new Date(cleaned);
  return Number.isFinite(date.getTime()) ? date : null;
}

function formatIST(value, endOfDay = false) {
  const date = parseIST(value, endOfDay);
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: IST,
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(date) + " IST";
  } catch {
    return "";
  }
}

function closingValue(item) {
  return item?.closing_at || item?.last_date || item?.closing_date || "";
}

function openingValue(item) {
  return item?.application_start_date || item?.registration_start_date || item?.opening_date || "";
}

function isOpenRecord(item, now = new Date()) {
  if (!item) return false;
  if (item.disabled === true) return false;
  if (item.verification_status !== "verified") return false;
  if (item.is_government_employer !== true) return false;

  const rawClosing = closingValue(item);
  if (!rawClosing) return false;
  const closing = parseIST(rawClosing, true);
  if (!closing || closing.getTime() <= now.getTime()) return false;

  const rawOpening = openingValue(item);
  if (rawOpening) {
    const opening = parseIST(rawOpening, false);
    if (opening && opening.getTime() > now.getTime()) return false;
  }
  return true;
}

function safeOfficialUrl(value) {
  if (!value || typeof value !== "string") return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    const host = url.hostname.toLowerCase();
    const allowed = [
      ".gov.in", ".nic.in", "gov.in", "nic.in",
      "ibps.in", "sbi.co.in", "employmentnews.gov.in",
      "rrbapply.gov.in", "nta.ac.in", "gate.iitr.ac.in"
    ];
    if (!allowed.some(domain => host === domain || host.endsWith(domain))) return "";
    return url.href;
  } catch {
    return "";
  }
}

function categoryForItem(item) {
  const explicit = String(item?.category || "").trim().toUpperCase();
  if (explicit) return explicit;
  const text = `${item?.authority || ""} ${item?.title || ""} ${item?.organization || ""}`.toUpperCase();
  if (/UPSC/.test(text)) return "UPSC";
  if (/\bSSC\b/.test(text)) return "SSC";
  if (/RRB|RAILWAY|RPF/.test(text)) return "RAILWAYS";
  if (/APPSC|TGPSC|TSPSC|STATE PSC|PUBLIC SERVICE COMMISSION/.test(text)) return "STATE_PSC";
  if (/IBPS|SBI|RBI|BANK/.test(text)) return "BANKING";
  if (/ARMY|NAVY|AIR FORCE|DEFENCE|CAPF/.test(text)) return "DEFENCE";
  if (/NTPC|BHEL|POWERGRID|PGCIL|NHPC|ONGC|IOCL|GAIL|PSU|UTILITY/.test(text)) return "PSU";
  if (/STATE GOVERNMENT|POLICE|DEPARTMENT/.test(text)) return "STATE_GOVT";
  return "STATE_GOVT";
}

const JobAlertsRegistry = {
  activeCategory: "ALL",
  activeSection: "ACTIVE",
  search: "",
  state: "",
  sort: "newest",
  openOnly: false,
  closingSoon: false,
  newlyReleased: false,
  upcoming: false,
  records: [],
  archiveRecords: [],
  isLoading: false,
  loadError: false,
  lastSuccessfulFetch: null,
  abortController: null,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.renderSkeleton();
    this.fetchRecords();
  },

  renderSkeleton() {
    const root = document.getElementById("jobs-zone");
    if (!root) return;
    const staticGuide = document.getElementById("jobAlertsGuide");
    const guideHtml = staticGuide ? staticGuide.outerHTML : "";
    const staticSources = document.getElementById("officialSourcesBoard");
    const sourcesHtml = staticSources ? staticSources.outerHTML : "";

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-5 border border-rose-500/30 space-y-5">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-black text-xl text-white">Live Government Jobs &amp; Notifications</h2>
            <p class="text-xs text-slate-400">Official verified records • Asia/Kolkata deadline handling</p>
          </div>
          <button type="button" onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white">← Resizer</button>
        </div>

        <div id="organizationCategoryTabs" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          ${CATEGORIES.map(category => `
            <button type="button" data-category="${category.key}" id="job-category-${category.key}"
              class="exam-btn p-2.5 text-xs ${category.key === "ALL" ? "active" : ""}">
              ${esc(category.label)}
            </button>
          `).join("")}
        </div>

        <div class="grid md:grid-cols-[1fr_180px_180px] gap-2.5">
          <label>
            <span class="sr-only">Search notifications</span>
            <input id="jobSearchInput" type="search" autocomplete="off"
              placeholder="Search exam, organization or qualification"
              class="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-400">
          </label>
          <select id="jobStateFilter" aria-label="Filter by state"
            class="bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white outline-none">
            <option value="">All States</option>
            <option value="ANDHRA PRADESH">Andhra Pradesh</option>
            <option value="TELANGANA">Telangana</option>
            <option value="OTHER">Other State</option>
          </select>
          <select id="jobSortSelect" aria-label="Sort notifications"
            class="bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white outline-none">
            <option value="newest">Newest Notification</option>
            <option value="closing">Closing Date</option>
            <option value="exam">Examination Date</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-2 text-[11px]" id="jobQuickFilters">
          <button type="button" data-quick="open" class="exam-btn px-3 py-1.5">Applications Open</button>
          <button type="button" data-quick="upcoming" class="exam-btn px-3 py-1.5">Upcoming Examinations</button>
          <button type="button" data-quick="closing" class="exam-btn px-3 py-1.5">Closing Soon</button>
          <button type="button" data-quick="new" class="exam-btn px-3 py-1.5">Newly Released</button>
        </div>

        <div id="jobSectionTabs" class="tab-pills">
          <button type="button" data-section="ACTIVE" class="tab-btn active">Active Notifications</button>
          <button type="button" data-section="CLOSING_SOON" class="tab-btn">Closing Soon</button>
          <button type="button" data-section="NEW" class="tab-btn">Newly Released</button>
          <button type="button" data-section="UPCOMING" class="tab-btn">Upcoming Exams</button>
          <button type="button" data-section="ARCHIVED" class="tab-btn">Archived</button>
        </div>

        <div id="jobLastVerified" class="text-[11px] text-slate-400"></div>
        <div id="alerts-listing-container" class="space-y-3.5">
          <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/5">
            Checking official verified records…
          </div>
        </div>
        ${sourcesHtml}
        ${guideHtml}
      </div>
    `;

    root.onclick = (event) => {
      const category = event.target.closest("[data-category]");
      if (category) this.setCategory(category.dataset.category);
      const quick = event.target.closest("[data-quick]");
      if (quick) this.toggleQuickFilter(quick.dataset.quick, quick);
      const section = event.target.closest("[data-section]");
      if (section) this.setSection(section.dataset.section, section);
    };

    const search = document.getElementById("jobSearchInput");
    search?.addEventListener("input", event => {
      this.search = event.target.value.trim();
      this.renderListing();
    });
    document.getElementById("jobStateFilter")?.addEventListener("change", event => {
      this.state = event.target.value;
      this.renderListing();
    });
    document.getElementById("jobSortSelect")?.addEventListener("change", event => {
      this.sort = event.target.value;
      this.renderListing();
    });

    if (window.lucide) window.lucide.createIcons();
  },

  setCategory(category) {
    if (!CATEGORIES.some(item => item.key === category)) return;
    this.activeCategory = category;
    document.querySelectorAll("[id^='job-category-']").forEach(button => button.classList.remove("active"));
    document.getElementById(`job-category-${category}`)?.classList.add("active");
    if (category === "ARCHIVED") this.activeSection = "ARCHIVED";
    this.renderListing();
  },

  toggleQuickFilter(key, button) {
    if (key === "open") this.openOnly = !this.openOnly;
    if (key === "upcoming") this.upcoming = !this.upcoming;
    if (key === "closing") this.closingSoon = !this.closingSoon;
    if (key === "new") this.newlyReleased = !this.newlyReleased;
    button.classList.toggle("active");
    this.renderListing();
  },

  setSection(section, button) {
    this.activeSection = section;
    document.querySelectorAll("#jobSectionTabs [data-section]").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
    this.renderListing();
  },

  async fetchRecords(silent = false) {
    if (this.abortController) this.abortController.abort();
    this.abortController = new AbortController();
    this.isLoading = true;
    if (!silent) this.renderListing();

    const columns = [
      "id","authority","organization","title","notification_number","exam_name",
      "posts","qualification","age_limit","fee","vacancies","application_start_date",
      "closing_at","closing_date","last_date","exam_date","official_notification_url",
      "notification_pdf_url","application_url","application_url_verified","official_portal",
      "category","state","verified_at","verification_status","is_government_employer",
      "disabled","status","released_at","source_url"
    ].join(",");

    try {
      const url = new URL(`${SUPABASE_API_URL}/live_job_alerts`);
      url.searchParams.set("select", "*");
      url.searchParams.set("order", "released_at.desc.nullslast,verified_at.desc");
      url.searchParams.set("limit", "500");

      const response = await fetch(url, {
        signal: this.abortController.signal,
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new Error("Invalid notification payload");

      const now = new Date();
      const active = [];
      const archived = [];
      for (const row of rows) {
        if (!row || row.disabled === true) continue;
        if (row.verification_status !== "verified" || row.is_government_employer !== true) continue;
        const rawClosing = closingValue(row);
        const closing = parseIST(rawClosing, true);
        if (!closing) {
          archived.push({ ...row, _category: categoryForItem(row), _archivedReason: "Awaiting Official Verification" });
          continue;
        }
        if (closing.getTime() <= now.getTime()) {
          archived.push({ ...row, _category: categoryForItem(row), _archivedReason: "Application Closed" });
        } else {
          active.push({ ...row, _category: categoryForItem(row) });
        }
      }
      this.records = active;
      this.archiveRecords = archived;
      this.loadError = false;
      this.lastSuccessfulFetch = now;
    } catch (error) {
      if (error.name !== "AbortError") this.loadError = true;
    } finally {
      this.isLoading = false;
      this.renderListing();
    }
  },

  getFilteredRecords() {
    const now = new Date();
    let source = this.activeSection === "ARCHIVED"
      ? this.archiveRecords
      : this.records.filter(record => isOpenRecord(record, now));

    if (this.activeCategory !== "ALL") {
      source = source.filter(record => {
        const recordCategory = String(record._category || record.category || "").trim().toUpperCase();
        const selected = this.activeCategory;
        if (recordCategory === selected) return true;
        if (selected === "UPSC") return recordCategory === "UPSC" || recordCategory.startsWith("UPSC_") || /UNION PUBLIC SERVICE COMMISSION|UPSC/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "SSC") return recordCategory === "SSC" || recordCategory.startsWith("SSC_") || /\bSSC\b/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "RAILWAYS") return recordCategory === "RAILWAYS" || recordCategory.startsWith("RRB") || recordCategory === "RPF" || /RAILWAY|RRB|RPF/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "STATE_PSC") return recordCategory === "STATE_PSC" || recordCategory === "APPSC" || recordCategory === "TGPSC" || /APPSC|TGPSC|TSPSC|PUBLIC SERVICE COMMISSION/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "STATE_GOVT") return recordCategory === "STATE_GOVT" || recordCategory.startsWith("STATE_AP") || recordCategory.startsWith("STATE_TG");
        if (selected === "BANKING") return recordCategory === "BANKING" || /IBPS|SBI|RBI|BANK/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "DEFENCE") return recordCategory === "DEFENCE" || ["ARMY","NAVY","AIR_FORCE"].includes(recordCategory) || /ARMY|NAVY|AIR FORCE|DEFENCE/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected === "PSU") return recordCategory === "PSU" || ["NTPC","BHEL","POWERGRID","NHPC","ONGC","IOCL","GAIL"].includes(recordCategory) || /PSU|NTPC|BHEL|POWERGRID|PGCIL|NHPC|ONGC|IOCL|GAIL/.test(`${record.authority || ""} ${record.title || ""}`.toUpperCase());
        if (selected.startsWith("RRB_")) return recordCategory === selected;
        if (selected.startsWith("SSC_")) return recordCategory === selected;
        if (selected.startsWith("UPSC_")) return recordCategory === selected;
        if (selected.startsWith("STATE_")) return recordCategory === selected;
        if (["IBPS_PO","IBPS_CLERK","SBI_PO","SBI_CLERK","RBI","ARMY","NAVY","AIR_FORCE","NTPC","BHEL","POWERGRID","NHPC","ONGC","IOCL","GAIL","APPSC","TGPSC","RPF"].includes(selected)) return recordCategory === selected;
        return false;
      });
    }

    if (this.state) {
      source = source.filter(record => String(record.state || "").toUpperCase().includes(this.state));
    }

    if (this.search) {
      const needle = this.search.toLowerCase();
      source = source.filter(record => [
        record.title, record.exam_name, record.authority, record.organization,
        record.qualification, record.posts, record.notification_number
      ].some(value => String(value || "").toLowerCase().includes(needle)));
    }

    if (this.openOnly) {
      source = source.filter(record => {
        const opening = parseIST(openingValue(record), false);
        return !opening || opening.getTime() <= now.getTime();
      });
    }
    if (this.closingSoon) {
      source = source.filter(record => {
        const closing = parseIST(closingValue(record), true);
        return closing && closing.getTime() - now.getTime() <= 7 * 24 * 60 * 60 * 1000;
      });
    }
    if (this.newlyReleased) {
      source = source.filter(record => {
        const released = parseIST(record.released_at, false);
        return released && now.getTime() - released.getTime() <= 14 * 24 * 60 * 60 * 1000;
      });
    }
    if (this.upcoming) {
      source = source.filter(record => {
        const opening = parseIST(openingValue(record), false);
        return opening && opening.getTime() > now.getTime();
      });
    }
    if (this.activeSection === "CLOSING_SOON") {
      source = source.filter(record => {
        const closing = parseIST(closingValue(record), true);
        return closing && closing.getTime() - now.getTime() <= 7 * 24 * 60 * 60 * 1000;
      });
    }
    if (this.activeSection === "NEW") {
      source = source.filter(record => {
        const released = parseIST(record.released_at, false);
        return released && now.getTime() - released.getTime() <= 14 * 24 * 60 * 60 * 1000;
      });
    }
    if (this.activeSection === "UPCOMING") {
      source = source.filter(record => {
        const opening = parseIST(openingValue(record), false);
        return opening && opening.getTime() > now.getTime();
      });
    }

    if (this.sort === "closing") {
      source.sort((a, b) => (parseIST(closingValue(a), true)?.getTime() || Infinity) - (parseIST(closingValue(b), true)?.getTime() || Infinity));
    } else if (this.sort === "exam") {
      source.sort((a, b) => (parseIST(a.exam_date, false)?.getTime() || Infinity) - (parseIST(b.exam_date, false)?.getTime() || Infinity));
    } else {
      source.sort((a, b) => (parseIST(b.released_at, false)?.getTime() || 0) - (parseIST(a.released_at, false)?.getTime() || 0));
    }
    return source;
  },

  countdown(record) {
    const closing = parseIST(closingValue(record), true);
    if (!closing) return "Awaiting Official Verification";
    const milliseconds = closing.getTime() - Date.now();
    if (milliseconds <= 0) return "Application Closed";
    const days = Math.floor(milliseconds / 86400000);
    const hours = Math.floor((milliseconds % 86400000) / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return `${days}d ${hours}h ${minutes}m remaining`;
  },

  renderListing() {
    const container = document.getElementById("alerts-listing-container");
    if (!container) return;
    const now = new Date();
    const filtered = this.getFilteredRecords();

    const verification = document.getElementById("jobLastVerified");
    if (verification) {
      verification.textContent = this.lastSuccessfulFetch
        ? `Last successful database verification: ${formatIST(this.lastSuccessfulFetch.toISOString())}`
        : "Official records are verified when sourced by the recruitment registry.";
    }

    if (this.isLoading && filtered.length === 0) {
      container.innerHTML = `<div class="p-8 text-center text-xs text-slate-400 border border-white/10 rounded-xl">Checking official verified records…</div>`;
      return;
    }

    if (filtered.length === 0) {
      const categoryLabel = CATEGORIES.find(item => item.key === this.activeCategory)?.label || "Selected category";
      container.innerHTML = `
        <div class="p-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.04] space-y-2">
          <h3 class="text-sm font-black text-amber-300">No active official notifications found</h3>
          <p class="text-xs text-slate-300">${esc(categoryLabel)} has no verified open record matching the current filters. This is not an official recruitment status.</p>
          <p class="text-[11px] text-slate-400">Verify the latest notification, corrigendum and application window on the official organization website.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `<div class="grid md:grid-cols-2 gap-3">${filtered.map(record => this.card(record, now)).join("")}</div>`;
    if (window.lucide) window.lucide.createIcons();
  },

  card(record, now) {
    const category = record._category || categoryForItem(record);
    const notificationUrl = safeOfficialUrl(record.notification_pdf_url || record.official_notification_url || record.source_url);
    const applicationUrl = record.application_url_verified === true
      ? safeOfficialUrl(record.application_url)
      : "";
    const opening = formatIST(openingValue(record), false);
    const closing = formatIST(closingValue(record), true);
    const examDate = formatIST(record.exam_date, false);
    const verified = formatIST(record.verified_at, false);
    const notificationNumber = record.notification_number || record.notification_ref || "Awaiting Official Verification";
    const vacancies = record.vacancies ? esc(record.vacancies) : "As per official notification";
    const qualification = record.qualification ? esc(record.qualification) : "As per official notification";
    const ageLimit = record.age_limit ? esc(record.age_limit) : "As per official notification";
    const fee = record.fee ? esc(record.fee) : "As per official notification";
    const archived = this.activeSection === "ARCHIVED";
    const status = archived
      ? (record._archivedReason === "Application Closed" ? "Application Closed" : "Awaiting Official Verification")
      : (isOpenRecord(record, now) ? "Applications Open" : "Application Closed");

    return `
      <article class="glass-card p-4 rounded-xl border border-white/10 space-y-3">
        <div class="flex items-center flex-wrap gap-2">
          <span class="px-2.5 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-[10px] font-black text-rose-300 uppercase">${esc(category)}</span>
          <span class="px-2.5 py-1 rounded ${status === "Applications Open" ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border border-amber-500/30 bg-amber-500/10 text-amber-300"} text-[10px] font-black">${esc(status)}</span>
        </div>
        <div>
          <h3 class="font-bold text-white text-sm md:text-base">${esc(record.exam_name || record.title || "Recruitment Notification")}</h3>
          <p class="text-[11px] text-amber-300 font-semibold mt-1">Organization: ${esc(record.organization || record.authority || "Awaiting Official Verification")}</p>
        </div>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div><dt class="text-slate-500">Notification Number</dt><dd>${esc(notificationNumber)}</dd></div>
          <div><dt class="text-slate-500">Vacancies</dt><dd>${vacancies}</dd></div>
          <div><dt class="text-slate-500">Qualification</dt><dd>${qualification}</dd></div>
          <div><dt class="text-slate-500">Age Limit</dt><dd>${ageLimit}</dd></div>
          <div><dt class="text-slate-500">Application Fee</dt><dd>${fee}</dd></div>
          <div><dt class="text-slate-500">Registration Opens</dt><dd>${opening ? esc(opening) : "Awaiting Official Verification"}</dd></div>
          <div class="sm:col-span-2"><dt class="text-slate-500">Last Registration Date (IST / Asia/Kolkata)</dt><dd class="text-amber-300 font-bold">${closing ? esc(closing) : "Awaiting Official Verification"}</dd></div>
          <div><dt class="text-slate-500">Examination Date</dt><dd>${examDate ? esc(examDate) : "Awaiting Official Verification"}</dd></div>
          <div><dt class="text-slate-500">${archived ? "Archived Status" : "Countdown"}</dt><dd>${archived ? esc(status) : esc(this.countdown(record))}</dd></div>
          <div class="sm:col-span-2"><dt class="text-slate-500">Last Verified</dt><dd>${verified ? esc(verified) : "Awaiting Official Verification"}</dd></div>
        </dl>
        <div class="flex flex-wrap gap-2 pt-1">
          ${notificationUrl ? `<a href="${esc(notificationUrl)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-slate-200 font-extrabold text-xs">VIEW OFFICIAL NOTIFICATION ↗</a>` : `<span class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs">Awaiting Official Notification Link</span>`}
          ${applicationUrl ? `<a href="${esc(applicationUrl)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs">APPLY ON OFFICIAL WEBSITE ↗</a>` : `<span class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs">Official application link pending verification</span>`}
        </div>
      </article>
    `;
  }
};

window.JobAlertsRegistry = JobAlertsRegistry;

document.addEventListener("DOMContentLoaded", () => JobAlertsRegistry.init());
