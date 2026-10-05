import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 240, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e) => {
    // Skip touch events for smooth mobile scrolling
    if (e.pointerType === 'touch' || !ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY, transform: 'translateZ(0)' }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
