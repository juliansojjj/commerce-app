"use client"

import { Suspense } from 'react';
import styles from '../../order/order.module.css'
import OrderCart from '../cart/OrderCart';

export default function UniqueOrder({orderData, orderCart}:{orderData:any,orderCart:any}){
    return(
        <div className={styles.orderContainer}>
            {orderData?.id}
                <OrderCart orderCart={orderCart}/>
        </div>
    )
}