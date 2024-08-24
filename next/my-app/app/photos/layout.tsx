import { ReactNode } from 'react';

export default function PhotosLayout({ children }: { children: ReactNode }) {
  return <div className='text-center border'>{children}</div>;
}
