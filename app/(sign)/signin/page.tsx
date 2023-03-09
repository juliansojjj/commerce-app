import Link from 'next/link';
import SigninForm from '../../components/sign/SigninForm'
import styles from '../sign.module.css'

export default function Signin({searchParams}: {
    params: { slug: string };
    searchParams: { [key: string]: string  };
  }){
        return(
            <div className={styles.container}>
                <SigninForm url={searchParams?.p} />
                <Link href='/signup'>¿No tenes cuenta? Registrate</Link>
            </div>
        )
}