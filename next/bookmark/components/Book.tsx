'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Mark from './Mark';
import { PlusIcon } from 'lucide-react';
import { useReducer } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

export default function Book() {
  const [isSetting, toggleSetting] = useReducer((pre) => !pre, false);

  const marks = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    book: 0,
    url: 'https://nextjs.com',
    title: `MarkTitle ${i + 1}`,
    image: i % 2 === 0 ? '/next.svg' : '/vercel.svg',
    descript: '설명부분입니다!',
    isdel: false,
  }));
  return (
    <div className='flex flex-col w-72 bg-gray-200 rounded-md max-h-full'>
      <div className='flex items-center justify-between px-3 py-2'>
        <h3 className='text-sm font-semibold text-gray-700'>Book Title</h3>
        <button className='hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center'>
          <DotsHorizontalIcon className='w-5 h-5' />
        </button>
      </div>

      <form className='border border-red-300 m-3 p-3 rounded-md'>
        <Input
          id='bookname'
          type='text'
          defaultValue='Book Title'
          placeholder='Bookname...'
        />
        <div className='flex items-center justify-between'>
          <Label
            htmlFor='delWhenOpen'
            className='mr-1 cursor-pointer hover:bg-white/10'
          >
            <Checkbox id='delWhenOpen' className='mr-2' />
            ClickDel
          </Label>
          <Button
            variant='outline'
            // disabled={isScraping}
            className='text-green-500'
          >
            {/* {isScraping ? <Loader className='animate-spin' /> : <CloudCog />} */}
            aaa
          </Button>
        </div>
      </form>

      <div className='flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto px-3'>
          <ul className='space-y-3'>
            {marks.map((mark) => (
              <li key={mark.id} className=''>
                <Mark mark={mark} />
              </li>
            ))}
          </ul>
        </div>
        <div className='m-3 text-right'>
          <Button variant='outline' className=''>
            <PlusIcon className='h-5 w-5' /> Add Mark
          </Button>
        </div>
      </div>
    </div>
  );
}
