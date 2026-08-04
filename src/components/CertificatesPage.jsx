import React from 'react';

const certificates = [
  {
    id: 1,
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google',
    date: 'Jan 2026',
    image: 'https://via.placeholder.com/800x600/1e1e2f/ffffff?text=Google+Cloud+Cert',
    link: '#',
  },
  {
    id: 2,
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Dec 2025',
    image: 'https://via.placeholder.com/800x600/1e1e2f/ffffff?text=AWS+Cert',
    link: '#',
  },
  {
    id: 3,
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera / Meta',
    date: 'Oct 2025',
    image: 'https://via.placeholder.com/800x600/1e1e2f/ffffff?text=Meta+Cert',
    link: '#',
  },
  {
    id: 4,
    title: 'Full Stack Open',
    issuer: 'University of Helsinki',
    date: 'Aug 2025',
    image: 'https://via.placeholder.com/800x600/1e1e2f/ffffff?text=FullStack+Open',
    link: '#',
  }
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-auto">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="section-line mb-6"></div>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-indigo-400 mb-4">
          Credentials
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          My <span className="gradient-text">Certifications</span>
        </h1>
        <p className="font-body text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
          Professional achievements, courses, and certifications that validate my expertise and commitment to continuous learning.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="project-card group hover:-translate-y-2 transition-all duration-300">
            {/* Image Thumbnail */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-btn !py-2 !px-5 w-full justify-center text-sm"
                >
                  View Credential ↗
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex flex-col">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                {cert.title}
              </h3>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <p className="font-body text-sm font-medium text-white/80 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">🏢</span>
                  {cert.issuer}
                </p>
                <p className="font-body text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {cert.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
