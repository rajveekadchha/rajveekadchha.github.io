import heroPhoto from "../assets/chaotic-brews/hero.webp";
import aboutPhoto from "../assets/chaotic-brews/about.webp";
import galleryPhoto1 from "../assets/chaotic-brews/gallery-1.webp";
import galleryPhoto2 from "../assets/chaotic-brews/gallery-2.webp";
import curaaPhoto from "../assets/chaotic-brews/curaa.webp";
import umbrellaPhoto from "../assets/chaotic-brews/umbrella.webp";
import yagachiPhoto from "../assets/chaotic-brews/yagachi.webp";

const stats = [
  { value: "5K", label: "Typical views / reel" },
  { value: "408K", label: "Accounts reached" },
  { value: "11.4%", label: "Engagement rate" },
  { value: "1.8K", label: "Followers" },
];

const formats = [
  "Reels & short-form video",
  "Still photography",
  "Flat lays & product styling",
  "UGC for brand channels",
];

const categories = ["Coffee", "Matcha", "Crockery", "Home décor", "Home essentials"];

const featured = [
  { name: "Cüraa by YFL", photo: curaaPhoto },
  { name: "Umbrella Store", photo: umbrellaPhoto },
  { name: "Yagachi Coffee", photo: yagachiPhoto },
];

const reels = [
  { brand: "Dancing Cow", note: "oat milk", url: "https://www.instagram.com/reel/Db-0QQOspM4/" },
  { brand: "First Club", note: "grocery app, Bangalore", url: "https://www.instagram.com/reel/Db3Fdstyn4P/" },
  { brand: "Tencha Matcha", url: "https://www.instagram.com/reel/DYCMznEMH5t/" },
  { brand: "Berunda Coffee", url: "https://www.instagram.com/reel/DbYNRc9S1dG/" },
  { brand: "Cüraa by YFL", url: "https://www.instagram.com/reel/DautLUWSLM1/" },
  { brand: "Umbrella Store", url: "https://www.instagram.com/reel/DaHmOVxMU79/" },
  { brand: "Joker Street", url: "https://www.instagram.com/reel/DZy9LGLsQXq/" },
  { brand: "Glasafe", url: "https://www.instagram.com/reel/DZNObAeMkdP/" },
  { brand: "Colthas Coffee", url: "https://www.instagram.com/reel/DZhFUoSMwHz/" },
];

const brandGroups = [
  {
    title: "Coffee & alt-milk",
    brands: ["Berunda Coffee", "Colthas Coffee", "Latteholic", "Dancing Cow (oat milk)"],
  },
  {
    title: "Matcha",
    brands: ["Tencha Matcha", "Bree Matcha"],
  },
  {
    title: "Glassware & ceramics",
    brands: ["Glasafe", "Pebel Glassware"],
  },
  {
    title: "Home & lifestyle",
    brands: ["Cüraa by YFL (frothers)", "SNS Living", "Umbrella Store", "Joker Street"],
  },
  {
    title: "Grocery & local apps",
    brands: ["First Club"],
  },
];

const pitches = [
  {
    title: "One pair of hands",
    body: "Concept, styling, shoot, edit and caption — all mine. Nothing gets outsourced or lost in a handover.",
  },
  {
    title: "Your product in frame",
    body: "The product is the subject, not a prop blurred in the background. It stays legible, in focus, and named.",
  },
  {
    title: "Made to be saved",
    body: "Styled for the screenshot and the share — the two things that actually move a small brand.",
  },
];

const rates = [
  {
    name: "Barter collaboration",
    sub: "For products valued at ₹2,000 and above",
    deliverable: "1 reel · 2 stories with link sticker",
    price: "Gifted",
    priceNote: "Product only",
    dark: true,
  },
  {
    name: "Paid partnership",
    sub: "For products valued under ₹2,000",
    deliverable: "1 reel · 2 stories with link sticker · 1 month paid ad rights",
    price: "₹2,000",
    priceNote: "Per package",
    dark: false,
  },
  {
    name: "UGC video",
    sub: "Content for your channels — not posted on @chaotic_brews",
    deliverable: "1 edited vertical video, delivered raw or finished",
    price: "₹2,000",
    priceNote: "Per video",
    dark: false,
  },
];

const steps = [
  { n: "01", title: "Brief", body: "You send the brief and the product." },
  { n: "02", title: "Concept", body: "I share a concept for your approval." },
  { n: "03", title: "Shoot", body: "I shoot and edit, then send a preview." },
  { n: "04", title: "Revise", body: "One round of revisions, included." },
  { n: "05", title: "Live", body: "Live within 7–10 days of delivery." },
];

export default function InstagramPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      {/* Hero */}
      <div className="mb-8 flex flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            MEDIA KIT · BENGALURU
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-black md:text-5xl">
            chaotic brews
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-black/70 md:mx-0">
            Coffee, matcha, and everything they're served on — made at home
            and photographed like it matters.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href="https://www.instagram.com/chaotic_brews"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              @chaotic_brews ↗
            </a>
            <a
              href="mailto:rajveedkadchha@gmail.com?subject=Collaboration%20with%20%40chaotic_brews"
              className="rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-semibold text-black/80 hover:bg-white/80"
            >
              Email me
            </a>
          </div>
        </div>

        <div className="relative h-48 w-48 shrink-0 md:h-64 md:w-64">
          <div className="absolute -inset-3 rounded-full border border-black/10" />
          <img
            src={heroPhoto}
            alt="Matcha and coffee in speckled ceramic cups, shot from above"
            className="h-full w-full rounded-full border border-black/10 object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <section className="mb-8">
        <div className="rounded-[32px] border border-black/10 bg-white/60 p-6 backdrop-blur-md md:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <div className="text-xs font-semibold tracking-wider text-black/50">
              BY THE NUMBERS
            </div>
            <div className="text-xs text-black/50">90 days to 17 Aug 2026</div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[20px] border border-black/10 bg-white/50 p-5"
              >
                <div className="text-3xl font-bold tracking-tight text-black">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-black/50">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-black/70">
            45 reels · 547K views · 62K interactions · 6.2K shares · 3.1K
            saves. A few outliers lift the average, so the figures above are
            a typical reel, not the mean. Reach was 224× my follower count.
          </p>
          <p className="mt-2 text-sm text-black/50">
            Audience: 25–34 is 56%, with 71% aged 18–34. Split 56% women /
            44% men. India 74%, led by Delhi, Bangalore, Ahmedabad and
            Mumbai.
          </p>
        </div>
      </section>

      {/* About the account */}
      <section className="mb-8">
        <div className="rounded-[32px] border border-black/10 bg-white/60 p-6 backdrop-blur-md md:p-8">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-[24px] border border-black/10">
              <img
                src={aboutPhoto}
                alt="Pouring coffee into a hand-painted ceramic mug"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wider text-black/50">
                THE ACCOUNT
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                Hi — I'm Rajvee.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                @chaotic_brews is where I make coffee and matcha at home and
                photograph the ritual around it: the pour, the cup it lands
                in, the ten quiet minutes before the day starts.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                It's a small, warm audience of people who care about that
                ritual. They don't scroll past a good cup — they save it,
                screenshot it, and ask where the mug is from. That's why the
                work has grown past the drink itself, into the crockery it's
                poured into and the small things that make a home feel like
                one.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <img
                  src={galleryPhoto1}
                  alt="Filter coffee in a brass tumbler on a banana leaf"
                  className="aspect-square w-full rounded-[16px] border border-black/10 object-cover"
                />
                <img
                  src={galleryPhoto2}
                  alt="Coffee and matcha flat lay with a crochet sunflower"
                  className="aspect-square w-full rounded-[16px] border border-black/10 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats + Categories */}
      <section className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-white/60 p-6 backdrop-blur-md">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            FORMATS
          </div>
          <ul className="mt-4 space-y-2">
            {formats.map((f) => (
              <li
                key={f}
                className="border-b border-black/10 pb-2 text-sm text-black/80 last:border-0 last:pb-0"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white/60 p-6 backdrop-blur-md">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            CATEGORIES
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-sm text-black/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent reels */}
      <section className="mb-8">
        <div className="mb-4">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            RECENT WORK
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
            Recent reels
          </h2>
          <p className="mt-2 text-sm text-black/70">
            Concepted, shot and edited by me — tap through to watch on
            Instagram.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-[20px] border border-black/10 bg-white/50 p-5 transition hover:-translate-y-[2px] hover:bg-white/80 hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
            >
              <div>
                <div className="text-sm font-semibold text-black">
                  {r.brand}
                </div>
                {r.note && (
                  <div className="mt-0.5 text-xs text-black/50">{r.note}</div>
                )}
              </div>
              <span className="text-black/30 transition group-hover:text-black/70">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Brands worked with */}
      <section className="mb-8">
        <div className="mb-4">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            SELECTED WORK
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
            Brands I've made things for
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4 sm:max-w-md">
          {featured.map((f) => (
            <figure key={f.name} className="text-center">
              <img
                src={f.photo}
                alt={f.name}
                className="aspect-square w-full rounded-full border border-black/10 object-cover"
              />
              <figcaption className="mt-2 text-xs text-black/60">
                {f.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[24px] border border-black/10 bg-white/60 p-5 backdrop-blur-md"
            >
              <div className="border-b border-black/10 pb-2 text-xs font-semibold tracking-wider text-black/50">
                {group.title.toUpperCase()}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-black/80">
                {group.brands.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm italic text-black/50">
          … and more. Full reel links available on request.
        </p>
      </section>

      {/* Why brands come back */}
      <section className="mb-8">
        <div className="rounded-[32px] bg-black p-6 text-white md:p-8">
          <div className="text-xs font-semibold tracking-wider text-white/60">
            WHY BRANDS COME BACK
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {pitches.map((p) => (
              <div key={p.title}>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="mb-8">
        <div className="mb-4">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            WORKING TOGETHER
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
            Rates
          </h2>
          <p className="mt-2 text-sm text-black/70">
            All content is shot, styled and edited by me. Concepts are
            shared for approval before filming.
          </p>
        </div>

        <div className="space-y-4">
          {rates.map((r) => (
            <div
              key={r.name}
              className={
                "flex flex-col gap-3 rounded-[24px] border p-6 sm:flex-row sm:items-center sm:justify-between " +
                (r.dark
                  ? "border-black/10 bg-black text-white"
                  : "border-black/10 bg-white/60 backdrop-blur-md")
              }
            >
              <div>
                <h3 className="text-lg font-semibold">{r.name}</h3>
                <p
                  className={
                    "mt-1 text-sm " + (r.dark ? "text-white/60" : "text-black/50")
                  }
                >
                  {r.sub}
                </p>
                <p
                  className={
                    "mt-3 text-sm font-medium " +
                    (r.dark ? "text-white/90" : "text-black/80")
                  }
                >
                  {r.deliverable}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-bold tracking-tight">
                  {r.price}
                </div>
                <div
                  className={
                    "text-xs tracking-wider " +
                    (r.dark ? "text-white/50" : "text-black/40")
                  }
                >
                  {r.priceNote.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-black/50">
          Extended usage rights, exclusivity, whitelisting and multi-post
          packages quoted separately.
        </p>
      </section>

      {/* How it works */}
      <section className="mb-8">
        <div className="text-xs font-semibold tracking-wider text-black/50">
          HOW IT WORKS
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-[20px] border border-black/10 bg-white/50 p-4"
            >
              <div className="text-xs font-semibold text-black/40">{s.n}</div>
              <div className="mt-1 text-sm font-semibold text-black">
                {s.title}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-black/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="rounded-[32px] border border-black/10 bg-white/60 p-8 text-center backdrop-blur-md md:p-12">
          <div className="text-xs font-semibold tracking-wider text-black/50">
            LET'S MAKE SOMETHING
          </div>
          <a
            href="mailto:rajveedkadchha@gmail.com?subject=Collaboration%20with%20%40chaotic_brews"
            className="mt-3 block text-2xl font-semibold tracking-tight text-black hover:underline md:text-3xl"
          >
            rajveedkadchha@gmail.com
          </a>
          <p className="mt-3 text-sm text-black/60">
            @chaotic_brews · Bengaluru, India
          </p>
        </div>
      </section>
    </div>
  );
}
