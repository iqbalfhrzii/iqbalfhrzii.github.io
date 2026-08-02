import React, { useState } from 'react'
import { Loader } from '@react-three/drei'
import MoonScene from './components/MoonScene'
import Navbar from './components/Navbar'
import AboutPage from './components/AboutPage'
import SkillsPage from './components/SkillsPage'
import ProjectsPage from './components/ProjectsPage'
import ContactPage from './components/ContactPage'
import SmoothScrollOverlay from './components/SmoothScrollOverlay'

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <>
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
        <SmoothScrollOverlay>
          <AboutPage />
        </SmoothScrollOverlay>
      )}

      {currentView === 'skills' && (
        <SmoothScrollOverlay>
          <SkillsPage />
        </SmoothScrollOverlay>
      )}

      {currentView === 'projects' && (
        <SmoothScrollOverlay>
          <ProjectsPage />
        </SmoothScrollOverlay>
      )}

      {currentView === 'contact' && (
        <SmoothScrollOverlay>
          <ContactPage />
        </SmoothScrollOverlay>
      )}
    </>
  )
}

export default App
