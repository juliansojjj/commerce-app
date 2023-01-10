"use client"

import { useAuthContext } from '../../Context/AuthStore'
import styles from './menu.module.css'
import Link from 'next/link'
import Image from 'next/image';
import Close from '../../../public/icons/close.svg';
import { useState } from 'react'

export default function Menu({closeMenu}){
    const {user} = useAuthContext()

    return(
        <div className={styles.container}>
            <button onClick={closeMenu} className={styles.closeButton}>
                <Image src={Close} alt='Menu' width={35}/>
            </button>
            {user ? 
            <div>
                <div>{user.name}</div>
                <div>carrito</div>
            </div>
            : 
            <div> 
                <Link href='/signin'>Iniciar sesión</Link>
            </div>
            }
        </div>
    )
}