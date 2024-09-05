import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';

const getUser = async (email: string, passwd: string) => ({
  id: 1,
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
  //   signIn: '/login'
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
        // if (!user || !(await compare(passwd, user.passwd))) return null;
        if (!user) return null;
        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const didLogin = !!auth?.user;
      console.log('🚀  didLogin:', didLogin, nextUrl.pathname);

      return true;

      // if (nextUrl.pathname.startsWith('/about') && didLogin) {
      //   return true;
      // }

      // let afterUrl = '/login';
      // if (didLogin) afterUrl = '/about';

      // console.log('***>>', nextUrl.pathname.startsWith(afterUrl));

      // // if (!nextUrl.pathname.startsWith(afterUrl))
      // //   return Response.redirect(new URL(afterUrl, nextUrl));

      // return true;
    },
    async signIn({ account, profile }) {
      console.log(
        '🚀  account:',
        account,
        profile,
        account?.provider === 'credentials'
      );
      if (account?.provider === 'credentials') {
        return true;
      }

      // const email = profile?.email;
      // const name = profile?.name || '';
      // if (email) {
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
