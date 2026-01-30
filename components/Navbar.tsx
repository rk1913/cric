
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hall of Fame', path: '/hall-of-fame' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link id="nav-logo" to="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-black tracking-tighter text-blue-500 group-hover:scale-105 transition-transform">CRIC</span>
            <span className="text-xl font-light tracking-widest text-white/90">LEGENDS</span>
          </Link>

          <div className="flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={link.path === '/hall-of-fame' ? 'nav-hall-of-fame' : undefined}
                to={link.path}
                className="relative py-2 group"
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-500 hover:text-white'
                }`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
