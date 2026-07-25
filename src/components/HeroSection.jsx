import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  // GSAP ScrollTrigger for Parallax & Fade
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const video = videoRef.current;
    // Autoplay video normally instead of scrubbing (fixes Safari/Firefox lag)
    video.play().catch(e => console.log('Autoplay prevented:', e));

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      onUpdate: (self) => {
        const prog = self.progress;

        // Apply smooth parallax (move video down slightly as user scrolls)
        if (video) {
          gsap.to(video, {
            y: prog * 150,
            opacity: 1 - (prog * 0.5),
            duration: 0.1,
            overwrite: 'auto'
          });
        }

        // Fade out text overlay
        if (textRef.current) {
          gsap.to(textRef.current, {
            opacity: Math.max(0, 1 - prog * 2),
            y: -prog * 100,
            duration: 0.1,
            overwrite: 'auto'
          });
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden text-white bg-black"
    >
      {/* Background Video Autoplaying with Parallax */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/Start With a Beautiful Design.mp4"
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-[120%] object-cover object-center filter contrast-[1.03] brightness-95 transform -translate-y-4"
        />
        {/* Soft Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* Clean Main Content Headline Area */}
      <div 
        ref={textRef}
        className="relative z-10 max-w-6xl mx-auto w-full h-full px-6 md:px-12 flex flex-col justify-center pointer-events-none"
      >
        <div className="flex flex-col items-start max-w-3xl">
          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] mb-6 drop-shadow-2xl font-sans"
          >
            Live Where the <br className="hidden sm:inline" />
            <span className="font-light text-[#F4F2EC]">Sun Meets the Sea</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-stone-200/90 max-w-xl font-light leading-relaxed tracking-normal font-sans"
          >
            Exclusive beachfront villas and luxury apartments on the Costa del Sol. Your Mediterranean dream, delivered turnkey.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
