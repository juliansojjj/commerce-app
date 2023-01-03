"use client"

import { useForm} from 'react-hook-form';
import styles from '../../(sign)/sign.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'universal-cookie';

type User = {
    email?:string;
    password?:string;
}

type FormData = {
    email?: string;
    password?: string;
}

const signinUrl = 'http://localhost:8000/api/users/sign';

export default function SigninForm() {
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const router = useRouter()
    const [showError, setShowError] = useState('')
    const cookies = new Cookies();

    const onLogin = async(data:FormData)=>{
           await axios.post(signinUrl,data)
            .then(info=>{
                const token = info.data.token;
                cookies.set('token', token, {path:'/'})
                console.log(info)
            })
            .catch(err=>{
                setShowError(err.response.data.msg);
                setTimeout(()=>setShowError(''),4000)
           });
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