// NextContent.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateHeading from "./AnimateHeading";
import Header from "./Header";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";

const NextContent = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [nextPage, setNextPage] = useState("");
  const [showSlide, setShowSlide] = useState(false);

  const handlePageChange = (page) => {
    // if (page !== currentPage) {
    setNextPage(page);
    setShowSlide(true);
    setTimeout(() => {
      setCurrentPage(page);
      setShowSlide(false);
      const sectionId = page.toLowerCase();
      console.log(sectionId);
      const section = document.getElementById(sectionId);
      console.log(section);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 2000); // Slide duration should be less than this timeout
    // }
  };

  return (
    <div className="relative w-full h-full overflow-x-hidden">
      <Header onNavClick={handlePageChange} />
      <AnimatePresence>
        {showSlide && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="text-white text-3xl">{nextPage}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="flex justify-center items-center text-white bg-black h-full"
        id="home"
      >
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <AnimateHeading />
        </motion.div>
      </div>
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default NextContent;
