"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { CartReducer } from "./CartReducer";
import {useSession, signOut} from 'next-auth/react'
import { CartContextProps, CartState, Children, Item } from "../../../interfaces";




export const initialState : CartState= {
    items:undefined
}

const CartContext = createContext<CartContextProps>({
    items:undefined,
    addProduct:()=>{},
    removeProduct:()=>{}
});

export const CartContextProvider = ({ children }:Children) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const {data, status} = useSession();

    const addProduct = ({amount,productId}:Item)=>{
        dispatch({type:'addProduct',payload:{amount,productId}})
        // logica de db acá
    }

    const removeProduct = (productId:number)=>{
        dispatch({type:'removeProduct',payload:productId});
        // lógica de db acá
    }

    

    const value = {
        items:state.items,
        addProduct,
        removeProduct
    }
    
    return (
            <CartContext.Provider value={value}>
                <>{children}</>
            </CartContext.Provider>
    )
};

export const useCartContext = () => useContext(CartContext);