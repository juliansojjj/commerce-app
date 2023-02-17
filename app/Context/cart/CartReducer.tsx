"use client"

import { CartState, Item, Product, InitialCartItem } from '../../../interfaces/index';

type CartAction = 
| { type:'setInitialCart', payload:Item[]|InitialCartItem[]}
| { type:'wipeCart'}
| { type:'addNewProduct', payload:Item}
| { type:'removeProduct', payload:Product}
| { type:'addExistingProduct', payload:Item}
| { type:'increaseProductAmount', payload:Item}
| { type:'decreaseProductAmount', payload:Item}

export const CartReducer = (state:CartState,action:CartAction)=>{
    switch (action.type) {
        case 'setInitialCart':
            return{
                items:action.payload
                }

        case 'wipeCart':
            return{
                ...state,
                items:[]
                }
            
        case 'addNewProduct':
            if(state.items){
            return{
                ...state,
                items:[...state.items,
                action.payload]
                }
            }
            return{
                ...state,
                items:[action.payload]
            }

        case 'addExistingProduct':
            if(state.items){
                return{
                    ...state,
                    items:state.items.map((unit:any)=>{
                        if(unit.product.id === action.payload.product?.id){
                            return {...unit,amount: unit.amount + action.payload.amount}
                        }
                        else{
                            return unit
                        }
                    })
                }
            }
            return{
                ...state
            }
        
        case 'removeProduct':
            if(state.items){
                const newItems = state.items.filter((unit:any)=>{
                        if(unit.product.id == action.payload.id){
                        }
                        else{
                            return unit
                        }
                })
                if (newItems.length > 0){
                    return{
                        ...state,
                        items:newItems
                    }
                }   
                //si no hay items, wipeamos el estado
                else return{
                }
            }
            return{
                ...state
            }
        case 'increaseProductAmount':
            if(state.items){
                return{
                    ...state,
                    items:state.items.map((unit:any)=>{
                        if(unit.product.id === action.payload.product?.id){
                            return {...unit,amount: action.payload.amount}
                        }
                        else{
                            return unit
                        }
                    })
                }
            }
            return{
                ...state
            }

        case 'decreaseProductAmount':
            if(state.items){
                return{
                    ...state,
                    items:state.items.map((unit:any)=>{
                        if(unit.product.id === action.payload.product?.id){
                            return {...unit,amount: action.payload.amount}
                        }
                        else{
                            return unit
                        }
                    })
                }
            }
            return{
                ...state
            }
    }
}   