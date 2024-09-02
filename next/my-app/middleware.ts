import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('&&&>>', request.cookies);
  const didLogin = request.cookies.has('nextjs'); // request.cookies.get('nextjs')
  request.headers.set('PPP', 'ppppp');
  request.cookies.set('PPP', '555');
  console.log('🚀  didLogin:', didLogin);
  // if (!didLogin) return NextResponse.redirect(new URL('/hello', request.url));
  if (!didLogin) return NextResponse.rewrite(new URL('/hello', request.url));
  return NextResponse.next();
}
export const config = {
  matcher: ['/api/:path*', '/bbb/:path*'],
};
