import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * TiltCard: 3D Interactive Physics Card with dynamic glare and parallax depth
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  tiltIntensity = 14,
  glareOpacity = 0.18,
  glowColor = 'rgba(99, 102, 241, 0.25)',
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate values (-0.5 to 0.5 relative to card center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glare position (percentage 0 to 100)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Spring physics for buttery smooth responsiveness and return
  const springConfig = { damping: 22, stiffness: 260, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations based on mouse position
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
      className={`relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-slate-950/40 backdrop-blur-2xl transition-shadow duration-500 overflow-hidden ${
        isHovered
          ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-white/[0.18]'
          : 'shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
      } ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Light Glare Reflection */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl z-30 transition-opacity duration-300"
        style={{
          opacity: isHovered ? glareOpacity : 0,
          background: `radial-gradient(420px circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.35), transparent 70%)`,
        }}
      />

      {/* Dynamic Ambient Color Glow along border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 25px ${glowColor}`,
        }}
      />

      {/* Card Content with 3D Depth */}
      <div className="relative z-20 w-full h-full" style={{ transform: 'translateZ(18px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
