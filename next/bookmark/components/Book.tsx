import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Mark from './Mark';

export default function Book() {
  const marks = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    book: 0,
    url: 'https://nextjs.com',
    title: `MarkTitle ${i + 1}`,
    image: i % 2 === 0 ? '/next.svg' : '/vercel.svg',
    descript: '설명부분입니다!',
    isdel: false,
  }));
  return (
    <div className='inline-flex h-full w-72 items-start rounded p-3 bg-slate-200'>
      <div className='flex flex-col w-72'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-xl w-full font-medium'>Book Name</h3>
          <Button variant='ghost' className='px-1'>
            <DotsHorizontalIcon width={30} height={30} className='' />
          </Button>
        </div>

        <div className='flex flex-col overflow-hidden h-[95vh]'>
          <div className='flex-1 overflow-y-auto'>
            <ul className='space-y-3'>
              {marks.map((mark) => (
                <li key={mark.id}>
                  <Mark mark={mark} />
                </li>
              ))}
            </ul>
            <div className='mt-3 text-right h-36'>
              <Button variant='outline'>+ Add Mark</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
