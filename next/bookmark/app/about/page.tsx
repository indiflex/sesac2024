import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions';
import { auth } from '@/lib/auth';
// import auth from '@/middleware';

export default async function AboutPage() {
  const session = await auth();
  console.log('auth=', session);
  return (
    <>
      <h1 className='text-3xl'>About me : {session?.user?.name}</h1>
      <h2 className='text-3xl'>{session?.user?.email}</h2>
      <form action={logout}>
        <Button>Log out</Button>
      </form>
    </>
  );
}
