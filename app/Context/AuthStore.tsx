"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { AuthReducer } from "./authReducer";
import {AuthProps, AuthState, Children, ContextProps, ProviderProps, User} from '../../interfaces/index'
import {useSession} from 'next-auth/react'



export const initialState : AuthState= {
    isLoggedIn: false,
    user: undefined
}

const AuthContext = createContext<ContextProps>({
    isLoggedIn:false,
    user:undefined,
    login:()=>{}
});

export const AuthContextProvider = ({ children }:Children) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const {data, status} = useSession();

    useEffect(()=>{
        if(status === 'authenticated'){
            //dispatch({type:'Login',payload:data?.user as User})
        }
    },[]);


    

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