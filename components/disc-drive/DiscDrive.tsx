"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DISCS, discHref, type DiscData } from "@/lib/discs";
import { computeGeometry, type Geometry } from "./geometry";
import { Disc } from "./Disc";
import { DriveTray, type LedState } from "./DriveTray";
import { ReadingScreen } from "./ReadingScreen";
import { getDriveSound } from "./sound";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./DiscDrive.module.css";

/* ------------------------------------------------------------------ */
/* Motion model                                                         */
/* ------------------------------------------------------------------ */

type Mode = "rest" | "held" | "glide" | "tween" | "tray";
type Key = "x" | "y" | "rot" | "lift" | "tiltX" | "tiltY";

interface Tween {
  from: Partial<Record<Key, number>>;
  to: Partial<Record<Key, number>>;
  start: number;
  dur: number;
  ease: (t: number) => number;
  arc: number; // extra lift at the midpoint (a hop through the air)
  then: Mode;
  resolve: () => void;
}

interface Body {
  x: number;
  y: number;
  rot: number;
  lift: number; // 0 = lying flat, 1 = held up off the desk
  hover: number;
  tiltX: number;
  tiltY: number;
  vx: number; // px per ms
  vy: number;
  spin: number; // deg per frame
  rank: number; // stacking order among discs on the desk
  mode: Mode;
  landed: boolean;
  tween?: Tween;
  dirty: boolean;
}

interface Grab {
  index: number;
  pointerId: number;
  px: number;
  py: number;
  localX: number; // grab point in the disc's own (unrotated) frame
  localY: number;
  downX: number;
  downY: number;
  downAt: number;
  moved: number;
}

type Phase = "intro" | "idle" | "holding" | "inserting";

const Z_TRAY_DISC = 25;
const Z_HELD = 60;
const RAD = Math.PI / 180;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const approach = (v: number, target: number, rate: number, dt: number) =>
  v + (target - v) * (1 - Math.pow(1 - rate, dt / 16.67));

// How long the "Reading disc…" bar takes to fill.
const READ_MS = 2000;

// Remembers which disc is in the drive, so coming back shows it in the tray.
const LOADED_KEY = "rk-drive-loaded";
function readLoaded(): string | null {
  try {
    return sessionStorage.getItem(LOADED_KEY);
  } catch {
    return null;
  }
}
function writeLoaded(slug: string | null) {
  try {
    if (slug) sessionStorage.setItem(LOADED_KEY, slug);
    else sessionStorage.removeItem(LOADED_KEY);
  } catch {
    /* storage unavailable */
  }
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */

export default function DiscDrive({ discs = DISCS }: { discs?: DiscData[] }) {
  const router = useRouter();

  const [g, setG] = useState<Geometry | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [armed, setArmed] = useState(false);
  const [led, setLed] = useState<LedState>("idle");
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState<DiscData | null>(null);
  const [reading, setReading] = useState<"off" | "on" | "done">("off");
  const [soundOn, setSoundOn] = useState(true);
  // Sound is on but the browser hasn't allowed audio yet (phones need a tap).
  const [soundLocked, setSoundLocked] = useState(false);
  const [coarse, setCoarse] = useState(false);
  // Index of the disc left in the tray from the last visit, if any.
  const [loadedIdx, setLoadedIdx] = useState<number | null>(null);
  const loadedRef = useRef<number | null>(null);

  const geo = useRef<Geometry | null>(null);
  const bodies = useRef<Body[]>([]);
  const outers = useRef<(HTMLButtonElement | null)[]>([]);
  const inners = useRef<(HTMLSpanElement | null)[]>([]);
  const trayEl = useRef<HTMLDivElement | null>(null);
  const tray = useRef({ offset: 0, tween: null as null | { from: number; to: number; start: number; dur: number; ease: (t: number) => number; resolve: () => void } });
  const grab = useRef<Grab | null>(null);
  const armedRef = useRef(false);
  const phaseRef = useRef<Phase>("intro");
  const reduced = useRef(false);
  const alive = useRef(true);
  const sound = useRef(getDriveSound());
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /* ---------------- geometry + resize ---------------- */

  useEffect(() => {
    alive.current = true;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      // On by default; only an explicit "off" from the visitor turns it off.
      const saved = localStorage.getItem("rk-drive-sound") !== "off";
      setSoundOn(saved);
      sound.current.setEnabled(saved);
    } catch {
      // Storage unavailable: use the default (on).
      sound.current.setEnabled(true);
    }

    const layout = () => {
      const next = computeGeometry(window.innerWidth, window.innerHeight, discs.length);
      const prev = geo.current;
      if (!prev) {
        const loadedAt = discs.findIndex((d) => d.slug === readLoaded());
        loadedRef.current = loadedAt >= 0 ? loadedAt : null;
        setLoadedIdx(loadedRef.current);
        // First layout: discs start in their pile spots, tray starts shut.
        bodies.current = next.spots.map((s, i) => ({
          x: s.x,
          y: s.y,
          rot: s.rot,
          lift: 0,
          hover: 0,
          tiltX: 0,
          tiltY: 0,
          vx: 0,
          vy: 0,
          spin: 0,
          rank: i + 1,
          mode: (i === loadedRef.current ? "tray" : "rest") as Mode,
          landed: true,
          dirty: true,
        }));
        // Shut at first; the intro ejects it. Coming back with a disc, it always
        // starts shut so the eject is visible (even with reduced motion).
        tray.current.offset = reduced.current && loadedRef.current === null ? 0 : next.closedOffset;
      } else {
        // Keep the visitor's arrangement: map positions through the pile frame.
        for (const b of bodies.current) {
          const u = (b.x - prev.pile.cx) / prev.S;
          const v = (b.y - prev.pile.cy) / prev.S;
          b.x = next.pile.cx + u * next.S;
          b.y = next.pile.cy + v * next.S;
          b.dirty = true;
        }
        if (tray.current.offset !== 0 && !tray.current.tween) {
          tray.current.offset = (tray.current.offset / prev.closedOffset) * next.closedOffset;
        }
      }
      geo.current = next;
      setG(next);
    };

    layout();
    window.addEventListener("resize", layout);

    // Safari restores pages from the back/forward cache mid-animation; start fresh.
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onShow);

    discs.forEach((d) => router.prefetch(discHref(d.slug)));

    return () => {
      alive.current = false;
      window.removeEventListener("resize", layout);
      window.removeEventListener("pageshow", onShow);
    };
  }, [discs, router]);

  /* ---------------- tweens ---------------- */

  const tweenBody = useCallback(
    (i: number, to: Tween["to"], dur: number, opts: { ease?: Tween["ease"]; arc?: number; then?: Mode } = {}) =>
      new Promise<void>((resolve) => {
        const b = bodies.current[i];
        b.tween?.resolve();
        const from: Tween["from"] = {};
        (Object.keys(to) as Key[]).forEach((k) => (from[k] = b[k]));
        b.tween = {
          from,
          to,
          start: performance.now(),
          dur: Math.max(1, dur),
          ease: opts.ease ?? easeOutCubic,
          arc: opts.arc ?? 0,
          then: opts.then ?? "rest",
          resolve,
        };
        b.mode = "tween";
      }),
    [],
  );

  const trayTo = useCallback(
    (to: number, dur: number, ease = easeInOutCubic) =>
      new Promise<void>((resolve) => {
        tray.current.tween?.resolve();
        tray.current.tween = { from: tray.current.offset, to, start: performance.now(), dur: Math.max(1, dur), ease, resolve };
      }),
    [],
  );

  /* ---------------- render loop ---------------- */

  useEffect(() => {
    if (!g) return;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(40, now - last || 16.67);
      last = now;
      const G = geo.current!;
      const S = G.S;
      const k = dt / 16.67;
      const rm = reduced.current;

      // Tray
      const t = tray.current;
      if (t.tween) {
        const p = clamp((now - t.tween.start) / t.tween.dur, 0, 1);
        t.offset = t.tween.from + (t.tween.to - t.tween.from) * t.tween.ease(p);
        if (p >= 1) {
          const done = t.tween.resolve;
          t.tween = null;
          done();
        }
      }
      if (trayEl.current) trayEl.current.style.transform = `translate3d(0, ${t.offset}px, 0)`;

      const wellX = G.well.x;
      const wellY = G.well.y + t.offset;
      const trayBottom = G.bezelH + G.trayH + t.offset;
      const halfDrive = G.driveW / 2;

      bodies.current.forEach((b, i) => {
        const prevX = b.x;
        const prevY = b.y;

        if (b.mode === "held" && grab.current?.index === i) {
          const gr = grab.current;
          const c = Math.cos(b.rot * RAD);
          const s = Math.sin(b.rot * RAD);
          const rx = c * gr.localX - s * gr.localY; // centre → grab point, on screen
          const ry = s * gr.localX + c * gr.localY;
          let tx = clamp(gr.px - rx, S * 0.15, G.vw - S * 0.15);
          let ty = clamp(gr.py - ry, S * 0.1, G.vh - S * 0.1);

          // A different disc is still in the tray: nothing to arm.
          const blocked = loadedRef.current !== null && loadedRef.current !== i;
          const over = !blocked && Math.abs(tx - wellX) < halfDrive && ty < trayBottom;
          if (over !== armedRef.current) {
            armedRef.current = over;
            setArmed(over);
            setLed(over ? "armed" : "idle");
          }
          if (over) {
            // A little magnetism toward the recess.
            tx += (wellX - tx) * 0.22;
            ty += (wellY - ty) * 0.22;
          }

          b.x = tx;
          b.y = ty;
          const fvx = (b.x - prevX) / dt;
          const fvy = (b.y - prevY) / dt;
          b.vx = approach(b.vx, fvx, 0.35, dt);
          b.vy = approach(b.vy, fvy, 0.35, dt);

          if (!rm) {
            // Held off-centre, the disc swings until its centre trails the pointer.
            b.spin += ((rx * b.vy - ry * b.vx) / S) * 1.15 * k;
            b.spin *= Math.pow(over ? 0.6 : 0.86, k);
            b.spin = clamp(b.spin, -7, 7);
            b.rot += b.spin * k;
            const tiltCap = over ? 4 : 16;
            b.tiltY = approach(b.tiltY, clamp(b.vx * 9, -tiltCap, tiltCap), 0.2, dt);
            b.tiltX = approach(b.tiltX, clamp(-b.vy * 9, -tiltCap, tiltCap), 0.2, dt);
          }
          b.lift = approach(b.lift, 1, 0.22, dt);
          b.dirty = true;
        } else if (b.mode === "glide") {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          const f = Math.pow(0.86, k);
          b.vx *= f;
          b.vy *= f;
          b.spin *= f;
          b.rot += b.spin * k;

          // Stay on screen
          const minX = S * 0.15, maxX = G.vw - S * 0.15, minY = S * 0.1, maxY = G.vh - S * 0.1;
          if (b.x < minX || b.x > maxX) { b.x = clamp(b.x, minX, maxX); b.vx *= -0.3; }
          if (b.y < minY || b.y > maxY) { b.y = clamp(b.y, minY, maxY); b.vy *= -0.3; }

          // Discs that aren't inserted can't rest on top of the drive/tray.
          const nx = clamp(b.x, wellX - halfDrive, wellX + halfDrive);
          const ny = Math.min(b.y, trayBottom);
          const dx = b.x - nx;
          const dy = b.y - ny;
          const d = Math.hypot(dx, dy);
          const r = S * 0.5 + 2;
          if (d < r) {
            const ux = d > 0.001 ? dx / d : 0;
            const uy = d > 0.001 ? dy / d : 1;
            b.x += ux * (r - d) * 0.35 * k;
            b.y += uy * (r - d) * 0.35 * k;
          }

          b.lift = approach(b.lift, 0, 0.2, dt);
          b.tiltX = approach(b.tiltX, 0, 0.2, dt);
          b.tiltY = approach(b.tiltY, 0, 0.2, dt);
          if (!b.landed && b.lift < 0.12) {
            b.landed = true;
            sound.current.drop(0.6 + 0.4 * Math.min(1, Math.hypot(b.vx, b.vy)));
          }
          if (b.lift < 0.01 && Math.hypot(b.vx, b.vy) < 0.01 && d >= r - 1) {
            b.mode = "rest";
            b.lift = 0;
          }
          b.dirty = true;
        } else if (b.mode === "tween" && b.tween) {
          const tw = b.tween;
          const p = clamp((now - tw.start) / tw.dur, 0, 1);
          const e = tw.ease(p);
          (Object.keys(tw.to) as Key[]).forEach((key) => {
            const a = tw.from[key] ?? b[key];
            b[key] = a + ((tw.to[key] as number) - a) * e;
          });
          if (tw.arc) b.lift = Math.max(b.lift, Math.sin(Math.PI * p) * tw.arc);
          if (p >= 1) {
            b.tween = undefined;
            b.mode = tw.then;
            tw.resolve();
          }
          b.dirty = true;
        } else if (b.mode === "tray") {
          b.x = wellX;
          b.y = wellY;
          b.lift = 0;
          b.dirty = true;
        } else {
          const target = b.hover;
          if (Math.abs(b.lift - target) > 0.002 || Math.abs(b.tiltX) + Math.abs(b.tiltY) > 0.01) {
            b.lift = approach(b.lift, target, 0.2, dt);
            b.tiltX = approach(b.tiltX, 0, 0.2, dt);
            b.tiltY = approach(b.tiltY, 0, 0.2, dt);
            b.dirty = true;
          }
        }

        if (!b.dirty) return;
        b.dirty = false;
        const outer = outers.current[i];
        const inner = inners.current[i];
        if (!outer || !inner) return;

        const z = b.mode === "tray" ? Z_TRAY_DISC : b.mode === "held" || b.lift > 0.25 || b.mode === "tween" ? Z_HELD : b.rank;
        const l = b.lift;
        const inTray = b.mode === "tray";
        const ox = inTray ? 1 : 1.5 + 11 * l;
        const oy = inTray ? 1.5 : 2.5 + 24 * l;
        const blur = inTray ? 2 : 1.5 + 18 * l;
        const alpha = inTray ? 0.5 : 0.55 - 0.2 * l;

        outer.style.transform = `translate3d(${b.x - S / 2}px, ${b.y - S / 2}px, 0)`;
        outer.style.opacity = "1";
        outer.style.zIndex = String(z);
        outer.style.filter = `drop-shadow(${ox}px ${oy}px ${blur}px rgba(0,0,0,${alpha}))`;
        inner.style.transform = `perspective(${S * 2.6}px) rotateX(${b.tiltX}deg) rotateY(${b.tiltY}deg) rotate(${b.rot}deg) scale(${1 + 0.05 * l})`;
        inner.style.setProperty("--rot", b.rot.toFixed(2));
        inner.style.setProperty("--tilt", (b.tiltY - b.tiltX).toFixed(2));
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [g]);

  /* ---------------- intro: the tray ejects, discs settle ---------------- */

  const introStarted = useRef(false);
  useEffect(() => {
    if (!g || introStarted.current) return;
    introStarted.current = true;
    const back = loadedRef.current;
    // Did the "Back to the drive" tap already start the tray sound? (It has to
    // start inside the tap to play on phones.) Then open in step with it.
    const tapped = sound.current.trayPlayedWithin(2000);
    if (back !== null) {
      // Coming back from a disc: the reverse of loading it. The drive is shut
      // and reading, then the tray ejects with the disc still on it, with the
      // same easing as the close, timed to finish with the tray sound.
      setLed("reading");
      void (async () => {
        const rm = reduced.current;
        if (!tapped) {
          // Back via the browser instead of the link: play the sound here.
          await wait(rm ? 0 : 250);
          await sound.current.ready(600);
          if (!alive.current) return;
          sound.current.trayClose();
        }
        // The clip started at the tap; open over what's left of it.
        const left = tapped ? 900 - sound.current.sinceTrayTap() : 880;
        const openMs = rm ? 280 : Math.round(Math.min(880, Math.max(560, left)));
        setLed("armed");
        await trayTo(0, openMs, easeInOutCubic);
        if (!alive.current) return;
        setLed("idle");
        if (phaseRef.current === "intro") go("idle");
      })();
      if (reduced.current) return;
    } else if (reduced.current) {
      go("idle");
      return;
    }
    bodies.current.forEach((b, i) => {
      if (i === back) return; // rides out on the tray instead
      const spot = g.spots[i];
      b.y = spot.y + g.S * 0.35;
      b.lift = 0.9;
      void tweenBody(i, { y: spot.y, lift: 0 }, 700, { ease: easeOutCubic }).then(() => {
        bodies.current[i].landed = true;
      });
      b.tween!.start += 180 + i * 70;
    });
    if (back !== null) return; // the eject above handles the tray
    void (async () => {
      await wait(250);
      await trayTo(0, 750, easeOutCubic);
      if (alive.current && phaseRef.current === "intro") go("idle");
    })();
  }, [g, go, trayTo, tweenBody]);

  /* ---------------- helpers ---------------- */

  const flash = useCallback((text: string) => {
    setHint(text);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(null), 2200);
  }, []);

  const raise = useCallback((i: number) => {
    const list = bodies.current;
    const others = list.map((b, j) => ({ b, j })).filter((o) => o.j !== i).sort((a, c) => a.b.rank - c.b.rank);
    others.forEach((o, n) => {
      o.b.rank = n + 1;
      o.b.dirty = true;
    });
    list[i].rank = list.length;
  }, []);

  const insert = useCallback(
    async (i: number, approachBy: "drop" | "fly") => {
      const G = geo.current;
      if (!G) return;
      const disc = discs[i];
      const rm = reduced.current;
      go("inserting");
      setLoading(disc);
      loadedRef.current = null;
      setLoadedIdx(null);
      setArmed(false);
      armedRef.current = false;
      setLed("armed");
      const b = bodies.current[i];
      b.spin = 0;
      raise(i);

      const wellY = G.well.y + tray.current.offset;
      if (approachBy === "fly") {
        sound.current.pick();
        await tweenBody(i, { x: G.well.x, y: wellY, lift: 0, tiltX: 0, tiltY: 0 }, rm ? 150 : 720, {
          ease: easeInOutCubic,
          arc: rm ? 0 : 1,
          then: "tray",
        });
      } else {
        await tweenBody(i, { x: G.well.x, y: wellY, lift: 0, tiltX: 0, tiltY: 0 }, rm ? 120 : 340, {
          ease: easeOutCubic,
          then: "tray",
        });
      }
      if (!alive.current) return;
      sound.current.clack();

      await wait(rm ? 0 : 170);
      const closeMs = rm ? 280 : 880;
      const recorded = sound.current.trayClose();
      if (!recorded) sound.current.motor(closeMs);
      await trayTo(G.closedOffset, closeMs, easeInOutCubic);
      if (!alive.current) return;
      if (!recorded) sound.current.clunk();
      setLed("reading");
      sound.current.spin();

      // Reading screen: the disc spins while the bar fills, then the
      // spindle winds down and the section loads.
      await wait(rm ? 0 : 250);
      if (!alive.current) return;
      setReading("on");
      await wait(rm ? 600 : READ_MS);
      if (!alive.current) return;
      setReading("done");
      // Open the page only once the spindle has wound down.
      await sound.current.spindleStop();
      writeLoaded(disc.slug);
      if (alive.current) router.push(discHref(disc.slug));
    },
    [discs, go, raise, router, trayTo, tweenBody],
  );

  /* ---------------- pointer + keyboard ---------------- */

  const handlersFor = (i: number) => ({
    onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
      if (phaseRef.current === "inserting" || e.button !== 0 || grab.current) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      const b = bodies.current[i];
      b.tween?.resolve();
      b.tween = undefined;
      const dx = e.clientX - b.x;
      const dy = e.clientY - b.y;
      const c = Math.cos(b.rot * RAD);
      const s = Math.sin(b.rot * RAD);
      grab.current = {
        index: i,
        pointerId: e.pointerId,
        px: e.clientX,
        py: e.clientY,
        localX: c * dx + s * dy,
        localY: -s * dx + c * dy,
        downX: e.clientX,
        downY: e.clientY,
        downAt: performance.now(),
        moved: 0,
      };
      if (loadedRef.current === i) {
        loadedRef.current = null;
        setLoadedIdx(null);
        writeLoaded(null);
      }
      b.mode = "held";
      b.spin = 0;
      b.landed = false;
      raise(i);
      go("holding");
      setHint(null);
      sound.current.pick();
    },
    onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
      const gr = grab.current;
      if (!gr || gr.pointerId !== e.pointerId) return;
      gr.px = e.clientX;
      gr.py = e.clientY;
      gr.moved = Math.max(gr.moved, Math.hypot(e.clientX - gr.downX, e.clientY - gr.downY));
    },
    onPointerUp(e: ReactPointerEvent<HTMLButtonElement>) {
      release(e.pointerId, false);
    },
    onPointerCancel(e: ReactPointerEvent<HTMLButtonElement>) {
      release(e.pointerId, true);
    },
    onPointerEnter(e: ReactPointerEvent<HTMLButtonElement>) {
      if (e.pointerType !== "mouse" || phaseRef.current === "inserting") return;
      const b = bodies.current[i];
      b.hover = 0.14;
      b.dirty = true;
    },
    onPointerLeave() {
      const b = bodies.current[i];
      b.hover = 0;
      b.dirty = true;
    },
    onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (phaseRef.current === "inserting" || grab.current) return;
      if (loadedRef.current !== null && loadedRef.current !== i) {
        flash("Take out the disc first.");
        return;
      }
      void insert(i, "fly");
    },
  });

  function release(pointerId: number, cancelled: boolean) {
    const gr = grab.current;
    if (!gr || gr.pointerId !== pointerId) return;
    grab.current = null;
    const i = gr.index;
    const b = bodies.current[i];
    const tap = gr.moved < 6 && performance.now() - gr.downAt < 300;
    const G = geo.current;
    const overFullTray =
      loadedRef.current !== null &&
      G !== null &&
      Math.abs(b.x - G.well.x) < G.driveW / 2 &&
      b.y < G.bezelH + G.trayH + tray.current.offset;

    if (armedRef.current && !cancelled && !tap) {
      void insert(i, "drop");
      return;
    }

    armedRef.current = false;
    setArmed(false);
    setLed("idle");
    const speed = Math.hypot(b.vx, b.vy);
    const cap = 2.4;
    if (speed > cap) {
      b.vx *= cap / speed;
      b.vy *= cap / speed;
    }
    b.mode = "glide";
    go("idle");
    if (overFullTray) flash("Take out the disc first.");
    else if (tap) flash("Drag it into the drive.");
  }

  /* ---------------- sound toggle ---------------- */

  useEffect(() => {
    const s = sound.current;
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const sync = () => setSoundLocked(s.isLocked());
    sync();
    return s.onLockChange(sync);
  }, []);

  const toggleSound = () => {
    // Blocked by the browser: this tap unlocks audio rather than muting.
    if (soundOn && soundLocked) {
      sound.current.unlock();
      sound.current.clack();
      return;
    }
    const next = !soundOn;
    setSoundOn(next);
    sound.current.setEnabled(next);
    if (next) sound.current.clack();
    try {
      localStorage.setItem("rk-drive-sound", next ? "on" : "off");
    } catch {
      /* ignore */
    }
  };

  /* ---------------- markup ---------------- */

  const bubbleText =
    phase === "holding"
      ? armed
        ? "Let go to load it."
        : loadedIdx !== null
          ? "Take out the disc first."
          : "Bring it up here."
      : hint ?? (loadedIdx !== null ? "Take out the disc." : "Pick a disc. Drop it in.");
  const showBubble = g && phase !== "inserting" && phase !== "intro";

  return (
    <main
      className={styles.scene}
      data-phase={phase}
      data-ready={g ? "" : undefined}
      aria-labelledby="drive-title"
    >
      <div className={styles.floor} aria-hidden="true" />

      <header className={styles.header}>
        <h1 id="drive-title" className={styles.name}>
          Rajvee Kadchha
        </h1>
        <p className={styles.role}>Frontend developer</p>
      </header>

      <div className={styles.controls}>
      <ThemeToggle className={styles.themeBtn} />
      <button
        type="button"
        className={styles.sound}
        onClick={toggleSound}
        data-locked={soundOn && soundLocked ? "" : undefined}
        aria-pressed={soundOn}
        aria-label={
          soundOn && soundLocked
            ? `${coarse ? "Tap" : "Click"} to turn sound on`
            : soundOn
              ? "Sound on. Turn sound off"
              : "Sound off. Turn sound on"
        }
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
          {soundOn ? (
            <>
              <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
              <path d="M18.2 6.6a7.6 7.6 0 0 1 0 10.8" />
            </>
          ) : (
            <path d="M16 9.5l5 5M21 9.5l-5 5" />
          )}
        </svg>
        <span className={styles.soundLabel}>
          {soundOn && soundLocked ? `${coarse ? "Tap" : "Click"} for sound` : soundOn ? "Sound on" : "Sound off"}
        </span>
      </button>
      </div>

      <p className={styles.srOnly}>
        Drag a disc onto the drive tray to open that section. With a keyboard, tab to a disc and press Enter.
      </p>

      {g && (
        <>
          <DriveTray g={g} led={led} trayRef={trayEl} />

          {showBubble && (
            <div
              className={`${styles.bubble} ${g.bubble === "right" ? styles.bubbleRight : styles.bubbleInside}`}
              data-armed={armed || undefined}
              style={
                g.bubble === "right"
                  ? { left: g.trayX + g.trayW + 18, top: g.well.y }
                  : { left: g.well.x, top: g.well.y }
              }
              aria-hidden="true"
            >
              {bubbleText}
            </div>
          )}

          <div className={styles.discs}>
            {discs.map((d, i) => (
              <Disc
                key={d.slug}
                disc={d}
                index={i}
                size={g.S}
                disabled={phase === "inserting"}
                loaded={loadedIdx === i && phase !== "intro"}
                outerRef={(el) => {
                  outers.current[i] = el;
                  if (el && bodies.current[i]) bodies.current[i].dirty = true;
                }}
                innerRef={(el) => {
                  inners.current[i] = el;
                }}
                {...handlersFor(i)}
              />
            ))}
          </div>
        </>
      )}

      <footer className={styles.footer}>
        <p className={styles.tagline}>Everything I&apos;ve built, burned to disc.</p>
        <nav className={styles.skip} aria-label="Sections">
          <span>Skip the drive:</span>
          {discs.map((d) => (
            <Link key={d.slug} href={discHref(d.slug)}>
              {d.title}
            </Link>
          ))}
        </nav>
      </footer>

      <ReadingScreen
        disc={loading}
        on={reading !== "off"}
        done={reading === "done"}
        readMs={READ_MS}
        reduced={reduced.current}
      />
      <p className={styles.srOnly} aria-live="polite">
        {loading ? `Loading ${loading.title}…` : ""}
      </p>
    </main>
  );
}
