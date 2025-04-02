import './pelicula.css'
import { Link, useParams } from 'react-router-dom';
import { CustomNavbar } from '../MainComponents/customNavbar/customNavbar';
import { CustomSection } from '../MainComponents/customSection/customSection';
import { useMovieById, useUserByName } from '../../hooks/useQuerys';
import { AGREGAR_PELICULA_FAVORITA } from '../../mutations/mutations';
import { useMutation } from '@apollo/client';
import { GET_DETAILS_BY_USER } from '../../querys/querys';

export const Peliculas = ()=>{ 
    const {id_pelicula} = useParams<{ id_pelicula: string }>();
    const idpeli:string = id_pelicula || "";
    const { data, loading, error } = useMovieById(idpeli);
    const [createFavorita] = useMutation(AGREGAR_PELICULA_FAVORITA);

    const user_storage = localStorage.getItem("nombre_usuario")
    const {data:dataUser} = useUserByName(user_storage || "")

    const Agregar_favorita = async () =>{
      
        try {
          const {data}= await createFavorita({
              variables: {id_usuario: dataUser?.GetOneFindUser.id_usuario, id_pelicula:id_pelicula},
              refetchQueries: [{ query:  GET_DETAILS_BY_USER, variables: { id_usuario: dataUser?.GetOneFindUser.id_usuario } }]
            });
          console.log("pelicula agregada",data)
        } catch (error) {
            console.log("pelicula no agregada",error)
        }
    }


      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;

      const data2 = data?.GET_PELICULA_BY_ID;
    
    return(
      <>
      <CustomNavbar/>
        <section className='pelicula'>
            <div className="pelicula__container">
                <div className="pelicula__header">
                    <img src={data2?.banner}  alt={data2?.titulo} className='pelicula__img'/>
                </div>
                <div className="pelicula__content">
                   
                        <ul>
                            <li>{`${data2?.titulo} ${data2?.anio}`}</li>
                            <li>{data2?.descripcion}</li>
                            <li>
                              <Link to={`/video/${data2?.id_pelicula}`} title={`Ver ${data2?.titulo}`} >
                                <button>VER AHORA</button>
                              </Link>
                              <button onClick={Agregar_favorita} title={`Agregar a favorita ${data2?.titulo}`}>+</button>
                            </li>   
                        </ul>
                    
                </div>
                <div className="pelicula__genero-content">
                  <div className='pelicula__genero-line'>
                  </div>
                  <CustomSection name_section='Reconocidos' id_genero='1'/>
                </div>
            </div>
        </section>
        
        </>   
    )
}
