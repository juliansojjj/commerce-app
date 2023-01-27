"use client"

import { CartState, Item } from "../../../interfaces/index"

type CartAction = 
| { type:'addProduct', payload:Item}
| { type:'removeProduct', payload:number}

export const CartReducer = (state:CartState,action:CartAction)=>{
    switch (action.type) {
        case 'addProduct':
            return{
                ...state,
                items:[{
                    amount:action.payload.amount,
                    productId:action.payload.productId
                }]
            }
        
        case 'removeProduct':
            return{
                ...state,
                
                }
    }
}   