import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className='text-2xl text-slate-500'>About Layout</h2>
      <div>{children}</div>
      <div>
        <a href="/">Go Home</a>
      </div>
    </div>
  );
}
