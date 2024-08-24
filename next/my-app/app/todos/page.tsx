'use client';

import Modal from '@/components/Modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
import {
  FormEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { getTodos, Todo } from '@/lib/jsonplaceholder';

// function TodoModal(todo: Todo) {

// }

export default function Todos() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const userId = searchParams.get('userId');

  const [todos, setTodos] = useState<Todo[]>([]);
  const userIdRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isShowModal] = useReducer((pre) => !pre, false);

  const goTodo = (todoId: number) => {
    router.push(`${pathname}/${todoId}`);
  };

  const gets = (uid: string) => {
    startTransition(async () => {
      // const data = await getTodos(userIdRef.current?.value ?? '');
      const data = await getTodos(uid);
      setTodos(data);
    });
  };

  const setUserId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userIdRef.current || !userIdRef.current.value) return;

    // searchParams.set('userId', userIdRef.current.value);
    // searchParams.set('userX', userIdRef.current.value);
    // router.push(`${pathname}?${searchParams.toString()}`);

    gets(userIdRef.current.value);
    router.push(`${pathname}?userId=${userIdRef.current.value}`);
  };

  useEffect(() => {
    if (!userIdRef.current || !userId) return;
    userIdRef.current.value = userId;
    gets(userId);
  }, [userId]);

  return (
    <>
      <h2 className='text-2xl'>Todos: {todos?.length}</h2>

      <form onSubmit={(e) => setUserId(e)}>
        <input ref={userIdRef} type='number' className='border' />
      </form>

      {!isPending ? (
        <ul>
          {todos.length ? (
            todos.map((todo) => (
              <li key={todo.id}>
                {/* <Link href={`/todos/${todo.id}`}>{todo.title}</Link> */}
                <button onClick={() => goTodo(todo.id)} className='btn-primary'>
                  {todo.title}
                </button>
              </li>
            ))
          ) : (
            <>There is no Todos</>
          )}
        </ul>
      ) : (
        <>Loading...</>
      )}

      {isShowModal && (
        <Modal>
          <div className='bg-white w-96 h-96 flex items-center justify-center rounded-md'>
            Todo...
          </div>
        </Modal>
      )}
    </>
  );
}
