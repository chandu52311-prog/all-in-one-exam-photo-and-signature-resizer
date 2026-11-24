// ====================================================================
// ⏱️ EXAMRESIZER.ME - CBT MOCK ENGINE (FULL-SCREEN EXAM + EXACT ROUTING)
// Module: js/mock-test.js
// ====================================================================
(function () {
  'use strict';

  const SUPABASE_URL = "https://znkwwzasysqkvtclmktd.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2BqA77mr-KyhwkqRcYMh8g_tQbN_";
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
      body.er-exam-fullscreen #mock-hub-dashboard,
      body.er-exam-fullscreen #mock-gatekeeper-screen {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setExamFullscreenMode(active) {
    document.body.classList.toggle('er-exam-fullscreen', Boolean(active));
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
  }
  window.prepareTestStage = prepareTestStage;

  function returnToMockHub() {
    cbtLoadToken++;
    clearInterval(cbtTimerInterval);
    setExamFullscreenMode(false);
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

  function tickCbtTimer() {
    cbtTimerSeconds = Math.max(0, Math.ceil((cbtEndTime - Date.now()) / 1000));
    const h = Math.floor(cbtTimerSeconds / 3600);
    const m = Math.floor((cbtTimerSeconds % 3600) / 60);
    const s = cbtTimerSeconds % 60;
    const clock = document.getElementById('cbtClock');
    if (clock) {
      clock.innerText = h > 0
        ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    if (cbtTimerSeconds <= 0) submitCBT(true);
  }

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

      const hdr = document.getElementById('liveExamHeaderTitle');
      if (hdr) hdr.innerText = `EXAMRESIZER.ME • ${activeTitleAtStart} • Mock #${stageAtStart}`;

      cbtIndex = 0;
      cbtAnswers = {};
      cbtVisited = new Set([0]);
      cbtReview = new Set();

      renderCbtQuestion();
      renderCbtPalette();

      const durMins = getSafeNum(row.duration_mins, Math.round(cfg.timeSec / 60));
      cbtEndTime = Date.now() + durMins * 60 * 1000;
      tickCbtTimer();
      clearInterval(cbtTimerInterval);
      cbtTimerInterval = setInterval(tickCbtTimer, 1000);
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
    const liveScreen = document.getElementById('mock-live-screen');
    const resScreen = document.getElementById('mock-result-screen');
    if (liveScreen) liveScreen.classList.add('hidden');
    if (!resScreen) return;
    resScreen.classList.remove('hidden');

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

    resScreen.innerHTML = `
      <div class="glass-card p-6 rounded-2xl space-y-4">
        <h3 class="text-xl font-black text-white">EXAMRESIZER.ME • ${escapeHTML(activeTitle)} • Mock #${stageNum} Analysis</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div class="p-3 bg-white/5 rounded-xl border border-amber-400/20"><div class="text-xs text-slate-300">Net Score</div><div class="text-lg font-black text-amber-400">${netScore.toFixed(2)} / ${maxMarks.toFixed(2)}</div></div>
          <div class="p-3 bg-white/5 rounded-xl border border-amber-400/20"><div class="text-xs text-slate-300">Accuracy / %</div><div class="text-lg font-black text-emerald-400">${pct.toFixed(1)}%</div></div>
          <div class="p-3 bg-white/5 rounded-xl border border-amber-400/20"><div class="text-xs text-slate-300">Correct</div><div class="text-lg font-black text-emerald-400">${correctCount}</div></div>
          <div class="p-3 bg-white/5 rounded-xl border border-amber-400/20"><div class="text-xs text-slate-300">Wrong / Key Pending</div><div class="text-lg font-black text-rose-400">${wrongCount} / ${pendingKeyCount}</div></div>
        </div>
        <button type="button" onclick="returnToMockHub()" class="px-5 py-2.5 rounded-xl luxury-action-btn font-extrabold text-xs cursor-pointer">Back to Mocks</button>
      </div>
      <div class="space-y-3 pt-3">
        ${CBT_ACTIVE_QUESTIONS.map((q, idx) => {
          const picked = cbtAnswers[idx];
          const hasKey = q.answer_verified && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length;
          const isRight = hasKey && picked === q.correct;
          const userStr = picked !== undefined ? `(${String.fromCharCode(65 + picked)}) ${escapeHTML(q.options[picked])}` : "Not Attempted";
          const ansStr = hasKey ? `(${String.fromCharCode(65 + q.correct)}) ${escapeHTML(q.options[q.correct])}` : "Pending Authentic Key Verification";
          return `
            <div class="p-4 rounded-xl glass-card space-y-1.5 text-xs">
              <div class="font-bold text-amber-400">EXAMRESIZER.ME • Q${idx + 1} (${escapeHTML(q.section)})</div>
              <p class="text-white font-medium">${escapeHTML(q.en)}</p>
              <p class="${isRight ? 'text-emerald-400 font-bold' : 'text-rose-400'}">Your Answer: ${userStr}</p>
              <p class="${hasKey ? 'text-emerald-400 font-bold' : 'text-amber-300'}">Answer Key: ${ansStr}</p>
              <p class="text-slate-200"><strong>Analysis:</strong> ${escapeHTML(q.explanation)}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  window.submitCBT = submitCBT;

  document.addEventListener('DOMContentLoaded', () => {
    ensureBaseStyles();
    ensureBankingButtonVisible();
    checkExistingStudentSession();
    selectMockDomain('SSC');
  });
})();
