import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt"

  export async function middleware(req:NextRequest) {
    const session = await getToken({
      req, 
      secret:process.env.NEXTAUTH_SECRET,
      raw:true})

    // middleware login
    if (req.nextUrl.pathname.startsWith('/signin')) {
      if(session){
        return NextResponse.redirect('http://localhost:3000')
      }
      else return NextResponse.next();
    }

    // middleware checkout
    if (req.nextUrl.pathname.startsWith('/checkout')) {
      if (!session) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        // a donde debe loguearse
        url.pathname = `/signin`;
        // agreagamos como param de donde venia
        url.search = `p=${requestedPage}`;
        // redirige
        return NextResponse.redirect(url);
      }
    
        return NextResponse.next();
    } 

    // middleware profile
    if (req.nextUrl.pathname.startsWith('/profile')) {
      if(!session){
        return NextResponse.redirect('http://localhost:3000')
      }
      else return NextResponse.next();
    } 
}