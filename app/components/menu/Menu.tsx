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
            {user ? 
            <div>
                <Link href='/profile'>{user.name}</Link>
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