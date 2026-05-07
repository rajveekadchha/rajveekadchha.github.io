export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
  company: "The Summer Design",
  role: "Frontend Developer",
  period: "Feb 2024 – Dec 2024 | Jan 2026 – Present",
  summary:
    "Built high-performance marketing websites for client brands using Framer and custom code, focused on storytelling, responsiveness, and on-brand visuals.",
  highlights: [
    "Shipped responsive, accessible client websites with cross-browser compatibility",
    "Optimized image delivery using WebP, lazy loading, and responsive sizing",
    "Translated Figma designs into production-ready, performant interfaces",
  ],
},
  {
    company: "Birbal AI",
    role: "Software Developer",
    period: "Jan 2025 – June 2025",
    summary:
      "Worked on data-heavy dashboards and internal tools focused on performance and scalability.",
    highlights: [
      "Built dynamic network graph dashboards for client-facing analytics",
      "Improved performance of large datasets using optimized rendering",
      "Collaborated closely with product and backend teams",
    ],
  },
  {
    company: "Mlveda",
    role: "Software Engineer",
    period: " May 2021 – Nov 2023",
    summary:
      "Worked on Shopify and Wix ecosystem products focused on pricing, localization, and retention.",
    highlights: [
      "Built multi-country pricing features for Shopify 2.0",
      "Implemented IP-based currency switching for Wix",
      "Reduced setup friction and improved merchant adoption",
    ],
  },
];
