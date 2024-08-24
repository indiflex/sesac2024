import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'ToDo Default Title',
    template: '%s | My-APP',
  },
};

export default function TodosLayout({ children }: { children: ReactNode }) {
  return <div className='text-center'>{children}</div>;
}
