// // src/components/Skillset.js
// import React from "react";

// const skills = [
//   "JavaScript",
//   "React",
//   "Node.js",
//   "Tailwind CSS",
//   "Next.js",
//   "Express",
//   "HTML",
//   "CSS",
//   "Git",
//   "TypeScript",
//   "GraphQL",
//   "Docker",
// ];

// export default function Skillset() {
//   return (
//     <div className="flex flex-col items-center bg-slate-50 py-8">
//       <h1 className="text-4xl font-bold mb-8">Skillset</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-4/5 p-4">
//         {skills.map((skill, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow-lg text-center"
//           >
//             <span className="text-xl font-semibold">{skill}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const skills = {
  frontend: [
    { name: "ReactJS", icon: ["fab", "react"] },
    { name: "JavaScript", icon: ["fab", "js"] },
    { name: "Jquery", icon: ["fab", "js"] }, // Using JavaScript icon as a placeholder
    { name: "HTML", icon: ["fab", "html5"] },
    { name: "CSS", icon: ["fab", "css3-alt"] },
    { name: "Shopify", icon: ["fab", "shopify"] },
    { name: "Liquid", icon: ["fab", "shopify"] }, // Using Shopify icon as a placeholder
    { name: "Velo", icon: ["fab", "wix"] }, // Using Wix icon as a placeholder
    { name: "Python", icon: ["fab", "python"] },
    { name: "Django", icon: ["fab", "python"] }, // Using Python icon as a placeholder
    { name: "Flask", icon: ["fab", "python"] }, // Using Python icon as a placeholder
    { name: "Bootstrap", icon: ["fab", "bootstrap"] },
    { name: "ANTD", icon: ["fab", "css3-alt"] }, // Using CSS icon as a placeholder
    { name: "MaterialUI", icon: ["fab", "css3-alt"] }, // Using CSS icon as a placeholder
    { name: "TailwindCSS", icon: ["fab", "css3-alt"] }, // Using CSS icon as a placeholder
    { name: "Github", icon: ["fab", "github"] },
    { name: "Jira", icon: ["fab", "atlassian"] },
    { name: "Slack", icon: ["fab", "slack"] },
  ],
};

export default function Skillset() {
  return (
    <div className=" py-6">
      <div className="w-4/5 mx-auto">
        <h3 className="text-4xl font-bold mb-8">Skills</h3>
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-8">
            {skills.frontend.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <FontAwesomeIcon icon={skill.icon} className="text-2xl mb-2" />
                <p className="text-center">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
