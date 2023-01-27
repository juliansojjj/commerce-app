"use client";

import { useCartContext } from '../../Context/cart/CartStore';
import { Item } from '../../../interfaces/index';

export default function MenuCart(){
    const {items, addProduct} = useCartContext() 
    console.log(items)
    return(
        <div>
            <div>
                {items?.map((unit:any)=>{
                    return(
                        <div>
                            {unit.amount}-{unit.product.id}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}