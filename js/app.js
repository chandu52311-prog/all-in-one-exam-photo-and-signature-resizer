/**
 * ExamResizer Pro - Master Application Controller & Navigation Orchestrator
 * Module: js/app.js
 * Architecture: Full-Page Workspace Routing, Nested Back Stack, State Sync & PWA Lifecycle
 */

let deferredInstallPrompt = null;

const ZONE_IDS = [
  'resizer-zone',
  'iq-zone',
  'pyq-zone',
  'mock-zone',
  'pdf-zone',
  'jobs-zone'
];

const NAV_MAP = {
  'resizer-zone': 'nav-btn-resizer',
  'iq-zone': 'nav-btn-iq',
  'pyq-zone': 'nav-btn-pyq',
  'mock-zone': 'nav-btn-mock',
  'pdf-zone': 'nav-btn-pdf',
  'jobs-zone': 'nav-btn-jobs'
};

const navStack = ['dashboard'];
let currentView = 'dashboard';
let isApplyingHistory = false;

function getDashboardEl() {
  return document.getElementById('main-dashboard-hub');
}

function setNavActiveState(activeZoneId) {
  Object.keys(NAV_MAP).forEach((zoneId) => {
    const btn = document.getElementById(NAV_MAP[zoneId]);
    if (!btn) return;

    if (zoneId === activeZoneId) {
      btn.className =
        'px-3 py-1.5 rounded-xl text-amber-400 bg-amber-500/10 border border-amber-500/40 font-extrabold shadow-sm hover:brightness-110 transition flex items-center space-x-1.5';
    } else {
      btn.className =
        'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center space-x-1.5 font-bold';
    }
  });
}

function renderDashboardView() {
  const dash = getDashboardEl();
  if (dash) {
    dash.classList.remove('hidden');
  }

  ZONE_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('block');
    }
  });

  setNavActiveState(null);
  currentView = 'dashboard';

  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderZoneView(targetZoneId) {
  if (!ZONE_IDS.includes(targetZoneId)) {
    renderDashboardView();
    return;
  }

  const dash = getDashboardEl();
  if (dash) {
    dash.classList.add('hidden');
  }

  ZONE_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === targetZoneId) {
      el.classList.remove('hidden');
      el.classList.add('block');
    } else {
      el.classList.add('hidden');
      el.classList.remove('block');
    }
  });

  setNavActiveState(targetZoneId);
  currentView = `zone:${targetZoneId}`;

  if (targetZoneId === 'iq-zone' && typeof window.returnToIQHub === 'function') {
    window.returnToIQHub();
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function pushViewState(viewToken) {
  if (isApplyingHistory) return;
  if (navStack[navStack.length - 1] !== viewToken) {
    navStack.push(viewToken);
  }
  try {
    window.history.pushState({ view: viewToken }, '', window.location.pathname + window.location.search);
  } catch (_) {
    // Ignore history restrictions
  }
}

// Open selected tool as a separate full-page workspace
window.switchZone = function (targetZoneId) {
  if (!ZONE_IDS.includes(targetZoneId)) return;

  const pyqModal = document.getElementById('pyqReaderModal');
  if (pyqModal && !pyqModal.classList.contains('hidden') && typeof window.closePyqReader === 'function') {
    window.closePyqReader();
  }

  const nextToken = `zone:${targetZoneId}`;
  renderZoneView(targetZoneId);
  pushViewState(nextToken);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Return directly to the 6-card Main Dashboard
window.goHomeDashboard = function () {
  const pyqModal = document.getElementById('pyqReaderModal');
  if (pyqModal && !pyqModal.classList.contains('hidden') && typeof window.closePyqReader === 'function') {
    window.closePyqReader();
  }

  renderDashboardView();
  pushViewState('dashboard');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// One-step / history-aware back handler
window.navBack = function () {
  const pyqModal = document.getElementById('pyqReaderModal');
  if (pyqModal && !pyqModal.classList.contains('hidden') && typeof window.closePyqReader === 'function') {
    window.closePyqReader();
    return;
  }

  if (currentView === 'zone:iq-zone') {
    const arenaEl = document.getElementById('iq-arena-screen');
    const scoreEl = document.getElementById('iq-scorecard-screen');
    const inSubScreen =
      (arenaEl && !arenaEl.classList.contains('hidden')) ||
      (scoreEl && !scoreEl.classList.contains('hidden'));

    if (inSubScreen && typeof window.returnToIQHub === 'function') {
      window.returnToIQHub();
      return;
    }
  }

  if (currentView === 'zone:mock-zone') {
    const gateEl = document.getElementById('mock-gatekeeper-screen');
    const liveEl = document.getElementById('mock-live-screen');
    const resEl = document.getElementById('mock-result-screen');
    const inSubScreen =
      (gateEl && !gateEl.classList.contains('hidden')) ||
      (liveEl && !liveEl.classList.contains('hidden')) ||
      (resEl && !resEl.classList.contains('hidden'));

    if (inSubScreen && typeof window.returnToMockHub === 'function') {
      window.returnToMockHub();
      return;
    }
  }

  if (navStack.length > 1) {
    navStack.pop();
    const prevToken = navStack[navStack.length - 1] || 'dashboard';
    if (prevToken === 'dashboard') {
      renderDashboardView();
    } else if (prevToken.startsWith('zone:')) {
      renderZoneView(prevToken.replace('zone:', ''));
    }
  } else {
    renderDashboardView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.addEventListener('popstate', (event) => {
  isApplyingHistory = true;
  try {
    const stateView = event.state && event.state.view;
    if (stateView && stateView.startsWith('zone:')) {
      const zId = stateView.replace('zone:', '');
      renderZoneView(zId);
    } else {
      renderDashboardView();
    }
  } finally {
    isApplyingHistory = false;
  }
});

// Progressive Web App (PWA) Lifecycle Management
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.classList.remove('hidden');
    installBtn.classList.add('flex');
  }
});

function setupPWAInstaller() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      alert('ExamResizer is already installed or your browser supports installing directly via the browser menu (Add to Home screen).');
      return;
    }

    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      installBtn.style.display = 'none';
    }
    deferredInstallPrompt = null;
  });

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
    deferredInstallPrompt = null;
  });
}

// Service Worker Registration for Offline Capabilities
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silent catch for local environments
      });
    });
  }
}

// Core App Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupPWAInstaller();
  registerServiceWorker();
  renderDashboardView();

  try {
    window.history.replaceState({ view: 'dashboard' }, '', window.location.pathname + window.location.search);
  } catch (_) {
    // Ignore history restrictions
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});
