import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onOpenBookTour }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Clean URL hash to prevent ugly #philosophy in address bar
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Villa Properties', targetId: 'villas' },
    { label: 'Philosophy', targetId: 'philosophy' },
    { label: 'Contact Us', targetId: 'contact' },
  ];

  return (
    <>
      {/* Top Bar - Absolute so it does not stick on scroll */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-white text-2xl tracking-tight font-medium drop-shadow-md hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            Le Cercle
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBookTour}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white/80" />
              <span>Book a Tour</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className="w-11 h-11 rounded-xl bg-[#121212]/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-1.5 text-white hover:bg-[#121212] transition-colors shadow-lg cursor-pointer group"
            >
              <span className="w-5 h-[2px] bg-white rounded-full transition-transform group-hover:scale-x-110"></span>
              <span className="w-5 h-[2px] bg-white rounded-full transition-transform group-hover:scale-x-110"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#121212] text-white flex flex-col justify-between p-8 md:p-16 overflow-y-auto font-sans"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
              <span className="text-2xl font-medium tracking-tight">Le Cercle</span>
              <button
                onClick={toggleMenu}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Overlay Navigation Links */}
            <div className="max-w-7xl mx-auto w-full my-auto py-12">
              <nav className="flex flex-col space-y-6 md:space-y-8">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.label}
                    onClick={(e) => handleNavClick(e, link.targetId)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (idx + 1), duration: 0.4 }}
                    className="group text-4xl md:text-6xl font-light tracking-tight text-white hover:text-[#EFECE6] transition-colors flex items-center justify-between border-b border-white/10 pb-6 cursor-pointer text-left w-full"
                  >
                    <span className="group-hover:translate-x-3 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Overlay Footer Info */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-sm text-white/50 border-t border-white/10 pt-6">
              <div>
                <p className="text-white font-medium mb-1">Costa del Sol Office</p>
                <p>Golden Mile, Marbella, Spain</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Direct Enquiries</p>
                <p>concierge@lecercle-realestate.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
