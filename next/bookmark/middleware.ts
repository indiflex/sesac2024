import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await auth();
  console.log('🚀  pathname:', pathname, session?.user?.name);
  // const isLoginPath = pathname.startsWith('/login');
  // if (isLoginPath && session) {
  //   return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);
  // }

  if (!session)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/api/auth/signin`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/settings/:path*', '/about'],
};
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
// };

// import { auth } from './lib/auth';

// export default auth;

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
