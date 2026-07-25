import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Cinematic Luxury Villa 3D Diorama Scenes
const SCENE_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2560&q=90', // Ocean Cliff Villa
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=90', // Rainforest Canopy
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2560&q=90', // Alpine Glass Chateau
  'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=2560&q=90', // Desert Dune Oasis
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2560&q=90', // Sky Penthouse
];

export default function ScrollWorld() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Preload scene images
    const loadedImages = [];
    SCENE_IMAGES.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      loadedImages[idx] = img;
    });
    imagesRef.current = loadedImages;

    // Floating 3D dust particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.4 + 0.1
    }));

    // Render Canvas Frame Scrubbing
    const renderFrame = (progress) => {
      if (!ctx || !canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const totalScenes = SCENE_IMAGES.length;
      const rawIndex = progress * (totalScenes - 1);
      const sceneIndex = Math.min(totalScenes - 1, Math.floor(rawIndex));
      const localProg = rawIndex - sceneIndex; // 0 to 1 transition progress

      const currentImg = imagesRef.current[sceneIndex];
      const nextImg = imagesRef.current[Math.min(totalScenes - 1, sceneIndex + 1)];

      // 3D Camera Dive transform math (zoom in & fly forward into scene interior)
      const zoom = 1.02 + localProg * 0.28;
      const rot = (localProg - 0.5) * 0.015;

      // Draw Current Scene with Camera Dive
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rot);
      ctx.scale(zoom, zoom);

      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        ctx.globalAlpha = 1 - localProg * 0.65;
        const imgAspect = currentImg.naturalWidth / currentImg.naturalHeight;
        const canvasAspect = width / height;
        let drawW, drawH;
        if (canvasAspect > imgAspect) {
          drawW = width;
          drawH = width / imgAspect;
        } else {
          drawH = height;
          drawW = height * imgAspect;
        }
        ctx.drawImage(currentImg, -drawW / 2, -drawH / 2, drawW, drawH);
      }

      // Draw Next Scene Cross-Fade during flight transition
      if (nextImg && nextImg.complete && nextImg.naturalWidth > 0 && localProg > 0) {
        ctx.globalAlpha = localProg * 0.85;
        const imgAspect = nextImg.naturalWidth / nextImg.naturalHeight;
        const canvasAspect = width / height;
        let drawW, drawH;
        if (canvasAspect > imgAspect) {
          drawW = width;
          drawH = width / imgAspect;
        } else {
          drawH = height;
          drawW = height * imgAspect;
        }
        ctx.drawImage(nextImg, -drawW / 2, -drawH / 2, drawW, drawH);
      }

      ctx.restore();

      // Atmospheric Radial Vignette & Lighting
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.25,
        width / 2,
        height / 2,
        width * 0.75
      );
      gradient.addColorStop(0, 'rgba(10, 10, 12, 0.1)');
      gradient.addColorStop(1, 'rgba(10, 10, 12, 0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Particle Layer
      ctx.save();
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.globalAlpha = p.alpha * 0.35;
        ctx.fill();
      });
      ctx.restore();
    };

    // Setup GSAP ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 0.8, // Liquid smooth camera flight scrub
      onUpdate: (self) => {
        renderFrame(self.progress);
      }
    });

    // Initial draw
    renderFrame(0);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* 100% Clean Full-Screen 3D Camera Flight Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
    </div>
  );
}
