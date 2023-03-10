"use client";
import { AuthProps } from "../../interfaces";
import {SessionProvider} from 'next-auth/react';

export default function AuthProvider({session,children}:AuthProps){
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}