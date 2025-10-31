import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (req.auth) return NextResponse.next();

  const signInUrl = new URL('/api/auth/signin', req.nextUrl.origin);
  signInUrl.searchParams.set('callbackUrl', '/dashboard/tasks');
  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)'],
};
