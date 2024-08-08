import { FormEvent, RefObject, useRef, useState } from 'react';
import { Session } from '../App';
import Login, { LoginImperativeHandler } from './Login';
import Profile from './Profile';
import { FaPlus, FaRedo } from 'react-icons/fa';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (itemId: number) => void;
  addCartItem: (name: string, price: number) => void;
  addBtnRef: RefObject<HTMLButtonElement>;
  loginFnRef: RefObject<LoginImperativeHandler>;
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
  loginFnRef,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

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

    nameRef.current.value = '';
    priceRef.current.value = '0';
    setIsEditing(false);
  };

  const focus = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) ref.current.focus();
  };

  return (
    <div className='flex flex-col border border-red-300 p-1'>
      <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            <small className='text-gray-300'>{item.id}.</small> {item.name}
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

      {isEditing ? (
        <form onSubmit={addItem} className='mb-3 flex gap-2 border p-2'>
          <input
            type='text'
            ref={nameRef}
            placeholder='name...'
            className='border border-slate-500 focus:border-blue-300'
          />
          <input type='number' ref={priceRef} placeholder='price...' />
          <button onClick={() => setIsEditing(false)} className='btn'>
            <FaRedo />
          </button>
          <button ref={addBtnRef} type='submit' className='btn-primary'>
            <FaPlus />
          </button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)} className='btn mb-3'>
          +추가
        </button>
      )}

      <hr />
      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} ref={loginFnRef} />
      )}
    </div>
  );
};

export default My;
