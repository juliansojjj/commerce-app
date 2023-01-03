"use client"

import { useState } from 'react';
import styles from '../../(sign)/sign.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type NewUser = {
    name?:string;
    email?:string;
    password?:string;
}

export default function SignupForm() {
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [mail,setMail] = useState('')
    const [pass,setPass] = useState('')
    const [alert,setAlert] = useState('')
    const [success,setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        // comprobaciones
        if(    !name.trim()
            || !surname.trim() 
            || !mail.trim() 
            || !pass) {
                setAlert('Complete los campos')
            }
        else{
            let newUser: NewUser = {}
            newUser.name = name.concat(' ' + surname);
            newUser.email = mail;
            newUser.password = pass;

            await axios.post('http://localhost:8000/api/users',newUser)
            .then(info=>{
                setAlert('');
                setSuccess('Cuenta creada con éxito');
                setTimeout(()=>{
                    router.push('/signin')
                },2000);
            })
            .catch(err=>{console.log(err);
            setAlert(err)});
        }
    }

    const handleChange = (e:any)=>{
        const name = e.target.name
        const input = e.target.value
        if(name == 'onName'){
            setName(input)
        }
        if(name == 'surname'){
            setSurname(input)
        }
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
                    <input type="text"
                    value={name} 
                    name='onName'
                    onChange={handleChange}
                    placeholder='Nombre'/>

                    <input type="text"
                    value={surname}
                    name='surname'
                    onChange={handleChange}
                    placeholder='Apellido'/>
                </div>
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