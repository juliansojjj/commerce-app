"use client"

import { AuthState } from "../../interfaces/index"
import { User } from "../../interfaces/index"

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