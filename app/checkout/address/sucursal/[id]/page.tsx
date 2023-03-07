"use client"

import styles from '../../../checkout.module.css'
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { Be_Vietnam_Pro } from "@next/font/google";
import axios from 'axios';
import { useCartContext } from '../../../../Context/cart/CartStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const fakeSucursalApi = [
    'Sucursal Correo Calle 11',
    'Sucursal Correo Calle 21',
    'Sucursal Correo Calle 31',
    'Sucursal Correo Calle 41',
    'Sucursal Correo Calle 12',
    'Sucursal Correo Calle 22',
    'Sucursal Correo Calle 32',
    'Sucursal Correo Calle 42']

const fetcher = async(postalCode:string)=>{
    const promise = new Promise(
        async(resolve)=>{
            await setTimeout(() => {
                resolve(fakeSucursalApi)
            }, 1000)
        });
    return promise
}

export default function Sucursal({params, searchParams}: {
    params: { id: string },
    searchParams: { pc: string }
  }){
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm<{sucursal:string}>();
    const { wipeCart } = useCartContext();
    const router = useRouter()
    const [currentOrder,setCurrentOrder] = useState()

    const onSend = async(data:{sucursal:string})=>{
        console.log(data.sucursal)
        await axios.put(`http://localhost:8000/api/orders/sucursal/${params.id}`,{sucursal:data.sucursal})
        .then(res=>{
            console.log(res)
            const paymentOption = res.data.order.payment_option
        if( paymentOption == 'pagofacil-rapipago' ||
            paymentOption == 'efectivo' ||
            paymentOption == 'transferencia-deposito' ){
                router.push(`/order/${res.data.order.id}`)
            } else if( paymentOption == 'mercadopago'){
                router.push(`/payment?p=mercadopago&id=${res.data.order.id}`);
              }else{
                router.push(`/payment?p=tarjeta&id=${res.data.order.id}`)
              }
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        if(!searchParams.pc) router.push('/shop')
    },[searchParams])

    useEffect(() => {
        wipeCart();
        fetchCurrentOrder()
        .then(res=>{
            if(res.data.order.send_option == 'sucursal' && res.data.order.sucursal)router.push('/shop')
            setCurrentOrder(res.data.order)})
        .catch(err=>router.push('/shop'))
      }, []);

      const fetchCurrentOrder = async()=>{
        return await axios.get(`http://localhost:8000/api/orders/${params.id}`)
      }

    const {data} = useSWR(searchParams.pc,fetcher)

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSend)} className={styles.form}>
                <h2>Elija la sucursal para enviar el pedido</h2>
                <label htmlFor="sucursal">Sucursales según su código postal</label>
                    <select
                    id="sucursal"
                    className={clsx(styles.inputField, styles.sucursalInputField, vietnamPro.className,{
                        [styles.errorInputField] : errors.sucursal
                    })}
                    {...register("sucursal", {
                        required: "Seleccione una sucursal para retirar",
                    })}
                    >
                    {Array.isArray(data) && data?.map((item: string) => {
                        return <option value={item} key={item}>{item}</option>;
                    })}signOut
                    </select>
                    <div className={styles.sucursalError}>{errors?.sucursal?.message}</div>
                    <button type='submit' className={clsx(styles.submitButton,vietnamPro.className)}>Seleccionar</button>
            </form>
        </div>
    )
}