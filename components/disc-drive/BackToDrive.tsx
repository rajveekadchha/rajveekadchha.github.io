"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { getDriveSound } from "./sound";

/**
 * Link back to the drive. Starts the tray sound inside the tap itself: phones
 * (iOS Safari especially) block audio that starts after a tap has ended, so
 * waiting for the drive page to load would leave it silent. The drive page
 * sees the sound already playing and opens the tray in step with it.
 */
export function BackToDrive({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Link href="/" className={className} onClick={() => {
        const s = getDriveSound();
        s.unlock();
        s.trayFromTap();
      }}>
      {children}
    </Link>
  );
}
