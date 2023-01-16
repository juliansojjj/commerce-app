"use client"
import SigninForm from '../../components/sign/SigninForm'

export default function Signin({searchParams}: {
    params: { slug: string };
    searchParams: { [key: string]: string  };
  }){
        return(
            <div>
                <SigninForm url={searchParams?.p} />
            </div>
        )
}

/*
- volver a dirigir a la pagina anterior al ususario si se loguea
- sacar añ usuario si YA está logueado
*/