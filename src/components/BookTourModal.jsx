import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookTourModal({ isOpen, onClose, defaultVilla = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(defaultVilla || 'Villa Serena');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#171614] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-medium text-white">Tour Request Confirmed</h3>
              <p className="text-sm text-white/70">
                Thank you, {name}. Our private concierge will confirm your tour of <span className="text-white font-semibold">{selectedProperty}</span> shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium block mb-1">Exclusive Experience</span>
                <h3 className="text-3xl font-medium tracking-tight">Book a Private Tour</h3>
                <p className="text-sm text-white/70 mt-1">Select your preferred date and property for an exclusive walkthrough.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1 font-medium">Select Villa</label>
                  <div className="relative">
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl glass-input text-white text-sm focus:ring-2 focus:ring-white/30 bg-[#22201D]"
                    >
                      <option value="Villa Serena">Villa Serena — Beachfront (€6,850,000)</option>
                      <option value="Casa del Sol">Casa del Sol — Beachfront (€5,400,000)</option>
                      <option value="Villa Andalucia">Villa Andalucia — Estate (€7,200,000)</option>
                      <option value="The Meridian">The Meridian — Penthouse (€4,950,000)</option>
                      <option value="Villa Blanca">Villa Blanca — Estate (€8,100,000)</option>
                      <option value="Casa Dorada">Casa Dorada — Beachfront (€5,900,000)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1 font-medium">Preferred Tour Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-white text-sm focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-white placeholder-white/40 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1 font-medium">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alexander@vance-holdings.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-white placeholder-white/40 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#EFECE6] hover:bg-white text-[#1C1C1A] text-sm font-semibold transition-all shadow-xl cursor-pointer mt-4"
                >
                  Confirm Tour Booking
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
