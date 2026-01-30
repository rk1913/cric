
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, useAnimationFrame } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Player } from '../types';

interface Carousel3DProps {
  items: Player[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ items }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { 
    stiffness: 45, 
    damping: 22, 
    mass: 1 
  });
  
  // High-density packing radius
  const radius = 280; 
  const angleStep = 360 / items.length;

  // Track cursor position relative to center (-1 to 1)
  const cursorTargetVelocity = useRef(0);
  const currentVelocity = useRef(-0.12); // Base auto-rotation speed

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const offset = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
    
    // Sensitivity of cursor speed control
    // Farther from center = faster rotation
    cursorTargetVelocity.current = offset * 2.5; 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cursorTargetVelocity.current = 0;
  };

  useAnimationFrame(() => {
    if (!isDragging) {
      // Smoothly interpolate current velocity towards target (auto-speed if not hovered, cursor-speed if hovered)
      const target = isHovered ? cursorTargetVelocity.current : -0.12;
      currentVelocity.current += (target - currentVelocity.current) * 0.05;
      
      const nextRotation = rotation.get() + currentVelocity.current;
      rotation.set(nextRotation);
    }

    const currentRot = rotation.get();
    const normalizedRot = ((-currentRot % 360) + 360) % 360;
    const closestIdx = Math.round(normalizedRot / angleStep) % items.length;
    
    if (closestIdx !== activeIdx) {
      setActiveIdx(closestIdx);
    }
  });

  const handleDragStart = () => setIsDragging(true);
  
  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    const currentRot = rotation.get();
    const momentum = info.velocity.x * 0.05;
    const targetRot = Math.round((currentRot + momentum) / angleStep) * angleStep;
    
    animate(rotation, targetRot, {
      type: "spring",
      stiffness: 70,
      damping: 25
    });
  };

  const handleDrag = (_: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.12);
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[450px] w-full flex items-center justify-center perspective-2000 select-none overflow-visible my-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        drag="x"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ rotateY: smoothRotation }}
        className="relative w-full h-full flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing"
      >
        {items.map((player, i) => (
          <Player3DCard 
            key={`${player.slug}-${i}`}
            player={player}
            angle={i * angleStep}
            radius={radius}
            isActive={activeIdx === i}
            onClick={() => navigate(`/player/${player.slug}`)}
          />
        ))}
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10 rounded-full" />
    </div>
  );
};

interface Player3DCardProps {
  player: Player;
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
}

const Player3DCard: React.FC<Player3DCardProps> = ({ player, angle, radius, isActive, onClick }) => {
  return (
    <motion.div
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
      className="absolute w-44 h-[280px] preserve-3d"
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.1 : 0.75,
          opacity: isActive ? 0.95 : 0.5,
          filter: isActive ? 'grayscale(100%) brightness(0.9)' : 'grayscale(100%) brightness(0.4) blur(1px)'
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        className="w-full h-full rounded-xl overflow-hidden glass-card shadow-2xl border border-white/10 group cursor-pointer relative"
      >
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-black/40" />
        
        <img 
          src={player.primaryImage} 
          className={`w-full h-full object-cover transition-all duration-700 grayscale
            ${isActive ? 'scale-105' : 'scale-100'} 
            group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100`} 
          alt={player.name} 
        />
        
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent z-10 pointer-events-none" />
        
        <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-40">
          <motion.div
            animate={{ y: isActive ? 0 : 15, opacity: isActive ? 1 : 0 }}
          >
            <p className="text-[7px] font-black text-blue-500 uppercase tracking-[0.4em] mb-0.5">{player.role}</p>
            <h3 className="text-sm font-black text-white uppercase italic tracking-tighter leading-none">
              {player.name}
            </h3>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          opacity: isActive ? 0.25 : 0,
          scale: isActive ? 1 : 0.3
        }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-3 bg-blue-500/10 blur-lg rounded-full pointer-events-none"
      />
    </motion.div>
  );
};

export default Carousel3D;
