import React from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export default function VillaHotspotModal({ hotspot, onClose, onBookTour }) {
  if (!hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-xl max-h-[88vh] flex flex-col overflow-hidden rounded-3xl bg-[#141412] text-[#F4F2EC] border border-white/15 shadow-2xl transform transition-all duration-300 scale-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent Header */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Close hotspot detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image / Visual Cover */}
        {hotspot.image && (
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src={hotspot.image}
              alt={hotspot.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-[#141412]/40 to-transparent" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/15 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              {hotspot.category || 'Feature Highlight'}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 relative">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#C5A880] mb-2">
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span>{hotspot.locationName || 'Architectural Landmark'}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-sans font-light text-white mb-3">
            {hotspot.title}
          </h3>

          <p className="text-sm md:text-base text-stone-300 leading-relaxed font-sans mb-6">
            {hotspot.description}
          </p>

          {/* Feature Badges */}
          {hotspot.tags && hotspot.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {hotspot.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-stone-300 flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-stone-400 flex items-center gap-1.5">
              <span>Included in Sanctuary Blueprint</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-sm font-medium text-stone-300 hover:text-white transition-colors"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onBookTour) onBookTour(hotspot.villaName || hotspot.title);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#EFECE6] hover:bg-white text-[#1C1C1A] font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Reserve Private Tour</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
