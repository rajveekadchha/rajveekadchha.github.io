import React, { useState } from "react";
import TypingAnimation from "./TypingAnimation";
import NextContent from "./NextContent";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showNextContent, setShowNextContent] = useState(false);
  const [showFrontendEngineer, setShowFrontendEngineer] = useState(false);

  const handleTypingComplete = () => {
    setShowFrontendEngineer(true);
    setTimeout(() => {
      setShowNextContent(true);
    }, 1000);
  };

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <AnimatePresence>
        {!showNextContent && (
          <motion.div
            className="absolute w-full h-full bg-black text-white flex flex-col justify-center items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 1 } }}
          >
            <h1 className="uppercase heading-text text-center">
              <TypingAnimation
                text="Hey I am Rajvee !"
                onComplete={handleTypingComplete}
              />
            </h1>
            {showFrontendEngineer && (
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mt-4">
                Software engineer
              </h2>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {showNextContent && <NextContent />}
    </div>
  );
}
