"use client"

import { useAuthContext } from '../../Context/AuthStore'
import styles from './menu.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Close from '../../../public/icons/close.svg';
import { useState } from 'react'
import MenuCart from '../cart/MenuCart';
import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';
import { useCartContext } from '../../Context/cart/CartStore';

export default function Menu({closeAnimation, closeMenu}){
    const {user} = useAuthContext()
    const {items} = useCartContext()

    return(
        <div className={`${styles.container} ${closeAnimation ? styles.menuClosed : ''}`}>
            {user 
            ?
            <Link href='/profile'>{user.name}</Link> 
            : 
            <Link href='/signin'>Iniciar sesión</Link>}
                
                <hr />
                <div className={styles.cartTitle}>
                    <ShoppingCart/>
                    <h3>Carrito de compras</h3>
                </div>
                <MenuCart />
                <hr />
                {items?.length! > 0
                ?
                <Link href='/cart'>
                    <button className={styles.buyButton} onClick={closeMenu}>
                        <div>Finalizar Compra</div>
                    </button>
                </Link>
                :
                ''}
        </div>
    )
}