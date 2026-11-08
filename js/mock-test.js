// ====================================================================
// ⏱️ EXAMRESIZER PRO - OFFICIAL CBT SIMULATOR ENGINE (TCS-iON ARCHITECTURE)
// Sequential Progression • 35% Gatekeeper • Multi-Language • Math Steps • PDF Card
// ====================================================================

const MOCK_DOMAINS = {
  APPSC: { 
    title: "Andhra Pradesh PSC (Groups & State PSUs)", 
    languages: [{ code: "en", name: "English" }, { code: "te", name: "తెలుగు" }],
    count: 10 
  },
  TGPSC: { 
    title: "Telangana PSC (Group Services & State PSUs)", 
    languages: [{ code: "en", name: "English" }, { code: "te", name: "తెలుగు" }],
    count: 10 
  },
  SSC: { 
    title: "Staff Selection Commission (CGL, CHSL & JE)", 
    languages: [{ code: "en", name: "English" }, { code: "hi", name: "हिन्दी" }, { code: "te", name: "తెలుగు" }],
    count: 10 
  },
  RRB: { 
    title: "Railway Recruitment Boards (NTPC, ALP & JE)", 
    languages: [{ code: "en", name: "English" }, { code: "hi", name: "हिन्दी" }, { code: "te", name: "తెలుగు" }],
    count: 10 
  },
  POWER_PSU: { 
    title: "Power Utilities & Technical PSUs (PGCIL/TRANSCO/GENCO)", 
    languages: [{ code: "en", name: "English" }, { code: "te", name: "తెలుగు" }],
    count: 10 
  },
  GATE: { 
    title: "GATE National Engineering Assessment", 
    languages: [{ code: "en", name: "English (Only)" }],
    count: 10 
  }
};

let currentDomain = 'APPSC';
let currentTestStage = 1;
let currentLanguage = 'en';
let CBT_ACTIVE_QUESTIONS = [];
let cbtIndex = 0;
let cbtAnswers = {};
let cbtVisited = new Set();
let cbtReview = new Set();
let cbtTimerSeconds = 3600;
let cbtTimerInterval = null;

// User Identity & Progression Model
let currentStudent = {
  name: localStorage.getItem('er_student_name') || '',
  phone: localStorage.getItem('er_student_phone') || '',
  progress: JSON.parse(localStorage.getItem('er_student_progress') || '{"APPSC": 1, "TGPSC": 1, "SSC": 1, "RRB": 1, "POWER_PSU": 1, "GATE": 1}')
};

// ----------------------------------------------------
// 1. SESSION MANAGEMENT & PERSISTENCE
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
  currentStudent = {
    name: '',
    phone: '',
    progress: {"APPSC": 1, "TGPSC": 1, "SSC": 1, "RRB": 1, "POWER_PSU": 1, "GATE": 1}
  };
  checkExistingStudentSession();
  renderStageCards();
}
window.logoutStudent = logoutStudent;

function getUserProgress(domain) {
  return currentStudent.progress[domain] || 1;
}

function saveUserProgress(domain, unlockedStage) {
  const current = getUserProgress(domain);
  if (unlockedStage > current) {
    currentStudent.progress[domain] = unlockedStage;
    localStorage.setItem('er_student_progress', JSON.stringify(currentStudent.progress));
  }
}

// ----------------------------------------------------
// 2. DASHBOARD & STAGE MATRIX
// ----------------------------------------------------
function selectMockDomain(domain) {
  currentDomain = domain;
  
  Object.keys(MOCK_DOMAINS).forEach(d => {
    const btn = document.getElementById('domain-btn-' + d);
    if (btn) {
      if (d === domain) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const titleEl = document.getElementById('activeMockDomainTitle');
  if (titleEl) titleEl.innerText = MOCK_DOMAINS[domain].title;

  renderStageCards();
}
window.selectMockDomain = selectMockDomain;

function renderStageCards() {
  const container = document.getElementById('mockTestsGridContainer');
  if (!container) return;

  const unlockedStage = getUserProgress(currentDomain);
  const statusEl = document.getElementById('userTierStatus');
  if (statusEl) statusEl.innerText = `Active Tier: Practice Test ${unlockedStage} Unlocked`;

  let html = '';
  for (let stage = 1; stage <= 10; stage++) {
    const isUnlocked = stage <= unlockedStage;
    const isNextTarget = stage === unlockedStage;

    html += `
      <div class="p-4 rounded-xl glass-card border ${isUnlocked ? (isNextTarget ? 'border-amber-400 gold-glow' : 'border-emerald-500/40') : 'border-white/5 opacity-50'} flex flex-col justify-between space-y-3 transition transform hover:-translate-y-1">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase ${isUnlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}">
              Stage 0${stage}
            </span>
            <span class="text-[10px] font-bold ${isUnlocked ? (stage < unlockedStage ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-500'}">
              ${isUnlocked ? (stage < unlockedStage ? '✔ CLEARED' : '★ ACTIVE') : '🔒 LOCKED'}
            </span>
          </div>
          <h4 class="font-bold text-white text-sm">Practice Test 0${stage}</h4>
          <p class="text-[11px] text-slate-400 mt-0.5">100 Bits • 200 Marks • Pass 35%</p>
        </div>

        <div>
          ${isUnlocked ? `
            <button onclick="prepareTestStage(${stage})" class="w-full py-2.5 rounded-xl ${isNextTarget ? 'luxury-action-btn text-black' : 'bg-emerald-500 hover:bg-emerald-400 text-black'} font-extrabold text-xs transition shadow-md cursor-pointer">
              ${stage < unlockedStage ? 'Retake Assessment' : 'Take Practice Test'}
            </button>
          ` : `
            <button disabled class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed">
              🔒 Clear Stage 0${stage - 1} First
            </button>
          `}
        </div>
      </div>
    `;
  }

  html += `
    <div class="p-4 rounded-xl glass-card border border-white/5 opacity-40 flex flex-col justify-between space-y-3">
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-800 text-slate-400">Stage 11</span>
          <span class="text-[10px] font-bold text-rose-400">COMING SOON</span>
        </div>
        <h4 class="font-bold text-white text-sm">Pro Mastery Test 11</h4>
        <p class="text-[11px] text-slate-400 mt-0.5">High-Yield Regulatory Pack</p>
      </div>
      <button disabled class="w-full py-2.5 rounded-xl bg-slate-800/80 text-slate-500 font-bold text-xs cursor-not-allowed">
        🔒 Next Release
      </button>
    </div>
  `;

  container.innerHTML = html;
}
window.renderStageCards = renderStageCards;

function prepareTestStage(stage) {
  currentTestStage = stage;
  document.getElementById('mock-hub-dashboard').classList.add('hidden');
  document.getElementById('mock-gatekeeper-screen').classList.remove('hidden');
  document.getElementById('gatekeeperTestTitle').innerText = `${MOCK_DOMAINS[currentDomain].title} • Practice Test 0${stage}`;
  
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
// 3. LIVE CBT SIMULATOR ENGINE (TCS ARCHITECTURE)
// ----------------------------------------------------
function startCbtSession() {
  document.getElementById('mock-gatekeeper-screen').classList.add('hidden');
  document.getElementById('mock-live-screen').classList.remove('hidden');
  document.getElementById('liveExamHeaderTitle').innerText = `${MOCK_DOMAINS[currentDomain].title} - Test 0${currentTestStage}`;

  // Populate Domain-Specific Languages
  const langSelect = document.getElementById('cbtLanguageSelect');
  if (langSelect) {
    langSelect.innerHTML = MOCK_DOMAINS[currentDomain].languages.map(l => 
      `<option value="${l.code}">${l.name}</option>`
    ).join('');
    currentLanguage = MOCK_DOMAINS[currentDomain].languages[0].code;
  }

  // Load authentic question suite
  CBT_ACTIVE_QUESTIONS = generateStageQuestions(currentDomain, currentTestStage);
  cbtIndex = 0;
  cbtAnswers = {};
  cbtVisited = new Set([0]);
  cbtReview = new Set();
  cbtTimerSeconds = 3600;

  renderCbtQuestion();
  renderCbtPalette();

  clearInterval(cbtTimerInterval);
  cbtTimerInterval = setInterval(() => {
    cbtTimerSeconds--;
    const m = Math.floor(cbtTimerSeconds / 60);
    const s = cbtTimerSeconds % 60;
    const clock = document.getElementById('cbtClock');
    if (clock) clock.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (cbtTimerSeconds <= 0) submitCBT();
  }, 1000);
}
window.startCbtSession = startCbtSession;

function cbtChangeLanguage(langCode) {
  currentLanguage = langCode;
  renderCbtQuestion();
}
window.cbtChangeLanguage = cbtChangeLanguage;

function renderCbtQuestion() {
  const q = CBT_ACTIVE_QUESTIONS[cbtIndex];
  if (!q) return;

  cbtVisited.add(cbtIndex);

  document.getElementById('cbtQuestionNum').innerText = `Question No. ${cbtIndex + 1} of ${CBT_ACTIVE_QUESTIONS.length}`;
  document.getElementById('cbtSectionTag').innerText = q.section;

  // Render question text in selected language
  const qText = (currentLanguage === 'te' && q.te) ? q.te : ((currentLanguage === 'hi' && q.hi) ? q.hi : q.en);
  document.getElementById('cbtQuestionText').innerText = qText;

  const cont = document.getElementById('cbtOptionsContainer');
  const opts = (currentLanguage === 'te' && q.options_te) ? q.options_te : ((currentLanguage === 'hi' && q.options_hi) ? q.options_hi : q.options);

  cont.innerHTML = opts.map((opt, idx) => {
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

    // TCS Standard 5-Color Code System
    let colorClass = 'bg-slate-800 text-slate-400 border border-white/5'; // Not visited
    let badgeDot = '';

    if (isAnswered && isReviewed) {
      colorClass = 'bg-purple-600 text-white font-extrabold relative'; // Answered & Marked for Review
      badgeDot = '<span class="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>';
    } else if (isAnswered) {
      colorClass = 'bg-emerald-500 text-black font-extrabold shadow-sm'; // Answered
    } else if (isReviewed) {
      colorClass = 'bg-purple-600 text-white font-extrabold'; // Marked for Review
    } else if (isVisited) {
      colorClass = 'bg-rose-500/80 text-white font-bold'; // Not Answered
    }

    return `
      <button onclick="jumpCbt(${idx})" class="w-full aspect-square rounded-md text-[11px] font-mono transition transform hover:scale-105 ${colorClass} ${isCurrent}">
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
// 4. SCORING ANALYTICS & 35% PASS GATEKEEPER
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
  const rawScore = (correctCount * 2.0) - (wrongCount * 0.5);
  const totalMarks = Math.max(0, rawScore);
  const maxPossibleMarks = CBT_ACTIVE_QUESTIONS.length * 2.0;
  const percentage = (totalMarks / maxPossibleMarks) * 100;
  const isPassed = percentage >= 35.0;

  if (isPassed) {
    saveUserProgress(currentDomain, currentTestStage + 1);
  }

  resScreen.innerHTML = `
    <div class="glass-card gold-border p-6 rounded-2xl text-center space-y-4">
      <span class="text-4xl">${isPassed ? '🎉' : '⚠️'}</span>
      <h3 class="text-xl md:text-2xl font-black text-white">
        ${isPassed ? 'Assessment Qualified & Next Stage Unlocked!' : 'Qualifying Threshold Not Met'}
      </h3>
      <p class="text-xs text-slate-300">
        ${MOCK_DOMAINS[currentDomain].title} • Practice Test 0${currentTestStage} Official Performance Report
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Net Score</span>
          <p class="text-lg font-black text-amber-400">${totalMarks.toFixed(2)} / ${maxPossibleMarks.toFixed(0)}</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Score Percentage</span>
          <p class="text-lg font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${percentage.toFixed(1)}%</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Correct Answers</span>
          <p class="text-lg font-black text-emerald-400">${correctCount} Qs</p>
        </div>
        <div class="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span class="text-[10px] uppercase font-bold text-slate-400">Negative Penalty</span>
          <p class="text-lg font-black text-rose-400">-${(wrongCount * 0.5).toFixed(2)}</p>
        </div>
      </div>

      <div class="p-3.5 rounded-xl ${isPassed ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'} text-xs font-semibold leading-relaxed">
        ${isPassed 
          ? `✅ <strong>Congratulations!</strong> You scored above the 35% pass mark threshold (${percentage.toFixed(1)}%). <strong>Practice Test 0${currentTestStage + 1}</strong> is now unlocked in your portal!` 
          : `❌ <strong>Attempt Locked:</strong> You achieved ${percentage.toFixed(1)}% (Pass requirement is 35%). Review your mistakes below and retake Practice Test 0${currentTestStage} to unlock the next level.`
        }
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <button onclick="downloadOfficialResultPDF('${totalMarks.toFixed(2)}', '${percentage.toFixed(1)}', ${correctCount}, ${wrongCount})" class="flex-1 py-3.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
          <span>📥 Download Watermarked Result Card (PDF)</span>
        </button>
        <button onclick="returnToMockHub()" class="flex-1 py-3.5 rounded-xl gaming-btn text-white font-extrabold text-xs cursor-pointer">
          ${isPassed ? 'Proceed to Stage Matrix ➔' : 'Re-attempt Test 0' + currentTestStage}
        </button>
      </div>
    </div>

    <div class="space-y-3 pt-4">
      <h4 class="font-extrabold text-white text-sm uppercase tracking-wider">
        Comprehensive Solutions & Mathematical Steps
      </h4>
      ${CBT_ACTIVE_QUESTIONS.map((q, idx) => {
        const userChoice = cbtAnswers[idx];
        const isRight = userChoice === q.correct;
        const userText = userChoice !== undefined ? `(${String.fromCharCode(65 + userChoice)}) ${q.options[userChoice]}` : "Not Attempted";

        return `
          <div class="p-4 rounded-xl glass-card border border-white/10 space-y-2 text-xs">
            <div class="flex items-center justify-between border-b border-white/5 pb-2">
              <span class="font-bold text-amber-400 uppercase">Q${idx + 1} • ${q.section}</span>
              <span class="font-black ${isRight ? 'text-emerald-400' : (userChoice === undefined ? 'text-slate-500' : 'text-rose-400')}">
                ${isRight ? '+2.00 Marks' : (userChoice === undefined ? '0.00 Marks' : '-0.50 Marks')}
              </span>
            </div>
            <p class="text-white font-medium">${q.en}</p>
            ${q.te ? `<p class="text-slate-400 italic">${q.te}</p>` : ''}
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
              <p class="${isRight ? 'text-emerald-400 font-bold' : 'text-rose-400'}">Your Response: ${userText}</p>
              <p class="text-emerald-400 font-bold">Official Key: (${String.fromCharCode(65 + q.correct)}) ${q.options[q.correct]}</p>
            </div>

            <div class="mt-2 p-3 rounded-lg ${q.isMath ? 'bg-amber-500/10 border border-amber-500/20 text-amber-200' : 'bg-white/[0.02] border border-white/5 text-slate-300'} text-[11px] leading-relaxed">
              <strong>${q.isMath ? '🧮 Step-by-Step Mathematical Solution:' : '💡 Official Regulatory Solution:'}</strong>
              <p class="mt-1 font-mono">${q.explanation}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
window.submitCBT = submitCBT;

// ----------------------------------------------------
// 5. OFFICIAL WATERMARKED PDF RESULT CARD
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

    page.drawText("EXAMRESIZER.ME OFFICIAL PRACTICE SCORECARD", {
      x: 45, y: height - 60, size: 14, color: PDFLib.rgb(0.1, 0.1, 0.1)
    });
    page.drawText(`${MOCK_DOMAINS[currentDomain].title} - PRACTICE STAGE 0${currentTestStage}`, {
      x: 45, y: height - 80, size: 10, color: PDFLib.rgb(0.4, 0.4, 0.4)
    });

    page.drawLine({
      start: { x: 45, y: height - 90 }, end: { x: width - 45, y: height - 90 },
      thickness: 1, color: PDFLib.rgb(0.8, 0.8, 0.8)
    });

    const studentTitle = currentStudent.name ? `Candidate: ${currentStudent.name} (${currentStudent.phone})` : "Candidate: Guest Aspirant";
    page.drawText(studentTitle, {
      x: 45, y: height - 110, size: 10, color: PDFLib.rgb(0.2, 0.2, 0.2)
    });

    page.drawText(`Candidate Status: ${parseFloat(pct) >= 35 ? "QUALIFIED (Stage Unlocked)" : "UNQUALIFIED (Needs Re-attempt)"}`, {
      x: 45, y: height - 130, size: 12, color: parseFloat(pct) >= 35 ? PDFLib.rgb(0.1, 0.6, 0.2) : PDFLib.rgb(0.8, 0.2, 0.2)
    });
    page.drawText(`Net Score: ${score} / ${(CBT_ACTIVE_QUESTIONS.length * 2)}`, {
      x: 45, y: height - 150, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15)
    });
    page.drawText(`Percentage: ${pct}% (Threshold: 35.0%)`, {
      x: 45, y: height - 170, size: 11, color: PDFLib.rgb(0.15, 0.15, 0.15)
    });
    page.drawText(`Correct Answers: ${correct} | Negative Penalty Hits: ${wrong}`, {
      x: 45, y: height - 190, size: 10, color: PDFLib.rgb(0.35, 0.35, 0.35)
    });

    let yPos = height - 225;
    page.drawText("Question-wise Response & Master Validation:", {
      x: 45, y: yPos, size: 10, color: PDFLib.rgb(0.2, 0.2, 0.2)
    });
    yPos -= 20;

    CBT_ACTIVE_QUESTIONS.slice(0, 10).forEach((q, i) => {
      const isRight = cbtAnswers[i] === q.correct;
      page.drawText(`Q.${i + 1} [${q.section.substring(0, 15)}...] Key: (${String.fromCharCode(65 + q.correct)}) | Verdict: ${isRight ? "CORRECT (+2.0)" : "INCORRECT (-0.5)"}`, {
        x: 45, y: yPos, size: 8.5, color: isRight ? PDFLib.rgb(0.1, 0.5, 0.1) : PDFLib.rgb(0.7, 0.1, 0.1)
      });
      yPos -= 16;
    });

    page.drawText("EXAMRESIZER.ME", {
      x: 100, y: height / 2 - 40, size: 48, rotate: PDFLib.degrees(45),
      color: PDFLib.rgb(0.85, 0.85, 0.9), opacity: 0.25
    });

    page.drawText("Verified Academic Diagnostic Report | In-Browser Privacy Protection | www.examresizer.me", {
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

// ----------------------------------------------------
// 6. QUESTION BANK ENGINE WITH MULTI-LANGUAGE
// ----------------------------------------------------
function generateStageQuestions(domain, stage) {
  return [
    {
      id: 1,
      section: "Quantitative Aptitude & Mathematics",
      isMath: true,
      en: "If a sum of money doubles itself at compound interest in 6 years, in how many years will it become 8 times of itself at the same rate?",
      te: "ఒక నిర్దిష్ట మొత్తం చక్రవడ్డీ ప్రకారం 6 సంవత్సరాలలో 2 రెట్లు అయితే, అదే వడ్డీ రేటు వద్ద ఎన్ని సంవత్సరాలలో అది 8 రెట్లు అవుతుంది?",
      hi: "यदि कोई राशि चक्रवृद्धि ब्याज पर 6 वर्षों में दोगुनी हो जाती है, तो उसी दर पर यह कितने वर्षों में 8 गुना हो जाएगी?",
      options: ["18 Years", "12 Years", "24 Years", "16 Years"],
      options_te: ["18 సంవత్సరాలు", "12 సంవత్సరాలు", "24 సంవత్సరాలు", "16 సంవత్సరాలు"],
      options_hi: ["18 वर्ष", "12 वर्ष", "24 वर्ष", "16 वर्ष"],
      correct: 0,
      explanation: "Step 1: Formula for compound growth is P(1 + r/100)^t = A.\nStep 2: Here 2P occurs at t = 6 years.\nStep 3: To become 8P = (2)^3 P, time required = 3 × 6 = 18 Years."
    },
    {
      id: 2,
      section: "Logical Reasoning",
      isMath: true,
      en: "Find the missing number in the sequential numerical series: 12, 36, 108, 324, (?)",
      te: "ఇచ్చిన శ్రేణిలో తర్వాతి సంఖ్యను కనుగొనండి: 12, 36, 108, 324, (?)",
      hi: "श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 12, 36, 108, 324, (?)",
      options: ["972", "648", "864", "996"],
      options_te: ["972", "648", "864", "996"],
      options_hi: ["972", "648", "864", "996"],
      correct: 0,
      explanation: "Step 1: Notice the geometric progression multiplier: 12 × 3 = 36; 36 × 3 = 108; 108 × 3 = 324.\nStep 2: Next number = 324 × 3 = 972."
    },
    {
      id: 3,
      section: "Indian Polity & Constitution",
      isMath: false,
      en: "Which Constitutional Amendment Act is known as the 'Mini-Constitution' of India?",
      te: "భారత రాజ్యాంగంలో ఏ సవరణ చట్టాన్ని 'మినీ రాజ్యాంగం' (Mini-Constitution) అని పిలుస్తారు?",
      hi: "किस संविधान संशोधन अधिनियम को भारत का 'लघु संविधान' कहा जाता है?",
      options: ["42nd Amendment Act (1976)", "44th Amendment Act (1978)", "73rd Amendment Act (1992)", "86th Amendment Act (2002)"],
      options_te: ["42వ సవరణ చట్టం (1976)", "44వ సవరణ చట్టం (1978)", "73వ సవరణ చట్టం (1992)", "86వ సవరణ చట్టం (2002)"],
      options_hi: ["42वां संशोधन अधिनियम (1976)", "44वां संशोधन अधिनियम (1978)", "73वां संशोधन अधिनियम (1992)", "86वां संशोधन अधिनियम (2002)"],
      correct: 0,
      explanation: "The 42nd Constitutional Amendment Act, 1976 introduced fundamental changes including the words 'Socialist, Secular, Integrity' to the Preamble."
    },
    {
      id: 4,
      section: "General Science & Technology",
      isMath: false,
      en: "Which part of the human brain regulates cardiovascular activities, respiration, and swallowing reflexes?",
      te: "మానవ మెదడులోని ఏ భాగం హృదయ స్పందనలు, శ్వాసక్రియ మరియు మింగే చర్యలను నియంత్రిస్తుంది?",
      hi: "मानव मस्तिष्क का कौन सा भाग हृदय गति, श्वसन और निगलने की क्रिया को नियंत्रित करता है?",
      options: ["Medulla Oblongata", "Cerebellum", "Cerebrum", "Hypothalamus"],
      options_te: ["మెడుల్లా ఆబ్లాంగటా (మజ్జాముఖం)", "సెరెబెల్లమ్ (చిన్న మెదడు)", "సెరెబ్రమ్ (పెద్ద మెదడు)", "హైపోథాలమస్"],
      options_hi: ["मेडुला ऑब्लांगेटा", "सेरिबैलम", "सेरेब्रम", "हाइपोथैलेमस"],
      correct: 0,
      explanation: "The Medulla Oblongata in the hindbrain coordinates involuntary cardiac, vasomotor, and respiratory reflex centers."
    },
    {
      id: 5,
      section: "Economy & Sustainable Development",
      isMath: false,
      en: "What is the primary indicator used to measure inflation trends on consumer baskets in India?",
      te: "భారతదేశంలో వినియోగదారుల స్థాయిలో ద్రవ్యోల్బణాన్ని (Inflation) లెక్కించడానికి ఉపయోగించే ప్రామాణిక సూచిక ఏది?",
      hi: "भारत में उपभोक्ता स्तर पर मुद्रास्फीति को मापने के लिए किस सूचकांक का उपयोग किया जाता है?",
      options: ["Consumer Price Index (CPI Combined)", "Wholesale Price Index (WPI)", "Gross Domestic Product Deflator", "Index of Industrial Production"],
      options_te: ["వినియోగదారుల ధరల సూచిక (CPI కంబైన్డ్)", "టోకు ధరల సూచిక (WPI)", "జిడిపి డిఫ్లేటర్", "పారిశ్రామిక ఉత్పత్తి సూచిక (IIP)"],
      options_hi: ["उपभोक्ता मूल्य सूचकांक (CPI संयुक्त)", "थोक मूल्य सूचकांक (WPI)", "सकल घरेलू उत्पाद डिफ्लेटर", "औद्योगिक उत्पादन सूचकांक"],
      correct: 0,
      explanation: "The Reserve Bank of India adopts the Consumer Price Index (CPI-Combined) as the key metric for inflation targeting and monetary policy formulation."
    }
  ];
}

document.addEventListener('DOMContentLoaded', () => {
  checkExistingStudentSession();
  renderStageCards();
});
