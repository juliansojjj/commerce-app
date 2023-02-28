"use client"
import { useAuthContext } from "../../Context/AuthStore";
import styles from '../../profile/profile.module.css'
import clsx from 'clsx';
import { Be_Vietnam_Pro } from "@next/font/google";
import Link from "next/link";

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

export default function UserInfo(){

    const {logout, user} = useAuthContext()

    const closeSession = ()=>{
        logout()
    }

    return(
        <div className={styles.userInfoContainer}> 
        <h2>{user?.name}</h2>
        <div className={styles.inputContainer}>
            <h3>Mail</h3>
            <div className={styles.disabledInput}>{user?.email}</div>
        </div>
        <Link href='/profile/edit' className={clsx(styles.changePassBtn,vietnamPro.className)}>
            Cambiar Mail
        </Link>
        <Link href='/profile/edit' className={clsx(styles.changePassBtn,vietnamPro.className)}>
            Cambiar Contraseña
        </Link>
        <button onClick={closeSession} className={clsx(styles.signOutBtn,vietnamPro.className)}>
            Cerrar sesión
        </button>
        </div>
       
    )
}