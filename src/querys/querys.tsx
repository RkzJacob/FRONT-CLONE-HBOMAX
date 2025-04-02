import { gql } from "@apollo/client";

export const GET_ALL_MOVIES = gql`
    query {
        GET_ALL_MOVIES{
            id_pelicula
            id_genero
            titulo
            portada
            descripcion
            }
    }

`
export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id_pelicula: String!) {
    GET_PELICULA_BY_ID(id_pelicula: $id_pelicula) {
      id_pelicula
      titulo
      descripcion
      banner
      anio
      url_streaming
    }
  }
`;

export const GET_USER = gql`
        query GetOneFindUser($nombre_usuario: String!) {
            GetOneFindUser(nombre_usuario: $nombre_usuario) {
            id_usuario
            }
        }
        `;

export const GET_PROGRESO = gql`
        query GET_PROGRESO($id_usuario: String!, $id_pelicula: String!) {
            GET_PROGRESO(id_usuario: $id_usuario, id_pelicula: $id_pelicula) {
            progreso_segundos
            }
    }
    `;      

export const GET_PELICULA_BY_GENRE =  gql`
query GET_PELICULA_BY_GENRE($id_genero: String!){
  GET_PELICULA_BY_GENRE(id_genero: $id_genero ){
    id_pelicula
        id_genero
        titulo
        portada
        descripcion
        trailer
        banner
        anio
  }
}

`

export const GET_DETAILS_BY_USER = gql`
  query GET_USER_WITH_DETAILS($id_usuario: String!){
    GET_USER_WITH_DETAILS(id_usuario: $id_usuario){
    id_usuario
    progresos{
      progreso_segundos
      pelicula{
        id_pelicula
        titulo
        descripcion
        url_streaming
        duracion
        portada
      }
    }

    favoritos{
      pelicula{
        id_pelicula
        titulo
        descripcion
        portada
        banner
      }
    }
  }
  }
`

export const FILTRAR_PELICULAS = gql`
    query filtrado_peliculas($search: String!) {
        FILTRAR_PELICULAS(search: $search){
        id_pelicula
        titulo
        anio
        descripcion
        portada
        }
    }
`;