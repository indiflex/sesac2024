import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
} from 'react';
import useFetch from './fetch-hook';

// const SampleSession = {
//   loginUser: null,
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };

type LoginUser = { id: number; name: string } | null;
type Cart = { id: number; name: string; price: number }[];
type Session = {
  loginUser: LoginUser;
  cart: Cart;
};

const SKEY = 'MY-SESSION1';

const getStorage = () => {
  const loginUser = JSON.parse(sessionStorage.getItem(SKEY) ?? 'null');
  const cart = JSON.parse(localStorage.getItem(SKEY) ?? '[]');

  return { loginUser, cart };
};
const setStorage = (session: Session) => {
  // if (!session )
  const { loginUser, cart } = session;
  sessionStorage.setItem(SKEY, JSON.stringify(loginUser));
  localStorage.setItem(SKEY, JSON.stringify(cart));
};

type SessionContextProps = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

const defaultSession: SessionContextProps = {
  session: { loginUser: null, cart: [] },
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
};

type Reducer =
  | { type: 'logout'; payload: null }
  | { type: 'login'; payload: LoginUser }
  | { type: 'removeCartItem'; payload: number }
  | { type: 'saveCartItem'; payload: Cart }
  | { type: 'Initialize'; payload: Session };

const reducer = (session: Session, { type, payload }: Reducer) => {
  let _session;
  switch (type) {
    case 'logout':
      _session = { ...session, loginUser: null };
      break;
    case 'login':
      _session = { ...session, loginUser: payload };
      break;
    case 'removeCartItem':
      _session = {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
      break;
    case 'saveCartItem':
      console.log('🚀  payload:', payload);

      _session = {
        ...session,
        cart: payload,
      };
      break;
    case 'Initialize':
      _session = payload;
      break;
    default:
      return session; // bailout(skip)
  }
  setStorage(_session);
  return _session;
};

const SessionContext = createContext<SessionContextProps>(defaultSession);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  // const [session, setSession] = useState<Session>(SampleSession);
  // - !storage.loginUser && !storage.cart.length ? SampleSession : storage
  const storage = getStorage();
  const [session, dispatch] = useReducer(reducer, storage);

  const data = useFetch<Session>('/data/sample.json');
  useLayoutEffect(() => {
    if (!data) return;
    dispatch({ type: 'Initialize', payload: data });
  }, [data]);

  const logout = useCallback(() => {
    // setSession({ ...session, loginUser: null });
    dispatch({ type: 'logout', payload: null });
  }, []);

  const login = useCallback((id: number, name: string) => {
    // setSession({ ...session, loginUser: { id, name } });
    dispatch({ type: 'login', payload: { id, name } });
  }, []);

  const removeCartItem = useCallback((itemId: number) => {
    // setSession({
    //   ...session,
    //   cart: session.cart.filter((item) => item.id !== itemId),
    // });
    dispatch({ type: 'removeCartItem', payload: itemId });
  }, []);

  const saveCartItem = useCallback(
    (id: number, name: string, price: number) => {
      let payload;
      if (id !== 0) {
        payload = [
          ...session.cart.map((item) =>
            item.id === id ? { id, name, price } : item
          ),
        ];
      } else {
        id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
        payload = [...session.cart, { id, name, price }];
      }
      dispatch({ type: 'saveCartItem', payload });
    },
    [session]
  );

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        saveCartItem,
        removeCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
