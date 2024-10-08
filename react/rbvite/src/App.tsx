import { forwardRef, useImperativeHandle, useRef } from 'react';
import './App.css';
import { MemoedHello } from './components/Hello';
import { flushSync } from 'react-dom';
import { useCounter } from './hooks/counter-context';
import StateReduce from './components/StateReduce';

// custom hook
// const useCount = (initValue: number) => {
//   const [count, setCount] = useState(() => initValue + 1);
//   const plusCount = () => setCount((preCount) => preCount + 1);
//   return { count, plusCount };
// };

type ChildHandler = {
  f: (s: string) => void;
};

const ChildComponent = forwardRef(({ age }: { age: number }, ref) => {
  const handler = {
    f(s: string) {
      console.log('s=', s);
    },
  };
  useImperativeHandle(ref, () => handler);
  return <div className='border'>age: {age}</div>;
});

function App() {
  // const { count, plusCount } = useCount(0);
  const { count, plusCount } = useCounter();

  const childFnRef = useRef<ChildHandler>(null);

  return (
    <>
      <StateReduce />
      <ChildComponent ref={childFnRef} age={count} />
      <button onClick={() => childFnRef.current?.f('XXX')} className='btn'>
        ChildFn
      </button>

      <MemoedHello name='Jade'>
        <small>Hello Children</small>
      </MemoedHello>

      <button
        onClick={() => {
          // cf. setCount(count + 1)
          // setCount((count) => count + 1);
          // console.log('count111>>', count);

          flushSync(() => {
            plusCount();
            console.log('count111>>', count);
          });
          flushSync(() => {
            plusCount();
            console.log('count222>>', count);
          });
          // console.log('count222>>', count);
        }}
        className='btn-danger'
      >
        count is {count}
      </button>
    </>
  );
}

export default App;
