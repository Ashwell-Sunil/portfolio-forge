import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * TiltCard: Minimal 3D Interactive Physics Card with subtle frosted glass and glare
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  tiltIntensity = 8,
  glareOpacity = 0.12,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(currentX);
    mouseY.set(currentY);

    glareX.set(((e.clientX - rect.left) / width) * 100);
    glareY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...style,
      }}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 overflow-hidden ${
        isHovered
          ? 'border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] bg-white/[0.05]'
          : 'shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
      } ${className}`}
      {...props}
    >
      {/* Subtle Cursor Light Glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? glareOpacity : 0,
          background: `radial-gradient(350px circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.2), transparent 75%)`,
        }}
      />

      {/* Card Content with subtle 3D Depth */}
      <div className="relative z-20 w-full h-full" style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
