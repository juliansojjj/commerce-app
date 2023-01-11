"use client"
import { useAuthContext } from "../../Context/AuthStore";

export default function SignOutButton(){

    const {logout} = useAuthContext()

    const closeSession = ()=>{
        logout()
    }

    return(
        <button onClick={closeSession}>
            Cerrar sesión
        </button>
    )
}