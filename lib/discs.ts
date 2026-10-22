export type DiscFinish = "silver" | "gold" | "white" | "teal" | "coral" | "blue";

/** Handwriting used for the label. Styles live in components/disc-drive/Disc.tsx. */
export type DiscHand = "marker" | "scratchy" | "cursive" | "pen" | "casual" | "ballpoint";

export interface DiscData {
  /** Page URL: /<slug> (same paths as the old site) */
  slug: string;
  /** Name shown on the page the disc opens */
  title: string;
  /** What's "written in marker" on the disc */
  label: string;
  /** Smaller marker note under the label */
  note?: string;
  finish: DiscFinish;
  doodle?: "underline" | "smiley" | "check" | "arrow" | "sparkle" | "star";
  /** Whose handwriting is on the label */
  hand: DiscHand;
}

/**
 * Order matters: earlier discs sit lower in the pile, the last one is on top.
 * Add/remove entries freely — the pile and the static routes follow this list.
 */
export const DISCS: DiscData[] = [
  { slug: "work", title: "Work", label: "work", note: "where I’ve worked", finish: "silver", doodle: "underline", hand: "marker" },
  { slug: "projects", title: "Projects", label: "projects", note: "things I’ve built", finish: "blue", doodle: "star", hand: "ballpoint" },
  { slug: "about", title: "About", label: "about me", finish: "gold", doodle: "smiley", hand: "scratchy" },
  { slug: "resume", title: "Resume", label: "résumé", note: "2026 ed.", finish: "white", doodle: "check", hand: "cursive" },
  { slug: "contact", title: "Contact", label: "contact", note: "say hi", finish: "teal", doodle: "arrow", hand: "pen" },
  { slug: "instagram", title: "Content Creation", label: "content creation", note: "chaotic_brews", finish: "coral", doodle: "sparkle", hand: "casual" },
];

/** Each page borrows its accent from the disc's printed finish: [light theme, dark theme]. */
export const DISC_ACCENT: Record<DiscFinish, [string, string]> = {
  silver: ["#5d6773", "#c3cad3"],
  gold: ["#9a6e0c", "#e6b84a"],
  white: ["#8a744a", "#efe6d2"],
  teal: ["#0d7f71", "#4cc2b0"],
  coral: ["#d4452f", "#ff8a74"],
  blue: ["#2a56d6", "#7fa2ff"],
};

/** URL of the page a disc opens. */
export function discHref(slug: string) {
  return `/${slug}`;
}

export function getDisc(slug: string): DiscData | undefined {
  return DISCS.find((d) => d.slug === slug);
}
