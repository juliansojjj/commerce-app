"use client";
//no pude encontrar modo de hacerlo dinámico sin hacerlo del cliente

import { useState } from 'react';
import styles from './header.module.css'
import Link from 'next/link'
import {Be_Vietnam_Pro} from '@next/font/google';
import Image from 'next/image';
import Icon from '../../../public/icon.svg'
import Menu from '../../../public/icons/menu.svg';
import MenuDisplay from '../menu/Menu'

const vietnamPro = Be_Vietnam_Pro({weight:'400'});


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
    
    window.addEventListener('scroll',changeBackground);
    
    const handleMenu = (e:any)=>{
        if(!onMenu){
            setOnMenu(true);
        }
        else if (onMenu){
            setOnMenu(false)
        }
    }

    const closeMenu = ()=>{
        setOnMenu(false);
    }

    return(
        <>
            {onMenu ? 
                <MenuDisplay closeMenu={closeMenu}/>
            : ''}

            {}

            <div className={`${styles.header} ${scroll ? `${styles.scrollContainer}` : ''}`}>
                <Link href='/' className={styles.iconContainer}>
                    <Image src={Icon} alt='Flagon Icon' className={`${styles.icon} ${scroll ? `${styles.scrollIcon}` : ''}`}/>
                </Link>
                <div className={`${styles.centerContainer} ${vietnamPro.className}`}>
                    <Link href='/about'>Nosotros</Link>
                    <Link href='/products'>Productos</Link>
                    <Link href='/contact'>Contacto</Link>
                </div>
                <div className={styles.menu}>
                    <button onClick={handleMenu} className={styles.menuButton}>
                        <Image src={Menu} alt='Menu' width={35}/>
                    </button>
                </div>
            </div>
        </>
    )
}