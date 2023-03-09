import SignForm from '../../components/sign/SignupForm'
import Link from 'next/link'
import styles from '../sign.module.css'

export default function Signup(){
    return(
        <div className={styles.container}>
            <SignForm />
            <Link href='/signin'>¿Ya tenés cuenta? Iniciá sesión</Link>
        </div>
    )
}