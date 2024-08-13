import { ReactNode, useEffect, useState } from 'react';
import { useCounter } from '../hooks/counter-context';
import useFetch from '../hooks/fetch-hook';
import { User } from './My';

type Props = {
  name?: string;
  age?: number;
  children: ReactNode;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Hello({ name, children }: Props) {
  const [x, setX] = useState(10);
  const { count: user } = useCounter();
  const [userId, setUserId] = useState('');
  // const [userInfo, setUserInfo] = useState<User>();

  // const [postCnt, setPostCnt] = useState();
  const userInfo = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    [userId]
  );

  const posts = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=2`
  );

  // console.log('🚀  posts:', posts);

  // useEffect(() => {
  //   // if (!user) return;

  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   const fetchPosts = async () => {
  //     // console.log('fetchhhhhhhhhhh');
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts?userId=2`,
  //       { signal }
  //     );
  //     const data = await res.json();
  //     // console.log(user, '🚀  data:', data);
  //     setPostCnt(data.length);
  //   };
  //   fetchPosts();

  //   return () => controller.abort('Clean-Up');
  // }, []);

  let primitive = 123;
  useEffect(() => {
    // console.log('primitive>> ' + primitive);
    return () => console.log('정리!');
  }, [primitive]);

  const array = [1, 2, 3];
  useEffect(() => {
    // console.log('effect Array!!!');
  }, [array]);

  return (
    <>
      <h2>
        Hello, {name} ({user}+{x}) : 게시글 수는 {posts?.length}
      </h2>
      {children}
      <button onClick={() => setX((p) => p + 1)} className='btn-primary'>
        XXX
      </button>

      <div className='mb-3 border p-3'>
        <input
          type='number'
          onChange={(e) => setUserId(e.currentTarget.value)}
          className='w-16'
          placeholder='Id...'
        />
        {!!userInfo && (
          <div>
            username: {userInfo?.username}, email: {userInfo?.email}
          </div>
        )}
      </div>
    </>
  );
}
