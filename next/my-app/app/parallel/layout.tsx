import { ReactNode } from 'react';

type Layout = {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({ children, login, profile }: Layout) {
  const didLogin = false;

  return (
    <>
      {didLogin ? (
        <div className='text-center mt-5'>
          <h2> Parallel Layout</h2>
          <div className='grid grid-cols-2 gap-3'>
            <div className='border'>{profile}</div>
            <div className='border'>{login}</div>
          </div>
          <div className='flex justify-center mt-5 border'>{children}</div>
        </div>
      ) : (
        login
      )}
    </>
  );
}
