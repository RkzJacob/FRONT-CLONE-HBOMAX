import {  useMutation, useQuery } from "@apollo/client"
import {  Link, useParams } from "react-router-dom";
import { Data } from "../../interfaces/interface";
import {  useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import './Video.css'
import { GET_PROGRESO} from "../../querys/querys";
import { CREATE_PROGRESO } from "../../mutations/mutations";
import { useMovieById, useUserByName } from "../../hooks/useQuerys";


export const VideoPlayer = () => {
    const progressRef = useRef(0);
    const [initialProgress, setInitialProgress] = useState<number>(0);
    const id_usuario_storage = localStorage.getItem("nombre_usuario");
    const {id_pelicula} = useParams<{ id_pelicula: string }>();
    const videoRef = useRef<StreamPlayerApi>();
  

    const {data:dataUser,loading:userLoading} =  useUserByName(id_usuario_storage || "");
    const {data:dataMovie,loading:MovieLoading} =  useMovieById(id_pelicula || "");

    const url_streaming = dataMovie?.GET_PELICULA_BY_ID.url_streaming.toString();

    const {data: dataProgreso,loading: progresoLoading} = useQuery<Data>(GET_PROGRESO,{
        pollInterval:2000,
        variables:{id_usuario:dataUser?.GetOneFindUser.id_usuario,id_pelicula:id_pelicula},
        skip: !dataUser || !id_pelicula,    
        onCompleted:(data)=>{
            if(data?.GET_PROGRESO){
                const progreso_segundos= parseInt(data.GET_PROGRESO.progreso_segundos,10);
                setInitialProgress(progreso_segundos);
                progressRef.current = progreso_segundos;
            }else{
                const savedProgress = Cookies.get("time_video_player");
                if (savedProgress && parseInt(savedProgress, 10) > 0) {
                    const progreso_segundos = parseInt(savedProgress, 10);
                    setInitialProgress(progreso_segundos);
                    progressRef.current = progreso_segundos;
                } else {
                    setInitialProgress(0);
                    progressRef.current = 0;
                }
            }
        }
    })
    
    const [createProgreso] = useMutation(CREATE_PROGRESO);

    const saveProgressToDB = ()=>{
        const currentTime = progressRef.current.toString();
        Cookies.set("time_video_player",currentTime,{expires: 10});

        const cookies_videoplayer = Cookies.get("time_video_player");

        if(dataUser && id_pelicula){
                createProgreso({
                    variables: {
                        id_usuario: dataUser?.GetOneFindUser.id_usuario,
                        id_pelicula: id_pelicula,
                        tiempo_segundos: cookies_videoplayer,
                    },
                });
        }
    }

    const handleTimeUpdate = () => { 
        if(dataProgreso?.GET_PROGRESO.progreso_segundos){
            const currentTime = Math.floor(videoRef.current?.currentTime ?? 0) ;
            progressRef.current = currentTime;
        }else{
            const currentTime = Math.floor(videoRef.current?.currentTime ?? 0);
            progressRef.current = currentTime;
        }
        
    };

    const handleSeek= ()=>{
        if(dataProgreso?.GET_PROGRESO.progreso_segundos){
            const currentTime = Math.floor(videoRef.current?.currentTime ?? 0);
            progressRef.current = currentTime;
            Cookies.set("time_video_player",currentTime.toString(),{expires: 10});
            saveProgressToDB();
            console.log("handleseek",progressRef.current)  
        }

    }

    const handleRouteChange = () =>{
        saveProgressToDB();
    }


    useEffect(()=>{

        const handleUnload = () => {
            saveProgressToDB()
        }

        window.addEventListener("beforeunload", handleUnload);

        const interval = setInterval(()=>{
            saveProgressToDB();
        },60000);

        return () => {
            clearInterval(interval);
            window.removeEventListener("beforeunload", handleUnload);
            handleRouteChange();
          };

    },[dataUser,dataMovie,dataProgreso])
    
    if ( userLoading || MovieLoading || progresoLoading || !dataProgreso || !url_streaming  ) return <p>Cargando video...</p>;

    return (
        <section className="video">
            <Link to={`/peliculas_watch/${id_pelicula}`}><i className="fa-solid fa-angle-left"></i></Link>
            <div className="video-container">
                {initialProgress !== null && dataProgreso !== undefined  &&(
                    <Stream 
                    className="video"
                    controls 
                    streamRef={videoRef}
                    src={url_streaming} 
                    autoplay
                    onTimeUpdate={handleTimeUpdate}
                    currentTime={initialProgress}
                    onSeeked={handleSeek}
                    />

                    )
                }
                    
            </div>
        </section>
    )
}