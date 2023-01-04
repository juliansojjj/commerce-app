"use client";

import { createContext, useContext, Dispatch, useReducer, ReactNode } from "react";
import { AuthReducer } from "./authReducer";

export type User = {
    name:string;
    email:string;
    role:string;
}
type ContextProps = {
    isLoggedIn: boolean;
    user?: User;
    login:(user:User)=>void
}
export type AuthState = {
    isLoggedIn: boolean;
    user?: User;
    
}

type ProviderProps = {
    children:ReactNode;
}

export const initialState : AuthState= {
    isLoggedIn: false,
    user: undefined
}



const AuthContext = createContext<ContextProps>({
    isLoggedIn:false,
    user:undefined,
    login:()=>{}
});

export const AuthContextProvider = ({ children }:ProviderProps) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = (user:User)=>{
        dispatch({type:'Login',payload:user})
    }

    const value = {
        isLoggedIn:state.isLoggedIn,
        user:state.user,
        login
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

// el q se usa en los componentes para consumir y actualizar el estado
export const useAuthContext = () => useContext(AuthContext);