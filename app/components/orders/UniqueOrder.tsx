"use client"

import Link from 'next/link';
import { useEffect } from 'react';
import { useCartContext } from '../../Context/cart/CartStore';
import styles from '../../order/order.module.css'
import OrderCart from '../cart/OrderCart';
import OrderState from './OrderState';
import { Be_Vietnam_Pro } from "@next/font/google";
import clsx from 'clsx';
import useSWR from 'swr';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const addressFetch = async(url:string)=>fetch(url).then(res=>res.json())

export default function UniqueOrder({orderData, orderCart}:{orderData:any,orderCart:any}){
    const {data} = useSWR(`http://localhost:8000/api/checkout/address/old/${orderData?.address_id}`,addressFetch)
    const { wipeCart } = useCartContext();
    console.log(orderData)
    //console.log(data)
    
    useEffect(() => {
        wipeCart();
      }, []);

    return(
        <div className={styles.orderContainer}>
                <div >
                    <div>Orden <b>{orderData?.id}</b></div>
                    <div className={styles.orderInfo}>
                            <div>{data?.address.province}</div>
                            <div>{data?.address.street} {data?.address.number}</div>
                            <div className={styles.orderInfoSon}>
                                Importe: <span>${orderData?.total_price}</span>
                            </div>
                            <div className={styles.orderInfoSon}>
                                Método de pago: <span>{orderData?.payment_option}</span>
                            </div>
                            <div className={styles.orderInfoSon}>
                                Tipo de envío: <span>{orderData?.send_option}</span>
                            </div>
                            {orderData?.sucursal && 
                            <div className={styles.orderInfoSon}>
                                Sucursal de envío: <span>{orderData?.sucursal}</span>
                            </div>}
                    </div>
                    <div>
                    {orderData?.user_discharged 
                    ? 
                    <div>
                        {orderData?.user_received 
                            ? <h4>Recibiste el pedido</h4> 
                            : orderData?.sucursal && orderData?.sucursal_received 
                                ? <h4>El pedido está en la sucursal</h4>
                                : orderData?.post_dispatched 
                                    ? <h4>El pedido está en camino</h4> 
                                    : <h4>El pedido se está preparando</h4>}
                        <OrderState sent={orderData?.post_dispatched} sucursalReceived={orderData?.sucursal ? orderData?.sucursal_received : orderData?.user_received} userReceived={orderData?.user_received}/>
                    </div>
                    : 
                    <div>
                        <h4 className={styles.alert}>Pago pendiente</h4>
                        {orderData?.payment_option == 'mercadopago'
                        &&  <button className={clsx(styles.paymentButton,vietnamPro.className)}>
                                <Link href={`/payment?p=mercadopago&id=${orderData?.id}`} >Proceder al pago</Link>
                            </button>}
                        {orderData?.payment_option == 'tarjeta'
                        &&  <button className={clsx(styles.paymentButton,vietnamPro.className)}>
                                <Link href={`/payment?p=tarjeta&id=${orderData?.id}`} >Proceder al pago</Link>
                            </button>}
                        {orderData?.payment_option == 'pagofacil-rapipago'
                        && <div>*Api de pago pagofacil/rapipago*</div>}
                        {orderData?.payment_option == 'efectivo'
                        && <h4>Abone por el local</h4>}
                        {orderData?.payment_option == 'transferencia-deposito'
                        && <div>*info pago transferencia/deposito*</div>}
                    </div>}
                </div>
                </div>
                <div className={styles.orderCartCell}>
                    <OrderCart orderCart={orderCart} />
                </div>
                
        </div>
    )
}