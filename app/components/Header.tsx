"use client";
//no pude encontrar modo de hacerlo dinámico sin hacerlo del cliente

import { useState } from 'react';
import styles from './header.module.css'
import Link from 'next/link'
import {Be_Vietnam_Pro} from '@next/font/google';
import Image from 'next/image';
import Icon from '../../public/icon.svg'
import MenuButton from './MenuButton';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});


export default function Header(){
    const [scroll, setScroll] = useState(false);

    const changeBackground = ()=>{
        if (window.scrollY > 0){
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }
    
    window.addEventListener('scroll',changeBackground);
    

    return(
        <div className={`${styles.header} ${scroll ? `${styles.scrollDown}` : ''}`}>
            <Link href='/'>
                <Image src={Icon} alt='Flagon Icon' height={40} className={styles.headerIcon}/>
            </Link>
            <div className={`${styles.centerContainer} ${vietnamPro.className}`}>
                <Link href='/about'>Nosotros</Link>
                <Link href='/products'>Productos</Link>
                <Link href='/contact'>Contacto</Link>
            </div>
            <MenuButton/>
        </div>
    )
}