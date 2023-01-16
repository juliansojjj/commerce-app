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
                const {email, password} = credentials as Credentials;
                
                const res = await axios.post('http://localhost:8000/api/users/sign',{email,password});
                const user : any = await res;
                if (user){
                    return user.data
                }
                else return null
              
            }
          }),
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
   ],

   secret: process.env.JWT_SECRET,

   // no es necesario aclarar jwt, es default
   session:{
    maxAge:2592000,
    strategy:'jwt'
   },

   pages:{
    signIn:'/signin'
   },

   callbacks:{
    /*async redirect({url, baseUrl}){

    },*/
     async jwt({token,account,user}){
        if(account){
            token.accessToken = account.access_token;

            switch(account.type){
                case 'oauth':
                    token.user = await axios.post('http://localhost:8000/api/users/oAuthSign',{
                        name: user?.name || '', 
                        email: user?.email || ''});
                
                break;

                case 'credentials':
                    token.user = user;
                break;
            }
        }

        return token
    },
    async session({session,token,user}){
        
        session.accessToken = token.accessToken;
        session.user = token.user as any;

      return session;
    }
   },

  }
export default NextAuth(authOptions)