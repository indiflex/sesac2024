import Link from 'next/link';

export default function Api() {
  return (
    <div className='flex justify-center'>
      <ul>
        <li>
          <Link href='/api/books'>Books</Link>
        </li>
        <li>
          <Link href='/api/books/1'>Book1</Link>
        </li>
      </ul>
    </div>
  );
}
