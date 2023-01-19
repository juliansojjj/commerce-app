import '../styles/globals.css';
import Header from './components/header/Header';
import AuthProvider from './Context/AuthProvider';
import { AuthContextProvider } from './Context/AuthStore';
import { AuthProps, Children } from '../interfaces';
import {Be_Vietnam_Pro} from '@next/font/google';

const vietnamPro = Be_Vietnam_Pro({weight:'400'});

export default function RootLayout({children}:Children){
    return(
        <>
            <html>
                <head/>
                <body className={vietnamPro.className}>
                    <AuthProvider>
                        <AuthContextProvider >
                            <>
                            <Header />
                            {children}
                            </>
                        </AuthContextProvider>
                    </AuthProvider>
                </body>
            </html>
        </>
    )
}