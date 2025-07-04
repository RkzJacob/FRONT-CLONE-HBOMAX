import './customSection.css'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { Stream } from '@cloudflare/stream-react'
import { useMovieGenres } from '../../../hooks/useQuerys'
import { SkeletonCard } from './SkeletonCard/skeleton'
import imgPlay from '../../../assets/repro.svg'


interface CustomSectionProps{
    name_section:string;
    id_genero:string;
}

export const CustomSection: React.FC<CustomSectionProps> = ({name_section,id_genero}) =>{
    const {data,loading,error} = useMovieGenres(id_genero);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    const scrollToIndex = (index: number) => {
        if (cardsContainerRef.current) {
            const cardWidth = 240*5; // Ancho de cada card
            const gap = 20; // Espacio entre cards
            const scrollAmount = (cardWidth + gap) * index;
            cardsContainerRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
            setCurrentIndex(index);
        }
    };

    if(loading) return <p>loading...</p>
    if(error)return <p>error: {error.message}</p>

    return(
        <section className='recommend' >
            <div className="recommend__container" >
                <h2 className="recommend__title">{name_section}</h2>
                    <div className="recommend__controls">
                        {[0, 1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className={`mini-container ${currentIndex === index ? 'active' : ''}`}
                                    onClick={() => scrollToIndex(index)}
                                >
                                    <div className="mini-line"></div>
                                    
                                </div>
                            ))}
                    </div>
            </div> 
            <div className="recommend__cards" ref={cardsContainerRef} >
                    <div className="recommend__cards-inner" >
                        {
                            data?.GET_PELICULA_BY_GENRE.map((pelicula)=>(
                            <div className="recommend__card" key={pelicula.id_pelicula}>
                                <Link to={`/peliculas_watch/${pelicula.id_pelicula}`} >
                                    <img src={pelicula.portada } alt="" className="recommend__card-img"/>
                                </Link>
                                <div className="recommend__card-titles">
                                    <h1>{pelicula.titulo}</h1>
                                    <div className="recommend__card-play">
                                        <img src={imgPlay} alt="" />
                                    </div>
                                    
                                </div>
                                {!isVideoLoaded && <SkeletonCard />}
                                <Stream
                                    className="recommend__card-preview"
                                    src={pelicula.trailer} 
                                    muted 
                                    autoplay
                                    loop 
                                    responsive={true}
                                    preload="metadata" 
                                    onLoadedData={() => setIsVideoLoaded(true)}
                                />
                            </div>
                            
                            ))
                        }
                    </div>
                </div>     
                   
        </section>
    )
}