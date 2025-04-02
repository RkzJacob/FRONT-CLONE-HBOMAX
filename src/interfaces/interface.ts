
export interface nameCategorie{
    name:string;
}
export interface Genre{
  id_genero:string;
}

export interface Movie {
  id_genero: string;
  titulo: string;
  portada: string;
  descripcion: string;
  id_pelicula:string;
  url_streaming:string;
  banner:string;
  trailer:string;
  anio:string
}

export interface Data {
  GET_ALL_MOVIES: Movie[];
  GET_PELICULA_BY_ID: Movie;
  GET_PROGRESO:Progreso;
  GET_PELICULA_BY_GENRE:Movie[];
  
}
interface Progreso{
  progreso_segundos:string;
}

interface User{
  nombre_usuario:string;
  id_usuario:string;
}
export interface UserData{
  user:User;
  GetOneFindUser:User;
}