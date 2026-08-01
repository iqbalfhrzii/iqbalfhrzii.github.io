import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ScrollControls, Scroll, useScroll, Preload } from '@react-three/drei';

/* ================================================================
   MANUAL STARS — 3000 partikel bintang dengan animasi scroll
   ================================================================ */
function ManualStars({ count = 3000 }) {
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
    pointsRef.current.rotation.y += delta * 0.005;
    pointsRef.current.rotation.x = offset * Math.PI * 0.15;
    pointsRef.current.rotation.z = offset * Math.PI * 0.05;
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
function NebulaSkybox() {
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
    meshRef.current.rotation.y += delta * 0.003;
    meshRef.current.rotation.x = offset * Math.PI * 0.15;
    meshRef.current.rotation.z = offset * Math.PI * 0.05;
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
function PlanetSystem() {
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
    { x: 3.5, y: 0,    z: 0,   scale: 0.020, rotX: 0,              rotZ: 0,             earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 2 (About): Moon moves to top center
    { x: 0,   y: 3.0,  z: 1,   scale: 0.034, rotX: Math.PI,        rotZ: 0,             earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 3 (Skills): Earth appears, Moon orbits
    { x: -2.8,y: 0,    z: 1.0, scale: 0.015, rotX: 0,              rotZ: Math.PI * 0.1, earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 4 (Projects): Earth + Moon
    { x: 0,   y: 0,    z: 2.5, scale: 0.025, rotX: Math.PI * 0.15, rotZ: 0,             earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 5 (Contact): Bumi tidak muter ke bawah
    { x: 0,   y: -3.0, z: 1,   scale: 0.034, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.2, earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
  ];

  // Keyframes Mobile
  const mobileKeyframes = [
    // Section 1 (Hero)
    { x: 0.9, y: 0,    z: 0,   scale: 0.010, rotX: 0,              rotZ: 0,             earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 2 (About): Moves to top center
    { x: 0,   y: 2.8,  z: 0.5, scale: 0.022, rotX: Math.PI,        rotZ: 0,             earthScale: 0.001, moonScale: 1.0, moonPos: [0, 0, 0], orbitSpeed: 0.05 },
    // Section 3 (Skills)
    { x: -1.4,y: 0,    z: 0.8, scale: 0.018, rotX: 0,              rotZ: Math.PI * 0.1, earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 4 (Projects)
    { x: 0,   y: 0,    z: 1.5, scale: 0.016, rotX: Math.PI * 0.15, rotZ: 0,             earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
    // Section 5 (Contact)
    { x: 0,   y: -3.0, z: 0.5, scale: 0.024, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.2, earthScale: 1.0,   moonScale: 0.4, moonPos: [180, 15, -60], orbitSpeed: 0.3 },
  ];

  const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  useFrame((state, delta) => {
    if (!systemRef.current || !orbitRef.current || !earthRef.current || !moonRef.current) return;

    const offset = (scroll && typeof scroll.offset === 'number' && !isNaN(scroll.offset)) ? scroll.offset : 0;

    const totalSections = 5;
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
    <group ref={systemRef} scale={isMobile ? 0.010 : 0.020} position={isMobile ? [0.9, 0, 0] : [3.5, 0, 0]}>
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
export default function MoonScene() {
  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden">
      {/* Optimization: Cap DPR for performance, use high-performance GL context */}
      <Canvas
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false }}
        camera={{ position: [0, 0, 8], fov: 45, far: 5000 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#4f8aff" />

        {/* Suspense delays rendering until all GLB models are loaded */}
        <React.Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.12}>
            <NebulaSkybox />
            {/* Bintang-bintang manual - dioptimalkan 1800 partikel agar lancar di HP */}
            <ManualStars count={1800} />
            <PlanetSystem />

            <Scroll html style={{ width: '100%' }}>

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

            {/* ===== SECTION 2 — ABOUT ===== */}
            <section className="h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 select-none pointer-events-none">
              <div className="max-w-lg glass-strong p-6 md:p-8">
                <div className="section-line"></div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-2 md:mb-3">
                  01 — About
                </p>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                  Who am I?
                </h2>
                <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed mb-3 md:mb-4">
                  I'm a passionate developer who loves creating beautiful and interactive web experiences.
                  I believe in the power of design and technology working together to build something extraordinary.
                </p>
                <p className="font-body text-sm md:text-lg text-white/60 leading-relaxed">
                  Based in Indonesia, I bring ideas to life through clean code and creative thinking.
                </p>
              </div>
            </section>

            {/* ===== SECTION 3 — SKILLS ===== */}
            <section className="h-screen flex flex-col justify-center items-end px-6 md:px-20 lg:px-32 select-none">
              <div className="max-w-md text-right glass-strong p-6 md:p-8">
                <div className="section-line ml-auto"></div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-2 md:mb-3 pointer-events-none">
                  02 — Skills
                </p>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 pointer-events-none">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3 pointer-events-auto justify-end">
                  {['React', 'Three.js', 'JavaScript', 'Tailwind CSS', 'HTML & CSS', 'Node.js', 'Git', 'Figma', 'Vite', 'Framer Motion'].map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== SECTION 4 — PROJECTS (tengah) ===== */}
            <section className="h-screen flex flex-col justify-center items-center px-8 md:px-20 lg:px-32 select-none">
              <div className="max-w-3xl w-full text-center">
                <div className="section-line mx-auto"></div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3 pointer-events-none">
                  03 — Projects
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8 pointer-events-none">
                  Selected Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
                  <div className="project-card">
                    <div className="text-2xl mb-3">🌐</div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">Portfolio Website</h3>
                    <p className="font-body text-sm text-white/50 leading-relaxed">
                      Immersive 3D portfolio with scroll animations, built with React & Three.js.
                    </p>
                  </div>
                  <div className="project-card">
                    <div className="text-2xl mb-3">🚀</div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">Coming Soon</h3>
                    <p className="font-body text-sm text-white/50 leading-relaxed">
                      More exciting projects are in the works. Stay tuned for updates!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===== SECTION 5 — CONTACT ===== */}
            <section className="h-screen flex flex-col justify-center px-8 md:px-20 lg:px-32 select-none">
              <div className="max-w-lg glass-strong p-6 md:p-8">
                <div className="section-line"></div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-white/40 mb-3 pointer-events-none">
                  04 — Contact
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 pointer-events-none">
                  Let's Connect
                </h2>
                <p className="font-body text-base md:text-lg text-white/50 leading-relaxed mb-8 pointer-events-none">
                  Have a project in mind or just want to say hello? Feel free to reach out.
                </p>
                <div className="flex gap-4 pointer-events-auto mb-8">
                  <a href="https://github.com/iqbalfhrzii" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
                <a href="mailto:hello@iqbalfahrozi.my.id" className="cta-btn pointer-events-auto">
                  Say Hello →
                </a>
              </div>
            </section>

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
