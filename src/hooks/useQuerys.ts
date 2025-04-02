import { useQuery } from "@apollo/client";
import { GET_DETAILS_BY_USER, GET_MOVIE_BY_ID, GET_PELICULA_BY_GENRE, GET_PROGRESO, GET_USER } from "../querys/querys";
import { Data, UserData } from "../interfaces/interface";
import { useEffect, useRef, useState } from "react";



export const useMovieGenres = (id_genero:string) => {
    const result = useQuery<Data>(GET_PELICULA_BY_GENRE,{
        variables: {id_genero:id_genero}
    })
    return result
}

export const useMovieById = (id_pelicula:string) =>{
    const result = useQuery<Data>(GET_MOVIE_BY_ID, {
            variables: { id_pelicula: id_pelicula },
    });
    return result
}
export const useUserByName= (id_usuario_storage:String) =>{
    const result =  useQuery<UserData>(GET_USER, {
        variables: { nombre_usuario: id_usuario_storage }
    });
    return result
}

export const userProgressMovies = (id_usuario:string)=>{
    const result = useQuery(GET_DETAILS_BY_USER,{
        variables:{id_usuario:id_usuario}
    })

    return result
}

export const useGetProgreso = (
    id_usuario: string,
    id_pelicula: string,
) =>{
    const progressRef = useRef(0);
    const [initialProgress, setInitialProgress] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const {data,error} = useQuery<Data>(GET_PROGRESO,{
        pollInterval:2000,
        variables:{id_usuario:id_usuario,id_pelicula:id_pelicula},
        skip: !id_usuario || !id_pelicula,  
    });

    useEffect(()=>{
            if(data?.GET_PROGRESO){
                const progreso_segundos= parseInt(data.GET_PROGRESO.progreso_segundos,10);
                setInitialProgress(progreso_segundos);
                progressRef.current = progreso_segundos;
            }else{
                setInitialProgress(0);
                progressRef.current = 0;
            }
            setLoading(true)
    },[data])

    return {data,loading,error,initialProgress,progressRef}
}

