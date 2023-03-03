"use client"

import Link from 'next/link';
import useSWR from 'swr';
import { useAuthContext } from '../../Context/AuthStore';
import styles from '../../order/order.module.css'

const fetcher = (url:string)=>fetch(url).then(res=>res.json())

export default function MultipleUserOrders(){
    const {user} = useAuthContext()
    const {data,error} = useSWR(`http://localhost:8000/api/orders/user/${user?.id}`,fetcher, {suspense:true})
    
    if(data?.order.length === 0){
        return(<div>No hay órdenes de compra</div>)
    }
    
    return(
        <div className={styles.ordersContainer}>
            {data?.order.map((item:any)=>{
                const orderDate = new Date(item.createdAt)
                return(
                    <div className={styles.order} key={item.id}>
                        <Link href={`/order/${item.id}`}>{item.id}</Link>
                        <div className={styles.orderDate}>{`${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`}</div>
                        <div>${item.total_price}</div>
                    </div>
                )
            })}
        </div>
    )
}