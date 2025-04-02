import { useParams } from 'react-router-dom'
import './PeliculaCategoria.css'
import { useMovieGenres } from '../../hooks/useQuerys';



export const PeliculaCategoriaFilter = ()=>{
    const {id_categoria} = useParams<{ id_categoria: string }>();

    const id_categoria_string = id_categoria || "";

    const {data,loading,error} = useMovieGenres(id_categoria_string);

    return (
        <section className='PeliculasCategorias'>
            <div className='PeliculasCategorias__content'>
                <div className='PeliculasCategorias__cards'>
                {
                        data?.GET_PELICULA_BY_GENRE.map((pelicula)=>(
                        <div className="PeliculasCategorias__card" key={pelicula.id_pelicula}> 
                            <img src={pelicula.portada } alt="" className="PeliculasCategorias__card-img"/>  
                            <div className="PeliculasCategorias__card-preview">
                                <div className="PeliculasCategorias__card-preview-content">
                                    <div className="PeliculaCategorias__card-preview-title">
                                        <p>Titulo: {pelicula.titulo}</p>
                                    </div>
                                    
                                    <p>Sinopsis: {pelicula.descripcion}</p>
                                    <img src={pelicula.portada} alt="" />
                                    
                                    <i className="fa-solid fa-circle-play"></i>
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