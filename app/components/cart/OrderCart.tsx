"use client";

import { InitialCartItem, Item } from '../../../interfaces/index';
import styles from '../menu/menu.module.css'
import clsx from 'clsx';
import useSWR from 'swr';

const fetchOrderCart =(orderCart:any)=>{   
    return Promise.all( orderCart.map((unit:any)=>{
        const promise = new Promise(async(resolve,reject)=>{
            const obj:InitialCartItem = {
                amount:unit.amount,
                product:undefined
            }
            await fetch(`http://localhost:8000/api/orders/product/${unit.order_item_id}`)
            .then((res)=>{
                return res.json()
            })
            .then(product=>{
                obj.product = product.orderProduct;
                resolve(obj)
            })
            .catch(err=>reject(err))
        });
        return promise
    }))
}

export default function OrderCart({orderCart}:{orderCart:any}){
    const {data, isLoading} = useSWR(orderCart,fetchOrderCart)
        return(
            <div className={clsx(styles.cartItemsContainer,
                styles.checkoutContainer
                )}>
                    {data?.map((unit:any)=>{
                        return(
                            <div className={styles.secondaryCartItem} key={unit.product.id}>
                                <img src={unit.product.image} alt={unit.product.name} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemInfoTitle}>{unit.product.name}</div>
                                    <div>Cant: {unit.amount}</div>
                                    <div className={styles.itemInfoPrice}>${unit.amount*unit.product.price}</div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
}