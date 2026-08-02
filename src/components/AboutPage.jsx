import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-auto">
      
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-stretch">
        
        {/* Photo Card Template */}
        <div className="w-full md:w-1/3 max-w-[300px] md:max-w-none aspect-[3/4] glass-strong p-3 rounded-[32px] relative overflow-hidden group transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
          {/* Image Placeholder (Nanti ganti div ini dengan tag img) */}
          <div className="absolute inset-3 bg-gradient-to-br from-white/10 to-white/5 rounded-[20px] border border-white/10 flex items-center justify-center overflow-hidden">
            <span className="text-white/30 font-body text-xs tracking-[0.2em] uppercase text-center px-4">Insert Photo Here</span>
          </div>
          
          {/* Card Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 glass p-4 rounded-2xl border border-white/20 transition-all duration-500 group-hover:translate-y-[-4px] group-hover:bg-white/10">
            <h3 className="font-display text-xl font-bold text-white mb-1">Iqbal Fahrozi</h3>
            <p className="font-body text-xs text-white/60 tracking-wider">Creative Developer</p>
          </div>
        </div>

        {/* Introduction Text */}
        <div className="w-full md:w-2/3 glass-strong p-8 md:p-10 rounded-[32px] flex flex-col justify-center">
          <div className="section-line"></div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
            Get To Know Me
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Hi, I'm <span className="gradient-text">Iqbal</span>.
          </h1>
          <p className="font-body text-sm md:text-base text-white/70 leading-relaxed mb-4">
            I'm a passionate developer who loves creating beautiful and interactive web experiences. 
            I believe in the power of design and technology working together to build something extraordinary.
          </p>
          <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
            Based in Indonesia, my journey in tech started with a curiosity for how things work on the internet. 
            Today, I focus on building accessible, inclusive products and digital experiences that leave a lasting impression.
          </p>
        </div>
      </div>

      {/* Details Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Education & Experience */}
        <div className="glass-strong p-8 rounded-[32px]">
          <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Experience & Education
          </h3>
          <div className="flex flex-col gap-6">
            
            {/* Item 1 */}
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[6.5px] top-1"></div>
              <p className="text-xs text-white/40 mb-1 font-body tracking-wider">2021 — Present</p>
              <h4 className="text-white font-bold text-base mb-1">University Name</h4>
              <p className="text-sm text-white/60 font-body">Major in Computer Science. Focus on Web Technologies and UI/UX Design.</p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-6 border-l border-white/10">
              <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6.5px] top-1"></div>
              <p className="text-xs text-white/40 mb-1 font-body tracking-wider">2022 — 2023</p>
              <h4 className="text-white font-bold text-base mb-1">Freelance Developer</h4>
              <p className="text-sm text-white/60 font-body">Worked on various web projects for local clients, creating modern landing pages.</p>
            </div>

          </div>
        </div>

        {/* Hobbies & Interests */}
        <div className="glass-strong p-8 rounded-[32px]">
          <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Beyond Coding
          </h3>
          <p className="font-body text-sm text-white/70 leading-relaxed mb-6">
            When I'm not looking at a computer screen, you can find me exploring other creative outlets and enjoying life.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="skill-chip border border-purple-500/30">Photography 📸</span>
            <span className="skill-chip border border-blue-500/30">Gaming 🎮</span>
            <span className="skill-chip border border-pink-500/30">Music 🎵</span>
            <span className="skill-chip border border-green-500/30">Traveling ✈️</span>
          </div>
        </div>

      </div>

    </div>
  );
}
