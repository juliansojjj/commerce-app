import '../styles/globals.css';
import Header from './components/header/Header';
import AuthProvider from './Context/AuthProvider';
import { AuthContextProvider } from './Context/AuthStore';
import { AuthProps, Children } from '../interfaces';

export default function RootLayout({children}:Children){
    return(
        <>
            <html>
                <head/>
                <body>
                    <AuthProvider>
                        <AuthContextProvider >
                            <>
                            <Header/>
                            {children}
                            </>
                        </AuthContextProvider>
                    </AuthProvider>
                </body>
            </html>
        </>
    )
}