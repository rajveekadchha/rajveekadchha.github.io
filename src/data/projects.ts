import dashboard from "../assets/dashboard.png";
import price from "../assets/price.png";
import match from "../assets/match.png";
import weather from "../assets/weather.png";
import food from "../assets/food-app.png";
import fleet from "../assets/fleet.png";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Smart Food Recommendation App",
    description:
      "A smart food recommendation app that that suggests recipes using calorie and nutrition data.Designed a calm, editorial UI with daily dessert picks and favorites.",
    technologies: ["React", "Tailwind", "TypeScript"],
    link: "https://smart-food-recommendations.netlify.app/",
    image: food,
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
  {
    title: "Price Bundle App",
    description:
      "A skeleton e-commerce bundle app layout. This type of pricing bundle increases items per order by nudging customers to buy more together.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://rajveekadchha.github.io/price-bundle/",
    image: price,
  },
  {
    title: "Card Matching App",
    description:
      "A card matching game designed for kids, using fruit cards and alphabet matching to support early learning through play.",
    technologies: ["React", "Ant Design"],
    link: "https://github.com/rajveekadchha/matching-game",
    image: match,
  },
  {
    title: "Weather App",
    description:
      "A weather application that shows a 7-day forecast. Users can search any city and view temperature, humidity, and wind speed.",
    technologies: ["React", "Material UI", "TypeScript"],
    link: "https://github.com/rajveekadchha/weather-app",
    image: weather,
  },
  
];
