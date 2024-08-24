const URL = 'https://jsonplaceholder.typicode.com';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export async function getTodos(userId: string) {
  // const res = await fetch(`${URL}?userId=${userId}`, { cache: 'force-cache' });
  // const res = await fetch(`${URL}?userId=${userId}`, { cache: 'no-store' });
  const res = await fetch(`${URL}/todos?userId=${userId}`, {
    next: { revalidate: 3 },
  });
  const todos: Todo[] = await res.json();
  // console.log('🚀  todos:', todos);

  return todos;
}

export async function getPhotos(albumId: string) {
  const res = await fetch(`${URL}/albums/${albumId}/photos`);
  const photos: Photo[] = await res.json();
  // console.log('🚀  todos:', todos);

  return photos;
}

export async function get<T>(id: string, path: string) {
  const res = await fetch(`${URL}/${path}/${id}`, {
    next: { revalidate: 5 },
  });
  if (res.status === 404) throw new Error(`${id} is Not Found!`);
  const data: T = await res.json();
  console.log('🚀  data:', data, path, id);
  return data;
}

export async function getTodo(todoId: string) {
  return get<Todo>(todoId, 'todos');
}

export async function getPhoto(photoId: string) {
  return get<Photo>(photoId, 'photos');
}
