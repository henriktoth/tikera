import {useState, useEffect} from 'react'
import defaultMovieImage from '../assets/images/civil-war.jpg'

export function useImageLoader(imageName) {
    const [imageSource, setImageSource] = useState(defaultMovieImage)
    
    useEffect(() => {
        if (!imageName) return
        const imageUrl = new URL(`../assets/images/${imageName}`, import.meta.url).href
        setImageSource(imageUrl)
    }, [imageName]);
    
    return imageSource
}
