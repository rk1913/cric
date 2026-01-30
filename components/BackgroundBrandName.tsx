
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface BackgroundBrandNameProps {
  topText: string;
  bottomText: string;
}

const BackgroundBrandName: React.FC<BackgroundBrandNameProps> = ({ topText, bottomText }) => {
  const { scrollYProgress } = useScroll();

  // Scroll-linked tracking: Spreads letters from tighter to wider
  const tracking = useTransform(scrollYProgress, [0, 0.4], ['-0.05em', '0.2em']);
  
  // Receding depth
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.35, 0.08]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth) - 0.5);
    mouseY.set((e.clientY / innerHeight) - 0.5);
  };

  const luxuryEase = [0.23, 1, 0.32, 1] as any;

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 w-full overflow-hidden"
    >
      <motion.div 
        style={{ 
          scale, 
          opacity,
          x: translateX,
          y: translateY,
          transformOrigin: 'center center',
          willChange: 'transform'
        }}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* Row 1 */}
        <div className="overflow-hidden w-full flex justify-center whitespace-nowrap py-10 -my-5">
          <motion.h2
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 2.5, ease: luxuryEase }}
            className="text-[18vw] font-black uppercase leading-[0.75] text-transparent"
            /* Corrected: Removed duplicate style attribute and merged into one */
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.12)', 
              mixBlendMode: 'overlay',
              letterSpacing: tracking
            }}
          >
            {topText}
          </motion.h2>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden w-full flex justify-center whitespace-nowrap py-10 -my-5">
          <motion.h2
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 2.5, ease: luxuryEase, delay: 0.1 }}
            className="text-[18vw] font-black uppercase leading-[0.75] text-transparent"
            /* Corrected: Removed duplicate style attribute and merged into one */
            style={{ 
              WebkitTextStroke: '1px rgba(255,255,255,0.12)', 
              mixBlendMode: 'overlay',
              letterSpacing: tracking
            }}
          >
            {bottomText}
          </motion.h2>
        </div>
      </motion.div>
    </div>
  );
};

export default BackgroundBrandName;
