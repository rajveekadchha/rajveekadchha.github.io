import type { Metadata } from "next";
import { OgCard } from "./OgCard";

// Not a real page: it draws the 1200×630 link-preview cards, which
// scripts/make-og.sh screenshots into public/og/*.jpg. Unlinked and not indexed.
export const metadata: Metadata = {
  title: "Preview card",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OgCard />;
}
