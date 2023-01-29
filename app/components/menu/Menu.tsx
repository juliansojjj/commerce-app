"use client"

import { useAuthContext } from '../../Context/AuthStore'
import styles from './menu.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Close from '../../../public/icons/close.svg';
import { useState } from 'react'
import MenuCart from '../cart/MenuCart';
import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';

export default function Menu({closeAnimation, closeMenu}){
    const {user} = useAuthContext()

    if(user)
    return(
        <div className={`${styles.container} ${closeAnimation ? styles.menuClosed : ''}`}>
                <Link href='/profile'>{user.name}</Link>
                <hr />
                <div className={styles.cartTitle}>
                    <ShoppingCart/>
                    <h3>Carrito de compras</h3>
                </div>
                <MenuCart />
                <hr />
                <Link href='/cart'>
                    <button className={styles.buyButton} onClick={closeMenu}>
                        <div>Finalizar Compra</div>
                    </button>
                </Link>
        </div>
    )

    return(
        <div> 
            <Link href='/signin'>Iniciar sesión</Link>
        </div>
    )
}