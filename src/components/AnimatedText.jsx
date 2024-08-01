import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../components/AnimatedText.module.css";
const AnimatedText = ({ text }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={wordVariants}
      className={styles.animatedTextContainer}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className={styles.word}
          variants={wordVariants}
        >
          {word.split("").map((letter, i) => (
            <motion.span
              key={i}
              className={styles.letter}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
          &nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
