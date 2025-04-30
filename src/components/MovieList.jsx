import { useEffect, useState } from 'react'
import movieData from '../assets/movies.json'
import MovieCard from './MovieCard.jsx'

function MovieList(props){
    const [filteredMovies, setFilteredMovies] = useState([])
    
    useEffect(()=>{
        const filtered = movieData.filter(movie => 
            movie.screenings.some(screening => 
            screening.weekday === props.activeDay)
        )
        setFilteredMovies(filtered)
    }, [props.activeDay])
    return(
        <div className="flex flex-wrap w-full lg:w-[50%]">
            {filteredMovies.map(movie => (
                <MovieCard 
                    key={movie.title} 
                    image={movie.image} 
                    name={movie.title} 
                    genre={movie.genre} 
                    runtime={movie.duration}
                    onClick={() => {props.setActiveMovie(movie)}}
                />
                )
            )}
        </div>
    )
    
}

export default MovieList