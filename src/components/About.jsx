import React from "react";
import profileImg from "../assets/myImg.jpg";

export default function About() {
  return (
    <div
      className=" min-h-screen bg-white flex items-center justify-center py-12"
      id="about"
    >
      <main className="container mx-auto flex flex-col md:flex-row items-center py-12 px-4">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-auto object-cover rounded"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8 text-justify">
          <h1 className="text-4xl font-bold mb-4">So, who am I?</h1>
          <p className="text-gray-700 mb-4">
            Hey! I’m Rajvee, a 25-year-old frontend developer based in Bangalore
            with 3 years of experience building clean, fast, and responsive web
            applications.
            {/* I am a 25-year-old currently residing in Bangalore,with 3 years of
            experience as Frontend development. */}
            {/* where I relish
            authentic dosas and take leisurely strolls through Cubbon Park. In
            my downtime, you’ll often find me rewatching episodes of{" "}
            <i>Big bang theory</i> and <i>Modern Family</i>, indulging in my
            passion for cooking, savoring good food, or delving into a
            captivating book. */}
          </p>
          <p className="text-gray-700 mb-4">
            hold a degree in Information and Communication Technology
            Engineering from Ahmedabad University, and I’ve been passionate
            about frontend development ever since. I’ve worked extensively on
            Shopify apps, optimized site performance with scores above 80, built
            a React app for Thinkific, and developed features in Wix using
            blocks. I'm also a certified Wix Velo developer.
          </p>
          <p className="text-gray-700 mb-4">
            Currently, I’m part of a frontend team working on a large-scale
            client-facing product, and I’m also contributing to an AI-based
            interview platform, where I focus on improving UI workflows and
            enhancing the user experience across modules.
          </p>
          <p className="text-gray-700 mb-4">
            I’m now exploring new frontend opportunities where I can bring in my
            experience, continue learning, and grow with a great team. If
            something sounds like a good fit, let’s connect!
          </p>
        </div>
      </main>
    </div>
  );
}
