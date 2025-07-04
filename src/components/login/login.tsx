import { useState } from 'react';
import './login.css'
import {  gql, useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../mutations/mutations';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export const Login = ()=>{
    const [nombreUsuario,setNombreUsuario] = useState('');
    const [contrasena,setContrasena] = useState('');
    const [login,{loading }] = useMutation(LOGIN_MUTATION);
   

    const client = useApolloClient();
    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        try {
          const {data}=await login({
            variables: {nombre_usuario: nombreUsuario, contrasena:contrasena },
          });

          if (data) {
            localStorage.setItem("token", data.LOGIN_USER.token);
            // Actualizar el cache de Apollo con el nombre del usuario
            client.writeQuery({
              query: gql`
                query GetUserName {
                  user {
                    nombre_usuario
                  }
                }
              `,
              data: {
                user: {
                  nombre_usuario: nombreUsuario,
                  __typename: 'User',  // Especificar un typename
                },
              },
            });
          }
          Cookies.set("time_video_player","")
          localStorage.setItem("nombre_usuario", nombreUsuario);
          navigate("/main");
        } catch (err) {
          console.error(err);
          alert("Error en el inicio de sesión");
        }
      };

    return(
      
      <>
        <section className="login">
            <div className="login-content">
                <img src="https://imagedelivery.net/_B5aBVMQ4A4ZOSWvxRC5JA/5a9c77b8-3401-458c-1164-27a75a960b00/1920"  className='login__img banner'alt="" />
                <img src="https://imagedelivery.net/_B5aBVMQ4A4ZOSWvxRC5JA/5cade762-fa20-4031-da73-d3c9078ea100/1920" className='login__img logo' alt="" />
                <img src="https://imagedelivery.net/_B5aBVMQ4A4ZOSWvxRC5JA/dac6d7a1-da07-4ed4-11de-cc7d3ced3c00/1920" className='login__img justice-league' alt="Logo de la liga de la justicia" />
            </div>
            <div className="login__container">
                <div className='login__header'>
                    <h2>Iniciar Sesion</h2>
                    <p>Ingresa tu nombre de usuario y la contraseña de tu cuenta hbomax</p>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className='login__item'>
                        <input type="text" placeholder='Nombre de usuario' className='login__item-input'name='nombre_usuario' required value={nombreUsuario} onChange={(e)=> setNombreUsuario(e.target.value)}/>
                    </div>
                    <div className='login__item'>
                        <input type="password" className='login__item-input' placeholder='Contraseña' name='contrasena' required value={contrasena} onChange={(e)=> setContrasena(e.target.value)}/>
                    </div>
                    <div className="login__item">
                      <ul className='login__item list'>
                        <li><a href="" className='login__recuperar'>¿Olvidaste tu contraseña?</a>
                        </li>
                        <li><Link to={'/Registrar-cuenta'} className='login__recuperar'>Registrar cuenta</Link></li>
                      </ul>
                    </div>
                    <button className='login__button' type='submit' disabled={loading}>
                        Iniciar sesion
                    </button>
                </form> 
            </div>
        </section>
        </>
    )
}