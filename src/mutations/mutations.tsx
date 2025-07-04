import { gql } from "@apollo/client";

export const CREATE_PROGRESO = gql`
    mutation CREATE_PROGRESO($id_usuario: String!, $id_pelicula: String!, $tiempo_segundos: String!) {
        CREATE_PROGRESO(id_usuario: $id_usuario, id_pelicula: $id_pelicula,tiempo_segundos: $tiempo_segundos)
    }
    `;

export const LOGIN_MUTATION = gql`
    mutation Login($nombre_usuario: String!, $contrasena: String!){
    LOGIN_USER(nombre_usuario: $nombre_usuario, contrasena: $contrasena){
    token}
    }

`

export const REGISTER_MUTATION = gql`
    mutation createUser($nombre_usuario: String!, $email: String!, $contrasena: String!) {
        createUser(nombre_usuario: $nombre_usuario, email: $email,contrasena: $contrasena)
    }
    `;

export const AGREGAR_PELICULA_FAVORITA = gql`
    mutation Agregar_pelicula_favorita($id_usuario: String!, $id_pelicula: String!) {
        AGREGAR_PELICULA_FAVORITA(id_usuario: $id_usuario, id_pelicula: $id_pelicula)
    }
`;

