"use client";

import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';

import styles from '../../products/[name]/products.module.css'
import AmountInput from './AmountInput';
import {Be_Vietnam_Pro} from '@next/font/google';
import FavoriteButton from './FavoriteButton';
import { useCartContext } from '../../Context/cart/CartStore';
import { useState } from 'react';
import { Product } from '../../../interfaces/index';


const vietnamPro = Be_Vietnam_Pro({weight:'400'});


export default function ProductForm({stock, product}:{stock:number,product:Product}){
    const {items, addProduct} = useCartContext() 
    const [amount, setAmount] = useState<number>(1)
    
    const handleProduct = ()=>{
        addProduct({
            amount:amount,
            product:product
        })
    }

    return(
        <div className={styles.formContainer}>
            <AmountInput stock={stock} setAmount={setAmount} amount={amount}/>
            <button className={styles.cartButton} onClick={handleProduct}>
                <ShoppingCart />
                <div className={vietnamPro.className}>Agregar al carrito</div>
            </button>
            <FavoriteButton itemId={product.id}/>
        </div>
    )
}