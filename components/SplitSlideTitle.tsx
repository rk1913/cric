
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SplitSlideTitleProps {
  topText: string;
  bottomText: string;
}

const SplitSlideTitle: React.FC<SplitSlideTitleProps> = ({ topText, bottomText }) => {
  const { scrollYProgress } = useScroll();

  // Scaling Logic: Scroll down (progress 0 -> 1) causes scale to recede (1.1 -> 1.0)
  // This creates a "receding depth" effect as the user moves down the page.
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.1, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0.2]);

  const slideTransition = {
    duration: 1.8,
    // Fix: Cast easing array to any to prevent Type 'number[]' is not assignable to type 'Easing | Easing[]'
    ease: [0.16, 1, 0.3, 1] as any,
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full">
      <motion.div 
        style={{ 
          scale, 
          opacity,
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'translateZ(0)' 
        }}
        layout
        className="w-full flex flex-col items-center"
      >
        {/* Top Row - Slides from Left */}
        <div className="overflow-hidden w-full flex justify-center whitespace-nowrap">
          <motion.h2
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={slideTransition}
            className="text-[15vw] font-black uppercase tracking-[-0.05em] leading-[0.8] text-transparent"
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.15)', 
              mixBlendMode: 'overlay',
              willChange: 'transform'
            }}
          >
            {topText}
          </motion.h2>
        </div>

        {/* Bottom Row - Slides from Right */}
        <div className="overflow-hidden w-full flex justify-center whitespace-nowrap">
          <motion.h2
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ ...slideTransition, delay: 0.2 }}
            className="text-[15vw] font-black uppercase tracking-[-0.05em] leading-[0.8] text-transparent"
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.15)', 
              mixBlendMode: 'overlay',
              willChange: 'transform'
            }}
          >
            {bottomText}
          </motion.h2>
        </div>
      </motion.div>
    </div>
  );
};

export default SplitSlideTitle;
