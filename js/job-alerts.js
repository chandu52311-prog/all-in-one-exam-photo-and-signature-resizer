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
  { key: "ALL", label: "All Active" },
  { key: "UPSC", label: "UPSC" },
  { key: "SSC", label: "SSC" },
  { key: "RAILWAYS", label: "Railways (RRB)" },
  { key: "APPSC", label: "APPSC" },
  { key: "TGPSC", label: "TGPSC" },
  { key: "BANKING", label: "Banking" },
  { key: "DEFENCE", label: "Defence" },
  { key: "PSU", label: "PSU & Power" },
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
  const text = `${item?.authority || ""} ${item?.title || ""} ${item?.organization || ""} ${item?.exam_name || ""}`.toUpperCase();

  // State PSC records must be split strictly by authority/title.
  if (/ANDHRA PRADESH PUBLIC SERVICE COMMISSION|\bAPPSC\b/.test(text)) return "APPSC";
  if (/TELANGANA PUBLIC SERVICE COMMISSION|\bTGPSC\b|\bTSPSC\b/.test(text)) return "TGPSC";

  if (/UNION PUBLIC SERVICE COMMISSION|\bUPSC\b/.test(text) || explicit.startsWith("UPSC")) return "UPSC";
  if (/STAFF SELECTION COMMISSION|\bSSC\b/.test(text) || explicit.startsWith("SSC")) return "SSC";
  if (/RAILWAY RECRUITMENT BOARD|\bRRB\b|\bRPF\b|\bRAILWAYS?\b/.test(text) || explicit === "RAILWAYS" || explicit === "RRB") return "RAILWAYS";
  if (/\bIBPS\b|\bSBI\b|\bRBI\b|RESERVE BANK|BANKING/.test(text) || ["BANKING","IBPS","SBI","RBI"].includes(explicit)) return "BANKING";
  if (/INDIAN ARMY|INDIAN NAVY|INDIAN AIR FORCE|\bDEFENCE\b|\bARMY\b|\bNAVY\b|\bAIR_FORCE\b/.test(text) || ["DEFENCE","ARMY","NAVY","AIR_FORCE"].includes(explicit)) return "DEFENCE";
  if (/NTPC|BHEL|POWERGRID|\bPGCIL\b|NHPC|ONGC|IOCL|GAIL|PSU|POWER UTILIT/.test(text) || explicit === "PSU" || explicit === "PSU & POWER" || explicit.startsWith("PSU")) return "PSU";

  if (explicit === "APPSC") return "APPSC";
  if (explicit === "TGPSC") return "TGPSC";
  return "OTHER";
}

const JobAlertsRegistry = {
  activeCategory: "ALL",
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

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-4 sm:p-5 border border-rose-500/30 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h2 class="font-black text-lg sm:text-xl text-white">Live Government Jobs</h2>
            <p class="text-xs text-slate-400">Official verified records • Asia/Kolkata deadline handling</p>
          </div>
          <button type="button" onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white">← Resizer</button>
        </div>

        <div id="organizationCategoryTabs" class="grid grid-cols-2 md:grid-cols-4 gap-2">
          ${CATEGORIES.map(category => `
            <button type="button" data-category="${category.key}" id="job-category-${category.key}"
              class="exam-btn p-2.5 text-xs ${category.key === "ALL" ? "active" : ""}">
              <span>${esc(category.label)}</span>
              <span id="job-count-${category.key}" class="ml-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-black/20 px-1 text-[10px]">0</span>
            </button>
          `).join("")}
        </div>

        <div id="jobLastVerified" class="text-[11px] text-slate-400"></div>
        <div id="alerts-listing-container" class="space-y-3.5">
          <div class="p-4 text-center text-xs text-slate-400 border border-white/10 rounded-xl">Checking official verified records…</div>
        </div>
        ${guideHtml}
      </div>
    `;

    root.onclick = (event) => {
      const category = event.target.closest("[data-category]");
      if (category) this.setCategory(category.dataset.category);
    };

    if (window.lucide) window.lucide.createIcons();
  },

  setCategory(category) {
    if (!CATEGORIES.some(item => item.key === category)) return;
    this.activeCategory = category;
    document.querySelectorAll("[id^='job-category-']").forEach(button => button.classList.remove("active"));
    document.getElementById(`job-category-${category}`)?.classList.add("active");
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
    let source = this.records.filter(record => isOpenRecord(record, now));

    if (this.activeCategory !== "ALL") {
      source = source.filter(record => categoryForItem(record) === this.activeCategory);
    }

    source.sort((a, b) => (parseIST(b.released_at, false)?.getTime() || 0) - (parseIST(a.released_at, false)?.getTime() || 0));
    return source;
  },

  updateCategoryCounts() {
    const now = new Date();
    const openRecords = this.records.filter(record => isOpenRecord(record, now));
    const counts = { ALL: openRecords.length };

    openRecords.forEach(record => {
      const organization = categoryForItem(record);
      if (organization !== "OTHER") counts[organization] = (counts[organization] || 0) + 1;
    });

    CATEGORIES.forEach(category => {
      const badge = document.getElementById(`job-count-${category.key}`);
      if (badge) badge.textContent = String(counts[category.key] || 0);
    });
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
    this.updateCategoryCounts();
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
      container.innerHTML = `
        <p class="py-5 px-3 text-center text-xs text-slate-400 border border-white/10 rounded-xl">No active verified notifications currently available.</p>
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
        <dl class="grid grid-cols-1 gap-1.5 text-[11px] text-slate-300">
          <div><dt class="text-slate-500">Vacancies</dt><dd>${vacancies}</dd></div>
          <div><dt class="text-slate-500">Last Registration Date (IST / Asia/Kolkata)</dt><dd class="text-amber-300 font-bold">${closing ? esc(closing) : "Awaiting Official Verification"}</dd></div>
          <div><dt class="text-slate-500">Last Verified</dt><dd>${verified ? esc(verified) : "Awaiting Official Verification"}</dd></div>
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
