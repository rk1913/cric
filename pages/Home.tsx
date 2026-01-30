
import React from 'react';
import { motion } from 'framer-motion';
import { players } from '../data/players';
import Carousel3D from '../components/Carousel3D';
import MagneticButton from '../components/MagneticButton';
import BackgroundBrandName from '../components/BackgroundBrandName';

const ScrollReveal: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      type: "spring", 
      stiffness: 70, 
      damping: 20, 
      delay 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home: React.FC = () => {
  const containerEasing = [0.22, 1, 0.36, 1] as any;

  return (
    <div className="min-h-screen bg-[#030303] overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Animation Layer */}
        <BackgroundBrandName topText="LEGENDARY" bottomText="SIGNATURES" />

        <div className="z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-blue-400">
              The Digital Anthology
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: containerEasing, delay: 0.6 }}
              className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.75]"
            >
              CRICKET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">HERITAGE</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-12"
          >
            <MagneticButton>
              Explore Archive
            </MagneticButton>
          </motion.div>
        </div>

        {/* 3D Carousel Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.8, ease: containerEasing }}
          className="w-full mt-10"
        >
          <Carousel3D items={players} />
        </motion.div>
      </section>

      {/* Stats Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-min">
          
          <ScrollReveal className="md:col-span-2 md:row-span-2 rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-12 flex flex-col justify-end relative overflow-hidden group min-h-[500px]">
              <div className="absolute top-0 right-0 p-10 z-20">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop')] bg-cover grayscale group-hover:scale-105 transition-transform duration-[3s]" />
              <div className="relative z-20">
                <h3 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">Total<br/>Dominance</h3>
                <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm">
                  Documenting the statistical masterclasses and moments that defined India's identity on the global stage.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-8 flex flex-col justify-center items-center text-center group border border-white/5">
              <span className="text-7xl font-black text-white tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">100</span>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">Global Centuries</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-8 flex flex-col justify-center items-center text-center bg-blue-600/5 border border-blue-500/20 group">
              <span className="text-7xl font-black text-blue-500 tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">664</span>
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.3em]">Iconic Matches</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="md:col-span-2 rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-10 flex items-center justify-between group overflow-hidden relative border border-white/5">
              <div className="absolute -right-4 -top-4 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full" />
              <div className="flex -space-x-4 relative z-10">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-[#030303] bg-white/10 overflow-hidden ring-1 ring-white/10">
                    <img src={`https://picsum.photos/id/${i+20}/100/100`} alt="User" />
                  </div>
                ))}
                <div className="w-16 h-16 rounded-full border-4 border-[#030303] bg-blue-600 flex items-center justify-center text-[10px] font-bold shadow-2xl">+12k</div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-white font-black text-2xl tracking-tight italic uppercase">Collectors</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Global Community</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-8 flex flex-col justify-center items-center text-center group border border-white/5">
               <div className="text-blue-500 mb-6 opacity-40 group-hover:opacity-100 transition-all">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
               </div>
               <span className="text-3xl font-black text-white tracking-tighter">PREMIUM</span>
               <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">Archival Grade</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5} className="md:col-span-2 rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-10 flex flex-col justify-center relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6">Historical Verification</h4>
              <div className="flex items-center space-x-8">
                  <div className="h-14 w-px bg-white/10" />
                  <p className="text-gray-400 text-sm font-light italic leading-relaxed">
                    Absolute authenticity guaranteed for every legacy entry through our proprietary historical verification protocols.
                  </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6} className="rounded-[3rem] overflow-hidden">
            <div className="h-full glass-card p-8 flex flex-col justify-center items-center group border border-white/5">
               <div className="grid grid-cols-2 gap-3 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="w-4 h-4 rounded-sm bg-white" />
                  <div className="w-4 h-4 rounded-sm bg-blue-500" />
                  <div className="w-4 h-4 rounded-sm bg-blue-500" />
                  <div className="w-4 h-4 rounded-sm bg-white" />
               </div>
               <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-8">System Status</span>
               <span className="text-xs font-black text-green-500 uppercase tracking-widest mt-1">ONLINE</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t border-white/5 py-32 px-6 overflow-hidden">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center space-x-2 mb-12 md:mb-0">
              <span className="text-2xl font-black tracking-tighter text-blue-500">CRIC</span>
              <span className="text-2xl font-light tracking-widest text-white">LEGENDS</span>
            </div>
            <div className="flex space-x-16 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Archival Access</a>
              <a href="#" className="hover:text-white transition-colors">Global Contact</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Home;
