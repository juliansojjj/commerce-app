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
                //console.log(user)
                if (user){
                    return user.data
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
   },

   callbacks:{
     async jwt({token,account,user}){
        if(account){
            token.accessToken = account.access_token;

            switch(account.type){
                case 'oauth':
                break;

                case 'credentials':
                    token.user = user;
                break;
            }
        }

        return token
    },
    async session({session,token,user}){
        //console.log({session,token,user})
        session.token = token.accessToken;
        session.user = token.user as any;

        return session
    }
   },

  }
export default NextAuth(authOptions)