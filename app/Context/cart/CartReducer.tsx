"use client"

import { CartState, Item, Product } from '../../../interfaces/index';

type CartAction = 
| { type:'setInitialState', payload:Item[]}
| { type:'addNewProduct', payload:Item}
| { type:'addExistingProduct', payload:Item}
| { type:'removeProduct', payload:Product}

export const CartReducer = (state:CartState,action:CartAction)=>{
    switch (action.type) {
        case 'setInitialState':
            return{
                items:action.payload
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
                            return {unit}
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
    }
}   