"use client";

import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteEmpty from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteFilled from '@mui/icons-material/FavoriteOutlined';

import styles from '../../products/[id]/products.module.css'
import AmountInput from './AmountInput';
import {Be_Vietnam_Pro} from '@next/font/google';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function ProductForm({stock}){
    return(
        <div className={styles.formContainer}>
            <AmountInput stock={stock}/>
            <button className={styles.cartButton}>
                <ShoppingCart />
                <div className={vietnamPro.className}>Agregar al carrito</div>
            </button>
            <FavoriteEmpty />
            <FavoriteFilled />
        </div>
    )
}