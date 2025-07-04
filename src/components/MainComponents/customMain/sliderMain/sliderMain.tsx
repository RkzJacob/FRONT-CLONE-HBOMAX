
import { useMovieGenres } from '../../../../hooks/useQuerys'
import { useEffect, useRef, useState } from 'react';
import  './sliderMain.css'
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export const CustomMainSlier = () =>{
    const {data} = useMovieGenres("3"); 
    const [currentIndex , setCurrentIndex] = useState(0);
    const imageRefCurrent = useRef<HTMLImageElement | null>(null);
    const imageRefNext = useRef<HTMLImageElement | null>(null);
    const [prevIndex, setPrevIndex] = useState(0);
    const listRef = useRef<HTMLUListElement | null>(null);

    const lista_peliculas=data?.GET_PELICULA_BY_GENRE || [];

    useEffect(()=>{
        const interval = setInterval(()=>{

            setCurrentIndex((prevIndex)=> (prevIndex +1) % lista_peliculas.length);
        },10000);

        return () => clearInterval(interval);

    },[lista_peliculas.length]);

    useEffect(()=>{
        if (!imageRefCurrent.current || !imageRefNext.current) return;

        if (!listRef.current) return;
        const items = listRef.current.querySelectorAll('.main__list-item');

        const current = imageRefCurrent.current;
        const next = imageRefNext.current;

        next.src = lista_peliculas[currentIndex].banner;
        next.style.zIndex = '2';
        current.style.zIndex = '1';

        gsap.fromTo(next,
            {opacity: 0 ,x:100},
            {opacity:0.5 , x:0 , duration:0.3 , ease:"power2.out"}
        );

        gsap.to(current, { x: '-100%', opacity: 0, duration: 1, ease: 'power2.in' });

        gsap.fromTo(items,
            { x: -500, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, stagger: 0.5, ease: 'power2.out' }
        );

        const timeout = setTimeout(() => {
        if (imageRefCurrent.current && imageRefNext.current) {
            const temp = imageRefCurrent.current;
            imageRefCurrent.current = imageRefNext.current;
            imageRefNext.current = temp;
            setPrevIndex(currentIndex);
        }
    }, 1000);

  return () => clearTimeout(timeout);
},[currentIndex]);

    if (lista_peliculas.length === 0) return <div>Loading...</div>;

    return (
        <>
                 <div className="main__background-container">
                    <img 
                    ref={imageRefCurrent}
                    src={lista_peliculas[prevIndex].banner} alt={lista_peliculas[prevIndex].titulo} 
                    className={`main__slider-img`}
                    style={{ position: 'absolute' }}
                   />
                   <img
                        ref={imageRefNext}
                        src=""
                        className="main__slider-img"
                        style={{ position: 'absolute' }}
                    />
                </div>
                
                <div className="main__slider">
                    <ul className="main__list" ref={listRef}>
                        <li className="main__list-item">{`${lista_peliculas[currentIndex].titulo} ${lista_peliculas[currentIndex].anio}`}</li>
                        <li className="main__list-item"><p>{lista_peliculas[currentIndex].descripcion} </p> </li>
                        <li className="main__list-item"> <Link to={`/peliculas_watch/${lista_peliculas[currentIndex].id_pelicula}`}>VER AHORA</Link></li>
                    </ul>
                </div>
        </>
    )
}