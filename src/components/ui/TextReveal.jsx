import React from 'react';
import { motion } from 'motion/react';

/**
 * TextReveal
 * Dramatic staggered word-by-word reveal animation with blur and spring physics
 */
export default function TextReveal({
  text = '',
  className = '',
  highlightWords = [],
  highlightColor = 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400',
  delay = 0.1,
  staggerDuration = 0.07,
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: 'blur(8px)',
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      className={`inline-flex flex-wrap items-center justify-center gap-x-[0.28em] gap-y-[0.1em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block will-change-transform ${isHighlighted ? highlightColor : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
