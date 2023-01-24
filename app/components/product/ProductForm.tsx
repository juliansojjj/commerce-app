"use client";

import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';

import styles from '../../products/[name]/products.module.css'
import AmountInput from './AmountInput';
import {Be_Vietnam_Pro} from '@next/font/google';
import FavoriteButton from './FavoriteButton';


const vietnamPro = Be_Vietnam_Pro({weight:'400'});


export default function ProductForm({stock, itemId}:{stock:number,itemId:number}){

    return(
        <div className={styles.formContainer}>
            <AmountInput stock={stock}/>
            <button className={styles.cartButton}>
                <ShoppingCart />
                <div className={vietnamPro.className}>Agregar al carrito</div>
            </button>
            <FavoriteButton itemId={itemId}/>
        </div>
    )
}