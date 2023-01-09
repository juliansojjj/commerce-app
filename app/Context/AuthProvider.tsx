"use client";
//Cree este componente para no convertir el layout.tsx en client component

import { AuthProps } from "../../interfaces";
import {SessionProvider} from 'next-auth/react';

export default function AuthProvider({session,children}:AuthProps){
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}