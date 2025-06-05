import { useEffect, useState } from 'react'
import { useGetMoviesQuery } from '../store/moviesApi.js'
import MovieCard from './MovieCard.jsx'
import { useSelector } from 'react-redux';

function MovieList(props){
    const [filteredMovies, setFilteredMovies] = useState([])
    const { data: movieData, isLoading, error } = useGetMoviesQuery();
    
    const activeWeek = useSelector(state => state.week.value);

    useEffect(() => {
        if (movieData) {
            console.log(props.activeDayIndex)
            const filtered = movieData.data.filter(movie => 
                movie.screenings.some(screening => 
                    screening.week_number === activeWeek
                    && screening.week_day === props.activeDayIndex
                )
            )
            setFilteredMovies(filtered)
        }
    }, [props.activeDay, activeWeek, movieData])
    
    if (isLoading) return <div className="p-4 text-white">Loading movies...</div>
    if (error) return <div className="p-4 text-red-500">Error loading movies: {error.message}</div>
    
    return(
        <div className="flex flex-wrap w-full lg:w-[50%]">
            {filteredMovies.map(movie => (
                <MovieCard 
                    key={movie.id} 
                    image={movie.image_path} 
                    name={movie.title} 
                    genre={movie.genre} 
                    runtime={movie.duration}
                    onClick={() => {props.setActiveMovie(movie)}}
                />
            ))}
        </div>
    )
}

export default MovieList