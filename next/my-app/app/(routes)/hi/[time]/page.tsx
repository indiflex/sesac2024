const Times = ['morning', 'afternoon', 'evening', 'night'];

export async function generateStaticParams() {
  return Times.map((time) => ({ time }));
}

export default function HiTime({
  params: { time },
  searchParams: { q },
}: {
  params: { time: string };
  searchParams: { q: string };
}) {
  return (
    <>
      <h2 className='3xl text-center mt-3 capitalize'>
        Good {time} - <span className='normal-case'>{q}</span>
      </h2>
    </>
  );
}
