'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
import {
  FormEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { getPhotos, Photo } from '@/lib/jsonplaceholder';

export default function Photos() {
  return (
    <Suspense>
      <PhotosInner />
    </Suspense>
  );
}

function PhotosInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const albumId = searchParams.get('albumId');
  const photoId = searchParams.get('photoId');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currPhotoId, setCurrPhotoId] = useState<string | number | null>(
    photoId
  );
  const albumIdRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const setAlbumId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!albumIdRef.current || !albumIdRef.current.value) return;

    gets(albumIdRef.current.value);
    router.push(`${pathname}?albumId=${albumIdRef.current.value}`);
  };

  const goPhoto = (photoId: number) => {
    if (!albumIdRef.current || !albumIdRef.current.value) return;
    // router.replace(
    //   `/photos/${photoId}?albumId=${albumIdRef.current.value}&photoId=${photoId}`
    // );
    // router.push(
    //   `/photos?albumId=${albumIdRef.current.value}&photoId=${photoId}`
    // );

    setCurrPhotoId(photoId);
    router.push(
      `/photos/${photoId}?albumId=${albumIdRef.current.value}&photoId=${photoId}`
    );
  };

  // const goDetail = (photoId: number) => {
  //   router.push(`${pathname}/${photoId}`);
  // };

  const gets = (uid: string) => {
    startTransition(async () => {
      const data = await getPhotos(uid);
      setPhotos(data);
    });
  };

  useEffect(() => {
    setCurrPhotoId(photoId);
    if (!albumIdRef.current || !albumId) return;
    albumIdRef.current.value = albumId;
    gets(albumId);
  }, [albumId, photoId]);

  return (
    <>
      <h2 className='text-2xl'>
        Gallery: {photos?.length} - {photoId}::{currPhotoId}
      </h2>

      <form onSubmit={(e) => setAlbumId(e)}>
        <input ref={albumIdRef} type='number' className='border' />
      </form>

      {!isPending ? (
        <div className='flex flex-wrap gap-3 justify-center'>
          {photos.length ? (
            photos.map(({ id, title, thumbnailUrl }) => (
              <div key={id}>
                {/* <Link href={`/photos/${id}`}> */}
                <button
                  onClick={() => goPhoto(id)}
                  className={`${id == currPhotoId && 'border-2 border-blue-500'}`}
                >
                  <Image
                    src={thumbnailUrl}
                    alt={title}
                    width={150}
                    height={150}
                  />
                  {id}
                </button>
                {/* </Link> */}
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
