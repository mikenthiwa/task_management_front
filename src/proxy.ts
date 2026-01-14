import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname === '/') {
    const target = new URL('/dashboard/tasks', req.nextUrl.origin);
    return NextResponse.redirect(target);
  }
  const protectedPaths = [
    '/dashboard',
    '/dashboard/tasks',
    '/dashboard/settings',
  ];

  if (protectedPaths.includes(pathname) && !req.auth) {
    const signInUrl = new URL('/api/auth/signin', req.nextUrl.origin);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)'],
};
