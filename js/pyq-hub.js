// ====================================================================
// ðŸ›ï¸ EXAMRESIZER PRO - OFFICIAL MASTER PYQ REPOSITORY ENGINE (2020â€“2026)
// Generated from 367 Verified Supabase Master Papers
// Module: js/pyq-hub.js
// ====================================================================

let currentAuthorityKey = 'GATE';
let currentStreamKey = '';
const SUPABASE_STORAGE_BASE = "https://znkwwzasysqkvtclmktd.supabase.co/storage/v1/object/public/exam-papers";

const COMPREHENSIVE_AUTHORITY_CATALOG = {
  GATE: {
    title: "Graduate Aptitude Test in Engineering (GATE)",
    desc: "Verified GATE master question papers.",
    folder: "pyq/GATE",
    subStreams: {
      "GATE CE": [
        { exam: "GATE CE 2019", year: "2019", shift: "Master Paper", file: "GATE/CE/2019/GATE_CE_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2020", year: "2020", shift: "Master Paper", file: "GATE/CE/2020/GATE_CE_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2021", year: "2021", shift: "Master Paper", file: "GATE/CE/2021/GATE_CE_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2022", year: "2022", shift: "Master Paper", file: "GATE/CE/2022/GATE_CE_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2023", year: "2023", shift: "Master Paper", file: "GATE/CE/2023/GATE_CE_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2024 Set3", year: "2024", shift: "Set3", file: "GATE/CE/2024/GATE_CE_2024_Set3_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2024 Set4", year: "2024", shift: "Set4", file: "GATE/CE/2024/GATE_CE_2024_Set4_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2024 Set5", year: "2024", shift: "Set5", file: "GATE/CE/2024/GATE_CE_2024_Set5_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2025", year: "2025", shift: "Master Paper", file: "GATE/CE/2025/GATE_CE_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CE 2026", year: "2026", shift: "Master Paper", file: "GATE/CE/2026/GATE_CE_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE CH": [
        { exam: "GATE CH 2019", year: "2019", shift: "Master Paper", file: "GATE/CH/2019/GATE_CH_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2020", year: "2020", shift: "Master Paper", file: "GATE/CH/2020/GATE_CH_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2021", year: "2021", shift: "Master Paper", file: "GATE/CH/2021/GATE_CH_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2022", year: "2022", shift: "Master Paper", file: "GATE/CH/2022/GATE_CH_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2023", year: "2023", shift: "Master Paper", file: "GATE/CH/2023/GATE_CH_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2024 Set2", year: "2024", shift: "Set2", file: "GATE/CH/2024/GATE_CH_2024_Set2_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2024 Set3", year: "2024", shift: "Set3", file: "GATE/CH/2024/GATE_CH_2024_Set3_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2025", year: "2025", shift: "Master Paper", file: "GATE/CH/2025/GATE_CH_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CH 2026", year: "2026", shift: "Master Paper", file: "GATE/CH/2026/GATE_CH_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE CS": [
        { exam: "GATE CS 2019", year: "2019", shift: "Master Paper", file: "GATE/CS/2019/GATE_CS_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2020", year: "2020", shift: "Master Paper", file: "GATE/CS/2020/GATE_CS_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2021", year: "2021", shift: "Master Paper", file: "GATE/CS/2021/GATE_CS_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2022", year: "2022", shift: "Master Paper", file: "GATE/CS/2022/GATE_CS_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2023", year: "2023", shift: "Master Paper", file: "GATE/CS/2023/GATE_CS_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2024 Set1", year: "2024", shift: "Set1", file: "GATE/CS/2024/GATE_CS_2024_Set1_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2024 Set5", year: "2024", shift: "Set5", file: "GATE/CS/2024/GATE_CS_2024_Set5_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2024 Set6", year: "2024", shift: "Set6", file: "GATE/CS/2024/GATE_CS_2024_Set6_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2025", year: "2025", shift: "Master Paper", file: "GATE/CS/2025/GATE_CS_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE CS 2026", year: "2026", shift: "Master Paper", file: "GATE/CS/2026/GATE_CS_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE EC": [
        { exam: "GATE EC 2019", year: "2019", shift: "Master Paper", file: "GATE/EC/2019/GATE_EC_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2020", year: "2020", shift: "Master Paper", file: "GATE/EC/2020/GATE_EC_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2021", year: "2021", shift: "Master Paper", file: "GATE/EC/2021/GATE_EC_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2022", year: "2022", shift: "Master Paper", file: "GATE/EC/2022/GATE_EC_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2023", year: "2023", shift: "Master Paper", file: "GATE/EC/2023/GATE_EC_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2024 Set3", year: "2024", shift: "Set3", file: "GATE/EC/2024/GATE_EC_2024_Set3_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2024 Set7", year: "2024", shift: "Set7", file: "GATE/EC/2024/GATE_EC_2024_Set7_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2025", year: "2025", shift: "Master Paper", file: "GATE/EC/2025/GATE_EC_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EC 2026", year: "2026", shift: "Master Paper", file: "GATE/EC/2026/GATE_EC_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE EE": [
        { exam: "GATE EE 2019", year: "2019", shift: "Master Paper", file: "GATE/EE/2019/GATE_EE_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2020", year: "2020", shift: "Master Paper", file: "GATE/EE/2020/GATE_EE_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2021", year: "2021", shift: "Master Paper", file: "GATE/EE/2021/GATE_EE_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2022", year: "2022", shift: "Master Paper", file: "GATE/EE/2022/GATE_EE_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2024", year: "2024", shift: "Master Paper", file: "GATE/EE/2024/GATE_EE_2024_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2024 Set3", year: "2024", shift: "Set3", file: "GATE/EE/2024/GATE_EE_2024_Set3_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2024 Set8", year: "2024", shift: "Set8", file: "GATE/EE/2024/GATE_EE_2024_Set8_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2025", year: "2025", shift: "Master Paper", file: "GATE/EE/2025/GATE_EE_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE EE 2026", year: "2026", shift: "Master Paper", file: "GATE/EE/2026/GATE_EE_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE IN": [
        { exam: "GATE IN 2019", year: "2019", shift: "Master Paper", file: "GATE/IN/2019/GATE_IN_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2020", year: "2020", shift: "Master Paper", file: "GATE/IN/2020/GATE_IN_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2021", year: "2021", shift: "Master Paper", file: "GATE/IN/2021/GATE_IN_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2022", year: "2022", shift: "Master Paper", file: "GATE/IN/2022/GATE_IN_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2023", year: "2023", shift: "Master Paper", file: "GATE/IN/2023/GATE_IN_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2024 Set4", year: "2024", shift: "Set4", file: "GATE/IN/2024/GATE_IN_2024_Set4_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2024 Set5", year: "2024", shift: "Set5", file: "GATE/IN/2024/GATE_IN_2024_Set5_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2025", year: "2025", shift: "Master Paper", file: "GATE/IN/2025/GATE_IN_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE IN 2026", year: "2026", shift: "Master Paper", file: "GATE/IN/2026/GATE_IN_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "GATE ME": [
        { exam: "GATE ME 2019", year: "2019", shift: "Master Paper", file: "GATE/ME/2019/GATE_ME_2019_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2020", year: "2020", shift: "Master Paper", file: "GATE/ME/2020/GATE_ME_2020_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2021", year: "2021", shift: "Master Paper", file: "GATE/ME/2021/GATE_ME_2021_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2022", year: "2022", shift: "Master Paper", file: "GATE/ME/2022/GATE_ME_2022_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2023", year: "2023", shift: "Master Paper", file: "GATE/ME/2023/GATE_ME_2023_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2024 Set1", year: "2024", shift: "Set1", file: "GATE/ME/2024/GATE_ME_2024_Set1_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2024 Set2", year: "2024", shift: "Set2", file: "GATE/ME/2024/GATE_ME_2024_Set2_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2025", year: "2025", shift: "Master Paper", file: "GATE/ME/2025/GATE_ME_2025_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GATE ME 2026", year: "2026", shift: "Master Paper", file: "GATE/ME/2026/GATE_ME_2026_EXAMRESIZER_CLEAN.pdf", available: true }
      ]
    }
  },
  SSC: {
    title: "Staff Selection Commission (SSC)",
    desc: "Verified SSC CGL, CHSL, JE, CPO, GD, MTS & Stenographer papers.",
    folder: "pyq/SSC",
    subStreams: {
      "SSC CGL": [
        { exam: "SSC CGL 2023 Tier1 2023-07-14 Shift1 English", year: "2023", shift: "Tier1", file: "SSC/CGL/2023/SSC_CGL_2023_Tier1_2023-07-14_Shift1_English_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift1", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift10", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift11", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift12", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift2", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift3", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift4", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift5", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift6", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift7", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift8", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CGL 2026 Prelims Tier1 Shift9", year: "2026", shift: "Prelims", file: "SSC/CGL/2026/SSC_CGL_2026_Prelims_Tier1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC CHSL": [
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift10", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift11", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift12", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift2", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift3", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift5", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift6", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift7", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CHSL 2025 Prelims Tier1 Shift9", year: "2025", shift: "Prelims", file: "SSC/CHSL/2025/SSC_CHSL_2025_Prelims_Tier1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC CPO": [
        { exam: "SSC CPO 2025 Prelims Tier1 Shift1", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift10", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift11", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift12", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift2", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift3", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift4", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift5", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift6", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift7", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift8", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Prelims Tier1 Shift9", year: "2025", shift: "Prelims", file: "SSC/CPO/2025/SSC_CPO_2025_Prelims_Tier1_Shift9_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Tier1 Shift1", year: "2025", shift: "Tier1", file: "SSC/CPO/2025/SSC_CPO_2025_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Tier1 Shift2", year: "2025", shift: "Tier1", file: "SSC/CPO/2025/SSC_CPO_2025_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Tier1 Shift3", year: "2025", shift: "Tier1", file: "SSC/CPO/2025/SSC_CPO_2025_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC CPO 2025 Tier1 Shift4", year: "2025", shift: "Tier1", file: "SSC/CPO/2025/SSC_CPO_2025_Tier1_Shift4_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC GD": [
        { exam: "SSC GD 2026 Prelims Tier1 Shift1", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift10", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift11", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift12", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift2", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift3", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift4", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift5", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift6", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift7", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift8", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC GD 2026 Prelims Tier1 Shift9", year: "2026", shift: "Prelims", file: "SSC/GD/2026/SSC_GD_2026_Prelims_Tier1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC JE": [
        { exam: "SSC JE Civil PYQ November 14 2022 Shift 1 Do 2022 fccb69", year: "2022", shift: "Shift 1", file: "SSC/JE/2022/SSC_JE_Civil_PYQ_November_14__2022_Shift_1_Do_2022_fccb69_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil PYQ November 15 2022 Shift 3 Do 2022 a500d0", year: "2022", shift: "Shift 3", file: "SSC/JE/2022/SSC_JE_Civil_PYQ_November_15__2022_Shift_3_Do_2022_a500d0_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil PYQ November 16 2022 Shift 1 Do 2022 d282f2", year: "2022", shift: "Shift 1", file: "SSC/JE/2022/SSC_JE_Civil_PYQ_November_16__2022_Shift_1_Do_2022_d282f2_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Engineering Question Paper Octob 2023 1ad777", year: "2023", shift: "Master Paper", file: "SSC/JE/2023/SSC_JE_Civil_Engineering_Question_Paper_Octob_2023_1ad777_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Engineering Question Paper Octob 2023 55e2c4", year: "2023", shift: "Master Paper", file: "SSC/JE/2023/SSC_JE_Civil_Engineering_Question_Paper_Octob_2023_55e2c4_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Engineering Question Paper Octob 2023 b38797", year: "2023", shift: "Master Paper", file: "SSC/JE/2023/SSC_JE_Civil_Engineering_Question_Paper_Octob_2023_b38797_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 140001", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_140001_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 14edb0", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_14edb0_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 1db2e1", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_1db2e1_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 244b0d", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_244b0d_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 2cb633", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_2cb633_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 44b2b5", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_44b2b5_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 5b6c5c", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_5b6c5c_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 94b295", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_94b295_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 9a1675", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_9a1675_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 a61f60", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_a61f60_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 a9d792", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_a9d792_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 aba168", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_aba168_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 ca9de3", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_ca9de3_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 ec2349", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_ec2349_CLEAN.pdf", available: true },
        { exam: "Download Here 2024 f8323f", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/Download_Here_2024_f8323f_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Question Paper June 5 2024 Shif 2024 3f1628", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/SSC_JE_Civil_Question_Paper_June_5__2024_Shif_2024_3f1628_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Question Paper June 6 2024 Shif 2024 86fd4d", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/SSC_JE_Civil_Question_Paper_June_6__2024_Shif_2024_86fd4d_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Question Paper June 6 2024 Shif 2024 e41a4f", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/SSC_JE_Civil_Question_Paper_June_6__2024_Shif_2024_e41a4f_CLEAN.pdf", available: true },
        { exam: "SSC JE Civil Question Paper June 7 2024 Shif 2024 e7625d", year: "2024", shift: "Master Paper", file: "SSC/JE/2024/SSC_JE_Civil_Question_Paper_June_7__2024_Shif_2024_e7625d_CLEAN.pdf", available: true }
      ],
      "SSC MTS": [
        { exam: "SSC MTS 2024 Tier1 Shift3", year: "2024", shift: "Tier1", file: "SSC/MTS/2024/SSC_MTS_2024_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift1", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift10", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift11", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift12", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift2", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift3", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift4", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift5", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift6", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift7", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift8", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC MTS 2026 Prelims Tier1 Shift9", year: "2026", shift: "Prelims", file: "SSC/MTS/2026/SSC_MTS_2026_Prelims_Tier1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC SELECTION_POST": [
        { exam: "SSC SELECTION POST 2024 Prelims Tier1 Shift1", year: "2024", shift: "Prelims", file: "SSC/SELECTION_POST/2024/SSC_SELECTION_POST_2024_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true }
      ],
      "SSC STENOGRAPHER": [
        { exam: "SSC STENOGRAPHER 2024 Tier1 Shift1", year: "2024", shift: "Tier1", file: "SSC/STENOGRAPHER/2024/SSC_STENOGRAPHER_2024_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC STENOGRAPHER 2024 Tier1 Shift2", year: "2024", shift: "Tier1", file: "SSC/STENOGRAPHER/2024/SSC_STENOGRAPHER_2024_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SSC STENOGRAPHER 2024 Tier1 Shift3", year: "2024", shift: "Tier1", file: "SSC/STENOGRAPHER/2024/SSC_STENOGRAPHER_2024_Tier1_Shift3_Standardized_CLEAN.pdf", available: true }
      ]
    }
  },
  RRB: {
    title: "Railway Recruitment Boards (RRB)",
    desc: "Verified RRB NTPC, JE, ALP, Group D & Technician papers.",
    folder: "pyq/RRB",
    subStreams: {
      "RRB ALP": [
        { exam: "RRB ALP 2024 CBT1 Shift1", year: "2024", shift: "Shift1", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift2", year: "2024", shift: "Shift2", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift4", year: "2024", shift: "Shift4", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift5", year: "2024", shift: "Shift5", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift6", year: "2024", shift: "Shift6", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB ALP 2024 CBT1 Shift7", year: "2024", shift: "Shift7", file: "RRB/ALP/2024/RRB_ALP_2024_CBT1_Shift7_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB CE": [
        { exam: "Civil Engineering 22 April 2025 Shift 1 Down 2025 149fb2", year: "2025", shift: "Shift 1", file: "RRB/CE/2025/Civil_Engineering_22_April_2025__Shift_1_Down_2025_149fb2_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "RRB GROUP_1": [
        { exam: "TSPSC Group 1 2024 Prelims Shift1", year: "2024", shift: "Prelims", file: "RRB/GROUP_1/2024/TSPSC_Group_1_2024_Prelims_Shift1_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB GROUP_D": [
        { exam: "RRB GROUP D 2024 CBT1 Shift1", year: "2024", shift: "Shift1", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift10", year: "2024", shift: "Shift10", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift11", year: "2024", shift: "Shift11", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift11_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift12", year: "2024", shift: "Shift12", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift12_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift13", year: "2024", shift: "Shift13", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift13_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift14", year: "2024", shift: "Shift14", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift14_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift15", year: "2024", shift: "Shift15", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift15_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift16", year: "2024", shift: "Shift16", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift16_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift17", year: "2024", shift: "Shift17", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift17_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift18", year: "2024", shift: "Shift18", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift18_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift19", year: "2024", shift: "Shift19", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift19_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift2", year: "2024", shift: "Shift2", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift20", year: "2024", shift: "Shift20", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift20_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift21", year: "2024", shift: "Shift21", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift21_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift22", year: "2024", shift: "Shift22", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift22_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift23", year: "2024", shift: "Shift23", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift23_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift24", year: "2024", shift: "Shift24", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift24_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift25", year: "2024", shift: "Shift25", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift25_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift4", year: "2024", shift: "Shift4", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift5", year: "2024", shift: "Shift5", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift6", year: "2024", shift: "Shift6", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift7", year: "2024", shift: "Shift7", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift8", year: "2024", shift: "Shift8", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB GROUP D 2024 CBT1 Shift9", year: "2024", shift: "Shift9", file: "RRB/GROUP_D/2024/RRB_GROUP_D_2024_CBT1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB IBPS_RRB_PO": [
        { exam: "IBPS RRB PO 2025 Prelims Shift1", year: "2025", shift: "Prelims", file: "RRB/IBPS_RRB_PO/2025/IBPS_RRB_PO_2025_Prelims_Shift1_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB JE": [
        { exam: "RRB JE 2019 Prelims Shift1", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2019 Prelims Shift2", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2019 Prelims Shift3", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2019 Prelims Shift4", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2019 Prelims Shift5", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2019 Prelims Shift6", year: "2019", shift: "Prelims", file: "RRB/JE/2019/RRB_JE_2019_Prelims_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2024 CBT1 Live Shift3 English", year: "2024", shift: "Shift3", file: "RRB/JE/2024/RRB_JE_2024_CBT1_Live_Shift3_English_CLEAN.pdf", available: true },
        { exam: "RRB JE CBT 2 Electrical Engineering Question 2024 65b8fd", year: "2024", shift: "Master Paper", file: "RRB/JE/2024/RRB_JE_CBT_2_Electrical_Engineering_Question_2024_65b8fd_CLEAN.pdf", available: true },
        { exam: "RRB JE CBT 2 Mechanical Engineering Question 2024 d2e73c", year: "2024", shift: "Master Paper", file: "RRB/JE/2024/RRB_JE_CBT_2_Mechanical_Engineering_Question_2024_d2e73c_CLEAN.pdf", available: true },
        { exam: "Civil Engineering 4 June 2025 Shift 1 Re-Ex 2025 b7dae7", year: "2025", shift: "Shift 1", file: "RRB/JE/2025/Civil_Engineering_4_June_2025__Shift_1__Re-Ex_2025_b7dae7_CLEAN.pdf", available: true },
        { exam: "Electrical Engineering 4 June 2025 Shift 1 2025 e69136", year: "2025", shift: "Shift 1", file: "RRB/JE/2025/Electrical_Engineering_4_June_2025__Shift_1_2025_e69136_CLEAN.pdf", available: true },
        { exam: "Mechanical Engineering 22 April 2025 Shift 1 2025 89653e", year: "2025", shift: "Shift 1", file: "RRB/JE/2025/Mechanical_Engineering_22_April_2025__Shift_1_2025_89653e_CLEAN.pdf", available: true },
        { exam: "RRB JE 2025 CBT1 Live Shift2 English", year: "2025", shift: "Shift2", file: "RRB/JE/2025/RRB_JE_2025_CBT1_Live_Shift2_English_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_0d992b_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_1c789d_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_309b3d_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_3fd8ff_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_423e2b_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_426d5c_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_6d83c9_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_70ac7f_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_8d53ef_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_940d1e_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_a7572d_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_ad5dde_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_cc41fc_CLEAN.pdf", available: true },
        { exam: "RRB JE (2026)", year: "2026", shift: "Master Paper", file: "RRB/JE/2026/Download_PDF_2026_f1617c_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 CBT1 Live Shift1 English", year: "2026", shift: "Shift1", file: "RRB/JE/2026/RRB_JE_2026_CBT1_Live_Shift1_English_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift1", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift2", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift3", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift4", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift5", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB JE 2026 Prelims Shift6", year: "2026", shift: "Prelims", file: "RRB/JE/2026/RRB_JE_2026_Prelims_Shift6_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB NTPC": [
        { exam: "RRB NTPC 2024 CBT1 Shift10", year: "2024", shift: "Shift10", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift10_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift13", year: "2024", shift: "Shift13", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift13_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift14", year: "2024", shift: "Shift14", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift14_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift15", year: "2024", shift: "Shift15", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift15_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift16", year: "2024", shift: "Shift16", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift16_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift17", year: "2024", shift: "Shift17", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift17_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift18", year: "2024", shift: "Shift18", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift18_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift19", year: "2024", shift: "Shift19", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift19_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift2", year: "2024", shift: "Shift2", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift20", year: "2024", shift: "Shift20", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift20_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift21", year: "2024", shift: "Shift21", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift21_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift22", year: "2024", shift: "Shift22", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift22_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift4", year: "2024", shift: "Shift4", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift5", year: "2024", shift: "Shift5", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift6", year: "2024", shift: "Shift6", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift7", year: "2024", shift: "Shift7", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift8", year: "2024", shift: "Shift8", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB NTPC 2024 CBT1 Shift9", year: "2024", shift: "Shift9", file: "RRB/NTPC/2024/RRB_NTPC_2024_CBT1_Shift9_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB RPF_CONSTABLE": [
        { exam: "RPF CONSTABLE 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/RPF_CONSTABLE/2024/RPF_CONSTABLE_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB RPF_SI": [
        { exam: "RPF SI 2024 CBT1 Shift1", year: "2024", shift: "Shift1", file: "RRB/RPF_SI/2024/RPF_SI_2024_CBT1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RPF SI 2024 CBT1 Shift2", year: "2024", shift: "Shift2", file: "RRB/RPF_SI/2024/RPF_SI_2024_CBT1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RPF SI 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/RPF_SI/2024/RPF_SI_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RPF SI 2024 CBT1 Shift4", year: "2024", shift: "Shift4", file: "RRB/RPF_SI/2024/RPF_SI_2024_CBT1_Shift4_Standardized_CLEAN.pdf", available: true }
      ],
      "RRB TECHNICIAN": [
        { exam: "RRB TECHNICIAN 2024 CBT1 Shift1", year: "2024", shift: "Shift1", file: "RRB/TECHNICIAN/2024/RRB_TECHNICIAN_2024_CBT1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN 2024 CBT1 Shift2", year: "2024", shift: "Shift2", file: "RRB/TECHNICIAN/2024/RRB_TECHNICIAN_2024_CBT1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN 2024 CBT1 Shift3", year: "2024", shift: "Shift3", file: "RRB/TECHNICIAN/2024/RRB_TECHNICIAN_2024_CBT1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN 2024 CBT1 Shift4", year: "2024", shift: "Shift4", file: "RRB/TECHNICIAN/2024/RRB_TECHNICIAN_2024_CBT1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_2eb3bc_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_792ca1_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_9449f5_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_9b6381_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_9eed90_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_a62a1a_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_b80b97_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_bd7818_CLEAN.pdf", available: true },
        { exam: "RRB TECHNICIAN (2026)", year: "2026", shift: "Master Paper", file: "RRB/TECHNICIAN/2026/Download_PDF_2026_e20705_CLEAN.pdf", available: true }
      ]
    }
  },
  STATE_PSC: {
    title: "Andhra Pradesh (APPSC) & Telangana (TSPSC / TGPSC)",
    desc: "Verified APPSC & TSPSC/TGPSC papers.",
    folder: "pyq",
    subStreams: {
      "APPSC (CE)": [
        { exam: "Notification No 42-2011 Civil. Asst Surgeon", year: "2011", shift: "Master Paper", file: "APPSC/CE/2011/Notification_No_42-2011_Civil._Asst_Surgeon_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2049-2011 20Assistant 20Engineers Civil 20and 20Mechanical Common EA 632 2012 SERIES-C CIVILORMECHANICAL 20 COMMON -PAPER 20II", year: "2011", shift: "PAPER 20II", file: "APPSC/CE/2011/NotificationNo_2049-2011__20Assistant_20Engineers_Civil_20and_20Mechanical_Common__EA_632_2012_SERIES-C_CIVILORMECHANICAL_20_COMMON_-PAPER_20II_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification 20No 2006-2016-AEE-ScreeningTest Civil 20Engg EEA-STC-111-2016-Series-D", year: "2016", shift: "Master Paper", file: "APPSC/CE/2016/Notification_20No_2006-2016-AEE-ScreeningTest_Civil_20Engg_EEA-STC-111-2016-Series-D_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (CH)": [
        { exam: "Notification No. 02-2008 Inspector of Factories Chemical", year: "2008", shift: "Master Paper", file: "APPSC/CH/UNDATED/Notification_No._02-2008_Inspector_of_Factories__Chemical__EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (CS)": [
        { exam: "Lecturers in GDC Computer Science Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/CS/UNDATED/Lecturers_in_GDC_Computer_Science__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (EE)": [
        { exam: "Notification No. 02-2008 Inspector of Factories Electrical", year: "2008", shift: "Master Paper", file: "APPSC/EE/UNDATED/Notification_No._02-2008__Inspector_of_Factories__Electrical__EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (GENERAL_PAPER)": [
        { exam: "NotificationNo 2008-2010 Dental 20Assistant 20Surgeon SAD 585 2011 Series-C DentalSurgery-I PaperI", year: "2010", shift: "PaperI", file: "APPSC/GENERAL_PAPER/2010/NotificationNo_2008-2010_Dental_20Assistant_20Surgeon_SAD_585_2011_Series-C_DentalSurgery-I_PaperI_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2008-2010 Dental 20Assistant 20Surgeon SAD 586 2011 Series-C DentalSurgery-II PaperII", year: "2010", shift: "PaperII", file: "APPSC/GENERAL_PAPER/2010/NotificationNo_2008-2010_Dental_20Assistant_20Surgeon_SAD_586_2011_Series-C_DentalSurgery-II_PaperII_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Deputy Surveyors 27-2011", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/Deputy_Surveyors_27-2011_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No. 23-2011 Fisheries Devolopment Officers", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/Notification_No._23-2011_Fisheries_Devolopment_Officers_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No.07-2011 to 50-2008 Royalty Inspecotr in Director of Mines - Geology", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/Notification_No.07-2011_to_50-2008_Royalty_Inspecotr_in_Director_of_Mines_-_Geology_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No.46-2011 Town Planning Assistant", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/Notification_No.46-2011_Town_Planning_Assistant_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2011-2012 20Assistant 20Hydrologist HA 647 2012 Series-C Geology PaperII", year: "2011", shift: "PaperII", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2011-2012__20Assistant_20Hydrologist_HA_647_2012_Series-C_Geology_PaperII_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2011-2012 20Assistant 20Hydrologist HA 648 2012 Series-C Hydrology PaperII", year: "2011", shift: "PaperII", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2011-2012__20Assistant_20Hydrologist_HA_648_2012_Series-C_Hydrology_PaperII_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2011-2012 20and 2013-2012 Zilla 20Sainik 20WelfareOfficer OZ 556 2012 Series-C English PapeII 1", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2011-2012_20and_2013-2012_Zilla_20Sainik_20WelfareOfficer_OZ_556_2012_Series-C_English_PapeII_1_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2011-2012 20and 2013-2015 Zilla 20Sainik 20WelfareOfficer OZ 557-2012 Series-C ElementaryMathematics", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2011-2012_20and_2013-2015_Zilla_20Sainik_20WelfareOfficer_OZ_557-2012_Series-C_ElementaryMathematics_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2052-2008 Technical 20Assistant 20Hydrology HDAT 649 2011 Geology", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2052-2008_Technical_20Assistant_20Hydrology_HDAT_649_2011_Geology_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2052-2008 Technical 20Assistant 20Hydrology HDAT 650-2011-Hydrology", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2052-2008_Technical_20Assistant_20Hydrology_HDAT_650-2011-Hydrology_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2053-2008 20Assistant 20Hydrogeologist GHA 656 2011 Series-D Geology PaperII", year: "2011", shift: "PaperII", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2053-2008__20Assistant_20Hydrogeologist_GHA_656_2011_Series-D_Geology_PaperII_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2054-2008 Technical 20Assistant 20Hydrogeologist HGAT 651 2011 Geology", year: "2011", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2011/NotificationNo_2054-2008_Technical_20Assistant_20Hydrogeologist_HGAT_651_2011_Geology_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No.11-2012 Tech Asst.in Geophysics", year: "2012", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2012/Notification_No.11-2012_Tech_Asst.in_Geophysics_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2012-2012 20Assistant 20Hydrologist GAT 637 2012 Series-C GeoPhysics PaperII", year: "2012", shift: "PaperII", file: "APPSC/GENERAL_PAPER/2012/NotificationNo_2012-2012__20Assistant_20Hydrologist_GAT_637_2012_Series-C_GeoPhysics_PaperII_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2030-2008 GeneralScience 20and 20Mental 20Ability CommontoAll GS 500 2012 SERIES-B GS 20and 20MA", year: "2012", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2012/NotificationNo_2030-2008_GeneralScience_20and_20Mental_20Ability_CommontoAll_GS_500_2012_SERIES-B_GS_20and_20MA_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2015-2011 20and 2018-2011 PAPER 20III-Indian 20Economy 20and 20AP 20Economy- 20SAE 20- 20104 20- 202016", year: "2015", shift: "PAPER 20III", file: "APPSC/GENERAL_PAPER/2015/NotificationNo_2015-2011_20and_2018-2011_PAPER_20III-Indian_20Economy_20and_20AP_20Economy-_20SAE_20-_20104_20-_202016_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2015-2011 20and 2018-2011 PAPER 20IV-Science 20and 20Technology- 20SAE 20- 20105 20- 202016", year: "2015", shift: "PAPER 20IV", file: "APPSC/GENERAL_PAPER/2015/NotificationNo_2015-2011_20and_2018-2011_PAPER_20IV-Science_20and_20Technology-_20SAE_20-_20105_20-_202016_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "NotificationNo 2015-2011 20and 2018-2011 PAPER 20V-Data 20Appreciation 20and 20Interpretation- 20SAE-106-2016", year: "2015", shift: "PAPER 20V", file: "APPSC/GENERAL_PAPER/2015/NotificationNo_2015-2011_20and_2018-2011_PAPER_20V-Data_20Appreciation_20and_20Interpretation-_20SAE-106-2016_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification 20No 2006-2016-AEE-ScreeningTest Agricutural 20Engg EEA-STA-113-2016-Series-D", year: "2016", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/2016/Notification_20No_2006-2016-AEE-ScreeningTest_Agricutural_20Engg_EEA-STA-113-2016-Series-D_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "BOTANY", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/BOTANY_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "CHEMISTRY", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/CHEMISTRY_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "COMMERCE", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/COMMERCE_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "ECONOMICS", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/ECONOMICS_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "ENGLISH", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/ENGLISH_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "HISTORY", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/HISTORY_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Arabic Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Arabic__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Biochemistry Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Biochemistry__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Biotechnology Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Biotechnology__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Botany Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Botany__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Chemistry Notification no.05-2008", year: "2008", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Chemistry__Notification_no.05-2008_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Commerce Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Commerce__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Economics Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Economics__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC English Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_English__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Geology Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Geology__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Hindi Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Hindi__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC History Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_History__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Home Science Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Home_Science__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Mathematics Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Mathematics__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Micro Biology Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Micro_Biology__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Oriya Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Oriya__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Physics Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Physics__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Political Science Notification no.05-2008", year: "2008", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Political_Science__Notification_no.05-2008_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Public Administration Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Public_Administration__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Sanskrit Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Sanskrit__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC statistics Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_statistics__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Telugu Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Telugu__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Urdu Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Urdu__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers in GDC Zoology Notification no.43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_in_GDC_Zoology__Notification_no.43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Lecturers inGDC Computer Applications Notification no 43-11", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Lecturers_inGDC__Computer_Applications__Notification_no_43-11_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "MATHEMATICS", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/MATHEMATICS_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No. 48-2008", year: "2008", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Notification_No._48-2008_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No.44-2008 Town Planning Assistant", year: "2008", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/Notification_No.44-2008_Town_Planning_Assistant_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "ORIA", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/ORIA_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "PHYSICS", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/PHYSICS_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "POLITICAL 20SCIENCE", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/POLITICAL_20SCIENCE_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "PUBLIC 20ADMINISTRATION", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/PUBLIC_20ADMINISTRATION_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "SANSKRIT", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/SANSKRIT_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "TELUGU", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/TELUGU_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "URDU", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/URDU_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "ZOOLOGY", year: "Archive", shift: "Master Paper", file: "APPSC/GENERAL_PAPER/UNDATED/ZOOLOGY_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (GROUP_1)": [
        { exam: "Top 20 PYPs of APPSC Group I Services Exam 2024 7fa3c8", year: "2024", shift: "Master Paper", file: "APPSC/GROUP_1/2024/Top_20_PYPs_of_APPSC_Group_I_Services_Exam_2024_7fa3c8_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "APPSC (ME)": [
        { exam: "Notification 20No 2006-2016-AEE-ScreeningTest Mechanical 20Engg EEA-STM-112-2016-Series-D", year: "2016", shift: "Master Paper", file: "APPSC/ME/2016/Notification_20No_2006-2016-AEE-ScreeningTest_Mechanical_20Engg_EEA-STM-112-2016-Series-D_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "Notification No. 02-2008 Inspector of Factories Mechanical", year: "2008", shift: "Master Paper", file: "APPSC/ME/UNDATED/Notification_No._02-2008_Inspector_of_Factories__Mechanical__EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "TSPSC (CE)": [
        { exam: "TSPSC AEE Civil 2018 Official Paper Civil N 2024 610f4a", year: "2024", shift: "Master Paper", file: "TSPSC/CE/2024/TSPSC_AEE__Civil__2018_Official_Paper_Civil_N_2024_610f4a_CLEAN.pdf", available: true },
        { exam: "TSPSC AEE 2018 Civil Official Paper-II Paper- 2024 414bba", year: "2024", shift: "Master Paper", file: "TSPSC/CE/2024/TSPSC_AEE_2018_Civil_Official_Paper-II_Paper-_2024_414bba_CLEAN.pdf", available: true }
      ],
      "TSPSC (EE)": [
        { exam: "TSPSC AEE 22 Jan 2023 Electrical Electronic 2023 9f790b", year: "2023", shift: "Master Paper", file: "TSPSC/EE/2023/TSPSC_AEE_22_Jan_2023_Electrical___Electronic_2023_9f790b_CLEAN.pdf", available: true }
      ],
      "TSPSC (ME)": [
        { exam: "TSPSC AEE Mechanical Official Paper-II Held 2023 d773a3", year: "2023", shift: "Master Paper", file: "TSPSC/ME/2023/TSPSC_AEE_Mechanical_Official_Paper-II__Held_2023_d773a3_CLEAN.pdf", available: true }
      ]
    }
  },
  UPSC: {
    title: "Union Public Service Commission (UPSC)",
    desc: "Verified UPSC General Studies & NDA papers.",
    folder: "pyq/UPSC",
    subStreams: {
      "UPSC GENERAL_PAPER": [
        { exam: "Download Here 2024 db3c68", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_Here_2024_db3c68_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_3031c6_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_47bdec_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_64c11e_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_6f7aa5_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_7772ee_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC GENERAL_PAPER (2024)", year: "2024", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2024/Download_PDF_2024_85d8c7_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "GS Paper 4 PDF 2024 3e89cf", year: "2024", shift: "GS Paper 4", file: "UPSC/GENERAL_PAPER/2024/GS_Paper_4_PDF_2024_3e89cf_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC 2025 previous year papers 2025 6f8bc5", year: "2025", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2025/UPSC_2025_previous_year_papers_2025_6f8bc5_EXAMRESIZER_CLEAN.pdf", available: true },
        { exam: "UPSC 2026 previous year papers 2026 6b4fd8", year: "2026", shift: "Master Paper", file: "UPSC/GENERAL_PAPER/2026/UPSC_2026_previous_year_papers_2026_6b4fd8_EXAMRESIZER_CLEAN.pdf", available: true }
      ],
      "UPSC NDA": [
        { exam: "NDA 1 Download PDF 2022 46b66d", year: "2022", shift: "NDA 1", file: "UPSC/NDA/2022/NDA_1_Download_PDF_2022_46b66d_EXAMRESIZER_CLEAN.pdf", available: true }
      ]
    }
  },
  BANKING: {
    title: "Banking & Financial Recruitments (IBPS / SBI)",
    desc: "Verified IBPS & SBI papers.",
    folder: "pyq/BANKING",
    subStreams: {
      "BANKING IBPS_CLERK": [
        { exam: "IBPS Clerk 2021 Prelims Shift1", year: "2021", shift: "Prelims", file: "BANKING/IBPS_CLERK/2021/IBPS_Clerk_2021_Prelims_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2021 Prelims Shift2", year: "2021", shift: "Prelims", file: "BANKING/IBPS_CLERK/2021/IBPS_Clerk_2021_Prelims_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2024 Mains Shift1", year: "2024", shift: "Mains", file: "BANKING/IBPS_CLERK/2024/IBPS_Clerk_2024_Mains_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2024 Mains Shift2", year: "2024", shift: "Mains", file: "BANKING/IBPS_CLERK/2024/IBPS_Clerk_2024_Mains_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2024 Mains Shift3", year: "2024", shift: "Mains", file: "BANKING/IBPS_CLERK/2024/IBPS_Clerk_2024_Mains_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2024 Shift5", year: "2024", shift: "Shift5", file: "BANKING/IBPS_CLERK/2024/IBPS_Clerk_2024_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS Clerk 2024 Shift6", year: "2024", shift: "Shift6", file: "BANKING/IBPS_CLERK/2024/IBPS_Clerk_2024_Shift6_Standardized_CLEAN.pdf", available: true }
      ],
      "BANKING IBPS_PO": [
        { exam: "IBPS PO 2023 Prelims Tier1 Shift1", year: "2023", shift: "Prelims", file: "BANKING/IBPS_PO/2023/IBPS_PO_2023_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2023 Prelims Tier1 Shift5", year: "2023", shift: "Prelims", file: "BANKING/IBPS_PO/2023/IBPS_PO_2023_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift1", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift3", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift5", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift6", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift7", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "IBPS PO 2024 Prelims Tier1 Shift8", year: "2024", shift: "Prelims", file: "BANKING/IBPS_PO/2024/IBPS_PO_2024_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true }
      ],
      "BANKING SBI_CLERK": [
        { exam: "SBI CLERK 2022 Prelims Tier1 Shift1", year: "2022", shift: "Prelims", file: "BANKING/SBI_CLERK/2022/SBI_CLERK_2022_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2022 Prelims Tier1 Shift2", year: "2022", shift: "Prelims", file: "BANKING/SBI_CLERK/2022/SBI_CLERK_2022_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2022 Prelims Tier1 Shift3", year: "2022", shift: "Prelims", file: "BANKING/SBI_CLERK/2022/SBI_CLERK_2022_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift1", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift2", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift3", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift4", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift4_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift5", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift5_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift6", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift7", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI CLERK 2024 Prelims Tier1 Shift8", year: "2024", shift: "Prelims", file: "BANKING/SBI_CLERK/2024/SBI_CLERK_2024_Prelims_Tier1_Shift8_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI Clerk Prelims Memory Based Paper (Held On 22 February 2025 Shift 2) English", year: "2025", shift: "Prelims", file: "BANKING/SBI_CLERK/2025/SBI Clerk Prelims Memory Based Paper (Held On 22 February 2025 Shift 2) English_CLEAN.pdf", available: true },
        { exam: "SBI Clerk 2025 Prelims Shift1", year: "2025", shift: "Prelims", file: "BANKING/SBI_CLERK/2025/SBI_Clerk_2025_Prelims_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI Clerk 2025 Prelims Shift2", year: "2025", shift: "Prelims", file: "BANKING/SBI_CLERK/2025/SBI_Clerk_2025_Prelims_Shift2_Standardized_CLEAN.pdf", available: true }
      ],
      "BANKING SBI_PO": [
        { exam: "SBI PO 2020 Mains Tier2 Shift3", year: "2020", shift: "Mains", file: "BANKING/SBI_PO/2020/SBI_PO_2020_Mains_Tier2_Shift3_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI PO 2020 Prelims Tier1 Shift1", year: "2020", shift: "Prelims", file: "BANKING/SBI_PO/2020/SBI_PO_2020_Prelims_Tier1_Shift1_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI PO 2020 Prelims Tier1 Shift2", year: "2020", shift: "Prelims", file: "BANKING/SBI_PO/2020/SBI_PO_2020_Prelims_Tier1_Shift2_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI PO Prelims Memory Based Paper (Held on 17th December 2022 Shift 2) (English)", year: "2022", shift: "Prelims", file: "BANKING/SBI_PO/2022/SBI PO Prelims Memory Based Paper (Held on 17th December 2022 Shift 2) (English)_CLEAN.pdf", available: true },
        { exam: "SBI PO 2024 Prelims Shift6", year: "2024", shift: "Prelims", file: "BANKING/SBI_PO/2024/SBI_PO_2024_Prelims_Shift6_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI PO 2024 Prelims Shift7", year: "2024", shift: "Prelims", file: "BANKING/SBI_PO/2024/SBI_PO_2024_Prelims_Shift7_Standardized_CLEAN.pdf", available: true },
        { exam: "SBI PO 2024 Prelims Shift8", year: "2024", shift: "Prelims", file: "BANKING/SBI_PO/2024/SBI_PO_2024_Prelims_Shift8_Standardized_CLEAN.pdf", available: true }
      ]
    }
  },
  PSU: {
    title: "Public Sector Undertakings & Power (PGCIL / DRDO / PSUs)",
    desc: "Verified PSU & technical papers.",
    folder: "pyq/PSU",
    subStreams: {
      "PSU CE": [
        { exam: "2023 PGCIL DT Civil Official Paper Download H 2023 cf8995", year: "2023", shift: "Master Paper", file: "PSU/CE/2023/2023_PGCIL_DT_Civil_Official_Paper_Download_H_2023_cf8995_CLEAN.pdf", available: true },
        { exam: "PSU CE (2023)", year: "2023", shift: "Master Paper", file: "PSU/CE/2023/Download_PDF_2023_56f6ed_CLEAN.pdf", available: true },
        { exam: "PSU CE (2024)", year: "2024", shift: "Master Paper", file: "PSU/CE/2024/Download_PDF_2024_bd987d_CLEAN.pdf", available: true },
        { exam: "PSU CE (2025)", year: "2025", shift: "Master Paper", file: "PSU/CE/2025/Download_PDF_2025_97d8d4_CLEAN.pdf", available: true }
      ],
      "PSU DRDO": [
        { exam: "PSU DRDO (2024)", year: "2024", shift: "Master Paper", file: "PSU/DRDO/2024/Download_PDF_2024_d1edcb_CLEAN.pdf", available: true },
        { exam: "PSU DRDO (2024)", year: "2024", shift: "Master Paper", file: "PSU/DRDO/2024/Download_PDF_2024_d5913e_CLEAN.pdf", available: true },
        { exam: "PSU DRDO (2024)", year: "2024", shift: "Master Paper", file: "PSU/DRDO/2024/Download_PDF_2024_d7f5b4_CLEAN.pdf", available: true },
        { exam: "PSU DRDO (2024)", year: "2024", shift: "Master Paper", file: "PSU/DRDO/2024/Download_PDF_2024_e1ec3c_CLEAN.pdf", available: true },
        { exam: "PSU DRDO (2024)", year: "2024", shift: "Master Paper", file: "PSU/DRDO/2024/Download_PDF_2024_fab3ef_CLEAN.pdf", available: true }
      ],
      "PSU EC": [
        { exam: "PGCIL Diploma Trainee Electronics Official 2023 df34c6", year: "2023", shift: "Master Paper", file: "PSU/EC/2023/PGCIL_Diploma_Trainee__Electronics__Official_2023_df34c6_CLEAN.pdf", available: true },
        { exam: "PSU EC (2024)", year: "2024", shift: "Master Paper", file: "PSU/EC/2024/Download_PDF_2024_410de3_CLEAN.pdf", available: true },
        { exam: "PSU EC (2025)", year: "2025", shift: "Master Paper", file: "PSU/EC/2025/Download_PDF_2025_481101_CLEAN.pdf", available: true }
      ],
      "PSU EE": [
        { exam: "2022 PGCIL NER DT Electrical Official Paper D 2022 9f3da0", year: "2022", shift: "Master Paper", file: "PSU/EE/2022/2022_PGCIL_NER_DT_Electrical_Official_Paper_D_2022_9f3da0_CLEAN.pdf", available: true },
        { exam: "PSU EE (2023)", year: "2023", shift: "Master Paper", file: "PSU/EE/2023/Download_PDF_2023_f828b9_CLEAN.pdf", available: true },
        { exam: "PGCIL Previous Year Question Papers for Elect 2023 685cfd", year: "2023", shift: "Master Paper", file: "PSU/EE/2023/PGCIL_Previous_Year_Question_Papers_for_Elect_2023_685cfd_CLEAN.pdf", available: true },
        { exam: "PSU EE (2024)", year: "2024", shift: "Master Paper", file: "PSU/EE/2024/Download_PDF_2024_5aa6e8_CLEAN.pdf", available: true },
        { exam: "PSU EE (2025)", year: "2025", shift: "Master Paper", file: "PSU/EE/2025/Download_PDF_2025_d234de_CLEAN.pdf", available: true }
      ],
      "PSU ME": [
        { exam: "PSU ME (2023)", year: "2023", shift: "Master Paper", file: "PSU/ME/2023/Download_PDF_2023_e865f7_CLEAN.pdf", available: true },
        { exam: "PSU ME (2024)", year: "2024", shift: "Master Paper", file: "PSU/ME/2024/Download_PDF_2024_7c08c2_CLEAN.pdf", available: true },
        { exam: "PSU ME (2025)", year: "2025", shift: "Master Paper", file: "PSU/ME/2025/Download_PDF_2025_5d0208_CLEAN.pdf", available: true }
      ],
      "PSU TECHNICIAN": [
        { exam: "PSU TECHNICIAN (2024)", year: "2024", shift: "Master Paper", file: "PSU/TECHNICIAN/2024/Download_PDF_2024_847c1b_CLEAN.pdf", available: true }
      ]
    }
  },
  GENERAL: {
    title: "Additional Verified Papers",
    desc: "Verified examination papers cataloged from storage.",
    folder: "pyq",
    subStreams: {
      "GENERAL GENERAL_PAPER": [
        { exam: "ee 2023", year: "2023", shift: "Master Paper", file: "GENERAL/GENERAL_PAPER/2023/ee_2023_EXAMRESIZER_CLEAN.pdf", available: true }
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
    overviewEl.innerHTML = `<strong class="text-white">Exam pattern overview:</strong> ${guide.pattern}`;
  }
}

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
              â€¢ ${hasOriginal ? 'Official Master Key Verified' : 'File Updating Shortly'}
            </span>
          </div>
          <h4 class="font-bold text-white text-sm md:text-base">${currentStreamKey}</h4>
          <p class="text-[11px] text-slate-400">Authentic Government Master Question Paper</p>
        </div>
        
        ${hasOriginal ? `
          <button onclick="openPyqReader('${safeStream}', '${p.year}', '${safeTitle}', '${p.file}')" class="px-5 py-2.5 rounded-xl luxury-action-btn text-black font-extrabold text-xs transition flex items-center justify-center space-x-2 shadow-lg flex-shrink-0 cursor-pointer">
            <span>ðŸ‘ï¸ View / Download</span>
          </button>
        ` : `
          <button disabled class="px-5 py-2.5 rounded-xl bg-slate-900/80 text-slate-500 font-bold text-xs flex items-center justify-center space-x-1.5 flex-shrink-0 cursor-not-allowed border border-white/5">
            <span>ðŸ”’ File Updating Shortly</span>
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
  document.getElementById('readerSessionInfo').innerText = `${body} â€¢ Official Session ${year}`;

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

