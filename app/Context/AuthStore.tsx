"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { AuthReducer } from "./authReducer";
import {AuthProps, AuthState, Children, ContextProps, ProviderProps, User} from '../../interfaces/index'
import {useSession, signOut} from 'next-auth/react'




export const initialState : AuthState= {
    isLoggedIn: false,
    user: undefined
}

const AuthContext = createContext<ContextProps>({
    isLoggedIn:false,
    user:undefined,
    login:()=>{},
    logout:()=>{}
});

export const AuthContextProvider = ({ children }:Children) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const {data, status} = useSession();

    const login = (user:User)=>{
        dispatch({type:'Login',payload:user})
    }

    const logout = ()=>{
        dispatch({type:'Logout'});
        signOut({redirect:true, callbackUrl:'/'});
    }

    useEffect(()=>{
        if(status === 'authenticated'){
            dispatch({type:'Login', payload:data.user as User})
            console.log(data)
        }
    },[status])

    const value = {
        isLoggedIn:state.isLoggedIn,
        user:state.user,
        login,
        logout
    }
    
    return (
            <AuthContext.Provider value={value}>
                <>{children}</>
            </AuthContext.Provider>
    )
};

// el q se usa en los componentes para consumir y actualizar el estado
export const useAuthContext = () => useContext(AuthContext);