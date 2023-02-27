"use client"

import Link from 'next/link';
import useSWR from 'swr';
import { useAuthContext } from '../../Context/AuthStore';
import styles from '../../order/order.module.css'
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

const fetcher = (url:string)=>fetch(url).then(res=>res.json())

export default function MultipleUserOrders(){
    const {user} = useAuthContext()
    const {data,error} = useSWR(`http://localhost:8000/api/orders/user/${user?.id}`,fetcher, {suspense:true})
    const [actualPage, setActualPage] = useState(1)
    const [paginateData, setPaginateData] = useState([...data.order])

    useEffect(()=>{
        if(data.order.length > 0){
            console.log(data.order)
            setPaginateData(data.order.slice((actualPage - 1) * 6, (actualPage - 1) * 6 + 6)) 
        }
    },[data])

    const handleDataPaginate = async(event: React.ChangeEvent<unknown>, value: number)=>{
        setActualPage(value)
        setPaginateData(data.order.slice((actualPage - 1) * 6, (actualPage - 1) * 6 + 6)) 
    }

    return(
        <div className={styles.ordersContainer}>
            {paginateData?.map((item:any)=>{
                const orderDate = new Date(item.createdAt)
                return(
                    <div className={styles.order} key={item.id}>
                        <Link href={`/order/${item.id}`}>{item.id}</Link>
                        <div className={styles.orderDate}>{`${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`}</div>
                        <div>${item.total_price}</div>
                    </div>
                )
            })
            }
            <Pagination count={Math.ceil(data.order.length/6)} page={actualPage} onChange={handleDataPaginate} className={styles.paginateInput}/>
        </div>
    )
}

/*
- boton y nombre en profile
- agregar que en breakpoint de iconos, las listas sean en vertical
- arreglar que no se puedan remover cosas desde cart menu EN page checkout
*/