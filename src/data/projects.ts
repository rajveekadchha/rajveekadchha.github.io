import dashboard from "../assets/dashboard.png";
import food from "../assets/food-app.png";
import fleet from "../assets/fleet.png";
import coffee from "../assets/Coffee.png";
import cycle from "../assets/cycle.png";
import photographyInvoice from "../assets/photographyInvoice.png";
import collabTracker from "../assets/collab-tracker.png";
import squadifier from "../assets/squadifier.png";
import goldenGroup from "../assets/goldengroup.png";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
  title: "Golden Group",
  description:
    "Marketing website for Golden Group, a Surat, Gujarat-based real estate developer with 22+ completed residential, commercial, and industrial projects. Built as a client project at The Summer Design, focused on storytelling and on-brand visuals across their project listings.",
  technologies: ["WordPress", "Divi"],
  link: "https://www.goldengroup.net.in/",
  image: goldenGroup,
},
  {
  title: "Squadifier",
  description:
    "A BGMI qualifier scoreboard for competitive squads. Reads up to 15 match screenshots, tallies every point on the 10-point system, and turns the whole qualifier into a live, shareable page — no sign-in needed for teammates.",
  technologies: ["Next.js", "TypeScript"],
  link: "https://www.squadifier.com/",
  image: squadifier,
},
  {
  title: "Collab Tracker",
  description:
    "A dashboard to manage every brand collab pitch, deal, and deliverable in one place. Tracks reply rates, follow-ups due, and package status across active partnerships.",
  technologies: ["React", "Tailwind","Supabase"],
  link: "https://comfy-lolly-03a950.netlify.app/",
  image: collabTracker,
},
  {
  title: "Cycle",
  description:
    "A period-care agent that knows your cycle, preps your Instamart cart with your usual brands, and reminds you 2 days early on WhatsApp. Designed a calm, editorial UI with a 100-founding-member waitlist.",
  technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
  link: "https://cycle-wecare.netlify.app/",
  image: cycle,
},
{
  title: "Photography Invoice",
  description:
    "A quotation and invoice builder for photographers. Configure packages, add-ons, and client details to generate a clean, print-ready PDF quote.",
  technologies: ["React","NextJS", "TypeScript", "Tailwind", "Vite"],
  link: "https://photography-invoice-builder.netlify.app/",
  image: photographyInvoice,
},
  {
    title: "Smart Food Recommendation App",
    description:
      "A smart food recommendation app that that suggests recipes using calorie and nutrition data.Designed a calm, editorial UI with daily dessert picks and favorites.",
    technologies: ["React", "Tailwind", "TypeScript"],
    link: "https://smart-food-recommendations.netlify.app/",
    image: food,
  },
   {
    title: "Creme Coffee shop",
    description:
      "Designed and built a responsive coffee brand website in Framer, focusing on typography, layout systems, and subtle interactions.",
    technologies: ["Framer"],
    link: "https://creme-coffee.framer.website/",
    image: coffee,
  },
  {
    title: "Fleet Tracker App",
    description:
      "A real-time Fleet Monitoring Dashboard simulates vehicle trips, visualizes live routes, and tracks alerts, fuel, battery, and signal data.",
    technologies: ["React", "Tailwind", "TypeScript","ECharts"],
    link: "https://rajvee-fleet-dashboard.netlify.app/",
    image: fleet,
  },
  {
    title: "Dashboard Page",
    description:
      "Built a responsive static  admin dashboard with order tracking, revenue insights, and customer feedback. Includes real-time charts, profit metrics, cancellations, and intuitive navigation for managing orders, goals, popular dishes, and menus.",
    technologies: ["React", "Tailwind", "TypeScript", "JavaScript"],
    link: "https://dashboard-demo-rajvee.netlify.app/",
    image: dashboard,
  },
];
