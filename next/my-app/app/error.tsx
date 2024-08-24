'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log('eeeeeefect!!', error.message, error.digest);
  }, [error]);

  return (
    <div className='text-center'>
      <h2>app/error.tsx: Something went wrong!</h2>
      <pre style={{ color: 'red' }}>{error.stack || error.message}</pre>
      <button
        onClick={() => reset()}
        className='border round bg-green-500 text-white'
      >
        Try again
      </button>
    </div>
  );
}
