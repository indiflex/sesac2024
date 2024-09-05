'use client';

import { Button } from '@/components/ui/button';
import { authenticate } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginPage() {
  const [errorMsg, dispatch] = useFormState(authenticate, undefined);
  return (
    <>
      <h1 className='text-3xl'>Login</h1>
      <form
        action={dispatch}
        className='flex flex-col space-y-3 max-w-md mx-auto'
      >
        <label htmlFor='email'>
          Email: <input type='text' id='email' name='email' />
        </label>
        <label htmlFor='passwd'>
          Password: <input type='password' id='passwd' name='passwd' />
        </label>

        <LoginButton />

        <div>{errorMsg}</div>
      </form>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return <Button aria-disabled={pending}>SignIn</Button>;
}
