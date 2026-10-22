"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { DiscData } from "@/lib/discs";
import { DiscFace } from "./Disc";
import styles from "./DiscDrive.module.css";

interface ReadingScreenProps {
  disc: DiscData | null;
  /** Fades the screen in and starts the spin. */
  on: boolean;
  /** Slows the disc to a stop and fills the bar. */
  done: boolean;
  /** How long the progress bar takes to fill. */
  readMs: number;
  reduced: boolean;
}

const TOP_SPEED = 1080; // degrees per second
const SPIN_UP = 0.6; // seconds to reach top speed
const SPIN_DOWN = 0.9; // seconds to stop

/** Full-screen "Reading disc…" view shown while a section loads. */
export function ReadingScreen({ disc, on, done, readMs, reduced }: ReadingScreenProps) {
  const discEl = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(done);
  doneRef.current = done;

  useEffect(() => {
    if (!on || reduced) return;
    let angle = 0;
    let speed = 0;
    let last = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      speed = doneRef.current
        ? Math.max(0, speed - (TOP_SPEED / SPIN_DOWN) * dt)
        : Math.min(TOP_SPEED, speed + (TOP_SPEED / SPIN_UP) * dt);
      angle = (angle + speed * dt) % 360;
      if (discEl.current) discEl.current.style.transform = `rotate(${angle}deg)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [on, reduced]);

  return (
    <div
      className={styles.reading}
      data-on={on || undefined}
      data-done={done || undefined}
      style={{ "--read-ms": `${readMs}ms` } as CSSProperties}
      aria-hidden="true"
    >
      {disc && (
        <div className={styles.readingInner}>
          <span ref={discEl} className={styles.readingDisc}>
            <DiscFace disc={disc} idSuffix="-reading" />
          </span>
          <p className={styles.readingText}>{done ? "Done." : "Reading disc…"}</p>
          <div className={styles.readingBar}>
            <span />
          </div>
        </div>
      )}
    </div>
  );
}
