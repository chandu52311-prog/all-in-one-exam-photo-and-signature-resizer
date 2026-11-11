/**
 * ExamResizer Pro - Master Application Controller & Navigation Orchestrator
 * Module: js/app.js
 * Architecture: Zero-Reload Workspace Routing, State Synchronization & PWA Install Lifecycle
 */

let deferredInstallPrompt = null;

// Global Zone Navigation Switcher (Synchronized with IQ Arena)
window.switchZone = function(targetZoneId) {
  const zoneIds = ['resizer-zone', 'iq-zone', 'pyq-zone', 'mock-zone', 'pdf-zone', 'jobs-zone'];
  const navMap = {
    'resizer-zone': 'nav-btn-resizer',
    'iq-zone': 'nav-btn-iq',
    'pyq-zone': 'nav-btn-pyq',
    'mock-zone': 'nav-btn-mock',
    'pdf-zone': 'nav-btn-pdf',
    'jobs-zone': 'nav-btn-jobs'
  };

  // Toggle Container Visibility
  zoneIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === targetZoneId) {
        el.classList.remove('hidden');
        el.classList.add('block');
      } else {
        el.classList.add('hidden');
        el.classList.remove('block');
      }
    }
  });

  // Synchronize Top Sticky Navigation Pills Styling
  Object.keys(navMap).forEach(zoneId => {
    const btn = document.getElementById(navMap[zoneId]);
    if (btn) {
      if (zoneId === targetZoneId) {
        btn.className = 'px-3 py-1.5 rounded-xl text-amber-400 bg-amber-500/10 border border-amber-500/40 font-extrabold shadow-sm hover:brightness-110 transition flex items-center space-x-1.5';
      } else {
        btn.className = 'px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center space-x-1.5 font-bold';
      }
    }
  });

  // Reset IQ Arena to its Selection Hub screen whenever switched to iq-zone
  if (targetZoneId === 'iq-zone' && typeof returnToIQHub === 'function') {
    returnToIQHub();
  }

  // Smooth scroll to top of workspace
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh Lucide Icons in dynamically displayed zones
  if (window.lucide) {
    lucide.createIcons();
  }
};

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

  if (window.lucide) {
    lucide.createIcons();
  }
});
