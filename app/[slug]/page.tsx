import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DISCS, DISC_ACCENT, discHref, getDisc } from "@/lib/discs";
import { PROFILE } from "@/lib/portfolio";
import { DiscFace } from "@/components/disc-drive/Disc";
import { BackToDrive } from "@/components/disc-drive/BackToDrive";
import { PAGES } from "./sections";
import { PAGE_LEDES } from "./ledes";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./disc-page.module.css";

// Pre-render one page per disc (needed for static export / GitHub Pages).
export function generateStaticParams() {
  return DISCS.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const disc = getDisc(slug);
  if (!disc) return { title: PROFILE.name };
  const title = `${disc.title} — ${PROFILE.name}`;
  const description = PAGE_LEDES[disc.slug];
  // This page's own preview card (public/og/<slug>.jpg, made by scripts/make-og.sh).
  const image = {
    url: `/og/${disc.slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `${disc.title}, ${PROFILE.name}. ${description}`,
  };
  return {
    title,
    description,
    alternates: { canonical: discHref(disc.slug) },
    openGraph: {
      type: "website",
      siteName: PROFILE.name,
      locale: "en_IN",
      url: discHref(disc.slug),
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}


export default async function DiscPage({ params }: Props) {
  const { slug } = await params;
  const disc = getDisc(slug);
  if (!disc) notFound();
  const index = DISCS.indexOf(disc);
  const next = DISCS[(index + 1) % DISCS.length];
  const page = PAGES[disc.slug];
  const Body = page.Body;

  return (
    <main
      className={styles.page}
      style={{ "--accent-light": DISC_ACCENT[disc.finish][0], "--accent-dark": DISC_ACCENT[disc.finish][1] } as CSSProperties}
    >
      <nav className={styles.bar} aria-label="Discs">
        <BackToDrive className={styles.back}>
          <span aria-hidden="true">←</span> Back to the drive
        </BackToDrive>
        <div className={styles.barRight}>
        <ul className={styles.switcher}>
          {DISCS.map((d) => (
            <li key={d.slug}>
              <Link
                href={discHref(d.slug)}
                className={styles.switch}
                aria-current={d.slug === disc.slug ? "page" : undefined}
                title={d.title}
              >
                <span className={styles.miniDisc} aria-hidden="true">
                  <DiscFace disc={d} idSuffix="-mini" />
                </span>
                <span className={styles.switchLabel}>{d.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle className={styles.themeBtn} />
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>
            Disc {index + 1} of {DISCS.length} <span aria-hidden="true">·</span> Now playing
          </p>
          <h1 className={styles.title}>{disc.title}</h1>
          <p className={styles.lede}>{page.lede}</p>
          {page.actions && <div className={styles.actions}>{page.actions}</div>}
        </div>
        <div className={styles.heroDisc} aria-hidden="true">
          <span className={styles.spin}>
            <DiscFace disc={disc} idSuffix="-hero" />
          </span>
        </div>
      </header>

      <div className={styles.wrap}>
        <Body />
      </div>

      <footer className={styles.foot}>
        <Link href={discHref(next.slug)} className={styles.next}>
          <span className={styles.nextDisc} aria-hidden="true">
            <DiscFace disc={next} idSuffix="-next" />
          </span>
          <span>
            <span className={styles.kicker}>Next disc</span>
            <span className={styles.nextTitle}>
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
        <div className={styles.footMeta}>
          <BackToDrive className={styles.back}>
            <span aria-hidden="true">←</span> Back to the drive
          </BackToDrive>
          <span className={styles.kicker}>
            {PROFILE.name} · {PROFILE.role}
          </span>
        </div>
      </footer>
    </main>
  );
}
