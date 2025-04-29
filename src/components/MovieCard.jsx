import {useState, useEffect} from 'react';
import movieImage from '../assets/images/civil-war.jpg';


function MovieCard(props) {
    const [imageSource, setImageSource] = useState(movieImage);

    useEffect(() => {
        if (props.image){
            import(`../assets/images/${props.image}`)
                .then((module)=>{
                    setImageSource(module.default);
                })
                .catch((error) => {
                    console.error("Error loading image:", error);
                })
        }
    }, [props.image]); 
    return(
        <div className="m-5 p-2 bg-neutral-800/50 rounded-xl w-60 hover:outline-2 hover:outline-purple-800 hover:cursor-pointer">
            <img src={imageSource} alt="" className="w-59 rounded-xl" />
            <h3 className="mt-2 font-bold">{props.name}</h3>
            <div className='text-sm flex gap-5 text-neutral-500'>
                <p>{props.genre}</p>
                <p>{props.runtime} perc</p>
            </div>
        </div>
    )

}

export default MovieCard;
