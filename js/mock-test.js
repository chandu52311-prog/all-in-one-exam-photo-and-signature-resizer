// ====================================================================
// ⏱️ EXAMRESIZER PRO - BRANCH-AWARE CBT ENGINE (FINAL PRODUCTION)
// Module: js/mock-test.js
// ====================================================================
(function () {
  'use strict';

  const SUPABASE_MOCK_BASE = "https://znkwwzasysqkvtclmktd.supabase.co/storage/v1/object/public/exam-papers/mock-tests";

  const MOCK_CONFIG = {
    EXAM: {
      GATE: {
        title: "GATE Engineering Practice Series",
        branches: {
          "gate_ee": "EE (Electrical)",
          "gate_cs": "CSE & IT",
          "gate_ec": "ECE (Electronics)",
          "gate_me": "ME (Mechanical)",
          "gate_ce": "CE (Civil)"
        },
        qCount: 65,
        timeSec: 10800, // 180 Mins (3 Hours)
        posMark: 1.54,
        negMark: 0.50,
        stages: 10
      },
      SSC: {
        title: "SSC CGL / CHSL Tier-1 Practice Series",
        branches: {
          "ssc_cgl": "CGL & CHSL (Non-Tech)",
          "ssc_je_ee": "JE Electrical CBT",
          "ssc_je_ce": "JE Civil CBT",
          "ssc_mts": "MTS & GD Cadres"
        },
        qCount: 100,
        timeSec: 3600, // 60 Mins (1 Hour)
        posMark: 2.00,
        negMark: 0.50,
        stages: 10
      },
      RRB: {
        title: "Railway Recruitment (RRB) Practice Series",
        branches: {
          "rrb_ntpc": "NTPC CBT Stage",
          "rrb_group_d": "Group D Level-1",
          "rrb_alp": "ALP & Technician",
          "rrb_je": "Junior Engineer (JE)"
        },
        qCount: 100,
        timeSec: 5400, // 90 Mins (1.5 Hours)
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      APPSC: {
        title: "Andhra Pradesh PSC (APPSC) Practice Series",
        branches: {
          "appsc_gs": "General Studies & Mental Ability",
          "appsc_aee": "AEE Engineering Cadre"
        },
        qCount: 150,
        timeSec: 9000, // 150 Mins (2.5 Hours)
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      TGPSC: {
        title: "Telangana PSC (TGPSC) Practice Series",
        branches: {
          "tgpsc_group1": "Group-1 Preliminary & GS"
        },
        qCount: 150,
        timeSec: 9000, // 150 Mins (2.5 Hours)
        posMark: 1.00,
        negMark: 0.33,
        stages: 10
      },
      POWER_PSU: {
        title: "Power Utilities & PSUs (PGCIL / TRANSCO / GENCO)",
        branches: {
          "power_psu_ee": "Electrical Power Cadre"
        },
        qCount: 100,
        timeSec: 7200, // 120 Mins (2 Hours)
        posMark: 1.00,
        negMark: 0.25,
        stages: 10
      }
    },
    SUBJECT: {
      APTITUDE: { title: "Quantitative Aptitude Mastery", prefix: "aptitude", qCount: 50, timeSec: 3600, posMark: 1.0, negMark: 0.25, stages: 20 },
      REASONING: { title: "Logical & Analytical Reasoning", prefix: "reasoning", qCount: 50, timeSec: 3600, posMark: 1.0, negMark: 0.25, stages: 20 },
      GK: { title: "General Knowledge & GS", prefix: "gk", qCount: 50, timeSec: 3600, posMark: 1.0, negMark: 0.25, stages: 20 },
      ENGLISH: { title: "General English & Verbal", prefix: "english", qCount: 50, timeSec: 3600, posMark: 1.0, negMark: 0.25, stages: 20 },
      MATHS: { title: "Pure Mathematics & Calculations", prefix: "maths", qCount: 50, timeSec: 3600, posMark: 1.0, negMark: 0.25, stages: 20 }
    }
  };

  let currentMockMode = 'EXAM';
  let currentAuthorityKey = 'GATE';
  let currentBranchKey = 'gate_ee';
  let currentSubjectKey = 'APTITUDE';
  let currentTestStage = 1;

  // Frozen Session Snapshot
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
    } catch (e) {
      return {};
    }
  }

  let savedName = '';
  try {
    savedName = localStorage.getItem('er_student_name') || '';
  } catch (e) {
    savedName = '';
  }

  let currentStudent = {
    name: savedName,
    progress: savedName ? readStudentProgress(savedName) : {}
  };

  // ----------------------------------------------------
  // 1. NAME-ONLY SESSION MANAGEMENT
  // ----------------------------------------------------
  function checkExistingStudentSession() {
    const loginBox = document.getElementById('studentLoginBox');
    const profileBox = document.getElementById('studentProfileBox');
    const candidateBar = document.getElementById('candidateNameBar');
    const profileSub = document.getElementById('displayStudentPhone');
    if (!loginBox || !profileBox) return;

    if (currentStudent.name) {
      loginBox.classList.add('hidden');
      profileBox.classList.remove('hidden');
      document.getElementById('displayStudentName').innerText = currentStudent.name;
      if (profileSub) profileSub.innerText = 'Local Browser Profile';
      if (candidateBar) candidateBar.innerText = `Candidate: ${currentStudent.name}`;
    } else {
      loginBox.classList.remove('hidden');
      profileBox.classList.add('hidden');
      if (candidateBar) candidateBar.innerText = `Candidate: Guest Aspirant (Enter name to save progress)`;
    }
  }

  function loginStudent() {
    const nameInput = document.getElementById('studentNameInput');
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name || name.length < 2) {
      alert("Please enter your Name or Nickname (at least 2 characters).");
      return;
    }

    const storageKey = getStorageKeyForName(name);
    const stored = readStudentProgress(name);

    const merged = { ...stored };
    Object.keys(currentStudent.progress).forEach(k => {
      merged[k] = Math.max(Number(stored[k]) || 1, Number(currentStudent.progress[k]) || 1);
    });

    currentStudent.name = name;
    currentStudent.progress = merged;

    try {
      localStorage.setItem('er_student_name', currentStudent.name);
      localStorage.setItem(storageKey, JSON.stringify(currentStudent.progress));
    } catch (e) {}

    checkExistingStudentSession();
    renderStageCards();
  }
  window.loginStudent = loginStudent;

  function logoutStudent() {
    try {
      localStorage.removeItem('er_student_name');
    } catch (e) {}
    currentStudent = { name: '', progress: {} };
    const nameInput = document.getElementById('studentNameInput');
    if (nameInput) nameInput.value = '';
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
        try {
          localStorage.setItem(getStorageKeyForName(currentStudent.name), JSON.stringify(currentStudent.progress));
        } catch (e) {}
      }
    }
  }

  // ----------------------------------------------------
  // 2. NAVIGATION & BRANCH SUB-BUTTONS
  // ----------------------------------------------------
  function switchMockMode(mode) {
    currentMockMode = mode;
    const examBtn = document.getElementById('mode-btn-EXAM');
    const subjBtn = document.getElementById('mode-btn-SUBJECT');
    const examBlock = document.getElementById('examDomainNavBlock');
    const subjBlock = document.getElementById('subjectDomainNavBlock');
    const branchContainer = document.getElementById('mockBranchNavContainer');

    if (mode === 'EXAM') {
      if (examBtn) examBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition bg-amber-500/20 text-amber-300 border border-amber-500/40";
      if (subjBtn) subjBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
      if (examBlock) examBlock.classList.remove('hidden');
      if (subjBlock) subjBlock.classList.add('hidden');
      if (branchContainer) branchContainer.classList.remove('hidden');
      selectMockDomain(currentAuthorityKey);
    } else {
      if (subjBtn) subjBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition bg-amber-500/20 text-amber-300 border border-amber-500/40";
      if (examBtn) examBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
      if (examBlock) examBlock.classList.add('hidden');
      if (subjBlock) subjBlock.classList.remove('hidden');
      if (branchContainer) branchContainer.classList.add('hidden');
      selectSubjectDomain(currentSubjectKey);
    }
  }
  window.switchMockMode = switchMockMode;

  function selectMockDomain(authKey) {
    currentAuthorityKey = authKey;
    const authData = MOCK_CONFIG.EXAM[authKey];
    if (!authData) return;

    Object.keys(MOCK_CONFIG.EXAM).forEach(k => {
      const btn = document.getElementById('domain-btn-' + k);
      if (btn) {
        if (k === authKey) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('activeMockDomainTitle');
    if (titleEl) {
      const mins = Math.round(authData.timeSec / 60);
      titleEl.innerText = `${authData.title} (${authData.qCount} Qs • ${mins} Mins)`;
    }

    renderBranchSubButtons();
  }
  window.selectMockDomain = selectMockDomain;

  function renderBranchSubButtons() {
    const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
    const container = document.getElementById('branchSubButtonsRow');
    if (!authData || !container) return;

    const branchKeys = Object.keys(authData.branches);
    if (!branchKeys.includes(currentBranchKey)) {
      currentBranchKey = branchKeys[0] || '';
    }

    let html = '';
    branchKeys.forEach(bk => {
      const isDefault = bk === currentBranchKey;
      html += `
        <button 
          type="button"
          id="mock-branch-btn-${bk}" 
          onclick="switchBranch('${bk}')" 
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
            isDefault 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
              : 'bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
          }">
          ${escapeHTML(authData.branches[bk])}
        </button>
      `;
    });

    container.innerHTML = html;
    renderStageCards();
  }

  function switchBranch(branchKey) {
    currentBranchKey = branchKey;
    const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
    if (!authData) return;

    Object.keys(authData.branches).forEach(bk => {
      const btn = document.getElementById('mock-branch-btn-' + bk);
      if (btn) {
        if (bk === branchKey) {
          btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition border bg-amber-500/20 text-amber-300 border-amber-500/40";
        } else {
          btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold transition border bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20";
        }
      }
    });

    renderStageCards();
  }
  window.switchBranch = switchBranch;

  function selectSubjectDomain(subjKey) {
    currentSubjectKey = subjKey;
    const subjData = MOCK_CONFIG.SUBJECT[subjKey];
    if (!subjData) return;

    Object.keys(MOCK_CONFIG.SUBJECT).forEach(k => {
      const btn = document.getElementById('domain-btn-' + k);
      if (btn) {
        if (k === subjKey) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('activeMockDomainTitle');
    if (titleEl) {
      const mins = Math.round(subjData.timeSec / 60);
      titleEl.innerText = `${subjData.title} (${subjData.qCount} Qs • ${mins} Mins)`;
    }

    renderStageCards();
  }
  window.selectSubjectDomain = selectSubjectDomain;

  // ----------------------------------------------------
  // 3. STAGES GRID GENERATOR
  // ----------------------------------------------------
  function renderStageCards() {
    const container = document.getElementById('mockTestsGridContainer');
    if (!container) return;

    const isExam = currentMockMode === 'EXAM';
    const cfg = getActiveConfig();
    const activeKey = isExam ? currentBranchKey : cfg.prefix;
    const activeTitle = isExam ? cfg.branches[currentBranchKey] : cfg.title;
    const maxStages = cfg.stages;
    const qCount = cfg.qCount;
    const timeMins = Math.round(cfg.timeSec / 60);

    const unlockedStage = getUserProgress(activeKey);
    const statusEl = document.getElementById('userTierStatus');
    if (statusEl) statusEl.innerText = `Active Tier: Practice Test ${unlockedStage} Unlocked`;

    let html = '';
    for (let stage = 1; stage <= maxStages; stage++) {
      const isUnlocked = stage <= unlockedStage;
      const isNextTarget = stage === unlockedStage;

      html += `
        <div class="p-4 rounded-xl glass-card border ${isUnlocked ? (isNextTarget ? 'border-amber-400 gold-glow' : 'border-emerald-500/40') : 'border-white/5 opacity-50'} flex flex-col justify-between space-y-3 transition transform hover:-translate-y-1">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${isUnlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}">
                Stage ${stage < 10 ? '0' + stage : stage}
              </span>
              <span class="text-[10px] font-bold ${isUnlocked ? (stage < unlockedStage ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-500'}">
                ${isUnlocked ? (stage < unlockedStage ? '✔ CLEARED' : '★ ACTIVE') : '🔒 LOCKED'}
              </span>
            </div>
            <h4 class="font-bold text-white text-sm">${escapeHTML(activeTitle)} • Test ${stage}</h4>
            <p class="text-[11px] text-slate-400 mt-0.5">${qCount} Questions • ${timeMins} Minutes</p>
          </div>

          <div>
            ${isUnlocked ? `
              <button type="button" onclick="prepareTestStage(${stage})" class="w-full py-2.5 rounded-xl ${isNextTarget ? 'luxury-action-btn text-black' : 'bg-emerald-500 hover:bg-emerald-400 text-black'} font-extrabold text-xs transition shadow-md cursor-pointer">
                ${stage < unlockedStage ? 'Retake Test' : 'Take Practice Test'}
              </button>
            ` : `
              <button type="button" disabled class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed">
                🔒 Clear Test ${stage - 1} First
              </button>
            `}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }
  window.renderStageCards = renderStageCards;

  function prepareTestStage(stage) {
    const cfg = getActiveConfig();
    if (!Number.isInteger(stage) || stage < 1 || stage > cfg.stages) {
      alert("Invalid test stage.");
      return;
    }

    const isExam = currentMockMode === 'EXAM';
    const activeKey = isExam ? currentBranchKey : cfg.prefix;

    if (stage > getUserProgress(activeKey)) {
      alert("This stage is locked. Clear the previous stage first.");
      return;
    }

    cbtLoadToken++;
    currentTestStage = stage;
    const activeTitle = isExam ? cfg.branches[currentBranchKey] : cfg.title;
    
    document.getElementById('mock-hub-dashboard').classList.add('hidden');
    document.getElementById('mock-gatekeeper-screen').classList.remove('hidden');
    document.getElementById('gatekeeperTestTitle').innerText = `${activeTitle} • Practice Test ${stage < 10 ? '0' + stage : stage}`;
    
    const ruleEl = document.getElementById('gatekeeperScoringRule');
    if (ruleEl) {
      ruleEl.innerHTML = `2. <strong>Scoring System:</strong> Correct +${cfg.posMark.toFixed(2)} marks, Incorrect -${cfg.negMark.toFixed(2)} negative marks (Duration: ${Math.round(cfg.timeSec / 60)} Mins).`;
    }

    const chk = document.getElementById('policyAgreementCheckbox');
    if (chk) { chk.checked = false; toggleCBTReady(chk); }
  }
  window.prepareTestStage = prepareTestStage;

  function returnToMockHub() {
    cbtLoadToken++;
    clearInterval(cbtTimerInterval);

    CBT_ACTIVE_QUESTIONS = [];
    CBT_SESSION_CONFIG = null;
    CBT_SESSION_STAGE = 1;
    cbtAnswers = {};
    cbtVisited = new Set();
    cbtReview = new Set();
    cbtEndTime = 0;
    cbtSubmitted = false;

    document.getElementById('mock-gatekeeper-screen').classList.add('hidden');
    document.getElementById('mock-live-screen').classList.add('hidden');
    document.getElementById('mock-result-screen').classList.add('hidden');
    document.getElementById('mock-hub-dashboard').classList.remove('hidden');
    renderStageCards();
  }
  window.returnToMockHub = returnToMockHub;

  function toggleCBTReady(el) {
    const btn = document.getElementById('startCbtBtn');
    const isChecked = el.checked;
    if (btn) {
      btn.innerText = 'I AM READY TO BEGIN';
      if (isChecked) {
        btn.disabled = false;
        btn.className = 'px-7 py-3 rounded-xl luxury-action-btn text-black font-extrabold text-xs cursor-pointer shadow-lg hover:brightness-110 transition';
      } else {
        btn.disabled = true;
        btn.className = 'px-7 py-3 rounded-xl bg-slate-700 text-slate-400 font-black text-xs cursor-not-allowed transition';
      }
    }
  }
  window.toggleCBTReady = toggleCBTReady;

  // ----------------------------------------------------
  // 4. QUESTION VALIDATOR & DEADLINE-BASED LIVE CBT ENGINE
  // ----------------------------------------------------
  function validateQuestionSet(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Question set is empty or invalid format.");
    }
    data.forEach((q, idx) => {
      if (
        !q ||
        typeof q.en !== "string" ||
        !q.en.trim() ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        !q.options.every(opt => typeof opt === "string" && opt.trim().length > 0) ||
        !Number.isInteger(q.correct) ||
        q.correct < 0 ||
        q.correct >= q.options.length
      ) {
        throw new Error(`Invalid question structure at index ${idx}.`);
      }
    });
    return true;
  }

  function tickCbtTimer() {
    cbtTimerSeconds = Math.max(0, Math.ceil((cbtEndTime - Date.now()) / 1000));
    const hours = Math.floor(cbtTimerSeconds / 3600);
    const minutes = Math.floor((cbtTimerSeconds % 3600) / 60);
    const seconds = cbtTimerSeconds % 60;
    const clock = document.getElementById('cbtClock');
    if (clock) {
      if (hours > 0) {
        clock.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        clock.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
    if (cbtTimerSeconds <= 0) {
      submitCBT(true);
    }
  }

  async function startCbtSession() {
    const token = ++cbtLoadToken;
    const startBtn = document.getElementById('startCbtBtn');
    const originalText = 'I AM READY TO BEGIN';
    if (startBtn) {
      startBtn.innerText = "⏳ Loading Questions...";
      startBtn.disabled = true;
    }

    const isExam = currentMockMode === 'EXAM';
    const cfg = getActiveConfig();
    const activeKey = isExam ? currentBranchKey : cfg.prefix;
    const stageAtStart = currentTestStage;
    const activeTitleAtStart = isExam ? cfg.branches[currentBranchKey] : cfg.title;

    const fileName = `${activeKey}_stage_${stageAtStart}.json`;
    const fetchUrl = `${SUPABASE_MOCK_BASE}/${fileName}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(fetchUrl, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}: Question paper not uploaded yet.`);
      
      const parsedData = await res.json();
      validateQuestionSet(parsedData);

      // Abort if user switched tests or navigated away during fetch
      const gateScreen = document.getElementById('mock-gatekeeper-screen');
      const mockZone = document.getElementById('mock-zone');
      if (token !== cbtLoadToken || !gateScreen || gateScreen.classList.contains('hidden') || !mockZone || mockZone.classList.contains('hidden')) {
        return;
      }

      // Freeze session snapshot
      CBT_SESSION_CONFIG = {
        ...cfg,
        activeTitle: activeTitleAtStart,
        activeKey: activeKey
      };
      CBT_SESSION_STAGE = stageAtStart;

      CBT_ACTIVE_QUESTIONS = parsedData;
      cbtSubmitted = false;

      gateScreen.classList.add('hidden');
      document.getElementById('mock-live-screen').classList.remove('hidden');
      
      document.getElementById('liveExamHeaderTitle').innerText = `${CBT_SESSION_CONFIG.activeTitle} - Test ${stageAtStart < 10 ? '0' + stageAtStart : stageAtStart}`;

      cbtIndex = 0;
      cbtAnswers = {};
      cbtVisited = new Set([0]);
      cbtReview = new Set();

      renderCbtQuestion();
      renderCbtPalette();

      cbtEndTime = Date.now() + CBT_SESSION_CONFIG.timeSec * 1000;
      tickCbtTimer();
      clearInterval(cbtTimerInterval);
      cbtTimerInterval = setInterval(tickCbtTimer, 1000);

    } catch (err) {
      if (token === cbtLoadToken) {
        console.error("CBT Load Error:", err);
        if (err.name === 'AbortError') {
          alert("Network timeout while loading questions. Please check your internet connection and try again.");
        } else {
          alert("This test question set is currently being updated. Please try another test stage.");
        }
      }
    } finally {
      clearTimeout(timeoutId);
      if (token === cbtLoadToken && startBtn) {
        startBtn.innerText = originalText;
        const chk = document.getElementById('policyAgreementCheckbox');
        startBtn.disabled = !(chk && chk.checked);
      }
    }
  }
  window.startCbtSession = startCbtSession;

  function renderCbtQuestion() {
    const q = CBT_ACTIVE_QUESTIONS[cbtIndex];
    if (!q) return;

    cbtVisited.add(cbtIndex);
    const cfg = CBT_SESSION_CONFIG || getActiveConfig();
    const posM = getSafeNum(q.marks, cfg.posMark);
    const negM = getSafeNum(q.negativeMarks, cfg.negMark);

    document.getElementById('cbtQuestionNum').innerText = `Question ${cbtIndex + 1} of ${CBT_ACTIVE_QUESTIONS.length}`;
    document.getElementById('cbtSectionTag').innerText = `${q.section || "General"} (+${posM} / -${negM})`;
    document.getElementById('cbtQuestionText').textContent = q.en;

    const cont = document.getElementById('cbtOptionsContainer');
    cont.innerHTML = q.options.map((opt, idx) => {
      const isSelected = cbtAnswers[cbtIndex] === idx;
      return `
        <label class="flex items-center space-x-3 p-3.5 rounded-xl border ${isSelected ? 'border-amber-400 bg-amber-500/15 text-white font-bold shadow-md' : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20'} cursor-pointer text-xs transition">
          <input type="radio" name="cbtOptionChoice" value="${idx}" ${isSelected ? 'checked' : ''} onchange="cbtSelectOpt(${idx})" class="w-4 h-4 accent-amber-500">
          <span class="leading-relaxed">(${String.fromCharCode(65 + idx)}) ${escapeHTML(opt)}</span>
        </label>
      `;
    }).join('');

    const revBtn = document.getElementById('cbtReviewBtn');
    if (revBtn) {
      revBtn.innerText = cbtReview.has(cbtIndex) ? "Unmark Review" : "Mark for Review";
    }
  }

  function renderCbtPalette() {
    const grid = document.getElementById('cbtPaletteGrid');
    if (!grid) return;

    let answeredCount = 0;
    grid.innerHTML = CBT_ACTIVE_QUESTIONS.map((_, idx) => {
      const isAnswered = cbtAnswers[idx] !== undefined;
      const isReviewed = cbtReview.has(idx);
      const isVisited = cbtVisited.has(idx);
      const isCurrent = idx === cbtIndex ? 'ring-2 ring-amber-400' : '';

      if (isAnswered) answeredCount++;

      let colorClass = 'bg-slate-800 text-slate-400 border border-white/5';
      let badgeDot = '';

      if (isAnswered && isReviewed) {
        colorClass = 'bg-purple-600 text-white font-extrabold relative';
        badgeDot = '<span class="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>';
      } else if (isAnswered) {
        colorClass = 'bg-emerald-500 text-black font-extrabold shadow-sm';
      } else if (isReviewed) {
        colorClass = 'bg-purple-600 text-white font-extrabold';
      } else if (isVisited) {
        colorClass = 'bg-rose-500/80 text-white font-bold';
      }

      return `
        <button type="button" aria-label="Question ${idx + 1}" onclick="jumpCbt(${idx})" class="w-full aspect-square rounded-md text-[10px] font-mono transition transform hover:scale-105 ${colorClass} ${isCurrent}">
          ${idx + 1}
          ${badgeDot}
        </button>
      `;
    }).join('');

    const countBadge = document.getElementById('paletteAnsweredCount');
    if (countBadge) countBadge.innerText = `${answeredCount} / ${CBT_ACTIVE_QUESTIONS.length} Answered`;
  }

  function cbtSelectOpt(idx) {
    cbtAnswers[cbtIndex] = idx;
    renderCbtQuestion();
    renderCbtPalette();
  }
  window.cbtSelectOpt = cbtSelectOpt;

  function cbtToggleReview() {
    if (cbtReview.has(cbtIndex)) cbtReview.delete(cbtIndex);
    else cbtReview.add(cbtIndex);
    renderCbtQuestion();
    renderCbtPalette();
  }
  window.cbtToggleReview = cbtToggleReview;

  function cbtSaveAndNext() {
    if (cbtIndex < CBT_ACTIVE_QUESTIONS.length - 1) {
      cbtIndex++;
      renderCbtQuestion();
      renderCbtPalette();
    }
  }
  window.cbtSaveAndNext = cbtSaveAndNext;

  function cbtClearResponse() {
    delete cbtAnswers[cbtIndex];
    renderCbtQuestion();
    renderCbtPalette();
  }
  window.cbtClearResponse = cbtClearResponse;

  function jumpCbt(idx) {
    if (idx >= 0 && idx < CBT_ACTIVE_QUESTIONS.length) {
      cbtIndex = idx;
      renderCbtQuestion();
      renderCbtPalette();
    }
  }
  window.jumpCbt = jumpCbt;

  // ----------------------------------------------------
  // 5. SUBMIT, EXAM-SPECIFIC SCORING & PROGRESS REPORT
  // ----------------------------------------------------
  function submitCBT(force = false) {
    if (cbtSubmitted) return;
    if (!CBT_ACTIVE_QUESTIONS || CBT_ACTIVE_QUESTIONS.length === 0) return;

    if (!force) {
      const ok = confirm("Are you sure you want to submit the test now?");
      if (!ok) return;
    }

    cbtSubmitted = true;
    clearInterval(cbtTimerInterval);

    document.getElementById('mock-live-screen').classList.add('hidden');
    const resScreen = document.getElementById('mock-result-screen');
    resScreen.classList.remove('hidden');

    const cfg = CBT_SESSION_CONFIG || getActiveConfig();
    const stageNum = CBT_SESSION_STAGE || currentTestStage;
    const activeKey = cfg.activeKey || (currentMockMode === 'EXAM' ? currentBranchKey : cfg.prefix);
    const activeTitle = cfg.activeTitle || (currentMockMode === 'EXAM' ? cfg.branches[currentBranchKey] : cfg.title);

    let correctCount = 0;
    let wrongCount = 0;
    let rawScore = 0;
    let totalPenalty = 0;
    let maxPossibleMarks = 0;

    CBT_ACTIVE_QUESTIONS.forEach((q, idx) => {
      const posM = getSafeNum(q.marks, cfg.posMark);
      const negM = getSafeNum(q.negativeMarks, cfg.negMark);
      maxPossibleMarks += posM;

      if (cbtAnswers[idx] !== undefined) {
        if (cbtAnswers[idx] === q.correct) {
          correctCount++;
          rawScore += posM;
        } else {
          wrongCount++;
          rawScore -= negM;
          totalPenalty += negM;
        }
      }
    });

    const totalMarks = Math.max(0, rawScore);
    const percentage = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0;
    const roundedPct = Number(percentage.toFixed(1));
    const isPassed = roundedPct >= 35.0;

    if (isPassed && stageNum < cfg.stages) {
      saveUserProgress(activeKey, stageNum + 1, cfg.stages);
    }

    resScreen.innerHTML = `
      <div class="glass-card gold-border p-6 rounded-2xl text-center space-y-4">
        <span class="text-4xl">${isPassed ? '🎉' : '⚠️'}</span>
        <h3 class="text-xl md:text-2xl font-black text-white">
          ${isPassed ? 'Practice Test Passed & Next Stage Unlocked!' : 'Qualifying Threshold Not Met'}
        </h3>
        <p class="text-xs text-slate-300">
          ${escapeHTML(activeTitle)} • Practice Test ${stageNum} Performance Report
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span class="text-[10px] uppercase font-bold text-slate-400">Net Score</span>
            <p class="text-lg font-black text-amber-400">${totalMarks.toFixed(2)} / ${maxPossibleMarks.toFixed(2)}</p>
          </div>
          <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span class="text-[10px] uppercase font-bold text-slate-400">Percentage</span>
            <p class="text-lg font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${roundedPct.toFixed(1)}%</p>
          </div>
          <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span class="text-[10px] uppercase font-bold text-slate-400">Correct Answers</span>
            <p class="text-lg font-black text-emerald-400">${correctCount} / ${CBT_ACTIVE_QUESTIONS.length}</p>
          </div>
          <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span class="text-[10px] uppercase font-bold text-slate-400">Negative Penalty</span>
            <p class="text-lg font-black text-rose-400">-${totalPenalty.toFixed(2)}</p>
          </div>
        </div>

        <div class="p-3.5 rounded-xl ${isPassed ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'} text-xs font-semibold leading-relaxed">
          ${isPassed 
            ? (stageNum < cfg.stages 
                ? `✅ <strong>Well Done!</strong> You scored above the 35% practice rule (${roundedPct.toFixed(1)}%). <strong>Test ${stageNum + 1}</strong> is now unlocked!`
                : `🏆 <strong>Series Completed!</strong> You cleared the final stage with ${roundedPct.toFixed(1)}%!`)
            : `❌ <strong>Stage Locked:</strong> You achieved ${roundedPct.toFixed(1)}% (Practice Pass Rule: 35%). Review the solutions below and retake Test ${stageNum}.`
          }
        </div>

        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="button" onclick="downloadOfficialResultPDF('${totalMarks.toFixed(2)}', '${maxPossibleMarks.toFixed(2)}', '${roundedPct.toFixed(1)}', ${correctCount}, '${totalPenalty.toFixed(2)}', ${isPassed})" class="flex-1 py-3.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
            <span>📥 Download Result Scorecard (PDF)</span>
          </button>
          <button type="button" onclick="returnToMockHub()" class="flex-1 py-3.5 rounded-xl exam-btn text-white font-extrabold text-xs cursor-pointer p-3">
            ${isPassed ? 'Proceed to Stage Matrix ➔' : 'Re-attempt Test ' + stageNum}
          </button>
        </div>
      </div>

      <div class="space-y-3 pt-4">
        <h4 class="font-extrabold text-white text-sm uppercase tracking-wider">
          Detailed Solutions & Reference Keys (${CBT_ACTIVE_QUESTIONS.length} Questions)
        </h4>
        ${CBT_ACTIVE_QUESTIONS.map((q, idx) => {
          const userChoice = cbtAnswers[idx];
          const isRight = userChoice === q.correct;
          const posM = getSafeNum(q.marks, cfg.posMark);
          const negM = getSafeNum(q.negativeMarks, cfg.negMark);
          const userText = userChoice !== undefined ? `(${String.fromCharCode(65 + userChoice)}) ${escapeHTML(q.options[userChoice])}` : "Not Attempted";

          return `
            <div class="p-4 rounded-xl glass-card border border-white/10 space-y-2 text-xs">
              <div class="flex items-center justify-between border-b border-white/5 pb-2">
                <span class="font-bold text-amber-400 uppercase">Q${idx + 1} • ${escapeHTML(q.section || 'General')}</span>
                <span class="font-black ${isRight ? 'text-emerald-400' : (userChoice === undefined ? 'text-slate-500' : 'text-rose-400')}">
                  ${isRight ? `+${posM.toFixed(2)} Marks` : (userChoice === undefined ? '0.00 Marks' : `-${negM.toFixed(2)} Marks`)}
                </span>
              </div>
              <p class="text-white font-medium">${escapeHTML(q.en)}</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
                <p class="${isRight ? 'text-emerald-400 font-bold' : 'text-rose-400'}">Your Response: ${userText}</p>
                <p class="text-emerald-400 font-bold">Reference Key: (${String.fromCharCode(65 + q.correct)}) ${escapeHTML(q.options[q.correct])}</p>
              </div>
              <div class="mt-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300 text-[11px] leading-relaxed">
                <strong>💡 Explanation:</strong>
                <p class="mt-1">${escapeHTML(q.explanation || 'No explanation provided for this question.')}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  window.submitCBT = submitCBT;

  // ----------------------------------------------------
  // 6. PDF SCORECARD GENERATOR
  // ----------------------------------------------------
  async function downloadOfficialResultPDF(score, maxScore, pct, correct, penalty, isPassed) {
    try {
      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]);
      const { width, height } = page.getSize();

      page.drawRectangle({
        x: 25, y: 25, width: width - 50, height: height - 50,
        borderColor: PDFLib.rgb(0.85, 0.65, 0.15), borderWidth: 2,
        color: PDFLib.rgb(0.98, 0.98, 0.99)
      });

      page.drawText("EXAMRESIZER.ME PRACTICE CBT SCORECARD", {
        x: 45, y: height - 60, size: 14, color: PDFLib.rgb(0.1, 0.1, 0.1)
      });
      
      const cfg = CBT_SESSION_CONFIG || getActiveConfig();
      const stageNum = CBT_SESSION_STAGE || currentTestStage;
      const rawTitle = cfg.activeTitle || (currentMockMode === 'EXAM' ? cfg.branches[currentBranchKey] : cfg.title);
      const safeTitle = rawTitle.replace(/[^\x20-\x7E]/g, '') || 'EXAM';
      
      page.drawText(`${safeTitle.toUpperCase()} - TEST ${stageNum}`, {
        x: 45, y: height - 80, size: 10, color: PDFLib.rgb(0.4, 0.4, 0.4)
      });

      page.drawLine({
        start: { x: 45, y: height - 90 }, end: { x: width - 45, y: height - 90 },
        thickness: 1, color: PDFLib.rgb(0.8, 0.8, 0.8)
      });

      const safeName = (currentStudent.name || "Guest Aspirant").replace(/[^\x20-\x7E]/g, '') || "Candidate";
      page.drawText(`Candidate: ${safeName}`, { x: 45, y: height - 110, size: 10, color: PDFLib.rgb(0.2, 0.2, 0.2) });

      page.drawText(`Status: ${isPassed ? "PASSED (Next Practice Stage Unlocked)" : "BELOW THRESHOLD (Needs Re-attempt)"}`, {
        x: 45, y: height - 130, size: 12, color: isPassed ? PDFLib.rgb(0.1, 0.6, 0.2) : PDFLib.rgb(0.8, 0.2, 0.2)
      });
      page.drawText(`Net Score: ${score} / ${maxScore}`, { x: 45, y: height - 150, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15) });
      page.drawText(`Percentage: ${pct}% (Practice Pass Rule: 35.0%)`, { x: 45, y: height - 170, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15) });
      page.drawText(`Correct Answers: ${correct} / ${CBT_ACTIVE_QUESTIONS.length} | Negative Penalty Hits: -${penalty}`, {
        x: 45, y: height - 190, size: 10, color: PDFLib.rgb(0.35, 0.35, 0.35)
      });

      page.drawText("EXAMRESIZER.ME", {
        x: 100, y: height / 2 - 40, size: 48, rotate: PDFLib.degrees(45),
        color: PDFLib.rgb(0.85, 0.85, 0.9), opacity: 0.25
      });

      page.drawText("Practice Diagnostic Report | Independent Examination Simulator | www.examresizer.me", {
        x: 45, y: 40, size: 8, color: PDFLib.rgb(0.5, 0.5, 0.5)
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ExamResizer_ScoreCard_Stage${String(stageNum).padStart(2, '0')}.pdf`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);

    } catch (err) {
      alert("Could not generate result PDF card.");
    }
  }
  window.downloadOfficialResultPDF = downloadOfficialResultPDF;

  window.addEventListener('beforeunload', (e) => {
    const live = document.getElementById('mock-live-screen');
    if (live && !live.classList.contains('hidden') && !cbtSubmitted) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    checkExistingStudentSession();
    selectMockDomain('GATE');
  });
})();
