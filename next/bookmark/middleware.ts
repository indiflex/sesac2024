import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('🚀  pathname:', pathname);

  const session = await auth();
  // const isLoginPath = pathname.startsWith('/login');
  // if (isLoginPath && session) {
  //   return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);
  // }

  if (!session)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`); //api/auth/login
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/settings/:path*', '/about', '/login'],
};

// import { auth } from './lib/auth';

// export default auth;

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
