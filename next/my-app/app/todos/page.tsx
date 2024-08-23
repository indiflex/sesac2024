import Link from 'next/link';
import { getTodos } from '@/lib/todo';

export default async function Todos() {
  const todos = await getTodos();

  return (
    <>
      <h2 className='text-2xl'>Todos: {todos?.length}</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
