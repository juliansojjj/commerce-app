"use client";

import { useState } from 'react';
import styles from '../../cart/cart.module.css'

import ArrowUp from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDown from '@mui/icons-material/ArrowDropDownOutlined';
import { useCartContext } from '../../Context/cart/CartStore';

export default function CartAmount({stock, amount, product}:{stock:number, amount:number, product:any}){
    
    const [alert, setAlert] = useState('')
    const {increaseAmount, decreaseAmount} = useCartContext()

    const handleAmount = (type:string)=>{
        if(type === 'up'){
            if(amount + 1 <= stock){
                setAlert('')
                increaseAmount({product,amount:amount + 1})
            }
            else temporaryAlert()
        }
        if(type === 'down'){
            if(amount - 1 > 0){
                setAlert('')
                decreaseAmount({product,amount:amount - 1})
            }
        }
    }

    const temporaryAlert = ()=>{
        setAlert('No puede agregar más unidades');
        setTimeout(()=>{setAlert('')},3000);
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