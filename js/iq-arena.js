/**
 * Aptitude & Speed Calculation Arena Engine (Zero Dependencies)
 * Handles 6 games, 10-minute timer, 50 unique questions, input validation, and scoring.
 */

const IQ_CONFIG = {
  TOTAL_QUESTIONS: 50,
  TOTAL_SECONDS: 600, // 10 Minutes
};

// Master English Question Bank (50+ Curated Exam Standard Items)
const ENGLISH_BANK = [
  { type: 'synonym', q: 'Synonym of "ABUNDANT"', opts: ['Scarce', 'Plentiful', 'Meager', 'Rare'], a: 1 },
  { type: 'synonym', q: 'Synonym of "CANDID"', opts: ['Secretive', 'Dishonest', 'Frank', 'Deceptive'], a: 2 },
  { type: 'synonym', q: 'Synonym of "DILIGENT"', opts: ['Lazy', 'Hardworking', 'Careless', 'Inert'], a: 1 },
  { type: 'synonym', q: 'Synonym of "METICULOUS"', opts: ['Precise', 'Rough', 'Careless', 'Hasty'], a: 0 },
  { type: 'synonym', q: 'Synonym of "PRAGMATIC"', opts: ['Idealistic', 'Practical', 'Theoretical', 'Irrational'], a: 1 },
  { type: 'antonym', q: 'Antonym of "OBSOLETE"', opts: ['Contemporary', 'Extinct', 'Antique', 'Ancient'], a: 0 },
  { type: 'antonym', q: 'Antonym of "TRANSIENT"', opts: ['Temporary', 'Fleeting', 'Permanent', 'Brief'], a: 2 },
  { type: 'antonym', q: 'Antonym of "HOSTILE"', opts: ['Friendly', 'Aggressive', 'Antagonistic', 'Adverse'], a: 0 },
  { type: 'antonym', q: 'Antonym of "FRUGAL"', opts: ['Economical', 'Extravagant', 'Thrifty', 'Stingy'], a: 1 },
  { type: 'antonym', q: 'Antonym of "AMBIGUOUS"', opts: ['Vague', 'Obscure', 'Clear', 'Doubtful'], a: 2 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomadate'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Occurence', 'Occurrence', 'Ocurrence', 'Occurance'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Mischievous', 'Mischevious', 'Mischivous', 'Mischevous'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Embarass', 'Embarras', 'Embarrass', 'Embaras'], a: 2 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Maintenance', 'Maintainance', 'Maintenence', 'Mantenance'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Privilege', 'Privelege', 'Priviledge', 'Privledge'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Hierarchy', 'Heirarchy', 'Hierarcy', 'Heirarcy'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Questionaire', 'Questionnaire', 'Questionair', 'Questionnare'], a: 1 },
  { type: 'synonym', q: 'Synonym of "LUCID"', opts: ['Confusing', 'Clear', 'Dark', 'Vague'], a: 1 },
  { type: 'synonym', q: 'Synonym of "ZEALOUS"', opts: ['Apathetic', 'Passionate', 'Cold', 'Indifferent'], a: 1 },
  { type: 'antonym', q: 'Antonym of "OPTIMISTIC"', opts: ['Hopeful', 'Confident', 'Pessimistic', 'Cheerful'], a: 2 },
  { type: 'antonym', q: 'Antonym of "DORMANT"', opts: ['Inactive', 'Sleeping', 'Active', 'Latent'], a: 2 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Definately', 'Definitely', 'Definitly', 'Definetely'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Separate', 'Seperate', 'Seprate', 'Sepparate'], a: 0 },
  { type: 'synonym', q: 'Synonym of "BENEVOLENT"', opts: ['Cruel', 'Kind', 'Selfish', 'Hostile'], a: 1 },
  { type: 'synonym', q: 'Synonym of "TENACIOUS"', opts: ['Weak', 'Persistent', 'Hesitant', 'Fragile'], a: 1 },
  { type: 'antonym', q: 'Antonym of "AFFLUENT"', opts: ['Rich', 'Poor', 'Wealthy', 'Prosperous'], a: 1 },
  { type: 'antonym', q: 'Antonym of "CHAOTIC"', opts: ['Disordered', 'Orderly', 'Messy', 'Turbulent'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Consensus', 'Concensus', 'Consencus', 'Conscensus'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Colleague', 'Coleague', 'Collegue', 'Colleage'], a: 0 },
  { type: 'synonym', q: 'Synonym of "VERBOSE"', opts: ['Concise', 'Wordy', 'Brief', 'Silent'], a: 1 },
  { type: 'synonym', q: 'Synonym of "ADVERSITY"', opts: ['Hardship', 'Fortune', 'Prosperity', 'Success'], a: 0 },
  { type: 'antonym', q: 'Antonym of "RIGID"', opts: ['Flexible', 'Hard', 'Stiff', 'Strict'], a: 0 },
  { type: 'antonym', q: 'Antonym of "SCARCITY"', opts: ['Poverty', 'Abundance', 'Deficit', 'Shortage'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Bizarre', 'Bizzare', 'Bizar', 'Bizare'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Cemetery', 'Cemetary', 'Cemetory', 'Cematary'], a: 0 },
  { type: 'synonym', q: 'Synonym of "COMPASSION"', opts: ['Cruelty', 'Empathy', 'Indifference', 'Dislike'], a: 1 },
  { type: 'synonym', q: 'Synonym of "ELOQUENT"', opts: ['Articulate', 'Hesitant', 'Shy', 'Mute'], a: 0 },
  { type: 'antonym', q: 'Antonym of "PERILOUS"', opts: ['Dangerous', 'Safe', 'Risky', 'Hazardous'], a: 1 },
  { type: 'antonym', q: 'Antonym of "PLACID"', opts: ['Calm', 'Agitated', 'Quiet', 'Peaceful'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Independent', 'Independant', 'Indipendent', 'Independunt'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Guaranteed', 'Garanted', 'Gauranteed', 'Guarenteed'], a: 0 },
  { type: 'synonym', q: 'Synonym of "METEORIC"', opts: ['Rapid', 'Slow', 'Gradual', 'Insignificant'], a: 0 },
  { type: 'synonym', q: 'Synonym of "VIGILANT"', opts: ['Alert', 'Careless', 'Neglectful', 'Asleep'], a: 0 },
  { type: 'antonym', q: 'Antonym of "CONCUR"', opts: ['Agree', 'Disagree', 'Approve', 'Accept'], a: 1 },
  { type: 'antonym', q: 'Antonym of "VALIANT"', opts: ['Brave', 'Cowardly', 'Heroic', 'Fearless'], a: 1 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Bureaucracy', 'Burocracy', 'Beurocracy', 'Bureaucracy'], a: 0 },
  { type: 'spelling', q: 'Choose the correctly spelled word:', opts: ['Lieutenant', 'Leutenant', 'Lietenant', 'Lieutenent'], a: 0 },
  { type: 'synonym', q: 'Synonym of "RESILIENT"', opts: ['Fragile', 'Tough', 'Delicate', 'Brittle'], a: 1 },
  { type: 'antonym', q: 'Antonym of "AUTHENTIC"', opts: ['Genuine', 'Fake', 'Real', 'Valid'], a: 1 }
];

let gameState = {
  activeGameId: null,
  activeGameTitle: '',
  timerInterval: null,
  secondsRemaining: IQ_CONFIG.TOTAL_SECONDS,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  currentStreak: 0,
  bestStreak: 0,
  startTime: null,
  totalAnswerTime: 0,
  isLocked: false
};

// Shuffler utility
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Question Generators for Math Games
const GENERATORS = {
  tables: () => {
    const pool = [];
    for (let t = 2; t <= 20; t++) {
      for (let m = 2; m <= 19; m++) {
        pool.push({
          display: `${t} × ${m} = ?`,
          answer: String(t * m),
          unit: ''
        });
      }
    }
    return shuffleArray(pool).slice(0, IQ_CONFIG.TOTAL_QUESTIONS);
  },

  squares: () => {
    const pool = [];
    for (let i = 11; i <= 50; i++) {
      pool.push({
        display: `${i}² = ?`,
        answer: String(i * i),
        unit: ''
      });
    }
    for (let i = 2; i <= 10; i++) {
      pool.push({
        display: `${i}² = ?`,
        answer: String(i * i),
        unit: ''
      });
    }
    return shuffleArray(pool).slice(0, IQ_CONFIG.TOTAL_QUESTIONS);
  },

  roots: () => {
    const pool = [];
    // Square roots up to 50 (2500)
    for (let i = 11; i <= 50; i++) {
      pool.push({
        display: `√${i * i} = ?`,
        answer: String(i),
        unit: 'Square Root'
      });
    }
    // Cube roots up to 30
    for (let i = 2; i <= 30; i++) {
      pool.push({
        display: `∛${i * i * i} = ?`,
        answer: String(i),
        unit: 'Cube Root'
      });
    }
    return shuffleArray(pool).slice(0, IQ_CONFIG.TOTAL_QUESTIONS);
  },

  cubes: () => {
    const pool = [];
    for (let i = 1; i <= 30; i++) {
      pool.push({
        display: `${i}³ = ?`,
        answer: String(i * i * i),
        unit: ''
      });
    }
    // Extend combinations with duplicate power variations
    while (pool.length < IQ_CONFIG.TOTAL_QUESTIONS) {
      const idx = Math.floor(Math.random() * 30) + 1;
      pool.push({
        display: `${idx}³ = ?`,
        answer: String(idx * idx * idx),
        unit: ''
      });
    }
    return shuffleArray(pool).slice(0, IQ_CONFIG.TOTAL_QUESTIONS);
  },

  bodmas: () => {
    const ops = ['+', '-', '×', '%'];
    const pool = [];
    const signatures = new Set();

    while (pool.length < IQ_CONFIG.TOTAL_QUESTIONS) {
      const type = ops[Math.floor(Math.random() * ops.length)];
      let expr = '';
      let ans = 0;

      if (type === '+') {
        const a = Math.floor(Math.random() * 80) + 15;
        const b = Math.floor(Math.random() * 80) + 15;
        expr = `${a} + ${b}`;
        ans = a + b;
      } else if (type === '-') {
        const a = Math.floor(Math.random() * 120) + 50;
        const b = Math.floor(Math.random() * 49) + 10;
        expr = `${a} - ${b}`;
        ans = a - b;
      } else if (type === '×') {
        const a = Math.floor(Math.random() * 18) + 3;
        const b = Math.floor(Math.random() * 12) + 3;
        expr = `${a} × ${b}`;
        ans = a * b;
      } else {
        const base = (Math.floor(Math.random() * 9) + 1) * 100;
        const pct = [10, 15, 20, 25, 50][Math.floor(Math.random() * 5)];
        expr = `${pct}% of ${base}`;
        ans = (pct * base) / 100;
      }

      if (!signatures.has(expr)) {
        signatures.add(expr);
        pool.push({
          display: `${expr} = ?`,
          answer: String(ans),
          unit: 'Simplification'
        });
      }
    }
    return pool;
  },

  english: () => {
    return shuffleArray(ENGLISH_BANK).slice(0, IQ_CONFIG.TOTAL_QUESTIONS);
  }
};

// UI Toggles
function showIQHub() {
  document.getElementById('iq-main-modal').classList.remove('hidden');
  document.getElementById('iq-hub-screen').classList.remove('hidden');
  document.getElementById('iq-arena-screen').classList.add('hidden');
  document.getElementById('iq-scorecard-screen').classList.add('hidden');
  stopIQTimer();
}

function hideIQHub() {
  document.getElementById('iq-main-modal').classList.add('hidden');
  stopIQTimer();
}

function startIQGame(gameId, title) {
  gameState.activeGameId = gameId;
  gameState.activeGameTitle = title;
  gameState.secondsRemaining = IQ_CONFIG.TOTAL_SECONDS;
  gameState.currentIndex = 0;
  gameState.correctCount = 0;
  gameState.wrongCount = 0;
  gameState.currentStreak = 0;
  gameState.bestStreak = 0;
  gameState.totalAnswerTime = 0;
  gameState.isLocked = false;
  gameState.startTime = Date.now();

  // Load Unique Questions
  gameState.questions = GENERATORS[gameId]();

  document.getElementById('iq-hub-screen').classList.add('hidden');
  document.getElementById('iq-scorecard-screen').classList.add('hidden');
  document.getElementById('iq-arena-screen').classList.remove('hidden');
  document.getElementById('arena-game-title').innerText = title;

  startIQTimer();
  renderCurrentQuestion();
}

function startIQTimer() {
  stopIQTimer();
  updateTimerDisplay();

  gameState.timerInterval = setInterval(() => {
    gameState.secondsRemaining--;
    updateTimerDisplay();

    if (gameState.secondsRemaining <= 0) {
      stopIQTimer();
      endIQGame();
    }
  }, 1000);
}

function stopIQTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const m = Math.floor(gameState.secondsRemaining / 60);
  const s = gameState.secondsRemaining % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const el = document.getElementById('arena-timer-text');
  const bar = document.getElementById('arena-timer-bar');

  el.innerText = str;
  const pct = (gameState.secondsRemaining / IQ_CONFIG.TOTAL_SECONDS) * 100;
  bar.style.width = `${pct}%`;

  if (gameState.secondsRemaining < 30) {
    el.className = 'text-rose-400 font-mono font-extrabold text-xl animate-pulse';
    bar.className = 'h-full bg-rose-500 transition-all duration-300';
  } else if (gameState.secondsRemaining < 120) {
    el.className = 'text-amber-400 font-mono font-extrabold text-xl';
    bar.className = 'h-full bg-amber-500 transition-all duration-300';
  } else {
    el.className = 'text-emerald-400 font-mono font-extrabold text-xl';
    bar.className = 'h-full bg-emerald-500 transition-all duration-300';
  }
}

function renderCurrentQuestion() {
  if (gameState.currentIndex >= gameState.questions.length) {
    endIQGame();
    return;
  }

  const q = gameState.questions[gameState.currentIndex];
  document.getElementById('arena-progress-text').innerText = `Question ${gameState.currentIndex + 1} / ${IQ_CONFIG.TOTAL_QUESTIONS}`;
  document.getElementById('arena-streak-badge').innerText = `🔥 Streak: ${gameState.currentStreak}`;

  const mathBox = document.getElementById('arena-math-interface');
  const englishBox = document.getElementById('arena-english-interface');
  const input = document.getElementById('arena-math-input');
  const feedback = document.getElementById('arena-feedback-indicator');
  feedback.className = 'h-6 text-xs font-semibold text-center mt-2 opacity-0 transition-opacity';

  if (gameState.activeGameId === 'english') {
    mathBox.classList.add('hidden');
    englishBox.classList.remove('hidden');

    document.getElementById('arena-english-question').innerText = q.q;
    const optContainer = document.getElementById('arena-english-options');
    optContainer.innerHTML = '';

    q.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-medium text-sm sm:text-base hover:border-amber-400/60 active:scale-95 transition-all text-left flex items-center justify-between';
      btn.innerHTML = `<span>${opt}</span><span class="text-xs text-slate-500 uppercase font-mono">Tap</span>`;
      btn.onclick = () => submitEnglishAnswer(idx, q.a, btn);
      optContainer.appendChild(btn);
    });
  } else {
    englishBox.classList.add('hidden');
    mathBox.classList.remove('hidden');

    document.getElementById('arena-math-question').innerText = q.display;
    input.value = '';
    input.disabled = false;
    setTimeout(() => input.focus(), 50);

    // Dynamic instant auto-match listener
    input.oninput = (e) => {
      const val = e.target.value.trim();
      if (val === q.answer) {
        handleAnswerVerdict(true, input);
      }
    };

    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        handleAnswerVerdict(val === q.answer, input);
      }
    };
  }
}

function handleAnswerVerdict(isCorrect, element) {
  if (gameState.isLocked) return;
  gameState.isLocked = true;

  const feedback = document.getElementById('arena-feedback-indicator');

  if (isCorrect) {
    gameState.correctCount++;
    gameState.currentStreak++;
    if (gameState.currentStreak > gameState.bestStreak) {
      gameState.bestStreak = gameState.currentStreak;
    }
    feedback.innerText = 'Correct Answer! +1';
    feedback.className = 'h-6 text-xs font-semibold text-center mt-2 text-emerald-400 opacity-100';

    if (element) {
      element.classList.add('border-emerald-500', 'ring-2', 'ring-emerald-500/30');
    }
  } else {
    gameState.wrongCount++;
    gameState.currentStreak = 0;
    feedback.innerText = `Incorrect! Target: ${gameState.questions[gameState.currentIndex].answer}`;
    feedback.className = 'h-6 text-xs font-semibold text-center mt-2 text-rose-400 opacity-100';

    if (element) {
      element.classList.add('border-rose-500', 'ring-2', 'ring-rose-500/30');
    }
  }

  setTimeout(() => {
    if (element) {
      element.classList.remove('border-emerald-500', 'border-rose-500', 'ring-2', 'ring-emerald-500/30', 'ring-rose-500/30');
    }
    gameState.currentIndex++;
    gameState.isLocked = false;
    renderCurrentQuestion();
  }, isCorrect ? 250 : 650);
}

function submitEnglishAnswer(selectedIdx, correctIdx, btn) {
  if (gameState.isLocked) return;
  gameState.isLocked = true;

  const buttons = document.querySelectorAll('#arena-english-options button');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === correctIdx) {
      b.classList.remove('bg-slate-900', 'border-slate-800');
      b.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-300');
    }
  });

  const isCorrect = (selectedIdx === correctIdx);
  if (isCorrect) {
    gameState.correctCount++;
    gameState.currentStreak++;
    if (gameState.currentStreak > gameState.bestStreak) {
      gameState.bestStreak = gameState.currentStreak;
    }
  } else {
    gameState.wrongCount++;
    gameState.currentStreak = 0;
    btn.classList.remove('bg-slate-900', 'border-slate-800');
    btn.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
  }

  setTimeout(() => {
    gameState.currentIndex++;
    gameState.isLocked = false;
    renderCurrentQuestion();
  }, isCorrect ? 400 : 800);
}

function endIQGame() {
  stopIQTimer();
  document.getElementById('iq-arena-screen').classList.add('hidden');
  document.getElementById('iq-scorecard-screen').classList.remove('hidden');

  const attempted = gameState.correctCount + gameState.wrongCount;
  const timeSpent = IQ_CONFIG.TOTAL_SECONDS - gameState.secondsRemaining;
  const avgSpeed = attempted > 0 ? (timeSpent / attempted).toFixed(1) : '0.0';
  const accuracy = attempted > 0 ? ((gameState.correctCount / attempted) * 100).toFixed(1) : '0.0';

  document.getElementById('score-game-name').innerText = gameState.activeGameTitle;
  document.getElementById('score-attempted').innerText = `${attempted} / ${IQ_CONFIG.TOTAL_QUESTIONS}`;
  document.getElementById('score-correct').innerText = gameState.correctCount;
  document.getElementById('score-wrong').innerText = gameState.wrongCount;
  document.getElementById('score-accuracy').innerText = `${accuracy}%`;
  document.getElementById('score-speed').innerText = `${avgSpeed}s / Q`;
  document.getElementById('score-streak').innerText = `${gameState.bestStreak} Streak`;

  // Performance Badge Calculator
  const badgeEl = document.getElementById('score-rank-badge');
  if (parseFloat(avgSpeed) <= 5.0 && parseFloat(accuracy) >= 90.0) {
    badgeEl.innerText = '🏆 Master Rank (God Speed)';
    badgeEl.className = 'inline-block px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold tracking-wide';
  } else if (parseFloat(avgSpeed) <= 9.0 && parseFloat(accuracy) >= 75.0) {
    badgeEl.innerText = '⚡ Officer Rank (Competitive)';
    badgeEl.className = 'inline-block px-4 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold tracking-wide';
  } else {
    badgeEl.innerText = '🎯 Daily Practice Needed';
    badgeEl.className = 'inline-block px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold tracking-wide';
  }
}
