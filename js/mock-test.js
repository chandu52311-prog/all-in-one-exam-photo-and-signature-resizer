// ====================================================================
// ⏱️ EXAMRESIZER PRO - BRANCH-AWARE CBT ENGINE (100 Qs / 50 Qs DUAL SYSTEM)
// Module: js/mock-test.js
// Dynamic Sub-Branches • Strict Anti-Repetition • Watermarked Scorecard
// ====================================================================

const SUPABASE_MOCK_BASE = "https://znkwwzasysqkvtclmktd.supabase.co/storage/v1/object/public/exam-papers/mock-tests";

const MOCK_CONFIG = {
  EXAM: {
    GATE: {
      title: "GATE National Engineering Assessment",
      branches: {
        "gate_ee": "EE (Electrical)",
        "gate_cs": "CSE & IT",
        "gate_ec": "ECE (Electronics)",
        "gate_me": "ME (Mechanical)",
        "gate_ce": "CE (Civil)"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    },
    SSC: {
      title: "Staff Selection Commission (SSC)",
      branches: {
        "ssc_cgl": "CGL & CHSL (Non-Tech)",
        "ssc_je_ee": "JE Electrical CBT",
        "ssc_je_ce": "JE Civil CBT",
        "ssc_mts": "MTS & GD Cadres"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    },
    RRB: {
      title: "Railway Recruitment Boards (RRB)",
      branches: {
        "rrb_ntpc": "NTPC CBT Stage",
        "rrb_group_d": "Group D Level-1",
        "rrb_alp": "ALP & Technician",
        "rrb_je": "Junior Engineer (JE)"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    },
    APPSC: {
      title: "Andhra Pradesh PSC (APPSC)",
      branches: {
        "appsc_gs": "General Studies & Mental Ability",
        "appsc_aee": "AEE Engineering Cadre"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    },
    TGPSC: {
      title: "Telangana PSC (TGPSC)",
      branches: {
        "tgpsc_group1": "Group-1 Preliminary & GS"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    },
    POWER_PSU: {
      title: "Power Utilities & Technical PSUs",
      branches: {
        "power_psu_ee": "Electrical Power Cadre (PGCIL/TRANSCO)"
      },
      qCount: 100,
      timeSec: 7200,
      stages: 10
    }
  },
  SUBJECT: {
    APTITUDE: { title: "Quantitative Aptitude Mastery", prefix: "aptitude", qCount: 50, timeSec: 3600, stages: 20 },
    REASONING: { title: "Logical & Analytical Reasoning", prefix: "reasoning", qCount: 50, timeSec: 3600, stages: 20 },
    GK: { title: "General Knowledge & GS", prefix: "gk", qCount: 50, timeSec: 3600, stages: 20 },
    ENGLISH: { title: "General English & Verbal", prefix: "english", qCount: 50, timeSec: 3600, stages: 20 },
    MATHS: { title: "Pure Mathematics & Calculations", prefix: "maths", qCount: 50, timeSec: 3600, stages: 20 }
  }
};

let currentMockMode = 'EXAM';
let currentAuthorityKey = 'GATE';
let currentBranchKey = 'gate_ee';
let currentSubjectKey = 'APTITUDE';
let currentTestStage = 1;

let CBT_ACTIVE_QUESTIONS = [];
let cbtIndex = 0;
let cbtAnswers = {};
let cbtVisited = new Set();
let cbtReview = new Set();
let cbtTimerSeconds = 7200;
let cbtTimerInterval = null;

let currentStudent = {
  name: localStorage.getItem('er_student_name') || '',
  phone: localStorage.getItem('er_student_phone') || '',
  progress: JSON.parse(localStorage.getItem('er_student_progress') || '{}')
};

// ----------------------------------------------------
// 1. SESSION MANAGEMENT & PROGRESSION
// ----------------------------------------------------
function checkExistingStudentSession() {
  const loginBox = document.getElementById('studentLoginBox');
  const profileBox = document.getElementById('studentProfileBox');
  const candidateBar = document.getElementById('candidateNameBar');
  if (!loginBox || !profileBox) return;

  if (currentStudent.phone && currentStudent.name) {
    loginBox.classList.add('hidden');
    profileBox.classList.remove('hidden');
    document.getElementById('displayStudentName').innerText = currentStudent.name;
    document.getElementById('displayStudentPhone').innerText = `📱 Mobile ID: ${currentStudent.phone}`;
    if (candidateBar) candidateBar.innerText = `Candidate: ${currentStudent.name}`;
  } else {
    loginBox.classList.remove('hidden');
    profileBox.classList.add('hidden');
    if (candidateBar) candidateBar.innerText = `Candidate: Guest Aspirant`;
  }
}

function loginStudent() {
  const name = document.getElementById('studentNameInput').value.trim();
  const phone = document.getElementById('studentPhoneInput').value.trim();

  if (!name || phone.length < 10) {
    alert("Please enter a valid Full Name and 10-digit Mobile Number.");
    return;
  }

  currentStudent.name = name;
  currentStudent.phone = phone;
  localStorage.setItem('er_student_name', currentStudent.name);
  localStorage.setItem('er_student_phone', currentStudent.phone);
  localStorage.setItem('er_student_progress', JSON.stringify(currentStudent.progress));

  checkExistingStudentSession();
  renderStageCards();
}
window.loginStudent = loginStudent;

function logoutStudent() {
  localStorage.removeItem('er_student_name');
  localStorage.removeItem('er_student_phone');
  localStorage.removeItem('er_student_progress');
  currentStudent = { name: '', phone: '', progress: {} };
  checkExistingStudentSession();
  renderStageCards();
}
window.logoutStudent = logoutStudent;

function getUserProgress(targetKey) {
  return currentStudent.progress[targetKey] || 1;
}

function saveUserProgress(targetKey, unlockedStage) {
  const current = getUserProgress(targetKey);
  if (unlockedStage > current) {
    currentStudent.progress[targetKey] = unlockedStage;
    localStorage.setItem('er_student_progress', JSON.stringify(currentStudent.progress));
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
    selectMockDomain('GATE');
  } else {
    if (subjBtn) subjBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition bg-amber-500/20 text-amber-300 border border-amber-500/40";
    if (examBtn) examBtn.className = "flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
    if (examBlock) examBlock.classList.add('hidden');
    if (subjBlock) subjBlock.classList.remove('hidden');
    if (branchContainer) branchContainer.classList.add('hidden');
    selectSubjectDomain('APTITUDE');
  }
}
window.switchMockMode = switchMockMode;

function selectMockDomain(authKey) {
  currentAuthorityKey = authKey;
  const authData = MOCK_CONFIG.EXAM[authKey];
  if (!authData) return;

  // Tab Styling
  Object.keys(MOCK_CONFIG.EXAM).forEach(k => {
    const btn = document.getElementById('domain-btn-' + k);
    if (btn) {
      if (k === authKey) {
        btn.classList.add('active');
        btn.style.background = 'linear-gradient(180deg, #fef08a 0%, #f59e0b 55%, #b45309 100%)';
        btn.style.color = '#03060c';
        btn.style.borderColor = '#fffbeb';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)';
        btn.style.color = '#cbd5e1';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }
    }
  });

  const titleEl = document.getElementById('activeMockDomainTitle');
  if (titleEl) titleEl.innerText = authData.title;

  renderBranchSubButtons();
}
window.selectMockDomain = selectMockDomain;

function renderBranchSubButtons() {
  const authData = MOCK_CONFIG.EXAM[currentAuthorityKey];
  const container = document.getElementById('branchSubButtonsRow');
  if (!authData || !container) return;

  const branchKeys = Object.keys(authData.branches);
  currentBranchKey = branchKeys[0] || '';

  let html = '';
  branchKeys.forEach(bk => {
    const isDefault = bk === currentBranchKey;
    html += `
      <button 
        id="mock-branch-btn-${bk}"
        onclick="switchBranch('${bk}')" 
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
          isDefault 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
            : 'bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
        }">
        ${authData.branches[bk]}
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
      if (k === subjKey) {
        btn.classList.add('active');
        btn.style.background = 'linear-gradient(180deg, #fef08a 0%, #f59e0b 55%, #b45309 100%)';
        btn.style.color = '#03060c';
        btn.style.borderColor = '#fffbeb';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)';
        btn.style.color = '#cbd5e1';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }
    }
  });

  const titleEl = document.getElementById('activeMockDomainTitle');
  if (titleEl) titleEl.innerText = subjData.title;

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
  const activeKey = isExam ? currentBranchKey : MOCK_CONFIG.SUBJECT[currentSubjectKey].prefix;
  const activeTitle = isExam ? MOCK_CONFIG.EXAM[currentAuthorityKey].branches[currentBranchKey] : MOCK_CONFIG.SUBJECT[currentSubjectKey].title;
  const maxStages = isExam ? 10 : 20;
  const qCount = isExam ? 100 : 50;
  const timeMins = isExam ? 120 : 60;

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
          <h4 class="font-bold text-white text-sm">${activeTitle} • Test ${stage}</h4>
          <p class="text-[11px] text-slate-400 mt-0.5">${qCount} Questions • ${timeMins} Minutes</p>
        </div>

        <div>
          ${isUnlocked ? `
            <button onclick="prepareTestStage(${stage})" class="w-full py-2.5 rounded-xl ${isNextTarget ? 'luxury-action-btn text-black' : 'bg-emerald-500 hover:bg-emerald-400 text-black'} font-extrabold text-xs transition shadow-md cursor-pointer">
              ${stage < unlockedStage ? 'Retake Test' : 'Take Practice Test'}
            </button>
          ` : `
            <button disabled class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed">
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
  currentTestStage = stage;
  const isExam = currentMockMode === 'EXAM';
  const activeTitle = isExam ? MOCK_CONFIG.EXAM[currentAuthorityKey].branches[currentBranchKey] : MOCK_CONFIG.SUBJECT[currentSubjectKey].title;
  
  document.getElementById('mock-hub-dashboard').classList.add('hidden');
  document.getElementById('mock-gatekeeper-screen').classList.remove('hidden');
  document.getElementById('gatekeeperTestTitle').innerText = `${activeTitle} • Practice Test ${stage < 10 ? '0' + stage : stage}`;
  
  const chk = document.getElementById('policyAgreementCheckbox');
  if (chk) { chk.checked = false; toggleCBTReady(chk); }
}
window.prepareTestStage = prepareTestStage;

function returnToMockHub() {
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
// 4. LIVE CBT SIMULATOR ENGINE (FETCHES REAL QUESTIONS)
// ----------------------------------------------------
async function startCbtSession() {
  const startBtn = document.getElementById('startCbtBtn');
  const originalText = startBtn.innerText;
  startBtn.innerText = "⏳ Loading Authentic Questions...";
  startBtn.disabled = true;

  const isExam = currentMockMode === 'EXAM';
  const activeKey = isExam ? currentBranchKey : MOCK_CONFIG.SUBJECT[currentSubjectKey].prefix;
  const fileName = `${activeKey}_stage_${currentTestStage}.json`;
  const fetchUrl = `${SUPABASE_MOCK_BASE}/${fileName}`;

  try {
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("File not found on storage");
    CBT_ACTIVE_QUESTIONS = await res.json();

    document.getElementById('mock-gatekeeper-screen').classList.add('hidden');
    document.getElementById('mock-live-screen').classList.remove('hidden');
    
    const activeTitle = isExam ? MOCK_CONFIG.EXAM[currentAuthorityKey].branches[currentBranchKey] : MOCK_CONFIG.SUBJECT[currentSubjectKey].title;
    document.getElementById('liveExamHeaderTitle').innerText = `${activeTitle} - Test 0${currentTestStage}`;

    cbtIndex = 0;
    cbtAnswers = {};
    cbtVisited = new Set([0]);
    cbtReview = new Set();
    cbtTimerSeconds = isExam ? 7200 : 3600; // 120m for Exams, 60m for Subjects

    renderCbtQuestion();
    renderCbtPalette();

    clearInterval(cbtTimerInterval);
    cbtTimerInterval = setInterval(() => {
      cbtTimerSeconds--;
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
      if (cbtTimerSeconds <= 0) submitCBT();
    }, 1000);

  } catch (err) {
    alert("This test's official question set is currently being deployed. Please try another test stage.");
  } finally {
    startBtn.innerText = originalText;
    startBtn.disabled = false;
  }
}
window.startCbtSession = startCbtSession;

function renderCbtQuestion() {
  const q = CBT_ACTIVE_QUESTIONS[cbtIndex];
  if (!q) return;

  cbtVisited.add(cbtIndex);

  document.getElementById('cbtQuestionNum').innerText = `Question ${cbtIndex + 1} of ${CBT_ACTIVE_QUESTIONS.length}`;
  document.getElementById('cbtSectionTag').innerText = q.section || "General Studies";
  document.getElementById('cbtQuestionText').innerText = q.en;

  const cont = document.getElementById('cbtOptionsContainer');
  cont.innerHTML = q.options.map((opt, idx) => {
    const isSelected = cbtAnswers[cbtIndex] === idx;
    return `
      <label class="flex items-center space-x-3 p-3.5 rounded-xl border ${isSelected ? 'border-amber-400 bg-amber-500/15 text-white font-bold shadow-md' : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20'} cursor-pointer text-xs transition">
        <input type="radio" name="cbtOptionChoice" value="${idx}" ${isSelected ? 'checked' : ''} onchange="cbtSelectOpt(${idx})" class="w-4 h-4 accent-amber-500">
        <span class="leading-relaxed">(${String.fromCharCode(65 + idx)}) ${opt}</span>
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
      <button onclick="jumpCbt(${idx})" class="w-full aspect-square rounded-md text-[10px] font-mono transition transform hover:scale-105 ${colorClass} ${isCurrent}">
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
  cbtIndex = idx;
  renderCbtQuestion();
  renderCbtPalette();
}
window.jumpCbt = jumpCbt;

// ----------------------------------------------------
// 5. SUBMIT, SCORING & QUALIFYING REPORT
// ----------------------------------------------------
function submitCBT() {
  clearInterval(cbtTimerInterval);
  document.getElementById('mock-live-screen').classList.add('hidden');
  const resScreen = document.getElementById('mock-result-screen');
  resScreen.classList.remove('hidden');

  let correctCount = 0;
  let attemptedCount = 0;

  CBT_ACTIVE_QUESTIONS.forEach((q, idx) => {
    if (cbtAnswers[idx] !== undefined) {
      attemptedCount++;
      if (cbtAnswers[idx] === q.correct) correctCount++;
    }
  });

  const wrongCount = attemptedCount - correctCount;
  const rawScore = (correctCount * 1.0) - (wrongCount * 0.25);
  const totalMarks = Math.max(0, rawScore);
  const maxPossibleMarks = CBT_ACTIVE_QUESTIONS.length * 1.0;
  const percentage = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0;
  const isPassed = percentage >= 35.0;

  const isExam = currentMockMode === 'EXAM';
  const activeKey = isExam ? currentBranchKey : MOCK_CONFIG.SUBJECT[currentSubjectKey].prefix;

  if (isPassed) {
    saveUserProgress(activeKey, currentTestStage + 1);
  }

  const activeTitle = isExam ? MOCK_CONFIG.EXAM[currentAuthorityKey].branches[currentBranchKey] : MOCK_CONFIG.SUBJECT[currentSubjectKey].title;

  resScreen.innerHTML = `
    <div class="glass-card gold-border p-6 rounded-2xl text-center space-y-4">
      <span class="text-4xl">${isPassed ? '🎉' : '⚠️'}</span>
      <h3 class="text-xl md:text-2xl font-black text-white">
        ${isPassed ? 'Assessment Qualified & Next Stage Unlocked!' : 'Qualifying Threshold Not Met'}
      </h3>
      <p class="text-xs text-slate-300">
        ${activeTitle} • Practice Test ${currentTestStage} Official Performance Report
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Net Score</span>
          <p class="text-lg font-black text-amber-400">${totalMarks.toFixed(2)} / ${maxPossibleMarks.toFixed(0)}</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Percentage</span>
          <p class="text-lg font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${percentage.toFixed(1)}%</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Correct Answers</span>
          <p class="text-lg font-black text-emerald-400">${correctCount} / ${CBT_ACTIVE_QUESTIONS.length}</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Negative Penalty</span>
          <p class="text-lg font-black text-rose-400">-${(wrongCount * 0.25).toFixed(2)}</p>
        </div>
      </div>

      <div class="p-3.5 rounded-xl ${isPassed ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'} text-xs font-semibold leading-relaxed">
        ${isPassed 
          ? `✅ <strong>Congratulations!</strong> You scored above the 35% threshold (${percentage.toFixed(1)}%). <strong>Test ${currentTestStage + 1}</strong> is now unlocked in your dashboard!` 
          : `❌ <strong>Attempt Locked:</strong> You achieved ${percentage.toFixed(1)}% (Pass rule: 35%). Review your answers below and retake Test ${currentTestStage} to advance.`
        }
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <button onclick="downloadOfficialResultPDF('${totalMarks.toFixed(2)}', '${percentage.toFixed(1)}', ${correctCount}, ${wrongCount})" class="flex-1 py-3.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
          <span>📥 Download Watermarked Scorecard (PDF)</span>
        </button>
        <button onclick="returnToMockHub()" class="flex-1 py-3.5 rounded-xl exam-btn text-white font-extrabold text-xs cursor-pointer p-3">
          ${isPassed ? 'Proceed to Stage Matrix ➔' : 'Re-attempt Test ' + currentTestStage}
        </button>
      </div>
    </div>

    <div class="space-y-3 pt-4">
      <h4 class="font-extrabold text-white text-sm uppercase tracking-wider">
        Detailed Solutions & Official Master Keys (${CBT_ACTIVE_QUESTIONS.length} Questions)
      </h4>
      ${CBT_ACTIVE_QUESTIONS.map((q, idx) => {
        const userChoice = cbtAnswers[idx];
        const isRight = userChoice === q.correct;
        const userText = userChoice !== undefined ? `(${String.fromCharCode(65 + userChoice)}) ${q.options[userChoice]}` : "Not Attempted";

        return `
          <div class="p-4 rounded-xl glass-card border border-white/10 space-y-2 text-xs">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="font-bold text-amber-400 uppercase">Q${idx + 1} • ${q.section || 'General'}</span>
              <span class="font-black ${isRight ? 'text-emerald-400' : (userChoice === undefined ? 'text-slate-500' : 'text-rose-400')}">
                ${isRight ? '+1.00 Marks' : (userChoice === undefined ? '0.00 Marks' : '-0.25 Marks')}
              </span>
            </div>
            <p class="text-white font-medium">${q.en}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
              <p class="${isRight ? 'text-emerald-400 font-bold' : 'text-rose-400'}">Your Response: ${userText}</p>
              <p class="text-emerald-400 font-bold">Official Key: (${String.fromCharCode(65 + q.correct)}) ${q.options[q.correct]}</p>
            </div>
            <div class="mt-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300 text-[11px] leading-relaxed">
              <strong>💡 Solution & Verification:</strong>
              <p class="mt-1 font-mono">${q.explanation || 'Official answer verified against regulatory key.'}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
window.submitCBT = submitCBT;

// ----------------------------------------------------
// 6. OFFICIAL PDF SCORECARD GENERATOR
// ----------------------------------------------------
async function downloadOfficialResultPDF(score, pct, correct, wrong) {
  try {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();

    page.drawRectangle({
      x: 25, y: 25, width: width - 50, height: height - 50,
      borderColor: PDFLib.rgb(0.85, 0.65, 0.15), borderWidth: 2,
      color: PDFLib.rgb(0.98, 0.98, 0.99)
    });

    page.drawText("EXAMRESIZER.ME OFFICIAL CBT SCORECARD", {
      x: 45, y: height - 60, size: 14, color: PDFLib.rgb(0.1, 0.1, 0.1)
    });
    
    const isExam = currentMockMode === 'EXAM';
    const activeTitle = isExam ? MOCK_CONFIG.EXAM[currentAuthorityKey].branches[currentBranchKey] : MOCK_CONFIG.SUBJECT[currentSubjectKey].title;
    
    page.drawText(`${activeTitle.toUpperCase()} - TEST ${currentTestStage}`, {
      x: 45, y: height - 80, size: 10, color: PDFLib.rgb(0.4, 0.4, 0.4)
    });

    page.drawLine({
      start: { x: 45, y: height - 90 }, end: { x: width - 45, y: height - 90 },
      thickness: 1, color: PDFLib.rgb(0.8, 0.8, 0.8)
    });

    const studentTitle = currentStudent.name ? `Candidate: ${currentStudent.name} (${currentStudent.phone})` : "Candidate: Guest Aspirant";
    page.drawText(studentTitle, { x: 45, y: height - 110, size: 10, color: PDFLib.rgb(0.2, 0.2, 0.2) });

    page.drawText(`Status: ${parseFloat(pct) >= 35 ? "QUALIFIED (Stage Unlocked)" : "UNQUALIFIED (Needs Re-attempt)"}`, {
      x: 45, y: height - 130, size: 12, color: parseFloat(pct) >= 35 ? PDFLib.rgb(0.1, 0.6, 0.2) : PDFLib.rgb(0.8, 0.2, 0.2)
    });
    page.drawText(`Net Score: ${score} / ${CBT_ACTIVE_QUESTIONS.length}.00`, { x: 45, y: height - 150, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15) });
    page.drawText(`Percentage: ${pct}% (Pass Requirement: 35.0%)`, { x: 45, y: height - 170, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15) });
    page.drawText(`Correct Answers: ${correct} / ${CBT_ACTIVE_QUESTIONS.length} | Negative Penalty Hits: -${(wrong * 0.25).toFixed(2)}`, {
      x: 45, y: height - 190, size: 10, color: PDFLib.rgb(0.35, 0.35, 0.35)
    });

    page.drawText("EXAMRESIZER.ME", {
      x: 100, y: height / 2 - 40, size: 48, rotate: PDFLib.degrees(45),
      color: PDFLib.rgb(0.85, 0.85, 0.9), opacity: 0.25
    });

    page.drawText("Verified Academic Diagnostic Report | Official Examination Simulation | www.examresizer.me", {
      x: 45, y: 40, size: 8, color: PDFLib.rgb(0.5, 0.5, 0.5)
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ExamResizer_ScoreCard_Stage0${currentTestStage}.pdf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 500);

  } catch (err) {
    alert("Could not generate result PDF card.");
  }
}
window.downloadOfficialResultPDF = downloadOfficialResultPDF;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  checkExistingStudentSession();
  selectMockDomain('GATE');
});
