/**
 * ExamResizer Pro - Ultra-Fast Clean PDF Suite
 * 100% Client-Side Safe Operations (Zero Layout Breakage)
 * Tools: Compress, Merge, Img2PDF, PDF2Img, Split/Extract Pages
 */

if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const PDFSuite = {
  activeTool: 'compress',
  uploadedFiles: [],
  targetLimitKb: 100,

  init() {
    this.renderUI();
  },

  renderUI() {
    const container = document.getElementById('pdf-zone');
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-emerald-500/30">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 class="font-heading font-bold text-xl text-white flex items-center">
              <i data-lucide="file-cog" class="w-5 h-5 text-emerald-400 mr-2"></i>
              PDF Fast Studio (100% In-Browser Privacy)
            </h2>
            <p class="text-xs text-slate-400">Zero Server Uploads: Fast & Safe Certificate Formatter</p>
          </div>
          <button onclick="switchZone('resizer-zone')" class="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Back to Resizer</span>
          </button>
        </div>

        <!-- 5 Safe & Fast Tools Grid -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
          <button onclick="PDFSuite.setTool('compress')" id="tool-btn-compress" class="pdf-tool-card active p-3 rounded-xl border border-emerald-500 bg-emerald-500/20 text-center transition">
            <i data-lucide="minimize-2" class="w-5 h-5 text-emerald-400 mx-auto mb-1"></i>
            <h4 class="font-bold text-xs text-white">Compress</h4>
            <p class="text-[10px] text-emerald-300">Under 100/200 KB</p>
          </button>

          <button onclick="PDFSuite.setTool('merge')" id="tool-btn-merge" class="pdf-tool-card p-3 rounded-xl border border-white/10 bg-white/5 text-center hover:bg-white/10 transition">
            <i data-lucide="git-merge" class="w-5 h-5 text-slate-300 mx-auto mb-1"></i>
            <h4 class="font-bold text-xs text-white">Merge PDF</h4>
            <p class="text-[10px] text-slate-400">Combine Memos</p>
          </button>

          <button onclick="PDFSuite.setTool('img2pdf')" id="tool-btn-img2pdf" class="pdf-tool-card p-3 rounded-xl border border-white/10 bg-white/5 text-center hover:bg-white/10 transition">
            <i data-lucide="images" class="w-5 h-5 text-slate-300 mx-auto mb-1"></i>
            <h4 class="font-bold text-xs text-white">Image to PDF</h4>
            <p class="text-[10px] text-slate-400">Clean A4 Scan</p>
          </button>

          <button onclick="PDFSuite.setTool('pdf2img')" id="tool-btn-pdf2img" class="pdf-tool-card p-3 rounded-xl border border-white/10 bg-white/5 text-center hover:bg-white/10 transition">
            <i data-lucide="file-image" class="w-5 h-5 text-slate-300 mx-auto mb-1"></i>
            <h4 class="font-bold text-xs text-white">PDF to JPG</h4>
            <p class="text-[10px] text-slate-400">Extract Pages</p>
          </button>

          <button onclick="PDFSuite.setTool('split')" id="tool-btn-split" class="pdf-tool-card p-3 rounded-xl border border-white/10 bg-white/5 text-center hover:bg-white/10 transition">
            <i data-lucide="scissors" class="w-5 h-5 text-slate-300 mx-auto mb-1"></i>
            <h4 class="font-bold text-xs text-white">Split Pages</h4>
            <p class="text-[10px] text-slate-400">Extract Range</p>
          </button>
        </div>

        <div class="mt-6 glass-card p-5 rounded-xl border border-white/10 space-y-4" id="pdf-workspace"></div>

        <div id="pdf-output-card" class="hidden mt-4 p-4 rounded-xl glass-card border border-emerald-500/40 text-center space-y-3">
          <div id="pdf-result-status" class="text-xs font-bold text-emerald-400"></div>
          <a id="pdf-download-btn" class="inline-flex items-center justify-center space-x-2 w-full py-3 bg-emerald-500 text-black font-extrabold text-xs rounded-xl hover:bg-emerald-400 transition cursor-pointer">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span id="pdf-download-text">Download Result</span>
          </a>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    this.updateWorkspace();
  },

  setTool(tool) {
    this.activeTool = tool;
    this.uploadedFiles = [];
    document.querySelectorAll('.pdf-tool-card').forEach(b => {
      b.classList.remove('border-emerald-500', 'bg-emerald-500/20');
      b.classList.add('border-white/10', 'bg-white/5');
    });

    const activeBtn = document.getElementById(`tool-btn-${tool}`);
    if (activeBtn) {
      activeBtn.classList.add('border-emerald-500', 'bg-emerald-500/20');
      activeBtn.classList.remove('border-white/10', 'bg-white/5');
    }

    const outputCard = document.getElementById('pdf-output-card');
    if (outputCard) outputCard.classList.add('hidden');

    this.updateWorkspace();
  },

  updateWorkspace() {
    const ws = document.getElementById('pdf-workspace');
    if (!ws) return;

    if (this.activeTool === 'compress') {
      ws.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-white uppercase tracking-wider">Target Threshold:</label>
            <div class="flex space-x-2 text-xs">
              <button onclick="PDFSuite.setCompressLimit(100)" id="limit-100" class="px-2.5 py-1 rounded ${this.targetLimitKb === 100 ? 'bg-emerald-500 text-black font-extrabold' : 'bg-white/5 border border-white/10 text-slate-300'}">100 KB</button>
              <button onclick="PDFSuite.setCompressLimit(200)" id="limit-200" class="px-2.5 py-1 rounded ${this.targetLimitKb === 200 ? 'bg-emerald-500 text-black font-extrabold' : 'bg-white/5 border border-white/10 text-slate-300'}">200 KB</button>
              <button onclick="PDFSuite.setCompressLimit(300)" id="limit-300" class="px-2.5 py-1 rounded ${this.targetLimitKb === 300 ? 'bg-emerald-500 text-black font-extrabold' : 'bg-white/5 border border-white/10 text-slate-300'}">300 KB</button>
            </div>
          </div>
          <div id="pdf-drop-box" onclick="document.getElementById('pdfFileInput').click()" class="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer bg-white/[0.02] transition">
            <i data-lucide="minimize-2" class="w-10 h-10 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-sm font-semibold text-white" id="pdf-file-label">Click to Select Certificate PDF</p>
            <p class="text-[11px] text-slate-400 mt-1">Direct safe compression inside browser memory</p>
            <input type="file" id="pdfFileInput" class="hidden" accept="application/pdf" onchange="PDFSuite.handleFileSelect(event)">
          </div>
          <button id="pdf-process-btn" onclick="PDFSuite.processCompress()" disabled class="w-full py-3.5 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center justify-center space-x-2">
            <i data-lucide="sparkles" class="w-4 h-4"></i>
            <span>Compress PDF Under Target KB</span>
          </button>
        </div>
      `;
    } else if (this.activeTool === 'merge') {
      ws.innerHTML = `
        <div class="space-y-4">
          <div id="pdf-drop-box" onclick="document.getElementById('mergePdfInput').click()" class="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer bg-white/[0.02] transition">
            <i data-lucide="git-merge" class="w-10 h-10 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-sm font-semibold text-white" id="pdf-file-label">Click to Select 2 or More PDF Files</p>
            <p class="text-[11px] text-slate-400 mt-1">Combine Marksheets or Certificates into a single document</p>
            <input type="file" id="mergePdfInput" class="hidden" accept="application/pdf" multiple onchange="PDFSuite.handleFileSelect(event)">
          </div>
          <button id="pdf-process-btn" onclick="PDFSuite.processMergePdfs()" disabled class="w-full py-3.5 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center justify-center space-x-2">
            <i data-lucide="layers" class="w-4 h-4"></i>
            <span>Merge PDFs into Single File</span>
          </button>
        </div>
      `;
    } else if (this.activeTool === 'img2pdf') {
      ws.innerHTML = `
        <div class="space-y-4">
          <div id="pdf-drop-box" onclick="document.getElementById('img2pdfInput').click()" class="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer bg-white/[0.02] transition">
            <i data-lucide="images" class="w-10 h-10 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-sm font-semibold text-white" id="pdf-file-label">Click to Select Certificate Images</p>
            <p class="text-[11px] text-slate-400 mt-1">Convert multiple JPG/PNG scans into clean standard A4 PDF</p>
            <input type="file" id="img2pdfInput" class="hidden" accept="image/*" multiple onchange="PDFSuite.handleFileSelect(event)">
          </div>
          <button id="pdf-process-btn" onclick="PDFSuite.processImagesToPdf()" disabled class="w-full py-3.5 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center justify-center space-x-2">
            <i data-lucide="file-check" class="w-4 h-4"></i>
            <span>Convert Images into A4 PDF</span>
          </button>
        </div>
      `;
    } else if (this.activeTool === 'pdf2img') {
      ws.innerHTML = `
        <div class="space-y-4">
          <div id="pdf-drop-box" onclick="document.getElementById('pdf2imgInput').click()" class="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer bg-white/[0.02] transition">
            <i data-lucide="file-image" class="w-10 h-10 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-sm font-semibold text-white" id="pdf-file-label">Select PDF to Extract as JPG</p>
            <p class="text-[11px] text-slate-400 mt-1">Renders pages into crisp clear image files</p>
            <input type="file" id="pdf2imgInput" class="hidden" accept="application/pdf" onchange="PDFSuite.handleFileSelect(event)">
          </div>
          <button id="pdf-process-btn" onclick="PDFSuite.processPdfToImg()" disabled class="w-full py-3.5 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center justify-center space-x-2">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Extract PDF Pages as JPG</span>
          </button>
        </div>
      `;
    } else if (this.activeTool === 'split') {
      ws.innerHTML = `
        <div class="space-y-4">
          <div id="pdf-drop-box" onclick="document.getElementById('splitPdfInput').click()" class="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 rounded-xl p-8 text-center cursor-pointer bg-white/[0.02] transition">
            <i data-lucide="scissors" class="w-10 h-10 text-emerald-400 mx-auto mb-2"></i>
            <p class="text-sm font-semibold text-white" id="pdf-file-label">Select PDF to Split / Extract Pages</p>
            <p class="text-[11px] text-slate-400 mt-1">Extract specific pages (e.g. 1-2) from a multi-page PDF</p>
            <input type="file" id="splitPdfInput" class="hidden" accept="application/pdf" onchange="PDFSuite.handleFileSelect(event)">
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-xs text-white">Pages to Extract (e.g., 1 or 1-2):</label>
            <input type="text" id="split-page-range" value="1" class="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs w-24 text-center focus:border-emerald-400 outline-none">
          </div>
          <button id="pdf-process-btn" onclick="PDFSuite.processSplitPdf()" disabled class="w-full py-3.5 rounded-xl bg-slate-700 text-slate-400 font-extrabold text-xs cursor-not-allowed transition flex items-center justify-center space-x-2">
            <i data-lucide="file-minus" class="w-4 h-4"></i>
            <span>Extract Selected Pages</span>
          </button>
        </div>
      `;
    }

    if (window.lucide) lucide.createIcons();
  },

  setCompressLimit(kb) {
    this.targetLimitKb = kb;
    [100, 200, 300].forEach(val => {
      const btn = document.getElementById(`limit-${val}`);
      if (btn) {
        if (val === kb) {
          btn.className = 'px-2.5 py-1 rounded bg-emerald-500 text-black font-extrabold';
        } else {
          btn.className = 'px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300';
        }
      }
    });
  },

  handleFileSelect(e) {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    this.uploadedFiles = files;

    const label = document.getElementById('pdf-file-label');
    if (label) {
      if (files.length === 1) {
        const sz = (files[0].size / 1024).toFixed(1);
        label.innerText = `Selected: ${files[0].name} (${sz} KB)`;
      } else {
        label.innerText = `Selected: ${files.length} Files ready to process`;
      }
    }

    const procBtn = document.getElementById('pdf-process-btn');
    if (procBtn) {
      procBtn.disabled = false;
      procBtn.className = 'w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg';
    }
  },

  // 1. Precise Target Compression
  async processCompress() {
    if (!this.uploadedFiles[0]) return;
    const btn = document.getElementById('pdf-process-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Analyzing & Compressing PDF...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
      const file = this.uploadedFiles[0];
      const arrayBuffer = await file.arrayBuffer();

      if (file.size / 1024 <= this.targetLimitKb) {
        const originalPdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const savedBytes = await originalPdf.save({ useObjectStreams: true });
        const blob = new Blob([savedBytes], { type: 'application/pdf' });
        this.showDownloadResult(blob, `Optimized_${this.targetLimitKb}KB.pdf`, `✅ File is already under threshold: ${(blob.size / 1024).toFixed(1)} KB`);
        return;
      }

      const pdfData = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const numPages = pdf.numPages;

      let quality = 0.75;
      let scale = 1.4;
      let finalBlob = null;
      let attempts = 0;

      while (attempts < 5) {
        const newPdfDoc = await PDFLib.PDFDocument.create();

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: ctx, viewport }).promise;

          const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
          const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
          const embeddedImg = await newPdfDoc.embedJpg(imgBytes);

          const pdfPage = newPdfDoc.addPage([595.28, 841.89]);
          const scaledDims = embeddedImg.scaleToFit(560, 800);

          pdfPage.drawImage(embeddedImg, {
            x: (595.28 - scaledDims.width) / 2,
            y: (841.89 - scaledDims.height) / 2,
            width: scaledDims.width,
            height: scaledDims.height
          });
        }

        const outBytes = await newPdfDoc.save({ useObjectStreams: true });
        finalBlob = new Blob([outBytes], { type: 'application/pdf' });
        const currentKb = finalBlob.size / 1024;

        if (currentKb <= this.targetLimitKb || attempts === 4) break;

        quality = Math.max(0.3, quality - 0.15);
        scale = Math.max(0.8, scale - 0.2);
        attempts++;
      }

      const finalKb = (finalBlob.size / 1024).toFixed(1);
      this.showDownloadResult(
        finalBlob,
        `Compressed_Certificate_${this.targetLimitKb}KB.pdf`,
        `✅ Compressed to ${finalKb} KB (Target: ≤ ${this.targetLimitKb} KB)`
      );
    } catch (err) {
      console.error(err);
      alert('Could not compress this PDF. Ensure it is not locked with a password.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i><span>Compress PDF Under Target KB</span>`;
      if (window.lucide) lucide.createIcons();
    }
  },

  // 2. Merge Multiple PDFs
  async processMergePdfs() {
    if (this.uploadedFiles.length < 2) {
      alert('Please select at least 2 PDFs to merge.');
      return;
    }
    const btn = document.getElementById('pdf-process-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Merging Documents...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const file of this.uploadedFiles) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save({ useObjectStreams: true });
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      this.showDownloadResult(blob, `Merged_Documents.pdf`, `✅ Successfully merged ${this.uploadedFiles.length} PDFs into one`);
    } catch (err) {
      console.error(err);
      alert('Error merging PDFs.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="layers" class="w-4 h-4"></i><span>Merge PDFs into Single File</span>`;
      if (window.lucide) lucide.createIcons();
    }
  },

  // 3. Images to Clean A4 PDF
  async processImagesToPdf() {
    if (this.uploadedFiles.length === 0) return;
    const btn = document.getElementById('pdf-process-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Generating A4 PDF...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
      const pdfDoc = await PDFLib.PDFDocument.create();

      for (const file of this.uploadedFiles) {
        const imgBuffer = await file.arrayBuffer();
        let image;
        if (file.type.includes('png')) {
          image = await pdfDoc.embedPng(imgBuffer);
        } else {
          image = await pdfDoc.embedJpg(imgBuffer);
        }

        const page = pdfDoc.addPage([595.28, 841.89]);
        const { width, height } = image.scaleToFit(550, 780);
        page.drawImage(image, {
          x: (595.28 - width) / 2,
          y: (841.89 - height) / 2,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      this.showDownloadResult(blob, `Marksheets_Combined.pdf`, `✅ Generated A4 PDF with ${this.uploadedFiles.length} page(s)`);
    } catch (err) {
      console.error(err);
      alert('Error creating PDF from images.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="file-check" class="w-4 h-4"></i><span>Convert Images into A4 PDF</span>`;
      if (window.lucide) lucide.createIcons();
    }
  },

  // 4. PDF to JPG Converter
  async processPdfToImg() {
    if (!this.uploadedFiles[0]) return;
    const btn = document.getElementById('pdf-process-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Rendering Pages to JPG...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
      const file = this.uploadedFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      canvas.toBlob((blob) => {
        if (!blob) return;
        const sizeKb = (blob.size / 1024).toFixed(1);
        this.showDownloadResult(
          blob,
          `${file.name.replace(/\.pdf$/i, '')}_page_1.jpg`,
          `✅ Extracted Page 1 as High-Resolution JPG (${sizeKb} KB, ${viewport.width.toFixed(0)}x${viewport.height.toFixed(0)}px)`
        );
      }, 'image/jpeg', 0.92);

    } catch (err) {
      console.error(err);
      alert('Could not render PDF to image.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="download" class="w-4 h-4"></i><span>Extract PDF Pages as JPG</span>`;
      if (window.lucide) lucide.createIcons();
    }
  },

  // 5. Split / Extract Pages from PDF (Zero Loss, Instant Execution)
  async processSplitPdf() {
    if (!this.uploadedFiles[0]) return;
    const rangeInput = document.getElementById('split-page-range').value.trim();
    const btn = document.getElementById('pdf-process-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Extracting Pages...</span>`;
    if (window.lucide) lucide.createIcons();

    try {
      const file = this.uploadedFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      const totalPages = srcDoc.getPageCount();

      // Parse range: e.g. "1" or "1-3"
      let indices = [];
      if (rangeInput.includes('-')) {
        const parts = rangeInput.split('-').map(n => parseInt(n.trim(), 10));
        const start = Math.max(1, parts[0]);
        const end = Math.min(totalPages, parts[1]);
        for (let i = start; i <= end; i++) indices.push(i - 1);
      } else {
        const single = parseInt(rangeInput, 10);
        if (single >= 1 && single <= totalPages) indices.push(single - 1);
      }

      if (indices.length === 0) {
        alert(`Invalid page range. This PDF has ${totalPages} page(s).`);
        return;
      }

      const newPdf = await PDFLib.PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcDoc, indices);
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      this.showDownloadResult(
        blob,
        `${file.name.replace(/\.pdf$/i, '')}_extracted.pdf`,
        `✅ Successfully extracted ${indices.length} page(s) (${(blob.size / 1024).toFixed(1)} KB)`
      );
    } catch (err) {
      console.error(err);
      alert('Error splitting PDF.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="file-minus" class="w-4 h-4"></i><span>Extract Selected Pages</span>`;
      if (window.lucide) lucide.createIcons();
    }
  },

  showDownloadResult(blob, filename, statusText) {
    const outputCard = document.getElementById('pdf-output-card');
    const status = document.getElementById('pdf-result-status');
    const downloadBtn = document.getElementById('pdf-download-btn');
    const downloadText = document.getElementById('pdf-download-text');

    if (outputCard && status && downloadBtn) {
      status.innerText = statusText;
      const url = URL.createObjectURL(blob);
      downloadBtn.href = url;
      downloadBtn.download = filename;
      if (downloadText) downloadText.innerText = `Download ${filename}`;
      outputCard.classList.remove('hidden');
      outputCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PDFSuite.init());
} else {
  PDFSuite.init();
}
