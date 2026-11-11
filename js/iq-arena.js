/**
 * ExamResizer Pro - Speed Aptitude & IQ Arena Engine 3.0 (Blazing Fast & Zero-Hang)
 * Architecture: Deterministic Shuffled Pools (Zero Infinite Loops), Instant Event Execution
 */

const LEVEL_RULES = [
  { level: 1, name: "Cadet Warmup", questions: 10, timeLimit: 60, passScore: 8 },
  { level: 2, name: "Speed Aspirant", questions: 10, timeLimit: 50, passScore: 8 },
  { level: 3, name: "Officer Sprint", questions: 10, timeLimit: 40, passScore: 9 },
  { level: 4, name: "Commander Drill", questions: 10, timeLimit: 35, passScore: 9 },
  { level: 5, name: "God Mode (Boss)", questions: 10, timeLimit: 25, passScore: 10 }
];

const MASTER_ENGLISH_BANK = [
  { q: 'Synonym of "CANDID"', o: ['Secretive', 'Frank', 'Biased', 'False'], a: 1 },
  { q: 'Antonym of "TRANSIENT"', o: ['Fleeting', 'Brief', 'Permanent', 'Short'], a: 2 },
  { q: 'Correct Spelling:', o: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomadate'], a: 1 },
  { q: 'Synonym of "DILIGENT"', o: ['Lazy', 'Careless', 'Hardworking', 'Slow'], a: 2 },
  { q: 'Antonym of "OBSOLETE"', o: ['Contemporary', 'Antique', 'Old', 'Historic'], a: 0 },
  { q: 'Correct Spelling:', o: ['Maintenance', 'Maintainance', 'Maintenence', 'Mantenance'], a: 0 },
  { q: 'Synonym of "PRAGMATIC"', o: ['Ideal', 'Practical', 'Imaginary', 'Wild'], a: 1 },
  { q: 'Antonym of "FRUGAL"', o: ['Thrifty', 'Extravagant', 'Cheap', 'Saving'], a: 1 },
  { q: 'Correct Spelling:', o: ['Occurrence', 'Occurence', 'Ocurrence', 'Occurrance'], a: 0 },
  { q: 'Synonym of "LUCID"', o: ['Cloudy', 'Clear', 'Dark', 'Confusing'], a: 1 },
  { q: 'Synonym of "ABUNDANT"', o: ['Scarce', 'Plentiful', 'Meager', 'Rare'], a: 1 },
  { q: 'Antonym of "HOSTILE"', o: ['Friendly', 'Aggressive', 'Cold', 'Bitter'], a: 0 },
  { q: 'Correct Spelling:', o: ['Privilege', 'Privelege', 'Priviledge', 'Privledge'], a: 0 },
  { q: 'Synonym of "METICULOUS"', o: ['Careless', 'Detailed', 'Rough', 'Quick'], a: 1 },
  { q: 'Antonym of "AMBIGUOUS"', o: ['Obscure', 'Vague', 'Definite', 'Hidden'], a: 2 },
  { q: 'Correct Spelling:', o: ['Questionnaire', 'Questionaire', 'Questionair', 'Questionnare'], a: 0 },
  { q: 'Synonym of "ZEALOUS"', o: ['Apathetic', 'Passionate', 'Lazy', 'Dull'], a: 1 },
  { q: 'Antonym of "OPTIMISTIC"', o: ['Hopeful', 'Confident', 'Pessimistic', 'Cheerful'], a: 2 },
  { q: 'Correct Spelling:', o: ['Definitely', 'Definately', 'Definitly', 'Definetly'], a: 0 },
  { q: 'Synonym of "BENEVOLENT"', o: ['Kind', 'Cruel', 'Greedy', 'Harsh'], a: 0 },
  { q: 'Antonym of "AFFLUENT"', o: ['Wealthy', 'Poor', 'Rich', 'Prosperous'], a: 1 },
  { q: 'Correct Spelling:', o: ['Hierarchy', 'Heirarchy', 'Hierarcy', 'Heirarcy'], a: 0 },
  { q: 'Synonym of "TENACIOUS"', o: ['Persistent', 'Weak', 'Yielding', 'Soft'], a: 0 },
  { q: 'Antonym of "RIGID"', o: ['Hard', 'Flexible', 'Firm', 'Stiff'], a: 1 },
  { q: 'Correct Spelling:', o: ['Separate', 'Seperate', 'Seprate', 'Sepparate'], a: 0 },
  { q: 'Synonym of "VERBOSE"', o: ['Wordy', 'Brief', 'Short', 'Silent'], a: 0 },
  { q: 'Antonym of "SCARCITY"', o: ['Deficit', 'Plenitude', 'Poverty', 'Lack'], a: 1 },
  { q: 'Correct Spelling:', o: ['Bureaucracy', 'Burocracy', 'Beurocracy', 'Bureaucrasy'], a: 0 },
  { q: 'Synonym of "ADVERSITY"', o: ['Hardship', 'Prosperity', 'Joy', 'Luck'], a: 0 },
  { q: 'Antonym of "PLACID"', o: ['Quiet', 'Agitated', 'Calm', 'Peaceful'], a: 1 }
];

window.arenaSession = {
  gameId: 'tables',
  gameTitle: 'Tables Speed Drill (1-20)',
  currentLevelIdx: 0,
  levelQuestions: [],
  qIndex: 0,
  timerSeconds: 60,
  timerInterval: null,
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
  isLocked: false
};

// High-speed array randomizer
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 100% Deterministic Generator (Zero While Loops, Zero Freezing)
function getLevelQuestions(gameId, levelNum) {
  const count = 10;
  const items = [];

  // 1. TABLES SPEED DRILL (1-20)
  if (gameId === 'tables') {
    const tableConfigs = [
      { tMin: 2, tMax: 10, mMin: 2, mMax: 10 },
      { tMin: 6, tMax: 13, mMin: 3, mMax: 12 },
      { tMin: 11, tMax: 16, mMin: 4, mMax: 14 },
      { tMin: 13, tMax: 19, mMin: 5, mMax: 16 },
      { tMin: 15, tMax: 20, mMin: 6, mMax: 19 }
    ];
    const cfg = tableConfigs[Math.min(levelNum - 1, 4)];
    for (let t = cfg.tMin; t <= cfg.tMax; t++) {
      for (let m = cfg.mMin; m <= cfg.mMax; m++) {
        items.push({ display: `${t} × ${m} = ?`, answer: String(t * m) });
      }
    }
  }

  // 2. SQUARES CHALLENGE (1-50)
  else if (gameId === 'squares') {
    const squareConfigs = [
      { min: 2, max: 20 },
      { min: 11, max: 30 },
      { min: 21, max: 40 },
      { min: 31, max: 50 },
      { min: 15, max: 50 }
    ];
    const cfg = squareConfigs[Math.min(levelNum - 1, 4)];
    for (let n = cfg.min; n <= cfg.max; n++) {
      items.push({ display: `${n}² = ?`, answer: String(n * n) });
    }
  }

  // 3. ROOTS EXTRACTION DRILL (Square & Cube Roots)
  else if (gameId === 'roots') {
    if (levelNum <= 2) {
      for (let n = 2; n <= 25; n++) {
        items.push({ display: `√${n * n} = ?`, answer: String(n) });
      }
    } else if (levelNum === 3) {
      for (let n = 20; n <= 50; n++) {
        items.push({ display: `√${n * n} = ?`, answer: String(n) });
      }
    } else if (levelNum === 4) {
      for (let n = 2; n <= 20; n++) {
        items.push({ display: `∛${n * n * n} = ?`, answer: String(n) });
      }
    } else {
      for (let n = 25; n <= 50; n++) {
        items.push({ display: `√${n * n} = ?`, answer: String(n) });
      }
      for (let n = 11; n <= 30; n++) {
        items.push({ display: `∛${n * n * n} = ?`, answer: String(n) });
      }
    }
  }

  // 4. CUBES POWER DRILL (1-30) - (FIXED BUG: Wide deterministic pool)
  else if (gameId === 'cubes') {
    const cubeConfigs = [
      { min: 1, max: 15 },
      { min: 6, max: 20 },
      { min: 11, max: 25 },
      { min: 15, max: 30 },
      { min: 1, max: 30 }
    ];
    const cfg = cubeConfigs[Math.min(levelNum - 1, 4)];
    for (let c = cfg.min; c <= cfg.max; c++) {
      items.push({ display: `${c}³ = ?`, answer: String(c * c * c) });
    }
  }

  // 5. FAST BODMAS & SIMPLIFICATION (Strict Positive Answers)
  else if (gameId === 'bodmas') {
    for (let i = 0; i < 30; i++) {
      if (levelNum === 1) {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 50) + 10;
        items.push({ display: `${a} + ${b} = ?`, answer: String(a + b) });
      } else if (levelNum === 2) {
        const n1 = Math.floor(Math.random() * 60) + 40;
        const n2 = Math.floor(Math.random() * 35) + 10;
        const big = Math.max(n1, n2);
        const sm = Math.min(n1, n2);
        items.push({ display: `${big} - ${sm} = ?`, answer: String(big - sm) });
      } else if (levelNum === 3) {
        const m1 = Math.floor(Math.random() * 12) + 4;
        const m2 = Math.floor(Math.random() * 9) + 3;
        items.push({ display: `${m1} × ${m2} = ?`, answer: String(m1 * m2) });
      } else if (levelNum === 4) {
        const base = (Math.floor(Math.random() * 7) + 2) * 100;
        const p = [10, 20, 25, 50][i % 4];
        items.push({ display: `${p}% of ${base} = ?`, answer: String((p * base) / 100) });
      } else {
        const a = Math.floor(Math.random() * 30) + 25;
        const b = Math.floor(Math.random() * 20) + 15;
        const c = Math.floor(Math.random() * 15) + 5;
        items.push({ display: `${a} + ${b} - ${c} = ?`, answer: String(a + b - c) });
      }
    }
  }

  // 6. RAPID ENGLISH VOCAB
  else if (gameId === 'english') {
    const shuffled = shuffleArray(MASTER_ENGLISH_BANK);
    const startIdx = ((levelNum - 1) * 6) % Math.max(1, MASTER_ENGLISH_BANK.length - 10);
    return shuffled.slice(startIdx, startIdx + count);
  }

  // Instant Fisher-Yates Shuffle & Cut exactly 10 Qs
  return shuffleArray(items).slice(0, count);
}

window.returnToIQHub = function() {
  stopTimer();
  const arenaScreen = document.getElementById('iq-arena-screen');
  const scorecardScreen = document.getElementById('iq-scorecard-screen');
  const hubScreen = document.getElementById('iq-hub-screen');

  if (arenaScreen) arenaScreen.classList.add('hidden');
  if (scorecardScreen) scorecardScreen.classList.add('hidden');
  if (hubScreen) hubScreen.classList.remove('hidden');

  const iqZone = document.getElementById('iq-zone');
  if (iqZone) {
    iqZone.classList.remove('hidden');
    iqZone.classList.add('block');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.startIQGame = function(gameId, title, levelIdx = 0) {
  stopTimer();

  window.arenaSession.gameId = gameId || window.arenaSession.gameId || 'tables';
  window.arenaSession.gameTitle = title || window.arenaSession.gameTitle || 'Speed Drill';
  window.arenaSession.currentLevelIdx = Math.max(0, Math.min(levelIdx, LEVEL_RULES.length - 1));
  window.arenaSession.correct = 0;
  window.arenaSession.wrong = 0;
  window.arenaSession.qIndex = 0;
  window.arenaSession.streak = 0;
  window.arenaSession.isLocked = false;

  const currentRule = LEVEL_RULES[window.arenaSession.currentLevelIdx];
  window.arenaSession.timerSeconds = currentRule.timeLimit;
  window.arenaSession.levelQuestions = getLevelQuestions(window.arenaSession.gameId, window.arenaSession.currentLevelIdx + 1);

  const hubScreen = document.getElementById('iq-hub-screen');
  const scorecardScreen = document.getElementById('iq-scorecard-screen');
  const arenaScreen = document.getElementById('iq-arena-screen');

  if (hubScreen) hubScreen.classList.add('hidden');
  if (scorecardScreen) scorecardScreen.classList.add('hidden');
  if (arenaScreen) arenaScreen.classList.remove('hidden');

  const titleEl = document.getElementById('arena-game-title');
  if (titleEl) {
    titleEl.innerText = `${window.arenaSession.gameTitle} • Lv.${currentRule.level} (${currentRule.name})`;
  }

  startTimer();
  renderQuestion();
  setupScrollWheel();
};

function startTimer() {
  stopTimer();
  updateTimerUI();
  window.arenaSession.timerInterval = setInterval(() => {
    window.arenaSession.timerSeconds--;
    updateTimerUI();
    if (window.arenaSession.timerSeconds <= 0) {
      stopTimer();
      finishLevel(false);
    }
  }, 1000);
}

function stopTimer() {
  if (window.arenaSession.timerInterval) {
    clearInterval(window.arenaSession.timerInterval);
    window.arenaSession.timerInterval = null;
  }
}

function updateTimerUI() {
  const currentRule = LEVEL_RULES[window.arenaSession.currentLevelIdx];
  const sec = Math.max(0, window.arenaSession.timerSeconds);
  const timerText = document.getElementById('arena-timer-text');
  const timerBar = document.getElementById('arena-timer-bar');

  if (timerText) timerText.innerText = `${String(sec).padStart(2, '0')}s`;
  if (timerBar) {
    const pct = (sec / currentRule.timeLimit) * 100;
    timerBar.style.width = `${pct}%`;

    if (sec <= 8) {
      if (timerText) timerText.className = 'text-rose-500 font-mono font-black text-2xl animate-ping';
      timerBar.className = 'h-full bg-rose-500 transition-all duration-200';
    } else if (sec <= 18) {
      if (timerText) timerText.className = 'text-amber-400 font-mono font-black text-2xl';
      timerBar.className = 'h-full bg-amber-500 transition-all duration-200';
    } else {
      if (timerText) timerText.className = 'text-emerald-400 font-mono font-black text-2xl';
      timerBar.className = 'h-full bg-emerald-500 transition-all duration-200';
    }
  }
}

function renderQuestion() {
  if (window.arenaSession.qIndex >= window.arenaSession.levelQuestions.length) {
    finishLevel(true);
    return;
  }

  const q = window.arenaSession.levelQuestions[window.arenaSession.qIndex];
  const progText = document.getElementById('arena-progress-text');
  const streakBadge = document.getElementById('arena-streak-badge');

  if (progText) progText.innerText = `Q ${window.arenaSession.qIndex + 1} / 10`;
  if (streakBadge) streakBadge.innerText = `🔥 Streak: ${window.arenaSession.streak}`;

  const mathBox = document.getElementById('arena-math-interface');
  const engBox = document.getElementById('arena-english-interface');
  const input = document.getElementById('arena-math-input');

  if (window.arenaSession.gameId === 'english') {
    if (mathBox) mathBox.classList.add('hidden');
    if (engBox) engBox.classList.remove('hidden');

    const engQ = document.getElementById('arena-english-question');
    if (engQ) engQ.innerText = q.q;

    const optBox = document.getElementById('arena-english-options');
    if (optBox) {
      optBox.innerHTML = '';
      q.o.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full py-3 px-4 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-sm hover:border-amber-400 active:scale-95 transition text-left flex justify-between';
        btn.innerHTML = `<span>${opt}</span><span class="text-xs text-slate-500">Tap</span>`;
        btn.onclick = () => submitAnswer(idx === q.a);
        optBox.appendChild(btn);
      });
    }
  } else {
    if (engBox) engBox.classList.add('hidden');
    if (mathBox) mathBox.classList.remove('hidden');

    const mathQ = document.getElementById('arena-math-question');
    if (mathQ) mathQ.innerText = q.display;

    if (input) {
      input.value = '';
      input.oninput = null;
      input.onkeydown = null;
      setTimeout(() => input.focus(), 30);

      input.oninput = (e) => {
        if (e.target.value.trim() === q.answer) {
          submitAnswer(true);
        }
      };
      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          submitAnswer(input.value.trim() === q.answer);
        }
      };
    }
  }
}

function setupScrollWheel() {
  const input = document.getElementById('arena-math-input');
  if (!input) return;

  input.onwheel = (e) => {
    e.preventDefault();
    if (window.arenaSession.isLocked || window.arenaSession.gameId === 'english') return;

    let currentVal = parseInt(input.value || '0', 10);
    if (isNaN(currentVal)) currentVal = 0;

    const step = e.shiftKey ? 10 : (e.deltaY < 0 ? 1 : -1);
    currentVal = Math.max(0, currentVal + (e.deltaY < 0 ? Math.abs(step) : -Math.abs(step)));
    input.value = currentVal;

    const currentQ = window.arenaSession.levelQuestions[window.arenaSession.qIndex];
    if (currentQ && String(currentVal) === currentQ.answer) {
      submitAnswer(true);
    }
  };
}

function submitAnswer(isCorrect) {
  if (window.arenaSession.isLocked) return;
  window.arenaSession.isLocked = true;

  const fb = document.getElementById('arena-feedback-indicator');
  const input = document.getElementById('arena-math-input');

  if (isCorrect) {
    window.arenaSession.correct++;
    window.arenaSession.streak++;
    if (window.arenaSession.streak > window.arenaSession.bestStreak) {
      window.arenaSession.bestStreak = window.arenaSession.streak;
    }
    if (fb) {
      fb.innerText = '🎯 Perfect! Fast Hit.';
      fb.className = 'h-6 text-xs font-bold text-emerald-400 opacity-100 transition-opacity';
    }
    if (input) input.classList.add('border-emerald-500', 'bg-emerald-500/10');
  } else {
    window.arenaSession.wrong++;
    window.arenaSession.streak = 0;
    if (fb) {
      fb.innerText = '❌ Missed! Time is ticking!';
      fb.className = 'h-6 text-xs font-bold text-rose-400 opacity-100 transition-opacity';
    }
    if (input) input.classList.add('border-rose-500', 'bg-rose-500/10');
  }

  setTimeout(() => {
    if (input) input.classList.remove('border-emerald-500', 'border-rose-500', 'bg-emerald-500/10', 'bg-rose-500/10');
    if (fb) fb.className = 'h-6 text-xs font-bold opacity-0 transition-opacity';
    window.arenaSession.qIndex++;
    window.arenaSession.isLocked = false;
    renderQuestion();
  }, isCorrect ? 200 : 500);
}

function finishLevel(completedQuestions) {
  stopTimer();
  const arenaScreen = document.getElementById('iq-arena-screen');
  const scorecardScreen = document.getElementById('iq-scorecard-screen');

  if (arenaScreen) arenaScreen.classList.add('hidden');
  if (scorecardScreen) scorecardScreen.classList.remove('hidden');

  const rule = LEVEL_RULES[window.arenaSession.currentLevelIdx];
  const isPassed = completedQuestions && window.arenaSession.correct >= rule.passScore;
  const isFinalLevel = window.arenaSession.currentLevelIdx === LEVEL_RULES.length - 1;

  const titleEl = document.getElementById('score-game-name');
  if (titleEl) titleEl.innerText = `${window.arenaSession.gameTitle} • Level ${rule.level}`;

  const attEl = document.getElementById('score-attempted');
  if (attEl) attEl.innerText = `${window.arenaSession.correct + window.arenaSession.wrong} / 10`;

  const corrEl = document.getElementById('score-correct');
  if (corrEl) corrEl.innerText = window.arenaSession.correct;

  const wrgEl = document.getElementById('score-wrong');
  if (wrgEl) wrgEl.innerText = window.arenaSession.wrong;

  const acc = (window.arenaSession.correct / 10) * 100;
  const accEl = document.getElementById('score-accuracy');
  if (accEl) accEl.innerText = `${acc.toFixed(0)}%`;

  const timeUsed = rule.timeLimit - window.arenaSession.timerSeconds;
  const totalAttempted = Math.max(1, window.arenaSession.correct + window.arenaSession.wrong);
  const spdEl = document.getElementById('score-speed');
  if (spdEl) spdEl.innerText = `${(timeUsed / totalAttempted).toFixed(1)}s / Q`;

  const strkEl = document.getElementById('score-streak');
  if (strkEl) strkEl.innerText = `${window.arenaSession.bestStreak} Hit Streak`;

  const badge = document.getElementById('score-rank-badge');
  const actionsContainer = document.getElementById('scorecard-dynamic-actions');

  if (!actionsContainer) return;

  if (isPassed) {
    if (isFinalLevel) {
      if (badge) {
        badge.innerText = '👑 CANDY-CRUSH APEX MASTER: ALL 5 LEVELS CONQUERED!';
        badge.className = 'inline-block px-4 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs shadow-lg animate-bounce';
      }
      actionsContainer.innerHTML = `
        <button onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, 4)" class="flex-1 py-3 px-4 rounded-xl luxury-action-btn text-black font-black text-xs transition">
          Replay Boss Level 5 🔁
        </button>
        <button onclick="window.returnToIQHub()" class="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition">
          ← All 6 Game Cards
        </button>
      `;
    } else {
      if (badge) {
        badge.innerText = `🎉 LEVEL ${rule.level} CLEARED! UNLOCKED LEVEL ${rule.level + 1}`;
        badge.className = 'inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black';
      }
      actionsContainer.innerHTML = `
        <button onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, ${window.arenaSession.currentLevelIdx + 1})" class="flex-1 py-3 px-4 rounded-xl luxury-action-btn text-black font-black text-xs transition shadow-lg">
          Advance to Level ${rule.level + 1} ➔
        </button>
        <button onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, ${window.arenaSession.currentLevelIdx})" class="py-3 px-4 rounded-xl bg-white/10 text-amber-300 font-bold text-xs transition">
          Replay Level ${rule.level}
        </button>
        <button onclick="window.returnToIQHub()" class="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition">
          Cards Hub
        </button>
      `;
    }
  } else {
    if (badge) {
      badge.innerText = `💀 FAILED (Required: ${rule.passScore}/10 Correct). RETRY WITH RAGE!`;
      badge.className = 'inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-black animate-pulse';
    }
    actionsContainer.innerHTML = `
      <button onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, ${window.arenaSession.currentLevelIdx})" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:brightness-110 text-white font-black text-xs transition shadow-lg">
        Retry Level ${rule.level} 🔁
      </button>
      <button onclick="window.returnToIQHub()" class="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition">
        ← All 6 Game Cards
      </button>
    `;
  }
}
