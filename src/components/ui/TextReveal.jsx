import React from 'react';
import { motion } from 'motion/react';

/**
 * TextReveal
 * Minimal staggered word-by-word reveal with sharp typography
 */
export default function TextReveal({
  text = '',
  className = '',
  highlightWords = [],
  highlightColor = 'text-white font-extrabold',
  delay = 0.1,
  staggerDuration = 0.05,
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
      y: 18,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      className={`inline-flex flex-wrap items-center justify-center gap-x-[0.28em] gap-y-[0.1em] text-white tracking-tight ${className}`}
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
            className={`inline-block will-change-transform ${
              isHighlighted ? highlightColor : 'text-neutral-200'
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
