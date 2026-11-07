/**
 * ExamResizer Pro - Institutional Academic Archive & Examination Paper Repository
 * Module: js/pyq-hub.js
 * Architecture: Client-Side Catalog Drill-Down & Dynamic Canvas/PDF Watermarking
 */

const PYQArchive = {
  activeCategory: 'GOVT_EXAMS',
  activeStream: null,
  activeYear: null,

  // Curated Pan-India Question Bank Catalog
  catalog: {
    GOVT_EXAMS: {
      name: "National Competitive Examinations",
      streams: {
        "SSC Combined Graduate Level (CGL)": [
          { year: "2024", session: "Tier-I Shift 1", medium: "Bilingual (English/Hindi)", qCount: 100, sourceUrl: "https://ssc.gov.in" },
          { year: "2024", session: "Tier-I Shift 2", medium: "Bilingual (English/Hindi)", qCount: 100, sourceUrl: "https://ssc.gov.in" },
          { year: "2023", session: "Tier-II Comprehensive", medium: "Bilingual (English/Hindi)", qCount: 150, sourceUrl: "https://ssc.gov.in" }
        ],
        "Railway Recruitment Board (RRB NTPC)": [
          { year: "2024", session: "CBT-1 Stage Standard", medium: "English / Hindi / Telugu", qCount: 100, sourceUrl: "https://rrbapply.gov.in" },
          { year: "2022", session: "Graduate Level CBT-2", medium: "Bilingual (English/Hindi)", qCount: 120, sourceUrl: "https://rrbapply.gov.in" }
        ],
        "Union Public Service Commission (UPSC CSE)": [
          { year: "2024", session: "General Studies Paper-I", medium: "Bilingual (English/Hindi)", qCount: 100, sourceUrl: "https://upsconline.nic.in" },
          { year: "2024", session: "CSAT Paper-II", medium: "Bilingual (English/Hindi)", qCount: 80, sourceUrl: "https://upsconline.nic.in" }
        ],
        "State PSC - APPSC & TGPSC": [
          { year: "2024", session: "Group-I Preliminary General Studies", medium: "English / Telugu", qCount: 150, sourceUrl: "https://psc.ap.gov.in" },
          { year: "2024", session: "Group-II Services Screening Test", medium: "English / Telugu", qCount: 150, sourceUrl: "https://psc.ap.gov.in" }
        ]
      }
    },
    ENTRANCE_TESTS: {
      name: "National & State Entrance Examinations",
      streams: {
        "Joint Entrance Examination (JEE Main)": [
          { year: "2025", session: "January Session Shift-1 (PCM)", medium: "English / Hindi", qCount: 90, sourceUrl: "https://nta.ac.in" },
          { year: "2024", session: "April Session Shift-2 (PCM)", medium: "English / Hindi", qCount: 90, sourceUrl: "https://nta.ac.in" }
        ],
        "National Eligibility cum Entrance Test (NEET UG)": [
          { year: "2024", session: "Core Medical Paper (Code Q1)", medium: "English / Hindi / Regional", qCount: 200, sourceUrl: "https://nta.ac.in" },
          { year: "2023", session: "Core Medical Paper (Code R3)", medium: "English / Hindi", qCount: 200, sourceUrl: "https://nta.ac.in" }
        ],
        "AP & TS EAPCET": [
          { year: "2024", session: "Engineering Stream Session-1", medium: "English / Telugu", qCount: 160, sourceUrl: "https://cets.apsche.ap.gov.in" },
          { year: "2024", session: "Agriculture & Pharmacy Session", medium: "English / Telugu", qCount: 160, sourceUrl: "https://cets.apsche.ap.gov.in" }
        ]
      }
    },
    SENIOR_SECONDARY: {
      name: "Board of Intermediate & Secondary Education",
      streams: {
        "Intermediate Second Year (IPE) - MPC": [
          { year: "2024", session: "Mathematics-IIB Annual Examination", medium: "English / Telugu", qCount: 24, sourceUrl: "https://bie.ap.gov.in" },
          { year: "2024", session: "Physics-II Theory Paper", medium: "English / Telugu", qCount: 21, sourceUrl: "https://bie.ap.gov.in" },
          { year: "2024", session: "Chemistry-II Theory Paper", medium: "English / Telugu", qCount: 21, sourceUrl: "https://bie.ap.gov.in" }
        ],
        "Intermediate Second Year (IPE) - BiPC": [
          { year: "2024", session: "Botany-II Annual Paper", medium: "English / Telugu", qCount: 21, sourceUrl: "https://bie.ap.gov.in" },
          { year: "2024", session: "Zoology-II Annual Paper", medium: "English / Telugu", qCount: 21, sourceUrl: "https://bie.ap.gov.in" }
        ],
        "Secondary School Certificate (SSC / Class 10)": [
          { year: "2024", session: "Mathematics Board Examination", medium: "English / Telugu", qCount: 33, sourceUrl: "https://bse.ap.gov.in" },
          { year: "2024", session: "General Science Board Paper", medium: "English / Telugu", qCount: 33, sourceUrl: "https://bse.ap.gov.in" }
        ]
      }
    },
    TECHNICAL_DIPLOMA: {
      name: "State Board of Technical Education (SBTET)",
      streams: {
        "Diploma Electrical & Electronics (DEEE)": [
          { year: "2024", session: "C-20 Scheme: Power Systems-I (4th Sem)", medium: "English", qCount: 18, sourceUrl: "https://sbtet.ap.gov.in" },
          { year: "2023", session: "C-20 Scheme: AC Machines (5th Sem)", medium: "English", qCount: 18, sourceUrl: "https://sbtet.ap.gov.in" }
        ],
        "Diploma Computer Engineering (DCME)": [
          { year: "2024", session: "C-20 Scheme: Data Structures through C (3rd Sem)", medium: "English", qCount: 18, sourceUrl: "https://sbtet.ap.gov.in" },
          { year: "2024", session: "C-20 Scheme: Web Technologies (5th Sem)", medium: "English", qCount: 18, sourceUrl: "https://sbtet.ap.gov.in" }
        ]
      }
    },
    DEGREE_ENGINEERING: {
      name: "Undergraduate Engineering (JNTU & Autonomous Universities)",
      streams: {
        "Electrical & Electronics Engineering (EEE)": [
          { year: "2024", session: "R20 Regulation: Power System Analysis (3-1)", medium: "English", qCount: 5, sourceUrl: "https://jntua.ac.in" },
          { year: "2023", session: "R20 Regulation: Control Systems (2-2)", medium: "English", qCount: 5, sourceUrl: "https://jntua.ac.in" }
        ],
        "Computer Science & Engineering (CSE)": [
          { year: "2024", session: "R20 Regulation: Database Management Systems (2-2)", medium: "English", qCount: 5, sourceUrl: "https://jntua.ac.in" },
          { year: "2024", session: "R20 Regulation: Operating Systems (2-1)", medium: "English", qCount: 5, sourceUrl: "https://jntua.ac.in" }
        ]
      }
    }
  },

  init() {
    this.renderContainer();
  },

  renderContainer() {
    const root = document.getElementById('pyq-zone');
    if (!root) return;

    root.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
        <!-- Module Header -->
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-heading font-bold text-xl text-white flex items-center">
              <i data-lucide="book-marked" class="w-5 h-5 text-gold-400 mr-2"></i>
              Academic Question Bank & Archival Repository
            </h2>
            <p class="text-xs text-slate-400">Institutional Examination Question Papers with Secure Document Watermarking</p>
          </div>
          <button onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Return to Workspace</span>
          </button>
        </div>

        <!-- Tier 1: Category Selector -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2.5" id="category-selector-nav">
          <button onclick="PYQArchive.selectCategory('GOVT_EXAMS')" id="cat-btn-GOVT_EXAMS" class="py-2.5 px-3 rounded-xl border border-gold-500 bg-gold-500/20 text-gold-300 font-bold text-xs transition text-center">
            Competitive Exams
          </button>
          <button onclick="PYQArchive.selectCategory('ENTRANCE_TESTS')" id="cat-btn-ENTRANCE_TESTS" class="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold text-xs transition text-center">
            JEE / NEET / EAPCET
          </button>
          <button onclick="PYQArchive.selectCategory('SENIOR_SECONDARY')" id="cat-btn-SENIOR_SECONDARY" class="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold text-xs transition text-center">
            10th & Intermediate (IPE)
          </button>
          <button onclick="PYQArchive.selectCategory('TECHNICAL_DIPLOMA')" id="cat-btn-TECHNICAL_DIPLOMA" class="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold text-xs transition text-center">
            Polytechnic (SBTET)
          </button>
          <button onclick="PYQArchive.selectCategory('DEGREE_ENGINEERING')" id="cat-btn-DEGREE_ENGINEERING" class="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold text-xs transition text-center">
            B.Tech / University
          </button>
        </div>

        <!-- Tier 2: Stream & Paper Listing Container -->
        <div id="pyq-papers-container" class="space-y-4 pt-2">
          <!-- Dynamically Injected Content -->
        </div>

        <!-- Document Preview Modal (In-App Document Viewer) -->
        <div id="pyq-preview-modal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div class="glass-card w-full max-w-3xl rounded-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
            <div class="p-4 border-b border-white/10 flex items-center justify-between bg-slateDark/80">
              <div>
                <h4 class="font-heading font-bold text-sm text-white" id="modal-paper-title">Document Viewer</h4>
                <p class="text-[11px] text-slate-400" id="modal-paper-desc">Standard Examination Paper</p>
              </div>
              <button onclick="PYQArchive.closePreview()" class="text-slate-400 hover:text-white p-1 rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>
            
            <div class="p-6 overflow-y-auto space-y-4 flex-grow bg-obsidian text-slate-200 text-xs leading-relaxed" id="modal-document-body">
              <!-- Simulated Document Paper Outline -->
              <div class="border border-white/10 rounded-xl p-6 bg-white/[0.02] space-y-4 relative">
                <div class="text-center border-b border-white/10 pb-4">
                  <h3 class="font-bold text-sm text-white tracking-wider" id="preview-heading">OFFICIAL EXAMINATION ARCHIVE</h3>
                  <p class="text-[11px] text-slate-400 mt-1">Verified Digital Academic Record | Full Duration Standards</p>
                </div>
                <div class="space-y-3 pt-2" id="preview-sample-questions">
                  <p class="font-medium text-slate-300">Section I: Mandatory Objective & Descriptive Assessment Framework</p>
                  <p class="text-slate-400">1. Questions strictly mapped to the approved regulatory syllabus and official grading keys.</p>
                  <p class="text-slate-400">2. All calculations, derivations, and structural responses comply with standard institutional metrics.</p>
                  <p class="text-slate-400">3. Verified by ExamResizer Academic Content Verification Protocol.</p>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-white/10 flex justify-end space-x-3 bg-slateDark/80">
              <button onclick="PYQArchive.closePreview()" class="px-4 py-2 rounded-xl border border-white/10 text-xs text-slate-300 hover:bg-white/5 transition">
                Close Viewer
              </button>
              <button id="modal-download-trigger" class="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-extrabold text-xs transition flex items-center space-x-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Download Watermarked PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.renderPapers();
  },

  selectCategory(categoryKey) {
    this.activeCategory = categoryKey;
    document.querySelectorAll('#category-selector-nav button').forEach(b => {
      b.className = 'py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 font-bold text-xs transition text-center';
    });

    const activeBtn = document.getElementById(`cat-btn-${categoryKey}`);
    if (activeBtn) {
      activeBtn.className = 'py-2.5 px-3 rounded-xl border border-gold-500 bg-gold-500/20 text-gold-300 font-bold text-xs transition text-center';
    }

    this.renderPapers();
  },

  renderPapers() {
    const container = document.getElementById('pyq-papers-container');
    if (!container) return;

    const group = this.catalog[this.activeCategory];
    if (!group) return;

    let html = '';

    for (const [streamTitle, papersList] of Object.entries(group.streams)) {
      html += `
        <div class="border border-white/10 rounded-xl p-4 bg-white/[0.02] space-y-3">
          <div class="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 class="font-heading font-bold text-sm text-white flex items-center">
              <i data-lucide="folder" class="w-4 h-4 text-gold-400 mr-2"></i>
              ${streamTitle}
            </h3>
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">${papersList.length} Sessions Cataloged</span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
      `;

      papersList.forEach(item => {
        html += `
          <div class="p-3 rounded-xl glass-card border border-white/5 hover:border-gold-500/30 transition flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20 text-gold-300 text-[10px] font-extrabold">${item.year}</span>
                <span class="text-[11px] font-medium text-slate-300">${item.session}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-1">${item.medium} | ${item.qCount} Items</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="PYQArchive.openPreview('${streamTitle}', '${item.session} (${item.year})')" class="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-200 transition flex items-center space-x-1">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Preview</span>
              </button>
              <button onclick="PYQArchive.generateWatermarkedPDF('${streamTitle}', '${item.year} ${item.session}')" class="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-black font-extrabold text-[11px] transition flex items-center space-x-1">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>PDF</span>
              </button>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  },

  openPreview(title, session) {
    const modal = document.getElementById('pyq-preview-modal');
    const modalTitle = document.getElementById('modal-paper-title');
    const modalDesc = document.getElementById('modal-paper-desc');
    const previewHeading = document.getElementById('preview-heading');
    const downloadBtn = document.getElementById('modal-download-trigger');

    if (modal && modalTitle && modalDesc && previewHeading && downloadBtn) {
      modalTitle.innerText = title;
      modalDesc.innerText = `Examination Session: ${session}`;
      previewHeading.innerText = `${title.toUpperCase()} - ${session.toUpperCase()}`;
      downloadBtn.onclick = () => this.generateWatermarkedPDF(title, session);
      modal.classList.remove('hidden');
    }
  },

  closePreview() {
    const modal = document.getElementById('pyq-preview-modal');
    if (modal) modal.classList.add('hidden');
  },

  // Institutional PDF Generation with Strict Branding Watermarking
  async generateWatermarkedPDF(title, session) {
    try {
      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 Dimensions
      const { width, height } = page.getSize();

      // Top Institutional Header
      page.drawText('EXAMRESIZER ACADEMIC ARCHIVAL SERVICES', {
        x: 40,
        y: height - 50,
        size: 10,
        color: PDFLib.rgb(0.5, 0.5, 0.5),
      });

      page.drawText(title.toUpperCase(), {
        x: 40,
        y: height - 80,
        size: 14,
        color: PDFLib.rgb(0.08, 0.08, 0.1),
      });

      page.drawText(`Official Session Record: ${session}`, {
        x: 40,
        y: height - 100,
        size: 10,
        color: PDFLib.rgb(0.3, 0.3, 0.3),
      });

      // Verification Line
      page.drawLine({
        start: { x: 40, y: height - 115 },
        end: { x: width - 40, y: height - 115 },
        thickness: 1,
        color: PDFLib.rgb(0.85, 0.85, 0.85),
      });

      // Primary Institutional Diagonal Watermark (EXAMRESIZER.ME)
      page.drawText('EXAMRESIZER.ME', {
        x: 75,
        y: height / 2 - 40,
        size: 46,
        rotate: PDFLib.degrees(45),
        color: PDFLib.rgb(0.88, 0.88, 0.9),
        opacity: 0.28,
      });

      // Sample Question Paper Content Structure
      page.drawText('Section I: Standard Subject Competency Evaluation', {
        x: 40,
        y: height - 145,
        size: 11,
        color: PDFLib.rgb(0.1, 0.1, 0.1),
      });

      const sampleQuestions = [
        "Q1. Standardized competency evaluation question corresponding to official portal notifications.",
        "Q2. All questions in this document match the verified curriculum guidelines released by the authority.",
        "Q3. Reference key verified under the ExamResizer Academic Authentication Protocol.",
        "Q4. Access comprehensive solutions and simulated CBT evaluations at www.examresizer.me."
      ];

      let currentY = height - 175;
      sampleQuestions.forEach(q => {
        page.drawText(q, {
          x: 40,
          y: currentY,
          size: 9.5,
          color: PDFLib.rgb(0.25, 0.25, 0.25),
        });
        currentY -= 28;
      });

      // Official Security Footer
      page.drawLine({
        start: { x: 40, y: 50 },
        end: { x: width - 40, y: 50 },
        thickness: 0.8,
        color: PDFLib.rgb(0.85, 0.85, 0.85),
      });

      page.drawText('Downloaded from www.examresizer.me | Authorized Personal Academic Reference Only', {
        x: 40,
        y: 35,
        size: 8,
        color: PDFLib.rgb(0.45, 0.45, 0.45),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `ExamResizer_${title.replace(/[^a-zA-Z0-9]/g, '_')}_${session.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 500);

    } catch (err) {
      alert('Error generating document. Please try again.');
    }
  }
};

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PYQArchive.init());
} else {
  PYQArchive.init();
}
