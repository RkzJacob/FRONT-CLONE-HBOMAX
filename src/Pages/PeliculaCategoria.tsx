import { CustomNavbar } from "../components/MainComponents/customNavbar/customNavbar";
import { PeliculaCategoriaFilter } from "../components/PeliculaCategoriaFilter/PeliculaCategoria";



export function PeliculaCategoria (){
    return (
        <>
          <CustomNavbar/>
          <PeliculaCategoriaFilter/>
        </>
    )
}