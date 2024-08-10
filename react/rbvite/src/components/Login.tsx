import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useCounter } from '../hooks/counter-context';
import { useSession } from '../hooks/session-context';

export type LoginImperativeHandler = {
  focusName: () => void;
};

const Login = forwardRef((_, ref) => {
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  // console.log('id, name ==>', id, name);

  const { login } = useSession();

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // console.log('id, name ==>', idRef.current?.value, nameRef.current?.value);

  const { plusCount, minusCount } = useCounter();

  useImperativeHandle(ref, () => ({
    focusName() {
      nameRef.current?.focus();
    },
  }));

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const id = idRef.current?.value ?? 0;
    const name = nameRef.current?.value ?? '';
    if (!name) {
      alert('Input the name!');
      nameRef.current?.focus();
      return;
    }
    login(+id, name);
    minusCount();
  };

  // useEffect(() => {
  //   plusCount();
  //   const intl = setInterval(() => console.log('Login.setInterval!!'), 1000);

  //   return () => clearInterval(intl);
  // }, []);

  useEffect(() => {
    plusCount();
    const timer = setTimeout(() => console.log('Login.setTimeout!!'), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='border-2'>
      <h1 className='text-2xl'>SignIn: {idRef.current?.value}</h1>
      <form onSubmit={submitHandle}>
        <input
          type='number'
          id='id'
          ref={idRef}
          defaultValue={100}
          // onChange={(e) => setId(+e.currentTarget.value)}
          // onChange={(e) =>
          //   console.log(
          //     'XX>>',
          //     e.currentTarget.value,
          //     document.getElementById('id')?.value,
          //     idRef.current?.value
          //   )
          // }
          placeholder='IDNum...'
        />
        <input
          type='text'
          ref={nameRef}
          // onChange={(e) => setName(e.currentTarget.value)}
          placeholder='Name...'
          className='ml-2'
        />
        <button type='submit' className='btn-primary'>
          SignIn
        </button>
      </form>
    </div>
  );
});

export default Login;
