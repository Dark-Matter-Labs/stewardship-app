// middleware.js
// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: any) {
  const pathname = request.nextUrl.pathname;
  
  // Check if path needs authentication
  const protectedPaths = ['/test', '/protected',];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtectedPath) {
    const token = await getToken({ req: request });
    
    if (!token) {
      // User is not authenticated, save origin and redirect
      const pathSegments = pathname.split('/').filter(Boolean);
      const firstSegment = pathSegments[0] || 'home';
    
      
      // Create sign-in URL with callback
      const signInUrl = new URL('/api/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      
      const response = NextResponse.redirect(signInUrl);
      
      // Set cookies with origin info
      response.cookies.set('loginOriginPath', pathname, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 5,
        path: '/'
      });
      
      response.cookies.set('loginOriginSegment', firstSegment, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 5,
        path: '/'
      });
      
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)/report/new", "/(.*)/actant/new", "/(.*)/relationship/new"],
};
