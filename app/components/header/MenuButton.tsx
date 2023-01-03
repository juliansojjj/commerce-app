"use client";
import styles from './header.module.css'
import { useState } from 'react';
import Image from 'next/image';
import Menu from '../../../public/icons/menu.svg';

export default function MenuButton(){

    const [menu, setMenu] = useState(false);

    const handleMenu = (e:any)=>{
        setMenu(true);
    }

    return(
        <button onClick={handleMenu} className={styles.menuButton}>
            <Image src={Menu} alt='Menu' width={35}/>
        </button>
    )
}