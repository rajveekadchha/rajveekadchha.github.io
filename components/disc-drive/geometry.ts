/**
 * Scene layout. Everything is sized off S = one disc diameter (px), so the
 * drive, tray and pile keep real-world proportions at any viewport size.
 */

export interface Spot {
  dx: number; // offset from pile centre, in disc diameters
  dy: number;
  rot: number; // degrees
}

// Back-to-front. Tuned so every label stays readable in the pile.
const LANDSCAPE: Spot[] = [
  { dx: -0.98, dy: -0.04, rot: -18 },
  { dx: -0.06, dy: -0.2, rot: 9 },
  { dx: 0.88, dy: -0.06, rot: 26 },
  { dx: -0.5, dy: 0.38, rot: -7 },
  { dx: 1.02, dy: 0.5, rot: 11 },
  { dx: 0.26, dy: 0.54, rot: -32 },
];

const PORTRAIT: Spot[] = [
  { dx: -0.42, dy: -0.04, rot: -16 },
  { dx: 0.44, dy: 0.02, rot: 22 },
  { dx: -0.4, dy: 0.6, rot: -8 },
  { dx: 0.46, dy: 0.66, rot: 12 },
  { dx: -0.34, dy: 1.22, rot: 9 },
  { dx: 0.4, dy: 1.28, rot: -26 },
];

// Proportions, in disc diameters.
export const BEZEL_H = 0.24; // visible drive body above the tray
export const DRIVE_W = 1.36;
export const TRAY_W = 1.2;
export const TRAY_H = 1.2; // from the drive's edge to the tray's front lip
export const LIP_H = 0.06;
export const TRAY_TUCK = 0.1; // tray length hidden under the drive when open
const WELL_TOP = 0.07; // gap between drive edge and the disc recess
const PILE_GAP = 0.1;

export interface Geometry {
  vw: number;
  vh: number;
  S: number;
  portrait: boolean;
  bezelH: number;
  driveX: number;
  driveW: number;
  trayX: number;
  trayW: number;
  trayH: number;
  /** Disc recess centre when the tray is fully open */
  well: { x: number; y: number };
  /** translateY that pulls the tray shut (negative) */
  closedOffset: number;
  pile: { cx: number; cy: number };
  spots: { x: number; y: number; rot: number }[];
  bubble: "right" | "inside";
}

function spotsFor(count: number, base: Spot[]): Spot[] {
  // If more discs are added than there are hand-placed spots, fan the extras out.
  return Array.from({ length: count }, (_, i) => {
    const s = base[i % base.length];
    const lap = Math.floor(i / base.length);
    return lap === 0 ? s : { dx: s.dx + 0.22 * lap, dy: s.dy + 0.14 * lap, rot: s.rot + 17 * lap };
  });
}

export function computeGeometry(vw: number, vh: number, count: number): Geometry {
  const portrait = vw / vh < 0.85;
  const base = spotsFor(count, portrait ? PORTRAIT : LANDSCAPE);

  const minX = Math.min(...base.map((s) => s.dx)) - 0.5;
  const maxX = Math.max(...base.map((s) => s.dx)) + 0.5;
  const minY = Math.min(...base.map((s) => s.dy)) - 0.5;
  const maxY = Math.max(...base.map((s) => s.dy)) + 0.5;
  const stack = BEZEL_H + TRAY_H + PILE_GAP;
  const byWidth = (vw - 32) / Math.max(maxX - minX, DRIVE_W);

  const sizeFor = (reserveBottom: number, overflow: number) =>
    Math.round(
      Math.max(110, Math.min(400, byWidth, (vh - reserveBottom - 12) / (stack + (maxY - minY) - overflow))),
    );
  const centreX = (s: number) => vw / 2 - ((minX + maxX) / 2) * s;

  let S: number;
  if (portrait) {
    S = sizeFor(118, 0); // name + links sit under the pile on phones
  } else {
    // Wide screens: let the front disc dip off the bottom edge, as long as the
    // pile clears the tagline (bottom-left) and the section links (bottom-right).
    S = sizeFor(0, 0.18);
    const left = centreX(S) + minX * S;
    const right = centreX(S) + maxX * S;
    if (left < 270 || right > vw - 470) S = sizeFor(64, 0);
  }

  const bezelH = BEZEL_H * S;
  const cx = centreX(S);
  const cy = bezelH + TRAY_H * S + PILE_GAP * S - minY * S;

  const trayW = TRAY_W * S;
  const trayX = vw / 2 - trayW / 2;
  const roomRight = vw - (trayX + trayW) - 16;

  return {
    vw,
    vh,
    S,
    portrait,
    bezelH,
    driveX: vw / 2 - (DRIVE_W * S) / 2,
    driveW: DRIVE_W * S,
    trayX,
    trayW,
    trayH: TRAY_H * S,
    well: { x: vw / 2, y: bezelH + WELL_TOP * S + S / 2 },
    closedOffset: -(TRAY_H - LIP_H) * S,
    pile: { cx, cy },
    spots: base.map((s) => ({ x: cx + s.dx * S, y: cy + s.dy * S, rot: s.rot })),
    bubble: roomRight > 230 ? "right" : "inside",
  };
}
