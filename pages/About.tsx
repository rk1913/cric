
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  // Fix: Use 'as const' for the transition type to prevent inference as 'string'
  const springReveal = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 20,
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] pt-40 pb-20 px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden mb-20">
          <motion.div 
            initial={springReveal.initial}
            whileInView={springReveal.whileInView}
            viewport={springReveal.viewport}
            transition={springReveal.transition}
          >
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">
              Behind the Archive // Mission
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-12 leading-none">
              Preserving <br/>
              <span className="text-white/20">Greatness</span>
            </h1>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="overflow-hidden rounded-[2rem]">
            <motion.div 
              initial={springReveal.initial}
              whileInView={springReveal.whileInView}
              viewport={springReveal.viewport}
              // Fix: Explicitly define transition to ensure 'type' is not widened to 'string'
              transition={{ ...springReveal.transition, delay: 0.1 }}
              className="h-full glass-card p-10 border border-white/5"
            >
              <h3 className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-6">Our Philosophy</h3>
              <p className="text-gray-400 font-light leading-relaxed text-lg italic">
                "Cricket isn't just a sport in India; it's the rhythm of a billion hearts. Cric Legends was created to capture that heartbeat in a digital medium."
              </p>
            </motion.div>
          </div>
          <div className="overflow-hidden rounded-[2rem]">
            <motion.div 
              initial={springReveal.initial}
              whileInView={springReveal.whileInView}
              viewport={springReveal.viewport}
              // Fix: Explicitly define transition to ensure 'type' is not widened to 'string'
              transition={{ ...springReveal.transition, delay: 0.2 }}
              className="h-full glass-card p-10 border border-white/5 flex flex-col justify-center"
            >
              <h3 className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-6">The Goal</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                To provide a premium, archival-grade experience that honors the discipline, longevity, and impact of Indian cricket's finest.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="overflow-hidden mb-20">
          <motion.div 
            initial={springReveal.initial}
            whileInView={springReveal.whileInView}
            viewport={springReveal.viewport}
            // Fix: Explicitly define transition to ensure 'type' is not widened to 'string'
            transition={{ ...springReveal.transition, delay: 0.3 }}
            className="space-y-12 text-gray-500 font-light text-xl leading-relaxed"
          >
            <p>
              <strong>Cric Legends</strong> is an immersive digital gallery showcasing the monumental achievements 
              of players who have redefined the game. Every card, stat, and story is crafted to reflect the intensity 
              and grace of these iconic individuals.
            </p>
            <p>
              Using modern frontend architecture—React 19, TypeScript, and Framer Motion—we’ve built a platform that 
              prioritizes aesthetics and fluidity, mirroring the technical excellence found on the cricket pitch.
            </p>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div 
            initial={springReveal.initial}
            whileInView={springReveal.whileInView}
            viewport={springReveal.viewport}
            // Fix: Explicitly define transition to ensure 'type' is not widened to 'string'
            transition={{ ...springReveal.transition, delay: 0.4 }}
            className="mt-20 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div>
              <p className="text-white font-black italic text-2xl">V.01</p>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Build Version</p>
            </div>
            <div>
              <p className="text-white font-black italic text-2xl">664</p>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Iconic Entries</p>
            </div>
            <div>
              <p className="text-white font-black italic text-2xl">3D</p>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Visual Engine</p>
            </div>
            <div>
              <p className="text-white font-black italic text-2xl">4K</p>
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Asset Quality</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
