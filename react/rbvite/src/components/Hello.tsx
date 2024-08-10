import { ReactNode, useEffect, useState } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name?: string;
  age?: number;
  children: ReactNode;
};

export default function Hello({ name, children }: Props) {
  const [x, setX] = useState(10);
  const { count: user } = useCounter();

  const [postCnt, setPostCnt] = useState();

  useEffect(() => {
    // if (!user) return;

    const controller = new AbortController();
    const { signal } = controller;
    const fetchPosts = async () => {
      // console.log('fetchhhhhhhhhhh');
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=2`,
        { signal }
      );
      const data = await res.json();
      // console.log(user, '🚀  data:', data);
      setPostCnt(data.length);
    };
    fetchPosts();

    return () => controller.abort('Clean-Up');
  }, []);

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
        Hello, {name} ({user}+{x}) : 게시글 수는 {postCnt}
      </h2>
      {children}
      <button onClick={() => setX((p) => p + 1)} className='btn-primary'>
        XXX
      </button>
    </>
  );
}
