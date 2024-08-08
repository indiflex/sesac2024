import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';
import { flushSync } from 'react-dom';
import { LoginImperativeHandler } from './components/Login';

export type Session = {
  loginUser?: { id: number; name: string } | null;
  cart: { id: number; name: string; price: number }[];
};

const SampleSession: Session = {
  // loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

// custom hook
const useCount = (initValue: number) => {
  const [count, setCount] = useState(() => initValue + 1);
  return { count, setCount };
};

// function useStateX<T>(initValue: T | (() => T)) {
//   const obj = {
//     val: typeof initValue === 'function' ? initValue() : initValue,
//     get state() {
//       return this.val;
//     },
//     setState(val: T | ((pre) => void)) {
//       val = React.dispat();
//     },
//   };

//   return [obj.state, obj.setState];
// }

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
  const { count, setCount } = useCount(0);
  const [session, setSession] = useState<Session>(SampleSession);

  const addBtnRef = useRef<HTMLButtonElement>(null);
  const childFnRef = useRef<ChildHandler>(null);
  const loginFnRef = useRef<LoginImperativeHandler>(null);

  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  const login = (id: number, name: string) => {
    if (!name) {
      alert('Input the name!');
      loginFnRef.current?.focusName();
      return;
    }
    setSession({ ...session, loginUser: { id, name } });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
    setSession({
      ...session,
      cart: [...session.cart, { id, name, price }],
    });
  };

  return (
    <>
      <ChildComponent ref={childFnRef} age={count} />
      <button onClick={() => childFnRef.current?.f('XXX')} className='btn'>
        ChildFn
      </button>

      <Hello name='Jade' age={count}>
        <small>Hello Children</small>
      </Hello>

      {/* {session.loginUser?.name} */}
      <My
        session={session}
        logout={logout}
        login={login}
        removeCartItem={removeCartItem}
        addCartItem={addCartItem}
        addBtnRef={addBtnRef}
        loginFnRef={loginFnRef}
      />

      <button
        onClick={() => {
          // cf. setCount(count + 1)
          // setCount((count) => count + 1);
          // console.log('count111>>', count);

          flushSync(() => {
            setCount(count + 1);
            console.log('count111>>', count);
          });
          flushSync(() => {
            setCount(count + 1);
            console.log('count222>>', count);
          });
          // console.log('count222>>', count);
        }}
        className='btn-danger'
      >
        count is {count}
      </button>

      <button onClick={() => addBtnRef.current?.click()} className='btn ml-3'>
        addBtnRef
      </button>
    </>
  );
}

export default App;
