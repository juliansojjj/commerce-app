import '../styles/globals.css'
import Header from './components/header/Header'
import { AuthContextProvider } from './Context/AuthStore'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
        <>
            <html>
                <head/>
                <body>
                    <AuthContextProvider >
                        <Header/>
                        {children}
                    </AuthContextProvider>
                </body>
            </html>
        </>
    )
}