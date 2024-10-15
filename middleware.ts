import type { NextRequest } from 'next/server'
import { useUser } from '@auth0/nextjs-auth0/client';

export function middleware(request: NextRequest) {

  const currentUser = request.cookies.get('appSession')?.value
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
  if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/api/auth/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}