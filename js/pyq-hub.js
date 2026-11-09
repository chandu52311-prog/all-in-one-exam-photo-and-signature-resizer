// ====================================================================
// 🏛️ EXAMRESIZER PRO - OFFICIAL MASTER PYQ REPOSITORY ENGINE (2020–2026)
// Generated from 367 Verified Supabase Master Papers
// Module: js/pyq-hub.js
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
        { year: "2024", session: "Session-3 Master Paper", file: "GATE/EE/2024/GATE_EE_2024_S3.pdf", available: true },
        { year: "2024", session: "Session-8 Master Paper", file: "GATE/EE/2024/GATE_EE_2024_S8.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE/EE/2023/GATE_EE_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE/EE/2022/GATE_EE_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE/EE/2021/GATE_EE_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE/EE/2020/GATE_EE_2020.pdf", available: true }
      ],
      "CSE & IT": [
        { year: "2024", session: "Session-1 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S1.pdf", available: true },
        { year: "2024", session: "Session-5 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S5.pdf", available: true },
        { year: "2024", session: "Session-6 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S6.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE/CS/2023/GATE_CS_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE/CS/2022/GATE_CS_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE/CS/2021/GATE_CS_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE/CS/2020/GATE_CS_2020.pdf", available: true }
      ],
      "ECE (Electronics)": [
        { year: "2024", session: "Session-3 Master Paper", file: "GATE/EC/2024/GATE_EC_2024_S3.pdf", available: true },
        { year: "2024", session: "Session-7 Master Paper", file: "GATE/EC/2024/GATE_EC_2024_S7.pdf", available: true },
        { year: "2023", session: "IIT Kanpur Master", file: "GATE/EC/2023/GATE_EC_2023.pdf", available: true },
        { year: "2022", session: "IIT Kharagpur Master", file: "GATE/EC/2022/GATE_EC_2022.pdf", available: true },
        { year: "2021", session: "IIT Bombay Master", file: "GATE/EC/2021/GATE_EC_2021.pdf", available: true },
        { year: "2020", session: "IIT Delhi Master", file: "GATE/EC/2020/GATE_EC_2020.pdf", available: true }
      ],
      "ME (Mechanical)": [
        { year: "2024", session: "Session-1 Master Paper", file: "GATE/ME/2024/GATE_ME_2024_S1.pdf", available: true },
        { year: "2024", session: "Session-2 Master Paper", file: "GATE/ME/2024/GATE_ME_2024_S2.pdf", available: true },
        { year: "2023", session: "Shift-1 Master", file: "GATE/ME/2023/GATE_ME_2023.pdf", available: true },
        { year: "2022", session: "Shift-1 Master", file: "GATE/ME/2022/GATE_ME_2022.pdf", available: true },
        { year: "2021", session: "Shift-1 Master", file: "GATE/ME/2021/GATE_ME_2021.pdf", available: true },
        { year: "2020", session: "Shift-1 Master", file: "GATE/ME/2020/GATE_ME_2020.pdf", available: true }
      ],
      "CE (Civil)": [
        { year: "2024", session: "Session-3 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S3.pdf", available: true },
        { year: "2024", session: "Session-4 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S4.pdf", available: true },
        { year: "2024", session: "Session-5 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S5.pdf", available: true },
        { year: "2023", session: "Shift-1 Master", file: "GATE/CE/2023/GATE_CE_2023.pdf", available: true },
        { year: "2022", session: "Shift-1 Master", file: "GATE/CE/2022/GATE_CE_2022.pdf", available: true },
        { year: "2021", session: "Shift-1 Master", file: "GATE/CE/2021/GATE_CE_2021.pdf", available: true },
        { year: "2020", session: "Shift-1 Master", file: "GATE/CE/2020/GATE_CE_2020.pdf", available: true }
      ],
      "IN (Instrumentation)": [
        { year: "2024", session: "Session-4 Master Paper", file: "GATE/IN/2024/GATE_IN_2024_S4.pdf", available: true },
        { year: "2024", session: "Session-5 Master Paper", file: "GATE/IN/2024/GATE_IN_2024_S5.pdf", available: true },
        { year: "2023", session: "Official Master", file: "GATE/IN/2023/GATE_IN_2023.pdf", available: true },
        { year: "2022", session: "Official Master", file: "GATE/IN/2022/GATE_IN_2022.pdf", available: true },
        { year: "2021", session: "Official Master", file: "GATE/IN/2021/GATE_IN_2021.pdf", available: true },
        { year: "2020", session: "Official Master", file: "GATE/IN/2020/GATE_IN_2020.pdf", available: true }
      ],
      "CH (Chemical)": [
        { year: "2024", session: "Session-2 Master Paper", file: "GATE/CH/2024/GATE_CH_2024_S2.pdf", available: true },
        { year: "2024", session: "Session-3 Master Paper", file: "GATE/CH/2024/GATE_CH_2024_S3.pdf", available: true },
        { year: "2023", session: "Official Master", file: "GATE/CH/2023/GATE_CH_2023.pdf", available: true },
        { year: "2022", session: "Official Master", file: "GATE/CH/2022/GATE_CH_2022.pdf", available: true },
        { year: "2021", session: "Official Master", file: "GATE/CH/2021/GATE_CH_2021.pdf", available: true },
        { year: "2020", session: "Official Master", file: "GATE/CH/2020/GATE_CH_2020.pdf", available: true }
      ]
    }
  },
  SSC: {
    title: "Staff Selection Commission (SSC)",
    desc: "Recruitment examination papers for graduate, intermediate, and technical cadres.",
    folder: "pyq/SSC",
    subStreams: {
      "CGL": [
        { year: "2025", session: "Tier-1 CBT Shift 1", file: "SSC/CGL/2025/SSC_CGL_2025.pdf", available: true },
        { year: "2025", session: "Tier-1 CBT Shift 2", file: "SSC/CGL/2025/SSC_CGL_2025_02.pdf", available: true },
        { year: "2025", session: "Tier-1 CBT Shift 3", file: "SSC/CGL/2025/SSC_CGL_2025_03.pdf", available: true },
        { year: "2023", session: "Tier-1 Shift Master", file: "SSC/CGL/2023/SSC_CGL_2023.pdf", available: true },
        { year: "2023", session: "Tier-1 Shift 2", file: "SSC/CGL/2023/SSC_CGL_2023_02.pdf", available: true },
        { year: "2022", session: "Tier-1 Shift Master", file: "SSC/CGL/2022/SSC_CGL_2022.pdf", available: true },
        { year: "2021", session: "Tier-1 Shift Master", file: "SSC/CGL/2021/SSC_CGL_2021.pdf", available: true },
        { year: "2020", session: "Tier-1 Shift Master", file: "SSC/CGL/2020/SSC_CGL_2020.pdf", available: true }
      ],
      "CHSL (10+2)": [
        { year: "2024", session: "Tier-1 Shift Master", file: "SSC/CHSL/2024/SSC_CHSL_2024.pdf", available: true },
        { year: "2024", session: "Tier-1 Shift 2", file: "SSC/CHSL/2024/SSC_CHSL_2024_02.pdf", available: true },
        { year: "2023", session: "Tier-1 Shift Master", file: "SSC/CHSL/2023/SSC_CHSL_2023.pdf", available: true },
        { year: "2022", session: "Tier-1 Shift Master", file: "SSC/CHSL/2022/SSC_CHSL_2022.pdf", available: true },
        { year: "2021", session: "Tier-1 Shift Master", file: "SSC/CHSL/2021/SSC_CHSL_2021.pdf", available: true },
        { year: "2020", session: "Tier-1 Shift Master", file: "SSC/CHSL/2020/SSC_CHSL_2020.pdf", available: true }
      ],
      "JE (Electrical & Civil)": [
        { year: "2025", session: "JE Electrical CBT Shift 1", file: "SSC/JE_EE/2025/SSC_JE_EE_2025.pdf", available: true },
        { year: "2024", session: "JE General CBT Paper", file: "SSC/JE/2024/SSC_JE_2024.pdf", available: true },
        { year: "2024", session: "JE Electrical CBT", file: "SSC/JE_EE/2024/SSC_JE_EE_2024.pdf", available: true },
        { year: "2023", session: "JE Civil CBT", file: "SSC/JE_CE/2023/SSC_JE_CE_2023.pdf", available: true },
        { year: "2023", session: "JE Electrical CBT", file: "SSC/JE_EE/2023/SSC_JE_EE_2023.pdf", available: true },
        { year: "2022", session: "JE Electrical CBT", file: "SSC/JE_EE/2022/SSC_JE_EE_2022.pdf", available: true },
        { year: "2020", session: "JE Civil CBT", file: "SSC/JE_CE/2020/SSC_JE_CE_2020.pdf", available: true },
        { year: "2020", session: "JE Electrical CBT", file: "SSC/JE_EE/2020/SSC_JE_EE_2020.pdf", available: true }
      ],
      "CPO SI": [
        { year: "2025", session: "Paper-1 CBT Shift 1", file: "SSC/CPO/2025/SSC_CPO_2025.pdf", available: true },
        { year: "2024", session: "Paper-1 CBT Master", file: "SSC/CPO/2024/SSC_CPO_2024.pdf", available: true },
        { year: "2023", session: "Paper-1 CBT Master", file: "SSC/CPO/2023/SSC_CPO_2023.pdf", available: true },
        { year: "2022", session: "Paper-1 CBT Master", file: "SSC/CPO/2022/SSC_CPO_2022.pdf", available: true },
        { year: "2021", session: "Paper-1 CBT Master", file: "SSC/CPO/2021/SSC_CPO_2021.pdf", available: true },
        { year: "2020", session: "Paper-1 CBT Master", file: "SSC/CPO/2020/SSC_CPO_2020.pdf", available: true }
      ],
      "MTS": [
        { year: "2024", session: "MTS CBT Shift Master", file: "SSC/MTS/2024/SSC_MTS_2024.pdf", available: true },
        { year: "2023", session: "MTS CBT Shift Master", file: "SSC/MTS/2023/SSC_MTS_2023.pdf", available: true },
        { year: "2022", session: "MTS CBT Shift Master", file: "SSC/MTS/2022/SSC_MTS_2022.pdf", available: true },
        { year: "2021", session: "MTS CBT Shift Master", file: "SSC/MTS/2021/SSC_MTS_2021.pdf", available: true },
        { year: "2020", session: "MTS CBT Shift Master", file: "SSC/MTS/2020/SSC_MTS_2020.pdf", available: true }
      ],
      "GD Constable": [
        { year: "2025", session: "GD Constable CBT", file: "SSC/GD/2025/SSC_GD_2025.pdf", available: true },
        { year: "2024", session: "GD Constable Shift 1", file: "SSC/GD/2024/SSC_GD_2024.pdf", available: true },
        { year: "2024", session: "GD Constable Shift 2", file: "SSC/GD/2024/SSC_GD_2024_02.pdf", available: true },
        { year: "2022", session: "GD Constable Shift 1", file: "SSC/GD/2022/SSC_GD_2022.pdf", available: true }
      ],
      "Stenographer (C & D)": [
        { year: "2025", session: "Steno CBT Paper", file: "SSC/STENO/2025/SSC_STENO_2025.pdf", available: true },
        { year: "2024", session: "Steno CBT Shift 1", file: "SSC/STENO/2024/SSC_STENO_2024.pdf", available: true },
        { year: "2023", session: "Steno CBT Shift 1", file: "SSC/STENO/2023/SSC_STENO_2023.pdf", available: true },
        { year: "2022", session: "Steno CBT Shift 1", file: "SSC/STENO/2022/SSC_STENO_2022.pdf", available: true },
        { year: "2021", session: "Steno CBT Shift 1", file: "SSC/STENO/2021/SSC_STENO_2021.pdf", available: true },
        { year: "2020", session: "Steno CBT Shift 1", file: "SSC/STENO/2020/SSC_STENO_2020.pdf", available: true }
      ],
      "Selection Posts": [
        { year: "2025", session: "Phase Selection CBT", file: "SSC/SELPOST/2025/SSC_SELPOST_2025.pdf", available: true },
        { year: "2024", session: "Phase XII Selection CBT", file: "SSC/SELPOST/2024/SSC_SELPOST_2024.pdf", available: true },
        { year: "2023", session: "Phase XI Selection CBT", file: "SSC/SELPOST/2023/SSC_SELPOST_2023.pdf", available: true },
        { year: "2022", session: "Phase X Selection CBT", file: "SSC/SELPOST/2022/SSC_SELPOST_2022.pdf", available: true }
      ]
    }
  },
  RRB: {
    title: "Railway Recruitment Boards (RRB)",
    desc: "Technical, Graduate, and Non-Technical Railway Examination Master Question Papers.",
    folder: "pyq/RRB",
    subStreams: {
      "NTPC": [
        { year: "2025", session: "Graduate CBT Shift 1", file: "RRB/NTPC/2025/RRB_NTPC_2025.pdf", available: true },
        { year: "2024", session: "CBT Shift Master", file: "RRB/NTPC/2024/RRB_NTPC_2024.pdf", available: true },
        { year: "2024", session: "CBT Shift 2", file: "RRB/NTPC/2024/RRB_NTPC_2024_02.pdf", available: true },
        { year: "2022", session: "Stage-2 Level 6 Shift", file: "RRB/NTPC/2022/RRB_NTPC_2022.pdf", available: true },
        { year: "2022", session: "Stage-2 Level 5 Shift", file: "RRB/NTPC/2022/RRB_NTPC_2022_02.pdf", available: true },
        { year: "2021", session: "Stage-1 Phase-1 Shift", file: "RRB/NTPC/2021/RRB_NTPC_2021.pdf", available: true },
        { year: "2020", session: "Stage-1 Shift Master", file: "RRB/NTPC/2020/RRB_NTPC_2020.pdf", available: true }
      ],
      "GROUP D": [
        { year: "2024", session: "Level-1 CBT Shift 1", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024.pdf", available: true },
        { year: "2024", session: "Level-1 CBT Shift 2", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_02.pdf", available: true },
        { year: "2022", session: "Phase-1 CBT Shift 1", file: "RRB/GROUP_D/2022/RRB_GROUP_D_2022.pdf", available: true },
        { year: "2022", session: "Phase-1 CBT Shift 2", file: "RRB/GROUP_D/2022/RRB_GROUP_D_2022_02.pdf", available: true }
      ],
      "ALP & Tech": [
        { year: "2025", session: "CBT-1 Stage Shift 1", file: "RRB/ALP/2025/RRB_ALP_2025.pdf", available: true },
        { year: "2025", session: "CBT-1 Stage Shift 2", file: "RRB/ALP/2025/RRB_ALP_2025_02.pdf", available: true },
        { year: "2024", session: "CBT-1 Stage Shift 1", file: "RRB/ALP/2024/RRB_ALP_2024.pdf", available: true },
        { year: "2024", session: "CBT-1 Stage Shift 2", file: "RRB/ALP/2024/RRB_ALP_2024_02.pdf", available: true },
        { year: "2024", session: "CBT-1 Stage Shift 3", file: "RRB/ALP/2024/RRB_ALP_2024_03.pdf", available: true }
      ],
      "RRB JE": [
        { year: "2022", session: "CBT Stage Master Paper", file: "RRB/JE/2022/RRB_JE_2022.pdf", available: true }
      ],
      "PARAMEDICAL": [
        { year: "2025", session: "Staff Nurse / Paramedical Shift 1", file: "RRB/PARAMEDICAL/2025/RRB_PARAMEDICAL_2025.pdf", available: true },
        { year: "2024", session: "Paramedical Examination", file: "RRB/PARAMEDICAL/2024/RRB_PARAMEDICAL_2024.pdf", available: true }
      ],
      "Ministerial & Isolated": [
        { year: "2020", session: "CBT Shift Master", file: "RRB/MINISTERIAL/2020/RRB_MINISTERIAL_2020.pdf", available: true }
      ]
    }
  },
  STATE_PSC: {
    title: "Andhra Pradesh (APPSC) & Telangana (TGPSC / TSPSC)",
    desc: "State Gazetted, Executive Services, and Assistant Executive Engineers (AEE) Master Papers.",
    folder: "pyq",
    subStreams: {
      "APPSC AEE": [
        { year: "2024", session: "Assistant Executive Engineers (Set 1)", file: "APPSC/AEE/2024/APPSC_AEE_2024.pdf", available: true },
        { year: "2024", session: "Assistant Executive Engineers (Set 2)", file: "APPSC/AEE/2024/APPSC_AEE_2024_02.pdf", available: true },
        { year: "2024", session: "Assistant Executive Engineers (Set 3)", file: "APPSC/AEE/2024/APPSC_AEE_2024_03.pdf", available: true },
        { year: "2024", session: "Assistant Executive Engineers (Set 4)", file: "APPSC/AEE/2024/APPSC_AEE_2024_04.pdf", available: true },
        { year: "2024", session: "Assistant Executive Engineers (Set 5)", file: "APPSC/AEE/2024/APPSC_AEE_2024_05.pdf", available: true }
      ],
      "APPSC General Studies": [
        { year: "2024", session: "General Studies & Mental Ability (Set 1)", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024.pdf", available: true },
        { year: "2024", session: "General Studies Screening (Set 2)", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024_02.pdf", available: true },
        { year: "2024", session: "General Studies Screening (Set 3)", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024_03.pdf", available: true },
        { year: "2021", session: "Executive Paper Official Screening", file: "APPSC/GENERAL/2021/APPSC_GENERAL_2021.pdf", available: true },
        { year: "2020", session: "State Screening Master Booklet", file: "APPSC/GENERAL/2020/APPSC_GENERAL_2020.pdf", available: true }
      ],
      "APPSC Technical (Engineering)": [
        { year: "2024", session: "ECE Engineering Technical Paper", file: "APPSC/ECE/2024/APPSC_ECE_2024.pdf", available: true },
        { year: "2020", session: "CSE Engineering Technical Paper", file: "APPSC/CSE/2020/APPSC_CSE_2020.pdf", available: true }
      ],
      "TSPSC Group-1 Services": [
        { year: "2024", session: "Preliminary Master Question Booklet", file: "TSPSC/GROUP_1/2024/TSPSC_GROUP_1_2024.pdf", available: true }
      ]
    }
  },
  UPSC: {
    title: "Union Public Service Commission (UPSC)",
    desc: "Civil Services Preliminary GS-1 and CSAT Examination Master Question Papers.",
    folder: "pyq/UPSC",
    subStreams: {
      "Civil Services Prelims (GS-1)": [
        { year: "2024", session: "General Studies Paper-I Series A", file: "UPSC/GS1/2024/UPSC_GS1_2024.pdf", available: true },
        { year: "2023", session: "General Studies Paper-I Series A", file: "UPSC/GS1/2023/UPSC_GS1_2023.pdf", available: true }
      ],
      "Civil Services CSAT (Paper-2)": [
        { year: "2024", session: "CSAT Paper-II Series A", file: "UPSC/CSAT/2024/UPSC_CSAT_2024.pdf", available: true },
        { year: "2023", session: "CSAT Paper-II Series A", file: "UPSC/CSAT/2023/UPSC_CSAT_2023.pdf", available: true }
      ]
    }
  },
  BTECH: {
    title: "Undergraduate Engineering (B.Tech JNTU Regulations)",
    desc: "Autonomous & University Semester Final Examination Question Papers.",
    folder: "pyq/BTECH",
    subStreams: {
      "EEE": [
        { year: "2024", session: "Power Systems & Machines", file: "BTECH/EEE/2024/BTECH_EEE_2024.pdf", available: false }
      ],
      "CSE": [
        { year: "2024", session: "Data Structures & DBMS", file: "BTECH/CSE/2024/BTECH_CSE_2024.pdf", available: false }
      ],
      "ECE": [
        { year: "2024", session: "Signals & Core Electronics", file: "BTECH/ECE/2024/BTECH_ECE_2024.pdf", available: false }
      ],
      "CIVIL": [
        { year: "2024", session: "Structural Analysis & Mechanics", file: "BTECH/CIVIL/2024/BTECH_CIVIL_2024.pdf", available: false }
      ]
    }
  },
  ENTRANCE: {
    title: "National & State Entrance (JEE & EAMCET)",
    desc: "NTA JEE Main and AP/TG EAPCET Entrance Papers with Official Final Keys.",
    folder: "pyq/ENTRANCE",
    subStreams: {
      "JEE Main": [
        { year: "2024", session: "Session-1 Morning Shift (PCM)", file: "ENTRANCE/JEE/2024/JEE_MAIN_2024.pdf", available: false }
      ],
      "AP & TS EAMCET / EAPCET": [
        { year: "2024", session: "Engineering Stream Morning Shift", file: "ENTRANCE/EAMCET/2024/EAPCET_2024.pdf", available: false }
      ]
    }
  }
};

// ----------------------------------------------------
// CONTROLLER: TIER-1 AUTHORITY SWITCHER (BANNER SYNC)
// ----------------------------------------------------
function switchAuthority(authKey) {
  currentAuthorityKey = authKey;
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[authKey];

  const titleEl = document.getElementById('activeAuthorityTitle');
  const descEl = document.getElementById('activeAuthorityDesc');
  if (data && titleEl) titleEl.innerText = data.title;
  if (data && descEl) descEl.innerText = data.desc;

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
// CARD GENERATOR (VIEW / DOWNLOAD & STRICT AVAILABILITY)
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
          <button onclick="openPyqReader('${safeStream}', '${p.year}', '${safeTitle}', '${p.file}')" class="px-5 py-2.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-lg flex-shrink-0 cursor-pointer">
            <span>👁️ View / Download</span>
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
// IN-APP EMBEDDED READER (REAL SUPABASE PDF ONLY)
// ----------------------------------------------------
function openPyqReader(title, year, body, filePath) {
  document.getElementById('readerPaperTitle').innerText = `${title} (${year})`;
  document.getElementById('readerPaperTag').innerText = body.toUpperCase();
  document.getElementById('readerMainSubject').innerText = title;
  document.getElementById('readerSessionInfo').innerText = `${body} • Official Session ${year}`;

  const targetUrl = filePath.startsWith('http') 
    ? filePath 
    : `${SUPABASE_STORAGE_BASE}/pyq/${filePath}`;

  const qBody = document.getElementById('readerQuestionsBody');
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
  dlBtn.innerText = 'Download PDF';
  dlBtn.disabled = false;
  dlBtn.onclick = function() {
    triggerDirectDownload(targetUrl, filePath);
  };

  document.getElementById('pyqReaderModal').classList.remove('hidden');
}
window.openPyqReader = openPyqReader;

function closePyqReader() {
  const modal = document.getElementById('pyqReaderModal');
  if (modal) modal.classList.add('hidden');
}
window.closePyqReader = closePyqReader;

function triggerDirectDownload(url, filePath) {
  const safeName = filePath.split('/').pop();
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
