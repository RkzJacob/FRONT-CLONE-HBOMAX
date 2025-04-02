import './customNavbar.css'
import hboIMG from '../customNavbar/images/HBOMAX.webp'
import { Link } from 'react-router-dom'
import { ListNavbar } from './listNavbar/listNavbar'

export const CustomNavbar = () =>{
    return(
        <header>
            <div className="header____container">
                <nav className="header__nav-container">
                    <div className="header__logo-container">
                        <img src={hboIMG} alt="Logo HBOMAX" className="header__logo"/>
                    </div>
                    <ul className="nav__list">
                        <li className="nav__item">
                        <Link to={`/Main`} ><p>Home</p></Link>
                        </li >
                        <li className="nav__item">
                            <a href="#"><p>Series</p></a>
                        </li>
                        <li className="nav__item nav__dropdown">
                            <a href="#"><p>Movies</p></a>
                            <ul className="dropdown__list">
                                <li><Link to={`/peliculas/filter/categoria/1`}>Ficción</Link></li>
                                <li><Link to={`/peliculas/filter/categoria/2`}>Comedia</Link></li>
                                <li><Link to={`/peliculas/filter/categoria/3`}>Drama</Link></li>
                                <li><Link to={`/peliculas/filter/categoria/5`}>Terror</Link></li>
                                <li><Link to={`/peliculas/filter/categoria/4`}>Ciencia Ficción</Link></li>
                            </ul>
                        </li>
                        <li className="nav__item">
                            <a href="#"><p>HBO</p></a>
                        </li>
                        <li className="nav__item">
                            <a href="#"><p>Kids & Family</p></a>
                        </li>
                    </ul>
                    <ListNavbar/>
                </nav>
            </div> 
        </header>
    )
}