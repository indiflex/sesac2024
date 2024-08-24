'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState, useTransition } from 'react';
import { getPhotos, Photo } from '@/lib/jsonplaceholder';

export default function Photos() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const albumId = searchParams.get('albumId');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const albumIdRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const goDetail = (photoId: number) => {
    router.push(`${pathname}/${photoId}`);
  };

  const gets = (uid: string) => {
    startTransition(async () => {
      const data = await getPhotos(uid);
      setPhotos(data);
    });
  };

  const setAlbumId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!albumIdRef.current || !albumIdRef.current.value) return;

    gets(albumIdRef.current.value);
    router.push(`${pathname}?albumId=${albumIdRef.current.value}`);
  };

  useEffect(() => {
    if (!albumIdRef.current || !albumId) return;
    albumIdRef.current.value = albumId;
    gets(albumId);
  }, [albumId]);

  return (
    <>
      <h2 className='text-2xl'>Gallery: {photos?.length}</h2>

      <form onSubmit={(e) => setAlbumId(e)}>
        <input ref={albumIdRef} type='number' className='border' />
      </form>

      {!isPending ? (
        <div className='flex flex-wrap gap-3 justify-center'>
          {photos.length ? (
            photos.map(({ id, title, thumbnailUrl }) => (
              <div key={id}>
                <Link href={`/photos/${id}`}>
                  <Image
                    src={thumbnailUrl}
                    alt={title}
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
            ))
          ) : (
            <>{albumId} album has not Photos</>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
