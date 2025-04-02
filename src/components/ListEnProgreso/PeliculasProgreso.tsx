import { Link } from 'react-router-dom';
import { formatDuration } from '../../Functions/formatHora';
import {userProgressMovies, useUserByName } from '../../hooks/useQuerys'
import './PeliculasProgreso.css'



export const PeliculasProgreso =  () =>{
    const id_usuario_storage = localStorage.getItem("nombre_usuario");
    const {data:dataUser} = useUserByName(id_usuario_storage || "");
    const usuario = dataUser?.GetOneFindUser.id_usuario || "";

    const {data}= userProgressMovies(usuario);


    return (
        <section className='movieProgress'>
            <div className="movieProgress__container">
                <div className="movieProgress__cards">
            {
                data?.GET_USER_WITH_DETAILS.progresos.map((item :any,index : any)=>(
                    <div className="movieProgress__card" key={index}>
                        <div className="movieProgress__card-img">
                            <img src={item.pelicula.portada} alt="" className='movieProgress-img' />
                            <i className="fa-solid fa-heart customitem"></i>
                        </div>
                        <div className="movieProgress__desc">
                            <h2 className='movieProgress-title'>{item.pelicula.titulo}</h2>
                            <p className='movieProgress-desc-desc'>Descripción<span>{item.pelicula.descripcion}</span></p>
                            <p className='movieProgress-duration'>Duración<span>{formatDuration(item.pelicula.duracion)}</span></p>
                            <p className='movieProgress-duration'>Progreso Actual<span>{formatDuration(item.progreso_segundos)}</span></p>
                            <div className="movieProgress__link">
                                <Link to={`/video/${item.pelicula.id_pelicula}`} >
                                    <button className='movieProgress__button'>Seguir reproduciendo</button>
                                    <i className="fa-regular fa-circle-play customButton"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
                </div>
            </div>
        </section>
    )
}