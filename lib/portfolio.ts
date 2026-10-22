/**
 * Portfolio content, taken from rajveekadchha.github.io and Rajvee_Resume.pdf.
 * portfolio.md in the project root has the same content as plain text.
 */

export const PROFILE = {
  name: "Rajvee Kadchha",
  role: "Frontend Developer",
  tagline: "I build frontend interfaces and overthink tiny details so you don’t have to.",
  location: "Bangalore",
  email: "rajveedkadchha@gmail.com",
  resume: "/Rajvee_Resume.pdf",
  photo: "/me.jpg",
  links: {
    linkedin: { label: "/rajveekadchha", href: "https://www.linkedin.com/in/rajveekadchha/" },
    github: { label: "@rajveekadchha", href: "https://github.com/rajveekadchha" },
    instagram: { label: "@chaotic_brews", href: "https://www.instagram.com/chaotic_brews/" },
  },
};

/* ---------------- Work ---------------- */

export interface Job {
  role: string;
  /** Employer; empty for self-employed work. */
  company?: string;
  /** Who the work was for, when that's different from the employer. */
  client?: string;
  period: string;
  where?: string;
  points: string[];
}

// From Rajvee_Kadchha_Resume.pdf. Shown in full on the Work disc and as a
// short list on the Resume disc.
export const JOBS: Job[] = [
  {
    role: "Frontend Developer",
    company: "The Summer Design",
    period: "Jan 2026 – Present · previously Feb 2024 – Dec 2024",
    where: "Remote",
    points: [
      "Took sole project ownership of a 25+ page CMS-driven site in Next.js for a real estate developer, spanning residential, commercial and industrial catalogues with filtered listings.",
      "Owned page performance and responsiveness sitewide, validating layouts across 3–4 breakpoints and optimising image delivery through WebP, lazy loading and responsive sizing.",
      "Built a heavily image-led studio site in Framer extended with custom React code components, plus reusable component and layout systems scaling work across client projects.",
    ],
  },
  {
    role: "Independent Frontend Contractor & Content Creator",
    period: "Jul 2025 – Dec 2025",
    where: "Bangalore",
    points: [
      "Contracted part-time with The Summer Design on client frontend work while running a self-employed content business, delivering 40–50 brand collaborations end to end.",
    ],
  },
  {
    role: "Software Developer",
    company: "Birbal AI",
    client: "Tejas Networks",
    period: "Jan 2025 – Jun 2025",
    where: "Remote",
    points: [
      "Learned JointJS from scratch while the library was still under active development and shipped it into Tejas Networks’ live frontend and backend architecture migration within a week of first exposure.",
      "Built Tejas Networks’ network operations dashboard in React and TypeScript with MUI and dynamic network graphs, covering node display, server-side GUI and node/link edit flows; cut graph update latency by 30% through lazy-loaded segments and render optimisation.",
      "Engineered an AWS S3 multipart upload pipeline for an AI interview platform, splitting large video files into parallel chunks with resume-on-failure and reducing average chunk size and local memory usage by 80%; designed presigned URL endpoints with the backend team.",
      "Rebuilt the Next.js corporate site’s components and asset pipeline with code splitting, WebP and lazy loading, lifting Lighthouse from 60 to 80 on mobile and 65 to 85 on desktop, validated with real-user monitoring.",
    ],
  },
  {
    role: "Software Engineer",
    company: "MLVeda",
    period: "Jun 2021 – Nov 2023",
    where: "Ahmedabad, IN",
    points: [
      "Owned frontend development in Liquid and JavaScript across client stores and MLVeda’s in-house Shopify apps sold as merchant tools, covering multi-country pricing, currency switching, checkout and recommendations.",
      "Revamped Multi-Country Pricing for Shopify 2.0, cutting setup time by nearly 80% by eliminating theme dependencies, and single-handedly integrated the apps into nearly 200 merchant storefronts.",
      "Built and launched a note-taking app on Thinkific with advanced editing and PDF download, lifting active session duration; raised Shopify storefront page speed to 80+ through LCP, CLS and TBT work and image optimisation.",
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  /** Pixel size of the screenshot, so the layout doesn't jump while it loads. */
  w: number;
  h: number;
}

export const PROJECTS: Project[] = [
  {
    title: "Golden Group",
    description:
      "Marketing website for Golden Group, a Surat, Gujarat-based real estate developer with 22+ completed residential, commercial, and industrial projects. Built as a client project at The Summer Design, focused on storytelling and on-brand visuals across their project listings.",
    tech: ["WordPress", "Divi"],
    link: "https://www.goldengroup.net.in/",
    image: "/shots/goldengroup.jpg",
    w: 1400,
    h: 633,
  },
  {
    title: "Squadifier",
    description:
      "A BGMI qualifier scoreboard for competitive squads. Reads up to 15 match screenshots, tallies every point on the 10-point system, and turns the whole qualifier into a live, shareable page — no sign-in needed for teammates.",
    tech: ["Next.js", "TypeScript"],
    link: "https://www.squadifier.com/",
    image: "/shots/squadifier.jpg",
    w: 1400,
    h: 750,
  },
  {
    title: "Collab Trackr",
    description:
      "A dashboard to manage every brand collab pitch, deal, and deliverable in one place. Tracks reply rates, follow-ups due, and package status across active partnerships.",
    tech: ["React", "Tailwind", "Supabase"],
    link: "https://comfy-lolly-03a950.netlify.app/",
    image: "/shots/collab-tracker.jpg",
    w: 1400,
    h: 696,
  },
  {
    title: "Cycle",
    description:
      "A period-care agent that knows your cycle, preps your Instamart cart with your usual brands, and reminds you 2 days early on WhatsApp. Approved through Swiggy’s Builders Club and built solo, with a calm, editorial UI and a 100-founding-member waitlist.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    link: "https://cycle-wecare.netlify.app/",
    image: "/shots/cycle.jpg",
    w: 1400,
    h: 799,
  },
  {
    title: "Photography Invoice",
    description:
      "A quotation and invoice builder for photographers. Configure packages, add-ons, and client details to generate a clean, print-ready PDF quote.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind", "Vite"],
    link: "https://photography-invoice-builder.netlify.app/",
    image: "/shots/photography-invoice.jpg",
    w: 1400,
    h: 651,
  },
  {
    title: "Smart Food Recommendation App",
    description:
      "A smart food recommendation app that suggests recipes using calorie and nutrition data. Designed a calm, editorial UI with daily dessert picks and favorites.",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://smart-food-recommendations.netlify.app/",
    image: "/shots/food-app.jpg",
    w: 1400,
    h: 672,
  },
  {
    title: "Creme Coffee Shop",
    description:
      "Designed and built a responsive coffee brand website in Framer, focusing on typography, layout systems, and subtle interactions.",
    tech: ["Framer"],
    link: "https://creme-coffee.framer.website/",
    image: "/shots/creme-coffee.jpg",
    w: 1400,
    h: 697,
  },
  {
    title: "Fleet Tracker App",
    description:
      "A real-time fleet monitoring dashboard that simulates vehicle trips, visualizes live routes, and tracks alerts, fuel, battery, and signal data.",
    tech: ["React", "Tailwind", "TypeScript", "ECharts"],
    link: "https://rajvee-fleet-dashboard.netlify.app/",
    image: "/shots/fleet.jpg",
    w: 1400,
    h: 681,
  },
  {
    title: "Dashboard Page",
    description:
      "A responsive static admin dashboard with order tracking, revenue insights, and customer feedback. Includes real-time charts, profit metrics, cancellations, and intuitive navigation for managing orders, goals, popular dishes, and menus.",
    tech: ["React", "Tailwind", "TypeScript", "JavaScript"],
    link: "https://dashboard-demo-rajvee.netlify.app/",
    image: "/shots/dashboard.jpg",
    w: 1400,
    h: 803,
  },
];

/* ---------------- About ---------------- */

export const ABOUT = {
  facts: [
    { label: "Based in", value: "Bangalore" },
    { label: "Focus", value: "Frontend (React, Next.js, TypeScript, JavaScript)" },
    { label: "Experience", value: "4+ years" },
    { label: "Currently building", value: "Cycle", href: "https://cycle-wecare.netlify.app/" },
    { label: "Open to work", value: "Yes" },
  ],
  likes: ["🧩 UI details", "☕ Coffee", "🍳 Cooking", "📺 Good sitcoms"],
  heading: "Hey, I’m Rajvee 👋",
  bio: [
    "I’m a frontend developer based in Bangalore. I mostly live in React, TypeScript, and the tiny details that make interfaces feel right.",
    "I studied Information and Communication Technology Engineering at Ahmedabad University, and frontend development is where I naturally ended up and stayed. I’ve built and shipped Shopify apps, worked on performance optimisation (yes, I care about Lighthouse scores), built a React app for Thinkific, and developed features in Wix using blocks. I’m also a certified Wix Velo developer, so wiring logic and UI together doesn’t scare me.",
    "I enjoy building interfaces that are clean, fast, and make sense to real users. I like things that feel playful but still solid under the hood. This site is a small reflection of that.",
    "Outside of work, I like cooking, drinking good coffee, and sharing small life snippets on Instagram and YouTube. Sometimes it’s coffee, sometimes it’s food, sometimes it’s just a random thought. Not everything needs to be serious.",
    "If you’re looking for a frontend developer who enjoys building things properly and keeping it fun, we’ll probably get along.",
  ],
};

/* ---------------- Resume ---------------- */

export const RESUME = {
  title: "Frontend Engineer",
  summary:
    "Frontend engineer with 4+ years shipping production interfaces in React, Next.js and TypeScript across data-heavy dashboards, CMS-driven sites and Shopify storefronts, including the network operations dashboard for Tejas Networks, whose equipment carries India’s telecom backbone. I treat performance as part of the build, with measurable Web Vitals and bundle wins on every product I have owned, and reach past the frontend when needed.",
  skills: [
    {
      group: "Frontend",
      items: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Hooks", "Context API", "Redux", "React Query", "JointJS", "Tailwind", "MUI", "SCSS"],
    },
    {
      group: "Performance & architecture",
      items: ["Code splitting", "Lazy loading", "Web Vitals (LCP, CLS, TBT)", "Image optimisation", "Component architecture", "Design systems"],
    },
    {
      group: "Backend & cloud",
      items: ["Python", "FastAPI", "REST APIs", "AWS S3 (presigned URLs, multipart uploads)"],
    },
    {
      group: "Commerce, CMS & tools",
      items: ["Shopify", "Liquid", "Metafields", "Framer with custom code components", "Git", "Webpack", "GitHub Actions", "Vercel", "Netlify", "Figma"],
    },
  ],
  experience: JOBS,
  projects: [
    { name: "Cycle", text: "A cart-prep agent for Swiggy Instamart, approved through Swiggy’s Builders Club. Built solo." },
    { name: "Collab Trackr", text: "Collaboration tracking tool for creators, built and shipped end to end." },
  ],
  education: { school: "Ahmedabad University", degree: "Bachelor of Technology, Information and Communication Technology" },
};

/* ---------------- Contact ---------------- */

export const CONTACT = {
  heading: "Let’s talk",
  intro: "If something here feels interesting or familiar, feel free to reach out. I’m always happy to chat.",
  open: { title: "Open to conversations", text: "Work, frontend, coffee, or just saying hi." },
  note: "I’m now exploring new frontend opportunities where I can bring in my experience, continue learning, and grow with a great team. If something sounds like a good fit, let’s connect.",
  reply: "☕ I usually reply within a day or two",
};

/* ---------------- Content creation (@chaotic_brews) ---------------- */

export const MEDIA_KIT = {
  kicker: "Media kit · Bengaluru",
  name: "chaotic brews",
  handle: "@chaotic_brews",
  intro: "Coffee, matcha, and everything they're served on — made at home and photographed like it matters.",
  hero: { src: "/media/hero.webp", alt: "Matcha and coffee in speckled ceramic cups, shot from above", w: 760, h: 760 },
  /**
   * Instagram insights, from the Edits export "Account insights for chaotic_brews"
   * (23 Jul – 21 Oct 2026, 90 days). Raw numbers, so the page can work out
   * per-reel averages. Likes, comments etc. include posts as well as reels.
   */
  insights: {
    period: "23 Jul – 21 Oct 2026",
    days: 90,
    followers: 1881,
    reels: 50,
    views: 428_000,
    viewers: 316_000,
    interactions: [
      { label: "Likes", value: 38_000 },
      { label: "Comments", value: 682 },
      { label: "Reposts", value: 5_400 },
      { label: "Shares", value: 5_000 },
      { label: "Saves", value: 2_600 },
    ],
    gender: { women: 55.0, men: 45.0 },
    age: [
      { label: "13–17", value: 3.3 },
      { label: "18–24", value: 14.8 },
      { label: "25–34", value: 56.1 },
      { label: "35–44", value: 16.7 },
      { label: "45–54", value: 5.1 },
      { label: "55–64", value: 2.6 },
      { label: "65+", value: 1.5 },
    ],
    countries: [
      { label: "India", value: 73.5 },
      { label: "United States", value: 5.3 },
      { label: "Canada", value: 2.4 },
      { label: "United Kingdom", value: 2.0 },
      { label: "Philippines", value: 1.7 },
    ],
    cities: [
      { label: "Delhi", value: 12.5 },
      { label: "Bangalore", value: 11.0 },
      { label: "Mumbai", value: 9.3 },
      { label: "Ahmedabad", value: 9.1 },
      { label: "Rajkot", value: 7.5 },
    ],
  },
  photos: [
    { src: "/media/gallery-2.webp", alt: "Coffee and matcha flat lay with a crochet sunflower", w: 900, h: 675, caption: "matcha + filter, same morning" },
    { src: "/media/about.webp", alt: "Pouring coffee into a hand-painted ceramic mug", w: 620, h: 1102, caption: "the pour" },
    { src: "/media/gallery-1.webp", alt: "Filter coffee in a brass tumbler on a banana leaf", w: 460, h: 460 },
    { src: "/media/yagachi.webp", alt: "Iced coffee next to a bag of Yagachi Coffee and a candle", w: 460, h: 460 },
  ],
  account: {
    heading: "Hi — I'm Rajvee.",
    quote: "They don't scroll past a good cup — they save it.",
    image: { src: "/media/about.webp", alt: "Pouring coffee into a hand-painted ceramic mug", w: 620, h: 1102 },
    text: [
      "@chaotic_brews is where I make coffee and matcha at home and photograph the ritual around it: the pour, the cup it lands in, the ten quiet minutes before the day starts.",
      "It's a small, warm audience of people who care about that ritual. They don't scroll past a good cup — they save it, screenshot it, and ask where the mug is from. That's why the work has grown past the drink itself, into the crockery it's poured into and the small things that make a home feel like one.",
    ],
  },
  gallery: [
    { src: "/media/gallery-1.webp", alt: "Filter coffee in a brass tumbler on a banana leaf", w: 460, h: 460 },
    { src: "/media/gallery-2.webp", alt: "Coffee and matcha flat lay with a crochet sunflower", w: 900, h: 675 },
  ],
  formats: ["Reels & short-form video", "Still photography", "Flat lays & product styling", "UGC for brand channels"],
  categories: ["Coffee", "Matcha", "Crockery", "Home décor", "Home essentials"],
  reels: [
    // kind picks the card colour on the page; image only where we have a photo of that brand's shoot.
    { brand: "Dancing Cow", note: "oat milk", kind: "coffee", href: "https://www.instagram.com/reel/Db-0QQOspM4/" },
    { brand: "First Club", note: "grocery app, Bangalore", kind: "grocery", href: "https://www.instagram.com/reel/Db3Fdstyn4P/" },
    { brand: "Tencha Matcha", note: "matcha", kind: "matcha", href: "https://www.instagram.com/reel/DYCMznEMH5t/" },
    { brand: "Berunda Coffee", note: "coffee", kind: "coffee", href: "https://www.instagram.com/reel/DbYNRc9S1dG/" },
    { brand: "Cüraa by YFL", note: "frothers", kind: "home", image: "/media/curaa.webp", href: "https://www.instagram.com/reel/DautLUWSLM1/" },
    { brand: "Umbrella Store", note: "home & lifestyle", kind: "home", image: "/media/umbrella.webp", href: "https://www.instagram.com/reel/DaHmOVxMU79/" },
    { brand: "Joker Street", note: "home & lifestyle", kind: "home", href: "https://www.instagram.com/reel/DZy9LGLsQXq/" },
    { brand: "Glasafe", note: "glassware", kind: "glass", href: "https://www.instagram.com/reel/DZNObAeMkdP/" },
    { brand: "Colthas Coffee", note: "coffee", kind: "coffee", href: "https://www.instagram.com/reel/DZhFUoSMwHz/" },
  ],
  featured: [
    { name: "Cüraa by YFL", src: "/media/curaa.webp" },
    { name: "Umbrella Store", src: "/media/umbrella.webp" },
    { name: "Yagachi Coffee", src: "/media/yagachi.webp" },
  ],
  brands: [
    { group: "Coffee & alt-milk", names: ["Berunda Coffee", "Colthas Coffee", "Yagachi Coffee", "Latteholic", "Dancing Cow (oat milk)"] },
    { group: "Matcha", names: ["Tencha Matcha", "Bree Matcha"] },
    { group: "Glassware & ceramics", names: ["Glasafe", "Pebel Glassware"] },
    { group: "Home & lifestyle", names: ["Cüraa by YFL (frothers)", "SNS Living", "Umbrella Store", "Joker Street"] },
    { group: "Grocery & local apps", names: ["First Club"] },
  ],
  why: [
    { title: "One pair of hands", text: "Concept, styling, shoot, edit and caption — all mine. Nothing gets outsourced or lost in a handover." },
    { title: "Your product in frame", text: "The product is the subject, not a prop blurred in the background. It stays legible, in focus, and named." },
    { title: "Made to be saved", text: "Styled for the screenshot and the share — the two things that actually move a small brand." },
  ],
  ratesIntro: "All content is shot, styled and edited by me. Concepts are shared for approval before filming.",
  rates: [
    { name: "Barter collaboration", when: "For products valued at ₹2,000 and above", includes: "1 reel · 2 stories with link sticker", price: "Gifted", unit: "Product only" },
    { name: "Paid partnership", when: "For products valued under ₹2,000", includes: "1 reel · 2 stories with link sticker · 1 month paid ad rights", price: "₹2,000", unit: "Per package" },
    { name: "UGC video", when: "Content for your channels — not posted on @chaotic_brews", includes: "1 edited vertical video, delivered raw or finished", price: "₹2,000", unit: "Per video" },
  ],
  ratesNote: "Extended usage rights, exclusivity, whitelisting and multi-post packages quoted separately.",
  steps: [
    { title: "Brief", text: "You send the brief and the product." },
    { title: "Concept", text: "I share a concept for your approval." },
    { title: "Shoot", text: "I shoot and edit, then send a preview." },
    { title: "Revise", text: "One round of revisions, included." },
    { title: "Live", text: "Live within 7–10 days of delivery." },
  ],
  collabMail: "mailto:rajveedkadchha@gmail.com?subject=Collaboration%20with%20%40chaotic_brews",
};
