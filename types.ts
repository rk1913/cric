
export interface PlayerStats {
  matches: number;
  debut: string;
  runs?: number;
  wickets?: number;
  bestPerformance: string;
  records: string[];
  teams: string[];
  style: string;
}

export interface Player {
  name: string;
  slug: string;
  role: 'Batter' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  primaryImage: string;
  galleryImages: string[];
  shortInspiringStory: string[];
  stats: PlayerStats;
}
