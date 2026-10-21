import React from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Globe } from 'lucide-react';

const webrings = [
  {
    name: "(Mu)sang King Ring",
    url: "https://musangking.fzhnf.my.id/ring",
    previous: "https://musangking.fzhnf.my.id/ring/$HOST/previous",
    next: "https://musangking.fzhnf.my.id/ring/$HOST/next",
    random: "https://musangking.fzhnf.my.id/ring/random"
  },
];

const resolveRingUrl = (urlPattern) => {
  if (!urlPattern) return '';
  if (!urlPattern.includes('$HOST')) return urlPattern;

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  // Fall back to registered ring member domain 'iqbaal.id' for localhost or unregistered dev environments
  const host = (currentHost && !['localhost', '127.0.0.1', ''].includes(currentHost))
    ? currentHost
    : 'iqbaal.id';

  return urlPattern.replace('$HOST', host);
};

export default function Footer({ rings = webrings, className = '' }) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (urlTemplate, e) => {
    const targetUrl = resolveRingUrl(urlTemplate);
    if (!targetUrl) return;

    if (e?.ctrlKey || e?.metaKey) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className={`w-full pointer-events-auto select-none ${className}`}>
      <div className="w-full glass-strong border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Webrings Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto justify-center md:justify-start">
            {rings.map((ring) => (
              <div 
                key={ring.name} 
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 bg-white/[0.03] border border-white/10 px-3.5 py-2 rounded-2xl hover:border-white/20 transition-all duration-300"
              >
                {/* Anchor with Name and URL */}
                <a
                  href={ring.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs sm:text-sm font-semibold text-white/90 hover:text-indigo-400 transition-colors flex items-center gap-2 px-1 group"
                  title={`Visit ${ring.name}`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:scale-125 transition-transform" />
                  <Globe className="w-3.5 h-3.5 text-white/50 group-hover:text-indigo-400 transition-colors" />
                  <span>{ring.name}</span>
                </a>

                {/* Divider on larger pills */}
                <span className="hidden sm:inline-block w-[1px] h-4 bg-white/10" />

                {/* Three buttons for previous, random, next in order */}
                <div className="flex items-center gap-1.5">
                  {/* 1. Previous Button */}
                  <button
                    type="button"
                    onClick={(e) => handleNavigate(ring.previous, e)}
                    data-href={resolveRingUrl(ring.previous)}
                    data-url={resolveRingUrl(ring.previous)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-body font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    title="Previous site in webring"
                    aria-label="Previous site"
                  >
                    <ChevronLeft className="w-3 h-3 text-white/70" />
                    <span>Previous</span>
                  </button>

                  {/* 2. Random Button */}
                  <button
                    type="button"
                    onClick={(e) => handleNavigate(ring.random, e)}
                    data-href={resolveRingUrl(ring.random)}
                    data-url={resolveRingUrl(ring.random)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-body font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    title="Random site in webring"
                    aria-label="Random site"
                  >
                    <Shuffle className="w-3 h-3 text-white/70" />
                    <span>Random</span>
                  </button>

                  {/* 3. Next Button */}
                  <button
                    type="button"
                    onClick={(e) => handleNavigate(ring.next, e)}
                    data-href={resolveRingUrl(ring.next)}
                    data-url={resolveRingUrl(ring.next)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-body font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    title="Next site in webring"
                    aria-label="Next site"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3 text-white/70" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Copyright / Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-right font-body text-xs text-white/40">
            <span>© {currentYear} Iqbal Fahrozi.</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with React &amp; Three.js</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
