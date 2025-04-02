import './customSection2.css'
import { nameCategorie } from '../../../interfaces/interface'
import { userProgressMovies, useUserByName } from '../../../hooks/useQuerys';
import { Link } from 'react-router-dom';






export const CustomSection2 = ({name}: nameCategorie) =>{
    const id_usuario_storage = localStorage.getItem("nombre_usuario");
    const {data:dataUser} = useUserByName(id_usuario_storage || "");
    const usuario = dataUser?.GetOneFindUser.id_usuario || "";
    const {data,loading,error} = userProgressMovies(usuario)


    return(
        <section>
            <div className="continue-watching__container">
                <h2 className="continue-watching__title">{name}</h2>
                <div className="continue-watching__cards">
                    {
                        data?.GET_USER_WITH_DETAILS.progresos.map((item: any) =>(
                            <div className="continue-watching__card" key={item.pelicula.id_pelicula}>
                                <div className="continue-watching__overlay">
                                    <img className="continue-watching__card-img" src={item.pelicula.portada} alt={`Portada de la pelicula ${item.pelicula.titulo}`} />
                                    <Link to={`/video/${item.pelicula.id_pelicula}/`} title={`Continuar viendo ${item.pelicula.titulo}`}>
                                        <i className='fa-solid fa-play'></i>
                                    </Link>
                                </div>
                                
                                <div className="continue-watching__desc">
                                    <p>{item.pelicula.titulo}</p>
                                </div>
                                <div className="progress-container">
                                    <progress 
                                        value={parseInt(item.progreso_segundos)} // Establece el valor de la barra como el progreso en segundos
                                        max={parseInt(item.pelicula.duracion)} // Establece un valor máximo arbitrario para la duración del video
                                    />
                                </div>
                            </div>
                        ))
                    }
                            
                        
                </div>
            </div>            
        </section>
    )
}