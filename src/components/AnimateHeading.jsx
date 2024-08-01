// src/AnimatedHeading.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimateHeading() {
  // const words = ["React", "JavaScript", "HTML", "CSS", "Shopify", "Wix"];
  const words = [
    "INTERACTIVE",
    "INNOVATIVE",
    "RESPONSIVE",
    "SEAMLESS",
    "FAST",
    "ACCESSIBLE",
    "SECURE",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" flex flex-col text-left uppercase heading-text">
      <div className="flex flex-row items-center">
        <span className="px-12">&#8226;</span>
        <div className="uppercase text-base sm:text-sm md:text-base lg:text-xl xl:text-2xl">
          (I)
        </div>
        <span>BRING</span>
      </div>

      <div className="ml-12">YOUR VALUABLE</div>

      <div> IDEAS TO LIFE W/ </div>
      <div className="relative h-[1.5rem] sm:h-[3rem] md:h-[4rem] lg:h-[5rem] xl:h-[5.5rem]">
        <AnimatePresence>
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full text-center"
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="ml-12">WEB EXPERIENCES</div>
    </div>
  );
}
