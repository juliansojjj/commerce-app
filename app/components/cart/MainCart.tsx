"use client";

import { useCartContext } from '../../Context/cart/CartStore';
import { Item } from '../../../interfaces/index';
import styles from '../../cart/cart.module.css'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from 'next/link';
import CartAmount from './CartAmount';
import { useEffect } from 'react';

export default function MainCart(){
    const {items, removeProduct} = useCartContext() 
    
    

    if(items){
        let subtotal:number = 0;
        items.forEach((unit:any)=>{
                subtotal += unit.product.price * unit.amount
            })
        
        return(
            <div className={styles.cartItemsContainer}>
                    {items.map((unit:Item)=>{
                        return(
                            <div className={styles.cartItem} key={unit.product.id}>
                                <img src={unit.product.image} alt={unit.product.name} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemInfoTitle}>{unit.product.name}</div>
                                    <div className={styles.itemInfoAmount}>
                                        <CartAmount 
                                        stock={unit.product.stock} 
                                        amount={unit.amount} 
                                        product={unit.product}/>
                                    </div>
                                </div>
                                <div className={styles.priceAndTrash}>
                                    <div className={styles.itemInfoPrice}>${unit.amount*unit.product.price}</div>
                                    <div className={styles.deleteButton} onClick={()=>removeProduct(unit.product)}>
                                        <DeleteIcon />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <h4>Subtotal: ${subtotal}</h4>
                        <Link href='/checkout'>Finalizar compra</Link>
                    </div>
            </div>
        )
    }
    return(
        <div className={styles.emptyContainer}>
            <div>El carrito está vacío</div>
            <Link href='/shop'>Ver los productos</Link>
        </div>
    )
}