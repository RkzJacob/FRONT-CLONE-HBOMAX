import { Link } from 'react-router-dom'
import './listNavbar.css'
import { LogoutButton } from './components/logoutButton';
import perfilFoto from './../../../../assets/aemond.webp';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export const ListNavbar = () => {
    const nombre_usuario= localStorage.getItem('nombre_usuario');
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const triggerRef = useRef<HTMLLIElement | null>(null);
    
    useEffect(()=>{
        if (!dropdownRef.current || !triggerRef.current) return;

        const items = dropdownRef.current.querySelectorAll('li');

        const dropdown = dropdownRef.current;
        gsap.set(dropdown, { height: 0, opacity: 0, scaleY: 0, transformOrigin: "top" });
        gsap.set(items, { opacity: 0, y: 10 });

        const showDropdown= () =>{
            gsap.to(dropdown, {
                height: 'auto',
                opacity: 1,
                scaleY: 1,
                duration: 0.7,
                ease: 'power2.out'
            });

            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: 'power2.out'
            });
        };

        

        const trigger = triggerRef.current;
        trigger.addEventListener('mouseenter', showDropdown);
        

        return () => {
            trigger.addEventListener('mouseenter', showDropdown);
            
        };

    },[]);
    return (
        <ul className="nav__list-user"> 
            <li className='nav__item-user nav__dropdown-user' ref={triggerRef}>
                <div className='nav__item-user container'>
                    <a href=""><p>{nombre_usuario}</p></a>
                    <a href=""><img src={perfilFoto} alt="" /></a>
                    
                </div>

            </li> 
            <ul className='dropdown__list-user-2' ref={dropdownRef}>
                    <li><Link to={'/peliculas/favoritas/'}>Peliculas Favoritos</Link></li>
                    <li><Link to={'/Progress-peliculas-user'}>Peliculas en progreso</Link></li>
                    <li>Peliculas visualizadas</li>
                    <li>Configuración</li>
                    <li><LogoutButton/></li>
            </ul>
                                  
            
        </ul>
    )
}