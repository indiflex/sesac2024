'use client';

import { FaDoorClosed } from 'react-icons/fa';
import { LuShieldClose } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  DispatchWithoutAction,
} from 'react';
import { Button } from './ui/button';

export default function Modal({
  toggle,
  children,
}: {
  toggle?: DispatchWithoutAction;
  returnPath?: string;
  children: React.ReactNode;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    if (toggle) return toggle();
    router.back();
  }, [toggle, router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // console.log('&&&&&&>>', e.key);
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10'
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6'
      >
        <div>
          {/* <span
            onClick={toggle}
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span> */}

          <div className='bg-gray-50 px-4 py-3 sm:px-6'>
            {children}

            <Button
              variant='outline'
              onClick={onDismiss}
              className='text-slate-500'
            >
              <FaDoorClosed /> Close
            </Button>
            <Button variant='outline' size='icon' onClick={onDismiss}>
              <LuShieldClose className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
