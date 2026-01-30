
import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <motion.div
      whileHover={{ y: -8, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-10 rounded-[2rem] border border-white/5 text-center group"
    >
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 group-hover:text-blue-500 transition-colors">
        {label}
      </p>
      <p className="text-4xl font-black text-white tracking-tighter italic">
        {value}
      </p>
    </motion.div>
  );
};

export default StatCard;
