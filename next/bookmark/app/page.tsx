import Book from '@/components/Book';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex flex-col h-full'>
      <div className='shrink-0 flex justify-between items-center p-4'>
        <h1 className='text-2xl text-white font-bold'>My BookCase</h1>
        <div>
          <button className='inline-flex items-center bg-white/10 hover:bg-white/20 font-medium text-sm text-white rounded-md py-2 px-3'>
            <DotsHorizontalIcon className='w-5 h-5' />
            {/* <span className='ml-1'>Settings</span> */}
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-x-auto mx-3'>
        <div className='inline-flex h-full items-start space-x-3'>
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <div className='w-72'>
            <div className='w-full'>
              <button className='flex items-center bg-white/10 hover:bg-white/20 text-white p-2 text-sm font-medium rounded-md w-full'>
                <PlusIcon className='h-5 w-5' /> Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
