import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ScrollControls, Scroll, useScroll, Preload } from '@react-three/drei';
import AboutPage from './AboutPage';
import SkillsPage from './SkillsPage';
import ProjectsPage from './ProjectsPage';
import CertificatesPage from './CertificatesPage';
import ContactPage from './ContactPage';
import { CardStack } from './ui/card-stack';
import { BrainCircuit } from 'lucide-react'; // Import for AI icon

const photoCards = [
  {
    id: 1,
    title: "Hi, I'm Iqbal",
    description: "Creative developer crafting immersive web experiences.",
    imageSrc: "/img/me/Pas Foto - Iqbal Fahrozia.jpg",
  },
  {
    id: 2,
    title: "My Workspace",
    description: "Code, coffee, and 3D graphics. Where the magic happens.",
    imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Always Learning",
    description: "Exploring new tech to push the boundaries of the web.",
    imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  }
];

/* ================================================================
   MANUAL STARS — 3000 partikel bintang dengan animasi scroll
   ================================================================ */
function ManualStars({ count = 3000, distanceRatio = 1 }) {
  const pointsRef = useRef();

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 200 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 0.5 + Math.random() * 2.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const offset = (scroll && typeof scroll.offset === 'number' && !isNaN(scroll.offset)) ? scroll.offset : 0;
    const pagesRatio = (scroll && scroll.pages) ? scroll.pages / 6 : 1;

    pointsRef.current.rotation.y += delta * 0.005;
    pointsRef.current.rotation.x = offset * pagesRatio * distanceRatio * Math.PI * 0.15;
    pointsRef.current.rotation.z = offset * pagesRatio * distanceRatio * Math.PI * 0.05;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}

/* ================================================================
   NEBULA SKYBOX — Bola langit dengan tekstur dari GLB
   ================================================================ */
function NebulaSkybox({ distanceRatio = 1 }) {
  const { scene: originalScene } = useGLTF('/img/3d/nebula_skybox_16k.glb');
  const scroll = useScroll();
  const meshRef = useRef();

  const { geometry, material } = useMemo(() => {
    let foundTexture = null;
    originalScene.traverse((child) => {
      if (child.isMesh && child.material && !foundTexture) {
        foundTexture = child.material.map || child.material.emissiveMap;
      }
    });

    const geo = new THREE.SphereGeometry(500, 64, 32);
    geo.scale(-1, 1, 1);

    const mat = new THREE.MeshBasicMaterial({
      map: foundTexture,
      side: THREE.FrontSide,
      depthWrite: false,
      color: new THREE.Color(0x888888),
    });

    return { geometry: geo, material: mat };
  }, [originalScene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const offset = (scroll && typeof scroll.offset === 'number' && !isNaN(scroll.offset)) ? scroll.offset : 0;
    const pagesRatio = (scroll && scroll.pages) ? scroll.pages / 6 : 1;

    meshRef.current.rotation.y += delta * 0.003;
    meshRef.current.rotation.x = offset * pagesRatio * distanceRatio * Math.PI * 0.15;
    meshRef.current.rotation.z = offset * pagesRatio * distanceRatio * Math.PI * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={-1}
    />
  );
}

/* ================================================================
   PLANET SYSTEM — Bumi sebagai pusat & Bulan yang mengorbit
   ================================================================ */
function PlanetSystem({ isAbout }) {
  const { scene: earthScene } = useGLTF('/img/3d/earth.glb');
  const { scene: moonScene } = useGLTF('/img/3d/moon.glb');
  const scroll = useScroll();
  const systemRef = useRef();
  const orbitRef = useRef();
  const earthRef = useRef();
  const moonRef = useRef();
  const earthRotRef = useRef(0);
  const moonRotRef = useRef(0);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;

  // Keyframes Desktop
  const desktopKeyframes = [
    // Section 1 (Hero): Moon only, in right center (Slow rotation)
    { x: 3.5, y: 0, z: 0, scale: 0.020, rotX: 0, rotZ: 0, earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 2 (About): Moon moves to top center
    { x: 0, y: 3.0, z: 1, scale: 0.034, rotX: Math.PI, rotZ: 0, earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 3 (Skills): Earth appears, Moon orbits
    { x: -2.8, y: 0, z: 1.0, scale: 0.015, rotX: 0, rotZ: Math.PI * 0.1, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 4 (Projects): Earth + Moon
    { x: 0, y: 0, z: 2.5, scale: 0.025, rotX: Math.PI * 0.15, rotZ: 0, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 5 (Certificates): Earth + Moon, slightly left
    { x: -1.5, y: 0, z: 1.5, scale: 0.020, rotX: Math.PI * 0.1, rotZ: -Math.PI * 0.1, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.25 },
    // Section 6 (Contact): Bumi tidak muter ke bawah
    { x: 0, y: -3.0, z: 1, scale: 0.034, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.2, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
  ];

  // Keyframes Mobile
  const mobileKeyframes = [
    // Section 1 (Hero)
    { x: 0.9, y: 0, z: 0, scale: 0.010, rotX: 0, rotZ: 0, earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 2 (About): Moves to top center
    { x: 0, y: 2.8, z: 0.5, scale: 0.022, rotX: Math.PI, rotZ: 0, earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 3 (Skills)
    { x: -1.4, y: 0, z: 0.8, scale: 0.018, rotX: 0, rotZ: Math.PI * 0.1, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 4 (Projects)
    { x: 0, y: 0, z: 1.5, scale: 0.016, rotX: Math.PI * 0.15, rotZ: 0, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 5 (Certificates)
    { x: -0.8, y: 0, z: 1.0, scale: 0.014, rotX: Math.PI * 0.1, rotZ: -Math.PI * 0.1, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.25 },
    // Section 6 (Contact)
    { x: 0, y: -3.0, z: 0.5, scale: 0.024, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.2, earthScale: 1.0, moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
  ];

  const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  useFrame((state, delta) => {
    if (!systemRef.current || !orbitRef.current || !earthRef.current || !moonRef.current) return;

    const offset = (scroll && typeof scroll.offset === 'number' && !isNaN(scroll.offset)) ? scroll.offset : 0;

    const totalSections = 6;
    const sectionFloat = Math.max(0, Math.min(offset * (totalSections - 1), totalSections - 1));
    const sectionIndex = Math.min(Math.floor(sectionFloat), totalSections - 2);
    const rawT = sectionFloat - sectionIndex;

    let t = 0;
    if (rawT <= 0.2) {
      t = 0;
    } else if (rawT >= 0.8) {
      t = 1;
    } else {
      const p = (rawT - 0.2) / 0.6;
      t = p * p * (3 - 2 * p);
    }

    const from = keyframes[sectionIndex] || keyframes[0];
    const to = keyframes[sectionIndex + 1] || keyframes[1];

    // Master System position, scale, rotation
    systemRef.current.position.x = lerp(from.x, to.x, t);
    systemRef.current.position.y = lerp(from.y, to.y, t);
    systemRef.current.position.z = lerp(from.z, to.z, t);

    const s = lerp(from.scale, to.scale, t);
    systemRef.current.scale.set(s, s, s);

    systemRef.current.rotation.x = lerp(from.rotX, to.rotX, t);
    systemRef.current.rotation.z = lerp(from.rotZ, to.rotZ, t);

    // Dynamic Earth & Moon scales with custom Anti-Clipping curves for About -> Skills transition
    let eS = lerp(from.earthScale, to.earthScale, t);
    let mS = lerp(from.moonScale, to.moonScale, t);

    if (sectionIndex === 1) {
      // 1. Tunda kemunculan Bumi sampai Bulan sudah agak menjauh (mulai dari t = 0.3)
      const earthP = Math.max(0, (t - 0.3) / 0.7);
      eS = lerp(from.earthScale, to.earthScale, earthP);

      // 2. Percepat penyusutan Bulan di paruh pertama transisi (sampai t = 0.5)
      const moonP = Math.min(1, t / 0.5);
      mS = lerp(from.moonScale, to.moonScale, moonP);
    }

    earthRef.current.scale.set(eS, eS, eS);
    moonRef.current.scale.set(mS, mS, mS);

    // Dynamic Moon Orbit Position
    moonRef.current.position.x = lerp(from.moonPos[0], to.moonPos[0], t);
    moonRef.current.position.y = lerp(from.moonPos[1], to.moonPos[1], t);
    moonRef.current.position.z = lerp(from.moonPos[2], to.moonPos[2], t);

    // Continuous Rotations
    earthRotRef.current += delta * 0.05;
    earthRef.current.rotation.y = earthRotRef.current; // Rotasi hanya pada Bumi

    const currentOrbitSpeed = lerp(from.orbitSpeed, to.orbitSpeed, t);
    moonRotRef.current += delta * currentOrbitSpeed;
    orbitRef.current.rotation.y = moonRotRef.current;
  });

  return (
    <group ref={systemRef} scale={isMobile ? 0.010 : 0.020} position={isMobile ? [0.9, 0, 0] : [3.5, 0, 0]} visible={!isAbout}>
      {/* Bumi */}
      <group ref={earthRef}>
        <primitive object={earthScene} scale={1} />
      </group>

      {/* Orbit Bulan */}
      <group ref={orbitRef}>
        <group ref={moonRef}>
          <primitive object={moonScene} scale={1} />
        </group>
      </group>
    </group>
  );
}

/* ================================================================
   MAIN SCENE — Menggabungkan semua elemen 3D + HTML Overlay
   ================================================================ */
export default function MoonScene({ currentView }) {
  const isOverlay = currentView !== 'home';
  const [pages, setPages] = React.useState(6);
  const htmlContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (currentView === 'home') {
      setPages(6);
      return;
    }

    if (!htmlContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      const vh = window.innerHeight;
      const newPages = Math.max(1, height / vh);
      setPages(newPages);
    });

    observer.observe(htmlContainerRef.current);
    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#050505] overflow-hidden -z-10">
      {/* Optimization: Cap DPR for performance, use high-performance GL context */}
      <Canvas
        dpr={[1, 1.2]}
        gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: true }}
        camera={{ position: [0, 0, 8], fov: 45, far: 5000 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#4f8aff" />

        {/* Suspense delays rendering until all GLB models are loaded */}
        <React.Suspense fallback={null}>
          <ScrollControls
            pages={pages}
            damping={currentView === 'home' ? 0.25 : 0.1}
            distance={currentView === 'home' ? 1 : 0.5}
            enabled={true}
          >
            <NebulaSkybox distanceRatio={currentView === 'home' ? 1 : 0.5} />
            <ManualStars count={1200} distanceRatio={currentView === 'home' ? 1 : 0.5} />
            <PlanetSystem isAbout={isOverlay} />

            <Scroll html style={{ width: '100%', pointerEvents: 'auto' }}>
              <div ref={htmlContainerRef}>
                {currentView === 'home' && (
                  <>
                    {/* ===== SECTION 1 — HERO ===== */}
                    <section className="h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 select-none pointer-events-none">
                      <div className="max-w-2xl">
                        <p className="font-body text-xs md:text-base tracking-[0.3em] uppercase text-white/50 mb-3 md:mb-4">
                          Welcome to my universe
                        </p>
                        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4 md:mb-6">
                          <span className="gradient-text">Iqbal</span>
                          <br />
                          <span className="text-white">Fahrozi</span>
                        </h1>
                        <p className="font-body text-sm sm:text-lg md:text-xl text-white/60 max-w-md leading-relaxed mb-6 md:mb-8">
                          Creative Developer crafting immersive digital experiences through code and design.
                        </p>
                        <div className="flex items-center gap-3 text-white/30 text-xs md:text-sm font-body">
                          <div className="w-8 h-[1px] bg-white/30"></div>
                          <span>scroll to explore</span>
                          <span className="animate-bounce">↓</span>
                        </div>
                      </div>
                    </section>

                    {/* ===== SECTION 2 — ABOUT SUMMARY ===== */}
                    <section className="h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 lg:px-32 select-none pointer-events-none gap-4 md:gap-8 pt-20 md:pt-0">
                      {/* Left: Text (OLED / High Performance Style) */}
                      <div className="w-full max-w-lg bg-[#050508] border-l-4 border-indigo-500 p-6 md:p-8 rounded-r-2xl shadow-none pointer-events-auto">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 bg-indigo-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                          <p className="font-body text-xs tracking-[0.3em] uppercase text-indigo-400">
                            01 — About
                          </p>
                        </div>
                        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                          Who am I?
                        </h2>
                        <p className="font-body text-sm md:text-lg text-white/70 leading-relaxed">
                          I'm a passionate developer based in Indonesia, focused on building accessible and interactive digital experiences.
                          My goal is to create products that are not only beautiful but also perform flawlessly under the hood.
                        </p>
                      </div>

                      {/* Right: Photo Frame / Card Stack */}
                      <div className="flex w-full md:w-72 lg:w-96 items-center justify-center md:-mt-10 md:mr-10 relative z-10 scale-90 md:scale-100 origin-top">
                        <CardStack 
                          items={photoCards} 
                          autoAdvance 
                          intervalMs={3000} 
                          showDots={true} 
                          cardWidth={260}
                          cardHeight={300}
                        />
                      </div>
                    </section>

                    {/* ===== SECTION 3 — SKILLS ===== */}
                    <section className="h-screen flex flex-col justify-center items-end px-6 md:px-20 lg:px-32 select-none pointer-events-none pt-20 md:pt-0">
                      {/* Right: Text (OLED / High Performance Style) */}
                      <div className="w-full max-w-lg bg-[#050508] border-r-4 border-emerald-500 p-6 md:p-8 rounded-l-2xl shadow-none pointer-events-auto">
                        <div className="flex items-center justify-end gap-3 mb-4">
                          <p className="font-body text-xs tracking-[0.3em] uppercase text-emerald-400 text-right">
                            02 — Skills
                          </p>
                          <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                        </div>
                        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 text-right">
                          Tech Stack
                        </h2>
                        <p className="font-body text-sm md:text-lg text-white/70 leading-relaxed mb-6 text-right">
                          I specialize in modern web and mobile technologies. My focus is on creating immersive 3D experiences, scalable applications, and AI integrations.
                        </p>
                        
                        {/* Tech Stack Logos */}
                        <div className="flex flex-wrap justify-end gap-3 md:gap-4">
                          {/* Flutter */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter" className="w-5 h-5" />
                            <span className="text-white/80 text-sm font-body">Flutter</span>
                          </div>
                          
                          {/* React */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
                            <span className="text-white/80 text-sm font-body">React</span>
                          </div>
                          
                          {/* JavaScript */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5 h-5 rounded-sm" />
                            <span className="text-white/80 text-sm font-body">JavaScript</span>
                          </div>
                          
                          {/* Laravel */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-5 h-5" />
                            <span className="text-white/80 text-sm font-body">Laravel</span>
                          </div>
                          
                          {/* AI */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
                            <BrainCircuit className="w-5 h-5 text-emerald-400" />
                            <span className="text-white/80 text-sm font-body">AI</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* ===== SECTION 4 — PROJECTS SUMMARY ===== */}
                    <section className="h-screen flex flex-col justify-center items-center px-8 md:px-20 lg:px-32 select-none">
                      <div className="max-w-2xl w-full text-center glass-strong p-6 md:p-8">
                        <div className="section-line mx-auto"></div>
                        <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3 pointer-events-none">
                          03 — Projects
                        </p>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 pointer-events-none">
                          Selected Work
                        </h2>
                        <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed pointer-events-none">
                          A collection of my recent projects ranging from creative coding to full-stack applications.
                          I build solutions that are as functional as they are beautiful.
                        </p>
                      </div>
                    </section>

                    {/* ===== SECTION 5 — CERTIFICATES SUMMARY ===== */}
                    <section className="h-screen flex flex-col justify-center items-end px-8 md:px-20 lg:px-32 select-none">
                      <div className="max-w-md text-right glass-strong p-6 md:p-8">
                        <div className="section-line ml-auto"></div>
                        <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3 pointer-events-none">
                          04 — Certificates
                        </p>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 pointer-events-none">
                          Credentials
                        </h2>
                        <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed pointer-events-none">
                          Professional achievements and certifications that validate my expertise and commitment to continuous learning.
                        </p>
                      </div>
                    </section>

                    {/* ===== SECTION 6 — CONTACT SUMMARY ===== */}
                    <section className="h-screen flex flex-col justify-center px-8 md:px-20 lg:px-32 select-none">
                      <div className="max-w-lg glass-strong p-6 md:p-8">
                        <div className="section-line"></div>
                        <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3 pointer-events-none">
                          05 — Contact
                        </p>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 pointer-events-none">
                          Let's Connect
                        </h2>
                        <p className="font-body text-base md:text-lg text-white/60 leading-relaxed mb-6 pointer-events-none">
                          I'm always open to discussing product design work or partnership opportunities.
                          Let's create something amazing together.
                        </p>
                      </div>
                    </section>
                  </>
                )}
                {currentView === 'about' && <AboutPage />}
                {currentView === 'skills' && <SkillsPage />}
                {currentView === 'projects' && <ProjectsPage />}
                {currentView === 'certificates' && <CertificatesPage />}
                {currentView === 'contact' && <ContactPage />}
              </div>
            </Scroll>
          </ScrollControls>
        </React.Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

// Preload
useGLTF.preload('/img/3d/earth.glb');
useGLTF.preload('/img/3d/moon.glb');
useGLTF.preload('/img/3d/nebula_skybox_16k.glb');
