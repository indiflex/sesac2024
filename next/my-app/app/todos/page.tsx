'use client';

import Modal from '@/components/Modal';
// import Link from 'next/link';
import { useReducer, useRef, useState, useTransition } from 'react';
import { getTodos, Todo } from '@/lib/todo';

// function TodoModal(todo: Todo) {

// }

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const userIdRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isShowModal, toggleModal] = useReducer((pre) => !pre, false);

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
                {/* <Link href={`/todos/${todo.id}`}>{todo.title}</Link> */}
                <button onClick={toggleModal} className='btn-primary'>
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
