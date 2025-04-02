
import { useMovieGenres } from '../../../../hooks/useQuerys'
import { useEffect, useRef, useState } from 'react';
import  './sliderMain.css'
import { Link } from 'react-router-dom';

export const CustomMainSlier = () =>{
    const {data,loading,error} = useMovieGenres("3"); 
    const [currentIndex , setCurrentIndex] = useState(0);
    const cardsContainerRef = useRef<HTMLImageElement>(null);

    const lista_peliculas=data?.GET_PELICULA_BY_GENRE || [];

    useEffect(()=>{
        const interval = setInterval(()=>{

            setCurrentIndex((prevIndex)=> (prevIndex +1) % lista_peliculas.length);
        },10000);

        return () => clearInterval(interval);

    },[lista_peliculas.length])

    if (lista_peliculas.length === 0) return <div>Loading...</div>;

    return (
        <>
                 <div className="main__background-container">
                    <img 
                    ref={cardsContainerRef}
                    src={lista_peliculas[currentIndex].banner} alt={lista_peliculas[currentIndex].titulo} 
                    className={`main__slider-img slide-right`}
                   />
                </div>
                
                <div className="main__slider">
                    <ul className="main__list">
                        <li className="main__list-item">{`${lista_peliculas[currentIndex].titulo} ${lista_peliculas[currentIndex].anio}`}</li>
                        <li className="main__list-item"><p>{lista_peliculas[currentIndex].descripcion} </p> </li>
                        <li className="main__list-item"> <Link to={`/peliculas_watch/${lista_peliculas[currentIndex].id_pelicula}`}>VER AHORA</Link></li>
                    </ul>
                </div>
        </>
    )
}