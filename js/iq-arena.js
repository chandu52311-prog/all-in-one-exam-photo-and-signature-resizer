/**
 * ExamResizer Pro - Speed Aptitude & IQ Arena Engine 2.1 (Complete 6 Games)
 * Architecture: Candy Crush Multi-Level Progression + Speed Scroll Dial + Zero-Hang Safety
 */

const LEVEL_RULES = [
  { level: 1, name: "Cadet Warmup", questions: 10, timeLimit: 60, passScore: 8 },
  { level: 2, name: "Speed Aspirant", questions: 10, timeLimit: 50, passScore: 8 },
  { level: 3, name: "Officer Sprint", questions: 10, timeLimit: 40, passScore: 9 },
  { level: 4, name: "Commander Drill", questions: 10, timeLimit: 35, passScore: 9 },
  { level: 5, name: "God Mode (Boss)", questions: 10, timeLimit: 25, passScore: 10 }
];

// Rich English Question Bank (50 Curated Exam Items)
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

let arenaSession = {
  gameId: null,
  gameTitle: '',
  currentLevelIdx: 0,
  levelQuestions: [],
  qIndex: 0,
  timerSeconds: 0,
  timerInterval: null,
  correct: 0,
  wrong: 0,
  streak: 0,
  bestStreak: 0,
  isLocked: false
};

function shufflePool(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 6 Complete Progressive Games Generator
function getLevelQuestions(gameId, levelNum) {
  const count = 10;
  const pool = [];

  // GAME 1: TABLES SPEED DRILL (1 TO 20)
  if (gameId === 'tables') {
    const tableRanges = [
      { min: 2, max: 10, mulMin: 2, mulMax: 10 },  // Lv 1
      { min: 6, max: 13, mulMin: 4, mulMax: 12 },  // Lv 2
      { min: 11, max: 16, mulMin: 6, mulMax: 14 }, // Lv 3
      { min: 14, max: 19, mulMin: 7, mulMax: 17 }, // Lv 4
      { min: 16, max: 20, mulMin: 11, mulMax: 19 } // Lv 5 Boss
    ];
    const r = tableRanges[levelNum - 1];
    while (pool.length < count) {
      const t = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
      const m = Math.floor(Math.random() * (r.mulMax - r.mulMin + 1)) + r.mulMin;
      const exp = `${t} × ${m} = ?`;
      if (!pool.some(item => item.display === exp)) {
        pool.push({ display: exp, answer: String(t * m) });
      }
    }
  }

  // GAME 2: SQUARES CHALLENGE (1 TO 50)
  else if (gameId === 'squares') {
    const ranges = [
      { min: 2, max: 15 },   // Lv 1
      { min: 16, max: 25 },  // Lv 2
      { min: 26, max: 35 },  // Lv 3
      { min: 36, max: 45 },  // Lv 4
      { min: 41, max: 50 }   // Lv 5 Boss
    ];
    const r = ranges[levelNum - 1];
    while (pool.length < count) {
      const num = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
      const exp = `${num}² = ?`;
      if (!pool.some(item => item.display === exp)) {
        pool.push({ display: exp, answer: String(num * num) });
      }
    }
  }

  // GAME 3: ROOTS EXTRACTION DRILL (SQUARE & CUBE ROOTS)
  else if (gameId === 'roots') {
    while (pool.length < count) {
      if (levelNum <= 2) {
        // Simple Squares Roots (up to 25)
        const sq = Math.floor(Math.random() * 15) + 6;
        pool.push({ display: `√${sq * sq} = ?`, answer: String(sq) });
      } else if (levelNum === 3) {
        // Tougher Square Roots (up to 50)
        const sq = Math.floor(Math.random() * 25) + 26;
        pool.push({ display: `√${sq * sq} = ?`, answer: String(sq) });
      } else if (levelNum === 4) {
        // Cube Roots (up to 15)
        const cb = Math.floor(Math.random() * 10) + 4;
        pool.push({ display: `∛${cb * cb * cb} = ?`, answer: String(cb) });
      } else {
        // Boss: Mixed High Roots (√ up to 2500, ∛ up to 30)
        if (Math.random() > 0.5) {
          const sq = Math.floor(Math.random() * 15) + 36;
          pool.push({ display: `√${sq * sq} = ?`, answer: String(sq) });
        } else {
          const cb = Math.floor(Math.random() * 14) + 16;
          pool.push({ display: `∛${cb * cb * cb} = ?`, answer: String(cb) });
        }
      }
    }
  }

  // GAME 4: CUBES POWER DRILL (1 TO 30)
  else if (gameId === 'cubes') {
    const ranges = [
      { min: 1, max: 7 },    // Lv 1
      { min: 8, max: 13 },   // Lv 2
      { min: 14, max: 19 },  // Lv 3
      { min: 20, max: 25 },  // Lv 4
      { min: 24, max: 30 }   // Lv 5 Boss
    ];
    const r = ranges[levelNum - 1];
    while (pool.length < count) {
      const c = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
      const exp = `${c}³ = ?`;
      if (!pool.some(item => item.display === exp)) {
        pool.push({ display: exp, answer: String(c * c * c) });
      }
    }
  }

  // GAME 5: FAST BODMAS & SIMPLIFICATION (Percentages Included)
  else if (gameId === 'bodmas') {
    while (pool.length < count) {
      if (levelNum === 1) {
        // Fast Addition
        const a = Math.floor(Math.random() * 45) + 15;
        const b = Math.floor(Math.random() * 45) + 15;
        pool.push({ display: `${a} + ${b} = ?`, answer: String(a + b) });
      } else if (levelNum === 2) {
        // Fast Subtraction
        const a = Math.floor(Math.random() * 60) + 40;
        const b = Math.floor(Math.random() * 35) + 10;
        pool.push({ display: `${a} - ${b} = ?`, answer: String(a - b) });
      } else if (levelNum === 3) {
        // Multiplication & Division combo
        const m1 = Math.floor(Math.random() * 12) + 4;
        const m2 = Math.floor(Math.random() * 8) + 3;
        pool.push({ display: `${m1} × ${m2} = ?`, answer: String(m1 * m2) });
      } else if (levelNum === 4) {
        // Percentage Tricks
        const base = (Math.floor(Math.random() * 7) + 2) * 100;
        const p = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
        pool.push({ display: `${p}% of ${base} = ?`, answer: String((p * base) / 100) });
      } else {
        // Boss 3-Step Rapid Simplification
        const a = Math.floor(Math.random() * 30) + 20;
        const b = Math.floor(Math.random() * 20) + 10;
        const c = Math.floor(Math.random() * 15) + 5;
        pool.push({ display: `${a} + ${b} - ${c} = ?`, answer: String(a + b - c) });
      }
    }
  }

  // GAME 6: RAPID ENGLISH VOCAB & SPELLINGS
  else if (gameId === 'english') {
    const shuffled = shufflePool(MASTER_ENGLISH_BANK);
    const startIdx = ((levelNum - 1) * 6) % (MASTER_ENGLISH_BANK.length - 10);
    return shuffled.slice(startIdx, startIdx + count);
  }

  return pool.slice(0, 10);
}

// Navigation Fix (Keeps user inside 6 cards view)
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
};

// Start Selected Game Level
window.startIQGame = function(gameId, title, levelIdx = 0) {
  arenaSession.gameId = gameId;
  arenaSession.gameTitle = title;
  arenaSession.currentLevelIdx = levelIdx;
  arenaSession.correct = 0;
  arenaSession.wrong = 0;
  arenaSession.qIndex = 0;
  arenaSession.streak = 0;
  arenaSession.isLocked = false;

  const currentRule = LEVEL_RULES[levelIdx];
  arenaSession.timerSeconds = currentRule.timeLimit;
  arenaSession.levelQuestions = getLevelQuestions(gameId, levelIdx + 1);

  document.getElementById('iq-hub-screen').classList.add('hidden');
  document.getElementById('iq-scorecard-screen').classList.add('hidden');
  document.getElementById('iq-arena-screen').classList.remove('hidden');

  document.getElementById('arena-game-title').innerText = `${title} • Lv.${currentRule.level} (${currentRule.name})`;

  startTimer();
  renderQuestion();
  setupScrollWheel();
};

function startTimer() {
  stopTimer();
  updateTimerUI();
  arenaSession.timerInterval = setInterval(() => {
    arenaSession.timerSeconds--;
    updateTimerUI();
    if (arenaSession.timerSeconds <= 0) {
      stopTimer();
      finishLevel(false);
    }
  }, 1000);
}

function stopTimer() {
  if (arenaSession.timerInterval) {
    clearInterval(arenaSession.timerInterval);
    arenaSession.timerInterval = null;
  }
}

function updateTimerUI() {
  const currentRule = LEVEL_RULES[arenaSession.currentLevelIdx];
  const sec = arenaSession.timerSeconds;
  const timerText = document.getElementById('arena-timer-text');
  const timerBar = document.getElementById('arena-timer-bar');

  timerText.innerText = `${String(sec).padStart(2, '0')}s`;
  const pct = (sec / currentRule.timeLimit) * 100;
  timerBar.style.width = `${pct}%`;

  if (sec <= 8) {
    timerText.className = 'text-rose-500 font-mono font-black text-2xl animate-ping';
    timerBar.className = 'h-full bg-rose-500 transition-all duration-200';
  } else if (sec <= 18) {
    timerText.className = 'text-amber-400 font-mono font-black text-2xl';
    timerBar.className = 'h-full bg-amber-500 transition-all duration-200';
  } else {
    timerText.className = 'text-emerald-400 font-mono font-black text-2xl';
    timerBar.className = 'h-full bg-emerald-500 transition-all duration-200';
  }
}

function renderQuestion() {
  if (arenaSession.qIndex >= arenaSession.levelQuestions.length) {
    finishLevel(true);
    return;
  }

  const q = arenaSession.levelQuestions[arenaSession.qIndex];
  document.getElementById('arena-progress-text').innerText = `Q ${arenaSession.qIndex + 1} / 10`;
  document.getElementById('arena-streak-badge').innerText = `🔥 Streak: ${arenaSession.streak}`;

  const mathBox = document.getElementById('arena-math-interface');
  const engBox = document.getElementById('arena-english-interface');
  const input = document.getElementById('arena-math-input');

  if (arenaSession.gameId === 'english') {
    mathBox.classList.add('hidden');
    engBox.classList.remove('hidden');
    document.getElementById('arena-english-question').innerText = q.q;
    const optBox = document.getElementById('arena-english-options');
    optBox.innerHTML = '';

    q.o.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full py-3 px-4 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-sm hover:border-amber-400 active:scale-95 transition text-left flex justify-between';
      btn.innerHTML = `<span>${opt}</span><span class="text-xs text-slate-500">Tap</span>`;
      btn.onclick = () => submitAnswer(idx === q.a);
      optBox.appendChild(btn);
    });
  } else {
    engBox.classList.add('hidden');
    mathBox.classList.remove('hidden');
    document.getElementById('arena-math-question').innerText = q.display;
    input.value = '';
    input.focus();

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

// Speed Scroll Wheel Spinner
function setupScrollWheel() {
  const input = document.getElementById('arena-math-input');
  if (!input) return;

  input.onwheel = (e) => {
    e.preventDefault();
    if (arenaSession.isLocked || arenaSession.gameId === 'english') return;

    let currentVal = parseInt(input.value || '0', 10);
    if (isNaN(currentVal)) currentVal = 0;

    const step = e.shiftKey ? 10 : (e.deltaY < 0 ? 1 : -1);
    currentVal = Math.max(0, currentVal + (e.deltaY < 0 ? Math.abs(step) : -Math.abs(step)));
    input.value = currentVal;

    const currentQ = arenaSession.levelQuestions[arenaSession.qIndex];
    if (currentQ && String(currentVal) === currentQ.answer) {
      submitAnswer(true);
    }
  };
}

function submitAnswer(isCorrect) {
  if (arenaSession.isLocked) return;
  arenaSession.isLocked = true;

  const fb = document.getElementById('arena-feedback-indicator');
  const input = document.getElementById('arena-math-input');

  if (isCorrect) {
    arenaSession.correct++;
    arenaSession.streak++;
    if (arenaSession.streak > arenaSession.bestStreak) arenaSession.bestStreak = arenaSession.streak;
    fb.innerText = '🎯 Perfect! Fast Hit.';
    fb.className = 'h-6 text-xs font-bold text-emerald-400 opacity-100 transition-opacity';
    if (input) input.classList.add('border-emerald-500', 'bg-emerald-500/10');
  } else {
    arenaSession.wrong++;
    arenaSession.streak = 0;
    fb.innerText = '❌ Missed! Time is ticking!';
    fb.className = 'h-6 text-xs font-bold text-rose-400 opacity-100 transition-opacity';
    if (input) input.classList.add('border-rose-500', 'bg-rose-500/10');
  }

  setTimeout(() => {
    if (input) input.classList.remove('border-emerald-500', 'border-rose-500', 'bg-emerald-500/10', 'bg-rose-500/10');
    fb.className = 'h-6 text-xs font-bold opacity-0 transition-opacity';
    arenaSession.qIndex++;
    arenaSession.isLocked = false;
    renderQuestion();
  }, isCorrect ? 200 : 500);
}

function finishLevel(completedQuestions) {
  stopTimer();
  document.getElementById('iq-arena-screen').classList.add('hidden');
  document.getElementById('iq-scorecard-screen').classList.remove('hidden');

  const rule = LEVEL_RULES[arenaSession.currentLevelIdx];
  const isPassed = completedQuestions && arenaSession.correct >= rule.passScore;
  const isFinalLevel = arenaSession.currentLevelIdx === LEVEL_RULES.length - 1;

  document.getElementById('score-game-name').innerText = `${arenaSession.gameTitle} • Level ${rule.level}`;
  document.getElementById('score-attempted').innerText = `${arenaSession.correct + arenaSession.wrong} / 10`;
  document.getElementById('score-correct').innerText = arenaSession.correct;
  document.getElementById('score-wrong').innerText = arenaSession.wrong;

  const acc = (arenaSession.correct / 10) * 100;
  document.getElementById('score-accuracy').innerText = `${acc.toFixed(0)}%`;
  document.getElementById('score-speed').innerText = `${((rule.timeLimit - arenaSession.timerSeconds) / Math.max(1, arenaSession.correct + arenaSession.wrong)).toFixed(1)}s / Q`;
  document.getElementById('score-streak').innerText = `${arenaSession.bestStreak} Hit Streak`;

  const badge = document.getElementById('score-rank-badge');
  const actionBtn = document.getElementById('score-next-level-btn');

  if (isPassed) {
    if (isFinalLevel) {
      badge.innerText = '👑 CANDY-CRUSH APEX MASTER: ALL LEVELS CONQUERED!';
      badge.className = 'inline-block px-4 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs shadow-lg animate-bounce';
      actionBtn.innerText = 'Replay Boss Level 5';
      actionBtn.onclick = () => window.startIQGame(arenaSession.gameId, arenaSession.gameTitle, 4);
    } else {
      badge.innerText = `🎉 LEVEL ${rule.level} CLEARED! UNLOCKED LEVEL ${rule.level + 1}`;
      badge.className = 'inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black';
      actionBtn.innerText = `Advance to Level ${rule.level + 1} ➔`;
      actionBtn.onclick = () => window.startIQGame(arenaSession.gameId, arenaSession.gameTitle, arenaSession.currentLevelIdx + 1);
    }
  } else {
    badge.innerText = `💀 FAILED (Required: ${rule.passScore}/10 Correct). RETRY WITH RAGE!`;
    badge.className = 'inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-black animate-pulse';
    actionBtn.innerText = `Retry Level ${rule.level} 🔁`;
    actionBtn.onclick = () => window.startIQGame(arenaSession.gameId, arenaSession.gameTitle, arenaSession.currentLevelIdx);
  }
}
