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
            I am a 25-year-old currently residing in Bangalore,with 3 years of
            experience as Frontend development.
            {/* where I relish
            authentic dosas and take leisurely strolls through Cubbon Park. In
            my downtime, you’ll often find me rewatching episodes of{" "}
            <i>Big bang theory</i> and <i>Modern Family</i>, indulging in my
            passion for cooking, savoring good food, or delving into a
            captivating book. */}
          </p>
          <p className="text-gray-700 mb-4">
            I hold a degree in ICT engineering from Ahmedabad University. My
            professional journey includes extensive experience in building
            Shopify apps, enhancing site performance, and achieving impressive
            performance scores above 80. I have also created an app in Wix using
            blocks. Notably, I developed a React app for Thinkific. Also, I am
            certified Wix Velo developer.
          </p>
          <p className="text-gray-700 mb-4">
            I am seeking Frontend job opportunities where I can apply my skills,
            continue to learn, and grow. If you have a position that aligns with
            my expertise and experience, please reach out to me.
          </p>
        </div>
      </main>
    </div>
  );
}
