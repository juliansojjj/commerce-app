"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { CartReducer } from "./CartReducer";
import {useSession, signOut} from 'next-auth/react'
import { CartContextProps, CartState, Children, Item, Product } from "../../../interfaces";
import Cookies from 'js-cookie'



export const initialState : CartState= {
    items:null
}

const CartContext = createContext<CartContextProps>({
    items:null,
    addProduct({ amount, product }) {},
    removeProduct(product) {},
});

export const CartContextProvider = ({ children }:Children) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const {data, status} = useSession();

    useEffect(()=>{
        console.log('hola')
        const cartCookies = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        dispatch({type:'setInitialState',payload:cartCookies})

    },[])

    useEffect(()=>{
        if(state.items)
        Cookies.set('cart',JSON.stringify(state.items))
    },[state])

    const addProduct = ({amount,product}:Item)=>{
        const check = state.items?.some(unit=>unit.product === product);
        if(!check) {
            dispatch({type:'addNewProduct',payload:{amount,product}})
        }
        else {
            dispatch({type:'addExistingProduct',payload:{amount, product}})
        }   
        // logica de db acá
    }

    const removeProduct = (product:Product)=>{
        dispatch({type:'removeProduct',payload:product});
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