const URL = 'https://jsonplaceholder.typicode.com/todos';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos(userId: string) {
  // const res = await fetch(`${URL}?userId=${userId}`, { cache: 'force-cache' });
  // const res = await fetch(`${URL}?userId=${userId}`, { cache: 'no-store' });
  const res = await fetch(`${URL}?userId=${userId}`, {
    next: { revalidate: 3 },
  });
  const todos: Todo[] = await res.json();
  // console.log('🚀  todos:', todos);

  return todos;
}

export async function getTodo(todoId: string) {
  // const res = await fetch(`${URL}/${todoId}`);
  const res = await fetch(`${URL}/${todoId}`, {
    next: { revalidate: 5 },
  });
  // console.log('🚀  res:', res);
  if (res.status === 404) throw new Error(`${todoId} is Not Found!`);
  const todo: Todo = await res.json();

  return todo;
}
