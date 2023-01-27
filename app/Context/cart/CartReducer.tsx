"use client"

import { CartState, Item } from '../../../interfaces/index';

type CartAction = 
| { type:'addNewProduct', payload:Item}
| { type:'addExistingProduct', payload:Item}
| { type:'removeProduct', payload:number}

export const CartReducer = (state:CartState,action:CartAction)=>{
    switch (action.type) {
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
            return{
                ...state,
                
                }
    }
}   