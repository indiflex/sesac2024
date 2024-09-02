import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  console.log('🚀  q:', q);

  const reqHeaders = new Headers(req.headers);
  const authorization = reqHeaders.get('Authorization');
  console.log('🚀  authorization:', authorization);
  const userAgent = reqHeaders.get('User-Agent');
  console.log('🚀  userAgent:', userAgent);

  const hkeys = headers().get('PPP');
  console.log('🚀  hkeys:', hkeys, reqHeaders.get('PPP'), cookies().get('PPP'));

  // return new Response('xxxxxxxxxx');
  // return Response.json({ id: 1, name: 'Hong' });
  // const response = Response.json(
  const response = NextResponse.json(
    {
      books: q ? books.filter((book) => book.title.includes(q)) : books,
    },
    {
      headers: {
        'Custom-Cookie': userAgent!,
        'Set-Cookie': 'sid=1123',
      },
    }
  );

  response.cookies.set('nextjs', 'xx');
  cookies().set('otherCookies', 'oo', {
    maxAge: 300,
    httpOnly: true,
    secure: false,
  });

  return response;

  // const response = NextResponse.json( books, {
  //     headers: { 'Custom-Cookie': userAgent!, 'Set-Cookie': 'sid=1123',},
  // });

  // // 추가 쿠키

  // return response;
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log('🚀  body:', body);

  const { title, writer = 'Sico' } = body;
  const newer = { id: books.length + 1, title, writer };
  books.push(newer);
  return new Response(JSON.stringify(newer), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
