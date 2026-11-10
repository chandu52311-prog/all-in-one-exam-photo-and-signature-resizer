/**
 * ExamResizer Pro - Live Alerts Engine
 * Module: js/job-alerts.js
 * Architecture: 100% Dynamic Supabase Stream (Zero Hardcoded / Zero Expired Data)
 */

const SUPABASE_API_URL = "https://znkwwzasysqkvtclmktd.supabase.co/rest/v1/live_job_alerts";
const SUPABASE_ANON_KEY = "sb_publishable_2BqA77mr-KyhwkqRcYMh0g_tQbM_zE9";

const JobAlertsRegistry = {
  activeFilter: 'ALL',
  liveNotifications: [],
  isLoading: false,

  async init() {
    this.renderSkeleton();
    await this.fetchLiveAlerts();
  },

  renderSkeleton() {
    const root = document.getElementById('jobs-zone');
    if (!root) return;

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-rose-500/30 space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-bold text-xl text-white flex items-center">
              <i data-lucide="bell-ring" class="w-5 h-5 text-rose-400 mr-2 animate-pulse"></i>
              Live Government Recruitment & Examination Alerts
            </h2>
            <p class="text-xs text-slate-400">Authenticated Application Portals • Automatic Expired Post Removal</p>
          </div>
          <button onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Return to Workspace</span>
          </button>
        </div>

        <div class="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <button onclick="JobAlertsRegistry.setFilter('ALL')" id="filter-btn-ALL" class="px-3.5 py-1.5 rounded-lg border border-rose-500 bg-rose-500/20 text-rose-300 font-bold transition">
            All Active Alerts
          </button>
          <button onclick="JobAlertsRegistry.setFilter('CENTRAL')" id="filter-btn-CENTRAL" class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold transition">
            Central Govt (SSC/UPSC)
          </button>
          <button onclick="JobAlertsRegistry.setFilter('RAILWAYS')" id="filter-btn-RAILWAYS" class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold transition">
            Railways (RRB)
          </button>
          <button onclick="JobAlertsRegistry.setFilter('STATE_PSC')" id="filter-btn-STATE_PSC" class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold transition">
            State Commissions (APPSC/TGPSC)
          </button>
          <button onclick="JobAlertsRegistry.setFilter('PSU')" id="filter-btn-PSU" class="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold transition">
            Power Utilities & PSUs
          </button>
        </div>

        <div id="alerts-listing-container" class="space-y-3.5">
          <div class="p-8 text-center text-xs text-slate-400">
            <span class="inline-block animate-spin mr-2">⏳</span> Loading authentic active government recruitments...
          </div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  async fetchLiveAlerts() {
    this.isLoading = true;
    try {
      const nowIso = new Date().toISOString();
      const queryUrl = `${SUPABASE_API_URL}?closing_date=gt.${nowIso}&order=closing_date.asc`;
      
      const res = await fetch(queryUrl, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!res.ok) throw new Error("Could not fetch alerts from database");
      const data = await res.json();
      
      const nowMs = new Date().getTime();
      this.liveNotifications = data.map(item => {
        const diffMs = new Date(item.closing_date).getTime() - nowMs;
        const totalHoursRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
        const totalDaysRemaining = Math.floor(totalHoursRemaining / 24);
        return {
          ...item,
          totalHoursRemaining,
          totalDaysRemaining
        };
      });

    } catch (err) {
      this.liveNotifications = [];
    } finally {
      this.isLoading = false;
      this.renderListing();
    }
  },

  setFilter(categoryKey) {
    this.activeFilter = categoryKey;
    document.querySelectorAll('[id^="filter-btn-"]').forEach(btn => {
      btn.className = 'px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold transition';
    });

    const activeBtn = document.getElementById(`filter-btn-${categoryKey}`);
    if (activeBtn) {
      activeBtn.className = 'px-3.5 py-1.5 rounded-lg border border-rose-500 bg-rose-500/20 text-rose-300 font-bold transition';
    }

    this.renderListing();
  },

  renderListing() {
    const list = document.getElementById('alerts-listing-container');
    if (!list) return;

    const filtered = this.activeFilter === 'ALL'
      ? this.liveNotifications
      : this.liveNotifications.filter(item => item.category === this.activeFilter);

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/5 space-y-1">
          <p class="font-bold text-slate-200">No active applications currently closing in this category.</p>
          <span class="text-[11px] text-slate-500">Expired advertisements are automatically purged from this feed.</span>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(item => {
      let badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      let badgeText = `CLOSING: ${item.closing_date.split('T')[0]}`;

      if (item.totalHoursRemaining <= 24) {
        badgeClass = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse font-black';
        badgeText = `CLOSING IN ${item.totalHoursRemaining} HOURS`;
      } else if (item.totalDaysRemaining <= 3) {
        badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
        badgeText = `CLOSING IN ${item.totalDaysRemaining} DAYS`;
      }

      html += `
        <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-rose-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 rounded border text-[10px] uppercase ${badgeClass}">
                ${badgeText}
              </span>
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${item.authority}</span>
            </div>
            <h3 class="font-bold text-white text-sm md:text-base">${item.title}</h3>
            <p class="text-xs text-slate-300 font-medium">${item.posts}</p>
            <p class="text-[11px] text-slate-400">Eligibility: ${item.qualification}</p>
          </div>

          <div class="flex items-center space-x-2 flex-shrink-0">
            <button onclick="JobAlertsRegistry.routeToResizer('${item.preset_target}')" class="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 font-extrabold text-xs hover:bg-amber-500/20 transition flex items-center space-x-1.5 cursor-pointer">
              <i data-lucide="crop" class="w-3.5 h-3.5"></i>
              <span>Format Photo/Sign</span>
            </button>
            <a href="${item.official_portal}" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center space-x-1.5 shadow-md">
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              <span>Apply Official</span>
            </a>
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
      if (typeof window.currentState !== 'undefined') window.currentState = presetKey === 'STATE_PSC' ? 'APPSC' : presetKey;
    } else if (presetKey === 'AP_PSU' || presetKey === 'TG_PSU' || presetKey === 'PSU_HUB') {
      if (typeof window.currentExam !== 'undefined') window.currentExam = 'PSU_HUB';
      if (typeof window.currentPsu !== 'undefined') window.currentPsu = presetKey === 'PSU_HUB' ? 'AP_PSU' : presetKey;
    } else {
      if (typeof window.currentExam !== 'undefined') window.currentExam = presetKey;
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
