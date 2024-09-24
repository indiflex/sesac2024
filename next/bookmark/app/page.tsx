import Book from '@/components/Book';

export default function Home() {
  return (
    <div className='flex-1 overflow-x-auto m-3 space-x-5'>
      <Book />
      <Book />
    </div>
  );
}
