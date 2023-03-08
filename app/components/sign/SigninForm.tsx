"use client"

import { useForm} from 'react-hook-form';
import styles from '../../(sign)/sign.module.css'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthStore';
import {signIn, getProviders, getSession} from 'next-auth/react';
import { SignInFormData } from '../../../interfaces';
import { Be_Vietnam_Pro } from "@next/font/google";
import clsx from 'clsx';

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

export default  function SigninForm({url}:{url:string}) {
    const {register, handleSubmit, formState: { errors }} = useForm<SignInFormData>();
    const [providers, setProviders] = useState<any>()
    const {login, isLoggedIn} = useAuthContext();

    const onLogin = async(data:SignInFormData)=>{
        const result = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:true,
            callbackUrl:`${url ? url : '/shop'}`
        });
    }

    const providerLogin = async (provider:any, callback:string)=>{
        await signIn(provider,{
            callbackUrl:`${callback}`
        });
    }

    useEffect(()=>{
        getProviders()
        .then(info=>{
            setProviders(info)
        })
        .catch()
    },[])


  return (
                <form className={styles.form} onSubmit={handleSubmit(onLogin)} >
                        <h2 >Iniciar sesión</h2>
                        <label className={styles.inputContainer}>Mail
                        <input type="mail"
                        {...register('email', 
                            {required: 'Complete el mail',
                            pattern: /^\S+@\S+$/i}
                        )}
                        placeholder='Email'
                        className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.email})}
                        />
                        <div className={styles.error}>
                            {errors.email?.message}
                        </div>
                        </label>
                        <label className={styles.inputContainer}>Contraseña
                            <input type="password"
                            {...register('password',
                                {required:'Complete la contraseña', 
                                minLength:{value:6,message:'La contraseña debe tener como mínimo 6 caracteres'}}
                            )}
                            placeholder='Contraseña'
                            className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.password})}
                            />
                            <div className={styles.error}>
                                {errors.password?.message}
                            </div>
                        </label>
                        <div className={styles.buttonContainer}>
                            <button type='submit' className={clsx(vietnamPro.className, styles.submitButton)}>Enviar</button>
                        </div>
                        {providers &&
                        Object.values(providers).map((item:any)=>{
                            console.log(item)
                        if(item.id != 'credentials')
                        return(
                            <button 
                                key={item.id} 
                                onClick={()=>providerLogin(item.name,item.callbackUrl)}
                                className={clsx(vietnamPro.className, styles.submitButton, {[styles.facebookButton] : item.id == 'facebook'}, {[styles.googleButton] : item.id == 'google'})}
                                >
                                    {item.id == 'facebook' && <img src='https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg'></img>}
                                    {item.id == 'google' && <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />}
                                    Ingresar con {item.name}
                                </button>
                        )
                    })}
                </form>
  )
}