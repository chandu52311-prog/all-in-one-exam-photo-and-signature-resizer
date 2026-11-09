// ====================================================================
// 🏛️ EXAMRESIZER PRO - OFFICIAL MASTER PYQ REPOSITORY ENGINE (2020–2026)
// Dynamic Sub-Button Architecture & Strict Availability Verification
// ====================================================================

let currentAuthorityKey = 'GATE';
let currentStreamKey = '';
const SUPABASE_STORAGE_BASE = "https://znkwwzasysqkvtclmktd.supabase.co/storage/v1/object/public/exam-papers";

const COMPREHENSIVE_AUTHORITY_CATALOG = {
  GATE: {
    title: "Graduate Aptitude Test in Engineering (GATE)",
    desc: "Official Master Question Papers for core engineering disciplines organized by IITs and IISc.",
    folder: "pyq/GATE",
    subStreams: {
      "EE (Electrical)": [
        { year: "2024", session: "IISc Bangalore Master", file: "GATE_EE_2024.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE_EE_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE_EE_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE_EE_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE_EE_2020.pdf", available: true }
      ],
      "CSE & IT": [
        { year: "2024", session: "IISc Bangalore Master", file: "GATE_CS_2024.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE_CS_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE_CS_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE_CS_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE_CS_2020.pdf", available: true }
      ],
      "ECE (Electronics)": [
        { year: "2024", session: "IISc Bangalore Master", file: "GATE_EC_2024.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE_EC_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE_EC_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE_EC_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE_EC_2020.pdf", available: true }
      ],
      "ME (Mechanical)": [
        { year: "2024", session: "Shift-1 Master", file: "GATE_ME_2024.pdf", available: true },
        { year: "2023", session: "Shift-1 Master", file: "GATE_ME_2023.pdf", available: true },
        { year: "2022", session: "Shift-1 Master", file: "GATE_ME_2022.pdf", available: true },
        { year: "2021", session: "Shift-1 Master", file: "GATE_ME_2021.pdf", available: true },
        { year: "2020", session: "Shift-1 Master", file: "GATE_ME_2020.pdf", available: true }
      ],
      "CE (Civil)": [
        { year: "2024", session: "Shift-1 Master", file: "GATE_CE_2024.pdf", available: true },
        { year: "2023", session: "Shift-1 Master", file: "GATE_CE_2023.pdf", available: true },
        { year: "2022", session: "Shift-1 Master", file: "GATE_CE_2022.pdf", available: true },
        { year: "2021", session: "Shift-1 Master", file: "GATE_CE_2021.pdf", available: true },
        { year: "2020", session: "Shift-1 Master", file: "GATE_CE_2020.pdf", available: true }
      ]
    }
  },
  SSC: {
    title: "Staff Selection Commission (SSC)",
    desc: "Recruitment examination papers for graduate, intermediate, and technical cadres.",
    folder: "pyq/SSC",
    subStreams: {
      "CGL": [
        { year: "2025", session: "CGL Tier-1 Shift Paper", file: "SSC_CGL_2025.pdf", available: true },
        { year: "2024", session: "CGL Tier-1 Shift Paper", file: "SSC_CGL_2024.pdf", available: true },
        { year: "2023", session: "CGL Tier-1 Shift Paper", file: "SSC_CGL_2023.pdf", available: true },
        { year: "2022", session: "CGL Tier-1 Shift Paper", file: "SSC_CGL_2022.pdf", available: true },
        { year: "2020", session: "CGL Tier-1 Shift Paper", file: "SSC_CGL_2020.pdf", available: true }
      ],
      "CHSL (10+2)": [
        { year: "2024", session: "CHSL Tier-1 Shift", file: "SSC_CHSL_2024.pdf", available: true },
        { year: "2023", session: "CHSL Tier-1 Shift", file: "SSC_CHSL_2023.pdf", available: true },
        { year: "2022", session: "CHSL Tier-1 Shift", file: "SSC_CHSL_2022.pdf", available: true },
        { year: "2020", session: "CHSL Tier-1 Shift", file: "SSC_CHSL_2020.pdf", available: true }
      ],
      "JE (Junior Engineer)": [
        { year: "2025", session: "JE Electrical CBT", file: "SSC_JE_EE_2025.pdf", available: true },
        { year: "2024", session: "JE Electrical CBT", file: "SSC_JE_EE_2024.pdf", available: true },
        { year: "2023", session: "JE Electrical CBT", file: "SSC_JE_EE_2023.pdf", available: true },
        { year: "2020", session: "JE Civil CBT", file: "SSC_JE_CE_2020.pdf", available: true }
      ],
      "CPO SI": [
        { year: "2025", session: "Paper-1 CBT Shift", file: "SSC_CPO_2025.pdf", available: true },
        { year: "2024", session: "Paper-1 CBT Shift", file: "SSC_CPO_2024.pdf", available: true },
        { year: "2021", session: "Paper-1 CBT Shift", file: "SSC_CPO_2021.pdf", available: true },
        { year: "2020", session: "Paper-1 CBT Shift", file: "SSC_CPO_2020.pdf", available: true }
      ],
      "MTS": [
        { year: "2024", session: "MTS CBT Shift", file: "SSC_MTS_2024.pdf", available: true },
        { year: "2023", session: "MTS CBT Shift", file: "SSC_MTS_2023.pdf", available: true },
        { year: "2022", session: "MTS CBT Shift", file: "SSC_MTS_2022.pdf", available: true },
        { year: "2020", session: "MTS CBT Shift", file: "SSC_MTS_2020.pdf", available: true }
      ]
    }
  },
  RRB: {
    title: "Railway Recruitment Boards (RRB)",
    desc: "Technical, Graduate, and Non-Technical Railway Examination Master Question Papers.",
    folder: "pyq/RRB",
    subStreams: {
      "NTPC": [
        { year: "2024", session: "NTPC Official Shift", file: "RRB_NTPC_2024.pdf", available: true },
        { year: "2022", session: "NTPC Stage-2 Shift", file: "RRB_NTPC_2022.pdf", available: true },
        { year: "2021", session: "NTPC Stage-1 Shift", file: "RRB_NTPC_2021.pdf", available: true }
      ],
      "GROUP D": [
        { year: "2024", session: "Group D Official Shift", file: "RRB_GROUP_D_2024.pdf", available: true },
        { year: "2022", session: "Group D Official Shift", file: "RRB_GROUP_D_2022.pdf", available: true }
      ],
      "ALP & Tech": [
        { year: "2024", session: "ALP Stage Shift-1", file: "RRB_ALP_2024.pdf", available: false },
        { year: "2018", session: "ALP Part A & B Official", file: "RRB_ALP_2018.pdf", available: false }
      ],
      "PARAMEDICAL": [
        { year: "2025", session: "Official Paramedical Shift", file: "RRB_PARAMEDICAL_2025.pdf", available: true }
      ]
    }
  },
  STATE_PSC: {
    title: "APPSC & TSPSC (State Public Service Commissions)",
    desc: "State Gazetted, Group Services, and Engineering Executive papers.",
    folder: "pyq",
    subStreams: {
      "APPSC Group-1": [
        { year: "2024", session: "General Studies Paper-I & II", file: "APPSC/GROUP_1/2024/APPSC_GROUP_1_2024.pdf", available: false }
      ],
      "APPSC Group-2": [
        { year: "2024", session: "Screening General Studies", file: "APPSC/GROUP_2/2024/APPSC_GROUP_2_2024.pdf", available: false }
      ],
      "APPSC General / AEE": [
        { year: "2024", session: "General Screening Master", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024.pdf", available: true },
        { year: "2021", session: "Executive Paper Official", file: "APPSC/GENERAL/2021/APPSC_GENERAL_2021.pdf", available: true },
        { year: "2020", session: "Screening Test Paper", file: "APPSC/GENERAL/2020/APPSC_GENERAL_2020.pdf", available: true }
      ],
      "TSPSC Group-1": [
        { year: "2024", session: "Preliminary Master Set 1", file: "TSPSC/GROUP_1/2024/TSPSC_GROUP_1_2024.pdf", available: true },
        { year: "2024", session: "Preliminary Master Set 2", file: "TSPSC/GROUP_1/2024/TSPSC_GROUP_1_2024_02.pdf", available: true }
      ]
    }
  },
  BTECH: {
    title: "Undergraduate Engineering (B.Tech JNTU Regulations)",
    desc: "Semester final examination question papers across core university regulations.",
    folder: "pyq/BTECH",
    subStreams: {
      "EEE": [
        { year: "2024", session: "Power Systems & Machines", file: "EEE/2024/BTECH_EEE_2024.pdf", available: true },
        { year: "2023", session: "Electrical Circuits & Networks", file: "EEE/2023/BTECH_EEE_2023.pdf", available: true }
      ],
      "ECE": [
        { year: "2024", session: "Signals & Core Electronics", file: "ECE/2024/BTECH_ECE_2024.pdf", available: true }
      ],
      "CSE": [
        { year: "2024", session: "Data Structures & DBMS", file: "CSE/2024/BTECH_CSE_2024.pdf", available: true }
      ],
      "CIVIL": [
        { year: "2024", session: "Structural Analysis & Mechanics", file: "CIVIL/2024/BTECH_CIVIL_2024.pdf", available: true }
      ],
      "MECH": [
        { year: "2024", session: "Thermal Engineering & Fluid Mechanics", file: "MECH/2024/BTECH_MECH_2024.pdf", available: false }
      ]
    }
  },
  UPSC: {
    title: "Union Public Service Commission (UPSC)",
    desc: "Civil Services and Central Engineering recruitment papers.",
    folder: "pyq/UPSC",
    subStreams: {
      "Civil Services Prelims (GS-1)": [
        { year: "2024", session: "GS Paper-I Series A", file: "UPSC_CSE_2024_GS1.pdf", available: true },
        { year: "2023", session: "GS Paper-I Series A", file: "UPSC_CSE_2023_GS1.pdf", available: true },
        { year: "2022", session: "GS Paper-I Series A", file: "UPSC_CSE_2022_GS1.pdf", available: true }
      ],
      "CSAT (Paper-2)": [
        { year: "2024", session: "CSAT Series A", file: "UPSC_CSAT_2024.pdf", available: true },
        { year: "2023", session: "CSAT Series A", file: "UPSC_CSAT_2023.pdf", available: true }
      ]
    }
  },
  ENTRANCE: {
    title: "National & State Entrance (JEE & EAMCET)",
    desc: "National and state entrance papers with official final answer keys.",
    folder: "pyq/ENTRANCE",
    subStreams: {
      "JEE Main": [
        { year: "2024", session: "Session-1 Morning Shift (PCM)", file: "JEE_MAIN_2024_S1.pdf", available: false },
        { year: "2023", session: "Session-1 Morning Shift (PCM)", file: "JEE_MAIN_2023_S1.pdf", available: false }
      ],
      "AP & TS EAMCET / EAPCET": [
        { year: "2024", session: "Engineering Stream Morning Shift", file: "EAPCET_2024_S1.pdf", available: false },
        { year: "2023", session: "Engineering Stream Morning Shift", file: "EAPCET_2023_S1.pdf", available: false }
      ]
    }
  }
};

// ----------------------------------------------------
// CONTROLLER: TIER-1 AUTHORITY SWITCHER
// ----------------------------------------------------
function switchAuthority(authKey) {
  currentAuthorityKey = authKey;
  const allKeys = Object.keys(COMPREHENSIVE_AUTHORITY_CATALOG);

  allKeys.forEach(k => {
    const btn = document.getElementById('auth-btn-' + k);
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

  renderSubButtons();
}
window.switchAuthority = switchAuthority;

// ----------------------------------------------------
// CONTROLLER: TIER-2 SUB-BUTTONS RENDERER
// ----------------------------------------------------
function renderSubButtons() {
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[currentAuthorityKey];
  const container = document.getElementById('streamSubButtonsContainer');
  if (!data || !container) return;

  const streams = Object.keys(data.subStreams);
  currentStreamKey = streams[0] || '';

  let html = '';
  streams.forEach(st => {
    const isDefault = st === currentStreamKey;
    html += `
      <button 
        id="sub-btn-${sanitizeId(st)}"
        onclick="switchStream('${st.replace(/'/g, "\\'")}')" 
        class="sub-stream-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
          isDefault 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
            : 'bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
        }">
        ${st}
      </button>
    `;
  });

  container.innerHTML = html;
  renderPaperCards();
}

function switchStream(streamName) {
  currentStreamKey = streamName;
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[currentAuthorityKey];
  if (!data) return;

  Object.keys(data.subStreams).forEach(st => {
    const btn = document.getElementById('sub-btn-' + sanitizeId(st));
    if (btn) {
      if (st === streamName) {
        btn.className = "sub-stream-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition border bg-amber-500/20 text-amber-300 border-amber-500/40";
      } else {
        btn.className = "sub-stream-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition border bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20";
      }
    }
  });

  renderPaperCards();
}
window.switchStream = switchStream;

function sanitizeId(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '_');
}

// ----------------------------------------------------
// CARD GENERATOR (STRICT AVAILABILITY VALIDATION)
// ----------------------------------------------------
function renderPaperCards() {
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[currentAuthorityKey];
  const container = document.getElementById('papersStackContainer');
  if (!data || !container) return;

  const papers = data.subStreams[currentStreamKey] || [];

  if (papers.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-xs text-slate-400 glass-card rounded-xl border border-white/10">
        No question papers currently cataloged for this category.
      </div>
    `;
    return;
  }

  let html = '';
  papers.forEach(p => {
    const hasOriginal = p.available === true;
    const safeStream = currentStreamKey.replace(/'/g, "\\'");
    const safeTitle = data.title.replace(/'/g, "\\'");

    html += `
      <div class="p-4 rounded-xl glass-card border ${hasOriginal ? 'border-white/10 hover:border-amber-500/40' : 'border-white/5 opacity-60'} transition flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded ${hasOriginal ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-500 border border-white/5'} text-[10px] font-extrabold uppercase">
              ${p.year} Examination
            </span>
            <span class="text-xs text-slate-400 font-medium">${p.session}</span>
            <span class="text-[10px] ${hasOriginal ? 'text-emerald-400' : 'text-amber-500'} font-semibold">
              • ${hasOriginal ? 'Official Master Key Verified' : 'File Updating Shortly'}
            </span>
          </div>
          <h4 class="font-bold text-white text-sm md:text-base">${currentStreamKey}</h4>
          <p class="text-[11px] text-slate-400">Authentic Government Master Question Paper</p>
        </div>
        
        ${hasOriginal ? `
          <button onclick="openPyqReader('${safeStream}', '${p.year}', '${safeTitle}', '${data.folder}', '${p.file}')" class="px-5 py-2.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-lg flex-shrink-0 cursor-pointer">
            <span>View Official Paper</span>
          </button>
        ` : `
          <button disabled class="px-5 py-2.5 rounded-xl bg-slate-900/80 text-slate-500 font-bold text-xs flex items-center justify-center space-x-1.5 flex-shrink-0 cursor-not-allowed border border-white/5">
            <span>🔒 File Updating Shortly</span>
          </button>
        `}
      </div>
    `;
  });

  container.innerHTML = html;
}

// ----------------------------------------------------
// IN-APP READER (REAL SUPABASE PDF / ZERO MOCK QUESTIONS)
// ----------------------------------------------------
function openPyqReader(title, year, body, folder, filename) {
  document.getElementById('readerPaperTitle').innerText = `${title} (${year})`;
  document.getElementById('readerPaperTag').innerText = body.toUpperCase();
  document.getElementById('readerMainSubject').innerText = title;
  document.getElementById('readerSessionInfo').innerText = `${body} • Official Session ${year}`;

  const targetUrl = filename.startsWith('http') 
    ? filename 
    : (filename.includes('/') ? `${SUPABASE_STORAGE_BASE}/${filename}` : `${SUPABASE_STORAGE_BASE}/${folder}/${year}/${filename}`);

  const qBody = document.getElementById('readerQuestionsBody');
  
  // Real embedded PDF preview (Eliminates dummy mock questions)
  qBody.innerHTML = `
    <div class="rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col items-center justify-center min-h-[70vh] w-full">
      <iframe src="${targetUrl}#toolbar=1" class="w-full h-[70vh] border-none rounded-xl" title="Official Question Paper Preview">
        <p class="p-6 text-center text-slate-400 text-sm">
          Browser preview unavailable. 
          <a href="${targetUrl}" target="_blank" class="text-amber-400 underline font-bold ml-1">Click here to open directly</a>.
        </p>
      </iframe>
    </div>
  `;

  const dlBtn = document.getElementById('readerTopDownloadBtn');
  dlBtn.innerText = 'Download Official Master Paper';
  dlBtn.disabled = false;
  dlBtn.onclick = function() {
    triggerDirectDownload(targetUrl, filename);
  };

  document.getElementById('pyqReaderModal').classList.remove('hidden');
}
window.openPyqReader = openPyqReader;

function closePyqReader() {
  const modal = document.getElementById('pyqReaderModal');
  if (modal) modal.classList.add('hidden');
}
window.closePyqReader = closePyqReader;

function triggerDirectDownload(url, filename) {
  const safeName = filename.split('/').pop();
  const a = document.createElement('a');
  a.href = url;
  a.download = `ExamResizer_${safeName}`;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 500);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  switchAuthority('GATE');
});
