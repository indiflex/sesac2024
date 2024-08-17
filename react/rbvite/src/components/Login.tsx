import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useCounter } from '../hooks/counter-context';
// import { useSession } from '../hooks/session-context';
import useTimer from '../hooks/timer-hook';

export type LoginImperativeHandler = {
  focusName: () => void;
};

type Props = {
  login: (id: number, name: string) => void;
};

const Login = forwardRef(({ login }: Props, ref) => {
  console.log('LOOOOOOOOGIN!!');
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  // console.log('id, name ==>', id, name);

  // const { login } = useSession(); // for memo

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  // console.log('id, name ==>', idRef.current?.value, nameRef.current?.value);

  const { plusCount, minusCount } = useCounter();

  useImperativeHandle(ref, () => ({
    focusName() {
      nameRef.current?.focus();
    },
  }));

  useEffect(() => {
    console.log('fnnnnnnnn!!');
  }, [login]);

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

  useEffect(() => {
    plusCount();
    //   const intl = setInterval(() => console.log('Login.setInterval!!'), 1000);

    //   return () => clearInterval(intl);
  }, []);

  const { useTimeout } = useTimer();

  useTimeout(() => console.log('Login.setTimeout!!'), 1000);

  // useEffect(() => {
  //   plusCount();
  //   const timer = setTimeout(() => console.log('Login.setTimeout!!'), 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
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

      <div className='flex justify-center gap-3'>
        <button onClick={() => plusCount(3)} className='btn'>
          +
        </button>
        <button onClick={() => minusCount(3)} className='btn'>
          -
        </button>
      </div>
    </>
  );
});

const MemoedLogin = memo(Login, () => true);

export default MemoedLogin;
