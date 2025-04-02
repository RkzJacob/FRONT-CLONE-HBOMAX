import { PeliculasProgreso } from "../components/ListEnProgreso/PeliculasProgreso";
import { CustomNavbar } from "../components/MainComponents/customNavbar/customNavbar";


export function PageProgresoPeliculas (){
    return (
        <>
          <CustomNavbar/>
          <PeliculasProgreso/>   
        </>
    )
}