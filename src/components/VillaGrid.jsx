import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VillaModal from './VillaModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VILLAS_DATA = [
  {
    id: 'villa-serena',
    name: 'Villa Serena',
    category: 'Beachfront',
    location: 'Golden Mile, Marbella',
    description: 'A sunlit 5-bedroom retreat featuring a cantilevered infinity pool, private funicular down to pristine beach caves, and 360° ocean horizon views.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    price: '€6,850,000',
    specs: { beds: '5', baths: '6', area: '750 m²' },
    features: ['Cantilevered Ocean Pool', 'Private Glass Funicular', 'Sub-Ocean Wine Cellar', '360° Sea Panorama', 'Biometric Security Guard', 'Turnkey Designer Furnished']
  },
  {
    id: 'casa-del-sol',
    name: 'Casa del Sol',
    category: 'Beachfront',
    location: 'Puerto Banús Beachfront, Marbella',
    description: 'Contemporary beachfront living with floor-to-ceiling glass walls, private rooftop sunset lounge, heated saltwater lagoon, and direct beach access.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    price: '€5,400,000',
    specs: { beds: '4', baths: '5', area: '620 m²' },
    features: ['Direct Private Beach Access', 'Rooftop Sunset Lounge', 'Heated Saltwater Pool', 'Smart Climate Automation', 'Outdoor Cinema Deck', 'Private Wellness Spa Suite']
  },
  {
    id: 'villa-andalucia',
    name: 'Villa Andalucia',
    category: 'Villas',
    location: 'La Zagaleta Country Club, Marbella',
    description: 'Traditional Andalusian architecture meets modern luxury — featuring a private olive grove, central courtyard fountain, heated pool, and equestrian stables.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    price: '€7,200,000',
    specs: { beds: '6', baths: '7', area: '890 m²' },
    features: ['Private Organic Olive Grove', 'Central Courtyard Fountain', 'Heated Outdoor Pool', 'Private Equestrian Stables', 'Wine Cellar & Tasting Room', 'Helipad Access']
  },
  {
    id: 'the-meridian',
    name: 'The Meridian',
    category: 'Penthouses',
    location: 'Nueva Andalucía, Marbella',
    description: 'Sleek 4-bedroom penthouse villa with smart home automation, glass skybridge, private infinity jacuzzi, and sweeping Mediterranean coastal views.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    price: '€4,950,000',
    specs: { beds: '4', baths: '4', area: '480 m²' },
    features: ['Glass Architectural Skybridge', 'Private Infinity Jacuzzi', 'KNX Smart Home Automation', 'Subzero Kitchen Suite', '24/7 Concierge Guard', 'Private Automotive Lift']
  },
  {
    id: 'villa-blanca',
    name: 'Villa Blanca',
    category: 'Villas',
    location: 'Sierra Blanca, Marbella',
    description: 'Minimalist white-washed estate featuring a private IMAX cinema, subterranean wellness spa, glass sauna, and landscaped Mediterranean gardens.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    price: '€8,100,000',
    specs: { beds: '5', baths: '6', area: '810 m²' },
    features: ['Private IMAX Cinema Room', 'Subterranean Spa Suite', 'Cedarwood Glass Sauna', 'Landscaped Botanical Garden', 'Subterranean Garage (6 Cars)', 'Solar Glass Efficiency']
  },
  {
    id: 'casa-dorada',
    name: 'Casa Dorada',
    category: 'Beachfront',
    location: 'Los Monteros Estate, Marbella',
    description: 'Golden-hour perfection with west-facing sunset terraces, subterranean sunken fire pit, 1,000-bottle wine cellar, and an open-plan chef\'s kitchen.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    price: '€5,900,000',
    specs: { beds: '4', baths: '5', area: '550 m²' },
    features: ['Sunken Flame Courtyard', '1,000-Bottle Wine Cellar', 'West-Facing Sunset Deck', 'Gaggenau Chef Kitchen', 'Hydro-Massage Lagoon', '24/7 Gated Security Guard']
  }
];

export default function VillaGrid({ onOpenBookTour }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedVilla, setSelectedVilla] = useState(null);

  const textGroupRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  const categories = ['All', 'Beachfront', 'Villas', 'Penthouses'];

  const filteredVillas = activeTab === 'All'
    ? VILLAS_DATA
    : VILLAS_DATA.filter((v) => v.category === activeTab);

  // GSAP ScrollTrigger for Text Color Reveal
  useEffect(() => {
    if (!textGroupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textGroupRef.current,
        start: 'top 80%',
        end: 'top 25%',
        scrub: 0.6,
      }
    });

    tl.fromTo(
      tagRef.current,
      { color: '#737064' },
      { color: '#121212', ease: 'none' },
      0
    )
    .fromTo(
      headingRef.current,
      { color: '#57544A' },
      { color: '#121212', ease: 'none' },
      0
    )
    .fromTo(
      subtitleRef.current,
      { color: '#737064' },
      { color: '#57544A', ease: 'none' },
      0.15
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="villas" className="w-full bg-[#F4F2EC] py-20 px-6 md:px-12 text-[#1C1C1A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with GSAP Text Color Reveal */}
        <div ref={textGroupRef} className="text-center max-w-3xl mx-auto mb-12">
          <span
            ref={tagRef}
            className="inline-block px-4 py-1.5 rounded-full bg-[#E6E3DB] text-xs font-semibold uppercase tracking-wider text-[#737064] mb-4 transition-colors duration-200"
          >
            Properties
          </span>
          
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#57544A] mb-4 font-sans"
          >
            Our Villas
          </h2>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-[#737064] font-light leading-relaxed font-sans"
          >
            Handpicked residences in Marbella's most coveted locations, each designed for effortless Mediterranean living.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-14 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-white/60 hover:bg-white text-[#57544A] border border-[#E2DFD6]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2-Column Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {filteredVillas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
              onClick={() => setSelectedVilla(villa)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Card Image Container with Parallax Zoom-In Effect */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#E2DFD6] shadow-md border border-[#E2DFD6] group">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-lg">
                    {villa.category}
                  </span>
                </div>

                {/* Hover Quick Enter Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-md text-[#1C1C1A] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-2xl group-hover:scale-105 transition-transform">
                    <span>Enter Villa Details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-[#8C887B] transition-colors font-sans">
                    {villa.name}
                  </h3>
                  <span className="text-base font-semibold text-[#121212]">
                    {villa.price}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#57544A] font-light leading-relaxed mb-4 font-sans">
                  {villa.description}
                </p>

                {/* Card Specs Footer */}
                <div className="mt-auto flex items-center gap-6 pt-4 border-t border-[#E2DFD6] text-xs text-[#737064]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Bed className="w-4 h-4 text-[#1C1C1A]" /> {villa.specs.beds} Bedrooms
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Bath className="w-4 h-4 text-[#1C1C1A]" /> {villa.specs.baths} Bathrooms
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Maximize2 className="w-4 h-4 text-[#1C1C1A]" /> {villa.specs.area}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Property Detail Modal */}
      {selectedVilla && (
        <VillaModal
          villa={selectedVilla}
          onClose={() => setSelectedVilla(null)}
          onOpenBookTour={onOpenBookTour}
        />
      )}
    </section>
  );
}
