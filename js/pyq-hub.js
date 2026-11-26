// ====================================================================
// 🏛️ EXAMRESIZER PRO - OFFICIAL MASTER PYQ REPOSITORY ENGINE (2020–2026)
// Distinct Paper Titles • Full-Screen Reader (Zero Gap) • View-Only + Share + Back
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
      "GATE EE (Electrical)": [
        { exam: "GATE Electrical (EE)", year: "2024", shift: "Session-3 Master Paper", file: "GATE/EE/2024/GATE_EE_2024_S3.pdf", available: true },
        { exam: "GATE Electrical (EE)", year: "2024", shift: "Session-8 Master Paper", file: "GATE/EE/2024/GATE_EE_2024_S8.pdf", available: true },
        { exam: "GATE Electrical (EE)", year: "2023", shift: "IIT Kanpur Master Paper", file: "GATE/EE/2023/GATE_EE_2023.pdf", available: true },
        { exam: "GATE Electrical (EE)", year: "2022", shift: "IIT Kharagpur Master Paper", file: "GATE/EE/2022/GATE_EE_2022.pdf", available: true },
        { exam: "GATE Electrical (EE)", year: "2021", shift: "IIT Bombay Master Paper", file: "GATE/EE/2021/GATE_EE_2021.pdf", available: true },
        { exam: "GATE Electrical (EE)", year: "2020", shift: "IIT Delhi Master Paper", file: "GATE/EE/2020/GATE_EE_2020.pdf", available: true }
      ],
      "GATE CSE & IT": [
        { exam: "GATE Computer Science (CS)", year: "2024", shift: "Session-1 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S1.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2024", shift: "Session-5 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S5.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2024", shift: "Session-6 Master Paper", file: "GATE/CS/2024/GATE_CS_2024_S6.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2023", shift: "IIT Kanpur Master Paper", file: "GATE/CS/2023/GATE_CS_2023.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2022", shift: "IIT Kharagpur Master Paper", file: "GATE/CS/2022/GATE_CS_2022.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2021", shift: "IIT Bombay Master Paper", file: "GATE/CS/2021/GATE_CS_2021.pdf", available: true },
        { exam: "GATE Computer Science (CS)", year: "2020", shift: "IIT Delhi Master Paper", file: "GATE/CS/2020/GATE_CS_2020.pdf", available: true }
      ],
      "GATE ECE (Electronics)": [
        { exam: "GATE Electronics (EC)", year: "2024", shift: "Session-3 Master Paper", file: "GATE/EC/2024/GATE_EC_2024_S3.pdf", available: true },
        { exam: "GATE Electronics (EC)", year: "2024", shift: "Session-7 Master Paper", file: "GATE/EC/2024/GATE_EC_2024_S7.pdf", available: true },
        { exam: "GATE Electronics (EC)", year: "2023", shift: "IIT Kanpur Master Paper", file: "GATE/EC/2023/GATE_EC_2023.pdf", available: true },
        { exam: "GATE Electronics (EC)", year: "2022", shift: "IIT Kharagpur Master Paper", file: "GATE/EC/2022/GATE_EC_2022.pdf", available: true },
        { exam: "GATE Electronics (EC)", year: "2021", shift: "IIT Bombay Master Paper", file: "GATE/EC/2021/GATE_EC_2021.pdf", available: true },
        { exam: "GATE Electronics (EC)", year: "2020", shift: "IIT Delhi Master Paper", file: "GATE/EC/2020/GATE_EC_2020.pdf", available: true }
      ],
      "GATE ME (Mechanical)": [
        { exam: "GATE Mechanical (ME)", year: "2024", shift: "Session-1 Master Paper", file: "GATE/ME/2024/GATE_ME_2024_S1.pdf", available: true },
        { exam: "GATE Mechanical (ME)", year: "2024", shift: "Session-2 Master Paper", file: "GATE/ME/2024/GATE_ME_2024_S2.pdf", available: true },
        { exam: "GATE Mechanical (ME)", year: "2023", shift: "Shift-1 Master Paper", file: "GATE/ME/2023/GATE_ME_2023.pdf", available: true },
        { exam: "GATE Mechanical (ME)", year: "2022", shift: "Shift-1 Master Paper", file: "GATE/ME/2022/GATE_ME_2022.pdf", available: true },
        { exam: "GATE Mechanical (ME)", year: "2021", shift: "Shift-1 Master Paper", file: "GATE/ME/2021/GATE_ME_2021.pdf", available: true },
        { exam: "GATE Mechanical (ME)", year: "2020", shift: "Shift-1 Master Paper", file: "GATE/ME/2020/GATE_ME_2020.pdf", available: true }
      ],
      "GATE CE (Civil)": [
        { exam: "GATE Civil (CE)", year: "2024", shift: "Session-3 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S3.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2024", shift: "Session-4 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S4.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2024", shift: "Session-5 Master Paper", file: "GATE/CE/2024/GATE_CE_2024_S5.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2023", shift: "Shift-1 Master Paper", file: "GATE/CE/2023/GATE_CE_2023.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2022", shift: "Shift-1 Master Paper", file: "GATE/CE/2022/GATE_CE_2022.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2021", shift: "Shift-1 Master Paper", file: "GATE/CE/2021/GATE_CE_2021.pdf", available: true },
        { exam: "GATE Civil (CE)", year: "2020", shift: "Shift-1 Master Paper", file: "GATE/CE/2020/GATE_CE_2020.pdf", available: true }
      ],
      "GATE IN (Instrumentation)": [
        { exam: "GATE Instrumentation (IN)", year: "2024", shift: "Session-4 Master Paper", file: "GATE/IN/2024/GATE_IN_2024_S4.pdf", available: true },
        { exam: "GATE Instrumentation (IN)", year: "2024", shift: "Session-5 Master Paper", file: "GATE/IN/2024/GATE_IN_2024_S5.pdf", available: true },
        { exam: "GATE Instrumentation (IN)", year: "2023", shift: "Official Master Paper", file: "GATE/IN/2023/GATE_IN_2023.pdf", available: true },
        { exam: "GATE Instrumentation (IN)", year: "2022", shift: "Official Master Paper", file: "GATE/IN/2022/GATE_IN_2022.pdf", available: true },
        { exam: "GATE Instrumentation (IN)", year: "2021", shift: "Official Master Paper", file: "GATE/IN/2021/GATE_IN_2021.pdf", available: true },
        { exam: "GATE Instrumentation (IN)", year: "2020", shift: "Official Master Paper", file: "GATE/IN/2020/GATE_IN_2020.pdf", available: true }
      ],
      "GATE CH (Chemical)": [
        { exam: "GATE Chemical (CH)", year: "2024", shift: "Session-2 Master Paper", file: "GATE/CH/2024/GATE_CH_2024_S2.pdf", available: true },
        { exam: "GATE Chemical (CH)", year: "2024", shift: "Session-3 Master Paper", file: "GATE/CH/2024/GATE_CH_2024_S3.pdf", available: true },
        { exam: "GATE Chemical (CH)", year: "2023", shift: "Official Master Paper", file: "GATE/CH/2023/GATE_CH_2023.pdf", available: true },
        { exam: "GATE Chemical (CH)", year: "2022", shift: "Official Master Paper", file: "GATE/CH/2022/GATE_CH_2022.pdf", available: true },
        { exam: "GATE Chemical (CH)", year: "2021", shift: "Official Master Paper", file: "GATE/CH/2021/GATE_CH_2021.pdf", available: true },
        { exam: "GATE Chemical (CH)", year: "2020", shift: "Official Master Paper", file: "GATE/CH/2020/GATE_CH_2020.pdf", available: true }
      ]
    }
  },
  SSC: {
    title: "Staff Selection Commission (SSC)",
    desc: "Recruitment examination papers for graduate, intermediate, and technical cadres.",
    folder: "pyq/SSC",
    subStreams: {
      "SSC CGL": [
        { exam: "SSC CGL Tier-1", year: "2025", shift: "CBT Shift-1", file: "SSC/CGL/2025/SSC_CGL_2025.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2025", shift: "CBT Shift-2", file: "SSC/CGL/2025/SSC_CGL_2025_02.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2025", shift: "CBT Shift-3", file: "SSC/CGL/2025/SSC_CGL_2025_03.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2023", shift: "CBT Shift-1", file: "SSC/CGL/2023/SSC_CGL_2023.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2023", shift: "CBT Shift-2", file: "SSC/CGL/2023/SSC_CGL_2023_02.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2022", shift: "CBT Shift-1", file: "SSC/CGL/2022/SSC_CGL_2022.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2021", shift: "CBT Shift-1", file: "SSC/CGL/2021/SSC_CGL_2021.pdf", available: true },
        { exam: "SSC CGL Tier-1", year: "2020", shift: "CBT Shift-1", file: "SSC/CGL/2020/SSC_CGL_2020.pdf", available: true }
      ],
      "SSC CHSL (10+2)": [
        { exam: "SSC CHSL Tier-1", year: "2024", shift: "CBT Shift-1", file: "SSC/CHSL/2024/SSC_CHSL_2024.pdf", available: true },
        { exam: "SSC CHSL Tier-1", year: "2024", shift: "CBT Shift-2", file: "SSC/CHSL/2024/SSC_CHSL_2024_02.pdf", available: true },
        { exam: "SSC CHSL Tier-1", year: "2023", shift: "CBT Shift-1", file: "SSC/CHSL/2023/SSC_CHSL_2023.pdf", available: true },
        { exam: "SSC CHSL Tier-1", year: "2022", shift: "CBT Shift-1", file: "SSC/CHSL/2022/SSC_CHSL_2022.pdf", available: true },
        { exam: "SSC CHSL Tier-1", year: "2021", shift: "CBT Shift-1", file: "SSC/CHSL/2021/SSC_CHSL_2021.pdf", available: true },
        { exam: "SSC CHSL Tier-1", year: "2020", shift: "CBT Shift-1", file: "SSC/CHSL/2020/SSC_CHSL_2020.pdf", available: true }
      ],
      "SSC JE (Electrical & Civil)": [
        { exam: "SSC JE Electrical", year: "2025", shift: "CBT Shift-1", file: "SSC/JE_EE/2025/SSC_JE_EE_2025.pdf", available: true },
        { exam: "SSC JE General", year: "2024", shift: "CBT Paper-1", file: "SSC/JE/2024/SSC_JE_2024.pdf", available: true },
        { exam: "SSC JE Electrical", year: "2024", shift: "CBT Paper-1", file: "SSC/JE_EE/2024/SSC_JE_EE_2024.pdf", available: true },
        { exam: "SSC JE Civil", year: "2023", shift: "CBT Paper-1", file: "SSC/JE_CE/2023/SSC_JE_CE_2023.pdf", available: true },
        { exam: "SSC JE Electrical", year: "2023", shift: "CBT Paper-1", file: "SSC/JE_EE/2023/SSC_JE_EE_2023.pdf", available: true },
        { exam: "SSC JE Electrical", year: "2022", shift: "CBT Paper-1", file: "SSC/JE_EE/2022/SSC_JE_EE_2022.pdf", available: true },
        { exam: "SSC JE Civil", year: "2020", shift: "CBT Paper-1", file: "SSC/JE_CE/2020/SSC_JE_CE_2020.pdf", available: true },
        { exam: "SSC JE Electrical", year: "2020", shift: "CBT Paper-1", file: "SSC/JE_EE/2020/SSC_JE_EE_2020.pdf", available: true }
      ],
      "SSC CPO SI": [
        { exam: "SSC CPO Sub-Inspector", year: "2025", shift: "Paper-1 CBT Shift-1", file: "SSC/CPO/2025/SSC_CPO_2025.pdf", available: true },
        { exam: "SSC CPO Sub-Inspector", year: "2024", shift: "Paper-1 CBT Master", file: "SSC/CPO/2024/SSC_CPO_2024.pdf", available: true },
        { exam: "SSC CPO Sub-Inspector", year: "2023", shift: "Paper-1 CBT Master", file: "SSC/CPO/2023/SSC_CPO_2023.pdf", available: true },
        { exam: "SSC CPO Sub-Inspector", year: "2022", shift: "Paper-1 CBT Master", file: "SSC/CPO/2022/SSC_CPO_2022.pdf", available: true },
        { exam: "SSC CPO Sub-Inspector", year: "2021", shift: "Paper-1 CBT Master", file: "SSC/CPO/2021/SSC_CPO_2021.pdf", available: true },
        { exam: "SSC CPO Sub-Inspector", year: "2020", shift: "Paper-1 CBT Master", file: "SSC/CPO/2020/SSC_CPO_2020.pdf", available: true }
      ],
      "SSC MTS": [
        { exam: "SSC MTS", year: "2024", shift: "CBT Shift-1", file: "SSC/MTS/2024/SSC_MTS_2024.pdf", available: true },
        { exam: "SSC MTS", year: "2023", shift: "CBT Shift-1", file: "SSC/MTS/2023/SSC_MTS_2023.pdf", available: true },
        { exam: "SSC MTS", year: "2022", shift: "CBT Shift-1", file: "SSC/MTS/2022/SSC_MTS_2022.pdf", available: true },
        { exam: "SSC MTS", year: "2021", shift: "CBT Shift-1", file: "SSC/MTS/2021/SSC_MTS_2021.pdf", available: true },
        { exam: "SSC MTS", year: "2020", shift: "CBT Shift-1", file: "SSC/MTS/2020/SSC_MTS_2020.pdf", available: true }
      ],
      "SSC GD Constable": [
        { exam: "SSC GD Constable", year: "2025", shift: "CBT Shift-1", file: "SSC/GD/2025/SSC_GD_2025.pdf", available: true },
        { exam: "SSC GD Constable", year: "2024", shift: "CBT Shift-1", file: "SSC/GD/2024/SSC_GD_2024.pdf", available: true },
        { exam: "SSC GD Constable", year: "2024", shift: "CBT Shift-2", file: "SSC/GD/2024/SSC_GD_2024_02.pdf", available: true },
        { exam: "SSC GD Constable", year: "2022", shift: "CBT Shift-1", file: "SSC/GD/2022/SSC_GD_2022.pdf", available: true }
      ],
      "SSC Stenographer (C & D)": [
        { exam: "SSC Stenographer Grade C & D", year: "2025", shift: "CBT Shift-1", file: "SSC/STENO/2025/SSC_STENO_2025.pdf", available: true },
        { exam: "SSC Stenographer Grade C & D", year: "2024", shift: "CBT Shift-1", file: "SSC/STENO/2024/SSC_STENO_2024.pdf", available: true },
        { exam: "SSC Stenographer Grade C & D", year: "2023", shift: "CBT Shift-1", file: "SSC/STENO/2023/SSC_STENO_2023.pdf", available: true },
        { exam: "SSC Stenographer Grade C & D", year: "2022", shift: "CBT Shift-1", file: "SSC/STENO/2022/SSC_STENO_2022.pdf", available: true },
        { exam: "SSC Stenographer Grade C & D", year: "2021", shift: "CBT Shift-1", file: "SSC/STENO/2021/SSC_STENO_2021.pdf", available: true },
        { exam: "SSC Stenographer Grade C & D", year: "2020", shift: "CBT Shift-1", file: "SSC/STENO/2020/SSC_STENO_2020.pdf", available: true }
      ],
      "SSC Selection Posts": [
        { exam: "SSC Selection Post", year: "2025", shift: "Phase Selection CBT", file: "SSC/SELPOST/2025/SSC_SELPOST_2025.pdf", available: true },
        { exam: "SSC Selection Post Phase XII", year: "2024", shift: "CBT Shift-1", file: "SSC/SELPOST/2024/SSC_SELPOST_2024.pdf", available: true },
        { exam: "SSC Selection Post Phase XI", year: "2023", shift: "CBT Shift-1", file: "SSC/SELPOST/2023/SSC_SELPOST_2023.pdf", available: true },
        { exam: "SSC Selection Post Phase X", year: "2022", shift: "CBT Shift-1", file: "SSC/SELPOST/2022/SSC_SELPOST_2022.pdf", available: true }
      ]
    }
  },
  RRB: {
    title: "Railway Recruitment Boards (RRB)",
    desc: "Technical, Graduate, and Non-Technical Railway Examination Master Question Papers.",
    folder: "pyq/RRB",
    subStreams: {
      "RRB NTPC": [
        { exam: "RRB NTPC Graduate", year: "2025", shift: "CBT Shift-1", file: "RRB/NTPC/2025/RRB_NTPC_2025.pdf", available: true },
        { exam: "RRB NTPC", year: "2024", shift: "CBT Shift-1", file: "RRB/NTPC/2024/RRB_NTPC_2024.pdf", available: true },
        { exam: "RRB NTPC", year: "2024", shift: "CBT Shift-2", file: "RRB/NTPC/2024/RRB_NTPC_2024_02.pdf", available: true },
        { exam: "RRB NTPC CBT-2", year: "2022", shift: "Level-6 Shift-1", file: "RRB/NTPC/2022/RRB_NTPC_2022.pdf", available: true },
        { exam: "RRB NTPC CBT-2", year: "2022", shift: "Level-5 Shift-1", file: "RRB/NTPC/2022/RRB_NTPC_2022_02.pdf", available: true },
        { exam: "RRB NTPC CBT-1", year: "2021", shift: "Phase-1 Shift-1", file: "RRB/NTPC/2021/RRB_NTPC_2021.pdf", available: true },
        { exam: "RRB NTPC CBT-1", year: "2020", shift: "Stage-1 Shift-1", file: "RRB/NTPC/2020/RRB_NTPC_2020.pdf", available: true }
      ],
      "RRB GROUP D": [
        { exam: "RRB Group D Level-1", year: "2024", shift: "CBT Shift-1", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024.pdf", available: true },
        { exam: "RRB Group D Level-1", year: "2024", shift: "CBT Shift-2", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_02.pdf", available: true },
        { exam: "RRB Group D Level-1", year: "2022", shift: "Phase-1 Shift-1", file: "RRB/GROUP_D/2022/RRB_GROUP_D_2022.pdf", available: true },
        { exam: "RRB Group D Level-1", year: "2022", shift: "Phase-1 Shift-2", file: "RRB/GROUP_D/2022/RRB_GROUP_D_2022_02.pdf", available: true }
      ],
      "RRB ALP & Tech": [
        { exam: "RRB ALP CBT-1", year: "2025", shift: "Stage-1 Shift-1", file: "RRB/ALP/2025/RRB_ALP_2025.pdf", available: true },
        { exam: "RRB ALP CBT-1", year: "2025", shift: "Stage-1 Shift-2", file: "RRB/ALP/2025/RRB_ALP_2025_02.pdf", available: true },
        { exam: "RRB ALP CBT-1", year: "2024", shift: "Stage-1 Shift-1", file: "RRB/ALP/2024/RRB_ALP_2024.pdf", available: true },
        { exam: "RRB ALP CBT-1", year: "2024", shift: "Stage-1 Shift-2", file: "RRB/ALP/2024/RRB_ALP_2024_02.pdf", available: true },
        { exam: "RRB ALP CBT-1", year: "2024", shift: "Stage-1 Shift-3", file: "RRB/ALP/2024/RRB_ALP_2024_03.pdf", available: true }
      ],
      "RRB JE": [
        { exam: "RRB Junior Engineer (JE)", year: "2022", shift: "CBT Stage Master Paper", file: "RRB/JE/2022/RRB_JE_2022.pdf", available: true }
      ],
      "RRB PARAMEDICAL": [
        { exam: "RRB Staff Nurse / Paramedical", year: "2025", shift: "CBT Shift-1", file: "RRB/PARAMEDICAL/2025/RRB_PARAMEDICAL_2025.pdf", available: true },
        { exam: "RRB Paramedical", year: "2024", shift: "CBT Master Paper", file: "RRB/PARAMEDICAL/2024/RRB_PARAMEDICAL_2024.pdf", available: true }
      ],
      "RRB Ministerial & Isolated": [
        { exam: "RRB Ministerial & Isolated", year: "2020", shift: "CBT Shift-1", file: "RRB/MINISTERIAL/2020/RRB_MINISTERIAL_2020.pdf", available: true }
      ]
    }
  },
  STATE_PSC: {
    title: "Andhra Pradesh (APPSC) & Telangana (TGPSC / TSPSC)",
    desc: "State Gazetted, Executive Services, and Assistant Executive Engineers (AEE) Master Papers.",
    folder: "pyq",
    subStreams: {
      "APPSC AEE": [
        { exam: "APPSC Assistant Executive Engineer (AEE)", year: "2024", shift: "Master Booklet Set-1", file: "APPSC/AEE/2024/APPSC_AEE_2024.pdf", available: true },
        { exam: "APPSC Assistant Executive Engineer (AEE)", year: "2024", shift: "Master Booklet Set-2", file: "APPSC/AEE/2024/APPSC_AEE_2024_02.pdf", available: true },
        { exam: "APPSC Assistant Executive Engineer (AEE)", year: "2024", shift: "Master Booklet Set-3", file: "APPSC/AEE/2024/APPSC_AEE_2024_03.pdf", available: true },
        { exam: "APPSC Assistant Executive Engineer (AEE)", year: "2024", shift: "Master Booklet Set-4", file: "APPSC/AEE/2024/APPSC_AEE_2024_04.pdf", available: true },
        { exam: "APPSC Assistant Executive Engineer (AEE)", year: "2024", shift: "Master Booklet Set-5", file: "APPSC/AEE/2024/APPSC_AEE_2024_05.pdf", available: true }
      ],
      "APPSC General Studies": [
        { exam: "APPSC General Studies & Mental Ability", year: "2024", shift: "Screening Set-1", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024.pdf", available: true },
        { exam: "APPSC General Studies & Mental Ability", year: "2024", shift: "Screening Set-2", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024_02.pdf", available: true },
        { exam: "APPSC General Studies & Mental Ability", year: "2024", shift: "Screening Set-3", file: "APPSC/GENERAL/2024/APPSC_GENERAL_2024_03.pdf", available: true },
        { exam: "APPSC Executive Screening", year: "2021", shift: "Official GS Paper", file: "APPSC/GENERAL/2021/APPSC_GENERAL_2021.pdf", available: true },
        { exam: "APPSC State Screening", year: "2020", shift: "Master Question Booklet", file: "APPSC/GENERAL/2020/APPSC_GENERAL_2020.pdf", available: true }
      ],
      "APPSC Technical (Engineering)": [
        { exam: "APPSC ECE Technical", year: "2024", shift: "Engineering Paper-2", file: "APPSC/ECE/2024/APPSC_ECE_2024.pdf", available: true },
        { exam: "APPSC CSE Technical", year: "2020", shift: "Engineering Paper-2", file: "APPSC/CSE/2020/APPSC_CSE_2020.pdf", available: true }
      ],
      "TSPSC / TGPSC Group-1 Services": [
        { exam: "TSPSC Group-1 Prelims", year: "2024", shift: "General Studies Master Booklet", file: "TSPSC/GROUP_1/2024/TSPSC_GROUP_1_2024.pdf", available: true }
      ]
    }
  },
  UPSC: {
    title: "Union Public Service Commission (UPSC)",
    desc: "Civil Services Preliminary GS-1 and CSAT Examination Master Question Papers.",
    folder: "pyq/UPSC",
    subStreams: {
      "UPSC CSE Prelims (GS-1)": [
        { exam: "UPSC Civil Services Prelims GS-1", year: "2024", shift: "Paper-I Series A", file: "UPSC/GS1/2024/UPSC_GS1_2024.pdf", available: true },
        { exam: "UPSC Civil Services Prelims GS-1", year: "2023", shift: "Paper-I Series A", file: "UPSC/GS1/2023/UPSC_GS1_2023.pdf", available: true }
      ],
      "UPSC CSE CSAT (Paper-2)": [
        { exam: "UPSC Civil Services CSAT", year: "2024", shift: "Paper-II Series A", file: "UPSC/CSAT/2024/UPSC_CSAT_2024.pdf", available: true },
        { exam: "UPSC Civil Services CSAT", year: "2023", shift: "Paper-II Series A", file: "UPSC/CSAT/2023/UPSC_CSAT_2023.pdf", available: true }
      ]
    }
  },
  BTECH: {
    title: "Undergraduate Engineering (B.Tech JNTU Regulations)",
    desc: "Autonomous & University Semester Final Examination Question Papers.",
    folder: "pyq/BTECH",
    subStreams: {
      "B.Tech EEE": [
        { exam: "B.Tech EEE (JNTU)", year: "2024", shift: "Power Systems & Machines", file: "BTECH/EEE/2024/BTECH_EEE_2024.pdf", available: false }
      ],
      "B.Tech CSE": [
        { exam: "B.Tech CSE (JNTU)", year: "2024", shift: "Data Structures & DBMS", file: "BTECH/CSE/2024/BTECH_CSE_2024.pdf", available: false }
      ],
      "B.Tech ECE": [
        { exam: "B.Tech ECE (JNTU)", year: "2024", shift: "Signals & Core Electronics", file: "BTECH/ECE/2024/BTECH_ECE_2024.pdf", available: false }
      ],
      "B.Tech CIVIL": [
        { exam: "B.Tech CIVIL (JNTU)", year: "2024", shift: "Structural Analysis & Mechanics", file: "BTECH/CIVIL/2024/BTECH_CIVIL_2024.pdf", available: false }
      ]
    }
  },
  ENTRANCE: {
    title: "National & State Entrance (JEE & EAMCET)",
    desc: "NTA JEE Main and AP/TG EAPCET Entrance Papers with Official Final Keys.",
    folder: "pyq/ENTRANCE",
    subStreams: {
      "JEE Main": [
        { exam: "NTA JEE Main", year: "2024", shift: "Session-1 Morning Shift (PCM)", file: "ENTRANCE/JEE/2024/JEE_MAIN_2024.pdf", available: false }
      ],
      "AP & TS EAMCET / EAPCET": [
        { exam: "AP & TS EAPCET / EAMCET", year: "2024", shift: "Engineering Stream Morning Shift", file: "ENTRANCE/EAMCET/2024/EAPCET_2024.pdf", available: false }
      ]
    }
  }
};

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function encodeStorageRelativePath(filePath) {
  return String(filePath || '')
    .split('/')
    .map(seg => encodeURIComponent(seg))
    .join('/');
}

function buildDistinctPaperHeading(examTitle, shiftText, filePath) {
  const cleanExam = String(examTitle || '').trim();
  const cleanShift = String(shiftText || '').trim();
  const fileBase = String(filePath || '').split('/').pop().replace(/\.pdf$/i, '');

  if (cleanShift && !cleanExam.toLowerCase().includes(cleanShift.toLowerCase())) {
    return `${cleanExam} • ${cleanShift}`;
  }
  if (fileBase) {
    return `${cleanExam} • ${fileBase}`;
  }
  return cleanExam;
}

function resolvePdfCandidates(filePath) {
  const raw = String(filePath || '').trim();
  if (!raw) return [];
  if (raw.startsWith('http')) return [raw];

  const candidates = [raw];
  if (!raw.endsWith('_EXAMRESIZER_CLEAN.pdf')) {
    candidates.push(raw.replace(/\.pdf$/i, '_EXAMRESIZER_CLEAN.pdf'));
  }
  if (!raw.endsWith('_Standardized_CLEAN.pdf')) {
    candidates.push(raw.replace(/\.pdf$/i, '_Standardized_CLEAN.pdf'));
  }
  candidates.push(raw.replace(/_S(\d+)\.pdf$/i, '_Set$1_EXAMRESIZER_CLEAN.pdf'));

  const unique = [...new Set(candidates)];
  return unique.map(rel => `${SUPABASE_STORAGE_BASE}/pyq/${encodeStorageRelativePath(rel)}`);
}

function getCatalogStats() {
  let totalCataloged = 0;
  let totalAvailable = 0;
  let sectorCataloged = 0;
  let sectorAvailable = 0;

  Object.keys(COMPREHENSIVE_AUTHORITY_CATALOG).forEach(authKey => {
    const authObj = COMPREHENSIVE_AUTHORITY_CATALOG[authKey];
    let authTotal = 0;
    let authAvail = 0;
    Object.values(authObj.subStreams || {}).forEach(list => {
      list.forEach(p => {
        if (p && p.file) {
          authTotal++;
          totalCataloged++;
          if (p.available === true) {
            authAvail++;
            totalAvailable++;
          }
        }
      });
    });
    if (authKey === currentAuthorityKey) {
      sectorCataloged = authTotal;
      sectorAvailable = authAvail;
    }
  });

  return { totalCataloged, totalAvailable, sectorCataloged, sectorAvailable };
}

function renderAvailableAuthorityTabs() {
  const nav = document.getElementById('authorityTabsNav');
  if (!nav) return;

  const keys = Object.keys(COMPREHENSIVE_AUTHORITY_CATALOG);
  nav.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2";
  const labelMap = {
    GATE: 'GATE',
    SSC: 'SSC',
    RRB: 'RRB',
    STATE_PSC: 'APPSC / TSPSC',
    BTECH: 'B.Tech (JNTU)',
    UPSC: 'UPSC',
    ENTRANCE: 'NEET / JEE',
    BANKING: 'Banking',
    PSU: 'PSU & Power',
    GENERAL: 'More PYQs'
  };

  nav.innerHTML = keys.map(k => {
    const active = k === currentAuthorityKey;
    return `<button type="button" data-auth-key="${escHtml(k)}" id="auth-btn-${escHtml(k)}" class="exam-btn ${active ? 'active' : ''} p-2.5 text-xs text-center">${escHtml(labelMap[k] || k)}</button>`;
  }).join('');

  nav.onclick = (e) => {
    const btn = e.target.closest('[data-auth-key]');
    if (btn) switchAuthority(btn.getAttribute('data-auth-key'));
  };
}

function switchAuthority(authKey) {
  if (!COMPREHENSIVE_AUTHORITY_CATALOG[authKey]) {
    authKey = Object.keys(COMPREHENSIVE_AUTHORITY_CATALOG)[0] || 'GATE';
  }
  currentAuthorityKey = authKey;
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[authKey];

  renderAvailableAuthorityTabs();

  const titleEl = document.getElementById('activeAuthorityTitle');
  const descEl = document.getElementById('activeAuthorityDesc');
  const countEl = document.getElementById('activeAuthorityCount');
  const stats = getCatalogStats();

  if (data && titleEl) titleEl.innerText = data.title;
  if (data && descEl) descEl.innerText = data.desc;
  if (countEl) {
    countEl.innerText = `Sector: ${stats.sectorCataloged} Papers (${stats.sectorAvailable} Live) • Total: ${stats.totalCataloged} Papers (${stats.totalAvailable} Live)`;
  }

  renderSubButtons();
}
window.switchAuthority = switchAuthority;

function getPyqSectorGuide(authKey) {
  const guides = {
    GATE: {
      title: 'GATE paper guide: pattern, strategy, and review',
      pattern: 'Check the year, paper code, question types, marking scheme, and General Aptitude weight. Cross-check the current syllabus and qualifying rules because an older paper is a pattern reference, not a current notification.',
      strategy: 'Time each subject attempt, separate recall errors from calculation errors, and revise weak units from a formula and concept sheet.',
      answer: 'Use an official answer key or response sheet to score honestly. Recheck numerical tolerance, units, and negative marking rather than changing answers merely to match a memory.',
      subjects: 'Maintain subject notes for core theory, standard formulas, assumptions, and solved PYQ patterns; include both direct and application-level questions.'
    },
    SSC: {
      title: 'SSC paper guide: sections, revision, and answer-key review',
      pattern: 'Review the split among Quantitative Aptitude, Reasoning, General Awareness, and English, plus shift and tier-specific instructions. Verify the latest exam notice before planning.',
      strategy: 'Attempt quick sections first, follow a section-wise time target, and keep a separate log for calculation and reading errors.',
      answer: 'Match responses only against an authentic key or response sheet. Question objections should be supported by the notice, syllabus, and reliable source.',
      subjects: 'Make concise notes for arithmetic shortcuts, vocabulary, grammar rules, one-liner polity/history/geography, and recent-current-affairs sources.'
    },
    RRB: {
      title: 'RRB paper guide: CBT pattern and post-specific preparation',
      pattern: 'Identify CBT stage, post, subject weight, time allocation, language, and negative marking. Technical subjects vary significantly across NTPC, JE, ALP, Group D, and paramedical posts.',
      strategy: 'Practise with the exact number of questions and use early screening questions to reserve time for technical or general-knowledge sections.',
      answer: 'Use the official key or response link for scoring; distinguish options due to missing concepts from mistakes caused by speed.',
      subjects: 'Create separate notes for the selected post: technical basics, railway awareness, arithmetic, reasoning, science, and general current affairs.'
    },
    STATE_PSC: {
      title: 'APPSC/TGPSC paper guide: syllabus and state-awareness review',
      pattern: 'Confirm paper number, optional or technical subject, screening stage, language, and official marks. APPSC and TGPSC post patterns are different and may change by recruitment.',
      strategy: 'Study state geography, economy, polity, history, schemes, and core subject notes in weekly cycles; practise writing and comprehension as required.',
      answer: 'Cross-check every doubtful answer with the official final key and notification syllabus. Do not reuse an unofficial key as proof for objections.',
      subjects: 'Maintain bilingual terminology, Andhra Pradesh/Telangana facts, constitutional provisions, public administration concepts, and technical formulas for selected posts.'
    },
    UPSC: {
      title: 'UPSC Prelims paper guide: elimination and revision method',
      pattern: 'Separate GS-1 scope, CSAT nature, number of questions, and official negative marking. Earlier papers help identify themes but do not replace the current syllabus.',
      strategy: 'Build elimination discipline, track confidence, and limit speculative attempts. In CSAT, practise reading comprehension and basic quantitative speed separately.',
      answer: 'Use the official key after a complete timed attempt. Review why correct options are valid and why alternatives are incorrect.',
      subjects: 'Notes should cover polity, economy, environment, geography, history, science, and current-affairs connections with sources and dates.'
    },
    BTECH: {
      title: 'B.Tech paper guide: university pattern and subject revision',
      pattern: 'Check semester regulations, branch, subject code, internal/external divisions, question type, and section instructions from the paper.',
      strategy: 'Classify questions by unit and derive each formula. Solve unit-wise PYQs before full timed papers so missing prerequisites are identified early.',
      answer: 'Compare only with prescribed textbooks, laboratory records, or faculty solution standards. University papers do not always publish a universal final key.',
      subjects: 'Build compact formula and theorem notes with units, assumptions, derivation steps, and common numerical traps.'
    },
    ENTRANCE: {
      title: 'JEE/entrance paper guide: attempt planning and topic review',
      pattern: 'Review the subject balance, section rules, integer or multiple-choice format, optional attempt limits, and marking method applicable to that NTA or state entrance session.',
      strategy: 'Use subject rotations, preserve short accuracy checks, and leave difficult calculation blocks for a planned second pass.',
      answer: 'Score with the official answer key and challenge windows rather than informal solution channels. Preserve response evidence and the exact question version.',
      subjects: 'Use concept maps for Physics, Chemistry, and Mathematics, with formula cards, reaction mechanisms, common approximations, and solved standard problem types.'
    }
  };
  return guides[authKey] || guides.GATE;
}

function renderPyqSectorGuide() {
  const guideEl = document.getElementById('pyqSectorGuide');
  if (!guideEl) return;
  const guide = getPyqSectorGuide(currentAuthorityKey);
  const titleEl = document.getElementById('pyqSectorGuideTitle');
  const overviewEl = document.getElementById('pyqSectorGuideOverview');
  if (titleEl) titleEl.textContent = guide.title;
  if (overviewEl) {
    overviewEl.innerHTML = `<strong class="text-white">Exam pattern overview:</strong> ${escHtml(guide.pattern)}`;
  }
}

function renderSubButtons() {
  const data = COMPREHENSIVE_AUTHORITY_CATALOG[currentAuthorityKey];
  const container = document.getElementById('streamSubButtonsContainer');
  if (!data || !container) return;

  const streams = Object.keys(data.subStreams);
  currentStreamKey = streams[0] || '';

  container.innerHTML = streams.map(st => {
    const isDefault = st === currentStreamKey;
    const count = (data.subStreams[st] || []).length;
    return `
      <button 
        type="button"
        data-stream-name="${escHtml(st)}"
        id="sub-btn-${sanitizeId(st)}"
        class="sub-stream-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
          isDefault 
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
            : 'bg-slate-800/60 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
        }">
        ${escHtml(st)} <span class="opacity-75">(${count})</span>
      </button>
    `;
  }).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-stream-name]');
    if (btn) switchStream(btn.getAttribute('data-stream-name'));
  };

  renderPyqSectorGuide();
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
  return String(str || '').replace(/[^a-zA-Z0-9]/g, '_');
}

// ----------------------------------------------------
// CARD GENERATOR (DISTINCT HEADINGS + VIEW ONLY)
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

  container.innerHTML = papers.map((p, idx) => {
    const hasOriginal = p.available === true;
    const examTitle = p.exam || currentStreamKey;
    const shiftText = p.shift || p.session || 'Master Paper';
    const distinctHeading = buildDistinctPaperHeading(examTitle, shiftText, p.file);

    return `
      <div class="p-4 rounded-xl glass-card border ${hasOriginal ? 'border-white/10 hover:border-amber-500/40' : 'border-white/5 opacity-70'} transition flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded ${hasOriginal ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400 border border-white/10'} text-[10px] font-extrabold uppercase">
              ${escHtml(p.year)} Examination
            </span>
            <span class="text-xs text-slate-300 font-semibold">${escHtml(shiftText)}</span>
            <span class="text-[10px] ${hasOriginal ? 'text-emerald-400' : 'text-amber-400'} font-bold">
              ${hasOriginal ? 'Verified Master Key' : 'File Updating Shortly'}
            </span>
          </div>
          <h4 class="font-bold text-white text-sm md:text-base">${escHtml(distinctHeading)}</h4>
          <p class="text-[11px] text-slate-400">Exam: ${escHtml(examTitle)} • Year: ${escHtml(p.year)} • Shift/Set: ${escHtml(shiftText)}</p>
        </div>
        
        ${hasOriginal ? `
          <button type="button" data-paper-idx="${idx}" class="px-5 py-2.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-lg flex-shrink-0 cursor-pointer">
            <span>👁️ View Paper</span>
          </button>
        ` : `
          <button type="button" disabled class="px-5 py-2.5 rounded-xl bg-slate-900/80 text-slate-500 font-bold text-xs flex items-center justify-center space-x-1.5 flex-shrink-0 cursor-not-allowed border border-white/5">
            <span>File Updating Shortly</span>
          </button>
        `}
      </div>
    `;
  }).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('[data-paper-idx]');
    if (!btn) return;
    const idx = Number(btn.getAttribute('data-paper-idx'));
    const paper = papers[idx];
    if (!paper || paper.available !== true) return;
    openPyqReader(
      paper.exam || currentStreamKey,
      paper.year,
      paper.shift || paper.session || 'Master Paper',
      data.title,
      paper.file
    );
  };
}

function buildShareablePaperUrl(filePath) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('pyq', filePath);
  return url.toString();
}

function sharePyqLink(examName, year, shiftName, filePath, btnEl) {
  const shareUrl = buildShareablePaperUrl(filePath);
  const shareTitle = `${examName} (${year} • ${shiftName}) - ExamResizer.me`;

  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: `View ${shareTitle} Question Paper on ExamResizer.me`,
      url: shareUrl
    }).catch(() => {});
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      if (btnEl) {
        const oldHtml = btnEl.innerHTML;
        btnEl.innerHTML = '<span>✅ Link Copied</span>';
        setTimeout(() => { btnEl.innerHTML = oldHtml; }, 2000);
      }
    }).catch(() => {
      window.prompt('Copy this PYQ link to share:', shareUrl);
    });
  } else {
    window.prompt('Copy this PYQ link to share:', shareUrl);
  }
}
window.sharePyqLink = sharePyqLink;

// ----------------------------------------------------
// FULL-PAGE PYQ READER (ZERO RIGHT-SIDE GAP + VIEW ONLY + SHARE + BACK)
// ----------------------------------------------------
function openPyqReader(examName, year, shiftName, bodyTitle, filePath) {
  const modal = document.getElementById('pyqReaderModal');
  if (!modal) return;

  document.body.style.overflow = 'hidden';

  modal.className = 'fixed inset-0 z-[70] bg-[#070a12] flex flex-col w-screen h-screen overflow-hidden';

  const innerCard = modal.firstElementChild;
  if (innerCard) {
    innerCard.className = 'w-full h-full max-w-none flex flex-col bg-[#090d16] overflow-hidden';
  }

  const distinctTitle = buildDistinctPaperHeading(examName, shiftName, filePath);
  const titleEl = document.getElementById('readerPaperTitle');
  const tagEl = document.getElementById('readerPaperTag');
  const subjEl = document.getElementById('readerMainSubject');
  const sessEl = document.getElementById('readerSessionInfo');

  if (titleEl) titleEl.innerText = `${distinctTitle} (${year})`;
  if (tagEl) tagEl.innerText = `${year} • ${String(shiftName).toUpperCase()}`;
  if (subjEl) subjEl.innerText = `${distinctTitle} — ${year}`;
  if (sessEl) sessEl.innerText = `${bodyTitle} • Read-Only Official Question Paper View`;

  const candidates = resolvePdfCandidates(filePath);
  const primaryUrl = candidates[0] || '';

  const shareBtn = document.getElementById('readerTopDownloadBtn');
  if (shareBtn) {
    shareBtn.innerHTML = '<span>🔗 Share</span>';
    shareBtn.disabled = false;
    shareBtn.setAttribute('aria-label', 'Share Question Paper Link');
    shareBtn.onclick = function () {
      sharePyqLink(examName, year, shiftName, filePath, shareBtn);
    };
  }

  const closeBtn = modal.querySelector('button[onclick*="closePyqReader"]');
  if (closeBtn) {
    closeBtn.className = 'px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 font-extrabold text-xs transition cursor-pointer';
    closeBtn.innerHTML = '← Back to PYQ Hub';
    closeBtn.onclick = function () {
      closePyqReader();
    };
  }

  const qBody = document.getElementById('readerQuestionsBody');
  if (qBody) {
    const altLinksHtml = candidates.slice(1).map((altUrl, i) =>
      `<a href="${altUrl}#toolbar=0&navpanes=0" target="pyqFrame" class="text-xs text-amber-400 underline mr-3">Alternate Path ${i + 2}</a>`
    ).join('');

    qBody.innerHTML = `
      <div class="rounded-xl border border-white/10 bg-black/50 overflow-hidden flex flex-col w-full">
        <div class="px-4 py-2 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Read-Only Archive Preview • ${escHtml(String(filePath).split('/').pop())}</span>
          <div>${altLinksHtml}</div>
        </div>
        <iframe name="pyqFrame" src="${primaryUrl}#toolbar=0&navpanes=0" class="w-full h-[76vh] border-none" title="${escHtml(distinctTitle)} (${escHtml(year)}) Question Paper"></iframe>
      </div>
    `;
  }

  try {
    const nextUrl = buildShareablePaperUrl(filePath);
    window.history.replaceState({ pyqFile: filePath }, '', nextUrl);
  } catch (_) {}

  modal.classList.remove('hidden');
}
window.openPyqReader = openPyqReader;

function closePyqReader() {
  const modal = document.getElementById('pyqReaderModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
  try {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);
  } catch (_) {}
}
window.closePyqReader = closePyqReader;

function openSharedPyqFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const sharedFile = params.get('pyq');
    if (!sharedFile) return;

    for (const authKey of Object.keys(COMPREHENSIVE_AUTHORITY_CATALOG)) {
      const auth = COMPREHENSIVE_AUTHORITY_CATALOG[authKey];
      for (const streamName of Object.keys(auth.subStreams)) {
        const match = (auth.subStreams[streamName] || []).find(p => p.file === sharedFile);
        if (match) {
          if (typeof window.switchZone === 'function') {
            window.switchZone('pyq-zone');
          }
          switchAuthority(authKey);
          switchStream(streamName);
          openPyqReader(match.exam || streamName, match.year, match.shift || match.session || 'Master Paper', auth.title, match.file);
          return;
        }
      }
    }
  } catch (_) {}
}

document.addEventListener('DOMContentLoaded', () => {
  switchAuthority('GATE');
  openSharedPyqFromUrl();
});
