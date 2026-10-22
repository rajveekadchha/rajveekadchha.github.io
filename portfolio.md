# Rajvee Kadchha — Portfolio content

Reference copy of everything on the old site (https://rajveekadchha.github.io/) and in `Rajvee_Resume.pdf`, pulled on 22 Oct 2026.
The site reads this content from `lib/portfolio.ts`. Edit that file to change what the disc pages show; this file is for reference only.

---

## Profile

| | |
| --- | --- |
| Name | Rajvee Kadchha |
| Role | Frontend Developer (resume: Frontend Developer / Engineer) |
| Tagline | I build frontend interfaces and overthink tiny details so you don’t have to. |
| Based in | Bangalore |
| Experience | 4+ years |
| Focus | Frontend (React, Next.js, TypeScript, JavaScript) |
| Currently building | Cycle — https://cycle-wecare.netlify.app/ |
| Open to work | Yes |
| Likes | 🧩 UI details · ☕ coffee · 🍳 cooking · 📺 good sitcoms |

**Old site meta description:** Frontend developer building interfaces and overthinking tiny details so you don't have to. Portfolio of Rajvee Kadchha.

### Links

- Email: rajveedkadchha@gmail.com
- LinkedIn: https://www.linkedin.com/in/rajveekadchha/ (/rajveekadchha)
- GitHub: https://github.com/rajveekadchha (@rajveekadchha)
- Instagram: https://www.instagram.com/chaotic_brews/ (@chaotic_brews)
- Resume PDF: `/Rajvee_Resume.pdf` (copied to `public/`)
- Phone (resume only, not shown on the site): +91 82389 34364

### Old site pages

| Route | Page | Now on disc |
| --- | --- | --- |
| `/` | Home: “Hi, I’m Rajvee” + draggable stickers (Work — case studies + impact, About — me, but cute, Contact — say hi) | Homepage (the drive) |
| `/work` | Where I’ve worked + Things I’ve built | Split into **work** → `/work` (experience) and **projects** → `/projects` (new, blue disc) |
| `/about` | About me | **about me** → `/about` |
| — | Resume PDF only | **résumé** → `/resume` (new) |
| `/contact` | Let’s talk | **contact** → `/contact` |
| `/instagram` | Content Creation (media kit) | **chaotic brews** → `/instagram` (replaces the old “playground” disc) |

---

## About

### Hey, I’m Rajvee 👋

I’m a frontend developer based in Bangalore. I mostly live in React, TypeScript, and the tiny details that make interfaces feel right.

I studied Information and Communication Technology Engineering at Ahmedabad University, and frontend development is where I naturally ended up and stayed. I’ve built and shipped Shopify apps, worked on performance optimisation (yes, I care about Lighthouse scores), built a React app for Thinkific, and developed features in Wix using blocks. I’m also a certified Wix Velo developer, so wiring logic and UI together doesn’t scare me.

I enjoy building interfaces that are clean, fast, and make sense to real users. I like things that feel playful but still solid under the hood. This site is a small reflection of that.

Outside of work, I like cooking, drinking good coffee, and sharing small life snippets on Instagram and YouTube. Sometimes it’s coffee, sometimes it’s food, sometimes it’s just a random thought. Not everything needs to be serious.

If you’re looking for a frontend developer who enjoys building things properly and keeping it fun, we’ll probably get along.

Photo: `public/me.jpg`

---

## Work experience

From **Rajvee_Kadchha_Resume.pdf** (latest resume, now served at `/Rajvee_Resume.pdf`). Shown in full on the Work disc; the Resume disc lists the roles and links here.

### Frontend Developer — The Summer Design
Jan 2026 – Present (previously Feb 2024 – Dec 2024) · Remote
- Took sole project ownership of a 25+ page CMS-driven site in Next.js for a real estate developer, spanning residential, commercial and industrial catalogues with filtered listings.
- Owned page performance and responsiveness sitewide, validating layouts across 3–4 breakpoints and optimising image delivery through WebP, lazy loading and responsive sizing.
- Built a heavily image-led studio site in Framer extended with custom React code components, plus reusable component and layout systems scaling work across client projects.

### Independent Frontend Contractor & Content Creator
Jul 2025 – Dec 2025 · Bangalore
- Contracted part-time with The Summer Design on client frontend work while running a self-employed content business, delivering 40–50 brand collaborations end to end.

### Software Developer — Birbal AI (client: Tejas Networks)
Jan 2025 – Jun 2025 · Remote
- Learned JointJS from scratch while the library was still under active development and shipped it into Tejas Networks’ live frontend and backend architecture migration within a week of first exposure.
- Built Tejas Networks’ network operations dashboard in React and TypeScript with MUI and dynamic network graphs, covering node display, server-side GUI and node/link edit flows; cut graph update latency by 30% through lazy-loaded segments and render optimisation.
- Engineered an AWS S3 multipart upload pipeline for an AI interview platform, splitting large video files into parallel chunks with resume-on-failure and reducing average chunk size and local memory usage by 80%; designed presigned URL endpoints with the backend team.
- Rebuilt the Next.js corporate site’s components and asset pipeline with code splitting, WebP and lazy loading, lifting Lighthouse from 60 to 80 on mobile and 65 to 85 on desktop, validated with real-user monitoring.

### Software Engineer — MLVeda
Jun 2021 – Nov 2023 · Ahmedabad, IN
- Owned frontend development in Liquid and JavaScript across client stores and MLVeda’s in-house Shopify apps sold as merchant tools, covering multi-country pricing, currency switching, checkout and recommendations.
- Revamped Multi-Country Pricing for Shopify 2.0, cutting setup time by nearly 80% by eliminating theme dependencies, and single-handedly integrated the apps into nearly 200 merchant storefronts.
- Built and launched a note-taking app on Thinkific with advanced editing and PDF download, lifting active session duration; raised Shopify storefront page speed to 80+ through LCP, CLS and TBT work and image optimisation.

---

## Projects — Things I’ve built

| Project | Description | Tech | Link | Image |
| --- | --- | --- | --- | --- |
| Golden Group | Marketing website for Golden Group, a Surat, Gujarat-based real estate developer with 22+ completed residential, commercial, and industrial projects. Built as a client project at The Summer Design, focused on storytelling and on-brand visuals across their project listings. | WordPress, Divi | https://www.goldengroup.net.in/ | `public/shots/goldengroup.jpg` |
| Squadifier | A BGMI qualifier scoreboard for competitive squads. Reads up to 15 match screenshots, tallies every point on the 10-point system, and turns the whole qualifier into a live, shareable page — no sign-in needed for teammates. | Next.js, TypeScript | https://www.squadifier.com/ | `public/shots/squadifier.jpg` |
| Collab Trackr | A dashboard to manage every brand collab pitch, deal, and deliverable in one place. Tracks reply rates, follow-ups due, and package status across active partnerships. | React, Tailwind, Supabase | https://comfy-lolly-03a950.netlify.app/ | `public/shots/collab-tracker.jpg` |
| Cycle | A period-care agent that knows your cycle, preps your Instamart cart with your usual brands, and reminds you 2 days early on WhatsApp. Designed a calm, editorial UI with a 100-founding-member waitlist. | Next.js, TypeScript, Tailwind, Supabase | https://cycle-wecare.netlify.app/ | `public/shots/cycle.jpg` |
| Photography Invoice | A quotation and invoice builder for photographers. Configure packages, add-ons, and client details to generate a clean, print-ready PDF quote. | React, Next.js, TypeScript, Tailwind, Vite | https://photography-invoice-builder.netlify.app/ | `public/shots/photography-invoice.jpg` |
| Smart Food Recommendation App | A smart food recommendation app that suggests recipes using calorie and nutrition data. Designed a calm, editorial UI with daily dessert picks and favorites. | React, Tailwind, TypeScript | https://smart-food-recommendations.netlify.app/ | `public/shots/food-app.jpg` |
| Creme Coffee Shop | Designed and built a responsive coffee brand website in Framer, focusing on typography, layout systems, and subtle interactions. | Framer | https://creme-coffee.framer.website/ | `public/shots/creme-coffee.jpg` |
| Fleet Tracker App | A real-time fleet monitoring dashboard that simulates vehicle trips, visualizes live routes, and tracks alerts, fuel, battery, and signal data. | React, Tailwind, TypeScript, ECharts | https://rajvee-fleet-dashboard.netlify.app/ | `public/shots/fleet.jpg` |
| Dashboard Page | A responsive static admin dashboard with order tracking, revenue insights, and customer feedback. Includes real-time charts, profit metrics, cancellations, and intuitive navigation for managing orders, goals, popular dishes, and menus. | React, Tailwind, TypeScript, JavaScript | https://dashboard-demo-rajvee.netlify.app/ | `public/shots/dashboard.jpg` |

---

## Resume (from Rajvee_Kadchha_Resume.pdf)

**Title:** Frontend Engineer · Bangalore · rajveedkadchha@gmail.com · +91 82389 34364 · rajveekadchha.github.io · linkedin/rajveekadchha

**Summary:** Frontend engineer with 4+ years shipping production interfaces in React, Next.js and TypeScript across data-heavy dashboards, CMS-driven sites and Shopify storefronts, including the network operations dashboard for Tejas Networks, whose equipment carries India’s telecom backbone. I treat performance as part of the build, with measurable Web Vitals and bundle wins on every product I have owned, and reach past the frontend when needed.

### Skills

- **Frontend:** JavaScript (ES6+), TypeScript, React, Next.js, Hooks, Context API, Redux, React Query, JointJS, Tailwind, MUI, SCSS
- **Performance & architecture:** Code splitting, lazy loading, Web Vitals (LCP, CLS, TBT), image optimisation, component architecture, design systems
- **Backend & cloud:** Python, FastAPI, REST APIs, AWS S3 (presigned URLs, multipart uploads)
- **Commerce, CMS & tools:** Shopify, Liquid, metafields, Framer with custom code components, Git, Webpack, GitHub Actions, Vercel, Netlify, Figma

### Experience

See **Work experience** above (same content).

### Projects

- **Cycle** — a cart-prep agent for Swiggy Instamart, approved through Swiggy’s Builders Club. Built solo.
- **Collab Trackr** — collaboration tracking tool for creators, built and shipped end to end.

### Education

**Ahmedabad University** — Bachelor of Technology, Information and Communication Technology

---

## Contact

### Let’s talk

If something here feels interesting or familiar, feel free to reach out. I’m always happy to chat.

**Reach me at:** email, LinkedIn, GitHub, Instagram (see Links above) · 📄 Download resume

**💌 Open to conversations** — Work, frontend, coffee, or just saying hi.

**A small note:** I’m now exploring new frontend opportunities where I can bring in my experience, continue learning, and grow with a great team. If something sounds like a good fit, let’s connect.

☕ I usually reply within a day or two

---

## Content creation — @chaotic_brews media kit

**Media kit · Bengaluru**

# chaotic brews

Coffee, matcha, and everything they're served on — made at home and photographed like it matters.

Buttons: @chaotic_brews ↗ (Instagram) · Email me (`mailto:rajveedkadchha@gmail.com?subject=Collaboration with @chaotic_brews`)

Hero image: `public/media/hero.webp` — Matcha and coffee in speckled ceramic cups, shot from above

### Instagram insights (23 Jul – 21 Oct 2026, 90 days)

Source: “Account insights for chaotic_brews – 23 Jul 2026 - 21 Oct 2026.pdf” (exported from Edits). Insights are aggregated across reels and posts unless otherwise stated.

| Metric | 90-day total | One reel, on average (÷ 50 reels) |
| --- | --- | --- |
| Reel views | 428K | 8.6K |
| Viewers | 316K | 6.3K |
| Likes | 38K | 760 |
| Comments | 682 | 14 |
| Reposts | 5.4K | 108 |
| Shares | 5K | 100 |
| Saves | 2.6K | 52 |
| Reels | 50 | — |

Per-reel figures are totals divided by 50. Likes, comments, reposts, shares and saves include posts too, so they're approximate. Viewers were 168× the follower count.

**Followers:** 1,881 · **Gender:** 55.0% women / 45.0% men

**Age range:** 13–17 3.3% · 18–24 14.8% · 25–34 56.1% · 35–44 16.7% · 45–54 5.1% · 55–64 2.6% · 65+ 1.5%

**Top countries:** India 73.5% · United States 5.3% · Canada 2.4% · United Kingdom 2.0% · Philippines 1.7%

**Top cities:** Delhi 12.5% · Bangalore 11.0% · Mumbai 9.3% · Ahmedabad 9.1% · Rajkot 7.5%

<details>
<summary>Earlier snapshot from the old site (90 days to 17 Aug 2026) — no longer shown</summary>

| Stat | Value |
| --- | --- |
| Typical views / reel | 5K |
| Accounts reached | 408K |
| Engagement rate | 11.4% |
| Followers | 1.8K |

45 reels · 547K views · 62K interactions · 6.2K shares · 3.1K saves. “A few outliers lift the average, so the figures above are a typical reel, not the mean.” Reach was 224× follower count. Audience: 25–34 56%, 71% aged 18–34, 56% women / 44% men, India 74% (Delhi, Bangalore, Ahmedabad, Mumbai).

</details>

### The account — Hi — I'm Rajvee.

Image: `public/media/about.webp` — Pouring coffee into a hand-painted ceramic mug

@chaotic_brews is where I make coffee and matcha at home and photograph the ritual around it: the pour, the cup it lands in, the ten quiet minutes before the day starts.

It's a small, warm audience of people who care about that ritual. They don't scroll past a good cup — they save it, screenshot it, and ask where the mug is from. That's why the work has grown past the drink itself, into the crockery it's poured into and the small things that make a home feel like one.

Gallery:
- `public/media/gallery-1.webp` — Filter coffee in a brass tumbler on a banana leaf
- `public/media/gallery-2.webp` — Coffee and matcha flat lay with a crochet sunflower

**Formats:** Reels & short-form video · Still photography · Flat lays & product styling · UGC for brand channels

**Categories:** Coffee · Matcha · Crockery · Home décor · Home essentials

### Recent reels

Concepted, shot and edited by me — tap through to watch on Instagram.

| Brand | Note | Link |
| --- | --- | --- |
| Dancing Cow | oat milk | https://www.instagram.com/reel/Db-0QQOspM4/ |
| First Club | grocery app, Bangalore | https://www.instagram.com/reel/Db3Fdstyn4P/ |
| Tencha Matcha | | https://www.instagram.com/reel/DYCMznEMH5t/ |
| Berunda Coffee | | https://www.instagram.com/reel/DbYNRc9S1dG/ |
| Cüraa by YFL | | https://www.instagram.com/reel/DautLUWSLM1/ |
| Umbrella Store | | https://www.instagram.com/reel/DaHmOVxMU79/ |
| Joker Street | | https://www.instagram.com/reel/DZy9LGLsQXq/ |
| Glasafe | | https://www.instagram.com/reel/DZNObAeMkdP/ |
| Colthas Coffee | | https://www.instagram.com/reel/DZhFUoSMwHz/ |

### Brands I've made things for

Featured: Cüraa by YFL (`public/media/curaa.webp`) · Umbrella Store (`public/media/umbrella.webp`) · Yagachi Coffee (`public/media/yagachi.webp`)

- **Coffee & alt-milk:** Berunda Coffee, Colthas Coffee, Latteholic, Dancing Cow (oat milk)
- **Matcha:** Tencha Matcha, Bree Matcha
- **Glassware & ceramics:** Glasafe, Pebel Glassware
- **Home & lifestyle:** Cüraa by YFL (frothers), SNS Living, Umbrella Store, Joker Street
- **Grocery & local apps:** First Club

… and more. Full reel links available on request.

### Why brands come back

- **One pair of hands** — Concept, styling, shoot, edit and caption — all mine. Nothing gets outsourced or lost in a handover.
- **Your product in frame** — The product is the subject, not a prop blurred in the background. It stays legible, in focus, and named.
- **Made to be saved** — Styled for the screenshot and the share — the two things that actually move a small brand.

### Rates

All content is shot, styled and edited by me. Concepts are shared for approval before filming.

| Package | For | Includes | Price |
| --- | --- | --- | --- |
| Barter collaboration | Products valued at ₹2,000 and above | 1 reel · 2 stories with link sticker | Gifted (product only) |
| Paid partnership | Products valued under ₹2,000 | 1 reel · 2 stories with link sticker · 1 month paid ad rights | ₹2,000 per package |
| UGC video | Content for your channels — not posted on @chaotic_brews | 1 edited vertical video, delivered raw or finished | ₹2,000 per video |

Extended usage rights, exclusivity, whitelisting and multi-post packages quoted separately.

### How it works

1. **Brief** — You send the brief and the product.
2. **Concept** — I share a concept for your approval.
3. **Shoot** — I shoot and edit, then send a preview.
4. **Revise** — One round of revisions, included.
5. **Live** — Live within 7–10 days of delivery.

**Let's make something:** rajveedkadchha@gmail.com · @chaotic_brews · Bengaluru, India

---

## Notes and mismatches found while copying

- **Mlveda start date:** the old Work page said May 2021; the resume says Jun 2021. Confirmed Jun 2021, used everywhere on the new site.
- **Cycle link typo on the old About page:** it links to `cyle-wecare.netlify.app` (missing “c”). The project card uses `cycle-wecare.netlify.app`, which the new site uses everywhere.
- **Small copy fixes on the new site:** “that that suggests” → “that suggests” (Smart Food app), added a missing space after “nutrition data.”, “Creme Coffee shop” → “Creme Coffee Shop”, and “A real-time Fleet Monitoring Dashboard simulates” → “A real-time fleet monitoring dashboard that simulates”.
- **Photography Invoice** lists a 5th tech, Vite, that the old site hid (it only showed the first 4).
- **Resume page bullets** on the new site are lightly shortened from the PDF. The full PDF wording is above.
- **Not carried over:** the old homepage’s sticker interaction (“Tip: drag a sticker, then click it.”), which the disc drive replaces. YouTube is mentioned in the bio, but the old site has no YouTube link.
- **Yagachi Coffee** was only a featured photo on the old site, not in the brand list. The new Content Creation page adds it to “Coffee & alt-milk”.
- **Updated to the new resume (Rajvee_Kadchha_Resume.pdf):** 4+ years, “Frontend Engineer” title, new contractor role (Jul–Dec 2025), Tejas Networks as Birbal AI’s client, “MLVeda” spelling, “Collab Trackr” name, Cycle’s Swiggy Builders Club approval. The old Work-page summaries and Rajvee_Resume.pdf wording are replaced.
- **Golden Group tech mismatch:** the project card (from the old site) says WordPress + Divi, but the new resume describes the real estate site as Next.js. Check which is right.
