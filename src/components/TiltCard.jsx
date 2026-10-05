import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function TiltCard({ children, className = '', glowColor = 'rgba(69, 92, 233, 0.15)', maxTilt = 6 }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.1 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handlePointerMove = (e) => {
    // Skip touch events to keep mobile scrolling buttery smooth
    if (e.pointerType === 'touch' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normalizedX = clientX / rect.width - 0.5;
    const normalizedY = clientY / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
    glareX.set((clientX / rect.width) * 100);
    glareY.set((clientY / rect.height) * 100);
    glareOpacity.set(1);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  const glareBackground = useMotionTemplate`radial-gradient(350px circle at ${glareX}% ${glareY}%, ${glowColor}, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        transform: 'translateZ(0)',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare spotlight following mouse without React re-renders */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          opacity: glareOpacity,
          background: glareBackground,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
