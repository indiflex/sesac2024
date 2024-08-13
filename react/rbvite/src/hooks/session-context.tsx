import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

const SampleSession = {
  loginUser: null,
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type Session = {
  loginUser: { id: number; name: string } | null;
  cart: typeof SampleSession.cart;
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

const SessionContext = createContext<SessionContextProps>(defaultSession);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(SampleSession);

  const logout = useCallback(() => {
    setSession({ ...session, loginUser: null });
  }, []);

  const login = useCallback((id: number, name: string) => {
    setSession({ ...session, loginUser: { id, name } });
  }, []);

  const removeCartItem = useCallback((itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  }, []);

  const saveCartItem = useCallback(
    (id: number, name: string, price: number) => {
      if (id !== 0) {
        setSession({
          ...session,
          cart: [
            ...session.cart.map((item) =>
              item.id === id ? { id, name, price } : item
            ),
          ],
        });
      } else {
        id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
        setSession({
          ...session,
          cart: [...session.cart, { id, name, price }],
        });
      }
    },
    []
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
