import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

/* eslint-disable @next/next/no-img-element */
export default function Mark() {
  return (
    <div className='flex items-center bg-slate-100 hover:bg-slate-50 p-3 rounded cursor-pointer'>
      <div className='text-center p-1 mr-2'>
        <img
          src='/next.svg'
          alt='xx'
          width={60}
          title='title'
          className='hover:opacity-80 rounded max-h-60'
        />
      </div>
      <div className='flex flex-col w-40'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold w-36 text-gray-700 truncate hover:underline'>
            Mark TitleMark TitleMark TitleMark TitleMark Title
          </h3>
          <Button
            variant='ghost'
            className='px-2 hover:bg-slate-300 hover:text-slate-50'
          >
            <Pencil2Icon />
          </Button>
        </div>
        <p className='truncate'>
          Descriptions DescriptionsDescriptions Descriptions
        </p>
      </div>
    </div>
  );
}
