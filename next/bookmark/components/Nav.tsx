/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from './ui/button';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { auth } from '@/lib/auth';

export default async function Nav() {
  const session = await auth();
  // const session = { user: { name: 'Kim', image: '/next.svg' } }
  const user = session?.user;
  console.log('🚀  session:', user);

  return (
    <nav className='flex items-center justify-between p-3 h-[5vh]'>
      <Link href='/'>
        <Button
          variant='secondary'
          className='text-2xl flex font-bold text-green-500'
        >
          <BookmarkFilledIcon className='' />
          BookMark
        </Button>
      </Link>

      <div className='flex items-center gap-3'>
        <Link href='https://github.com/indiflex/sesac2024'>
          Github Repository
        </Link>

        {user ? (
          <Link href='/about'>
            <img
              src={user.image || '/next.svg'}
              alt={user.name!}
              className='w-12 rounded-full'
            />
          </Link>
        ) : (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </div>
    </nav>
  );
}
