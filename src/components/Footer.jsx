import React from 'react';

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#F4F2EC] text-[#1C1C1A] pt-20 pb-12 px-6 md:px-12 border-t border-[#E2DFD6] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Brand & Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Info (2 cols on desktop) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-3xl font-medium tracking-tight">Le Cercle</h3>
            <p className="text-sm text-[#57544A] font-light max-w-sm leading-relaxed">
              Curating Spain's most extraordinary coastal residences. A legacy real estate firm based in Marbella, Costa del Sol.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8C887B] font-semibold mb-4">Properties</h4>
            <ul className="space-y-2.5 text-sm text-[#57544A] font-light">
              <li><button onClick={(e) => handleScrollTo(e, 'villas')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Beachfront Villas</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'villas')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Sea-View Penthouses</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'villas')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Turnkey Estates</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'villas')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">New Developments</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8C887B] font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-[#57544A] font-light">
              <li><button onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Private Search</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Architectural Concierge</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Legal Advisory</button></li>
              <li><button onClick={(e) => handleScrollTo(e, 'contact')} className="hover:text-[#1C1C1A] transition-colors cursor-pointer text-left">Asset Management</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8C887B] font-semibold mb-4">Locations</h4>
            <ul className="space-y-2.5 text-sm text-[#57544A] font-light">
              <li><span className="hover:text-[#1C1C1A] transition-colors cursor-default">Golden Mile</span></li>
              <li><span className="hover:text-[#1C1C1A] transition-colors cursor-default">Puerto Banús</span></li>
              <li><span className="hover:text-[#1C1C1A] transition-colors cursor-default">La Zagaleta</span></li>
              <li><span className="hover:text-[#1C1C1A] transition-colors cursor-default">Sierra Blanca</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E2DFD6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C887B]">
          <p>© {new Date().getFullYear()} Le Cercle Real Estate. All rights reserved.</p>
          <p className="font-medium text-[#57544A]">Marbella • Costa del Sol • Spain</p>
        </div>
      </div>
    </footer>
  );
}
