"use client"

import { useEffect, useState } from 'react';
import styles from '../../(sign)/sign.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SignUpFormData } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { signIn, getProviders } from 'next-auth/react';
import clsx from 'clsx';
import ReCAPTCHA from "react-google-recaptcha";
import { Be_Vietnam_Pro } from "@next/font/google";

const vietnamPro = Be_Vietnam_Pro({ weight: "400" });

type NewUser = {
    name?:string;
    email?:string;
    password?:string;
}

export default function SignupForm() {
    const {register, handleSubmit, setError, clearErrors, watch, formState: { errors }} = useForm<SignUpFormData>();
    const [providers, setProviders] = useState<any>();
    const [captcha, setCaptcha] = useState<any>();

    const router = useRouter();

    useEffect(()=>{
        getProviders()
        .then(info=>{
            setProviders(info)
        })
        .catch()
    },[]);

    const providerLogin = async (provider:any, callback:string)=>{
        await signIn(provider,{
            callbackUrl:`${callback}`
        });
    }

    const onSend = async(data:SignUpFormData)=>{
        if(!captcha) {setError('captcha', {type:'custom', message:'Complete el captcha antes de continuar'})}
        else{
            console.log(data)
            console.log(captcha)
            await axios.post('http://localhost:8000/api/users',{
                name: `${data.name} ${data.surname}`,
                email:data.email,
                password:data.password
            })
            .then(info=>router.push('/signin'))
            .catch(err=>{throw new err});
        }
    }
    

  return (
            <form className={styles.form} onSubmit={handleSubmit(onSend)}>
                <h2>Registrarse</h2>
                <div className={styles.multipleInputContainer}>
                <label className={styles.inputContainer}>
                    Nombre
                    <input type="text"
                            {...register('name', 
                                {required: 'Complete su nombre',
                                maxLength:{value:25,message:'Excede el número de caracteres'}}
                            )}
                            placeholder='Nombre'
                            className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.name})}
                            />
                    <div className={styles.error}>
                            {errors.name?.message}
                    </div>
                </label>
                <label className={styles.inputContainer}>
                    Apellido
                    <input type="text"
                            {...register('surname', 
                                {required: 'Complete su apellido',
                                maxLength:{value:25,message:'Excede el número de caracteres'}}
                            )}
                            placeholder='Apellido'
                            className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.surname})}
                            />
                    <div className={styles.error}>
                            {errors.surname?.message}
                    </div>
                </label >
                </div>    

                <label className={styles.inputContainer}>Mail
                        <input type="mail"
                        {...register('email', 
                            {required: 'Complete el mail',
                            pattern:{value:/^\S+@\S+$/i,message:'Use un formato adecuado'}}
                        )}
                        placeholder='Mail'
                        className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.email})}
                        />
                        <div className={styles.error}>
                            {errors.email?.message}
                        </div>
                        </label>
                        <div className={styles.multipleInputContainer}>
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
                        <label className={styles.inputContainer}>Repita la contraseña
                            <input type="password"
                            {...register('repeatPassword',
                                {required:'Complete la contraseña', 
                                validate:(value:string)=>{
                                    if(watch('password') !== value)
                                    return 'Las contraseñas no coinciden'
                                }}
                            )}
                            placeholder='Contraseña'
                            className={clsx(vietnamPro.className, styles.inputField, {[styles.errorInputField] : errors?.repeatPassword})}
                            />
                            <div className={styles.error}>
                                {errors.repeatPassword?.message}
                            </div>
                        </label>
                        </div>
                        <div className={styles.buttonContainer}>
                        <ReCAPTCHA
                        sitekey='6LcTT-UkAAAAAIE9Gd8-tiQDGj2798WcJlC3HzL5'
                        onChange={(e:string|null)=>{
                            if(!e){ return}
                            else {
                                clearErrors('captcha')
                                setCaptcha(e)}
                        }}
                        className={styles.captcha}
                        />
                        <div className={styles.captchaError}>{errors.captcha?.message}</div>
                <button type='submit' className={clsx(vietnamPro.className, styles.submitButton)}>Enviar</button>
                {providers &&
                        Object.values(providers).map((item:any)=>{
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
                    </div>
            </form>
  )
}