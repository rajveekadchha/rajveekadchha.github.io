export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
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
