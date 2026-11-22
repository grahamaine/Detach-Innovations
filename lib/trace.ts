// Finds the main straight lines in a photo (walls, frames, roof edges, deck),
// for the blueprint drawing. Runs in the browser when a photo is uploaded in
// the admin portal; scripts/trace_photos.py does the same for built-in photos.
//
// Method: edge strength (Sobel) on a small copy of the photo, a Hough
// transform to find candidate lines, then each line is walked to keep only
// the stretches that really lie on edges. Lines come back in the photo's own
// pixels, ordered ground-up (foundation first, roof last).

export type Trace = { w: number; h: number; lines: number[][] };

const WORK = 360; // longest side of the copy we analyse
const MAX_LINES = 60;

export function traceImage(img: CanvasImageSource & { width: number; height: number }, W: number, H: number): Trace {
  const scale = WORK / Math.max(W, H);
  const w = Math.max(8, Math.round(W * scale));
  const h = Math.max(8, Math.round(H * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const px = ctx.getImageData(0, 0, w, h).data;
  return traceGray(toGray(px, w, h), w, h, W, H);
}

function toGray(px: Uint8ClampedArray, w: number, h: number) {
  const g = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) g[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];
  // light blur to ignore texture
  const b = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      let s = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += g[(y + dy) * w + x + dx] * (dx && dy ? 1 : dx || dy ? 2 : 4);
      b[y * w + x] = s / 16;
    }
  return b;
}

export function traceGray(g: Float32Array, w: number, h: number, W: number, H: number): Trace {
  // Sobel edges with direction, thinned by non-maximum suppression
  const mag = new Float32Array(w * h);
  const ang = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = -g[i - w - 1] - 2 * g[i - 1] - g[i + w - 1] + g[i - w + 1] + 2 * g[i + 1] + g[i + w + 1];
      const gy = -g[i - w - 1] - 2 * g[i - w] - g[i - w + 1] + g[i + w - 1] + 2 * g[i + w] + g[i + w + 1];
      mag[i] = Math.hypot(gx, gy);
      ang[i] = Math.atan2(gy, gx);
    }
  const sorted = Array.from(mag).filter((v) => v > 0).sort((a, b) => a - b);
  const thr = Math.max(40, sorted[Math.floor(sorted.length * 0.85)] ?? 40);
  const edge = new Uint8Array(w * h);
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      if (mag[i] < thr) continue;
      const a = ang[i];
      const dx = Math.round(Math.cos(a));
      const dy = Math.round(Math.sin(a));
      if (mag[i] >= mag[i + dy * w + dx] && mag[i] >= mag[i - dy * w - dx]) edge[i] = 1;
    }

  // Hough transform
  const nT = 180;
  const diag = Math.ceil(Math.hypot(w, h));
  const nR = diag * 2 + 1;
  const acc = new Uint16Array(nT * nR);
  const cos = new Float32Array(nT);
  const sin = new Float32Array(nT);
  for (let t = 0; t < nT; t++) {
    cos[t] = Math.cos((t * Math.PI) / nT);
    sin[t] = Math.sin((t * Math.PI) / nT);
  }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (!edge[y * w + x]) continue;
      for (let t = 0; t < nT; t++) acc[t * nR + Math.round(x * cos[t] + y * sin[t]) + diag]++;
    }

  // strongest peaks, suppressing their neighbours
  const minLen = Math.hypot(w, h) * 0.06;
  const peaks: [number, number, number][] = [];
  for (let t = 0; t < nT; t++)
    for (let r = 0; r < nR; r++) {
      const v = acc[t * nR + r];
      if (v >= minLen * 0.8) peaks.push([v, t, r]);
    }
  peaks.sort((a, b) => b[0] - a[0]);
  const taken = new Uint8Array(nT * nR);
  const segs: number[][] = [];
  const gap = 3;
  for (const [, t, r] of peaks) {
    if (taken[t * nR + r]) continue;
    for (let dt = -4; dt <= 4; dt++)
      for (let dr = -4; dr <= 4; dr++) {
        const tt = (t + dt + nT) % nT;
        const rr = r + dr;
        if (rr >= 0 && rr < nR) taken[tt * nR + rr] = 1;
      }
    // walk the line across the image, keeping runs that sit on edges
    const rho = r - diag;
    const c = cos[t];
    const s = sin[t];
    const x0 = c * rho;
    const y0 = s * rho;
    const steps = diag * 2;
    let run: number[] | null = null;
    let miss = 0;
    const flush = () => {
      if (run && Math.hypot(run[2] - run[0], run[3] - run[1]) >= minLen) segs.push(run);
      run = null;
      miss = 0;
    };
    for (let k = -diag; k <= steps - diag; k++) {
      const x = Math.round(x0 - s * k);
      const y = Math.round(y0 + c * k);
      const inside = x >= 4 && y >= 4 && x < w - 4 && y < h - 4; // ignore the photo's own border
      let on = false;
      if (inside)
        for (let oy = -1; oy <= 1 && !on; oy++) for (let ox = -1; ox <= 1 && !on; ox++) on = edge[(y + oy) * w + x + ox] === 1;
      if (on) {
        if (!run) run = [x, y, x, y];
        else {
          run[2] = x;
          run[3] = y;
        }
        miss = 0;
      } else if (run && ++miss > gap) flush();
    }
    flush();
    if (segs.length >= MAX_LINES * 3) break;
  }

  // longest first, dropping near-duplicates of a line already kept
  segs.sort((a, b) => Math.hypot(b[2] - b[0], b[3] - b[1]) - Math.hypot(a[2] - a[0], a[3] - a[1]));
  const keep: number[][] = [];
  for (const sg of segs) {
    const a1 = Math.atan2(sg[3] - sg[1], sg[2] - sg[0]);
    const mx = (sg[0] + sg[2]) / 2;
    const my = (sg[1] + sg[3]) / 2;
    const dup = keep.some((k) => {
      let da = Math.abs(a1 - Math.atan2(k[3] - k[1], k[2] - k[0])) % Math.PI;
      da = Math.min(da, Math.PI - da);
      const px = k[2] - k[0];
      const py = k[3] - k[1];
      const n = Math.hypot(px, py) || 1;
      const d = Math.abs(px * (k[1] - my) - py * (k[0] - mx)) / n;
      const t = ((mx - k[0]) * px + (my - k[1]) * py) / (n * n);
      return da < 0.1 && d < w * 0.015 + 1 && t > -0.2 && t < 1.2;
    });
    if (!dup) keep.push(sg);
    if (keep.length >= MAX_LINES) break;
  }
  // ground-up, in the photo's own pixels
  const sx = W / w;
  const sy = H / h;
  const lines = keep
    .sort((a, b) => Math.max(b[1], b[3]) - Math.max(a[1], a[3]))
    .map(([x1, y1, x2, y2]) => [Math.round(x1 * sx), Math.round(y1 * sy), Math.round(x2 * sx), Math.round(y2 * sy)]);
  return { w: W, h: H, lines };
}
