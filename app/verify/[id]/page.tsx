"use client"

import styles from '../../profile/profile.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../Context/AuthStore';
import axios from 'axios';
import useSWR from 'swr';

const userFetch = async(url:string)=>fetch(url).then(res=>res.json())

export default function Verify({params, searchParams}: {
    params: { id: number };
    searchParams: { [key: string]: string  };
  }){
    const {user, isLoggedIn} = useAuthContext()
    const router = useRouter()
    const {data} = useSWR(`http://localhost:8000/api/users/verify/${params?.id}`,userFetch)

    useEffect(()=>{
        if(!searchParams.external) {
            console.log('op1')
            router.push('/shop')}
        else if(searchParams.external !== 'true'){
            console.log(user?.id! + params.id)
            if(user?.id != params.id) {
                console.log('op2')
                router.push('/shop')}
        }
        else if(searchParams.external == 'true'){
            if(isLoggedIn && user?.id !== params.id) {
                console.log('op3')
                router.push('/shop')}
        }
    },[searchParams,user])

    useEffect(()=>{
        if(data?.verified) router.push('/shop')
    },[data])

    const handleSubmit = async()=>{
        await axios.put(`http://localhost:8000/api/users/verify/${params.id}`)
        .then(res=>router.push('/signin'))
        .catch(err=>{throw new err})
    }

    return(
    <div className={styles.container}>
        <h2>Verifique su cuenta</h2>
        <button onClick={handleSubmit} className={styles.changePassBtn}>Verificar cuenta</button>
    </div>
)}