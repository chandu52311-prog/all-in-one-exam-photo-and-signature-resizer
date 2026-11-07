/**
 * ExamResizer Pro - Core Photo & Signature Engine (js/resizer.js)
 * 100% Client-Side HTML5 Canvas Binary Search Compression
 * Zero server uploads | Exact official KB & dimension presets
 */

const EXAM_PRESETS = {
  SSC: {
    photo: { minKb: 20, maxKb: 45, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 18, width: 400, height: 200, desc: "10 KB to 20 KB | 4.0 cm × 2.0 cm" }
  },
  UPSC: {
    photo: { minKb: 20, maxKb: 250, width: 550, height: 550, desc: "20 KB to 300 KB | Minimum 350×350 px" },
    sign:  { minKb: 20, maxKb: 250, width: 550, height: 550, desc: "20 KB to 300 KB | Minimum 350×350 px" }
  },
  IBPS: {
    photo: { minKb: 20, maxKb: 45, width: 200, height: 230, desc: "20 KB to 50 KB | 200×230 px" },
    sign:  { minKb: 10, maxKb: 18, width: 400, height: 200, desc: "10 KB to 20 KB | Black Ink on White" }
  },
  RRB: {
    photo: { minKb: 30, maxKb: 65, width: 350, height: 450, desc: "30 KB to 70 KB | Clear Plain Background" },
    sign:  { minKb: 15, maxKb: 28, width: 400, height: 200, desc: "15 KB to 30 KB | Running Handwriting" }
  },
  NTA: {
    photo: { minKb: 10, maxKb: 180, width: 400, height: 500, desc: "10 KB to 200 KB | 80% Face Coverage" },
    sign:  { minKb: 4,  maxKb: 28,  width: 400, height: 180, desc: "4 KB to 30 KB | Clear White Paper" }
  },
  GATE: {
    photo: { minKb: 10, maxKb: 180, width: 350, height: 450, desc: "10 KB to 200 KB | Formal Attire" },
    sign:  { minKb: 5,  maxKb: 85,  width: 400, height: 200, desc: "5 KB to 100 KB | Crisp Dark Ink" }
  },
  APPSC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | 3.5 cm × 1.5 cm" }
  },
  TGPSC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | 3.5 cm × 1.5 cm" }
  },
  TNPSC: {
    photo: { minKb: 20, maxKb: 50, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 20, width: 400, height: 150, desc: "10 KB to 20 KB | 3.5 cm × 1.5 cm" }
  },
  KPSC: {
    photo: { minKb: 20, maxKb: 50, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 40, width: 400, height: 150, desc: "10 KB to 40 KB | 3.5 cm × 1.5 cm" }
  },
  KERALAPSC: {
    photo: { minKb: 15, maxKb: 30, width: 150, height: 200, desc: "Up to 30 KB | 150×200 px" },
    sign:  { minKb: 10, maxKb: 30, width: 150, height: 100, desc: "Up to 30 KB | 150×100 px" }
  },
  MPSC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 20, width: 400, height: 150, desc: "10 KB to 20 KB | 3.5 cm × 1.5 cm" }
  },
  UPPSC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | White Background" },
    sign:  { minKb: 10, maxKb: 20, width: 350, height: 150, desc: "10 KB to 20 KB | Dark Ink" }
  },
  BPSC: {
    photo: { minKb: 15, maxKb: 25, width: 350, height: 450, desc: "Up to 25 KB | Official Format" },
    sign:  { minKb: 8,  maxKb: 15, width: 400, height: 150, desc: "Up to 15 KB | Running Handwriting" }
  },
  RPSC: {
    photo: { minKb: 50, maxKb: 95, width: 350, height: 450, desc: "50 KB to 100 KB | Color Photo" },
    sign:  { minKb: 20, maxKb: 48, width: 400, height: 150, desc: "20 KB to 50 KB | Crisp Signature" }
  },
  WBPSC: {
    photo: { minKb: 20, maxKb: 95, width: 350, height: 450, desc: "20 KB to 100 KB | Standard Size" },
    sign:  { minKb: 10, maxKb: 20, width: 400, height: 150, desc: "10 KB to 20 KB | Clear Background" }
  },
  OPSC: {
    photo: { minKb: 20, maxKb: 95, width: 350, height: 450, desc: "20 KB to 100 KB | Clear Passport Photo" },
    sign:  { minKb: 20, maxKb: 48, width: 400, height: 150, desc: "20 KB to 50 KB | Blue/Black Ink" }
  },
  GENERIC_PSC: {
    photo: { minKb: 20, maxKb: 95, width: 350, height: 450, desc: "20 KB to 100 KB | 3.5 cm × 4.5 cm" },
    sign:  { minKb: 10, maxKb: 48, width: 400, height: 150, desc: "10 KB to 50 KB | 3.5 cm × 1.5 cm" }
  },
  AP_PSU: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | AP Power Utility Standard" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | 3.5 cm × 1.5 cm" }
  },
  TG_PSU: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | TS Power Utility Standard" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | 3.5 cm × 1.5 cm" }
  },
  PGCIL_NTPC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | Formal White Background" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | Black Ink" }
  },
  BHEL_ONGC: {
    photo: { minKb: 20, maxKb: 48, width: 350, height: 450, desc: "20 KB to 50 KB | Central PSU Standard" },
    sign:  { minKb: 10, maxKb: 28, width: 350, height: 150, desc: "10 KB to 30 KB | Crisp Signature" }
  },
  GENERIC_PSU: {
    photo: { minKb: 20, maxKb: 95, width: 350, height: 450, desc: "20 KB to 100 KB | Standard PSU Format" },
    sign:  { minKb: 10, maxKb: 48, width: 400, height: 150, desc: "10 KB to 50 KB | Plain White Sheet" }
  }
};

const EXAM_LABELS = {
  SSC: 'SSC', UPSC: 'UPSC', IBPS: 'IBPS / SBI',
  RRB: 'Railway RRB', NTA: 'NTA NEET/JEE', GATE: 'GATE',
  STATE_PSC: 'State PSC', PSU_HUB: 'Power PSUs',
  APPSC: 'APPSC', TGPSC: 'TGPSC / TSPSC', TNPSC: 'TNPSC', KPSC: 'KPSC', KERALAPSC: 'Kerala PSC',
  MPSC: 'Maharashtra MPSC', UPPSC: 'UPPSC', BPSC: 'Bihar BPSC', RPSC: 'Rajasthan RPSC',
  WBPSC: 'West Bengal PSC', OPSC: 'Odisha OPSC', GENERIC_PSC: 'State PSC Exam',
  AP_PSU: 'APTRANSCO / APGENCO', TG_PSU: 'TSTRANSCO / TSGENCO',
  PGCIL_NTPC: 'PowerGrid / NTPC', BHEL_ONGC: 'BHEL / ONGC / Maharatna',
  GENERIC_PSU: 'Public Sector Enterprise'
};

let currentExam = 'SSC';
let currentState = 'APPSC';
let currentPsu = 'AP_PSU';
let currentMode = 'photo';
let rawImage = null;
let outputBlob = null;
let outputUrl = null;

const $ = (id) => document.getElementById(id);

function getActivePresetKey() {
  if (currentExam === 'STATE_PSC') return currentState;
  if (currentExam === 'PSU_HUB') return currentPsu;
  return currentExam;
}

function updateDownloadBtn() {
  const btn = $('downloadBtn');
  if (btn) {
    btn.innerText = '📥 Download Resized File';
    btn.style.background = '#10b981';
    btn.disabled = false;
  }
}

function triggerDownload() {
  if (!outputUrl) return;
  const key = getActivePresetKey();
  const a = document.createElement('a');
  a.href = outputUrl;
  const ext = outputUrl.includes('image/png') ? '.png' : '.jpg';
  a.download = key + '_' + currentMode.toUpperCase() + '_' + Date.now() + ext;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a && a.parentNode) document.body.removeChild(a);
  }, 500);
  updateDownloadBtn();
}

function resetOutput() {
  const card = $('outputCard');
  if (card) card.style.display = 'none';
  if (outputUrl) { 
    URL.revokeObjectURL(outputUrl); 
    outputUrl = null; 
  }
  outputBlob = null;
}

function updateUI() {
  const activeKey = getActivePresetKey();
  const spec = EXAM_PRESETS[activeKey][currentMode];
  const modeLabel = currentMode === 'photo' ? 'Passport Photo' : 'Signature';
  const examLabel = EXAM_LABELS[activeKey] || activeKey;

  const indicator = $('activeExamIndicator');
  if (indicator) indicator.innerText = examLabel;

  const specInfo = $('specInfo');
  if (specInfo) specInfo.innerText = '⚡ ' + examLabel + ' ' + modeLabel + ': ' + spec.desc;

  const modeIcon = $('modeIcon');
  if (modeIcon) modeIcon.innerText = currentMode === 'photo' ? '📷' : '✍️';

  const uploadMainText = $('uploadMainText');
  if (uploadMainText) uploadMainText.innerText = 'Tap to Select ' + modeLabel;

  const genBtn = $('generateBtn');
  if (genBtn) genBtn.innerText = currentMode === 'photo' ? '⚡ Generate Your Photo' : '⚡ Generate Your Signature';

  document.querySelectorAll('.exam-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-exam') === currentExam);
  });

  const tabPhoto = $('tabPhoto');
  const tabSign = $('tabSign');
  if (tabPhoto) tabPhoto.classList.toggle('active', currentMode === 'photo');
  if (tabSign) tabSign.classList.toggle('active', currentMode === 'sign');

  const stateBox = $('stateSelectorBox');
  const psuBox = $('psuSelectorBox');
  if (stateBox) stateBox.style.display = (currentExam === 'STATE_PSC') ? 'block' : 'none';
  if (psuBox) psuBox.style.display = (currentExam === 'PSU_HUB') ? 'block' : 'none';

  resetOutput();
}

function clearSelectedImage() {
  rawImage = null;
  const prev = $('inputPreview');
  if (prev) {
    prev.style.display = 'none';
    prev.removeAttribute('src');
  }
  const prompt = $('uploadPrompt');
  if (prompt) prompt.style.display = 'flex';
  const fileInp = $('fileInput');
  if (fileInp) fileInp.value = '';
}

function setMode(mode) {
  if (mode !== currentMode) clearSelectedImage();
  currentMode = mode;
  updateUI();
}

function drawToCanvas(img, w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w; 
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  const srcRatio = img.width / img.height;
  const dstRatio = w / h;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  
  if (srcRatio > dstRatio) { 
    sw = img.height * dstRatio; 
    sx = (img.width - sw) / 2; 
  } else { 
    sh = img.width / dstRatio; 
    sy = (img.height - sh) / 2; 
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  return canvas;
}

function toBlobAsync(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

// Binary Search Compression Engine
async function compressToTarget(img, spec) {
  const maxBytes = spec.maxKb * 1024;
  const minBytes = spec.minKb * 1024;
  let w = spec.width, h = spec.height;

  let canvas = drawToCanvas(img, w, h);
  let blob = await toBlobAsync(canvas, 0.98);

  if (blob && blob.size < minBytes) {
    for (let scale = 1.1; scale <= 2.2; scale += 0.15) {
      let scaledW = Math.round(spec.width * scale);
      let scaledH = Math.round(spec.height * scale);
      let scCanvas = drawToCanvas(img, scaledW, scaledH);
      let scBlob = await toBlobAsync(scCanvas, 0.95);

      if (scBlob.size >= minBytes && scBlob.size <= maxBytes) {
        return { blob: scBlob, w: scaledW, h: scaledH };
      }
      if (scBlob.size > maxBytes) break;
      blob = scBlob;
      w = scaledW;
      h = scaledH;
    }
    return { blob: blob, w: w, h: h };
  }

  if (blob && blob.size > maxBytes) {
    for (let attempt = 0; attempt < 5; attempt++) {
      let lo = 0.1, hi = 0.95, bestBlob = null;
      for (let i = 0; i < 8; i++) {
        let mid = (lo + hi) / 2;
        let b = await toBlobAsync(canvas, mid);
        if (b.size <= maxBytes) {
          bestBlob = b;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      if (bestBlob && bestBlob.size >= minBytes) {
        return { blob: bestBlob, w: w, h: h };
      }
      w = Math.round(w * 0.92);
      h = Math.round(h * 0.92);
      canvas = drawToCanvas(img, w, h);
    }
  }

  return { blob: blob, w: w, h: h };
}

// Event Listeners Registration
function initResizerEngine() {
  document.querySelectorAll('.exam-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget || e.target.closest('.exam-btn');
      if (target && target.dataset.exam) {
        currentExam = target.dataset.exam;
        updateUI();
      }
    });
  });

  const stateDrop = $('stateDropdown');
  if (stateDrop) {
    stateDrop.addEventListener('change', (e) => {
      currentState = e.target.value;
      updateUI();
    });
  }

  const psuDrop = $('psuDropdown');
  if (psuDrop) {
    psuDrop.addEventListener('change', (e) => {
      currentPsu = e.target.value;
      updateUI();
    });
  }

  const tabP = $('tabPhoto');
  if (tabP) tabP.addEventListener('click', () => setMode('photo'));

  const tabS = $('tabSign');
  if (tabS) tabS.addEventListener('click', () => setMode('sign'));

  const uploadBox = $('uploadBox');
  if (uploadBox) uploadBox.addEventListener('click', () => $('fileInput').click());

  const fileInput = $('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { 
        alert('Please select an image file (JPG, JPEG or PNG).'); 
        return; 
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          rawImage = img;
          const prev = $('inputPreview');
          prev.src = ev.target.result;
          prev.style.display = 'block';
          $('uploadPrompt').style.display = 'none';
          resetOutput();
        };
        img.onerror = () => alert('Could not read this image. Please try another file.');
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  const genBtn = $('generateBtn');
  if (genBtn) {
    genBtn.addEventListener('click', async () => {
      if (!rawImage) { alert('Please select an image first.'); return; }
      const originalText = genBtn.innerText;
      genBtn.disabled = true;
      genBtn.innerText = '⏳ Processing...';
      try {
        const activeKey = getActivePresetKey();
        const spec = EXAM_PRESETS[activeKey][currentMode];
        const result = await compressToTarget(rawImage, spec);
        if (!result || !result.blob) throw new Error('Compression failed');
        
        resetOutput();
        outputBlob = result.blob;
        outputUrl = URL.createObjectURL(outputBlob);
        $('outputImg').src = outputUrl;

        const kb = (outputBlob.size / 1024).toFixed(1);
        const pill = $('verifiedPill');
        if (outputBlob.size < spec.minKb * 1024) {
          pill.className = 'verified-pill warn';
          pill.innerText = '⚠️ ' + kb + ' KB — below the ' + spec.minKb + ' KB minimum. Try a sharper source photo.';
        } else {
          pill.className = 'verified-pill';
          pill.innerText = '✅ ' + kb + ' KB | ' + result.w + '×' + result.h + ' px — Image Ready to Download';
        }
        updateDownloadBtn();
        const card = $('outputCard');
        card.style.display = 'flex';
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        alert('Something went wrong while resizing. Please try a different image.');
      } finally {
        genBtn.disabled = false;
        genBtn.innerText = originalText;
      }
    });
  }

  const downloadBtnEl = $('downloadBtn');
  if (downloadBtnEl) {
    downloadBtnEl.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      triggerDownload();
    });
  }

  updateUI();
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResizerEngine);
} else {
  initResizerEngine();
}
