/* eslint-disable @next/next/no-img-element -- static export, images are pre-sized */
import type { ReactNode } from "react";
import Link from "next/link";
import { getDisc, type DiscHand } from "@/lib/discs";
import { ABOUT, CONTACT, JOBS, MEDIA_KIT, PROFILE, PROJECTS, RESUME, type Job } from "@/lib/portfolio";
import { handFont } from "@/components/disc-drive/Disc";
import styles from "./disc-page.module.css";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/** A section heading styled like a CD track listing: "Track 01 · Experience". */
function Track({ n, label, title, id }: { n: number; label: string; title?: string; id: string }) {
  return (
    <div className={styles.track}>
      <p className={styles.trackNo}>
        <span>Track {String(n).padStart(2, "0")}</span>
        <span aria-hidden="true" className={styles.trackLine} />
        <span>{label}</span>
      </p>
      {title ? (
        <h2 id={id} className={styles.h2}>
          {title}
        </h2>
      ) : (
        <h2 id={id} className={styles.srOnly}>
          {label}
        </h2>
      )}
    </div>
  );
}

/** A handwritten note in the page's disc handwriting. */
function Scribble({ hand, children, className = "" }: { hand: DiscHand; children: ReactNode; className?: string }) {
  return (
    <span className={`${styles.scribble} ${className}`} style={{ fontFamily: handFont(hand) }}>
      {children}
    </span>
  );
}

const handOf = (slug: string): DiscHand => getDisc(slug)?.hand ?? "marker";

function TimelineList({ items, compact = false }: { items: Job[]; compact?: boolean }) {
  return (
    <ol className={styles.timeline}>
      {items.map((j) => (
        <li key={j.company} className={styles.tlItem}>
          <div className={styles.tlWhen}>
            {/* Split repeat stints ("Feb 2024 – Dec 2024 · Jan 2026 – Present") onto their own lines. */}
            {j.period.split(" · ").map((range) => (
              <p key={range} className={styles.tlRange}>
                {range}
              </p>
            ))}
            {j.where && <p>{j.where}</p>}
          </div>
          <div className={styles.tlBody}>
            <h3 className={styles.h3}>
              {j.role}
              {j.company && (
                <>
                  {" "}
                  <span className={styles.at}>at</span> {j.company}
                </>
              )}
            </h3>
            {j.client && <p className={styles.client}>Client: {j.client}</p>}
            {!compact && (
              <ul className={styles.bullets}>
                {j.points.map((p) => (
                  <li key={p.slice(0, 32)}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Work ---------------- */

function WorkBody() {
  return (
    <section className={styles.section} aria-labelledby="jobs">
      <Track n={1} label="Experience" title="Where I’ve worked" id="jobs" />
      <TimelineList items={JOBS} />
    </section>
  );
}

/* ---------------- Projects ---------------- */

function ProjectsBody() {
  const hand = handOf("projects");
  return (
    <>
      <section className={styles.section} aria-labelledby="projects">
        <Track n={1} label="Projects" title="Things I’ve built" id="projects" />
        <div className={styles.projects}>
          {PROJECTS.map((p, i) => (
            <article key={p.title} className={styles.card}>
              <a href={p.link} {...ext} className={styles.shot} tabIndex={-1} aria-hidden="true">
                <img src={p.image} alt="" width={p.w} height={p.h} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              </a>
              <div className={styles.cardBody}>
                <p className={styles.cardNo}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.body}>{p.description}</p>
                <ul className={styles.chips} aria-label="Built with">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a href={p.link} {...ext} className={styles.textLink}>
                  View project <span aria-hidden="true">↗</span>
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                </a>
                {i === 0 && <Scribble hand={hand} className={styles.cardScribble}>client work!</Scribble>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------------- About ---------------- */

function AboutBody() {
  const hand = handOf("about");
  return (
    <section className={`${styles.section} ${styles.aboutGrid}`} aria-labelledby="hey">
      <aside className={styles.aboutSide}>
        <figure className={styles.polaroid}>
          <img src={PROFILE.photo} alt="Rajvee standing in front of a wall that reads ready().set(code())" width={1000} height={1108} />
          <figcaption>
            <Scribble hand={hand}>that’s me ↑</Scribble>
          </figcaption>
        </figure>
        <dl className={styles.facts}>
          {ABOUT.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                {f.href ? (
                  <a href={f.href} {...ext}>
                    {f.value} <span aria-hidden="true">↗</span>
                  </a>
                ) : f.label === "Open to work" ? (
                  <span className={styles.status}>{f.value}</span>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className={styles.prose}>
        <Track n={1} label="Liner notes" title={ABOUT.heading} id="hey" />
        {ABOUT.bio.map((p, i) => (
          <p key={p.slice(0, 24)} className={i === 0 ? styles.first : undefined}>
            {p}
          </p>
        ))}

        <div className={styles.likes}>
          <p className={styles.kicker}>Off the clock</p>
          <ul className={styles.likeList}>
            {ABOUT.likes.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        <p className={styles.linkRow}>
          <a href={PROFILE.links.instagram.href} {...ext} className={styles.pill}>
            Instagram {PROFILE.links.instagram.label} <span aria-hidden="true">↗</span>
          </a>
          <a href={PROFILE.links.github.href} {...ext} className={styles.pill}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Resume ---------------- */

function ResumeBody() {
  return (
    <>
      <section className={styles.section} aria-labelledby="skills">
        <Track n={1} label="Skills" id="skills" />
        <dl className={styles.skills}>
          {RESUME.skills.map((s) => (
            <div key={s.group}>
              <dt>{s.group}</dt>
              <dd>
                <ul className={styles.chips}>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="experience">
        <Track n={2} label="Experience" id="experience" />
        <TimelineList items={RESUME.experience} compact />
        <p className={styles.moreLink}>
          <Link href="/work" className={styles.textLink}>
            Full details on the Work disc <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      <section className={styles.section} aria-labelledby="resume-projects">
        <Track n={3} label="Projects" id="resume-projects" />
        <ul className={styles.resumeProjects}>
          {RESUME.projects.map((p) => (
            <li key={p.name}>
              <h3 className={styles.h3}>{p.name}</h3>
              <p className={styles.body}>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="education">
        <Track n={4} label="Education" id="education" />
        <div className={styles.edu}>
          <p className={styles.h3}>{RESUME.education.school}</p>
          <p className={styles.muted}>{RESUME.education.degree}</p>
        </div>
      </section>
    </>
  );
}

/* ---------------- Contact ---------------- */

function ContactBody() {
  const rows = [
    { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: "LinkedIn", value: PROFILE.links.linkedin.label, href: PROFILE.links.linkedin.href },
    { label: "GitHub", value: PROFILE.links.github.label, href: PROFILE.links.github.href },
    { label: "Instagram", value: PROFILE.links.instagram.label, href: PROFILE.links.instagram.href },
  ];
  return (
    <section className={`${styles.section} ${styles.contactGrid}`} aria-labelledby="reach">
      <div>
        <Track n={1} label="Reach me at" id="reach" />
        <ul className={styles.contactList}>
          {rows.map((r) => (
            <li key={r.label}>
              <a href={r.href} {...(r.href.startsWith("mailto:") ? {} : ext)}>
                <span className={styles.contactLabel}>{r.label}</span>
                <span className={styles.contactValue}>{r.value}</span>
                <span className={styles.contactArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <aside className={styles.note}>
        <p className={styles.noteEmoji} aria-hidden="true">
          💌
        </p>
        <h2 className={styles.h3}>{CONTACT.open.title}</h2>
        <p className={styles.body}>{CONTACT.open.text}</p>
        <hr className={styles.rule} />
        <p className={styles.kicker}>A small note</p>
        <p className={styles.body}>{CONTACT.note}</p>
        <p className={styles.muted}>{CONTACT.reply}</p>
      </aside>
    </section>
  );
}

/* ---------------- Content creation ---------------- */

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("en");
const fmt = (n: number) => (n >= 1000 ? compact.format(n) : whole.format(Math.round(n)));

/** Instagram insights: 90-day totals, audience, and what one reel does on average. */
function Insights() {
  const ins = MEDIA_KIT.insights;
  const perReel = [
    { label: "Views", value: ins.views },
    { label: "Viewers", value: ins.viewers },
    ...ins.interactions,
  ].map((x) => ({ ...x, avg: x.value / ins.reels }));
  const reach = Math.round(ins.viewers / ins.followers);

  return (
    <section className={styles.section} aria-labelledby="numbers">
      <Track n={1} label={`Insights · ${ins.period} · ${ins.days} days`} title="By the numbers" id="numbers" />
      <div className={styles.insights}>
        <div className={styles.insightMain}>
          <dl className={styles.bigStats}>
            <div>
              <dd>{fmt(ins.views)}</dd>
              <dt>Reel views</dt>
            </div>
            <div>
              <dd>{fmt(ins.viewers)}</dd>
              <dt>Viewers</dt>
            </div>
          </dl>
          <p className={styles.reach}>
            Viewers were <strong>{reach}×</strong> my follower count ({whole.format(ins.followers)} followers).
          </p>
          <dl className={styles.interactions}>
            {ins.interactions.map((x) => (
              <div key={x.label}>
                <dd>{fmt(x.value)}</dd>
                <dt>{x.label}</dt>
              </div>
            ))}
            <div>
              <dd>{ins.reels}</dd>
              <dt>Reels</dt>
            </div>
          </dl>
        </div>

        <div className={styles.audience}>
          <p className={styles.kicker}>Audience · {whole.format(ins.followers)} followers</p>

          <div className={styles.audienceBlock}>
            <div className={styles.meterHead}>
              <span>Women</span>
              <span>Men</span>
            </div>
            <div
              className={styles.split}
              role="img"
              aria-label={`Women ${ins.gender.women}%, men ${ins.gender.men}%`}
            >
              <span style={{ width: `${ins.gender.women}%` }} title={`Women: ${ins.gender.women}%`}>
                {ins.gender.women.toFixed(1)}%
              </span>
              <span style={{ width: `${ins.gender.men}%` }} title={`Men: ${ins.gender.men}%`}>
                {ins.gender.men.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className={styles.audienceBlock}>
            <p className={styles.miniHead}>Age range</p>
            <ul className={styles.ageBars}>
              {ins.age.map((a) => (
                <li key={a.label} title={`${a.label}: ${a.value}%`}>
                  <span className={styles.ageLabel}>{a.label}</span>
                  <span className={styles.meter} role="img" aria-label={`${a.label}: ${a.value}%`}>
                    <span style={{ width: `${a.value}%` }} />
                  </span>
                  <span className={styles.ageValue}>{a.value.toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.audienceBlock} ${styles.places}`}>
            {[
              { head: "Top countries", rows: ins.countries },
              { head: "Top cities", rows: ins.cities },
            ].map((g) => (
              <div key={g.head}>
                <p className={styles.miniHead}>{g.head}</p>
                <ol className={styles.ranked}>
                  {g.rows.map((r) => (
                    <li key={r.label}>
                      <span>{r.label}</span>
                      <strong>{r.value.toFixed(1)}%</strong>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.perReel}>
        <div className={styles.perReelHead}>
          <h3 className={styles.h3}>One reel, on average</h3>
          <p className={styles.muted}>
            {ins.days}-day totals ÷ {ins.reels} reels. Likes, comments, reposts, shares and saves also include posts, so
            treat them as approximate.
          </p>
        </div>
        <dl className={styles.perReelStats}>
          {perReel.map((x) => (
            <div key={x.label}>
              <dd>{fmt(x.avg)}</dd>
              <dt>{x.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ContentBody() {
  const m = MEDIA_KIT;
  const hand = handOf("instagram");
  return (
    <>
      {/* Photo-led opener: the work is the pitch. */}
      <div className={styles.bento}>
        {m.photos.map((p, i) => (
          <figure key={p.src} className={styles.bentoItem}>
            <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={i < 2 ? "eager" : "lazy"} />
            {p.caption && (
              <figcaption>
                <Scribble hand={hand}>{p.caption}</Scribble>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Insights />

      <section className={`${styles.section} ${styles.account}`} aria-labelledby="account">
        <figure className={styles.accountPhoto}>
          <img src={m.hero.src} alt={m.hero.alt} width={m.hero.w} height={m.hero.h} loading="lazy" />
          <figcaption>
            <Scribble hand={hand}>the ten quiet minutes ☕</Scribble>
          </figcaption>
        </figure>
        <div className={styles.prose}>
          <Track n={2} label="The account" title={m.account.heading} id="account" />
          <p className={styles.first}>{m.account.text[0]}</p>
          <blockquote className={styles.quote}>“{m.account.quote}”</blockquote>
          <p>{m.account.text[1]}</p>
          <div className={styles.mkLists}>
            <div>
              <p className={styles.kicker}>Formats</p>
              <ul className={styles.chips}>
                {m.formats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.kicker}>Categories</p>
              <ul className={styles.chips}>
                {m.categories.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="reels">
        <Track n={3} label="Recent reels" title="Concepted, shot and edited by me" id="reels" />
        <ul className={styles.reelGrid} aria-label="Reels, scroll sideways for more">
          {m.reels.map((r) => (
            <li key={r.href}>
              <a href={r.href} {...ext} className={styles.reel} data-kind={r.kind}>
                {r.image ? (
                  <img src={r.image} alt="" width={460} height={460} loading="lazy" />
                ) : (
                  <Scribble hand={hand} className={styles.reelMark}>
                    {r.note}
                  </Scribble>
                )}
                <span className={styles.reelPlay} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                  </svg>
                </span>
                <span className={styles.reelInfo}>
                  <span className={styles.reelBrand}>{r.brand}</span>
                  {r.image && <span className={styles.reelNote}>{r.note}</span>}
                </span>
                <span className={styles.srOnly}> — watch the reel on Instagram (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="brands">
        <Track n={4} label="Selected work" title="Brands I’ve made things for" id="brands" />
        <dl className={styles.brandWall}>
          {m.brands.map((b) => (
            <div key={b.group}>
              <dt>{b.group}</dt>
              <dd>
                <ul>
                  {b.names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <p className={styles.muted}>… and more. Full reel links available on request.</p>
      </section>

      <section className={styles.section} aria-labelledby="why">
        <Track n={5} label="Why brands come back" id="why" />
        <div className={styles.whyGrid}>
          {m.why.map((w, i) => (
            <div key={w.title} className={styles.why}>
              <Scribble hand={hand} className={styles.whyNo}>
                {i + 1}
              </Scribble>
              <h3 className={styles.h3}>{w.title}</h3>
              <p className={styles.body}>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="rates">
        <Track n={6} label="Working together" title="Rates & how it works" id="rates" />
        <p className={styles.body}>{m.ratesIntro}</p>
        <div className={styles.rates}>
          {m.rates.map((r) => (
            <div key={r.name} className={styles.rate}>
              <h3 className={styles.h3}>{r.name}</h3>
              <p className={styles.muted}>{r.when}</p>
              <p className={styles.price}>
                {r.price} <span className={styles.priceUnit}>{r.unit}</span>
              </p>
              <p className={styles.rateIncludes}>{r.includes}</p>
            </div>
          ))}
        </div>
        <p className={styles.muted}>{m.ratesNote}</p>

        <ol className={styles.process}>
          {m.steps.map((s, i) => (
            <li key={s.title}>
              <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.h3}>{s.title}</h3>
              <p className={styles.body}>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.cta}`} aria-label="Get in touch">
        <Scribble hand={hand} className={styles.ctaScribble}>
          let’s make something
        </Scribble>
        <a href={m.collabMail} className={styles.ctaMail}>
          {PROFILE.email}
        </a>
        <p className={styles.muted}>{m.handle} · Bengaluru, India</p>
      </section>
    </>
  );
}

/* ---------------- page registry ---------------- */

export interface PageContent {
  lede: string;
  actions?: ReactNode;
  Body: () => React.JSX.Element;
}

export const PAGES: Record<string, PageContent> = {
  work: {
    lede: "4+ years shipping production interfaces in React, Next.js and TypeScript, from Shopify storefronts to Tejas Networks’ network operations dashboard.",
    actions: (
      <a href={PROFILE.resume} download className={styles.pill}>
        Download resume <span aria-hidden="true">↓</span>
      </a>
    ),
    Body: WorkBody,
  },
  projects: {
    lede: "Client sites and side projects, from real estate marketing pages to a BGMI scoreboard. Built with React, Next.js and a lot of attention to the small stuff.",
    Body: ProjectsBody,
  },
  about: {
    lede: PROFILE.tagline,
    Body: AboutBody,
  },
  resume: {
    lede: RESUME.summary,
    actions: (
      <>
        <a href={PROFILE.resume} download className={styles.button}>
          Download PDF <span aria-hidden="true">↓</span>
        </a>
        <a href={PROFILE.resume} {...ext} className={styles.pill}>
          Open in a new tab <span aria-hidden="true">↗</span>
        </a>
      </>
    ),
    Body: ResumeBody,
  },
  contact: {
    lede: CONTACT.intro,
    actions: (
      <a href={`mailto:${PROFILE.email}`} className={styles.button}>
        Email me <span aria-hidden="true">→</span>
      </a>
    ),
    Body: ContactBody,
  },
  instagram: {
    lede: MEDIA_KIT.intro,
    actions: (
      <>
        <a href={PROFILE.links.instagram.href} {...ext} className={styles.button}>
          {MEDIA_KIT.handle} <span aria-hidden="true">↗</span>
        </a>
        <a href={MEDIA_KIT.collabMail} className={styles.pill}>
          Collab enquiry
        </a>
      </>
    ),
    Body: ContentBody,
  },
};
