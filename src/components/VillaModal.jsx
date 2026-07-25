import React from 'react';
import { X, Bed, Bath, Maximize2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VillaModal({ villa, onClose, onOpenBookTour }) {
  if (!villa) return null;

  const features = villa.features || [
    'Heated Infinity Pool',
    'Smart Home Automation',
    'Floor-to-Ceiling Glass Walls',
    'Private Wine Cellar',
    '24/7 Gated Security Guard',
    'Turnkey Interior Package'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window: Widescreen Horizontal Split (No Scrollbar, Fits 100% Zoom) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-[#171614] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 text-white font-sans grid grid-cols-1 md:grid-cols-12 max-h-[88vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Full-Height Image Showcase (5 cols) */}
          <div className="md:col-span-5 relative h-56 md:h-full overflow-hidden bg-black/40">
            <img
              src={villa.image}
              alt={villa.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold uppercase tracking-wider mb-2 inline-block shadow-md">
                {villa.category}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white font-sans">{villa.name}</h3>
              <p className="flex items-center gap-1.5 text-xs text-stone-300 mt-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                {villa.location || 'Golden Mile, Marbella'}
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Info & Actions (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 overflow-hidden">
            {/* Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">Bedrooms</span>
                <span className="text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#C5A880]" /> {villa.specs.beds}
                </span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">Bathrooms</span>
                <span className="text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#C5A880]" /> {villa.specs.baths}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block mb-1 uppercase tracking-wider">Plot Size</span>
                <span className="text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-[#C5A880]" /> {villa.specs.area}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-1.5">About The Property</h4>
              <p className="text-white/80 font-light leading-relaxed text-xs sm:text-sm font-sans">
                {villa.description}
              </p>
            </div>

            {/* Key Features List */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-2.5">Key Architectural Features</h4>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-white/80">
                {features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-white/50 block uppercase tracking-wider">Guide Price</span>
                <span className="text-2xl sm:text-3xl font-medium text-white">{villa.price}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenBookTour(villa.name);
                }}
                className="px-7 py-3 rounded-full bg-[#EFECE6] hover:bg-white text-[#1C1C1A] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105"
              >
                <Calendar className="w-4 h-4 text-[#1C1C1A]" />
                <span>Schedule Private Tour</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
