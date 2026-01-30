
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { players } from '../data/players';
import StatCard from '../components/StatCard';
import { useDreamTeam } from '../context/DreamTeamContext';

const PlayerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getEffectiveImage } = useDreamTeam();
  const player = players.find((p) => p.slug === slug);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!player) return null;

  const effectiveImage = getEffectiveImage(player.slug, player.primaryImage);

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

  const ease = [0.22, 1, 0.36, 1] as any;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 pb-40 bg-[#030303]"
    >
      {/* Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="mt-12 mb-20 flex items-center space-x-4 text-gray-500 hover:text-white transition-colors group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest">The Archive</span>
      </motion.button>

      {/* Hero */}
      <div className="grid lg:grid-cols-12 gap-16 items-start mb-40">
        <div className="lg:col-span-7 pt-12 overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          >
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 block">
              Legend Profile // 00{players.indexOf(player) + 1}
            </span>
            <h1 className="text-8xl md:text-[10rem] font-black text-white leading-[0.8] mb-12 tracking-tighter uppercase italic">
              {player.name}
            </h1>
            <p className="text-2xl text-gray-500 font-light italic mb-12 border-l-2 border-blue-500 pl-8">
              "{player.stats.style}"
            </p>
            <div className="flex flex-wrap gap-4">
              {player.stats.teams.map((team) => (
                <span key={team} className="px-5 py-2 glass-card rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {team}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="lg:col-span-5 relative aspect-[4/5] rounded-[3rem] overflow-hidden glass-card"
        >
          <img
            src={effectiveImage}
            alt={player.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* Metrics Bento Grid */}
      <section className="mb-40 overflow-hidden">
        <motion.div 
          initial={springReveal.initial}
          whileInView={springReveal.whileInView}
          viewport={springReveal.viewport}
          transition={springReveal.transition}
        >
          <div className="flex items-center space-x-4 mb-16">
            <div className="h-px flex-1 bg-white/5" />
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">Signature Data</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard label="Total Matches" value={player.stats.matches} />
            <StatCard label="Debut Year" value={player.stats.debut.split('vs')[0]} />
            {player.stats.runs && <StatCard label="Career Runs" value={player.stats.runs.toLocaleString()} />}
            {player.stats.wickets && <StatCard label="Career Wickets" value={player.stats.wickets} />}
            <StatCard label="Peak Performance" value={player.stats.bestPerformance} />
          </div>
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-4xl mx-auto mb-40 text-center overflow-hidden">
        <motion.div 
          initial={springReveal.initial}
          whileInView={springReveal.whileInView}
          viewport={springReveal.viewport}
          transition={springReveal.transition}
        >
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-16">The Narrative</h2>
          <div className="space-y-12 text-xl text-gray-400 font-light leading-relaxed">
            {player.shortInspiringStory.map((para, idx) => (
              <p key={idx} className="relative px-12">
                {idx === 0 && <span className="absolute -left-4 top-0 text-6xl text-blue-500 opacity-20 font-serif">“</span>}
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="mb-40 overflow-hidden">
        <motion.div 
          initial={springReveal.initial}
          whileInView={springReveal.whileInView}
          viewport={springReveal.viewport}
          transition={springReveal.transition}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {player.galleryImages.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-[2rem]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" as const, stiffness: 100, damping: 20 }}
                className="aspect-square glass-card group cursor-pointer"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                  alt="Gallery"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default PlayerDetail;
