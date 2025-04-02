import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

export const LogoutButton = () =>{
    const navigate = useNavigate();

    const handleLogout =() =>{
        localStorage.removeItem("nombre_usuario");
        Cookies.remove("token");
        Cookies.remove("time_video_player");


        navigate("/")
    }

    return(
        <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
        </button>
    )
}