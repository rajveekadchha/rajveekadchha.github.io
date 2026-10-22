import type { CSSProperties, Ref } from "react";
import type { Geometry } from "./geometry";
import { LIP_H, TRAY_TUCK } from "./geometry";
import styles from "./DiscDrive.module.css";

export type LedState = "idle" | "armed" | "reading";

/**
 * The drive is drawn top-down: a brushed steel case running off the top of the
 * screen, with the tray sliding out from under its front bezel. Units in the
 * tray SVG: 1000 = one disc diameter.
 */
export function DriveTray({
  g,
  led,
  trayRef,
}: {
  g: Geometry;
  led: LedState;
  trayRef: Ref<HTMLDivElement>;
}) {
  const tuck = TRAY_TUCK * g.S;
  const wellCy = 100 + 70 + 500; // tuck + gap + radius

  return (
    <>
      <div
        ref={trayRef}
        className={styles.tray}
        style={{
          left: g.trayX,
          top: g.bezelH - tuck,
          width: g.trayW,
          height: g.trayH + tuck,
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 1300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tray-body" x1="0" x2="1">
              <stop offset="0" stopColor="#1c1d20" />
              <stop offset=".5" stopColor="#28292d" />
              <stop offset="1" stopColor="#1c1d20" />
            </linearGradient>
            <radialGradient id="tray-well" cx=".5" cy=".42" r=".6">
              <stop offset="0" stopColor="#141518" />
              <stop offset="1" stopColor="#1f2024" />
            </radialGradient>
            <radialGradient id="tray-hub" cx=".4" cy=".35" r=".7">
              <stop offset="0" stopColor="#c4c7cc" />
              <stop offset=".6" stopColor="#7d8187" />
              <stop offset="1" stopColor="#4a4d52" />
            </radialGradient>
            <linearGradient id="tray-lip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ece6d8" />
              <stop offset=".55" stopColor="#d3cbb8" />
              <stop offset="1" stopColor="#a79e8a" />
            </linearGradient>
          </defs>

          {/* body */}
          <path d="M0 0 H1200 V1276 Q1200 1300 1176 1300 H24 Q0 1300 0 1276 Z" fill="url(#tray-body)" />
          <rect x="22" y="0" width="7" height="1240" fill="#36373c" />
          <rect x="1171" y="0" width="7" height="1240" fill="#36373c" />

          {/* 12 cm recess, 8 cm recess */}
          <circle cx="600" cy={wellCy} r="514" fill="url(#tray-well)" stroke="#0c0d0f" strokeWidth="7" />
          <path
            d={`M ${600 - 506} ${wellCy} A 506 506 0 0 0 ${600 + 506} ${wellCy}`}
            fill="none"
            stroke="rgba(255,255,255,.06)"
            strokeWidth="3"
          />
          <circle cx="600" cy={wellCy} r="342" fill="#18191c" stroke="#0e0f11" strokeWidth="5" />

          {/* opening for the laser sled, with the spindle at its end */}
          <path
            d={`M 468 0 V ${wellCy} A 132 132 0 0 0 732 ${wellCy} V 0 Z`}
            fill="#060607"
          />
          <rect x="500" y="0" width="6" height={wellCy - 60} fill="#151618" />
          <rect x="694" y="0" width="6" height={wellCy - 60} fill="#151618" />
          <rect x="556" y="380" width="88" height="70" rx="10" fill="#232428" />
          <circle cx="600" cy="415" r="17" fill="#2c3550" />
          <circle cx="594" cy="409" r="5" fill="rgba(170,190,255,.55)" />
          <circle cx="600" cy={wellCy} r="80" fill="url(#tray-hub)" />
          <circle cx="600" cy={wellCy} r="30" fill="#2a2b2f" />
          {[0, 120, 240].map((a) => (
            <circle
              key={a}
              cx={600 + 54 * Math.cos((a * Math.PI) / 180)}
              cy={wellCy + 54 * Math.sin((a * Math.PI) / 180)}
              r="7"
              fill="#e6e8eb"
            />
          ))}

          {/* finger scoop + front lip */}
          <path d="M 470 1206 Q 600 1236 730 1206" stroke="#0f1012" strokeWidth="20" strokeLinecap="round" fill="none" />
          <rect x="0" y={1300 - LIP_H * 1000} width="1200" height={LIP_H * 1000} rx="10" fill="url(#tray-lip)" />
          <rect x="10" y={1300 - LIP_H * 1000 + 3} width="1180" height="3" fill="rgba(255,255,255,.55)" />
        </svg>
      </div>

      <div
        className={styles.drive}
        style={
          {
            left: g.driveX,
            width: g.driveW,
            height: g.bezelH + 0.6 * g.S,
            top: -0.6 * g.S,
            "--bezel": `${g.bezelH}px`,
          } as CSSProperties
        }
        data-led={led}
        aria-hidden="true"
      >
        <span className={styles.sticker}>RK&nbsp;·&nbsp;DRIVE&nbsp;01</span>
        <span className={`${styles.screw} ${styles.screwL}`} />
        <span className={`${styles.screw} ${styles.screwR}`} />
        <span className={styles.bezel}>
          <span className={styles.led} />
        </span>
      </div>
    </>
  );
}
