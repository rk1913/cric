
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TeamMember {
  slug: string;
  position: string;
  isCaptain: boolean;
  isViceCaptain: boolean;
  notes: string;
  customPrimaryImage?: string; // New: Base64 string for user-uploaded photo
}

interface DreamTeamContextType {
  team: TeamMember[];
  toggleFavorite: (slug: string) => void;
  updateMember: (slug: string, updates: Partial<TeamMember>) => void;
  reorderTeam: (newTeam: TeamMember[]) => void;
  isFavorite: (slug: string) => boolean;
  getEffectiveImage: (slug: string, defaultImage: string) => string;
}

const DreamTeamContext = createContext<DreamTeamContextType | undefined>(undefined);

export const DreamTeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cric-dream-team');
    if (saved) setTeam(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cric-dream-team', JSON.stringify(team));
  }, [team]);

  const toggleFavorite = (slug: string) => {
    setTeam(prev => {
      const exists = prev.find(m => m.slug === slug);
      if (exists) return prev.filter(m => m.slug !== slug);
      return [...prev, { slug, position: 'Unassigned', isCaptain: false, isViceCaptain: false, notes: '' }];
    });
  };

  const updateMember = (slug: string, updates: Partial<TeamMember>) => {
    setTeam(prev => prev.map(m => m.slug === slug ? { ...m, ...updates } : m));
  };

  const reorderTeam = (newTeam: TeamMember[]) => setTeam(newTeam);

  const isFavorite = (slug: string) => team.some(m => m.slug === slug);

  const getEffectiveImage = (slug: string, defaultImage: string) => {
    const member = team.find(m => m.slug === slug);
    return member?.customPrimaryImage || defaultImage;
  };

  return (
    <DreamTeamContext.Provider value={{ team, toggleFavorite, updateMember, reorderTeam, isFavorite, getEffectiveImage }}>
      {children}
    </DreamTeamContext.Provider>
  );
};

export const useDreamTeam = () => {
  const context = useContext(DreamTeamContext);
  if (!context) throw new Error('useDreamTeam must be used within DreamTeamProvider');
  return context;
};
