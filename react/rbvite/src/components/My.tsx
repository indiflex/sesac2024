import { FormEvent, useRef } from 'react';
import { Session } from '../App';
import Login from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (name: string, price: number) => void;
  addBtnRef: React.RefObject<HTMLButtonElement>;
};

// const My = forwardRef(
//   (
//     { session, logout, login, removeCartItem, addCartItem }: Props,
//     addBtnRef
//   ) => {
const My = ({
  session,
  logout,
  login,
  removeCartItem,
  addCartItem,
  addBtnRef,
}: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    // let msg;
    if (!name) {
      alert('Input the name, plz');
      focus(nameRef);
      return;
    }

    if (!price) {
      alert('Input the price, plz');
      focus(priceRef);
      return;
    }

    addCartItem(name, +price);
  };

  const focus = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) ref.current.focus();
  };

  return (
    <div className='flex flex-col border border-red-300 p-1'>
      <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            {item.name}
            <small className='text-gray-500'>
              ({item.price.toLocaleString()})
            </small>
            <button
              onClick={() => removeCartItem(item.id)}
              className='ml-2 text-blue-500 hover:text-blue-300'
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={addItem} className='flex gap-2 border p-2'>
        <input
          type='text'
          ref={nameRef}
          placeholder='name...'
          className='border border-slate-500 focus:border-blue-300'
        />
        <input type='number' ref={priceRef} placeholder='price...' />
        <button ref={addBtnRef} type='submit' className='btn'>
          +
        </button>
      </form>

      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} />
      )}
    </div>
  );
};

export default My;
