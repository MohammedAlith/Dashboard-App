import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  if (accessToken) {
    return NextResponse.next();
   
  }
   return NextResponse.redirect(new URL('/', request.nextUrl));
  
}

export const config = {
  matcher: ['/dashboard/:path*'],
};



