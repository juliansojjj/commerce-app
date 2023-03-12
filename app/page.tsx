"use client";

import styles from './home.module.css';
import {Be_Vietnam_Pro} from '@next/font/google';
import Image from 'next/image';
import Logo from '../public/logo.svg'
import ArrowDown from '../public/icons/arrow-down.svg'
import clsx from 'clsx';
import Link from 'next/link';
import { useRef } from 'react';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});
    

export default function Home(){
    const scroll = useRef<HTMLObjectElement>(null)

    return(
        <div>
            <main className={styles.main}>
                <div className={styles.presentation}>
                <h1 className={styles.mainTitle}>
                    <Image 
                        src={Logo} 
                        alt='Flagon'
                        fill
                        style={{objectFit:'contain', objectPosition:'center'}}
                        className={styles.mainLogo}/>
                </h1>
                <h2 className={clsx(vietnamPro.className, styles.subTitle)}>Calidad y técnica en materiales únicos</h2>
                </div>
                <div className={styles.arrowContainer}>
                    <Image src={ArrowDown} width={35} alt='' onClick={()=>{scroll.current!.scrollIntoView({behavior:'smooth'})}}/>
                </div>
            </main>
            <section className={styles.boxesContainer} ref={scroll}>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Cerámica</h2>
                    <img src={`https://www.tierradelfuego.gob.ar/wp-content/uploads/2022/04/copertina-1.jpg`}/>
                </Link>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Textil</h2>
                    <img src={`https://calmahouse.com/img/c/34.jpg`}/>
                </Link>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Cerámica</h2>
                    <img src={`https://www.tierradelfuego.gob.ar/wp-content/uploads/2022/04/copertina-1.jpg`}/>
                </Link>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Textil</h2>
                    <img src={`https://calmahouse.com/img/c/34.jpg`}/>
                </Link>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Cerámica</h2>
                    <img src={`https://www.tierradelfuego.gob.ar/wp-content/uploads/2022/04/copertina-1.jpg`}/>
                </Link>
                <Link href={`/shop/`} className={styles.box}>
                    <h2>Textil</h2>
                    <img src={`https://calmahouse.com/img/c/34.jpg`}/>
                </Link>
            </section>
        </div>
    )
}