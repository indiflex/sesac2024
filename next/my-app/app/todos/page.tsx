'use client';

import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import { getTodos, Todo } from '@/lib/todo';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const userIdRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   if (userIdRef.current?.value) {
  //     const x = userIdRef.current?.value;
  //     (async function () {
  //       console.log('>>>', x, userIdRef.current?.value);
  //       const data = await getTodos(x);
  //       setTodos(data);
  //     })();
  //   }
  // }, [userIdRef.current?.value]);

  const gets = () => {
    startTransition(async () => {
      const data = await getTodos(userIdRef.current?.value ?? '');
      setTodos(data);
    });
  };

  return (
    <>
      <h2 className='text-2xl'>Todos: {todos?.length}</h2>

      <form>
        <input
          ref={userIdRef}
          type='number'
          className='border'
          onChange={gets}
        />
      </form>

      {!isPending ? (
        <ul>
          {todos.length ? (
            todos.map((todo) => (
              <li key={todo.id}>
                <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
              </li>
            ))
          ) : (
            <>There is no Todos</>
          )}
        </ul>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
