"use client";

import styles from "../../payment/payment.module.css";
import { useForm } from "react-hook-form";
import { CardPaymentFormData } from "../../../interfaces";
import { useCartContext } from "../../Context/cart/CartStore";
import { useEffect, useState } from 'react';
import clsx from "clsx";
import { Be_Vietnam_Pro } from "@next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

export default function CardForm({ operationId, operationType }: { operationId: string, operationType: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CardPaymentFormData>();
  const { wipeCart } = useCartContext();
  const router = useRouter()
  const [loading,setLoading] = useState(false)

  const normalizeCardNumber = (value: any) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };
  const normalizeCardExpiration = (value: any) => {
    return (
      value
        .replace(/-/g, "")
        .match(/.{1,2}/g)
        ?.join("-")
        .substr(0, 5) || ""
    );
  };

  const onSend = async (data: CardPaymentFormData) => {
    paymentServiceApi(data)
    .then(res=>{
      setLoading(true)
      return axios.put(`http://localhost:8000/api/orders/fulfill/${operationId}`)})
    .then(info=>{
        console.log(info.data.order.id)
        router.push(`/order/${info.data.order.id}`)})
    .catch(err=>console.log(err))
  };
  const paymentServiceApi = async(data:CardPaymentFormData)=>{
    const promise = new Promise((resolve,reject)=>{
        //simulacion de pago
        if(!data) reject('DENIED')
        setTimeout(() => {
            resolve('OK')
        }, 1500);

    })
    return promise
  }

  useEffect(() => {
    wipeCart();
    fetchCurrentOrder()
    .then()
    .catch(err=>router.push('/shop'))
  }, []);

  const fetchCurrentOrder = async()=>{
    return await axios.get(`http://localhost:8000/api/orders/current/${operationId}---${operationType}`)
  }


  
  if(operationType == 'mercadopago'){
    return(
    <div className={styles.container}>
        <h2>Servicio de pago de MercadoPago</h2>
        <button 
          className={styles.submitButton}
          onClick={async()=>{
            await axios.put(`http://localhost:8000/api/orders/fulfill/${operationId}`)
            .then(info=>{
              console.log(info.data.order.id)
              router.push(`/order/${info.data.order.id}`)})
          }
          }>Simular pago</button>
    </div>
)}


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSend)}>
      {loading ? 'CARGANDO, ESPERA *futuro loading icon':''}
        <h2>Datos de la tarjeta</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="Card_Number">Número de tarjeta</label>
        <input
          type="tel"
          id="Card_Number"
          placeholder="0000 0000 0000 0000"
          className={clsx(styles.inputField, styles.longInputField, vietnamPro.className, {
            [styles.errorInputField]: errors.Card_Number,
          })}
          {...register("Card_Number", {
            required: "Complete el número de la tarjeta",
            pattern:{
                value:/[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/gm,
                message:'Ingrese los datos en un formato válido'
            }
          })}
          onChange={(event) => {
            //extrae string que agregamos
            const { value } = event.target;
            //lo devuelve normalizado
            setValue("Card_Number",normalizeCardNumber(value))
          }}
        />
        <div className={styles.error}>{errors.Card_Number?.message}</div>
      </div>
      <div className={styles.multipleInputContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="Expiration">Vencimiento</label>
          <input
            type="tel"
            id="Expiration"
            placeholder="00-00"
            className={clsx(styles.inputField, vietnamPro.className, {
              [styles.errorInputField]: errors.Expiration,
            })}
            {...register("Expiration", {
              required: "Complete la fecha de vencimiento",
              pattern:{
                value:/[0-9]{2}-[0-9]{2}/gm,
                message:'Ingrese los datos en un formato válido'
            }
            })}
            onChange={(event) => {
              //extrae string que agregamos
              const { value } = event.target;
              //lo devuelve normalizado
              setValue("Expiration",normalizeCardExpiration(value))
            }}
          />
          <div className={styles.error}>{errors.Expiration?.message}</div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Security_Code">Código de seguridad</label>
          <input
            type="tel"
            id="Security_Code"
            placeholder="000"
            className={clsx(styles.inputField, vietnamPro.className, {
              [styles.errorInputField]: errors.Security_Code,
            })}
            {...register("Security_Code", {
              required: "Complete el número de seguridad",
              pattern:{
                value:/3[0-9]{2}/gm,
                message:'Ingrese los datos en un formato válido'
            }
            })}
          />
          <div className={styles.error}>{errors.Security_Code?.message}</div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="Owner">Titular de la tarjeta</label>
        <input
          type="text"
          id="Owner"
          placeholder="Nombre apellido"
          className={clsx(styles.inputField, styles.longInputField, vietnamPro.className, {
            [styles.errorInputField]: errors.Owner,
          })}
          {...register("Owner", {
            required: "Complete el número de la tarjeta",
            pattern:{
              value:/[a-zA-Z]{3,50}/i,
              message:'Ingrese un formato válido'
            }
          })}/>
        <div className={styles.error}>{errors.Owner?.message}</div>
      </div>
      <div className={styles.selectMultipleInputContainer}>
        <div className={styles.inputContainer}>
            <label htmlFor="Document_Type">Tipo de documento</label>
            <select 
                id="Document_Type"
                {...register("Document_Type")}
                className={clsx(styles.selectInputField, vietnamPro.className, {
                    [styles.errorInputField]: errors.Document_Type,
                  })}>
                <option value="DNI">DNI</option>
                <option value="Cedula">Cédula</option>
                <option value="LC">LC</option>
                <option value="LE">LE</option>
                <option value="Otro">Otro</option>
            </select>
        </div>
        <div className={styles.optionInputContainer}>
          <label htmlFor="Document_Data">Documento de identidad</label>
          <input
            type="tel"
            id="Document_Data"
            placeholder="00000000"
            className={clsx(styles.inputField, styles.optionInputField, vietnamPro.className, {
              [styles.selectErrorInputField]: errors.Document_Data,
            })}
            {...register("Document_Data", {
              required: "Complete el documento",
              pattern:{
                value:/[0-9]{8,11}/gm,
                message:'Ingrese los datos en un formato válido'
            },
            maxLength:{
                value:11,
                message:'Ingrese los datos en un formato válido'
            }
            })}
          />
          <div className={styles.error}>{errors.Document_Data?.message}</div>
          
    </div>
      </div>
      <div className={styles.buttonContainer}>
        <button 
            type="submit"
            className={styles.submitButton}>Pagar</button>
        </div>
    </form>
  );
}