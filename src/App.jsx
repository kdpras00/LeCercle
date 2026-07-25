import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import VillaGrid from './components/VillaGrid';
import ContactSection from './components/ContactSection';
import BookTourModal from './components/BookTourModal';
import Footer from './components/Footer';

export default function App() {
  const [isBookTourOpen, setIsBookTourOpen] = useState(false);
  const [selectedVillaForTour, setSelectedVillaForTour] = useState('');

  // Auto clean any residual URL hash tags on load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleOpenBookTour = (villaName = '') => {
    setSelectedVillaForTour(villaName);
    setIsBookTourOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F4F2EC] font-sans antialiased selection:bg-[#C5A880] selection:text-black">
      {/* Top Floating Glassmorphism Header */}
      <Header onOpenBookTour={() => handleOpenBookTour()} />

      {/* Main Content Flow */}
      <main>
        {/* Fullscreen Hero Section with GSAP Video Scroll Scrubbing */}
        <HeroSection onOpenBookTour={() => handleOpenBookTour()} />

        {/* Philosophy / Quote Section */}
        <div className="bg-[#F4F2EC] text-[#1C1C1A]">
          <PhilosophySection />
        </div>

        {/* Property Grid Section */}
        <div className="bg-[#F4F2EC] text-[#1C1C1A]">
          <VillaGrid onOpenBookTour={(villaName) => handleOpenBookTour(villaName)} />
        </div>

        {/* Contact Section */}
        <div className="bg-[#1C1C1A] text-[#F4F2EC]">
          <ContactSection onOpenBookTour={() => handleOpenBookTour()} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Book Tour Modal */}
      <BookTourModal
        isOpen={isBookTourOpen}
        onClose={() => setIsBookTourOpen(false)}
        defaultVilla={selectedVillaForTour}
      />
    </div>
  );
}
