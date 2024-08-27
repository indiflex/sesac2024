import { ReactNode } from 'react';

export default function PhotosLayout({
  children,
  viewer,
}: {
  children: ReactNode;
  viewer: ReactNode;
}) {
  return (
    <div className='text-center border'>
      <div>{children}</div>
      <div>{viewer}</div>
    </div>
  );
}
