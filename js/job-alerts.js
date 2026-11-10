/**
 * ExamResizer Pro - Live Alerts Engine
 * Module: js/job-alerts.js
 * Architecture: 100% Dynamic Supabase Stream with Keyset Pagination & Per-Job Auth
 * Theme: Obsidian Dark Glass & Gold Accent UI Architecture
 */

const SUPABASE_API_URL = "https://znkwwzasysqkvtclmktd.supabase.co/rest/v1/live_job_alerts";
const SUPABASE_ANON_KEY = "sb_publishable_2BqA77mr-KyhwkqRcYMh0g_tQbM_zE9";

// HTML Sanitization Utility
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// 1. Strict Official Government & PSU Domain Allowlist for Notices / Documents
const ALLOWED_GOV_PATTERNS = [
  'gov.in', 'nic.in',
  'upsc.gov.in', 'upsconline.nic.in', 'ssc.gov.in', 'rrbapply.gov.in',
  'psc.ap.gov.in', 'tgpsc.gov.in', 'tspsc.gov.in',
  'powergrid.in', 'ntpc.co.in', 'bhel.com', 'iocl.com',
  'ongcindia.com', 'coalindia.in', 'sail.co.in', 'gailonline.com',
  'bel-india.in', 'hal-india.co.in', 'nhpcindia.com'
];

// 2. Verified Third-Party Application Engines (Officially Contracted by Gov / PSUs)
const ALLOWED_APP_ENGINES = [
  ...ALLOWED_GOV_PATTERNS,
  'digialm.com',
  'online-cbexams.com',
  'cdac.in',
  'ibps.in',
  'cbtexam.in',
  'nta.ac.in'
];

const matchHostInPatterns = (host, patterns) => {
  return patterns.some(pat => {
    const normalized = pat.replace(/^\./, '').toLowerCase();
    return host === normalized || host.endsWith('.' + normalized);
  });
};

const safeOfficialNoticeUrl = (u) => {
  if (!u || typeof u !== 'string') return '';
  try {
    const x = new URL(u.trim());
    if (x.protocol !== 'https:') return '';
    if (x.username || x.password) return ''; // Embedded credentials rejection
    return matchHostInPatterns(x.hostname.toLowerCase(), ALLOWED_GOV_PATTERNS) ? x.href : '';
  } catch {
    return '';
  }
};

const safeApplicationUrl = (u) => {
  if (!u || typeof u !== 'string') return '';
  try {
    const x = new URL(u.trim());
    if (x.protocol !== 'https:') return '';
    if (x.username || x.password) return ''; // Embedded credentials rejection
    return matchHostInPatterns(x.hostname.toLowerCase(), ALLOWED_APP_ENGINES) ? x.href : '';
  } catch {
    return '';
  }
};

// Fail-closed IST Deadline Parser: Returns NaN for invalid strings
const parseISTDeadlineMs = (dateStr, isStart = false) => {
  if (!dateStr || typeof dateStr !== 'string') return NaN;
  try {
    const cleanStr = dateStr.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(cleanStr)) {
      const timePart = isStart ? '00:00:00.000' : '23:59:59.999';
      const ms = new Date(`${cleanStr}T${timePart}+05:30`).getTime();
      return Number.isFinite(ms) ? ms : NaN;
    }
    const ms = new Date(cleanStr).getTime();
    return Number.isFinite(ms) ? ms : NaN;
  } catch {
    return NaN;
  }
};

const fmtIST = (iso, isStart = false) => {
  const ms = parseISTDeadlineMs(iso, isStart);
  if (!Number.isFinite(ms)) return '';
  try {
    return new Date(ms).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
  } catch {
    return '';
  }
};

const JobAlertsRegistry = {
  activeFilter: 'ALL',
  liveNotifications: [],
  isLoading: false,
  loadError: false,
  isStaleData: false,
  paginationTruncated: false,
  KNOWN_PRESETS: ['UPSC', 'SSC', 'RRB', 'STATE_PSC', 'APPSC', 'TGPSC', 'PSU_HUB', 'AP_PSU', 'TG_PSU'],
  _uiTickTimer: null,
  _autoFetchTimer: null,
  _currentAbortController: null,
  _fetchRequestId: 0,
  _isInitialized: false,

  async init() {
    if (this._isInitialized) return;
    this._isInitialized = true;

    this.renderSkeleton();
    await this.fetchLiveAlerts(false);

    this._uiTickTimer = setInterval(() => {
      this.renderListing();
    }, 60000);

    this._autoFetchTimer = setInterval(() => {
      this.fetchLiveAlerts(true);
    }, 5 * 60 * 1000);
  },

  renderSkeleton() {
    const root = document.getElementById('jobs-zone');
    if (!root) return;

    const btn = (key, label, on) => `
      <button type="button" data-filter="${key}" id="filter-btn-${key}" 
        class="px-3.5 py-1.5 rounded-lg border font-bold transition text-xs cursor-pointer ${
          on 
            ? 'border-rose-500 bg-rose-500/20 text-rose-300' 
            : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
        }">
        ${label}
      </button>
    `;

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-rose-500/30 space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-bold text-xl text-white flex items-center">
              <i data-lucide="bell-ring" class="w-5 h-5 text-rose-400 mr-2 animate-pulse"></i>
              Live Government Recruitment & Examination Alerts
            </h2>
            <p class="text-xs text-slate-400">Verified Official Gazette Notices • Auto-Purged Upon Expiry (Asia/Kolkata)</p>
          </div>
          <button type="button" onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition cursor-pointer">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Return to Workspace</span>
          </button>
        </div>

        <div class="flex items-center space-x-2 overflow-x-auto pb-1 text-xs select-none">
          ${btn('ALL', 'All Active Alerts', true)}
          ${btn('CENTRAL', 'Central Govt (UPSC/SSC)', false)}
          ${btn('RAILWAYS', 'Railways (RRB)', false)}
          ${btn('STATE_PSC', 'State Commissions (APPSC/TGPSC)', false)}
          ${btn('STATE_GOVT', 'State Govt Depts', false)}
          ${btn('PSU', 'Power Utilities & PSUs', false)}
        </div>

        <div id="alerts-listing-container" class="space-y-3.5">
          <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/5">
            <span class="inline-block animate-spin mr-2">⏳</span> Connecting to verified government registry...
          </div>
        </div>
      </div>
    `;

    root.onclick = (e) => {
      const f = e.target.closest('[data-filter]');
      if (f) return this.setFilter(f.dataset.filter);

      const p = e.target.closest('[data-preset]');
      if (p) return this.routeToResizer(p.dataset.preset);
    };

    if (window.lucide) lucide.createIcons();
  },

  async fetchLiveAlerts(silent = false) {
    if (!silent) {
      this.isLoading = true;
      this.renderListing();
    }

    if (this._currentAbortController) {
      this._currentAbortController.abort();
    }
    this._currentAbortController = new AbortController();
    const signal = this._currentAbortController.signal;
    const thisRequestId = ++this._fetchRequestId;

    try {
      const nowIso = new Date().toISOString();
      const cols = 'id,authority,title,posts,qualification,application_start_date,closing_date,closing_at,official_notification_url,application_url,application_url_verified,official_portal,preset_target,category,verified_at,verification_status,is_government_employer';

      let allRecords = [];
      const batchSize = 100;
      let hasMore = true;
      let lastClosingAt = null;
      let lastId = null;
      let pageCount = 0;
      const MAX_PAGES = 100;

      while (hasMore && pageCount < MAX_PAGES) {
        pageCount++;

        const params = new URLSearchParams({
          select: cols,
          closing_at: `gt.${nowIso}`,
          verified_at: 'not.is.null',
          verification_status: 'eq.verified',
          is_government_employer: 'eq.true',
          order: 'closing_at.asc,id.asc',
          limit: String(batchSize)
        });

        if (this.activeFilter !== 'ALL') {
          params.set('category', `eq.${this.activeFilter}`);
        }

        const conditions = [
          `or(application_start_date.is.null,application_start_date.lte.${nowIso})`
        ];

        if (lastClosingAt !== null && lastId !== null) {
          conditions.push(
            `or(closing_at.gt.${lastClosingAt},and(closing_at.eq.${lastClosingAt},id.gt.${lastId}))`
          );
        }

        params.set('and', `(${conditions.join(',')})`);
        const pagedUrl = `${SUPABASE_API_URL}?${params.toString()}`;

        const res = await fetch(pagedUrl, {
          signal,
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });

        if (!res.ok) throw new Error("HTTP Status: " + res.status);
        const batch = await res.json();

        if (Array.isArray(batch) && batch.length > 0) {
          allRecords = allRecords.concat(batch);
          const lastItem = batch[batch.length - 1];

          const previousClosingAt = lastClosingAt;
          const previousId = lastId;
          const nextClosingAt = lastItem.closing_at;
          const nextId = lastItem.id;

          if (!nextClosingAt || typeof nextId !== 'string') {
            throw new Error("Invalid pagination cursor in payload");
          }

          if (previousClosingAt !== null) {
            // Safe collation check for Text / UUID IDs
            const idComp = nextId.localeCompare(previousId, 'en', { numeric: false });
            const advanced =
              nextClosingAt > previousClosingAt ||
              (nextClosingAt === previousClosingAt && idComp > 0);

            if (!advanced) {
              throw new Error("Pagination cursor did not advance");
            }
          }

          lastClosingAt = nextClosingAt;
          lastId = nextId;

          if (batch.length < batchSize) {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      }

      if (thisRequestId !== this._fetchRequestId) return;

      this.paginationTruncated = hasMore && pageCount >= MAX_PAGES;

      const seenIds = new Set();
      this.liveNotifications = allRecords.filter(item => {
        if (!item || !item.id || seenIds.has(item.id)) return false;
        seenIds.add(item.id);
        return true;
      });

      this.loadError = false;
      this.isStaleData = false;

    } catch (err) {
      if (err.name === 'AbortError') return;

      if (thisRequestId === this._fetchRequestId) {
        this.loadError = true;
        if (silent && this.liveNotifications.length > 0) {
          this.isStaleData = true;
        } else {
          this.liveNotifications = [];
          this.isStaleData = false;
        }
      }
    } finally {
      if (thisRequestId === this._fetchRequestId) {
        this.isLoading = false;
        this.renderListing();
      }
    }
  },

  setFilter(categoryKey) {
    if (this.activeFilter === categoryKey) return;
    this.activeFilter = categoryKey;

    document.querySelectorAll('[id^="filter-btn-"]').forEach(btn => {
      btn.className = 'px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white font-bold transition text-xs cursor-pointer';
    });

    const activeBtn = document.getElementById(`filter-btn-${categoryKey}`);
    if (activeBtn) {
      activeBtn.className = 'px-3.5 py-1.5 rounded-lg border border-rose-500 bg-rose-500/20 text-rose-300 font-bold transition text-xs cursor-pointer';
    }

    this.fetchLiveAlerts(false);
  },

  // Strict Fail-Closed Active Application Evaluation
  isJobActive(item, nowMs) {
    const rawEnd = item.closing_at || item.closing_date;
    const closeMs = parseISTDeadlineMs(rawEnd, false);

    if (!Number.isFinite(closeMs) || closeMs <= nowMs) {
      return false;
    }

    if (!item.application_start_date) {
      return true; // Start date not specified, window open by default
    }

    const startMs = parseISTDeadlineMs(item.application_start_date, true);
    return Number.isFinite(startMs) && startMs <= nowMs;
  },

  renderListing() {
    const list = document.getElementById('alerts-listing-container');
    if (!list) return;

    if (this.isLoading) {
      list.innerHTML = `
        <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/5">
          <span class="inline-block animate-spin mr-2">⏳</span> Loading verified active recruitments...
        </div>
      `;
      return;
    }

    if (this.loadError && !this.isStaleData) {
      list.innerHTML = `
        <div class="p-8 text-center text-xs text-amber-300 glass-card rounded-xl border border-amber-500/30 space-y-2">
          <p class="font-bold">Live database alerts temporarily unreachable.</p>
          <span class="text-[11px] text-slate-400">Verifying secure endpoints. Please try again shortly.</span>
        </div>
      `;
      return;
    }

    const nowMs = Date.now();

    // Defense-in-depth: Verified government status & document allowlist
    const validLiveItems = this.liveNotifications.filter(item => 
      item &&
      item.verification_status === 'verified' &&
      item.is_government_employer === true &&
      Boolean(item.verified_at) &&
      this.isJobActive(item, nowMs) &&
      Boolean(safeOfficialNoticeUrl(item.official_notification_url))
    );

    let html = '';

    if (this.isStaleData) {
      html += `
        <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
          <i data-lucide="wifi-off" class="w-4 h-4 flex-shrink-0"></i>
          <span>Network sync unavailable. Displaying cached verified notices.</span>
        </div>
      `;
    }

    if (this.paginationTruncated) {
      html += `
        <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
          <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0"></i>
          <span>Partial results: maximum pagination limit reached. Some active alerts may not be displayed.</span>
        </div>
      `;
    }

    if (validLiveItems.length === 0) {
      list.innerHTML = html + `
        <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/5 space-y-1">
          <p class="font-bold text-slate-200">No active government job applications currently open in this category.</p>
          <span class="text-[11px] text-slate-500 block">Only officially verified, currently-open applications are listed. Zero sample data.</span>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    validLiveItems.forEach(item => {
      const rawEnd = item.closing_at || item.closing_date;
      const closeMs = parseISTDeadlineMs(rawEnd, false);
      const diffMs = closeMs - nowMs;
      const totalHoursRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
      const totalDaysRemaining = Math.floor(totalHoursRemaining / 24);

      const formattedDeadline = fmtIST(rawEnd, false) || 'Refer Notice';

      let badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      let badgeText = `CLOSING: ${formattedDeadline}`;

      if (totalHoursRemaining <= 24) {
        badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse font-black';
        badgeText = `CLOSING IN ${totalHoursRemaining} HOURS • ${formattedDeadline}`;
      } else if (totalDaysRemaining <= 3) {
        badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
        badgeText = `CLOSING IN ${totalDaysRemaining} DAYS • ${formattedDeadline}`;
      }

      const safeBadgeHtml = esc(badgeText);
      const notifUrl = safeOfficialNoticeUrl(item.official_notification_url);

      // Per-recruitment application URL verification check
      const applyUrl = item.application_url_verified === true 
        ? safeApplicationUrl(item.application_url) 
        : '';

      const preset = this.KNOWN_PRESETS.includes(item.preset_target) ? item.preset_target : '';
      const startFormatted = fmtIST(item.application_start_date, true);
      const startInfo = startFormatted 
        ? `<p class="text-[10px] text-slate-400">Application Window Opened: ${esc(startFormatted)}</p>` 
        : '';

      html += `
        <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-rose-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center flex-wrap gap-2">
              <span class="px-2 py-0.5 rounded border text-[10px] uppercase ${badgeClass}">
                ${safeBadgeHtml}
              </span>
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                ${esc(item.authority)}
              </span>
            </div>
            <h3 class="font-bold text-white text-sm md:text-base leading-snug">
              ${esc(item.title)}
            </h3>
            <p class="text-xs text-slate-300 font-medium">
              ${esc(item.posts)}
            </p>
            <p class="text-[11px] text-slate-400">
              Eligibility: ${esc(item.qualification)}
            </p>
            ${startInfo}
          </div>

          <div class="flex items-center flex-wrap gap-2 flex-shrink-0">
            ${preset ? `
              <button type="button" data-preset="${esc(preset)}" class="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-extrabold text-xs hover:bg-amber-500/20 transition flex items-center space-x-1.5 cursor-pointer shadow-sm">
                <i data-lucide="crop" class="w-3.5 h-3.5"></i>
                <span>Format Photo/Sign</span>
              </button>
            ` : ''}

            <a href="${esc(notifUrl)}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl bg-white/5 border border-white/20 text-slate-200 font-bold text-xs hover:bg-white/10 hover:text-white transition flex items-center space-x-1.5 shadow-sm">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>Official Notice</span>
            </a>

            ${applyUrl ? `
              <a href="${esc(applyUrl)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center space-x-1.5 shadow-md">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                <span>Apply Online</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
    });

    list.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  routeToResizer(presetKey) {
    if (typeof switchZone === 'function') switchZone('resizer-zone');

    if (presetKey === 'STATE_PSC' || presetKey === 'APPSC' || presetKey === 'TGPSC') {
      if (typeof window.currentExam !== 'undefined') window.currentExam = 'STATE_PSC';
      if (typeof window.currentState !== 'undefined') {
        window.currentState = presetKey === 'TGPSC' ? 'TGPSC' : 'APPSC';
      }
      const stateSelect = document.getElementById('stateDropdown');
      if (stateSelect) {
        stateSelect.value = presetKey === 'TGPSC' ? 'TGPSC' : 'APPSC';
        stateSelect.dispatchEvent(new Event('change'));
      }
    } else if (presetKey === 'PSU_HUB' || presetKey === 'AP_PSU' || presetKey === 'TG_PSU') {
      if (typeof window.currentExam !== 'undefined') window.currentExam = 'PSU_HUB';
      if (typeof window.currentPsu !== 'undefined') {
        window.currentPsu = presetKey === 'TG_PSU' ? 'TG_PSU' : 'AP_PSU';
      }
      const psuSelect = document.getElementById('psuDropdown');
      if (psuSelect) {
        psuSelect.value = presetKey === 'TG_PSU' ? 'TG_PSU' : 'AP_PSU';
        psuSelect.dispatchEvent(new Event('change'));
      }
    } else {
      if (typeof window.currentExam !== 'undefined') window.currentExam = presetKey;
      const examSelect = document.getElementById('examDropdown');
      if (examSelect) {
        examSelect.value = presetKey;
        examSelect.dispatchEvent(new Event('change'));
      }
    }

    if (typeof window.updateExamSpecs === 'function') window.updateExamSpecs();

    const uploadArea = document.getElementById('uploadBox');
    if (uploadArea) uploadArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => JobAlertsRegistry.init());
} else {
  JobAlertsRegistry.init();
}
