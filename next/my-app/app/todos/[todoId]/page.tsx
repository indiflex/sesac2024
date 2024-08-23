import { getTodo } from '@/lib/todo';

export default async function Todo({ params }: { params: { todoId: string } }) {
  const { todoId } = params;
  const todo = await getTodo(todoId);
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
