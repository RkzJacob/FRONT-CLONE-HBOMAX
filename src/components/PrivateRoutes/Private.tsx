import { Navigate } from "react-router-dom";
import { JSX } from "react";

export const PrivateRoute = ({ children }: {children: JSX.Element})=>{
    const token = localStorage.getItem("token") || "";

    if(!token){
        return <Navigate to="/" />;
    }
    return children
}