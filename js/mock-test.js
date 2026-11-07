/**
 * ExamResizer Pro - Institutional CBT Examination Simulator & Assessment Engine
 * Module: js/mock-test.js
 * Architecture: Standard TCS iON Simulation Protocol, Client-Side Timer, Palette Matrix & Sequential Paper Progression
 */

const CBTSimulator = {
  currentStage: 'GATEKEEPER', // GATEKEEPER | IN_EXAM | EVALUATION
  activePaperLevel: 1,
  totalTimeSeconds: 3600, // 60 Minutes standard session
  timerInterval: null,
  currentQuestionIndex: 0,
  candidateAnswers: {}, // { qIndex: selectedOptionIndex }
  questionStatus: {}, // { qIndex: 'NOT_VISITED' | 'NOT_ANSWERED' | 'ANSWERED' | 'MARKED_FOR_REVIEW' | 'ANSWERED_MARKED' }

  // Question Repository (Level 1: General Studies & Core Reasoning)
  questionBank: [
    {
      id: "CGL_2026_Q01",
      section: "General Intelligence & Reasoning",
      bilingual: {
        en: "Select the related word from the given alternatives: Current : Ampere :: Potential Difference : ?",
        te: "క్రింది ప్రత్యామ్నాయాల నుండి సరైన పదాన్ని ఎంచుకోండి: విద్యుత్ ప్రవాహం : ఆంపియర్ :: విద్యుత్ పొటెన్షియల్ తేడా (వోల్టేజ్) : ?"
      },
      options: ["Watt (వాట్)", "Volt (వోల్ట్)", "Ohm (ఓమ్)", "Joule (జౌల్)"],
      correct: 1,
      explanation: "Ampere is the SI unit of electric current. Similarly, Volt is the SI unit of Potential Difference (Voltage)."
    },
    {
      id: "CGL_2026_Q02",
      section: "General Awareness & Science",
      bilingual: {
        en: "Under which Article of the Constitution of India is the Finance Commission constituted?",
        te: "భారత రాజ్యాంగంలోని ఏ ఆర్టికల్ ప్రకారం ఆర్థిక సంఘం (Finance Commission) ఏర్పాటు చేయబడుతుంది?"
      },
      options: ["Article 280", "Article 324", "Article 352", "Article 112"],
      correct: 0,
      explanation: "Article 280 of the Indian Constitution empowers the President of India to constitute a Finance Commission every fifth year."
    },
    {
      id: "CGL_2026_Q03",
      section: "Quantitative Aptitude",
      bilingual: {
        en: "If x + (1/x) = 4, then find the numerical value of x² + (1/x²):",
        te: "x + (1/x) = 4 అయితే, x² + (1/x²) విలువను కనుగొనండి:"
      },
      options: ["16", "14", "18", "12"],
      correct: 1,
      explanation: "Formula: If x + (1/x) = k, then x² + (1/x²) = k² - 2. Here, 4² - 2 = 16 - 2 = 14."
    },
    {
      id: "CGL_2026_Q04",
      section: "English Language & Comprehension",
      bilingual: {
        en: "Select the most appropriate synonym of the given word: 'METICULOUS'",
        te: "'METICULOUS' పదానికి అత్యంత సరైన సమానార్థక పదాన్ని (Synonym) ఎంచుకోండి:"
      },
      options: ["Careless", "Painstaking", "Hasty", "Ignorant"],
      correct: 1,
      explanation: "Meticulous means showing great attention to detail; very careful and precise. Painstaking is the exact synonym."
    },
    {
      id: "CGL_2026_Q05",
      section: "General Intelligence & Reasoning",
      bilingual: {
        en: "Which number replaces the question mark in the sequence: 7, 14, 28, 56, ?",
        te: "క్రింది శ్రేణిలో ప్రశ్నార్థకం స్థానంలో వచ్చే సరైన సంఖ్యను గుర్తించండి: 7, 14, 28, 56, ?"
      },
      options: ["102", "112", "118", "124"],
      correct: 1,
      explanation: "The series follows a simple geometric doubling progression: 7×2=14, 14×2=28, 28×2=56, 56×2=112."
    }
  ],

  init() {
    this.loadProgressionState();
    this.renderGatekeeper();
  },

  loadProgressionState() {
    const savedLevel = localStorage.getItem('ER_CBT_ACTIVE_LEVEL');
    if (savedLevel) {
      this.activePaperLevel = parseInt(savedLevel, 10);
    }
  },

  renderGatekeeper() {
    const zone = document.getElementById('mock-zone');
    if (!zone) return;

    zone.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-blue-500/30 space-y-6" id="cbt-main-card">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-heading font-bold text-xl text-white flex items-center">
              <i data-lucide="shield-check" class="w-5 h-5 text-blue-400 mr-2"></i>
              Official Institutional CBT Terminal
            </h2>
            <p class="text-xs text-slate-400">Level ${this.activePaperLevel}: National Standard Objective Assessment</p>
          </div>
          <span class="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">TCS iON Simulation</span>
        </div>

        <!-- Examination Protocol & Instructions -->
        <div class="bg-black/40 p-5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-3 leading-relaxed">
          <h4 class="font-bold text-white uppercase tracking-wider">Candidate Instructions & Guidelines:</h4>
          <ul class="list-disc ml-5 space-y-1.5 text-slate-400">
            <li>Session duration: <strong>60 Minutes</strong>. System clock auto-terminates the test upon completion.</li>
            <li>Grading metric: <span class="text-emerald-400 font-semibold">+2.00 marks</span> for valid selection, <span class="text-rose-400 font-semibold">-0.50 marks</span> for incorrect attempts.</li>
            <li>Minimum qualification threshold to unlock subsequent Paper: <strong>60% Cumulative Score</strong>.</li>
            <li>Questions attempted successfully are added to your authenticated index and will not re-occur in subsequent levels.</li>
          </ul>
        </div>

        <!-- Mandatory Declaration & Policy Checkbox -->
        <div class="p-4 rounded-xl bg-white/[0.03] border border-amber-500/30 flex items-start space-x-3">
          <input type="checkbox" id="policyAgreementCheckbox" onchange="CBTSimulator.toggleGate(event)" class="mt-1 w-4 h-4 rounded accent-gold-500 cursor-pointer">
          <label for="policyAgreementCheckbox" class="text-xs text-slate-300 cursor-pointer select-none">
            I have read, understood, and agree to adhere to all official examination instructions, evaluation procedures, and institutional privacy protocols. I affirm that my system is operational and that I will observe strict assessment integrity.
          </label>
        </div>

        <div class="flex justify-end">
          <button id="startExamBtn" onclick="CBTSimulator.startExamination()" disabled class="px-6 py-3 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center space-x-2">
            <i data-lucide="play" class="w-4 h-4"></i>
            <span>I AM READY TO BEGIN</span>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  toggleGate(e) {
    const btn = document.getElementById('startExamBtn');
    if (!btn) return;
    if (e.target.checked) {
      btn.disabled = false;
      btn.className = 'px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-black font-extrabold text-xs cursor-pointer shadow-lg hover:brightness-110 transition flex items-center space-x-2';
    } else {
      btn.disabled = true;
      btn.className = 'px-6 py-3 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center space-x-2';
    }
  },

  startExamination() {
    this.currentStage = 'IN_EXAM';
    this.currentQuestionIndex = 0;
    this.candidateAnswers = {};
    
    // Initialize Status Palette
    this.questionBank.forEach((_, idx) => {
      this.questionStatus[idx] = idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
    });

    this.renderActiveTerminal();
    this.startTimer();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.totalTimeSeconds--;
      this.updateTimerDisplay();
      if (this.totalTimeSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.submitExamination(true);
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const timerEl = document.getElementById('cbt-live-timer');
    if (!timerEl) return;
    const mins = Math.floor(this.totalTimeSeconds / 60);
    const secs = this.totalTimeSeconds % 60;
    timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  renderActiveTerminal() {
    const zone = document.getElementById('mock-zone');
    if (!zone) return;

    zone.innerHTML = `
      <div class="glass-card rounded-2xl p-4 md:p-6 border border-white/10 space-y-4">
        <!-- Terminal Master Header Bar -->
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 class="font-heading font-bold text-white text-sm md:text-base">Level ${this.activePaperLevel}: SSC CGL / All-India Master Simulator</h3>
            <span class="text-[11px] text-slate-400">Official Marking: +2.00 / -0.50</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="px-3 py-1.5 rounded-lg bg-black/50 border border-gold-500/40 text-gold-400 text-xs font-mono font-bold flex items-center space-x-1.5">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i>
              <span id="cbt-live-timer">59:59</span>
            </div>
            <button onclick="CBTSimulator.submitExamination(false)" class="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition">
              Submit Test
            </button>
          </div>
        </div>

        <!-- Terminal Workspace Split Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- Question Pane (75% Screen) -->
          <div class="lg:col-span-3 space-y-4" id="cbt-question-pane">
            <!-- Dynamically rendered question -->
          </div>

          <!-- Status & Question Palette Dock (25% Screen) -->
          <div class="lg:col-span-1 space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-4">
            <div>
              <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-2">Question Palette</h4>
              <div class="grid grid-cols-5 gap-1.5" id="cbt-palette-grid">
                <!-- Dynamically rendered palette buttons -->
              </div>
            </div>

            <!-- Legend Matrix -->
            <div class="text-[10px] space-y-1.5 text-slate-400 pt-3 border-t border-white/10">
              <div class="flex items-center space-x-2">
                <span class="w-3.5 h-3.5 rounded bg-emerald-500 inline-block"></span>
                <span>Answered</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-3.5 h-3.5 rounded bg-rose-500 inline-block"></span>
                <span>Not Answered</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-3.5 h-3.5 rounded bg-purple-500 inline-block"></span>
                <span>Marked for Review</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-3.5 h-3.5 rounded bg-slate-700 inline-block"></span>
                <span>Not Visited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderCurrentQuestion();
    this.renderPalette();
    if (window.lucide) lucide.createIcons();
  },

  renderCurrentQuestion() {
    const pane = document.getElementById('cbt-question-pane');
    if (!pane) return;

    const q = this.questionBank[this.currentQuestionIndex];
    const isSelected = this.candidateAnswers[this.currentQuestionIndex];

    pane.innerHTML = `
      <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
        <div class="flex items-center justify-between border-b border-white/5 pb-2">
          <span class="text-xs font-bold text-gold-400 uppercase tracking-wider">Question No. ${this.currentQuestionIndex + 1}</span>
          <span class="text-[10px] text-slate-400 uppercase font-semibold">${q.section}</span>
        </div>

        <!-- Bilingual Content Container -->
        <div class="space-y-2 text-xs md:text-sm text-slate-200 leading-relaxed">
          <p class="font-medium">${q.bilingual.en}</p>
          <p class="text-slate-400 italic">${q.bilingual.te}</p>
        </div>

        <!-- Options Container -->
        <div class="space-y-2 pt-2">
          ${q.options.map((opt, oIdx) => `
            <label class="flex items-center space-x-3 p-3 rounded-xl border ${isSelected === oIdx ? 'border-gold-500 bg-gold-500/10 text-white font-semibold' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/[0.08]'} cursor-pointer transition text-xs">
              <input type="radio" name="cbtOption" value="${oIdx}" ${isSelected === oIdx ? 'checked' : ''} onchange="CBTSimulator.recordOption(${oIdx})" class="w-4 h-4 accent-gold-500">
              <span>(${String.fromCharCode(65 + oIdx)})${opt}</span>
            </label>
          `).join('')}
        </div>

        <!-- Bottom Action Dock -->
        <div class="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <div class="flex space-x-2">
            <button onclick="CBTSimulator.markForReview()" class="px-3.5 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-500/30 transition">
              Mark for Review
            </button>
            <button onclick="CBTSimulator.clearResponse()" class="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition">
              Clear Response
            </button>
          </div>
          <button onclick="CBTSimulator.saveAndNext()" class="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold transition">
            Save & Next
          </button>
        </div>
      </div>
    `;
  },

  renderPalette() {
    const grid = document.getElementById('cbt-palette-grid');
    if (!grid) return;

    grid.innerHTML = this.questionBank.map((_, idx) => {
      const st = this.questionStatus[idx];
      let bg = 'bg-slate-700 text-slate-300';
      if (st === 'ANSWERED') bg = 'bg-emerald-500 text-black font-bold';
      else if (st === 'NOT_ANSWERED') bg = 'bg-rose-500 text-white font-bold';
      else if (st === 'MARKED_FOR_REVIEW') bg = 'bg-purple-500 text-white font-bold';

      const isCurrent = idx === this.currentQuestionIndex ? 'ring-2 ring-gold-400 scale-105' : '';
      return `
        <button onclick="CBTSimulator.jumpToQuestion(${idx})" class="w-full aspect-square rounded-lg text-xs transition flex items-center justify-center ${bg} ${isCurrent}">
          ${idx + 1}
        </button>
      `;
    }).join('');
  },

  recordOption(optionIndex) {
    this.candidateAnswers[this.currentQuestionIndex] = optionIndex;
  },

  saveAndNext() {
    if (this.candidateAnswers[this.currentQuestionIndex] !== undefined) {
      this.questionStatus[this.currentQuestionIndex] = 'ANSWERED';
    } else {
      this.questionStatus[this.currentQuestionIndex] = 'NOT_ANSWERED';
    }

    if (this.currentQuestionIndex < this.questionBank.length - 1) {
      this.currentQuestionIndex++;
      if (this.questionStatus[this.currentQuestionIndex] === 'NOT_VISITED') {
        this.questionStatus[this.currentQuestionIndex] = 'NOT_ANSWERED';
      }
      this.renderCurrentQuestion();
      this.renderPalette();
    } else {
      this.renderPalette();
    }
  },

  markForReview() {
    this.questionStatus[this.currentQuestionIndex] = 'MARKED_FOR_REVIEW';
    if (this.currentQuestionIndex < this.questionBank.length - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    }
    this.renderPalette();
  },

  clearResponse() {
    delete this.candidateAnswers[this.currentQuestionIndex];
    this.questionStatus[this.currentQuestionIndex] = 'NOT_ANSWERED';
    this.renderCurrentQuestion();
    this.renderPalette();
  },

  jumpToQuestion(index) {
    this.currentQuestionIndex = index;
    if (this.questionStatus[index] === 'NOT_VISITED') {
      this.questionStatus[index] = 'NOT_ANSWERED';
    }
    this.renderCurrentQuestion();
    this.renderPalette();
  },

  submitExamination(isForced) {
    clearInterval(this.timerInterval);
    if (!isForced && !confirm("Are you sure you wish to submit your examination session for official grading?")) {
      this.startTimer();
      return;
    }

    this.currentStage = 'EVALUATION';
    this.evaluateResults();
  },

  // Grading, Verification Key & Sequential Progression Logic
  evaluateResults() {
    let correctCount = 0;
    let wrongCount = 0;
    let attempted = 0;

    this.questionBank.forEach((q, idx) => {
      const candidateChoice = this.candidateAnswers[idx];
      if (candidateChoice !== undefined) {
        attempted++;
        if (candidateChoice === q.correct) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const rawScore = (correctCount * 2.0) - (wrongCount * 0.5);
    const maxScore = this.questionBank.length * 2.0;
    const percentage = Math.max(0, Math.round((rawScore / maxScore) * 100));
    const passed = percentage >= 60;

    if (passed) {
      this.activePaperLevel++;
      localStorage.setItem('ER_CBT_ACTIVE_LEVEL', this.activePaperLevel);
    }

    this.renderEvaluationReport(correctCount, wrongCount, attempted, rawScore, maxScore, percentage, passed);
  },

  renderEvaluationReport(correct, wrong, attempted, score, maxScore, percentage, passed) {
    const zone = document.getElementById('mock-zone');
    if (!zone) return;

    let bannerHeader = passed 
      ? 'Institutional Assessment Cleared: Exceptional Performance' 
      : 'Session Completed: Additional Review Recommended';
    let bannerDesc = passed 
      ? `You have satisfied the 60% standard benchmark. Sequential Progression unlocked for Paper-${this.activePaperLevel}.`
      : 'Review the verified official answer key and structural solutions below to rectify discrepancies.';

    zone.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
        <!-- Result Ribbon -->
        <div class="p-5 rounded-xl border ${passed ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10'} text-center space-y-2">
          <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${passed ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'}">
            ${passed ? 'Verified Competency Standard' : 'Evaluation Completed'}
          </span>
          <h2 class="font-heading font-extrabold text-white text-lg md:text-xl">${bannerHeader}</h2>
          <p class="text-xs text-slate-300 max-w-xl mx-auto">${bannerDesc}</p>
        </div>

        <!-- Metric Metrics Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Final Net Score</span>
            <h4 class="font-heading font-extrabold text-white text-xl mt-1">${score.toFixed(2)} / ${maxScore}</h4>
          </div>
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Accuracy Rate</span>
            <h4 class="font-heading font-extrabold text-gold-400 text-xl mt-1">${percentage}%</h4>
          </div>
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Correct Responses</span>
            <h4 class="font-heading font-extrabold text-emerald-400 text-xl mt-1">${correct}</h4>
          </div>
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Incorrect Deductions</span>
            <h4 class="font-heading font-extrabold text-rose-400 text-xl mt-1">${wrong}</h4>
          </div>
        </div>

        <!-- Progression & Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button onclick="CBTSimulator.downloadScorecard(${score}, ${percentage})" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition flex items-center justify-center space-x-2">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Download Verified Assessment Report</span>
          </button>
          
          ${passed ? `
            <button onclick="CBTSimulator.startNextLevel()" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-lg">
              <span>Initiate Paper-${this.activePaperLevel} Sequence</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          ` : `
            <button onclick="CBTSimulator.renderGatekeeper()" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition flex items-center justify-center space-x-2">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              <span>Re-Attempt Examination Session</span>
            </button>
          `}
        </div>

        <!-- Master Official Answer Key & Explanations -->
        <div class="space-y-4 pt-4 border-t border-white/10">
          <h3 class="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center">
            <i data-lucide="file-check-2" class="w-4 h-4 text-emerald-400 mr-2"></i>
            Official Regulatory Answer Key & Step-by-Step Solutions
          </h3>

          <div class="space-y-3">
            ${this.questionBank.map((q, idx) => {
              const userChoice = this.candidateAnswers[idx];
              const isCorrect = userChoice === q.correct;
              const notAttempted = userChoice === undefined;

              return `
                <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2.5 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-300">Question ${idx + 1} (${q.section})</span>${notAttempted 
                      ? '<span class="text-slate-400 font-semibold">Not Attempted (0.00)</span>' 
                      : (isCorrect 
                        ? '<span class="text-emerald-400 font-bold">Correct (+2.00)</span>' 
                        : '<span class="text-rose-400 font-bold">Incorrect (-0.50)</span>')}
                  </div>

                  <p class="text-slate-200">${q.bilingual.en}</p>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div class="p-2 rounded bg-black/40 border border-white/5">
                      <span class="text-slate-400">Candidate Choice: </span>
                      <strong class="${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                        ${notAttempted ? 'None' : `(${String.fromCharCode(65 + userChoice)}) ${q.options[userChoice]}`}
                      </strong>
                    </div>
                    <div class="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <span class="text-emerald-300 font-semibold">Official Regulatory Key: </span>
                      <strong class="text-emerald-400">(${String.fromCharCode(65 + q.correct)})${q.options[q.correct]}</strong>
                    </div>
                  </div>

                  <div class="p-2.5 rounded-lg bg-white/5 text-slate-300 text-[11px] leading-relaxed">
                    <strong class="text-gold-400">Institutional Explanation: </strong> ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  startNextLevel() {
    this.totalTimeSeconds = 3600;
    this.startExamination();
  },

  // Client-Side Canvas Assessment Scorecard Watermarking
  downloadScorecard(score, percentage) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');

    // Obsidian Luxury Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 800, 450);

    // Decorative Gold Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 410);

    // Institutional Watermark Stamp
    ctx.font = 'bold 54px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.textAlign = 'center';
    ctx.fillText('EXAMRESIZER.ME', 400, 240);

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('OFFICIAL CBT ASSESSMENT REPORT', 400, 80);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`SSC CGL National Simulator - Level ${this.activePaperLevel}`, 400, 110);

    // Score Metrics
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText(`${score.toFixed(2)} Marks`, 400, 200);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Overall Accuracy: ${percentage}%`, 400, 240);

    // Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('Authenticated at www.examresizer.me | National Educational Career Suite', 400, 390);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `ExamResizer_Scorecard_Level_${this.activePaperLevel}.png`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 500);
  }
};

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CBTSimulator.
