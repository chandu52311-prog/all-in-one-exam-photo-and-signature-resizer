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

function getCuratedExamNoticeBoard() {
  const cards = [
    ['SSC', 'Notifications, admit cards, answer keys and posts', 'https://ssc.gov.in/', 'https://ssc.gov.in/'],
    ['RRB', 'Regional railway recruitment notices and CEN updates', 'https://www.rrbcdg.gov.in/', 'https://www.indianrailways.gov.in/'],
    ['UPSC', 'Civil services and central recruitment examinations', 'https://upsc.gov.in/', 'https://upsc.gov.in/'],
    ['IBPS / SBI', 'Banking recruitment calendar and institute notices', 'https://www.ibps.in/', 'https://sbi.co.in/web/careers'],
    ['NTA', 'National entrance and admission examination notices', 'https://nta.ac.in/', 'https://nta.ac.in/Examination'],
    ['GATE', 'GATE application, admit card and institute information', 'https://gate.iitr.ac.in/', 'https://gate.iitr.ac.in/'],
    ['APPSC / TGPSC', 'Andhra Pradesh and Telangana public service notices', 'https://psc.ap.gov.in/', 'https://www.tgpsc.gov.in/']
  ];

  return `
    <article class="p-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.04] space-y-3">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 class="text-sm font-black text-amber-300">Current official notice &amp; exam portal board</h3>
          <p class="text-[11px] text-slate-400">Use these portals to verify dates, eligibility, fees, corrigenda and active applications.</p>
        </div>
        <span class="text-[10px] text-emerald-300 font-bold border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-lg">Official sources</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        ${cards.map(([name, description, url, labelUrl]) => `
          <div class="p-3 rounded-xl border border-white/10 bg-black/25">
            <h4 class="text-xs font-bold text-white">${name}</h4>
            <p class="text-[11px] text-slate-400 mt-1">${description}</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 text-[11px] text-amber-300 underline font-bold">Open official portal</a>
          </div>
        `).join('')}
      </div>
      <p class="text-[11px] text-slate-400"><strong class="text-white">Verification checklist:</strong> Confirm notification number, post, category, cut-off date, application window, fee, exam stage, corrigendum and closing time before applying. A board link is a starting point, not a guarantee that a recruitment is currently open.</p>
    </article>
  `;
}
window.getCuratedExamNoticeBoard = getCuratedExamNoticeBoard;

function getCategoryFallback(categoryKey) {
  const fallbacks = {
    CENTRAL: {
      title: 'No active UPSC or SSC registration found',
      description: 'No open UPSC/SSC record is currently available in the active registry.',
      portal: 'https://ssc.nic.in/',
      alternate: 'https://upsc.gov.in/',
      checks: 'Verify the SSC or UPSC notice number, post, category, application window, fee deadline, corrigendum and closing time.'
    },
    RAILWAYS: {
      title: 'No active RRB or railway registration found',
      description: 'No open railway recruitment record is currently available in the active registry.',
      portal: 'https://www.indianrailways.gov.in/',
      alternate: 'https://www.rrbapply.gov.in/',
      checks: 'Verify the RRB zone, CEN number, post, qualification, RRB-specific payment window and official closing time.'
    },
    STATE_PSC: {
      title: 'No active State Commission registration found',
      description: 'No open APPSC, TGPSC or other State PSC record is currently available.',
      portal: 'https://psc.ap.gov.in/',
      alternate: 'https://www.tgpsc.gov.in/',
      checks: 'Verify the commission, notification number, post, local status, age cut-off, fee and correction window.'
    },
    STATE_GOVT: {
      title: 'No active State Government registration found',
      description: 'No open State Government department record is currently available in the active registry.',
      portal: 'https://www.india.gov.in/topics/labour-employment',
      alternate: 'https://www.mygov.in/',
      checks: 'Verify the department website, gazette or recruitment notice, post code, eligibility and official closing deadline.'
    },
    PSU: {
      title: 'No active PSU or utility registration found',
      description: 'No open power utility or PSU record is currently available in the active registry.',
      portal: 'https://www.psuconnect.in/',
      alternate: 'https://www.india.gov.in/topics/industries',
      checks: 'Verify the company or utility recruitment page, notification number, qualification, fee and official application deadline.'
    }
  };
  return fallbacks[categoryKey] || {
    title: 'No active registrations found',
    description: 'No open verified record is currently available in this live category.',
    portal: 'https://www.india.gov.in/topics/labour-employment',
    alternate: '',
    checks: 'Verify the notification number, authority, eligibility, category, fee, corrigendum and closing time on the official website.'
  };
}
window.getCategoryFallback = getCategoryFallback;

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
    const staticGuide = document.getElementById('jobAlertsGuide');
    const guideHtml = staticGuide ? staticGuide.outerHTML : '';

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
        ${guideHtml}
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
        const nowMs = Date.now();
        return this.isJobActive(item, nowMs);
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
    if (!['ALL', 'CENTRAL', 'RAILWAYS', 'STATE_PSC', 'STATE_GOVT', 'PSU'].includes(categoryKey)) {
      return;
    }
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

  matchesActiveFilter(item) {
    if (this.activeFilter === 'ALL') return true;
    if (!item) return false;

    const category = String(item.category || '').trim().toUpperCase();
    const authority = String(item.authority || '').toUpperCase();
    const title = String(item.title || '').toUpperCase();
    const combined = `${authority} ${title}`;

    if (this.activeFilter === 'CENTRAL') {
      if (category === 'CENTRAL') {
        return /\bSSC\b|UPSC/.test(combined);
      }
      return /\bSSC\b|UPSC/.test(combined);
    }
    if (this.activeFilter === 'RAILWAYS') {
      return category === 'RAILWAYS' || /\bRRB\b|RAILWAY/.test(combined);
    }
    if (this.activeFilter === 'STATE_PSC') {
      return category === 'STATE_PSC' || /APPSC|TGPSC|TSPSC|STATE PSC|PUBLIC SERVICE COMMISSION/.test(combined);
    }
    if (this.activeFilter === 'STATE_GOVT') {
      return category === 'STATE_GOVT';
    }
    if (this.activeFilter === 'PSU') {
      return category === 'PSU' || /PSU|POWERGRID|PGCIL|TRANSCO|GENCO|NTPC|BHEL|ONGC|IOCL|GAIL|NHPC|SAIL/.test(combined);
    }
    return false;
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

    const staticBoard = typeof getCuratedExamNoticeBoard === 'function'
      ? getCuratedExamNoticeBoard()
      : '';

    const nowMs = Date.now();
    this.liveNotifications = this.liveNotifications.filter(item => this.isJobActive(item, nowMs));

    // Defense-in-depth: Verified government status & document allowlist
    const validLiveItems = this.liveNotifications.filter(item => 
      item &&
      item.verification_status === 'verified' &&
      item.is_government_employer === true &&
      Boolean(item.verified_at) &&
      this.isJobActive(item, nowMs) &&
      Boolean(safeOfficialNoticeUrl(item.official_notification_url)) &&
      this.matchesActiveFilter(item)
    );

    let html = '';

    if (this.isLoading) {
      html += `
        <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs">
          Checking the live official-registry records. The notice board remains available for verification.
        </div>
      `;
    } else if (this.loadError && !this.isStaleData) {
      html += `
        <div class="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-amber-300 text-xs">
          Live records are refreshing separately. Verify all dates and links through the official portal before applying.
        </div>
      `;
    }

    if (this.isStaleData) {
      html += `
        <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
          <i data-lucide="wifi-off" class="w-4 h-4 flex-shrink-0"></i>
          <span>Live notice refresh is delayed. Verify the official portal before taking action.</span>
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
      const fallback = getCategoryFallback(this.activeFilter);
      list.innerHTML = html + staticBoard + `
        <div class="p-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] space-y-3">
          <div>
            <h3 class="text-sm font-black text-amber-300">${esc(fallback.title)}</h3>
            <p class="text-xs text-slate-300 mt-1">${esc(fallback.description)}</p>
          </div>
          <div class="grid md:grid-cols-2 gap-3 text-[11px] text-slate-400">
            <p><strong class="text-white">Official verification:</strong> ${esc(fallback.checks)}</p>
            <p><strong class="text-white">Check official source:</strong> Visit the category portal and confirm that an application is open. Expired closing dates are automatically excluded.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <a href="${esc(fallback.portal)}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-extrabold text-xs">Open official portal</a>
            ${fallback.alternate ? `<a href="${esc(fallback.alternate)}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold text-xs">Open alternate official portal</a>` : ''}
          </div>
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
      const closingFormatted = fmtIST(rawEnd, false);
      const categoryLabel = esc(item.category || 'GENERAL');
      const department = esc(item.authority || item.official_portal || 'Conducting authority');
      const startInfo = startFormatted
        ? `<span>Registration starts: ${esc(startFormatted)}</span>`
        : '<span>Registration start: Refer to official notice</span>';
      const closeInfo = closingFormatted
        ? `<span>Registration closes: ${esc(closingFormatted)}</span>`
        : '<span>Registration closing time: Refer to official notice</span>';

      html += `
        <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-rose-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center flex-wrap gap-2">
              <span class="px-2 py-0.5 rounded border text-[10px] uppercase ${badgeClass}">
                ${safeBadgeHtml}
              </span>
              <span class="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-extrabold text-slate-300 uppercase tracking-wider">${categoryLabel}</span>
            </div>
            <h3 class="font-bold text-white text-sm md:text-base leading-snug">
              ${esc(item.title)}
            </h3>
            <p class="text-[11px] font-semibold text-amber-300">
              Conducting body / department: ${department}
            </p>
            <p class="text-xs text-slate-300 font-medium">
              ${esc(item.posts)}
            </p>
            <p class="text-[11px] text-slate-400">
              Eligibility: ${esc(item.qualification)}
            </p>
            <div class="grid sm:grid-cols-2 gap-1 text-[10px] text-slate-300 pt-1">
              ${startInfo}
              ${closeInfo}
            </div>
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

    list.innerHTML = html + staticBoard;
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
