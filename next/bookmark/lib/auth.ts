import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// const getUser = async (email: string, passwd: string) => {
//   console.log('🚀  email:', email, passwd);
//   return null;
// };
const getUser = async (email: string, passwd: string) => ({
  id: '1',
  name: 'HongKilDong',
  email,
  passwd,
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: {
  //   signIn: '/login',
  // },
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: '패스워드', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🚀 providers - authorize - credentials:', credentials);
        console.log('--->>', credentials.email, credentials.passwd);
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            passwd: z.string().min(6),
            // .regex(/^[A-z0-9!@#\$]{6,10}$/),
          })
          .safeParse(credentials);
        console.log('🚀  parsedCredentials:', parsedCredentials);

        if (!parsedCredentials.success) return null;

        const { email, passwd } = parsedCredentials.data;
        console.log('🚀  email passwd:', email, passwd);
        const user = await getUser(email, passwd);
        if (!user) return null;
        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // account.provider = 'google' | 'credentials'

      const { provider } = account!;
      console.log('🚀  account:', account, profile, provider === 'credentials');
      if (provider === 'credentials') {
        // return true;
        // return Response.redirect(new URL('/'));
        // NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);
        return true;
      }

      // if google -> register if not exists
      if (provider === 'google' && profile) {
        const { name, email, picture } = profile;
        console.log('🚀  google:', name, email, picture);

        // ToDo regist..
      }

      //   const user = await getUser(email);
      //   console.log('🚀 auth - user:', user);
      //   if (!user || !user.id) {
      //     await registUser(name, email);
      //   }
      // }

      return true;
    },
  },
});
