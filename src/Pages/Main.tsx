
import { CustomMain } from "../components/MainComponents/customMain/customMain";
import { CustomNavbar } from "../components/MainComponents/customNavbar/customNavbar";
import { CustomSection } from "../components/MainComponents/customSection/customSection";
import { CustomSection2 } from "../components/MainComponents/customSection2/customSection2";


export function Main (){
    return (
        <>
          <CustomNavbar/>
          <CustomMain/>
          <CustomSection name_section='Recommend For you' id_genero="1"/>
          <CustomSection2 name='New Releases'/>
          <CustomSection name_section='xd' id_genero="4"/>
          </>
          )}