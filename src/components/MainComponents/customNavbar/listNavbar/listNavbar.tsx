import { Link } from 'react-router-dom'
import './listNavbar.css'
import { LogoutButton } from './components/logoutButton';
import perfilFoto from './../../../../assets/aemond.webp'

export const ListNavbar = () => {
    const nombre_usuario= localStorage.getItem('nombre_usuario');
    return (
        <ul className="nav__list-user"> 
            <li className='nav__item-user nav__dropdown-user'>
                <div className='nav__item-user container'>
                    <a href=""><p>{nombre_usuario}</p></a>
                    <a href=""><img src={perfilFoto} alt="" /></a>
                    
                </div>

            </li> 
            <ul className='dropdown__list-user-2'>
                    <li><Link to={'/peliculas/favoritas/'}>Peliculas Favoritos</Link></li>
                    <li><Link to={'/Progress-peliculas-user'}>Peliculas en progreso</Link></li>
                    <li>Peliculas visualizadas</li>
                    <li>Configuración</li>
                    <li><LogoutButton/></li>
            </ul>
                                  
            
        </ul>
    )
}