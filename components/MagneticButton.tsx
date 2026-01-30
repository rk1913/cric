import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Increased magnetic pull sensitivity
    setPosition({ x: x * 0.45, y: y * 0.45 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: "spring", 
        stiffness: 250, 
        damping: 15, 
        mass: 0.1 
      }}
      className={`relative inline-block ${className}`}
    >
      <button 
        onClick={onClick}
        className="relative px-10 py-5 bg-white text-black font-black rounded-full text-[10px] uppercase tracking-[0.3em] transition-all hover:scale-110 active:scale-90 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group"
      >
        <div className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 opacity-5 rounded-full" />
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
};

export default MagneticButton;