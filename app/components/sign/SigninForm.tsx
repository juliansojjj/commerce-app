"use client"

import { useForm} from 'react-hook-form';
import styles from '../../(sign)/sign.module.css'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthStore';
import {signIn, getProviders, getSession} from 'next-auth/react'
import { redirect } from 'next/navigation';

type FormData = {
    email: string;
    password: string;
}

export default  function SigninForm({url}) {
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const [showError, setShowError] = useState('')
    const [providers, setProviders] = useState<any>()
    const {login, isLoggedIn} = useAuthContext();

    const onLogin = async(data:FormData)=>{
        const result = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:true,
            callbackUrl:`${url ? url : '/products'}`
        });
    }

    const providerLogin = async (provider, callback)=>{
        await signIn(provider);
        //console.log(result)
    }

    useEffect(()=>{
        getProviders()
        .then(info=>{
            setProviders(info)
        })
        .catch()
    },[])


  return (
            <>
                <form className={styles.container} onSubmit={handleSubmit(onLogin)} >
                    <div>
                        <label>Mail</label>
                        <input type="mail"
                        {...register('email', 
                            {required: 'Complete el mail',
                            pattern: /^\S+@\S+$/i}
                        )}
                        placeholder='Email'/>
                        <div>
                            {errors.email ? errors.email.message : ''}
                        </div>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password"
                        {...register('password',
                            {required:'Complete la contraseña', 
                            minLength:{value:6,message:'La contraseña debe tener como mínimo 6 caracteres'}}
                        )}
                        placeholder='Contraseña'/>
                        <div>
                            {errors.password ? errors.password.message : ''}
                        </div>
                    </div>
                    <div>{showError}</div>
                    <button type='submit'>Enviar</button>
                </form>
                {providers ?
                Object.values(providers).map((item:any)=>{
                    if(item.id != 'credentials')
                    return(
                        <button key={item.id} onClick={()=>providerLogin(item.name,item.callbackUrl)}>Iniciar sesión con {item.name}</button>
                    )
                })
                : ''}
            </>
  )
}