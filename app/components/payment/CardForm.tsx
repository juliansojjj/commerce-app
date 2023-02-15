"use client";

import styles from '../../payment/payment.module.css'
import { useForm } from 'react-hook-form';
import { CardPaymentFormData } from '../../../interfaces';

export default function CardForm({operationId}:{operationId:string}){
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm<CardPaymentFormData>();

    const onSend = async(data:CardPaymentFormData)=>{

    }
    console.log(operationId)

    return(
            <form className={styles.form} onSubmit={handleSubmit(onSend)}>
                <div>
                    <label></label>
                    <input type="text" />
                </div>
            </form>
    )
}