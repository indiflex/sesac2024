'use client';

import { useRouter } from 'next/navigation';

export default function My({ id }: { id: number }) {
  const router = useRouter();
  const goAbout = () => {
    router.push('/about', { scroll: false });
  };
  return (
    <div className='text-center'>
      <h2 className='text-4xl'>My: {id}</h2>
      <button
        onClick={goAbout}
        className='rounded-sm px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white shadow-md'
      >
        About
      </button>
    </div>
  );
}
