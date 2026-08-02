import React from 'react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Interactive 3D Portfolio",
      category: "Web Development",
      description: "An immersive 3D portfolio experience built with React, Three.js, and Tailwind CSS. Features dynamic scrolling animations, interactive planets, and glassmorphism UI.",
      techStack: ["React", "Three.js", "Tailwind CSS", "Vite"],
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      category: "Frontend Application",
      description: "A modern, responsive dashboard for managing e-commerce data with real-time charts, dark mode support, and a beautiful component system.",
      techStack: ["Vue.js", "Chart.js", "Firebase", "SCSS"],
      link: "#",
      github: "#"
    },
    {
      id: 3,
      title: "Creative Agency Landing Page",
      category: "Web Design",
      description: "A visually striking landing page with complex GSAP animations, custom cursors, and WebGL elements to showcase a creative agency's portfolio.",
      techStack: ["JavaScript", "GSAP", "HTML5", "CSS3"],
      link: "#",
      github: "#"
    },
    {
      id: 4,
      title: "Mobile Task Manager",
      category: "UI/UX Design",
      description: "A complete UI/UX case study and prototype for a productivity app designed to help users manage their daily tasks with minimal friction.",
      techStack: ["Figma", "Prototyping", "Wireframing"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-auto">
      
      {/* Header Section */}
      <div className="w-full glass-strong p-8 md:p-12 rounded-[32px] text-center max-w-4xl mx-auto">
        <div className="section-line mx-auto mb-6"></div>
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 mb-4">
          Selected Works
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
          Featured <span className="gradient-text">Projects</span>
        </h1>
        <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          A showcase of my recent work, blending technical complexity with intuitive design. 
          Each project represents a unique challenge and a creative solution.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="glass-strong p-8 rounded-[32px] flex flex-col group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-video bg-white/5 rounded-2xl mb-6 relative overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 font-body text-xs tracking-widest uppercase">Project Preview</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="font-body text-xs text-indigo-400 mb-2 tracking-wider">{project.category}</p>
              <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs font-body px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/50">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="cta-btn !py-2 !px-4 !text-xs">
                  View Live ↗
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-sm font-body border-b border-transparent hover:border-white pb-0.5">
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
