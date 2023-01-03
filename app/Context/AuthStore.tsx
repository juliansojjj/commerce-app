"use client";

import { createContext, useContext, Dispatch, useReducer } from "react";
import { AuthReducer } from "./authReducer";

export type User = {
    name:string;
    email:string;
    role:string;
}
type ContextProps = {
    isLoggedIn: boolean;
    user?: User;
}
export type AuthState = {
    isLoggedIn: boolean;
    user?: User;
}

const initialState : AuthState= {
    isLoggedIn: false,
    user: undefined
}



const AuthContext = createContext<ContextProps>({
    isLoggedIn:false,
    user:undefined
});

export const AuthContextProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    
    return (
        <AuthContext.Provider value={{...state}}>
            {children}
        </AuthContext.Provider>
    )
};

// el q se usa en los componentes para consumir y actualizar el estado
export const useAuthContext = () => useContext(AuthContext);