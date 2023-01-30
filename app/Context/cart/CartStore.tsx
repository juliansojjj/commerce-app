"use client";

import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { CartReducer } from "./CartReducer";
import {useSession, signOut} from 'next-auth/react'
import { CartContextProps, CartState, Children, InitialCartItem, Item, Product } from "../../../interfaces";
import Cookies from 'js-cookie'
import axios from 'axios';
import { useAuthContext } from '../AuthStore';
import useSWR from 'swr';



export const initialState : CartState= {
    items:null
}

const CartContext = createContext<CartContextProps>({
    items:null,
    addProduct({ amount, product }) {},
    removeProduct(product) {},
});

const fetchInitialCart =(url)=>fetch(url)
                        .then(res=>res.json())
                        .then((item)=>{
                            const cart:InitialCartItem[] = []
                            item.cart.map(unit=>{
                                const obj:InitialCartItem = {
                                    amount:unit.amount,
                                    product:undefined
                                }
                                return fetch(`http://localhost:8000/api/products/${unit.item_id}`)
                                .then((res)=>{
                                    return res.json()
                                })
                                .then(product=>{
                                    obj.product = product.product;
                                    cart.push(obj)
                                })
                                .catch(err=>{console.log(err)})
                            });
                            return cart
                        })
                        .catch(err=>console.log(err))


export const CartContextProvider = ({ children }:Children) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const {user} = useAuthContext();
    const {data, isLoading} = useSWR(`http://localhost:8000/api/checkout/cart/${user?.id}`,fetchInitialCart)

    useEffect(()=>{
        if(data){
            dispatch({type:'setInitialState',payload:data})
        }
        else{
        const cartCookies = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
        dispatch({type:'setInitialState',payload:cartCookies})
        }
        
    },[data]);

    

    useEffect(()=>{
        if(state.items)
            Cookies.set('cart',JSON.stringify(state.items))
    },[state]);

    const addProduct = async ({amount,product}:Item)=>{
        if(state.items){
            const check = state.items.some(unit=>unit.product.id === product.id);
            if(!check) {
                if(user){
                    await axios.post('http://localhost:8000/api/checkout/cart',{
                        user_id:user.id,
                        item_id:product.id,
                        amount:amount
                    })
                    .then(()=>{
                        dispatch({type:'addNewProduct',payload:{amount,product}});
                    })
                    .catch(err=>console.log(err))
                }
                else dispatch({type:'addNewProduct',payload:{amount,product}});
            }
            else {
                const currentItem = state.items?.filter((unit:Item)=>{
                    if(unit.product.id === product.id){
                        return unit
                    }
                })
                const oldAmount = currentItem[0].amount;
                const limit = product.stock
                let newAmount:number

                if( oldAmount + amount > limit){
                    newAmount = limit - oldAmount;
                }
                else{
                    newAmount = amount;
                }
                if(user){
                    await axios.put(`http://localhost:8000/api/checkout/cart/${user.id}-${product.id}`,{
                        amount:oldAmount + newAmount
                    })
                    .then((res)=>{
                        dispatch({type:'addExistingProduct',payload:{amount:newAmount, product}})
                    })
                    .catch(err=>console.log(err))
                }
                else dispatch({type:'addExistingProduct',payload:{amount:newAmount, product}})
                
            }   
        }
    }

    const removeProduct = async (product:Product)=>{
        if(user){
            await axios.delete(`http://localhost:8000/api/checkout/cart/${user.id}-${product.id}`)
            .then(()=>{
                dispatch({type:'removeProduct',payload:product});
            })
            .catch(err=>console.log(err))
        }
        else dispatch({type:'removeProduct',payload:product});
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