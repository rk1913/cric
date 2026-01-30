
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import PlayerDetail from './pages/PlayerDetail';
import About from './pages/About';
import HallOfFame from './pages/HallOfFame';
import { DreamTeamProvider } from './context/DreamTeamContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/player/:slug" element={<PlayerDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <DreamTeamProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#050505] text-white">
          <CustomCursor />
          <Navbar />
          <main className="pt-16">
            <AnimatedRoutes />
          </main>
        </div>
      </HashRouter>
    </DreamTeamProvider>
  );
};

export default App;