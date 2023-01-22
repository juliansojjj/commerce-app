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