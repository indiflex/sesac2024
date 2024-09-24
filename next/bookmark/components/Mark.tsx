'use client';

/* eslint-disable @next/next/no-img-element */
import { Pencil2Icon } from '@radix-ui/react-icons';
import { CloudCog, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { useReducer, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export type Mark = {
  id: number;
  book: number;
  url: string;
  title: string;
  descript: string;
  image: string;
  isdel: boolean;
};

type Props = {
  mark: Mark;
};

export default function Mark({ mark }: Props) {
  const [isEditing, toggleEditing] = useReducer((p) => !p, false);
  const [isScraping, setScraping] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {isEditing ? (
        <form>
          <Label htmlFor='url'>URL</Label>
          <div className='flex gap-2 ml-1'>
            <Input
              ref={urlRef}
              id='url'
              type='url'
              placeholder='sample.com...'
            />
            <Button
              variant='outline'
              disabled={isScraping}
              className='text-green-500'
            >
              {isScraping ? <Loader className='animate-spin' /> : <CloudCog />}
            </Button>
          </div>
        </form>
      ) : (
        <div className='flex items-center bg-slate-100 hover:bg-slate-50 p-3 rounded cursor-pointer'>
          <div className='text-center p-1 mr-2'>
            <img
              src={mark.image || '/next.svg'}
              alt={mark.title!}
              width={60}
              title={mark.descript || mark.title}
              className='hover:opacity-80 rounded max-h-60'
            />
          </div>
          <div className='flex flex-col w-40'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold w-36 text-gray-700 truncate hover:underline'>
                {mark.title}
              </h3>
              <Button
                variant='ghost'
                onClick={toggleEditing}
                className='px-2 hover:bg-slate-300 hover:text-slate-50'
              >
                <Pencil2Icon />
              </Button>
            </div>
            <p className='truncate'>{mark.descript}</p>
          </div>
        </div>
      )}
    </>
  );
}
