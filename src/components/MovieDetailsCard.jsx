import { useState, useEffect } from "react"
import { useImageLoader } from "../hooks/UseImageLoader"
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

    return (
        <div className="bg-neutral-800/50 flex h-85 mr-5 p-3 rounded-xl">
            <div className="flex md:flex-row flex-col gap-5">
                <img src={imageSource} alt="" className="w-50 rounded-xl shadow-xl"/>
                <div className="">
                    <h3 className="text-4xl font-bold my-1">{props.activeMovie.title}</h3>
                    <p className="text-neutral-500 my-1">{props.activeMovie.release_year}</p>
                    <p className="text-justify">{props.activeMovie.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {showTimes.map(showtime => (
                            <div 
                                key={showtime} 
                                onClick={() => {
                                    const selectedScreening = screenings.find(
                                        screening => 
                                            screening.weekday === props.activeDay && 
                                            screening.start_time === showtime
                                    );
                                    props.setActiveScreening(selectedScreening);
                                }} 
                                className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-3 py-2 rounded-lg text-center text-white hover:cursor-pointer"
                            >
                                {showtime}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsCard