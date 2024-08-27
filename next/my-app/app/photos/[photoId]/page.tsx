import Image from 'next/image';
import Link from 'next/link';
import { getPhoto } from '@/lib/jsonplaceholder';

type Params = {
  params: {
    photoId: string;
  };
};
export default async function Photo({ params: { photoId } }: Params) {
  const { title, url, albumId, id } = await getPhoto(photoId);
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Link href={`/photos?albumId=${albumId}&photoId=${id}`}>
        <Image alt={title} src={url} width={600} height={600} />
      </Link>
      <h2 className=' text-3xl'>{title}</h2>
    </div>
  );
}
