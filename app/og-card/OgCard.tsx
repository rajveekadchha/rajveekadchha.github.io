"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { DISCS, DISC_ACCENT, getDisc } from "@/lib/discs";
import { PROFILE } from "@/lib/portfolio";
import { DiscFace } from "@/components/disc-drive/Disc";
import { PAGE_LEDES } from "../[slug]/ledes";
import styles from "./og.module.css";

// Hand-placed pile for the homepage card, in disc diameters from the pile centre.
const PILE = [
  { dx: -0.78, dy: -0.36, rot: -18 },
  { dx: 0.12, dy: -0.5, rot: 9 },
  { dx: 0.92, dy: -0.3, rot: 26 },
  { dx: -0.42, dy: 0.34, rot: -7 },
  { dx: 0.98, dy: 0.42, rot: 11 },
  { dx: 0.3, dy: 0.46, rot: -24 },
];

/** ?disc=work draws that page's card; no param draws the homepage card. */
export function OgCard() {
  const [slug, setSlug] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    setSlug(new URLSearchParams(window.location.search).get("disc"));
  }, []);
  if (slug === undefined) return null;

  const disc = slug ? getDisc(slug) : undefined;
  const host = "rajveekadchha.github.io";

  if (!disc) {
    const S = 212;
    const spread = 0.9; // pull the pile in so no disc runs off the edge
    return (
      <div className={styles.card} data-ready="">
        <div className={styles.text}>
          <p className={styles.kicker}>{host}</p>
          <h1 className={styles.name}>
            Rajvee
            <br />
            Kadchha
          </h1>
          <p className={styles.role}>{PROFILE.role}</p>
          <p className={styles.tag}>Pick a disc. Drop it in the drive.</p>
        </div>
        <div className={styles.pile} aria-hidden="true">
          {DISCS.map((d, i) => {
            const p = PILE[i % PILE.length];
            return (
              <span
                key={d.slug}
                className={styles.disc}
                style={{
                  width: S,
                  height: S,
                  left: `calc(50% + ${p.dx * spread * S - S / 2}px)`,
                  top: `calc(50% + ${p.dy * S - S / 2}px)`,
                  transform: `rotate(${p.rot}deg)`,
                  zIndex: i + 1,
                }}
              >
                <DiscFace disc={d} idSuffix="-og" />
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  const accent = DISC_ACCENT[disc.finish][1];
  return (
    <div className={styles.card} data-ready="" style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.text}>
        <p className={styles.kicker}>
          {PROFILE.name} · {PROFILE.role}
        </p>
        <h1 className={styles.title}>{disc.title}</h1>
        <p className={styles.lede}>{PAGE_LEDES[disc.slug]}</p>
        <p className={styles.url}>
          {host}/<strong>{disc.slug}</strong>
        </p>
      </div>
      <span className={styles.bigDisc} aria-hidden="true">
        <DiscFace disc={disc} idSuffix="-og" />
      </span>
    </div>
  );
}
