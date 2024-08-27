import Modal from '@/components/Modal';
import Image from 'next/image';
import { getPhoto } from '@/lib/jsonplaceholder';

type Params = {
  params: {
    photoId: string;
  };
};

export default async function PhotoInterceptor({
  params: { photoId },
}: Params) {
  const { title, url } = await getPhoto(photoId);
  return (
    <Modal>
      <div className='w-full'>
        <Image alt={title} src={url} width={600} height={600} />
        <h2 className=' text-3xl'>{title}</h2>
      </div>
    </Modal>
  );
}
