import { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {
  login: (id: number, name: string) => void;
};

export type LoginImperativeHandler = {
  focusName: () => void;
};

const Login = forwardRef(({ login }: Props, ref) => {
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  // console.log('id, name ==>', id, name);

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  console.log('id, name ==>', idRef.current?.value, nameRef.current?.value);

  useImperativeHandle(ref, () => ({
    focusName() {
      nameRef.current?.focus();
    },
  }));

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const id = idRef.current?.value ?? 0;
    const name = nameRef.current?.value ?? '';
    login(+id, name);
  };

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
