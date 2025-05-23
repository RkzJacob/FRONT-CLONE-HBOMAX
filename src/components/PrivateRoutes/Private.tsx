import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ children }: {children: JSX.Element})=>{
    const token = Cookies.get("token");

    if(!token){
        return <Navigate to="/" />;
    }
    return children
}