"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '../Context/AuthStore';
import styles from './dashboard.module.css'

export default function Dashboard(){
    const {user} = useAuthContext()
    
    const router = useRouter();

    useEffect(()=>{
        if(user?.role !== 'admin') router.push('/shop')
    },[user])

    if(user?.role !== 'admin')return(<h2>Acceso denegado</h2>)

    return(
    <div className={styles.container}>
        <h2>Dashboard</h2>
    </div>
    )}