import Link from 'next/link';

export default function Ic3() {
  return (
    <>
      <h2 className='2xl text-center'>IC3</h2>
      <div className='flex justify-center gap-5'>
        <Link href='/intercept/ic1'>Go IC1</Link>
        <Link href='/intercept/ic2'>Go IC2</Link>
      </div>
    </>
  );
}
