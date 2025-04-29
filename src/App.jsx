import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx'

function App() {
  const [activeDay, setActiveDay] = useState(null);
  return (
    <>
      <Navbar activeDay = {activeDay} setActiveDay = {setActiveDay} />
      <div className="m-5 px-5 py-3 w-40 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800">
        <h2 className="text-center font-bold uppercase tracking-wide">{activeDay}</h2>
      </div>
    </>
    
    
  )
}

export default App
