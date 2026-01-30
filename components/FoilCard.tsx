
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Player } from '../types';
import { TeamMember, useDreamTeam } from '../context/DreamTeamContext';

interface FoilCardProps {
  player: Player;
  member: TeamMember;
  onClick: () => void;
}

const FoilCard: React.FC<FoilCardProps> = ({ player, member, onClick }) => {
  const { getEffectiveImage } = useDreamTeam();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 100, damping: 20 });
  
  const foilOpacity = useSpring(useTransform(mouseX, [0, 0.5, 1], [0.1, 0.4, 0.1]));
  const gradientPos = useTransform(mouseX, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const effectiveImage = getEffectiveImage(player.slug, player.primaryImage);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative w-full aspect-[2/3] rounded-[2rem] overflow-hidden cursor-pointer group transition-shadow duration-500 ${
        member.isCaptain ? 'shadow-[0_0_40px_rgba(255,215,0,0.3)] ring-2 ring-yellow-500/50' : 'shadow-2xl ring-1 ring-white/10'
      }`}
    >
      {/* Golden Aura for Captain */}
      {member.isCaptain && (
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 to-transparent animate-pulse pointer-events-none z-10" />
      )}

      {/* Foil Layer */}
      <motion.div 
        style={{ 
          opacity: foilOpacity,
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 50%, transparent 54%)`,
          backgroundPosition: gradientPos,
          backgroundSize: '200% 200%'
        }}
        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
      />

      <img src={effectiveImage} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={player.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

      <div className="absolute inset-x-6 bottom-6 z-30">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] block mb-1">
              {member.position}
            </span>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">
              {player.name}
            </h3>
            {member.notes && (
              <p className="text-[9px] text-gray-400 mt-2 italic line-clamp-1">"{member.notes}"</p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1">
            {member.isCaptain && <span className="bg-yellow-500 text-black text-[8px] font-black px-2 py-0.5 rounded italic">C</span>}
            {member.isViceCaptain && <span className="bg-gray-400 text-black text-[8px] font-black px-2 py-0.5 rounded italic">VC</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoilCard;
