"use client"

import { useAuthContext } from '../../Context/AuthStore'
import styles from './menu.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Close from '../../../public/icons/close.svg';
import { useState } from 'react'
import MenuCart from '../cart/MenuCart';
import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';
import AccountIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/CloseRounded';
import TuneIcon from '@mui/icons-material/TuneRounded';
import { useCartContext } from '../../Context/cart/CartStore';
import clsx from 'clsx';
import { Be_Vietnam_Pro } from '@next/font/google';
import { usePathname } from 'next/navigation';
import ShopIcon from '@mui/icons-material/LocalMallOutlined';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function Menu({closeAnimation, closeMenu}:{closeAnimation:any, closeMenu:any}){
    const {user} = useAuthContext()
    const {items} = useCartContext()

    const pathname = usePathname();
    
    return(
        <div className={`${styles.container} ${closeAnimation ? styles.menuClosed : ''}`}>
            <div className={styles.closeButtonContainer}> <CloseIcon onClick={closeMenu}/> </div>
            

            <Link href='/shop' onClick={closeMenu} className={styles.responsiveShopContainer}>
                <ShopIcon/>
                <h4 className={styles.title}>Ir a la tienda</h4>
            </Link> 
            

            {user 
            ?   <Link href='/profile' className={styles.menuCategory}>
                    <AccountIcon />
                    <h4 className={styles.title} onClick={closeMenu}>{user.name}</h4>
                </Link>
            : 
            <Link href='/signin' className={styles.menuCategory}>
                    <AccountIcon />
                    <h4 className={styles.title} onClick={closeMenu}>Iniciar sesión</h4>
                </Link>
            }
                
            {user?.role == 'admin' &&
            <Link href='/dashboard' onClick={closeMenu} className={styles.menuCategory}>
                <TuneIcon/>
                <h4 className={styles.title}>Dashboard</h4>
            </Link> }
            
                <div className={styles.menuCategory}>
                    <ShoppingCart/>
                    <h4 className={styles.title}>Carrito de compras</h4>
                </div>
                
                <MenuCart checkout='FALSE' disabled={pathname == '/checkout' ? 'TRUE' : 'FALSE'}/>
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