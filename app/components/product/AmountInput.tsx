"use client";

import { useState } from 'react';
import styles from '../../products/[id]/products.module.css'

import ArrowUp from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDown from '@mui/icons-material/ArrowDropDownOutlined';

export default function AmountInput({stock}){
    const [amount, setAmount] = useState(1)
    const [alert, setAlert] = useState('')

    const handleAmount = (type:string)=>{
        if(type === 'up'){
            if(!stock){
                setAlert('No hay más stock');
            }
            else if(amount + 1 > stock){
                setAlert(`Límite de compra actual: ${stock}`);
            }
            else{
                setAmount(amount + 1);
                setAlert('');
            }
        }
        if(type === 'down'){
            if(amount - 1 === 0){
                setAlert('El mínimo de compra es 1 unidad')
            }
            else{
                setAmount(amount - 1);
                setAlert('');
            }
        }
    }
    return(
        <div className={styles.amountComponent}>
            <div className={styles.input}>
                <div>
                    {amount}
                </div>
                <div className={styles.arrowsContainer}>
                    <ArrowUp onClick={()=>handleAmount('up')} />
                    <ArrowDown onClick={()=>handleAmount('down')} />
                </div>
            </div>
            <div className={styles.amountError}>
                {alert}
            </div>
        </div>
    )
}