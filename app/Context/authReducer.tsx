"use client"

import { AuthState } from "./AuthStore"
import { User } from "./AuthStore"

type AuthAction = 
| { type:'Login', payload: User}
| { type:'Logout'}

export const AuthReducer = (state:AuthState,action:AuthAction)=>{
    switch (action.type) {
        case 'Login':
            return{
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        
        case 'Logout':
            return{
                ...state,
                isLoggedIn: false,
                user: undefined
                }
    }
}   