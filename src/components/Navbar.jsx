import React, { useState, useEffect } from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', page: 0 },
    { name: 'About', page: 1 },
    { name: 'Skills', page: 2 },
    { name: 'Projects', page: 3 },
    { name: 'Contact', page: 4 },
  ];

  const handleScrollTo = (pageIndex, linkName) => {
    setIsOpen(false);
    
    if (linkName === 'About') {
      setCurrentView('about');
      window.scrollTo(0, 0);
      return;
    }

    // If currently on About page and trying to go to a home section
    if (currentView === 'about') {
      setCurrentView('home');
      // Give MoonScene time to mount before scrolling
      setTimeout(() => {
        const scrollEl = document.querySelector('div[style*="overflow"]');
        if (scrollEl) {
          const targetY = (pageIndex / 5) * scrollEl.scrollHeight;
          scrollEl.scrollTo({ top: targetY, behavior: 'instant' });
        }
      }, 100);
      return;
    }

    // Normal scrolling if already on Home
    const scrollEl = document.querySelector('div[style*="overflow"]');
    if (scrollEl) {
      const targetY = (pageIndex / 5) * scrollEl.scrollHeight;
      scrollEl.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
      <nav className="w-full max-w-4xl glass-strong px-5 py-3 rounded-full flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* LOGO */}
        <button 
          onClick={() => handleScrollTo(0, 'Home')} 
          className="font-display font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-1 group cursor-pointer border-none bg-transparent"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform duration-300"></span>
          <span className="gradient-text">IQBAL</span>
          <span className="text-white/40 font-light">.</span>
        </button>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleScrollTo(link.page, link.name)}
                className={`font-body text-xs lg:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 border-none bg-transparent cursor-pointer ${currentView === 'about' && link.name === 'About' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON DESKTOP */}
        <div className="hidden md:block">
          <button
            onClick={() => handleScrollTo(4, 'Contact')}
            className="cta-btn !py-2 !px-5 !text-xs font-semibold"
          >
            Hire Me ✨
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 border-none bg-transparent cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            ) : (
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            )}
          </svg>
        </button>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 glass-strong rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.page, link.name)}
              className={`font-body text-base font-medium text-left py-2 px-3 rounded-lg transition-colors border-none bg-transparent cursor-pointer ${currentView === 'about' && link.name === 'About' ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleScrollTo(4, 'Contact')}
            className="cta-btn w-full justify-center mt-2 !py-3 !text-sm"
          >
            Hire Me ✨
          </button>
        </div>
      )}
    </header>
  );
}
