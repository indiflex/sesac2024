import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import Login, { LoginImperativeHandler } from './Login';
import Profile from './Profile';
import { FaCheck, FaPlus, FaRedo, FaSave } from 'react-icons/fa';
import { useSession } from '../hooks/session-context';

type Props = {
  loginFnRef: RefObject<LoginImperativeHandler>;
};

type Item = {
  id: number;
  name: string;
  price: number;
};

// const My = forwardRef(
//   (
//     { session, logout, login, removeCartItem, addCartItem }: Props,
//     addBtnRef
//   ) => {
const My = ({ loginFnRef }: Props) => {
  const { session, removeCartItem, saveCartItem } = useSession();

  // const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [hasDirty, setDirty] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const checkDirty = () => {
    if (!editingItem || !nameRef.current || !priceRef.current) return;

    setDirty(
      editingItem.name !== nameRef.current.value ||
        editingItem.price !== Number(priceRef.current.value)
    );
  };

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    // console.log('xxxxxxxxxxxxx', editingItem?.id);
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    console.log('🚀  name:', name);

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

    saveCartItem(editingItem!.id, name, +price);

    nameRef.current.value = '';
    priceRef.current.value = '0';
    // setIsEditing(false);
    setEditingItem(null);
  };

  const focus = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) ref.current.focus();
  };

  const setEditing = (item: Item) => {
    // setIsEditing(true);
    setEditingItem(item);
  };

  useEffect(() => {
    if (editingItem) {
      if (nameRef.current) nameRef.current.value = editingItem.name;
      if (priceRef.current) priceRef.current.value = String(editingItem.price);
      nameRef.current?.focus();
    }
  }, [editingItem]);

  return (
    <div className='flex flex-col border border-red-300 p-1'>
      <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            <small className='text-gray-300'>{item.id}.</small>
            <a
              href='#'
              onClick={() => setEditing(item)}
              className='cursor-pointer hover:text-slate-500'
            >
              {item.name}
            </a>
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

      {editingItem ? (
        <form onSubmit={addItem} className='mb-3 flex gap-2 border p-2'>
          <input
            type='text'
            ref={nameRef}
            onChange={checkDirty}
            placeholder='name...'
            className='border border-slate-500 focus:border-blue-300'
          />

          <input
            type='number'
            ref={priceRef}
            onChange={checkDirty}
            placeholder='price...'
          />
          <button
            type='reset'
            onClick={(e) => {
              e.preventDefault();
              // setEditingItem(null);
              console.log('aaa>>', editingItem);
              if (nameRef.current && priceRef.current) {
                nameRef.current.value = editingItem.name;
                priceRef.current.value = String(editingItem.price);
              }
            }}
            className='btn'
          >
            <FaRedo />
          </button>
          {hasDirty && (
            <button type='submit' className='btn-primary'>
              {editingItem?.id ? <FaCheck /> : <FaPlus />}
            </button>
          )}
        </form>
      ) : (
        <button
          onClick={() => setEditingItem({ id: 0, name: '', price: 1000 })}
          className='btn mb-3'
        >
          +추가
        </button>
      )}

      <hr />
      {session.loginUser ? <Profile /> : <Login ref={loginFnRef} />}
    </div>
  );
};

export default My;
