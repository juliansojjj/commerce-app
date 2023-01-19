"use client";
//no pude encontrar modo de hacerlo dinámico sin hacerlo del cliente

import { useEffect, useState } from 'react';
import styles from './header.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Icon from '../../../public/icon.svg'
import MenuRounded from '@mui/icons-material/Menu';
import MenuDisplay from '../menu/Menu'
import { usePathname } from 'next/navigation';


export default function Header(){
    const [scroll, setScroll] = useState(false);
    const [onMenu,setOnMenu] = useState(false)

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
            setOnMenu(true);
        }
        else if (onMenu){
            setOnMenu(false)
        }
    }

    // desde menu o pantalla negra
    const closeMenu = ()=>{
        setOnMenu(false);
    }

    return(
        <>
            {onMenu ? 
                <MenuDisplay closeMenu={closeMenu}/>
            : ''}

            {onMenu ? 
                <div className={styles.blackScreen} onClick={closeMenu} ></div>
            : ''}

            <div className={`${styles.header} ${scroll ? `${styles.scrollContainer}` : ''}`}>
                <Link href='/' className={styles.iconContainer}>
                    <Image src={Icon} alt='Flagon Icon' className={`${styles.icon} ${scroll ? `${styles.scrollIcon}` : ''}`}/>
                </Link>
                <div className={styles.centerContainer}>
                    <Link href='/about'>Nosotros</Link>
                    <Link href='/shop' className={styles.productsLink}>
                        <div>Productos</div>
                    </Link>
                    <Link href='/contact'>Contacto</Link>
                </div>
                <div className={styles.menu}>
                    <MenuRounded onClick={handleMenu} cursor='pointer' fontSize='large'/>
                </div>
            </div>
        </>
    )
}