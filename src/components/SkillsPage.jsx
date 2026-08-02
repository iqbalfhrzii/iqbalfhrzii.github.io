import React from 'react';

export default function SkillsPage() {
  const skillsCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      color: "border-indigo-500/30",
      skills: ["React", "Vue.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"]
    },
    {
      title: "3D & Creative Coding",
      icon: "✨",
      color: "border-purple-500/30",
      skills: ["Three.js", "React Three Fiber", "WebGL", "Framer Motion", "GSAP"]
    },
    {
      title: "Tools & Backend",
      icon: "🛠️",
      color: "border-blue-500/30",
      skills: ["Node.js", "Git & GitHub", "Vite", "Webpack", "REST APIs", "Firebase"]
    },
    {
      title: "Design",
      icon: "🎨",
      color: "border-pink-500/30",
      skills: ["Figma", "UI/UX Prototyping", "Wireframing", "Responsive Design", "Design Systems"]
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-auto">
      
      {/* Header Section */}
      <div className="w-full glass-strong p-8 md:p-12 rounded-[32px] text-center max-w-4xl mx-auto">
        <div className="section-line mx-auto mb-6"></div>
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 mb-4">
          My Expertise
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="gradient-text">Skills</span> & Technologies
        </h1>
        <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          I've spent years honing my craft, working with various technologies to build 
          fast, accessible, and visually stunning digital experiences. Here is my current tech stack.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {skillsCategories.map((category, index) => (
          <div 
            key={category.title} 
            className="glass-strong p-8 rounded-[32px] transition-transform duration-500 hover:-translate-y-2 hover:bg-white/5 group"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className={`skill-chip border transition-all duration-300 group-hover:border-white/40 ${category.color}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
