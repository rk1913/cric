
import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { useDreamTeam } from '../context/DreamTeamContext';
import { players } from '../data/players';
import FoilCard from '../components/FoilCard';
import EditPlayerModal from '../components/EditPlayerModal';
import { Link } from 'react-router-dom';

const HallOfFame: React.FC = () => {
  const { team, reorderTeam } = useDreamTeam();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const teamData = team.map(m => ({
    member: m,
    player: players.find(p => p.slug === m.slug)!
  })).filter(item => item.player);

  const activeEditing = teamData.find(t => t.member.slug === editingSlug);

  const springReveal = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  };

  return (
    <div className="min-h-screen bg-[#030303] pt-32 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <motion.div {...springReveal}>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">The Inner Circle</span>
            <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
              HALL OF <span className="text-white/20">FAME</span>
            </h1>
            <p className="text-gray-500 font-light max-w-xl mx-auto text-sm leading-relaxed">
              Curate your legendary squad. Drag to reorder your top 11 and click any card to define their tactical role in your anthology.
            </p>
          </motion.div>
        </header>

        {teamData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-40 border border-white/5 rounded-[4rem] bg-white/[0.02]"
          >
            <div className="w-32 h-32 mb-8 relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                 <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </div>
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8 italic">Your Archive is currently empty</p>
            <Link to="/" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full text-[10px] hover:scale-105 transition-all shadow-xl">
              Explore Players
            </Link>
          </motion.div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={team} 
            onReorder={reorderTeam}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamData.map((item) => (
              <Reorder.Item 
                key={item.member.slug} 
                value={item.member}
                className="cursor-grab active:cursor-grabbing"
              >
                <FoilCard 
                  player={item.player} 
                  member={item.member} 
                  onClick={() => setEditingSlug(item.member.slug)}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      <AnimatePresence>
        {activeEditing && (
          <EditPlayerModal 
            player={activeEditing.player}
            member={activeEditing.member}
            onClose={() => setEditingSlug(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HallOfFame;
