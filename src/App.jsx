import React, { useState } from 'react'
import { Loader } from '@react-three/drei'
import { ReactLenis } from 'lenis/react'
import MoonScene from './components/MoonScene'
import Navbar from './components/Navbar'
import AboutPage from './components/AboutPage'
import SkillsPage from './components/SkillsPage'
import ProjectsPage from './components/ProjectsPage'
import ContactPage from './components/ContactPage'

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
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
