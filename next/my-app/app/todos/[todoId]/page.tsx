import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTodo, Todo } from '@/lib/todo';

export const revalidate = 10 * 1000;

type Params = { params: { todoId: string } };

export async function generateMetadata({
  params: { todoId },
}: Params): Promise<Metadata> {
  const todo: Todo = await getTodo(todoId);
  return {
    title: `ToDo - ${todo.title}`,
  };
}

export default async function Todo({ params }: Params) {
  const { todoId } = params;

  const todo = await getTodo(todoId);
  console.log('🚀  todo:', todo);
  console.log('*******>>', process.env.DB_URL, process.env.DB_PASSWD)

  if (!todo.id) notFound();

  return (
    <div className='border text-center'>
      <h2 className='text-3xl'>Todo: #{todoId}</h2>
      <p>
        <strong>{todo.title}</strong>
      </p>
      <p>completed: {todo.completed ? 'done' : 'not yet'}</p>
    </div>
  );
}
