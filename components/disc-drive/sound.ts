/**
 * Drive foley. Tray close and spindle spin-up use the recordings in
 * public/assets; everything else is synthesized with the Web Audio API.
 * If a recording hasn't loaded yet, the synthesized version plays instead.
 *
 * Sound is on by default (a visitor can turn it off; that choice is saved).
 * One engine is shared for the whole visit, so the AudioContext survives
 * client-side navigation. Phones (iOS Safari especially) only let audio start
 * inside a tap, so the engine unlocks itself on the first tap/click anywhere,
 * and the "Back to the drive" links unlock it during their tap, so the tray
 * sound can play when the drive page opens.
 */

/** Master volume for everything (0–1). */
const VOLUME = 0.5;

// If basePath is set in next.config.ts, prefix these with it.
const CLIPS = {
  trayClose: "/assets/cd-tray-close.mp3",
  spindleStart: "/assets/cd-spindle-start-v2.mp3",
  spindleStop: "/assets/cd-spindle-stop-v2.mp3",
} as const;
type Clip = keyof typeof CLIPS;

export interface DriveSound {
  setEnabled(on: boolean): void;
  pick(): void;
  drop(strength?: number): void;
  clack(): void;
  motor(ms: number): void;
  clunk(): void;
  spin(): void;
  /** Resolves when the recordings have loaded, or after maxMs. */
  ready(maxMs: number): Promise<void>;
  /** Recorded tray close. Returns false if the clip isn't ready. */
  trayClose(): boolean;
  /** Plays the spindle wind-down; resolves when it has finished (or straight away-ish if sound is off). */
  spindleStop(): Promise<void>;
  /**
   * Tray sound for "Back to the drive". Call it inside the tap: phones always
   * allow audio started in a tap, so this plays even on iOS.
   */
  trayFromTap(): void;
  /** True if trayFromTap() ran in the last `ms` milliseconds. */
  trayPlayedWithin(ms: number): boolean;
  /** Milliseconds since trayFromTap() ran (Infinity if it hasn't). */
  sinceTrayTap(): number;
  /** Call inside a tap/click: creates and resumes the audio context so later sounds can play on phones. */
  unlock(): void;
  /** True until the browser lets audio play (phones need a tap first; a drag doesn't count on iOS). */
  isLocked(): boolean;
  /** Called whenever the locked state may have changed. Returns an unsubscribe function. */
  onLockChange(cb: () => void): () => void;
}

let shared: DriveSound | null = null;

/** The one sound engine for this visit. */
export function getDriveSound(): DriveSound {
  if (!shared) {
    shared = createDriveSound();
    if (typeof window !== "undefined") {
      const unlock = () => shared?.unlock();
      for (const type of ["pointerdown", "pointerup", "mousedown", "touchend", "keydown", "click"]) {
        window.addEventListener(type, unlock, { capture: true, passive: true });
      }
    }
  }
  return shared;
}

function createDriveSound(): DriveSound {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let noise: AudioBuffer | null = null;
  // On unless the visitor turned it off earlier (saved by the sound toggle).
  let enabled = (() => {
    try {
      return typeof window === "undefined" || localStorage.getItem("rk-drive-sound") !== "off";
    } catch {
      return true;
    }
  })();
  let trayTapAt = -Infinity;
  const clips: Partial<Record<Clip, AudioBuffer>> = {};
  let loaded: Promise<unknown> | null = null;

  function loadClips(c: AudioContext) {
    if (loaded) return;
    loaded = Promise.all(
      (Object.keys(CLIPS) as Clip[]).map(async (name) => {
        try {
          const res = await fetch(CLIPS[name]);
          if (!res.ok) return;
          clips[name] = await c.decodeAudioData(await res.arrayBuffer());
        } catch {
          // Keep the synthesized fallback.
        }
      }),
    );
  }

  /** Plays a recording. Returns its length in seconds, or 0 if it couldn't play. */
  function playFor(name: Clip, volume = 1): number {
    const c = audio();
    const buf = clips[name];
    if (!c || !buf) return 0;
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.value = volume;
    src.connect(g).connect(out(c));
    src.start();
    return buf.duration;
  }

  function play(name: Clip, volume = 1): boolean {
    const c = audio();
    const buf = clips[name];
    if (!c || !buf) return false;
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.value = volume;
    src.connect(g).connect(out(c));
    src.start();
    return true;
  }

  /** Everything plays through the master gain, so VOLUME scales it all. */
  function out(c: AudioContext): AudioNode {
    return toMaster(c);
  }

  function toMaster(c: AudioContext): AudioNode {
    if (!master) {
      master = c.createGain();
      master.gain.value = VOLUME;
      master.connect(c.destination);
    }
    return master;
  }

  function ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      ctx.onstatechange = notify;
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      loadClips(ctx);
    }
    return ctx;
  }

  function audio(): AudioContext | null {
    if (!enabled) return null;
    const c = ensure();
    if (c && c.state === "suspended") void c.resume();
    return c;
  }

  const lockListeners = new Set<() => void>();
  function notify() {
    lockListeners.forEach((cb) => cb());
  }

  function env(c: AudioContext, peak: number, dur: number, at: number, attack = 0.002) {
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    g.connect(out(c));
    return g;
  }

  /** Filtered noise burst: plastic ticks and clacks. */
  function tick(freq: number, dur: number, peak: number, q = 6, delay = 0) {
    const c = audio();
    if (!c || !noise) return;
    const at = c.currentTime + delay;
    const src = c.createBufferSource();
    src.buffer = noise;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = q;
    src.connect(bp).connect(env(c, peak, dur, at));
    src.start(at, Math.random() * 0.5, dur + 0.05);
  }

  /** Falling sine: soft thuds. */
  function thud(f0: number, f1: number, dur: number, peak: number, delay = 0) {
    const c = audio();
    if (!c) return;
    const at = c.currentTime + delay;
    const o = c.createOscillator();
    o.frequency.setValueAtTime(f0, at);
    o.frequency.exponentialRampToValueAtTime(f1, at + dur);
    o.connect(env(c, peak, dur, at, 0.004));
    o.start(at);
    o.stop(at + dur + 0.05);
  }

  return {
    setEnabled(on) {
      enabled = on;
      if (on) audio();
    },
    unlock() {
      const c = ensure();
      if (!c || c.state === "running") return;
      // iOS needs a sound started inside the gesture; a 1-sample silent buffer
      // does it. Repeat on every attempt until the context is actually running,
      // since some events (like the end of a drag) don't count as a tap.
      const src = c.createBufferSource();
      src.buffer = c.createBuffer(1, 1, c.sampleRate);
      src.connect(c.destination);
      src.start(0);
      void c.resume().then(notify, notify);
    },
    isLocked() {
      return !ctx || ctx.state !== "running";
    },
    onLockChange(cb) {
      lockListeners.add(cb);
      return () => lockListeners.delete(cb);
    },
    pick() {
      tick(3400, 0.03, 0.18, 8);
      tick(1900, 0.04, 0.08, 6, 0.012);
    },
    drop(strength = 1) {
      tick(1100, 0.05, 0.22 * strength, 3);
      thud(150, 60, 0.12, 0.3 * strength);
    },
    clack() {
      tick(2300, 0.035, 0.32, 5);
      tick(1500, 0.05, 0.22, 4, 0.028);
      thud(240, 90, 0.07, 0.2);
    },
    motor(ms) {
      const c = audio();
      if (!c || !noise) return;
      const at = c.currentTime;
      const end = at + ms / 1000;
      const out = c.createGain();
      out.gain.setValueAtTime(0.0001, at);
      out.gain.exponentialRampToValueAtTime(0.06, at + 0.06);
      out.gain.setValueAtTime(0.06, end - 0.08);
      out.gain.exponentialRampToValueAtTime(0.0001, end);
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 650;
      lp.connect(out).connect(toMaster(c));

      const saw = c.createOscillator();
      saw.type = "sawtooth";
      saw.frequency.setValueAtTime(64, at);
      saw.frequency.linearRampToValueAtTime(82, end);
      const wobble = c.createOscillator();
      wobble.frequency.value = 9;
      const depth = c.createGain();
      depth.gain.value = 5;
      wobble.connect(depth).connect(saw.frequency);
      saw.connect(lp);

      const hiss = c.createBufferSource();
      hiss.buffer = noise;
      const hissGain = c.createGain();
      hissGain.gain.value = 0.35;
      hiss.connect(hissGain).connect(lp);

      [saw, wobble, hiss].forEach((n) => {
        n.start(at);
        n.stop(end + 0.05);
      });
    },
    clunk() {
      thud(120, 45, 0.2, 0.42);
      tick(750, 0.08, 0.26, 2);
    },
    ready(maxMs) {
      if (!enabled || !loaded) return Promise.resolve();
      return Promise.race([loaded.then(() => undefined), new Promise<void>((r) => setTimeout(r, maxMs))]);
    },
    trayClose() {
      return play("trayClose");
    },
    trayFromTap() {
      if (!enabled) return;
      trayTapAt = performance.now();
      if (!play("trayClose")) this.motor(880);
    },
    trayPlayedWithin(ms) {
      return performance.now() - trayTapAt < ms;
    },
    sinceTrayTap() {
      return performance.now() - trayTapAt;
    },
    spindleStop() {
      const secs = playFor("spindleStop");
      // Wait for the clip to finish; if nothing played, keep a short beat.
      return new Promise<void>((r) => setTimeout(r, secs ? secs * 1000 + 80 : 600));
    },
    spin() {
      if (play("spindleStart")) return;
      const c = audio();
      if (!c) return;
      const at = c.currentTime;
      const o = c.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(160, at);
      o.frequency.exponentialRampToValueAtTime(1150, at + 0.9);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.025, at + 0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 1.0);
      o.connect(g).connect(out(c));
      o.start(at);
      o.stop(at + 1.05);
    },
  };
}
