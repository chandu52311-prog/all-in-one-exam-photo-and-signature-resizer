/**
 * ExamResizer Pro - Live Government Recruitment & Institutional Alerts
 * Module: js/job-alerts.js
 * Architecture: Central & State Recruitment Registry with Direct Utility Routing
 */

const JobAlertsRegistry = {
  activeFilter: 'ALL',

  // Official Active Recruitment Notifications Database
  notifications: [
    {
      id: "REC_SSC_CGL_2026",
      authority: "Staff Selection Commission (SSC)",
      title: "Combined Graduate Level Examination (CGL) 2026",
      posts: "17,727 Vacancies (Group B & C Posts)",
      qualification: "Bachelor's Degree in any discipline from a recognized University",
      closingDate: "2026-11-28",
      urgency: "HIGH", // Triggers Warning Pulse
      hoursRemaining: 48,
      officialPortal: "https://ssc.gov.in",
      presetTarget: "SSC",
      category: "CENTRAL"
    },
    {
      id: "REC_RRB_NTPC_2026",
      authority: "Railway Recruitment Boards (RRB)",
      title: "Non-Technical Popular Categories (NTPC Graduate & Under Graduate)",
      posts: "11,558 Posts (Station Master, Goods Train Manager, Clerk)",
      qualification: "12th Standard Pass / Bachelor's Degree depending on post",
      closingDate: "2026-12-05",
      urgency: "NORMAL",
      hoursRemaining: 120,
      officialPortal: "https://rrbapply.gov.in",
      presetTarget: "RRB",
      category: "RAILWAYS"
    },
    {
      id: "REC_APPSC_GRP2_2026",
      authority: "Andhra Pradesh Public Service Commission (APPSC)",
      title: "Group-II Services General Recruitment",
      posts: "897 Executive & Non-Executive Cadres",
      qualification: "Degree of a recognized University in India",
      closingDate: "2026-11-24",
      urgency: "CRITICAL",
      hoursRemaining: 24,
      officialPortal: "https://psc.ap.gov.in",
      presetTarget: "APPSC",
      category: "STATE_PSC"
    },
    {
      id: "REC_UPSC_NDA_2026",
      authority: "Union Public Service Commission (UPSC)",
      title: "National Defence Academy & Naval Academy Examination (I)",
      posts: "400 Commissioned Officer Cadets",
      qualification: "12th Class Pass of the 10+2 pattern with Physics, Chemistry and Maths",
      closingDate: "2026-12-15",
      urgency: "NORMAL",
      hoursRemaining: 240,
      officialPortal: "https://upsconline.nic.in",
      presetTarget: "UPSC",
      category: "DEFENCE"
    },
    {
      id: "REC_APTRANSCO_AE_2026",
      authority: "AP Power Utilities (APTRANSCO / APGENCO)",
      title: "Assistant Engineer (Electrical & Civil) Recruitment",
      posts: "142 Posts across State Transmission Network",
      qualification: "4-Year B.Tech / B.E. in Electrical / Civil Engineering with minimum 60%",
      closingDate: "2026-11-30",
      urgency: "NORMAL",
      hoursRemaining: 96,
      officialPortal: "https://aptransco.co.in",
      presetTarget: "AP_PSU",
      category: "PSU"
    }
  ],

  init() {
    this.renderUI();
  },

  renderUI() {
    const root = document.getElementById('jobs-zone');
    if (!root) return;

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-rose-500/30 space-y-6">
        <!-- Module Header -->
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-heading font-bold text-xl text-white flex items-center">
              <i data-lucide="bell-ring" class="w-5 h-5 text-rose-400 mr-2 animate-pulse"></i>
              Live Government Recruitment & Examination Alerts
            </h2>
            <p class="text-xs text-slate-400">Verified Official Application Portals & Document Compliance Verification</p>
          </div>
          <button onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Return to Workspace</span>
          </button>
        </div>

        <!-- Filter Ribbon -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <button onclick="JobAlertsRegistry.setFilter('ALL')" id="filter-btn-ALL" class="px-3.5 py-1.5 rounded-lg border border-rose-500 bg-rose-500/20 text-rose-300 font-bold transition">
            All Notifications
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

        <!-- Active Alerts Stack -->
        <div id="alerts-listing-container" class="space-y-3.5">
          <!-- Dynamically populated cards -->
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderListing();
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
      ? this.notifications 
      : this.notifications.filter(item => item.category === this.activeFilter);

    if (filtered.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 glass-card rounded-xl">No active advertisements currently match this classification.</div>`;
      return;
    }

    let html = '';
    filtered.forEach(item => {
      const isUrgent = item.urgency === 'CRITICAL' || item.urgency === 'HIGH';
      const badgeClass = isUrgent 
        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' 
        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      const badgeText = isUrgent 
        ? `CLOSING IN ${item.hoursRemaining} HOURS` 
        : `CLOSING: ${item.closingDate}`;

      html += `
        <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-rose-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 rounded border text-[10px] font-extrabold ${badgeClass}">
                ${badgeText}
              </span>
              <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${item.authority}</span>
            </div>
            <h3 class="font-heading font-bold text-white text-sm md:text-base">${item.title}</h3>
            <p class="text-xs text-slate-300 font-medium">${item.posts}</p>
            <p class="text-[11px] text-slate-400">Eligibility: ${item.qualification}</p>
          </div>

          <div class="flex items-center space-x-2 flex-shrink-0">
            <button onclick="JobAlertsRegistry.routeToResizer('${item.presetTarget}')" class="px-3.5 py-2 rounded-xl bg-gold-500/10 border border-gold-500/40 text-gold-400 font-extrabold text-xs hover:bg-gold-500/20 transition flex items-center space-x-1.5">
              <i data-lucide="crop" class="w-3.5 h-3.5"></i>
              <span>Format Photo/Sign</span>
            </button>
            <a href="${item.officialPortal}" target="_blank" rel="noopener" class="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center space-x-1.5 shadow-md">
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

  // Bridge Action: Auto-selects the preset and opens the core Resizer tab
  routeToResizer(presetKey) {
    if (typeof switchZone === 'function') {
      switchZone('resizer-zone');
    }

    if (presetKey === 'STATE_PSC' || presetKey === 'APPSC' || presetKey === 'TGPSC') {
      currentExam = 'STATE_PSC';
      currentState = presetKey === 'STATE_PSC' ? 'APPSC' : presetKey;
    } else if (presetKey === 'AP_PSU' || presetKey === 'TG_PSU' || presetKey === 'PSU_HUB') {
      currentExam = 'PSU_HUB';
      currentPsu = presetKey === 'PSU_HUB' ? 'AP_PSU' : presetKey;
    } else {
      currentExam = presetKey;
    }

    if (typeof updateUI === 'function') {
      updateUI();
    }

    const uploadArea = document.getElementById('uploadBox');
    if (uploadArea) {
      uploadArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => JobAlertsRegistry.init());
} else {
  JobAlertsRegistry.init();
}
