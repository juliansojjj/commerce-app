"use client"

import { useState } from 'react';
import styles from '../../(sign)/sign.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type User = {
    email?:string;
    password?:string;
}

export default function SignupForm() {
    const [mail,setMail] = useState('')
    const [pass,setPass] = useState('')
    const [alert,setAlert] = useState('')
    const [success,setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        // comprobaciones
        if( !mail.trim() || !pass) {
                setAlert('Complete los campos')
            }
        else{
            let user: User = {}
            user.email = mail;
            user.password = pass;

            await axios.post('http://localhost:8000/api/users/sign',user)
            .then(info=>{
                console.log(info)
                setAlert('');
                setSuccess('Se');
                router.push('/');
            })
            .catch(err=>{
                console.log(err);
           });
        }
    }

    const handleChange = (e:any)=>{
        const name = e.target.name
        const input = e.target.value
        if (name == 'mail'){
            setMail(input)
        }
        if (name == 'pass'){
            setPass(input)
        }
    }
    

  return (
            <form className={styles.container} onSubmit={handleSubmit}>
                {success ? success : ''}
                <div>
                    <input type="mail"
                    value={mail} name='mail'
                    onChange={handleChange}
                    placeholder='nombre@mail.com'/>
                </div>
                <div>
                    <input type="password"
                    value={pass} name='pass'
                    onChange={handleChange}
                    placeholder='******'/>
                </div>
                <button type='submit'>Enviar</button>
                {alert ? alert : ''}
            </form>
  )
}