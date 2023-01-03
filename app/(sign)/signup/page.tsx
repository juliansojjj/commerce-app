import SignForm from '../../components/sign/SignupForm'
import Link from 'next/link'
export default function Signup(){




    return(
        <div>
            <SignForm />
            <Link href='/signin'>Ya tenés cuenta? Iniciá sesión</Link>
        </div>
    )
}