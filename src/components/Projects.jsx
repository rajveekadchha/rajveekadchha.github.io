// src/components/Projects.js
import React, { useState } from "react";
import match from "../assets/card_match.png";
import weather from "../assets/weather.png";
import Skillset from "./Skillset";
const projectData = [
  {
    title: "Weather App",
    description: `This is a weather app. Which shows data of 7 days, you can search and get temperature, humidity, wind speed of any particular city`,
    technologies: ["React", "Material UI", "Typescript"],
    link: "https://github.com/rajveekadchha/weather-app",
    image: weather,
  },
  {
    title: "Card Matching App",
    description: `This is a Card Matching App. It includes Playcards of fruits and matching Alphabets.It is designed for kids to stimulate their learning.`,
    technologies: ["React", "Ant Design"],
    link: "https://github.com/rajveekadchha/matching-game",
    image: match,
  },
];

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-white py-10"
      id="projects"
    >
      <h1 className="text-4xl font-bold mb-4">What have I learned ?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-4/5 p-4">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p className="mb-4">
              {expandedIndex === index
                ? project.description
                : `${project.description.substring(0, 100)}...`}
            </p>
            {expandedIndex === index && (
              <div className="mb-4">
                <h3 className="font-semibold">Technologies:</h3>
                <ul className="list-disc list-inside">
                  {project.technologies.map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => toggleExpand(index)}
              className="text-blue-500 hover:underline"
            >
              {expandedIndex === index ? "Read less" : "Read more"}
            </button>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mb-4"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
      <Skillset />
    </div>
  );
}
