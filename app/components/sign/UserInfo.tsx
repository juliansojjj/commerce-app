"use client"
import { useAuthContext } from "../../Context/AuthStore";
import styles from '../../profile/profile.module.css'
import clsx from 'clsx';
import { Be_Vietnam_Pro } from "@next/font/google";
import Link from "next/link";
import useSWR from 'swr';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

const userFetch = async(url:string)=>fetch(url).then(res=>res.json())

export default function UserInfo(){
    const {logout, user} = useAuthContext()
    const {data} = useSWR(`http://localhost:8000/api/users/verify/${user?.id}`,userFetch)

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
        {!data?.verified && 
        <>
            <div className={styles.verifyAlert}>No ha verificado su cuenta todavía</div>
            <Link href={`/verify/${data?.id}?external=false`} className={clsx(styles.changePassBtn, styles.verifyButton,vietnamPro.className)}>
            Verifique su cuenta
        </Link>
        </>}
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