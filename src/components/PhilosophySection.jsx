import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const tagRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);

  // Framer Motion for background image scale
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.05, 1.12]);

  // GSAP ScrollTrigger for Text Color Reveal (Charcoal Gray -> Deep Solid Black)
  useEffect(() => {
    if (!textGroupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textGroupRef.current,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 0.6,
      }
    });

    // Smoothly transition font colors from crisp charcoal gray to deep solid black
    tl.fromTo(
      tagRef.current,
      { color: '#8C887B' },
      { color: '#121212', ease: 'none' },
      0
    )
    .fromTo(
      heading1Ref.current,
      { color: '#737064' },
      { color: '#121212', ease: 'none' },
      0
    )
    .fromTo(
      heading2Ref.current,
      { color: '#737064' },
      { color: '#121212', ease: 'none' },
      0.15
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="w-full bg-[#F4F2EC] py-24 px-6 md:px-12 text-[#1C1C1A] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Quote Header with GSAP Text Color Reveal */}
        <div ref={textGroupRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <p
            ref={tagRef}
            className="text-xs font-semibold uppercase tracking-widest text-[#8C887B] mb-4 transition-colors duration-200"
          >
            The Le Cercle Standard
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
            <span ref={heading1Ref} className="text-[#737064] block font-light">
              For those who travel
            </span>
            <span ref={heading2Ref} className="text-[#737064] block font-light">
              like it's an art form.
            </span>
          </h2>
        </div>

        {/* Feature Villa Showcase Card with Scroll-Driven Zoom-In */}
        <motion.div
          style={{ scale: imageScale }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl group border border-[#E2DFD6]"
        >
          <img
            src="/assets/philosophy_villa.png"
            alt="Minimalist luxury concrete villa architecture"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Bottom Card Glass Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 p-6 md:p-8 rounded-2xl bg-[#121212]/80 backdrop-blur-xl border border-white/10 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/60 block mb-1 font-semibold">Architectural Digest Highlight</span>
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">The Horizon Pavilion — Golden Mile</h3>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/80">
              <div>
                <span className="block font-semibold text-white">620 m²</span>
                <span className="text-xs text-white/60">Living Space</span>
              </div>
              <div className="w-[1px] h-8 bg-white/20" />
              <div>
                <span className="block font-semibold text-white">Panoramas</span>
                <span className="text-xs text-white/60">360° Sea View</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
