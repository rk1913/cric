
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Player } from '../types';
import { useDreamTeam } from '../context/DreamTeamContext';

interface PlayerCardProps {
  player: Player;
  index: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, index }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, getEffectiveImage } = useDreamTeam();
  const cardRef = useRef<HTMLDivElement>(null);
  const [flyTarget, setFlyTarget] = useState({ x: 0, y: 0 });
  const [isFlying, setIsFlying] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const luxuryEase = [0.23, 1, 0.32, 1] as any;
  const springConfig = { stiffness: 150, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const floatY = useMotionValue(0);
  const floatRotateX = useMotionValue(0);
  const floatRotateY = useMotionValue(0);

  const effectiveImage = getEffectiveImage(player.slug, player.primaryImage);

  useAnimationFrame((t) => {
    const slowT = t / 1500;
    floatY.set(Math.sin(slowT) * 12);
    floatRotateX.set(Math.sin(t / 2000) * 8);
    floatRotateY.set(Math.cos(t / 1800) * 8);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadyFavorited = isFavorite(player.slug);
    
    if (!alreadyFavorited) {
      const navItem = document.getElementById('nav-hall-of-fame');
      const cardEl = cardRef.current;
      
      if (navItem && cardEl) {
        const navRect = navItem.getBoundingClientRect();
        const cardRect = cardEl.getBoundingClientRect();
        
        setFlyTarget({
          x: navRect.left - cardRect.left + (navRect.width / 2),
          y: navRect.top - cardRect.top + (navRect.height / 2)
        });
        setIsFlying(true);
        setTimeout(() => setIsFlying(false), 800);
      }
    }
    toggleFavorite(player.slug);
  };

  const isLarge = index === 0 || index === 3;
  const faved = isFavorite(player.slug);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: luxuryEase }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/player/${player.slug}`)}
      className={`relative group rounded-[3.5rem] overflow-hidden specular-border p-12 flex flex-col justify-between cursor-pointer perspective-2000 transition-all duration-700 hover:shadow-[0_0_80px_rgba(59,130,246,0.1)]
        ${isLarge ? 'md:col-span-2' : 'col-span-1'} min-h-[550px]`}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ x: flyTarget.x, y: flyTarget.y - 100, scale: 0.05, opacity: 0 }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="absolute z-[100] w-32 h-32 rounded-full overflow-hidden border-2 border-white/50 shadow-2xl bg-black"
            style={{ top: '40%', left: '40%' }}
          >
            <img src={effectiveImage} className="w-full h-full object-cover" alt="" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-400/10 transition-colors duration-1000" />

      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-3">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] block">
            {player.role}
          </span>
          <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-400 transition-colors duration-700">
            {player.name.split(' ')[0]}<br/>
            <span className="text-white/40 group-hover:text-white transition-colors duration-700">{player.name.split(' ')[1]}</span>
          </h3>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleFavorite}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
              faved ? 'bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-white/10 bg-white/5 hover:border-red-500/50'
            }`}
          >
            <svg className={`w-5 h-5 ${faved ? 'text-white fill-current' : 'text-gray-400 group-hover:text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>
        </div>
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex-1 flex items-center justify-center py-6"
      >
        <motion.div 
          style={{ y: floatY, rotateX: floatRotateX, rotateY: floatRotateY, transformStyle: 'preserve-3d', translateZ: 100 }}
          className="relative w-56 h-56 md:w-64 md:h-64"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-400/20 transition-all duration-1000 scale-125" />
          <div className="w-full h-full rounded-full overflow-hidden specular-border relative z-10 p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.9)] group-hover:border-blue-500/50 transition-all duration-700">
            <img src={effectiveImage} alt={player.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s] ease-expensive" />
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex justify-between items-end">
        <div className="flex space-x-12">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5">Matches</p>
            <p className="text-xl font-black text-white italic">{player.stats.matches}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1.5">Experience</p>
            <p className="text-xl font-black text-white italic">{player.stats.debut.split(' ')[0]}</p>
          </div>
        </div>
        <motion.div 
          whileHover={{ scale: 1.15, rotate: 90 }}
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center glass-card group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-2xl"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-600 via-white to-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-[1.5s] ease-expensive" />
    </motion.div>
  );
};

export default PlayerCard;
