import React, { useState, useEffect } from 'react'
import { Loader } from '@react-three/drei'
import { ReactLenis, useLenis } from 'lenis/react'
import MoonScene from './components/MoonScene'
import Navbar from './components/Navbar'
import AboutPage from './components/AboutPage'
import SkillsPage from './components/SkillsPage'
import ProjectsPage from './components/ProjectsPage'
import ContactPage from './components/ContactPage'

function LenisManager({ currentView }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    // On Home page, let ScrollControls handle scrolling
    // On other pages, let Lenis handle window scrolling
    if (currentView === 'home') {
      lenis.stop();
    } else {
      lenis.start();
      // Ensure we are at the top when switching to a new overlay page
      window.scrollTo(0, 0);
    }
  }, [currentView, lenis]);
  return null;
}

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <LenisManager currentView={currentView} />
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <MoonScene currentView={currentView} />
      
      {currentView === 'home' && (
        <Loader 
          containerStyles={{ background: '#050505' }} // Match the dark background
          innerStyles={{ width: '300px', backgroundColor: 'rgba(255,255,255,0.1)' }} // Glassy bar
          barStyles={{ backgroundColor: '#ffffff' }}
          dataInterpolation={(p) => `Loading Universe... ${p.toFixed(0)}%`}
        />
      )}

      {currentView === 'about' && (
        <div className="relative z-40 pointer-events-auto">
          <AboutPage />
        </div>
      )}

      {currentView === 'skills' && (
        <div className="relative z-40 pointer-events-auto">
          <SkillsPage />
        </div>
      )}

      {currentView === 'projects' && (
        <div className="relative z-40 pointer-events-auto">
          <ProjectsPage />
        </div>
      )}

      {currentView === 'contact' && (
        <div className="relative z-40 pointer-events-auto">
          <ContactPage />
        </div>
      )}
    </ReactLenis>
  )
}

export default App
