import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { DiscData, DiscHand } from "@/lib/discs";
import styles from "./DiscDrive.module.css";

export interface DiscHandlers {
  onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerCancel: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerEnter: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: (e: ReactPointerEvent<HTMLButtonElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

interface DiscProps extends DiscHandlers {
  disc: DiscData;
  size: number;
  index: number;
  disabled: boolean;
  /** Sitting in the open tray after the visitor came back from its page. */
  loaded?: boolean;
  outerRef: (el: HTMLButtonElement | null) => void;
  innerRef: (el: HTMLSpanElement | null) => void;
}

const DARK_FINISHES = new Set(["teal", "blue"]);

/**
 * One handwriting per disc, as if each was labelled by a different person.
 * width: average glyph width in em, used to keep long labels inside the band.
 * max: largest label size. tilt: how crooked it was written.
 */
const HANDS: Record<DiscHand, { font: string; width: number; max: number; note: number; tilt: number; noteTilt: number }> = {
  marker: { font: '"Permanent Marker"', width: 0.62, max: 14.5, note: 6.2, tilt: -4, noteTilt: 3 },
  scratchy: { font: '"Rock Salt"', width: 0.95, max: 9.5, note: 4.6, tilt: 3, noteTilt: -2 },
  cursive: { font: '"Homemade Apple"', width: 0.8, max: 11.5, note: 5, tilt: -6, noteTilt: 2 },
  pen: { font: '"Reenie Beanie"', width: 0.4, max: 21, note: 9, tilt: 2, noteTilt: -4 },
  ballpoint: { font: '"Shadows Into Light"', width: 0.46, max: 17, note: 7, tilt: 5, noteTilt: -3 },
  casual: { font: '"Gochi Hand"', width: 0.54, max: 15.5, note: 6, tilt: -2, noteTilt: 5 },
};

/** CSS font stack for a disc's handwriting. */
export function handFont(hand: DiscHand) {
  return `${HANDS[hand].font}, "Marker Felt", "Comic Sans MS", cursive`;
}

function labelSize(text: string, hand: DiscHand) {
  const h = HANDS[hand];
  return Math.min(h.max, 74 / (text.length * h.width));
}

function Doodle({ kind }: { kind: DiscData["doodle"] }) {
  switch (kind) {
    case "underline":
      return <path d="M29 33.5 C40 31 58 31.5 71 33" />;
    case "smiley":
      return (
        <g transform="translate(79 61) rotate(12)">
          <circle r="5.2" />
          <path d="M-2.6 0.9 Q0 3.6 2.6 0.9" />
          <path d="M-1.8 -1.6 v0.2 M1.8 -1.6 v0.2" strokeWidth="1.6" />
        </g>
      );
    case "check":
      return <path d="M70 79 l3 3.4 l6.5 -8" />;
    case "arrow":
      return <path d="M57 80.5 C62 82 67 81.5 71 79 M67.8 76.6 L71.4 79 L68.4 82.2" />;
    case "sparkle":
      return (
        <path
          transform="translate(80 37) scale(0.9)"
          d="M0 -6 C0.9 -1.2 1.2 -0.9 6 0 C1.2 0.9 0.9 1.2 0 6 C-0.9 1.2 -1.2 0.9 -6 0 C-1.2 -0.9 -0.9 -1.2 0 -6Z"
        />
      );
    case "star":
      return <path transform="translate(78 64) rotate(-8)" d="M0 -5.5 L1.6 -1.7 L5.6 -1.4 L2.5 1.2 L3.5 5.2 L0 3 L-3.5 5.2 L-2.5 1.2 L-5.6 -1.4 L-1.6 -1.7 Z" />;
    default:
      return null;
  }
}

/**
 * Factory print, the way blank CD-Rs come out of the spindle: speed logos,
 * capacity boxes, a coloured swoosh. Generic, no real brands. It sits in the
 * free space away from the handwriting (label up top, note at the bottom).
 */
function PrintArt({ finish }: { finish: DiscData["finish"] }) {
  const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };
  switch (finish) {
    case "silver":
      return (
        <g>
          <path d="M66 3.5 C84 22 92 52 80 96" fill="none" stroke="#c8202f" strokeWidth="2.4" opacity="0.85" />
          <path d="M70.5 4.8 C87 25 94 52 83.5 94.5" fill="none" stroke="#c8202f" strokeWidth="0.5" opacity="0.6" />
          <text x="7" y="53" fontSize="6.4" fontWeight="800" fontStyle="italic" fill="#c8202f" opacity="0.88" letterSpacing="-0.2" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
            CD-R74
          </text>
          <text x="20" y="57.4" fontSize="2.3" fontWeight="700" fill="rgba(40,44,50,.45)" style={mono}>
            16x
          </text>
        </g>
      );
    case "white":
      return (
        <g fill="rgba(30,30,30,.5)" style={mono}>
          <g transform="translate(17 49)" stroke="rgba(30,30,30,.45)" strokeWidth="0.45" fill="none">
            <path d="M-2.4 3.2 L1.8 -3.4" />
            <ellipse rx="2.6" ry="3.4" />
          </g>
          <text x="13.4" y="57.5" fontSize="2.6">12x</text>
          <text fontSize="1.9" transform="translate(70 47) rotate(-18)">
            80MIN / 637MB
          </text>
          <text fontSize="1.6" transform="translate(70.6 50) rotate(-18)">
            HIGH RECORDING SPEED
          </text>
        </g>
      );
    case "gold":
      return (
        <g fill="rgba(92,62,0,.5)">
          <text fontSize="7.2" fontWeight="700" transform="translate(12 60) rotate(-90)" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            CD-R
          </text>
          <text fontSize="2" transform="translate(21 61) rotate(-90)" style={mono}>
            ARCHIVAL · 74
          </text>
        </g>
      );
    case "teal":
      return (
        <g fill="rgba(230,250,246,.7)">
          <text x="70" y="48" fontSize="5.6" fontWeight="600" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
            48X
          </text>
          <rect x="83.2" y="43.6" width="5" height="4" rx="0.5" fill="none" stroke="rgba(230,250,246,.55)" strokeWidth="0.35" />
          <text x="70" y="52.4" fontSize="2.5" style={mono}>
            80Min/700MB
          </text>
          <text x="70" y="55.2" fontSize="1.5" opacity="0.7" style={mono}>
            Multi Recording Speed
          </text>
        </g>
      );
    case "coral":
      return (
        <g fill="none" stroke="rgba(45,18,14,.55)" strokeWidth="0.4" style={mono}>
          {[
            ["700", "MB", 41],
            ["52x", "", 48],
            ["80", "min", 55],
          ].map(([big, small, y]) => (
            <g key={big as string} transform={`translate(9 ${y}) rotate(-6)`}>
              <rect width="13.5" height="5.6" rx="0.8" />
              <text x="1.4" y="4.3" fontSize="3.4" fontWeight="700" stroke="none" fill="rgba(45,18,14,.6)">
                {big}
                <tspan fontSize="1.6" fontWeight="400">
                  {small ? ` ${small}` : ""}
                </tspan>
              </text>
            </g>
          ))}
        </g>
      );
    case "blue":
      return (
        <g transform="translate(19 46)" fill="rgba(240,246,255,.82)" stroke="rgba(240,246,255,.82)">
          <path d="M-5.6 1.5 A5.8 5.8 0 1 1 1.5 5.6" fill="none" strokeWidth="1.1" />
          <path d="M0.2 4.2 L2.4 5.8 L0.4 7.4" fill="none" strokeWidth="0.9" strokeLinejoin="round" />
          <text x="-3.4" y="-0.4" fontSize="2.2" fontWeight="700" stroke="none" style={mono}>
            1x-52x
          </text>
          <text x="-2.2" y="2.2" fontSize="1.3" stroke="none" style={mono}>
            SPEED
          </text>
        </g>
      );
    default:
      return null;
  }
}

/** Scuffs and hairline scratches. Rotated per disc so no two look alike. */
function Wear({ seed, dark }: { seed: number; dark: boolean }) {
  const ink = dark ? "rgba(255,255,255,.16)" : "rgba(40,36,30,.13)";
  return (
    <g transform={`rotate(${(seed * 67) % 360} 50 50)`} fill="none" stroke={ink} strokeLinecap="round">
      <path d="M24 30 C34 26 41 25.5 49 26.5" strokeWidth="0.18" />
      <path d="M62 70 C69 66 74 61 77 55" strokeWidth="0.15" />
      <path d="M30 74 l7 2.4" strokeWidth="0.22" />
      <path d="M73 30 l3.2 5.4" strokeWidth="0.14" />
      <path d="M18 60 C19.5 66 22 70 25 73" strokeWidth="0.12" />
      <circle cx="80" cy="44" r="1.6" stroke="none" fill={ink} opacity="0.5" />
    </g>
  );
}

const seedOf = (s: string) => [...s].reduce((n, c) => n + c.charCodeAt(0), 0);

/** The printed face of a disc. Shared by the draggable disc and the reading screen. */
export function DiscFace({ disc, idSuffix = "" }: { disc: DiscData; idSuffix?: string }) {
  const dark = DARK_FINISHES.has(disc.finish);
  const hand = HANDS[disc.hand];
  const fs = labelSize(disc.label, disc.hand);
  const arcId = `disc-arc-${disc.slug}${idSuffix}`;
  const printed =
    disc.finish === "silver" || disc.finish === "teal"
      ? "RECORDABLE · 700 MB · 80 MIN · 1×–52×"
      : disc.finish === "gold"
        ? "ARCHIVAL GOLD · 74 MIN"
        : disc.finish === "blue"
          ? "CD-R · 80 MINUTOS · 700 MB · 1×–52×"
          : null;

  return (
    <span className={styles.face} data-finish={disc.finish}>
      <span className={styles.print} />
      <span className={styles.grain} />
      <svg
        className={styles.label}
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{ color: dark ? "#f3efe6" : "#151515" }}
      >
        <defs>
          <path id={arcId} d="M14 50 A36 36 0 0 0 86 50" />
          <path id={`${arcId}-hub`} d="M39 50 A11 11 0 1 1 61 50" />
        </defs>
        {/* Codes moulded into the clear hub. */}
        <text className={styles.hubText} fill="rgba(60,66,74,.38)">
          <textPath href={`#${arcId}-hub`} startOffset="50%" textAnchor="middle">
            {`CD-R 80 · ${String(seedOf(disc.slug) * 37).padStart(5, "0")} · 1-52X`}
          </textPath>
        </text>
        <Wear seed={seedOf(disc.slug)} dark={dark} />
        <PrintArt finish={disc.finish} />
        {printed && (
          <text className={styles.printedText} fill={dark ? "rgba(255,255,255,.55)" : "rgba(30,34,40,.5)"}>
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {printed}
            </textPath>
          </text>
        )}
        {disc.finish === "white" && (
          <g className={styles.printedLines} stroke="rgba(30,30,30,.28)" strokeWidth="0.35">
            <path d="M30 72 H70" />
            <path d="M34 77.5 H66" />
            <text x="30" y="70.8" fill="rgba(30,30,30,.45)" stroke="none">
              TITLE
            </text>
          </g>
        )}
        <text
          className={styles.marker}
          x="50"
          y="28"
          textAnchor="middle"
          fontSize={fs}
          transform={`rotate(${hand.tilt} 50 28)`}
          fill="currentColor"
          style={{ fontFamily: `${hand.font}, "Marker Felt", "Comic Sans MS", cursive` }}
        >
          {disc.label}
        </text>
        {disc.note && (
          <text
            className={styles.marker}
            x={disc.finish === "white" ? 50 : 50}
            y={disc.finish === "white" ? 87 : 76}
            textAnchor="middle"
            fontSize={hand.note}
            transform={`rotate(${hand.noteTilt} 50 76)`}
            fill="currentColor"
            style={{ fontFamily: `${hand.font}, "Marker Felt", "Comic Sans MS", cursive` }}
            opacity="0.85"
          >
            {disc.note}
          </text>
        )}
        <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
          <Doodle kind={disc.doodle} />
        </g>
      </svg>
      <span className={styles.glint} />
      <span className={styles.shade} />
    </span>
  );
}

export function Disc({ disc, size, index, disabled, loaded, outerRef, innerRef, ...handlers }: DiscProps) {
  return (
    <button
      type="button"
      ref={outerRef}
      className={styles.disc}
      style={{ width: size, height: size, "--i": index } as CSSProperties}
      aria-label={
        loaded
          ? `${disc.title}, in the drive. Drag it out of the tray, or press Enter to load it again.`
          : `${disc.title}. Drag onto the drive tray, or press Enter to load it.`
      }
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      data-slug={disc.slug}
      data-loaded={loaded || undefined}
      {...handlers}
    >
      <span ref={innerRef} className={styles.discBody}>
        <DiscFace disc={disc} />
      </span>
    </button>
  );
}
