const URL = 'https://jsonplaceholder.typicode.com/todos/';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos() {
  const res = await fetch(URL);
  const todos: Todo[] = await res.json();
  // console.log('🚀  todos:', todos);

  return todos;
}

export async function getTodo(todoId: string) {
  const res = await fetch(`${URL}/${todoId}`);
  const todo: Todo = await res.json();

  return todo;
}
