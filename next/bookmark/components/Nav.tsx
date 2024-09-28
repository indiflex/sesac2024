/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { auth } from '@/lib/auth';

export default async function Nav() {
  const session = await auth();
  // const session = { user: { name: 'Kim', image: '/next.svg' } }
  const user = session?.user;
  console.log('🚀  session:', user);

  return (
    <nav className='flex items-center justify-between p-3 h-[5vh]'>
      <div className='flex items-center gap-5'>
        <Link
          href='https://github.com/indiflex/sesac2024'
          target='_blank'
          className='font-medium rounded-md hover:bg-gray-100 p-3 flex items-center gap-1'
        >
          <GitHubLogoIcon /> Github Repository
        </Link>

        {user ? (
          <Link href='/about' className='hover:shadow-lg'>
            <img
              src={user.image || '/next.svg'}
              alt={user.name!}
              className='w-12 inline rounded-full'
            />
          </Link>
        ) : (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </div>
    </nav>
  );
}
