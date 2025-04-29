import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx'
import MovieCard from './components/MovieCard.jsx'

function App() {
  const [activeDay, setActiveDay] = useState();
  return (
    <>
      <Navbar activeDay = {activeDay} setActiveDay = {setActiveDay} />
      {activeDay ? 
      <div className="m-5 px-5 py-3 w-40 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800">
            <h2 className="text-center font-bold uppercase  tracking-wide">{activeDay}</h2>
      </div>
      : null}
      <MovieCard image="dune.jpg" name="Dune: Part Two" genre="Sci-Fi" runtime="113 perc"/>
    </>
    
    
  )
}

export default App
