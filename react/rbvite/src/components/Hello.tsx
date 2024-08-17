import {
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-context';
import useFetch from '../hooks/fetch-hook';
import { User } from './My';
import LabelInput from './LabelInput';

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

function isFn(x: unknown): x is Function {
  return typeof x === 'function';
}

// const [s, set] = myState<S>(() => 1 * 100)
// const [s, set] = myState<number>(0)
// function myState<S, A = S, I = S>(init: I extends () => S ? () => S : S) {
function myState<S, A = S | ((pre: S) => S)>(init: S | (() => S)) {
  const reducer = (
    pre: S,
    action: A
    // action: A extends (pre: S) => S ? (pre: S) => S : S
  ) => (isFn(action) ? action(pre) : action) as S;
  // ) => (typeof action === 'function' ? action(pre) : action) as S;

  const initValue: S = isFn(init) ? init() : init;
  // const initValue: S = typeof init === 'function' ? init() : init;
  const [state, dispatch] = useReducer(reducer, initValue);

  return [state, dispatch] as const;
}
// dispatch(count + 1); or dispatch(pre => pre + 1);
// dispatch(action)

// function myReducer<>()

function Hello({ name, children }: Props) {
  // console.log('HELLLOOOOOOOOOOOOOOOOOO!!');
  // const [x, setX] = useState(10);
  // const [x, setX] = useState(() => 1 * 10);
  // [1,2,3].reduce( (acc, pre) => acc + pre, 0)
  const [x, plusX] = useReducer(
    (preX) => preX + 1, // preX + 1 is acc(x)
    1,
    (arg: number) => arg * 10
  ); // x is acc
  const { count: user } = useCounter();
  // const [userId, setUserId] = useState<string>(() => '');
  // const [userId, setUserId] = myState('');
  // const [userId, setUserId] = myState<string>(() => '');
  const [userId, setUserId] = myState(() => '');
  // const [userInfo, setUserInfo] = useState<User>();

  // const [postCnt, setPostCnt] = useState();
  const userInfo = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    [userId]
  );

  const posts = useFetch<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=2`
  );
  const postCnt = useMemo(() => {
    console.log('ppppppppp>>', posts?.length);
    return posts?.length;
  }, [posts]);

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
    console.log('primitive>> ' + primitive);
    return () => console.log('정리!');
  }, [primitive]);

  const array = useMemo(() => [1, 2, 3], []);
  useEffect(() => {
    console.log('effect Array!!!');
  }, [array]);

  const totArr = useMemo(() => array.reduce((acc, a) => acc + a, 0), []);
  // console.log('🚀  totArr:', totArr);

  function innerHook(x: number) {
    const [state, setState] = useState(x);
    return [state, setState] as const; // tuple
  }

  const [ih, setIh] = innerHook(100);

  return (
    <>
      <h2>
        {ih} - Hello, {name} ({user}+{x}) : 게시글 수는 {postCnt} :: {totArr}
      </h2>
      {children}
      {/* <button onClick={() => setX(x => x + 1)} className='btn-primary'> */}
      {/* <button onClick={plusX} className='btn-primary'> */}
      <button onClick={plusX} className='btn-primary'>
        XXX
      </button>
      <button onClick={() => setIh(1000)} className='btn-primary'>
        YYY
      </button>

      <div className='mb-3 border p-3'>
        <LabelInput label='User ID' type='number' className='w-24' />
        {!!userInfo && (
          <div>
            username: {userInfo?.username}, email: {userInfo?.email}
          </div>
        )}
      </div>
    </>
  );
}

const MemoedHello = memo(Hello, ({ name: a }, { name: b }) => {
  console.log('🚀  a, b:', a, b, a === b);
  return a === b;
});

// export default MemoedHello;
export { Hello, MemoedHello };
