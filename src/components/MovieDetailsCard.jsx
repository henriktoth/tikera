import { useState, useEffect } from "react"
import { useImageLoader } from "../hooks/useImageLoader" // Corrected case
import movieData from '../assets/movies.json'

function MovieDetailsCard(props){
    const imageSource = useImageLoader(props.activeMovie.image)
    const [showTimes, setShowTimes] = useState([])
    const [screenings, setScreenings] = useState([])

    useEffect(() => {
        const screenings = movieData.find(movie => movie.title === props.activeMovie.title).screenings
        const showTimes = new Set()
        screenings.forEach(screening => {
            if (screening.weekday === props.activeDay){
                showTimes.add(screening.start_time)
            }
        })
        setScreenings(screenings)
        setShowTimes(Array.from(showTimes))
    },[props.activeMovie, props.activeDay])

    const isFullyBooked = (screening) => {
        if (!screening || !screening.room) return false;
        
        const totalSeats = (screening.room.rows || 1) * (screening.room.seatsPerRow || 1);
        const bookedSeatsCount = screening.bookings ? screening.bookings.length : 0;
        
        return bookedSeatsCount >= totalSeats;
    };

    return (
        <div className="bg-neutral-800/50 mr-5 p-3 max-w-200 rounded-xl h-fit self-start">
            <div className="flex gap-5">
                <img src={imageSource} alt="" className="w-50 rounded-xl shadow-xl"/>
                <div>
                    <h3 className="text-4xl font-bold my-1">{props.activeMovie.title}</h3>
                    <p className="text-neutral-500 my-1">{props.activeMovie.release_year}</p>
                    <p className="text-justify">{props.activeMovie.description}</p>
                    <div className="flex gap-5 mt-3">
                        <p className="text-neutral-500">{props.activeMovie.genre}</p>
                        <p className="text-neutral-500">{props.activeMovie.duration} perc</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {showTimes.map(showtime => {
                            const screening = screenings.find(
                                screening => screening.weekday === props.activeDay && screening.start_time === showtime
                            );
                            const fullyBooked = isFullyBooked(screening);
                            
                            return (
                                <div 
                                    key={showtime} 
                                    onClick={() => {
                                        if (!fullyBooked) {
                                            props.setActiveScreening(screening);
                                        }
                                    }}
                                    className={`px-3 py-2 rounded-lg text-center 
                                        ${fullyBooked 
                                            ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-indigo-900 to-indigo-800 text-white hover:cursor-pointer'
                                        }`}
                                >
                                    {showtime}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsCard