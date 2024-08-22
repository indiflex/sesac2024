import My from '@/components/My';

export default function Hello() {
  const now = new Date().getTime();
  return (
    <>
      <h3 className='text-2xl'>Hello~</h3>
      <My id={now} />
    </>
  );
}
