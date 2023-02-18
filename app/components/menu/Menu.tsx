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
import clsx from 'clsx';
import { Be_Vietnam_Pro } from '@next/font/google';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function Menu({closeAnimation, closeMenu}:{closeAnimation:any, closeMenu:any}){
    const {user} = useAuthContext()
    const {items} = useCartContext()

    return(
        <div className={`${styles.container} ${closeAnimation ? styles.menuClosed : ''}`}>
            {user 
            ?
            <Link href='/profile'><h3 className={styles.title}>{user.name}</h3></Link> 
            : 
            <Link href='/signin'><h3>Iniciar sesión</h3></Link>}
                
                <div className={styles.hr}/>
                <div className={styles.cartTitle}>
                    <ShoppingCart/>
                    <h3>Carrito de compras</h3>
                </div>
                
                <MenuCart checkout='FALSE'/>
                {items?.length! > 0
                ?
                <Link href='/cart'>
                    <button 
                    className={clsx(styles.buyButton, vietnamPro.className)}
                    onClick={closeMenu}>
                        <div>Finalizar Compra</div>
                    </button>
                </Link>
                :
                ''}
                <div className={styles.hr}/>
        </div>
    )
}