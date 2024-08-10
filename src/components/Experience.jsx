// src/components/Experience.js
import React from "react";

const timelineData = [
  {
    type: "experience",
    date: "2021-2023",
    title: "Software Engineer",
    description: [
      `* Revamped Multi-Country Pricing (MCP) for Shopify 2.0, boosting multinational business profits by 40% and reducing setup
time by nearly 80% by eliminating theme dependencies.`,
      `* Developed and launched a feature-rich Note-taking app on Thinkific, enhancing user engagement by 50% with advanced
editing functionalities and an integrated PDF download feature.`,
      `* Contributed to Wix's Auto Currency Switcher with auto IP detection, increasing customer retention by 10-30% and reducing
bounce rates through IP-based pricing`,
      `* Enhanced page speed up to 80 score for Shopify stores by addressing performance metrics and utilizing technologies like LCP,
CLS, TBT, image optimization, and other solutions`,
      `* Leveraged expertise in React, JavaScript, and CSS to streamline development processes and optimize user experiences across
multiple platforms, including Shopify and Wix`,
    ],
  },
  {
    type: "experience",
    date: "2021-2021",
    title: "Django Developer Intern",
    description: [
      `* Spearheaded integration of Twitter API within the Dolphy-Digital Marketing tool, enriching its functionality by 50% and
facilitating seamless social media management and analytics aggregation.`,
      `* Streamlined tweet scheduling and keyword-based post parsing, enabling one-click solution for tweet scheduling/rescheduling
and reducing time expenditure by 60%, enhancing efficiency and productivity.`,
      `* Launched a mass reply feature, enabling users to engage with multiple tweets simultaneously, boosting user interaction by 40%
and increasing social media engagement metrics by 25%.`,
      `* Leveraged Django framework and REST APIs alongside Twitter API to orchestrate seamless integration and robust
functionality.`,
    ],
  },
  {
    type: "experience",
    date: "2017-2021",
    title: "Btech in ICT",
    description: [
      "Graduated from Ahmedabad University with a Bachelor's in Information and Communication Technology (ICT). Gained extensive hands-on experience in software development and network design.",
    ],
  },
];

export default function Experience() {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row justify-center bg-slate-50 section-experience"
      id="experience"
    >
      <div className="relative w-full md:w-4/5 p-4">
        <h1 className="text-4xl font-bold mb-4">What have I done?</h1>
        <div className="absolute left-12 top-24 bottom-0 w-px bg-gray-300"></div>
        {timelineData
          .filter((item) => item.type === "experience")
          .map((item, index) => (
            <div key={index} className="relative mb-8 pl-16">
              <div className="absolute left-[28px] top-1 w-2 h-2 bg-green-600 rounded-full "></div>
              <p className="absolute lg:-left-[43px] left-[2px] lg:top-0 top-4 text-xs text-green-600">
                {item.date}
              </p>
              <div className="sm:ml-8 ml-0   bg-white p-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
                <h3 className="font-bold">{item.title}</h3>
                <div>
                  <ul className="list-inside text-justify">
                    {item.description.map((line, i) => (
                      <li
                        key={i}
                        className={
                          line.trim().startsWith("*")
                            ? "list-disc ml-4"
                            : "ml-4"
                        }
                      >
                        {line.replace("*", "").trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <div className="ml-8 bg-white p-4 rounded shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.description}</p>
              </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}
