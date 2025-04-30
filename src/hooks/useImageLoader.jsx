import {useState, useEffect} from 'react'
import defaultMovieImage from '../assets/images/civil-war.jpg'

export function useImageLoader(imageName){
    const [imageSource, setImageSource] = useState(defaultMovieImage)
    useEffect(() => {
        if (imageName){
            import(/* @vite-ignore */`../assets/images/${imageName}`)
                .then( module =>{
                    setImageSource(module.default)
                })
                .catch((error) => {
                    console.error("Error loading image:", error)
                })
        }
    }, [imageName])  
    
    return imageSource;
}
