/**
 * ExamResizer Pro - Speed Aptitude & IQ Arena Engine 4.0
 * Architecture: Full-Page Single Game Workspace, Unlimited Levels (20 Qs/Level),
 * Progressive Timer (300s -> 120s Floor), Persistent Zero-Repeat Pool, Coins & Continue/New State
 */

const QUESTIONS_PER_LEVEL = 20;
const PASS_REQUIRED_COUNT = 10; // At least 10 out of 20 required to clear level
const STORAGE_KEY_PREFIX = 'er_iq_arena_v4_';

const LEVEL_RULES = [
  { level: 1, name: "Cadet Warmup", questions: 20, timeLimit: 300, passScore: 10 },
  { level: 2, name: "Speed Aspirant", questions: 20, timeLimit: 290, passScore: 10 },
  { level: 3, name: "Officer Sprint", questions: 20, timeLimit: 280, passScore: 10 },
  { level: 4, name: "Commander Drill", questions: 20, timeLimit: 270, passScore: 10 },
  { level: 5, name: "Apex Challenge", questions: 20, timeLimit: 260, passScore: 10 }
];

const MASTER_ENGLISH_BANK = [
  { q: '[PYQ / SSC] Synonym of "PERSPICACIOUS":', o: ['Dull-witted', 'Astute & insightful', 'Hesitant', 'Verbose'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "EPHEMERAL":', o: ['Transient', 'Fleeting', 'Perpetual', 'Momentary'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Surveillance', 'Surveilance', 'Surveillence', 'Survaillance'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "OBSEQUIOUS":', o: ['Defiant', 'Servile & sycophantic', 'Candid', 'Indifferent'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "PRODIGAL":', o: ['Extravagant', 'Lavish', 'Parsimonious', 'Generous'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Conscientious', 'Consciencious', 'Conscientous', 'Consceintious'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "RECALCITRANT":', o: ['Compliant', 'Obstinately defiant', 'Docile', 'Submissive'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "PUSILLANIMOUS":', o: ['Timid', 'Cowardly', 'Magnanimous', 'Fearful'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Mellifluous', 'Melifluous', 'Mellifluus', 'Mellifluos'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "INTRANSIGENT":', o: ['Flexible', 'Uncompromising', 'Amiable', 'Pliant'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "IGNOMINIOUS":', o: ['Disgraceful', 'Shameful', 'Glorious', 'Inglorious'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Supersede', 'Supercede', 'Superseed', 'Supersceed'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "PEJORATIVE":', o: ['Complimentary', 'Derogatory', 'Laudatory', 'Benign'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "LOQUACIOUS":', o: ['Talkative', 'Garrulous', 'Taciturn', 'Voluble'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Camaraderie', 'Camaradarie', 'Camraderie', 'Camaradery'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "ESOTERIC":', o: ['Commonplace', 'Obscure & specialized', 'Overt', 'Public'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "PERFIDIOUS":', o: ['Treacherous', 'Disloyal', 'Steadfast & loyal', 'Deceitful'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Sesquipedalian', 'Sesquipidelian', 'Sesquipedallian', 'Sesquepedalian'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "SYCOPHANT":', o: ['Critic', 'Obsequious flatterer', 'Rival', 'Stoic'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "INVETERATE":', o: ['Habitual', 'Chronic', 'Occasional / novice', 'Entrenched'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Pharaoh', 'Pharoah', 'Pharao', 'Pharraoh'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "CONTUMACIOUS":', o: ['Obedient', 'Rebellious & stubborn', 'Meek', 'Biddable'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "PELLUCID":', o: ['Limped', 'Lucid', 'Turbid & opaque', 'Transparent'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Onomatopoeia', 'Onomatopeia', 'Onomatepoeia', 'Onomatopoesia'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "VERISIMILITUDE":', o: ['Fabrication', 'Appearance of truth', 'Absurdity', 'Fallacy'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "ACRIMONIOUS":', o: ['Bitter', 'Caustic', 'Cordial & conciliatory', 'Acerbic'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Bivouac', 'Bivouack', 'Bivouaq', 'Bivoauc'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "PROPITIOUS":', o: ['Ominous', 'Auspicious & favorable', 'Sinister', 'Dire'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "INIMICAL":', o: ['Adverse', 'Hostile', 'Conducive & friendly', 'Antagonistic'], a: 2 },
  { q: '[PYQ / SSC] Choose the CORRECTLY spelt word:', o: ['Effervescent', 'Efervescent', 'Effervesent', 'Efforvescent'], a: 0 },
  { q: '[PYQ / PSC] Synonym of "IMPECUNIOUS":', o: ['Affluent', 'Penniless / destitute', 'Opulent', 'Flush'], a: 1 },
  { q: '[PYQ / Bank] Antonym of "NEFARIOUS":', o: ['Vile', 'Atrocious', 'Virtuous & honorable', 'Heinous'], a: 2 }
];

// Curated tough exam/PYQ-style simplification & quantitative problems
const TOUGH_PYQ_QUANT_BANK = [
  { display: '√(1444) + ∛(17576) - 18 = ?', answer: '46' },
  { display: '24 × 19 - 14² + 125 = ?', answer: '385' },
  { display: '18³ ÷ 36 + 27 × 14 = ?', answer: '540' },
  { display: '35% of 840 + 45% of 620 = ?', answer: '573' },
  { display: '19² + 23² - 17² = ?', answer: '601' },
  { display: '∛(32768) × 26 - 198 = ?', answer: '634' },
  { display: '42 × 18 - (15² - 85) = ?', answer: '616' },
  { display: '√(2916) + 16³ ÷ 64 - 44 = ?', answer: '74' },
  { display: '28 × 25 - 17 × 18 + 94 = ?', answer: '488' },
  { display: '75% of 1200 - 28² + 250 = ?', answer: '366' },
  { display: '14³ - 19 × 16 × 7 + 820 = ?', answer: '1436' },
  { display: '√(4096) + ∛(19683) + 15² = ?', answer: '316' },
  { display: '36 × 24 - 18 × 19 + 110 = ?', answer: '632' },
  { display: '125% of 480 + 21² - 185 = ?', answer: '856' },
  { display: '27 × 18 + ∛(13824) - 146 = ?', answer: '364' },
  { display: '31² - 29² + 18 × 15 = ?', answer: '390' },
  { display: '√(2304) × 15 - 26 × 14 = ?', answer: '356' },
  { display: '17³ - 24 × 19 × 9 + 120 = ?', answer: '929' },
  { display: '64% of 750 + 25³ ÷ 125 - 115 = ?', answer: '490' },
  { display: '29 × 17 + 16² - ∛(2197) = ?', answer: '736' },
  { display: '√(3600) + 22 × 19 - 138 = ?', answer: '340' },
  { display: '45 × 16 - ∛(15625) + 195 = ?', answer: '890' },
  { display: '26² - 24² + 38 × 12 = ?', answer: '556' },
  { display: '80% of 950 - √(1024) + 148 = ?', answer: '876' }
];

window.arenaSession = {
  gameId: 'tables',
  gameTitle: 'Tables Speed Drill (1-20)',
  currentLevelIdx: 0,
  levelNumber: 1,
  levelQuestions: [],
  qIndex: 0,
  timerSeconds: 300,
  timerInterval: null,
  correct: 0,
  wrong: 0,
  score: 0,
  coinsEarnedInLevel: 0,
  streak: 0,
  bestStreak: 0,
  isLocked: false,
  usedKeysByGame: {}
};

function getLevelRule(levelNum) {
  const safeLevel = Math.max(1, parseInt(levelNum, 10) || 1);
  // 300s on Level 1, decreases by 10s per level, floored at 120s (2 minutes)
  const timeLimit = Math.max(120, 300 - (safeLevel - 1) * 10);
  const preset = LEVEL_RULES[Math.min(safeLevel - 1, LEVEL_RULES.length - 1)];
  return {
    level: safeLevel,
    name: preset ? preset.name : (timeLimit === 120 ? `Apex Blitz Lv.${safeLevel}` : `Rank Stage Lv.${safeLevel}`),
    questions: QUESTIONS_PER_LEVEL,
    timeLimit,
    passScore: PASS_REQUIRED_COUNT
  };
}

function loadGameProgress(gameId) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${gameId}`);
    if (!raw) {
      return { highestCompletedLevel: 0, totalCoins: 0, totalScore: 0 };
    }
    const parsed = JSON.parse(raw);
    return {
      highestCompletedLevel: Math.max(0, parseInt(parsed.highestCompletedLevel, 10) || 0),
      totalCoins: Math.max(0, parseInt(parsed.totalCoins, 10) || 0),
      totalScore: Math.max(0, parseInt(parsed.totalScore, 10) || 0)
    };
  } catch (_) {
    return { highestCompletedLevel: 0, totalCoins: 0, totalScore: 0 };
  }
}

function saveGameProgress(gameId, progress) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${gameId}`, JSON.stringify(progress));
  } catch (_) {
    // Ignore storage quota errors
  }
}

function getSeenStorageKey(gameId) {
  return `${STORAGE_KEY_PREFIX}seen_qs_${gameId}`;
}

function loadSeenQuestionSet(gameId) {
  try {
    const raw = localStorage.getItem(getSeenStorageKey(gameId));
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (_) {
    return new Set();
  }
}

function saveSeenQuestionSet(gameId, seenSet) {
  try {
    localStorage.setItem(getSeenStorageKey(gameId), JSON.stringify(Array.from(seenSet)));
  } catch (_) {
    // Ignore storage quota issues
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function markUsedAndFilter(gameId, candidates, count) {
  const seenSet = loadSeenQuestionSet(gameId);

  const uniqueCandidates = [];
  const seenInBatch = new Set();
  for (const item of candidates) {
    const key = String(item.display || item.q || '').trim();
    if (!key || seenInBatch.has(key)) continue;
    seenInBatch.add(key);
    uniqueCandidates.push(item);
  }

  let unseenPool = uniqueCandidates.filter((item) => {
    const key = String(item.display || item.q || '').trim();
    return !seenSet.has(key);
  });

  if (unseenPool.length < count) {
    seenSet.clear();
    unseenPool = [...uniqueCandidates];
  }

  const picked = shuffleArray(unseenPool).slice(0, count);
  picked.forEach((item) => {
    const key = String(item.display || item.q || '').trim();
    if (key) seenSet.add(key);
  });

  saveSeenQuestionSet(gameId, seenSet);
  return picked;
}

// Tough 20-question generator with persistent zero-repeat tracking
function getLevelQuestions(gameId, levelNum) {
  const count = QUESTIONS_PER_LEVEL;
  const lvl = Math.max(1, levelNum);
  const candidates = [];

  if (gameId === 'tables') {
    const startT = Math.min(20, 11 + ((lvl - 1) % 10));
    const endT = startT + 6;
    for (let t = startT; t <= endT; t++) {
      for (let m = 6; m <= 24; m++) {
        candidates.push({
          display: `${t} × ${m} = ?`,
          answer: String(t * m)
        });
        const addTerm = 13 + ((t * 5 + m * 3 + lvl * 7) % 47);
        candidates.push({
          display: `${t} × ${m} + ${addTerm} = ?`,
          answer: String(t * m + addTerm)
        });
      }
    }
    return markUsedAndFilter(gameId, candidates, count);
  }

  if (gameId === 'squares') {
    const baseN = Math.min(55, 18 + ((lvl - 1) * 3) % 38);
    for (let n = baseN; n <= baseN + 22; n++) {
      candidates.push({
        display: `${n}² = ?`,
        answer: String(n * n)
      });
      const offset = 17 + ((n * 11 + lvl * 13) % 89);
      candidates.push({
        display: `${n}² - ${offset} = ?`,
        answer: String(n * n - offset)
      });
      candidates.push({
        display: `${n}² + ${offset} = ?`,
        answer: String(n * n + offset)
      });
    }
    return markUsedAndFilter(gameId, candidates, count);
  }

  if (gameId === 'roots') {
    const sqBase = Math.min(65, 16 + ((lvl - 1) * 3) % 45);
    for (let n = sqBase; n <= sqBase + 20; n++) {
      candidates.push({
        display: `√${n * n} = ?`,
        answer: String(n)
      });
    }
    const cbBase = Math.min(35, 11 + ((lvl - 1) * 2) % 24);
    for (let c = cbBase; c <= cbBase + 16; c++) {
      candidates.push({
        display: `∛${c * c * c} = ?`,
        answer: String(c)
      });
      const partnerSq = sqBase + ((c * 3 + lvl) % 18);
      candidates.push({
        display: `√${partnerSq * partnerSq} + ∛${c * c * c} = ?`,
        answer: String(partnerSq + c)
      });
    }
    return markUsedAndFilter(gameId, candidates, count);
  }

  if (gameId === 'cubes') {
    const cStart = Math.min(32, 11 + ((lvl - 1) * 2) % 22);
    for (let c = cStart; c <= cStart + 14; c++) {
      candidates.push({
        display: `${c}³ = ?`,
        answer: String(c * c * c)
      });
      const delta = 29 + ((c * 13 + lvl * 17) % 140);
      candidates.push({
        display: `${c}³ - ${delta} = ?`,
        answer: String(c * c * c - delta)
      });
      candidates.push({
        display: `${c}³ + ${delta} = ?`,
        answer: String(c * c * c + delta)
      });
    }
    return markUsedAndFilter(gameId, candidates, count);
  }

  if (gameId === 'bodmas') {
    TOUGH_PYQ_QUANT_BANK.forEach((item) => candidates.push(item));

    for (let idx = 0; idx < 60; idx++) {
      const a = 15 + ((lvl * 7 + idx * 5) % 26);
      const b = 9 + ((lvl * 3 + idx * 4) % 15);
      const c = 6 + ((lvl * 2 + idx * 3) % 14);
      const d = 19 + ((lvl * 11 + idx * 9) % 95);
      candidates.push({
        display: `${a} × ${b} + ${c}² - ${d} = ?`,
        answer: String(a * b + c * c - d)
      });

      const pctList = [10, 20, 25, 30, 40, 50, 75];
      const pct = pctList[(lvl + idx) % pctList.length];
      const base = (10 + ((lvl * 5 + idx * 3) % 25)) * 100;
      const rootN = 14 + ((lvl * 3 + idx * 2) % 28);
      const ansVal = Math.round((pct * base) / 100) + rootN;
      candidates.push({
        display: `${pct}% of ${base} + √${rootN * rootN} = ?`,
        answer: String(ansVal)
      });
    }
    return markUsedAndFilter(gameId, candidates, count);
  }

  if (gameId === 'english') {
    return markUsedAndFilter(gameId, MASTER_ENGLISH_BANK, count);
  }

  return markUsedAndFilter(gameId, TOUGH_PYQ_QUANT_BANK, count);
}

function updateArenaHudStats() {
  const streakBadge = document.getElementById('arena-streak-badge');
  const progText = document.getElementById('arena-progress-text');
  const totalQ = window.arenaSession.levelQuestions.length || QUESTIONS_PER_LEVEL;

  if (progText) {
    progText.innerText = `Q ${Math.min(window.arenaSession.qIndex + 1, totalQ)} / ${totalQ}`;
  }

  if (streakBadge) {
    streakBadge.innerHTML =
      `🔥 Streak: ${window.arenaSession.streak} • ⭐ Score: ${window.arenaSession.score} • 🪙 Coins: ${window.arenaSession.coinsEarnedInLevel}`;
  }
}

function showSingleGameFullPage() {
  const hubScreen = document.getElementById('iq-hub-screen');
  const scorecardScreen = document.getElementById('iq-scorecard-screen');
  const arenaScreen = document.getElementById('iq-arena-screen');
  const iqZone = document.getElementById('iq-zone');

  if (iqZone) {
    iqZone.classList.remove('hidden');
    iqZone.classList.add('block');
  }
  if (hubScreen) hubScreen.classList.add('hidden');
  if (scorecardScreen) scorecardScreen.classList.add('hidden');
  if (arenaScreen) {
    arenaScreen.classList.remove('hidden');
    arenaScreen.classList.remove('max-w-xl', 'mx-auto');
    arenaScreen.classList.add('w-full', 'max-w-none');
  }
}

window.returnToIQHub = function () {
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

window.startIQGame = function (gameId, title, levelIdx = 0, forceFreshStart = false) {
  stopTimer();

  const resolvedGameId = gameId || window.arenaSession.gameId || 'tables';
  const resolvedTitle = title || window.arenaSession.gameTitle || 'Speed Drill';
  const saved = loadGameProgress(resolvedGameId);

  let targetLevelNum = 1;
  if (forceFreshStart) {
    targetLevelNum = 1;
    window.arenaSession.usedKeysByGame[resolvedGameId] = new Set();
  } else if (typeof levelIdx === 'number' && levelIdx > 0) {
    targetLevelNum = levelIdx;
  } else if (saved.highestCompletedLevel > 0) {
    targetLevelNum = saved.highestCompletedLevel + 1;
  } else {
    targetLevelNum = 1;
  }

  const currentRule = getLevelRule(targetLevelNum);

  window.arenaSession.gameId = resolvedGameId;
  window.arenaSession.gameTitle = resolvedTitle;
  window.arenaSession.levelNumber = currentRule.level;
  window.arenaSession.currentLevelIdx = currentRule.level - 1;
  window.arenaSession.correct = 0;
  window.arenaSession.wrong = 0;
  window.arenaSession.score = 0;
  window.arenaSession.coinsEarnedInLevel = 0;
  window.arenaSession.qIndex = 0;
  window.arenaSession.streak = 0;
  window.arenaSession.bestStreak = 0;
  window.arenaSession.isLocked = false;
  window.arenaSession.timerSeconds = currentRule.timeLimit;
  window.arenaSession.levelQuestions = getLevelQuestions(resolvedGameId, currentRule.level);

  showSingleGameFullPage();

  const titleEl = document.getElementById('arena-game-title');
  if (titleEl) {
    titleEl.innerText =
      `${resolvedTitle} • Lv.${currentRule.level} (${currentRule.name}) • Pass: ${currentRule.passScore}/${currentRule.questions} • Saved Coins: ${saved.totalCoins}`;
  }

  startTimer();
  renderQuestion();
  setupScrollWheel();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const currentRule = getLevelRule(window.arenaSession.levelNumber);
  const sec = Math.max(0, window.arenaSession.timerSeconds);
  const timerText = document.getElementById('arena-timer-text');
  const timerBar = document.getElementById('arena-timer-bar');

  if (timerText) timerText.innerText = `${String(sec).padStart(2, '0')}s`;
  if (timerBar) {
    const pct = Math.min(100, Math.max(0, (sec / currentRule.timeLimit) * 100));
    timerBar.style.width = `${pct}%`;

    if (sec <= 15) {
      if (timerText) timerText.className = 'text-rose-500 font-mono font-black text-2xl animate-ping';
      timerBar.className = 'h-full bg-rose-500 transition-all duration-200';
    } else if (sec <= 45) {
      if (timerText) timerText.className = 'text-amber-400 font-mono font-black text-2xl';
      timerBar.className = 'h-full bg-amber-500 transition-all duration-200';
    } else {
      if (timerText) timerText.className = 'text-emerald-400 font-mono font-black text-2xl';
      timerBar.className = 'h-full bg-emerald-500 transition-all duration-200';
    }
  }
}

function renderQuestion() {
  const totalQ = window.arenaSession.levelQuestions.length;
  if (window.arenaSession.qIndex >= totalQ) {
    finishLevel(true);
    return;
  }

  const q = window.arenaSession.levelQuestions[window.arenaSession.qIndex];
  updateArenaHudStats();

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
        btn.type = 'button';
        btn.className =
          'w-full py-3 px-4 rounded-xl bg-black/60 border border-white/10 text-white font-bold text-sm hover:border-amber-400 active:scale-95 transition text-left flex justify-between';
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

    const step = e.shiftKey ? 10 : 1;
    currentVal =
      e.deltaY < 0
        ? currentVal + step
        : Math.max(0, currentVal - step);
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
  const currentQ = window.arenaSession.levelQuestions[window.arenaSession.qIndex];

  if (isCorrect) {
    window.arenaSession.correct++;
    window.arenaSession.streak++;
    if (window.arenaSession.streak > window.arenaSession.bestStreak) {
      window.arenaSession.bestStreak = window.arenaSession.streak;
    }

    const streakBonusCoins = window.arenaSession.streak % 5 === 0 ? 15 : 0;
    const gainedCoins = 10 + streakBonusCoins;
    window.arenaSession.coinsEarnedInLevel += gainedCoins;
    window.arenaSession.score += 10 + streakBonusCoins;

    updateArenaHudStats();

    if (fb) {
      fb.innerText =
        streakBonusCoins > 0
          ? `🎯 +${gainedCoins} Gold Coins (Streak Bonus!)`
          : `🎯 +10 Gold Coins!`;
      fb.className = 'h-6 text-xs font-bold text-emerald-400 opacity-100 transition-opacity';
    }
    if (input) input.classList.add('border-emerald-500', 'bg-emerald-500/10');
  } else {
    window.arenaSession.wrong++;
    window.arenaSession.streak = 0;
    updateArenaHudStats();

    const expectedAns = currentQ ? (currentQ.answer || (currentQ.o ? currentQ.o[currentQ.a] : '')) : '';
    if (fb) {
      fb.innerText = expectedAns ? `❌ Wrong! Ans: ${expectedAns}` : '❌ Wrong Answer!';
      fb.className = 'h-6 text-xs font-bold text-rose-400 opacity-100 transition-opacity';
    }
    if (input) input.classList.add('border-rose-500', 'bg-rose-500/10');
  }

  setTimeout(() => {
    if (input) {
      input.classList.remove('border-emerald-500', 'border-rose-500', 'bg-emerald-500/10', 'bg-rose-500/10');
    }
    if (fb) fb.className = 'h-6 text-xs font-bold opacity-0 transition-opacity';
    window.arenaSession.qIndex++;
    window.arenaSession.isLocked = false;
    renderQuestion();
  }, isCorrect ? 220 : 650);
}

function finishLevel(completedQuestions) {
  stopTimer();
  const arenaScreen = document.getElementById('iq-arena-screen');
  const scorecardScreen = document.getElementById('iq-scorecard-screen');

  if (arenaScreen) arenaScreen.classList.add('hidden');
  if (scorecardScreen) scorecardScreen.classList.remove('hidden');

  const rule = getLevelRule(window.arenaSession.levelNumber);
  const totalQ = window.arenaSession.levelQuestions.length || QUESTIONS_PER_LEVEL;
  const isPassed = completedQuestions && window.arenaSession.correct >= rule.passScore;

  const progress = loadGameProgress(window.arenaSession.gameId);
  let levelClearBonus = 0;

  if (isPassed) {
    levelClearBonus = 50;
    window.arenaSession.coinsEarnedInLevel += levelClearBonus;
    window.arenaSession.score += levelClearBonus;

    if (rule.level > progress.highestCompletedLevel) {
      progress.highestCompletedLevel = rule.level;
    }
  }

  progress.totalCoins += window.arenaSession.coinsEarnedInLevel;
  progress.totalScore += window.arenaSession.score;
  saveGameProgress(window.arenaSession.gameId, progress);

  const titleEl = document.getElementById('score-game-name');
  if (titleEl) {
    titleEl.innerText =
      `${window.arenaSession.gameTitle} • Level ${rule.level} • Score: ${window.arenaSession.score} • Coins: +${window.arenaSession.coinsEarnedInLevel} (Wallet: ${progress.totalCoins})`;
  }

  const attEl = document.getElementById('score-attempted');
  if (attEl) attEl.innerText = `${window.arenaSession.correct + window.arenaSession.wrong} / ${totalQ}`;

  const corrEl = document.getElementById('score-correct');
  if (corrEl) corrEl.innerText = window.arenaSession.correct;

  const wrgEl = document.getElementById('score-wrong');
  if (wrgEl) wrgEl.innerText = window.arenaSession.wrong;

  const acc = (window.arenaSession.correct / totalQ) * 100;
  const accEl = document.getElementById('score-accuracy');
  if (accEl) accEl.innerText = `${acc.toFixed(0)}%`;

  const timeUsed = Math.max(1, rule.timeLimit - window.arenaSession.timerSeconds);
  const totalAttempted = Math.max(1, window.arenaSession.correct + window.arenaSession.wrong);
  const spdEl = document.getElementById('score-speed');
  if (spdEl) spdEl.innerText = `${(timeUsed / totalAttempted).toFixed(1)}s / Q`;

  const strkEl = document.getElementById('score-streak');
  if (strkEl) {
    strkEl.innerText = `${window.arenaSession.bestStreak} Streak • Cleared Lv.${progress.highestCompletedLevel}`;
  }

  const badge = document.getElementById('score-rank-badge');
  const actionsContainer = document.getElementById('scorecard-dynamic-actions');

  if (!actionsContainer) return;

  if (isPassed) {
    const nextLevelNum = rule.level + 1;
    if (badge) {
      badge.innerText = `🎉 LEVEL ${rule.level} CLEARED (${window.arenaSession.correct}/${totalQ})! +${levelClearBonus} BONUS COINS • NEXT: LV.${nextLevelNum}`;
      badge.className =
        'inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black';
    }
    actionsContainer.innerHTML = `
      <button type="button" onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, ${nextLevelNum}, false)" class="flex-1 py-3 px-4 rounded-xl luxury-action-btn text-black font-black text-xs transition shadow-lg">
        Continue to Level ${nextLevelNum} ➔
      </button>
      <button type="button" onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, 1, true)" class="py-3 px-4 rounded-xl bg-white/10 text-amber-300 font-bold text-xs transition">
        Start New (Lv.1)
      </button>
      <button type="button" onclick="window.returnToIQHub()" class="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition">
        ← 6 Game Cards
      </button>
    `;
  } else {
    const resumeLevelNum = Math.max(1, progress.highestCompletedLevel + 1);
    if (badge) {
      badge.innerText = `💀 FAILED (${window.arenaSession.correct}/${totalQ}; Need ${rule.passScore}/${totalQ}). RETRY LEVEL ${rule.level}!`;
      badge.className =
        'inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-black animate-pulse';
    }
    actionsContainer.innerHTML = `
      <button type="button" onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, ${rule.level}, false)" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:brightness-110 text-white font-black text-xs transition shadow-lg">
        Retry Level ${rule.level} 🔁
      </button>
      <button type="button" onclick="window.startIQGame(window.arenaSession.gameId, window.arenaSession.gameTitle, 1, true)" class="py-3 px-4 rounded-xl bg-white/10 text-amber-300 font-bold text-xs transition">
        Start New (Lv.1 • From Lv.${resumeLevelNum} saved)
      </button>
      <button type="button" onclick="window.returnToIQHub()" class="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition">
        ← 6 Game Cards
      </button>
    `;
  }
}
