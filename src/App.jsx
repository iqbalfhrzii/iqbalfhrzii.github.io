import React from 'react'
import { Loader } from '@react-three/drei'
import MoonScene from './components/MoonScene'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <MoonScene />
      <Loader 
        containerStyles={{ background: '#050505' }} // Match the dark background
        innerStyles={{ width: '300px', backgroundColor: 'rgba(255,255,255,0.1)' }} // Glassy bar
        barStyles={{ backgroundColor: '#ffffff' }}
        dataInterpolation={(p) => `Loading Universe... ${p.toFixed(0)}%`}
      />
    </>
  )
}

export default App
