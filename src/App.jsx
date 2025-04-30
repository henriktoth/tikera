import { useState } from 'react';
import Navbar from './components/Navbar.jsx'
import ActiveDayBadge from './components/ActiveDayBadge.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetailsCard from './components/MovieDetailsCard.jsx'


function App() {
  const [activeDay, setActiveDay] = useState();
  const [activeMovie, setActiveMovie] = useState();
  const [activeScreening, setActiveScreening] = useState({});

  return (
    <>
      <Navbar activeDay = {activeDay} setActiveDay = {setActiveDay} />
      <div className='flex lg:justify-start justify-center'> 
        {activeDay ? 
          <ActiveDayBadge activeDay={activeDay}/>
        : null}
      </div>
      <div className='flex lg:flex-row flex-col gap-3'>
        <MovieList activeDay={activeDay} setActiveMovie={setActiveMovie} activeMovie={activeMovie}/>
        {activeMovie ?
          <MovieDetailsCard activeMovie={activeMovie} activeDay={activeDay} setActiveScreening={setActiveScreening} />
        : null}
        <h1>{activeScreening.start_time}</h1>
      </div>

    </>
    
    
  )
}

export default App
