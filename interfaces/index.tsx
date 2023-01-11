import { ReactNode } from "react";



export type User = {
    name:string;
    email:string;
    role:string;
}

export type ContextProps = {
    isLoggedIn: boolean;
    user?: User;
    login:(user:User)=>void
    logout:()=>void
}

export type AuthState = {
    isLoggedIn: boolean;
    user?: User;
    
}

export interface ProviderProps {
    children:ReactNode
}

export interface Children extends ProviderProps{};

export interface AuthProps extends ProviderProps{
    session?:any
}

export type Credentials = {
    email: string;
    password: string;
    redirect: boolean;
    csrfToken: string;
    callbackUrl: string;
    json: boolean;
  }