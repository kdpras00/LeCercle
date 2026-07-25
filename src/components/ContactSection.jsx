import React, { useState, useEffect, useRef } from 'react';
import { Mail, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection({ onOpenBookTour }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 30%',
        scrub: 0.6,
      }
    });

    tl.fromTo(
      heading1Ref.current,
      { color: '#78716C' },
      { color: '#FFFFFF', ease: 'none' },
      0
    )
    .fromTo(
      heading2Ref.current,
      { color: '#78716C' },
      { color: '#FFFFFF', ease: 'none' },
      0.1
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full min-h-[90vh] py-20 px-6 md:px-12 flex items-center bg-[#161412] text-white overflow-hidden">
      {/* Office Background Scene */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/assets/contact_office.png"
          alt="Le Cercle luxury advisory office"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/95 via-[#121212]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Floating Glassmorphism Form Card (6 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 p-8 sm:p-10 rounded-3xl glass-panel-dark border border-white/15 shadow-2xl backdrop-blur-2xl"
        >
          <h2 ref={heading1Ref} className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-[#78716C] transition-colors duration-200">
            Get In Touch
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center my-8">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white mb-1">Message Received</h3>
              <p className="text-sm text-emerald-200/80">Our private real estate concierges will get in touch with you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1.5 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-white placeholder-white/40 text-sm focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider block mb-1.5 font-medium">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-white placeholder-white/40 text-sm focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 uppercase tracking-wider block mb-1.5 font-medium">Your Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your dream property..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl glass-input text-white placeholder-white/40 text-sm focus:ring-2 focus:ring-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#EFECE6] hover:bg-white text-[#1C1C1A] text-sm font-semibold transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          )}

          {/* Bottom Card Helper Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
            <span>Prefer to talk? Book a private tour.</span>

            <button
              onClick={() => onOpenBookTour()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Us</span>
            </button>
          </div>
        </motion.div>

        {/* Right Info Section (6 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 space-y-8 pl-0 lg:pl-8 text-white/90"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">Private Advisory</span>
            <h3 ref={heading2Ref} className="text-3xl sm:text-4xl font-normal tracking-tight text-[#78716C] mb-4 transition-colors duration-200">
              Turnkey Advisory for Discriminating Investors
            </h3>
            <p className="text-white/70 font-light leading-relaxed text-base">
              Whether acquiring a trophy beachfront estate on Marbella's Golden Mile or developing a bespoke architectural sanctuary, Le Cercle provides confidential, end-to-end guidance.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Direct Line</h4>
                <p className="text-white/70">+34 952 800 900</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Private Concierge</h4>
                <p className="text-white/70">vip@lecercle-realestate.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
