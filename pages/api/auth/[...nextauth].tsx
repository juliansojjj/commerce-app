"use client"

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import NextAuth, {NextAuthOptions} from "next-auth"
import { Credentials, User } from "../../../interfaces";

export const authOptions : NextAuthOptions = {
    
    providers: [
        CredentialsProvider({
            type:'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const signinUrl = 'http://localhost:8000/api/users/sign';
                
                const {email, password} = credentials as Credentials;
                
                const res = await axios.post(signinUrl,{email,password});
                const user : any= await res;
                
                if (user){
                    return user
                }
                else return null
              
            }
          })
   ],

   // no es necesario aclarar jwt, es default
   session:{
    strategy:'jwt'
   },

   pages:{
    signIn:'/signin'
   }

  }
export default NextAuth(authOptions)