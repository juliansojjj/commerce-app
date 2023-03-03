"use client";

import { useEffect, useState } from 'react';
import styles from './header.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Icon from '../../../public/icon.svg'
import MenuRounded from '@mui/icons-material/Menu';
import MenuDisplay from '../menu/Menu'
import { useCartContext } from '../../Context/cart/CartStore';
import clsx from 'clsx';

import PeopleIcon from '@mui/icons-material/PeopleAltRounded';
import ContactIcon from '@mui/icons-material/AddIcCallRounded';
import ShopIcon from '@mui/icons-material/LocalMallOutlined';

export default function Header(){
    const [scroll, setScroll] = useState(false);
    const [onMenu,setOnMenu] = useState(false)
    const [closeAnimation,setCloseAnimation] = useState(false)
    const {items, removeProduct} = useCartContext() 

    const changeBackground = ()=>{
        if (window.scrollY > 0){
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }

    if (typeof window !== "undefined") {
        window.addEventListener('scroll',changeBackground);
      }
    
    // boton menu
    const handleMenu = (e:any)=>{
        if(!onMenu){
            setCloseAnimation(false)
            setOnMenu(true);
        }
        else if (onMenu){
            setOnMenu(false)
        }
    }

    const closeMenu = ()=>{
        setCloseAnimation(true)
        setTimeout(()=>{
            setOnMenu(false)
        },400)
        
    }

    return(
        <>
            {onMenu ? 
                <MenuDisplay closeAnimation={closeAnimation} closeMenu={closeMenu}/>
            : ''}

            {onMenu ? 
                <div className={styles.blackScreen} onClick={closeMenu} ></div>
            : ''}

            <div className={`${styles.header} ${scroll ? `${styles.scrollContainer}` : ''}`}>
                <Link href='/' className={styles.iconContainer}>
                    <Image src={Icon} alt='Flagon Icon' className={`${styles.icon} ${scroll ? `${styles.scrollIcon}` : ''}`}/>
                </Link>
                <div className={styles.centerContainer}>
                    <Link href='/about' className={styles.mainLink}>
                        Nosotros
                    </Link>
                    <Link href='/about' className={styles.minorLink}>
                        <PeopleIcon />
                    </Link>
                    <Link href='/shop' className={clsx(styles.mainLink)}>
                        <div className={styles.productsLink}>Productos</div>
                    </Link>
                    <Link href='/shop' className={clsx(styles.minorLink, styles.productsLink)}>
                        <ShopIcon />
                    </Link>
                    <Link href='/about' className={styles.mainLink}>
                        Contacto
                    </Link>
                    <Link href='/about' className={styles.minorLink}>
                        <ContactIcon />
                    </Link>
                </div>
                <div className={styles.menu}>
                    <MenuRounded onClick={handleMenu} cursor='pointer' fontSize='large'/>
                </div>
            </div>
        </>
    )
}