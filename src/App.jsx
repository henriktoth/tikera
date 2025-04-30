import { useState } from 'react';
import Navbar from './components/Navbar.jsx'
import ActiveDayBadge from './components/ActiveDayBadge.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetailsCard from './components/MovieDetailsCard.jsx'


function App() {
  const [activeDay, setActiveDay] = useState();
  const [activeMovie, setActiveMovie] = useState();

  return (
    <>
      <Navbar activeDay = {activeDay} setActiveDay = {setActiveDay} />
      {activeDay ? 
        <ActiveDayBadge activeDay={activeDay}/>
      : null}
      <div className='flex gap-3'>
        <MovieList activeDay={activeDay} setActiveMovie={setActiveMovie} activeMovie={activeMovie}/>
        {activeMovie ?
          <MovieDetailsCard activeMovie={activeMovie} activeDay={activeDay}/>
        : null}
      </div>

    </>
    
    
  )
}

export default App
