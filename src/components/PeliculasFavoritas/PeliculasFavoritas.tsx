import { Link } from 'react-router-dom';
import { userProgressMovies, useUserByName } from '../../hooks/useQuerys'
import  './PeliculasFavoritas.css'

export const PeliculasFavoritas = () =>{
    const username = localStorage.getItem("nombre_usuario") || "";
    const {data:dataUser} = useUserByName(username)
    const {data} = userProgressMovies(dataUser?.GetOneFindUser.id_usuario || "");


    return (
  
        <section className='favorito'>
            <div className="favorito__container">
                <div className="favorito__container-title">
                    <h1>Favoritos</h1>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <div className="FavoritoPeliculas__cards">

                {
                    data?.GET_USER_WITH_DETAILS.favoritos.map((item:any) =>(

                        <div className="FavoritoPeliculas__card" key={item.pelicula.id_pelicula}> 
                            <img src={item.pelicula.portada } alt="" className="FavoritoPeliculas__card-img"/>  
                            <div className="FavoritoPeliculas__card-preview">
                                <div className="FavoritoPeliculas__card-preview-content">
                                    <div className="PeliculaCategorias__card-preview-title">
                                        <p>Titulo: {item.pelicula.titulo}</p>
                                    </div>
                                    
                                    <p>Sinopsis: {item.pelicula.descripcion}</p>
                                    <img src={item.pelicula.portada} alt="" />
                                    
                                <Link to={`/peliculas_watch/${item.pelicula.id_pelicula}`} title='Haz clic aquí para ver la pelicula'><i className="fa-solid fa-circle-play"></i></Link>
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