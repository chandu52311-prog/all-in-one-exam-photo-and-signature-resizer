// ====================================================================
// ⏱️ EXAMRESIZER.ME - CBT MOCK ENGINE (FULL-SCREEN EXAM + EXACT ROUTING)
// Module: js/mock-test.js
// ====================================================================
(function () {
  'use strict';

  const SUPABASE_URL = "https://znkwwzasysqkvtclmktd.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2BqA77mr-KyhwkqRcYMh0g_tQbM_zE9";
  const BUNDLE_JSON_URL = "https://znkwwzasysqkvtclmktd.supabase.co/storage/v1/object/public/exam-papers/supabase_mocks_ready.json";

  const GOLD_ACTIVE_BTN = "px-3.5 py-2 rounded-xl text-xs font-extrabold transition border border-amber-400 bg-amber-500/25 text-amber-300 shadow-md cursor-pointer";
  const IDLE_NAV_BTN = "px-3.5 py-2 rounded-xl text-xs font-semibold transition border border-white/10 bg-slate-800/80 text-slate-300 hover:text-white hover:border-amber-400/50 cursor-pointer";

  const MOCK_CONFIG = {
    EXAM: {
      SSC: {
        title: "EXAMRESIZER.ME • SSC All Exams & JE Series",
        zone: "SSC",
        branches: {
          "CGL": "SSC CGL (100 Qs • 60m)",
          "CHSL": "SSC CHSL (100 Qs • 60m)",
          "GD": "SSC GD (80 Qs • 60m)",
          "MTS": "SSC MTS (90 Qs • 90m)",
          "CPO": "SSC CPO (200 Qs • 120m)",
          "JE_ME": "SSC JE Mechanical (200 Qs • 120m)",
          "JE_EC": "SSC JE Electronics (200 Qs • 120m)",
          "JE_EE": "SSC JE Electrical (200 Qs • 120m)",
          "JE_CE": "SSC JE Civil (200 Qs • 120m)"
        },
        qCount: 100,
        timeSec: 3600,
        posMark: 2.00,
        negMark: 0.50,
        stages: 10
      },
      RRB: {
        title: "EXAMRESIZER.ME • RRB All Exams & JE Series",
        zone: "RRB",
        branches: {
          "NTPC": "RRB NTPC (100 Qs • 90m)",
          "ALP": "RRB ALP (75 Qs • 60m)",
          "GROUP_D": "RRB Group D (100 Qs • 90m)",
          "TECHNICIAN": "RRB Technician (100 Qs • 90m)",
          "RPF_SI": "RRB RPF SI (120 Qs • 90m)",
          "RPF_CONSTABLE": "RRB RPF Constable (120 Qs • 90m)",
          "JE_ME": "RRB JE Mechanical (150 Qs • 120m)",
          "JE_EC": "RRB JE Electronics (150 Qs • 120m)",
          "JE_EE": "RRB JE Electrical (150 Qs • 120m)",
          "JE_CE": "RRB JE Civil (150 Qs • 120m)"
        },
        qCount: 100,
        timeSec: 5400,
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      BANKING: {
        title: "EXAMRESIZER.ME • Banking All Exams Series",
        zone: "BANKING",
        branches: {
          "IBPS_PO": "IBPS PO (100 Qs • 60m)",
          "IBPS_CLERK": "IBPS Clerk (100 Qs • 60m)",
          "SBI_PO": "SBI PO (100 Qs • 60m)",
          "SBI_CLERK": "SBI Clerk (100 Qs • 60m)",
          "IBPS_RRB_PO": "IBPS RRB PO (80 Qs • 45m)"
        },
        qCount: 100,
        timeSec: 3600,
        posMark: 1.00,
        negMark: 0.25,
        stages: 10
      },
      APPSC: {
        title: "EXAMRESIZER.ME • APPSC Group 1 & Group 2",
        zone: "APPSC",
        branches: {
          "GROUP_1": "APPSC Group 1 (150 Qs • 150m)",
          "GROUP_2": "APPSC Group 2 (150 Qs • 150m)"
        },
        qCount: 150,
        timeSec: 9000,
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      TGPSC: {
        title: "EXAMRESIZER.ME • TGPSC Group-1 & State Cadre",
        zone: "TGPSC",
        branches: {
          "GROUP_1": "TGPSC Group-1 (150 Qs • 150m)"
        },
        qCount: 150,
        timeSec: 9000,
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      POWER_PSU: {
        title: "EXAMRESIZER.ME • Power Utilities & PSUs (PGCIL / GENCO / TRANSCO)",
        zone: "POWER_PSU",
        branches: {
          "EE": "PSU Electrical & Power Cadre (100 Qs • 120m)"
        },
        qCount: 100,
        timeSec: 7200,
        posMark: 1.00,
        negMark: 0.25,
        stages: 10
      },
      GATE: {
        title: "EXAMRESIZER.ME • GATE All Branches",
        zone: "GATE",
        branches: {
          "ME": "GATE Mechanical (65 Qs • 180m)",
          "EC": "GATE Electronics (65 Qs • 180m)",
          "EE": "GATE Electrical (65 Qs • 180m)",
          "CE": "GATE Civil (65 Qs • 180m)",
          "CS": "GATE CS (65 Qs • 180m)",
          "CH": "GATE Chemical (65 Qs • 180m)",
          "IN": "GATE Instrumentation (65 Qs • 180m)"
        },
        qCount: 65,
        timeSec: 10800,
        posMark: 1.54,
        negMark: 0.50,
        stages: 10
      }
    },
    SUBJECT: {
      APTITUDE: { title: "EXAMRESIZER.ME • Aptitude Mastery", prefix: "aptitude", qCount: 50, timeSec: 3600, posMark: 1.00, negMark: 0.25, stages: 20 },
      REASONING: { title: "EXAMRESIZER.ME • Reasoning Mastery", prefix: "reasoning", qCount: 50, timeSec: 3600, posMark: 1.00, negMark: 0.25, stages: 20 },
      GK: { title: "EXAMRESIZER.ME • GK & GS Mastery", prefix: "gk", qCount: 50, timeSec: 3600, posMark: 1.00, negMark: 0.25, stages: 20 },
      MATHS: { title: "EXAMRESIZER.ME • Maths Mastery", prefix: "maths", qCount: 50, timeSec: 3600, posMark: 1.00, negMark: 0.25, stages: 20 },
      ENGLISH: { title: "EXAMRESIZER.ME • English Mastery", prefix: "english", qCount: 50, timeSec: 3600, posMark: 1.00, negMark: 0.25, stages: 20 }
    }
  };

  const DOMAIN_ALIAS = {
    "GATE": "GATE",
    "SSC": "SSC",
    "RRB": "RRB",
    "RAILWAY": "RRB",
    "RAILWAY (RRB)": "RRB",
    "BANKING": "BANKING",
    "BANK": "BANKING",
    "APPSC": "APPSC",
    "TGPSC": "TGPSC",
    "TSPSC": "TGPSC",
    "POWER_PSU": "POWER_PSU",
    "POWER PSU": "POWER_PSU",
    "POWER PSUS": "POWER_PSU",
    "PSU": "POWER_PSU"
  };

  let currentMockMode = 'EXAM';
  let currentAuthorityKey = 'SSC';
  let currentBranchKey = 'CGL';
  let currentSubjectKey = 'APTITUDE';
  let currentTestStage = 1;

  let bundleCache = null;
  let CBT_SESSION_CONFIG = null;
  let CBT_SESSION_STAGE = 1;
  let CBT_ACTIVE_QUESTIONS = [];
  let cbtIndex = 0;
  let cbtAnswers = {};
  let cbtVisited = new Set();
  let cbtReview = new Set();
  let cbtTimerSeconds = 3600;
  let cbtEndTime = 0;
  let cbtTimerInterval = null;
  let cbtSubmitted = false;
  let cbtLoadToken = 0;
  let cbtExternalWindow = null;

  function ensureBaseStyles() {
    if (document.getElementById('er-cbt-gold-style')) return;
    const style = document.createElement('style');
    style.id = 'er-cbt-gold-style';
    style.textContent = `
      .glass-card {
        background: rgba(15, 23, 42, 0.88);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(251, 191, 36, 0.24);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
      }
      .luxury-action-btn {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 55%, #d97706 100%);
        color: #090d16;
        box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
      }
      .cbt-opt-card {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        text-align: left;
        padding: 13px 15px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(30, 41, 59, 0.55);
        color: #e2e8f0;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .cbt-opt-card.is-selected {
        border: 1.5px solid #fbbf24 !important;
        background: linear-gradient(90deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.16)) !important;
        color: #fef3c7 !important;
        font-weight: 700 !important;
      }
      body.er-exam-fullscreen header,
      body.er-exam-fullscreen nav,
      body.er-exam-fullscreen footer,
      body.er-exam-fullscreen #main-dashboard-hub,
      body.er-exam-fullscreen #mock-hub-dashboard,
      body.er-exam-fullscreen #mock-gatekeeper-screen {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setExamFullscreenMode(active) {
    document.body.classList.toggle('er-exam-fullscreen', Boolean(active));
    if (active && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!active && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSafeNum(val, fallback) {
    if (val === null || val === undefined || val === '') return fallback;
    const n = Number(val);
    return Number.isFinite(n) ? n : fallback;
  }

  function getActiveConfig() {
    return currentMockMode === 'EXAM'
      ? MOCK_CONFIG.EXAM[currentAuthorityKey]
      : MOCK_CONFIG.SUBJECT[currentSubjectKey];
  }

  function getStorageKeyForName(name) {
    return 'er_progress_' + encodeURIComponent(name.trim().normalize('NFC').toLowerCase());
  }

  function readStudentProgress(name) {
    try {
      const parsed = JSON.parse(localStorage.getItem(getStorageKeyForName(name)) || '{}');
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  let savedName = '';
  try { savedName = localStorage.getItem('er_student_name') || ''; } catch (_) {}

  let currentStudent = {
    name: savedName,
    progress: savedName ? readStudentProgress(savedName) : {}
  };

  function checkExistingStudentSession() {
    const loginBox = document.getElementById('studentLoginBox');
    const profileBox = document.getElementById('studentProfileBox');
    const candidateBar = document.getElementById('candidateNameBar');
    if (!loginBox || !profileBox) return;

    if (currentStudent.name) {
      loginBox.classList.add('hidden');
      profileBox.classList.remove('hidden');
      const disp = document.getElementById('displayStudentName');
      if (disp) disp.innerText = currentStudent.name;
      if (candidateBar) candidateBar.innerText = `EXAMRESIZER.ME • Candidate: ${currentStudent.name}`;
    } else {
      loginBox.classList.remove('hidden');
      profileBox.classList.add('hidden');
      if (candidateBar) candidateBar.innerText = `EXAMRESIZER.ME • Candidate: Guest Aspirant`;
    }
  }

  function loginStudent() {
    const inp = document.getElementById('studentNameInput');
    const name = inp ? inp.value.trim() : '';
    if (!name || name.length < 2) {
      alert("Please enter your Name (at least 2 characters).");
      return;
    }
    const key = getStorageKeyForName(name);
    const stored = readStudentProgress(name);
    const merged = { ...stored };
    Object.keys(currentStudent.progress).forEach(k => {
      merged[k] = Math.max(Number(stored[k]) || 1, Number(currentStudent.progress[k]) || 1);
    });
    currentStudent.name = name;
    currentStudent.progress = merged;
    try {
      localStorage.setItem('er_student_name', currentStudent.name);
      localStorage.setItem(key, JSON.stringify(currentStudent.progress));
    } catch (_) {}
    checkExistingStudentSession();
    renderStageCards();
  }
  window.loginStudent = loginStudent;

  function logoutStudent() {
    try { localStorage.removeItem('er_student_name'); } catch (_) {}
    currentStudent = { name: '', progress: {} };
    checkExistingStudentSession();
    renderStageCards();
  }
  window.logoutStudent = logoutStudent;

  function getUserProgress(targetKey) {
    const cfg = getActiveConfig();
    const maxStages = cfg ? cfg.stages : 10;
    const val = Number(currentStudent.progress[targetKey]);
    if (!Number.isInteger(val) || val < 1) return 1;
    return Math.min(val, maxStages);
  }

  function saveUserProgress(targetKey, nextStage, maxStagesLimit) {
    const maxStages = maxStagesLimit || 10;
    if (nextStage > maxStages) return;
    const raw = Number(currentStudent.progress[targetKey]);
    const current = Number.isInteger(raw) && raw >= 1 ? Math.min(raw, maxStages) : 1;
    if (nextStage > current) {
      currentStudent.progress[targetKey] = nextStage;
      if (currentStudent.name) {
        try { localStorage.setItem(getStorageKeyForName(currentStudent.name), JSON.stringify(currentStudent.progress)); } catch (_) {}
      }
    }
  }

  function ensureBankingButtonVisible() {
    const examBlock = document.getElementById('examDomainNavBlock');
    if (!examBlock || document.getElementById('domain-btn-BANKING')) return;
    const anchor = document.getElementById('domain-btn-APPSC') || examBlock.querySelector('button');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'domain-btn-BANKING';
    btn.textContent = 'Banking';
    btn.onclick = () => selectMockDomain('BANKING');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(btn, anchor.nextSibling);
    } else {
      examBlock.appendChild(btn);
    }
  }

  function paintActiveButtons() {
    const examModeBtn = document.getElementById('mode-btn-EXAM');
    const subjModeBtn = document.getElementById('mode-btn-SUBJECT');
    if (examModeBtn) examModeBtn.className = currentMockMode === 'EXAM' ? GOLD_ACTIVE_BTN : IDLE_NAV_BTN;
    if (subjModeBtn) subjModeBtn.className = currentMockMode === 'SUBJECT' ? GOLD_ACTIVE_BTN : IDLE_NAV_BTN;

    if (currentMockMode === 'EXAM') {
      Object.keys(MOCK_CONFIG.EXAM).forEach(k => {
        const btn = document.getElementById('domain-btn-' + k);
        if (btn) btn.className = (k === currentAuthorityKey) ? GOLD_ACTIVE_BTN : IDLE_NAV_BTN;
      });
    } else {
      Object.keys(MOCK_CONFIG.SUBJECT).forEach(k => {
        const btn = document.getElementById('domain-btn-' + k);
        if (btn) btn.className = (k === currentSubjectKey) ? GOLD_ACTIVE_BTN : IDLE_NAV_BTN;
      });
    }
  }

  function switchMockMode(mode) {
    currentMockMode = (mode === 'SUBJECT') ? 'SUBJECT' : 'EXAM';
    const examBlock = document.getElementById('examDomainNavBlock');
    const subjBlock = document.getElementById('subjectDomainNavBlock');
    const branchContainer = document.getElementById('mockBranchNavContainer');

    if (currentMockMode === 'EXAM') {
      ensureBankingButtonVisible();
      if (examBlock) examBlock.classList.remove('hidden');
      if (subjBlock) subjBlock.classList.add('hidden');
      if (branchContainer) branchContainer.classList.remove('hidden');
      selectMockDomain(currentAuthorityKey);
    } else {
      if (examBlock) examBlock.classList.add('hidden');
      if (subjBlock) subjBlock.classList.remove('hidden');
      if (branchContainer) branchContainer.classList.add('hidden');
      selectSubjectDomain(currentSubjectKey);
    }
    paintActiveButtons();
  }
  window.switchMockMode = switchMockMode;

  function selectMockDomain(rawKey) {
    currentMockMode = 'EXAM';
    const norm = DOMAIN_ALIAS[String(rawKey || '').trim().toUpperCase()] || 'SSC';
    currentAuthorityKey = MOCK_CONFIG.EXAM[norm] ? norm : 'SSC';
    const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
    const branchKeys = Object.keys(authData.branches);
    currentBranchKey = branchKeys[0];

    const titleEl = document.getElementById('activeMockDomainTitle');
    if (titleEl) titleEl.innerText = authData.title;
    renderBranchSubButtons();
    paintActiveButtons();
  }
  window.selectMockDomain = selectMockDomain;

  function renderBranchSubButtons() {
    const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
    const container = document.getElementById('branchSubButtonsRow');
    if (!authData || !container) return;
    const keys = Object.keys(authData.branches);
    if (!keys.includes(currentBranchKey)) currentBranchKey = keys[0];

    container.innerHTML = keys.map(bk => {
      const active = bk === currentBranchKey;
      return `<button type="button" id="mock-branch-btn-${bk}" onclick="switchBranch('${bk}')" class="${active ? GOLD_ACTIVE_BTN : IDLE_NAV_BTN}">${escapeHTML(authData.branches[bk])}</button>`;
    }).join('');
    renderStageCards();
  }

  function switchBranch(branchKey) {
    const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
    if (!authData || !authData.branches[branchKey]) return;
    currentBranchKey = branchKey;
    renderBranchSubButtons();
  }
  window.switchBranch = switchBranch;

  function selectSubjectDomain(subjKey) {
    currentMockMode = 'SUBJECT';
    const key = String(subjKey || 'APTITUDE').trim().toUpperCase();
    currentSubjectKey = MOCK_CONFIG.SUBJECT[key] ? key : 'APTITUDE';
    const subjData = MOCK_CONFIG.SUBJECT[currentSubjectKey];
    const titleEl = document.getElementById('activeMockDomainTitle');
    if (titleEl) titleEl.innerText = `${subjData.title} (${subjData.qCount} Qs • ${Math.round(subjData.timeSec / 60)} Mins)`;
    renderStageCards();
    paintActiveButtons();
  }
  window.selectSubjectDomain = selectSubjectDomain;

  function renderStageCards() {
    const container = document.getElementById('mockTestsGridContainer');
    if (!container) return;

    const isExam = currentMockMode === 'EXAM';
    const cfg = getActiveConfig();
    const activeKey = isExam ? currentBranchKey : cfg.prefix;
    const activeTitle = isExam ? cfg.branches[currentBranchKey] : cfg.title;
    const maxStages = cfg.stages;
    const unlockedStage = getUserProgress(activeKey);

    let html = '';
    for (let stage = 1; stage <= maxStages; stage++) {
      const isUnlocked = stage <= unlockedStage;
      const isNextTarget = stage === unlockedStage;
      html += `
        <div class="p-4 rounded-xl glass-card ${isNextTarget ? 'border-amber-400' : ''} ${!isUnlocked ? 'opacity-55' : ''} flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-[10px] font-black uppercase text-amber-300 mb-1">
              <span>EXAMRESIZER.ME</span>
              <span>Mock #${stage}</span>
            </div>
            <h4 class="font-bold text-white text-sm">${escapeHTML(activeTitle)} • Mock ${stage}</h4>
            <p class="text-[11px] text-slate-300 mt-0.5">${cfg.qCount} Questions • ${Math.round(cfg.timeSec / 60)} Mins</p>
          </div>
          <div>
            ${isUnlocked
              ? `<button type="button" onclick="prepareTestStage(${stage})" class="w-full py-2.5 rounded-xl luxury-action-btn font-extrabold text-xs cursor-pointer">${stage < unlockedStage ? 'Retake Mock' : 'Start Mock Test'}</button>`
              : `<button type="button" disabled class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 border border-white/10 font-bold text-xs cursor-not-allowed">🔒 Clear Mock ${stage - 1} First</button>`}
          </div>
        </div>
      `;
    }

    const upcomingStage = maxStages + 1;
    html += `
      <div class="p-4 rounded-xl glass-card border border-amber-400/35 flex flex-col justify-between space-y-3 opacity-90">
        <div>
          <div class="flex items-center justify-between text-[10px] font-black uppercase text-amber-400 mb-1">
            <span>EXAMRESIZER.ME</span>
            <span>Mock #${upcomingStage}</span>
          </div>
          <h4 class="font-bold text-white text-sm">${escapeHTML(activeTitle)} • Mock ${upcomingStage}</h4>
          <p class="text-[11px] text-slate-300 mt-0.5">Coming Soon • New Verified PYQ Set</p>
        </div>
        <div>
          <button type="button" disabled class="w-full py-2.5 rounded-xl bg-slate-800 text-amber-300 border border-amber-400/30 font-extrabold text-xs cursor-not-allowed">Coming Soon</button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
  window.renderStageCards = renderStageCards;

  function prepareTestStage(stage) {
    const cfg = getActiveConfig();
    if (!Number.isInteger(stage) || stage < 1 || stage > cfg.stages) {
      alert("This stage is Coming Soon.");
      return;
    }
    const isExam = currentMockMode === 'EXAM';
    const activeKey = isExam ? currentBranchKey : cfg.prefix;
    if (stage > getUserProgress(activeKey)) {
      alert("Clear the previous mock first.");
      return;
    }

    cbtLoadToken++;
    currentTestStage = stage;
    const activeTitle = isExam ? cfg.branches[currentBranchKey] : cfg.title;
    const dash = document.getElementById('mock-hub-dashboard');
    const gate = document.getElementById('mock-gatekeeper-screen');
    if (dash) dash.classList.add('hidden');
    if (gate) gate.classList.remove('hidden');

    const titleEl = document.getElementById('gatekeeperTestTitle');
    if (titleEl) titleEl.innerText = `EXAMRESIZER.ME • ${activeTitle} • Mock #${stage}`;

    const chk = document.getElementById('policyAgreementCheckbox');
    if (chk) { chk.checked = false; toggleCBTReady(chk); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.prepareTestStage = prepareTestStage;

  function returnToMockHub() {
    cbtLoadToken++;
    clearInterval(cbtTimerInterval);
    setExamFullscreenMode(false);
    if (cbtExternalWindow && !cbtExternalWindow.closed) {
      try { cbtExternalWindow.close(); } catch (_) {}
    }
    cbtExternalWindow = null;
    CBT_ACTIVE_QUESTIONS = [];
    CBT_SESSION_CONFIG = null;
    CBT_SESSION_STAGE = 1;
    cbtAnswers = {};
    cbtVisited = new Set();
    cbtReview = new Set();
    cbtSubmitted = false;

    const gate = document.getElementById('mock-gatekeeper-screen');
    const live = document.getElementById('mock-live-screen');
    const res = document.getElementById('mock-result-screen');
    const dash = document.getElementById('mock-hub-dashboard');
    if (gate) gate.classList.add('hidden');
    if (live) live.classList.add('hidden');
    if (res) res.classList.add('hidden');
    if (dash) dash.classList.remove('hidden');
    renderStageCards();
    paintActiveButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.returnToMockHub = returnToMockHub;

  function toggleCBTReady(el) {
    const btn = document.getElementById('startCbtBtn');
    if (!btn) return;
    const ok = Boolean(el && el.checked);
    btn.disabled = !ok;
    btn.className = ok
      ? 'px-7 py-3 rounded-xl luxury-action-btn font-extrabold text-xs cursor-pointer'
      : 'px-7 py-3 rounded-xl bg-slate-700 text-slate-400 border border-white/10 font-black text-xs cursor-not-allowed';
  }
  window.toggleCBTReady = toggleCBTReady;

  function buildSlug(isExam, cfg, activeKey, stageNum) {
    const pad = String(stageNum).padStart(2, '0');
    if (!isExam) return `subject-${cfg.prefix.toLowerCase()}-mock-${pad}`;
    return `exam-${cfg.zone.toLowerCase()}-${activeKey.toLowerCase()}-mock-${pad}`;
  }

  async function resolveMockRow(targetSlug, signal) {
    try {
      const endpoint = `${SUPABASE_URL}/rest/v1/mock_tests?slug=eq.${encodeURIComponent(targetSlug)}&select=*`;
      const res = await fetch(endpoint, {
        signal,
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0 && rows[0].status === 'ACTIVE') {
          return rows[0];
        }
      }
    } catch (_) {}

    if (!Array.isArray(bundleCache) || bundleCache.length === 0) {
      const res = await fetch(BUNDLE_JSON_URL, { signal });
      if (!res.ok) throw new Error(`Bundle HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Bundle invalid");
      bundleCache = data;
    }
    return bundleCache.find(r => r && r.slug === targetSlug && r.status === 'ACTIVE') || null;
  }

  function formatSecondsForClock(totalSec) {
    const safeSec = Math.max(0, Math.ceil(totalSec));
    const h = Math.floor(safeSec / 3600);
    const m = Math.floor((safeSec % 3600) / 60);
    const s = safeSec % 60;
    return h > 0
      ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function tickCbtTimer() {
    cbtTimerSeconds = Math.max(0, Math.ceil((cbtEndTime - Date.now()) / 1000));
    const formatted = formatSecondsForClock(cbtTimerSeconds);
    const clock = document.getElementById('cbtClock');
    if (clock) clock.innerText = formatted;

    if (cbtExternalWindow && !cbtExternalWindow.closed) {
      try {
        const winClock = cbtExternalWindow.document.getElementById('extCbtClock');
        if (winClock) winClock.innerText = formatted;
      } catch (_) {}
    }

    if (cbtTimerSeconds <= 0) submitCBT(true);
  }

  function buildResultAnalysisMarkup(activeTitle, stageNum, netScore, maxMarks, pct, correctCount, wrongCount, pendingKeyCount, nextStageNum, maxStages) {
    const itemsHtml = CBT_ACTIVE_QUESTIONS.map((q, idx) => {
      const picked = cbtAnswers[idx];
      const hasKey = q.answer_verified && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length;
      const isRight = hasKey && picked === q.correct;
      const userStr = picked !== undefined ? `(${String.fromCharCode(65 + picked)}) ${escapeHTML(q.options[picked])}` : "Not Attempted";
      const ansStr = hasKey ? `(${String.fromCharCode(65 + q.correct)}) ${escapeHTML(q.options[q.correct])}` : "Pending Authentic Key Verification";
      return `
        <div style="background:#0d1424;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:14px;margin-bottom:10px;font-size:13px;">
          <div style="font-weight:800;color:#fbbf24;margin-bottom:4px;">EXAMRESIZER.ME • Q${idx + 1} (${escapeHTML(q.section)})</div>
          <div style="color:#fff;font-weight:600;margin-bottom:6px;">${escapeHTML(q.en)}</div>
          <div style="color:${isRight ? '#34d399' : '#fb7185'};font-weight:700;margin-bottom:3px;">Your Answer: ${userStr}</div>
          <div style="color:${hasKey ? '#34d399' : '#fbbf24'};font-weight:700;margin-bottom:4px;">Answer Key: ${ansStr}</div>
          <div style="color:#cbd5e1;"><strong>Analysis:</strong> ${escapeHTML(q.explanation)}</div>
        </div>
      `;
    }).join('');

    const canGoNext = nextStageNum <= maxStages;

    return `
      <div style="max-width:1160px;margin:0 auto;padding:20px;">
        <div style="background:#0d1424;border:1px solid rgba(251,191,36,0.35);border-radius:16px;padding:22px;margin-bottom:18px;">
          <h2 style="margin:0 0 14px 0;font-size:20px;font-weight:900;color:#fff;">EXAMRESIZER.ME • ${escapeHTML(activeTitle)} • Mock #${stageNum} Result & Analysis</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;text-align:center;">
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:12px;">
              <div style="font-size:12px;color:#94a3b8;">Net Score</div>
              <div style="font-size:18px;font-weight:900;color:#fbbf24;margin-top:4px;">${netScore.toFixed(2)} / ${maxMarks.toFixed(2)}</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:12px;">
              <div style="font-size:12px;color:#94a3b8;">Accuracy / %</div>
              <div style="font-size:18px;font-weight:900;color:#34d399;margin-top:4px;">${pct.toFixed(1)}%</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:12px;">
              <div style="font-size:12px;color:#94a3b8;">Correct</div>
              <div style="font-size:18px;font-weight:900;color:#34d399;margin-top:4px;">${correctCount}</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(251,191,36,0.2);border-radius:12px;padding:12px;">
              <div style="font-size:12px;color:#94a3b8;">Wrong / Key Pending</div>
              <div style="font-size:18px;font-weight:900;color:#fb7185;margin-top:4px;">${wrongCount} / ${pendingKeyCount}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:22px;">${itemsHtml}</div>

        <div style="background:#0d1424;border:1px solid rgba(251,191,36,0.35);border-radius:16px;padding:18px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${canGoNext
              ? `<button type="button" id="cbtNextMockBtn" style="background:linear-gradient(135deg,#fbbf24,#d97706);color:#090d16;border:none;border-radius:10px;padding:11px 18px;font-weight:900;font-size:13px;cursor:pointer;">Next Mock Test (#${nextStageNum}) ➔</button>`
              : `<span style="color:#fbbf24;font-weight:800;font-size:13px;padding:10px 4px;">All Available Mocks Completed</span>`}
            <button type="button" id="cbtRetrySameBtn" style="background:#1e293b;color:#fde68a;border:1px solid rgba(251,191,36,0.45);border-radius:10px;padding:11px 18px;font-weight:800;font-size:13px;cursor:pointer;">Retry Same Exam (Mock #${stageNum}) 🔁</button>
          </div>
          <button type="button" id="cbtBackToHubBtn" style="background:rgba(255,255,255,0.06);color:#f8fafc;border:1px solid rgba(255,255,255,0.18);border-radius:10px;padding:11px 16px;font-weight:800;font-size:13px;cursor:pointer;">Back to Mock Hub</button>
        </div>
      </div>
    `;
  }

  function renderResultInExternalWindow(markup, nextStageNum, sameStageNum) {
    if (!cbtExternalWindow || cbtExternalWindow.closed) return false;
    try {
      const doc = cbtExternalWindow.document;
      doc.body.innerHTML = markup;
      doc.title = `Result & Analysis • Mock #${sameStageNum}`;

      const nextBtn = doc.getElementById('cbtNextMockBtn');
      if (nextBtn) {
        nextBtn.onclick = () => {
          if (window.opener && !window.opener.closed && typeof window.opener.__launchMockStageFromResult === 'function') {
            window.opener.__launchMockStageFromResult(nextStageNum);
          }
        };
      }

      const retryBtn = doc.getElementById('cbtRetrySameBtn');
      if (retryBtn) {
        retryBtn.onclick = () => {
          if (window.opener && !window.opener.closed && typeof window.opener.__launchMockStageFromResult === 'function') {
            window.opener.__launchMockStageFromResult(sameStageNum);
          }
        };
      }

      const hubBtn = doc.getElementById('cbtBackToHubBtn');
      if (hubBtn) {
        hubBtn.onclick = () => {
          if (window.opener && !window.opener.closed && typeof window.opener.returnToMockHub === 'function') {
            window.opener.returnToMockHub();
          }
          try { cbtExternalWindow.close(); } catch (_) {}
        };
      }

      cbtExternalWindow.scrollTo({ top: 0, behavior: 'smooth' });
      cbtExternalWindow.focus();
      return true;
    } catch (_) {
      return false;
    }
  }

  window.__launchMockStageFromResult = function (targetStage) {
    const cfg = CBT_SESSION_CONFIG || getActiveConfig();
    const maxStages = cfg ? cfg.stages : 10;
    const bounded = Math.max(1, Math.min(Number(targetStage) || 1, maxStages));
    currentTestStage = bounded;
    cbtSubmitted = false;
    const gate = document.getElementById('mock-gatekeeper-screen');
    if (gate) gate.classList.remove('hidden');
    startCbtSession();
  };

  function renderExternalCbtWindow(examTitle, candidateName, durMins) {
    try {
      const win = window.open('', 'ExamResizerLiveCBT', 'popup=no,width=1366,height=820,left=0,top=0,scrollbars=yes,resizable=yes');
      if (!win || win.closed) return null;

      cbtExternalWindow = win;
      const questionsJsonStr = JSON.stringify(CBT_ACTIVE_QUESTIONS).replace(/</g, '\\u003c');
      const safeTitle = escapeHTML(examTitle);
      const safeCandidate = escapeHTML(candidateName || 'Guest Aspirant');

      win.document.open();
      win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle} — Live CBT Terminal</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: #060a13;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .cbt-top {
      background: #0d1424;
      border-bottom: 1px solid rgba(251, 191, 36, 0.35);
      padding: 12px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .cbt-brand { font-weight: 900; font-size: 15px; color: #fbbf24; letter-spacing: 0.4px; }
    .cbt-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
    .cbt-controls-top { display: flex; align-items: center; gap: 12px; }
    .cbt-timer {
      background: #050811;
      border: 1px solid #fbbf24;
      color: #fbbf24;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-weight: 800;
      font-size: 16px;
      padding: 7px 14px;
      border-radius: 10px;
    }
    .btn-submit {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: #fff;
      border: none;
      font-weight: 800;
      font-size: 12px;
      padding: 9px 16px;
      border-radius: 10px;
      cursor: pointer;
    }
    .cbt-main {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 310px;
      gap: 16px;
      padding: 18px 20px;
      max-width: 1440px;
      width: 100%;
      margin: 0 auto;
    }
    @media (max-width: 900px) {
      .cbt-main { grid-template-columns: 1fr; }
    }
    .q-panel {
      background: #0d1424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 520px;
    }
    .q-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding-bottom: 10px;
      margin-bottom: 16px;
      font-size: 12px;
      color: #fbbf24;
      font-weight: 700;
    }
    .q-text { font-size: 16px; line-height: 1.6; font-weight: 600; color: #fff; margin-bottom: 18px; }
    .opt-list { display: flex; flex-direction: column; gap: 10px; }
    .opt-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(15, 23, 42, 0.85);
      color: #e2e8f0;
      font-size: 14px;
      cursor: pointer;
      text-align: left;
    }
    .opt-item.active {
      border-color: #fbbf24;
      background: rgba(245, 158, 11, 0.24);
      color: #fef3c7;
      font-weight: 700;
    }
    .q-footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 14px;
      margin-top: 22px;
    }
    .btn-sec {
      background: #1e293b;
      color: #e2e8f0;
      border: 1px solid rgba(255,255,255,0.16);
      padding: 9px 14px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-next {
      background: linear-gradient(135deg, #34d399, #10b981);
      color: #052e16;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
    }
    .palette-panel {
      background: #0d1424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      max-height: 360px;
      overflow-y: auto;
    }
    .p-btn {
      height: 36px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.12);
      background: #1e293b;
      color: #cbd5e1;
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .p-btn.ans { background: #f59e0b; color: #090d16; border-color: #fde68a; }
    .p-btn.rev { background: #7c3aed; color: #fff; }
    .p-btn.vis { background: rgba(244, 63, 94, 0.8); color: #fff; }
    .p-btn.curr { outline: 2px solid #fef08a; }
    .legend { font-size: 11px; color: #94a3b8; display: grid; gap: 6px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px; }
  </style>
</head>
<body>
  <div class="cbt-top">
    <div>
      <div class="cbt-brand">${safeTitle}</div>
      <div class="cbt-sub">Candidate: ${safeCandidate} • Duration: ${Number(durMins)} Mins • Real CBT Session</div>
    </div>
    <div class="cbt-controls-top">
      <span id="extCbtClock" class="cbt-timer">00:00</span>
      <button type="button" id="extSubmitBtn" class="btn-submit">Submit Test</button>
    </div>
  </div>

  <div class="cbt-main">
    <div class="q-panel">
      <div>
        <div class="q-meta">
          <span id="extQNum">Question 1</span>
          <span id="extQSec">General</span>
        </div>
        <div id="extQText" class="q-text"></div>
        <div id="extOpts" class="opt-list"></div>
      </div>
      <div class="q-footer">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" id="extClearBtn" class="btn-sec">Clear Response</button>
          <button type="button" id="extReviewBtn" class="btn-sec">Mark for Review</button>
        </div>
        <button type="button" id="extSaveNextBtn" class="btn-next">Save & Next ➔</button>
      </div>
    </div>

    <div class="palette-panel">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;">
        <span>Question Palette</span>
        <span id="extAnsCount" style="color:#fbbf24;">0 Answered</span>
      </div>
      <div id="extPalette" class="palette-grid"></div>
      <div class="legend">
        <div>■ Amber = Answered</div>
        <div>■ Purple = Marked for Review</div>
        <div>■ Red = Not Answered (Visited)</div>
        <div>■ Slate = Not Visited</div>
      </div>
    </div>
  </div>

  <script>
    const Q_LIST = ${questionsJsonStr};
    let idx = 0;
    const ansMap = {};
    const revSet = new Set();
    const visSet = new Set([0]);

    function syncParentState() {
      if (window.opener && !window.opener.closed && typeof window.opener.__syncCbtFromExternal === 'function') {
        window.opener.__syncCbtFromExternal(idx, { ...ansMap }, Array.from(revSet), Array.from(visSet));
      }
    }

    function renderAll() {
      const q = Q_LIST[idx];
      if (!q) return;
      visSet.add(idx);
      document.getElementById('extQNum').textContent = 'Question ' + (idx + 1) + ' of ' + Q_LIST.length;
      document.getElementById('extQSec').textContent = (q.section || 'General') + ' (+' + q.marks + ' / -' + q.negativeMarks + ')';
      document.getElementById('extQText').textContent = q.en;

      const picked = ansMap[idx];
      const optsBox = document.getElementById('extOpts');
      optsBox.innerHTML = '';
      q.options.forEach((optText, oIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'opt-item' + (picked === oIdx ? ' active' : '');
        const letter = String.fromCharCode(65 + oIdx);
        btn.textContent = '(' + letter + ') ' + optText;
        btn.onclick = () => {
          ansMap[idx] = oIdx;
          syncParentState();
          renderAll();
        };
        optsBox.appendChild(btn);
      });

      const pal = document.getElementById('extPalette');
      pal.innerHTML = '';
      let answeredCount = 0;
      Q_LIST.forEach((_, qIdx) => {
        const b = document.createElement('button');
        b.type = 'button';
        const isA = ansMap[qIdx] !== undefined;
        const isR = revSet.has(qIdx);
        const isV = visSet.has(qIdx);
        if (isA) answeredCount++;
        let cls = 'p-btn';
        if (isR) cls += ' rev';
        else if (isA) cls += ' ans';
        else if (isV) cls += ' vis';
        if (qIdx === idx) cls += ' curr';
        b.className = cls;
        b.textContent = String(qIdx + 1);
        b.onclick = () => {
          idx = qIdx;
          syncParentState();
          renderAll();
        };
        pal.appendChild(b);
      });

      document.getElementById('extAnsCount').textContent = answeredCount + ' / ' + Q_LIST.length + ' Answered';
    }

    document.getElementById('extClearBtn').onclick = () => {
      delete ansMap[idx];
      syncParentState();
      renderAll();
    };

    document.getElementById('extReviewBtn').onclick = () => {
      if (revSet.has(idx)) revSet.delete(idx);
      else revSet.add(idx);
      syncParentState();
      renderAll();
    };

    document.getElementById('extSaveNextBtn').onclick = () => {
      if (idx < Q_LIST.length - 1) idx++;
      syncParentState();
      renderAll();
    };

    document.getElementById('extSubmitBtn').onclick = () => {
      syncParentState();
      if (window.opener && !window.opener.closed && typeof window.opener.submitCBT === 'function') {
        window.opener.submitCBT(true);
      }
    };

    renderAll();
  <\/script>
</body>
</html>`);
      win.document.close();
      win.focus();
      return win;
    } catch (_) {
      return null;
    }
  }

  window.__syncCbtFromExternal = function (extIdx, extAnswers, extReviewArr, extVisitedArr) {
    if (cbtSubmitted) return;
    if (typeof extIdx === 'number' && extIdx >= 0 && extIdx < CBT_ACTIVE_QUESTIONS.length) {
      cbtIndex = extIdx;
    }
    if (extAnswers && typeof extAnswers === 'object') {
      cbtAnswers = { ...extAnswers };
    }
    if (Array.isArray(extReviewArr)) {
      cbtReview = new Set(extReviewArr);
    }
    if (Array.isArray(extVisitedArr)) {
      cbtVisited = new Set(extVisitedArr);
    }
    renderCbtQuestion();
    renderCbtPalette();
  };

  async function startCbtSession() {
    const token = ++cbtLoadToken;
    const startBtn = document.getElementById('startCbtBtn');
    if (startBtn) {
      startBtn.innerText = "⏳ Loading Mock...";
      startBtn.disabled = true;
    }

    const isExam = currentMockMode === 'EXAM';
    const cfg = getActiveConfig();
    const activeKey = isExam ? currentBranchKey : cfg.prefix;
    const stageAtStart = currentTestStage;
    const activeTitleAtStart = isExam ? cfg.branches[currentBranchKey] : cfg.title;
    const targetSlug = buildSlug(isExam, cfg, activeKey, stageAtStart);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);

    try {
      const row = await resolveMockRow(targetSlug, controller.signal);
      if (!row || !Array.isArray(row.questions_json) || row.questions_json.length === 0) {
        throw new Error(`Missing mock for ${targetSlug}`);
      }

      const gateScreen = document.getElementById('mock-gatekeeper-screen');
      if (token !== cbtLoadToken || !gateScreen || gateScreen.classList.contains('hidden')) return;

      CBT_SESSION_CONFIG = { ...cfg, activeTitle: activeTitleAtStart, activeKey };
      CBT_SESSION_STAGE = stageAtStart;
      CBT_ACTIVE_QUESTIONS = row.questions_json.map((q, idx) => ({
        id: q.id || `q_${idx}`,
        section: q.section || q.subject || "General",
        en: String(q.en || q.question || "").trim(),
        options: Array.isArray(q.options) ? q.options.map(String) : [],
        correct: Number.isInteger(q.correct) ? q.correct : (Number.isInteger(q.answer_index) ? q.answer_index : null),
        answer_verified: Boolean(q.answer_verified) && (Number.isInteger(q.correct) || Number.isInteger(q.answer_index)),
        marks: getSafeNum(q.marks, cfg.posMark),
        negativeMarks: getSafeNum(q.negativeMarks, cfg.negMark),
        explanation: String(q.explanation || q.analysis || "")
      })).filter(x => x.en && x.options.length >= 2);

      if (!CBT_ACTIVE_QUESTIONS.length) throw new Error("No valid questions");

      cbtSubmitted = false;
      gateScreen.classList.add('hidden');
      setExamFullscreenMode(true);
      const liveScreen = document.getElementById('mock-live-screen');
      if (liveScreen) liveScreen.classList.remove('hidden');

      const examHeaderLabel = `EXAMRESIZER.ME • ${activeTitleAtStart} • Mock #${stageAtStart}`;
      const hdr = document.getElementById('liveExamHeaderTitle');
      if (hdr) hdr.innerText = examHeaderLabel;

      cbtIndex = 0;
      cbtAnswers = {};
      cbtVisited = new Set([0]);
      cbtReview = new Set();

      renderCbtQuestion();
      renderCbtPalette();

      const durMins = getSafeNum(row.duration_mins, Math.round(cfg.timeSec / 60));
      renderExternalCbtWindow(examHeaderLabel, currentStudent.name, durMins);

      cbtEndTime = Date.now() + durMins * 60 * 1000;
      tickCbtTimer();
      clearInterval(cbtTimerInterval);
      cbtTimerInterval = setInterval(tickCbtTimer, 1000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      if (token === cbtLoadToken) {
        console.error(err);
        alert(`Could not load mock (${targetSlug}). Check Supabase mock_tests or bundle.`);
      }
    } finally {
      clearTimeout(timer);
      if (token === cbtLoadToken && startBtn) {
        startBtn.innerText = "I AM READY TO BEGIN";
        const chk = document.getElementById('policyAgreementCheckbox');
        startBtn.disabled = !(chk && chk.checked);
      }
    }
  }
  window.startCbtSession = startCbtSession;

  function syncOptionVisuals() {
    const picked = cbtAnswers[cbtIndex];
    const cont = document.getElementById('cbtOptionsContainer');
    if (!cont) return;
    cont.querySelectorAll('[data-opt-idx]').forEach(card => {
      const idx = Number(card.getAttribute('data-opt-idx'));
      const isSel = picked === idx;
      card.classList.toggle('is-selected', isSel);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isSel;
    });
  }

  function renderCbtQuestion() {
    const q = CBT_ACTIVE_QUESTIONS[cbtIndex];
    if (!q) return;
    cbtVisited.add(cbtIndex);

    const numEl = document.getElementById('cbtQuestionNum');
    const secEl = document.getElementById('cbtSectionTag');
    const txtEl = document.getElementById('cbtQuestionText');
    if (numEl) numEl.innerText = `EXAMRESIZER.ME • Question ${cbtIndex + 1} of ${CBT_ACTIVE_QUESTIONS.length}`;
    if (secEl) secEl.innerText = `${q.section} (+${q.marks} / -${q.negativeMarks})`;
    if (txtEl) txtEl.textContent = q.en;

    const picked = cbtAnswers[cbtIndex];
    const cont = document.getElementById('cbtOptionsContainer');
    if (cont) {
      cont.innerHTML = q.options.map((opt, idx) => {
        const isSel = picked === idx;
        return `
          <div role="button" tabindex="0" data-opt-idx="${idx}" onclick="cbtSelectOpt(${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();cbtSelectOpt(${idx});}" class="cbt-opt-card ${isSel ? 'is-selected' : ''}">
            <input type="radio" name="cbtOptionChoice" value="${idx}" ${isSel ? 'checked' : ''} class="w-4 h-4 accent-amber-400 pointer-events-none">
            <span class="leading-relaxed"><strong>(${String.fromCharCode(65 + idx)})</strong> ${escapeHTML(opt)}</span>
          </div>
        `;
      }).join('');
    }
  }

  function renderCbtPalette() {
    const grid = document.getElementById('cbtPaletteGrid');
    if (!grid) return;
    let answered = 0;
    grid.innerHTML = CBT_ACTIVE_QUESTIONS.map((_, idx) => {
      const isAns = cbtAnswers[idx] !== undefined;
      const isRev = cbtReview.has(idx);
      const isVis = cbtVisited.has(idx);
      const isCurr = idx === cbtIndex;
      if (isAns) answered++;
      let cls = 'bg-slate-800 text-slate-300 border border-white/10';
      if (isAns && isRev) cls = 'bg-purple-600 text-white font-extrabold';
      else if (isAns) cls = 'bg-amber-400 text-black font-extrabold';
      else if (isRev) cls = 'bg-purple-600 text-white font-extrabold';
      else if (isVis) cls = 'bg-rose-500/80 text-white font-bold';
      const ring = isCurr ? 'ring-2 ring-amber-300' : '';
      return `<button type="button" onclick="jumpCbt(${idx})" class="w-full aspect-square rounded-md text-[10px] font-mono cursor-pointer ${cls} ${ring}">${idx + 1}</button>`;
    }).join('');
    const badge = document.getElementById('paletteAnsweredCount');
    if (badge) badge.innerText = `${answered} / ${CBT_ACTIVE_QUESTIONS.length} Answered`;
  }

  function cbtSelectOpt(idx) {
    if (cbtSubmitted) return;
    cbtAnswers[cbtIndex] = idx;
    syncOptionVisuals();
    renderCbtPalette();
  }
  window.cbtSelectOpt = cbtSelectOpt;

  function cbtToggleReview() {
    if (cbtReview.has(cbtIndex)) cbtReview.delete(cbtIndex); else cbtReview.add(cbtIndex);
    renderCbtPalette();
  }
  window.cbtToggleReview = cbtToggleReview;

  function cbtSaveAndNext() {
    if (cbtIndex < CBT_ACTIVE_QUESTIONS.length - 1) { cbtIndex++; renderCbtQuestion(); renderCbtPalette(); }
  }
  window.cbtSaveAndNext = cbtSaveAndNext;

  function cbtClearResponse() {
    delete cbtAnswers[cbtIndex];
    syncOptionVisuals();
    renderCbtPalette();
  }
  window.cbtClearResponse = cbtClearResponse;

  function jumpCbt(idx) {
    if (idx >= 0 && idx < CBT_ACTIVE_QUESTIONS.length) { cbtIndex = idx; renderCbtQuestion(); renderCbtPalette(); }
  }
  window.jumpCbt = jumpCbt;

  function submitCBT(force = false) {
    if (cbtSubmitted || !CBT_ACTIVE_QUESTIONS.length) return;
    if (!force && !confirm("Submit this mock test and view answer key & analysis?")) return;

    cbtSubmitted = true;
    clearInterval(cbtTimerInterval);
    setExamFullscreenMode(false);

    const cfg = CBT_SESSION_CONFIG || getActiveConfig();
    const stageNum = CBT_SESSION_STAGE || currentTestStage;
    const activeKey = cfg.activeKey || (currentMockMode === 'EXAM' ? currentBranchKey : cfg.prefix);
    const activeTitle = cfg.activeTitle || (currentMockMode === 'EXAM' ? cfg.branches[currentBranchKey] : cfg.title);

    let correctCount = 0, wrongCount = 0, pendingKeyCount = 0, rawScore = 0, maxMarks = 0;
    CBT_ACTIVE_QUESTIONS.forEach((q, idx) => {
      const hasKey = q.answer_verified && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length;
      if (hasKey) maxMarks += q.marks;
      if (cbtAnswers[idx] !== undefined) {
        if (!hasKey) pendingKeyCount++;
        else if (cbtAnswers[idx] === q.correct) { correctCount++; rawScore += q.marks; }
        else { wrongCount++; rawScore -= q.negativeMarks; }
      }
    });

    const netScore = Math.max(0, rawScore);
    const pct = maxMarks > 0 ? Number(((netScore / maxMarks) * 100).toFixed(1)) : 0;
    const passed = maxMarks > 0 && pct >= 35.0;
    if (passed && stageNum < cfg.stages) saveUserProgress(activeKey, stageNum + 1, cfg.stages);

    const nextStageNum = Math.min(stageNum + 1, cfg.stages);
    const analysisHtml = buildResultAnalysisMarkup(
      activeTitle,
      stageNum,
      netScore,
      maxMarks,
      pct,
      correctCount,
      wrongCount,
      pendingKeyCount,
      nextStageNum,
      cfg.stages
    );

    const renderedInNewWin = renderResultInExternalWindow(analysisHtml, nextStageNum, stageNum);

    const liveScreen = document.getElementById('mock-live-screen');
    const resScreen = document.getElementById('mock-result-screen');
    if (liveScreen) liveScreen.classList.add('hidden');
    if (resScreen && !renderedInNewWin) {
      resScreen.classList.remove('hidden');
      resScreen.innerHTML = `
        ${analysisHtml}
        <div class="pt-2">
          <button type="button" onclick="returnToMockHub()" class="px-5 py-2.5 rounded-xl luxury-action-btn font-extrabold text-xs cursor-pointer">Back to Mocks</button>
        </div>
      `;
    }
  }
  window.submitCBT = submitCBT;

  document.addEventListener('DOMContentLoaded', () => {
    ensureBaseStyles();
    ensureBankingButtonVisible();
    checkExistingStudentSession();
    selectMockDomain('SSC');
  });
})();
