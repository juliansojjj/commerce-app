"use client"

import { useForm} from 'react-hook-form';
import styles from '../../(sign)/sign.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '../../Context/AuthStore';
import {signIn} from 'next-auth/react'

type FormData = {
    email: string;
    password: string;
}

export default  function SigninForm() {
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const router = useRouter()
    const [showError, setShowError] = useState('')
    const {login, isLoggedIn} = useAuthContext();

    const onLogin = async(data:FormData)=>{
        const result = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false}
            );
        console.log(result)
    }


  return (
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
  )
}