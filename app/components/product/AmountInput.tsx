"use client";

import { useState } from 'react';
import styles from '../../products/[name]/products.module.css'

import ArrowUp from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDown from '@mui/icons-material/ArrowDropDownOutlined';

export default function AmountInput({stock, setAmount, amount}:{stock:number, setAmount:any, amount:number}){
    
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
            if(amount - 1 == 0 || amount - 1 < 0){
                return
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
                <div className={styles.numberContainer}>
                    <div>{amount}</div>
                </div>
                <div className={styles.arrowsContainer}>
                    <ArrowUp onClick={()=>handleAmount('up')} className={styles.arrow} />
                    <ArrowDown onClick={()=>handleAmount('down')} className={styles.arrow}/>
                </div>
            </div>
            <div className={styles.amountError}>
                {alert}
            </div>
        </div>
    )
}