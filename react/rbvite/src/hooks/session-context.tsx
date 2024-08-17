import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from 'react';

const SampleSession = {
  loginUser: null,
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type LoginUser = { id: number; name: string } | null;
type Cart = typeof SampleSession.cart;
type Session = {
  loginUser: LoginUser;
  cart: Cart;
};

type SessionContextProps = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

const defaultSession: SessionContextProps = {
  session: SampleSession,
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
};

type Reducer =
  | { type: 'logout'; payload: null }
  | { type: 'login'; payload: LoginUser }
  | { type: 'removeCartItem'; payload: number }
  | { type: 'saveCartItem'; payload: Cart };

const reducer = (session: Session, { type, payload }: Reducer) => {
  switch (type) {
    case 'logout':
      return { ...session, loginUser: null };
    case 'login':
      return { ...session, loginUser: payload };
    case 'removeCartItem':
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
    case 'saveCartItem':
      console.log('🚀  payload:', payload);

      return {
        ...session,
        cart: payload,
      };
    default:
      return session; // bailout(skip)
  }
  return session;
};

const SessionContext = createContext<SessionContextProps>(defaultSession);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  // const [session, setSession] = useState<Session>(SampleSession);
  const [session, dispatch] = useReducer(reducer, SampleSession);

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
