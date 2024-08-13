import {
  createContext,
  PropsWithChildren,
  // ReactNode,
  useContext,
  useReducer,
} from 'react';

const defCtx = {
  count: 0,
  plusCount: (_payload?: number) => {},
  minusCount: (_payload?: number) => {},
};

type CounterContextProps = typeof defCtx;

// type CounterContextProps = {
//   count: number;
//   plusCount: () => void;
//   minusCount: () => void;
// };

const CounterContext = createContext<CounterContextProps>(defCtx);

type Reducer = { type: string; payload: number };
const reducer = (count: number, { type, payload }: Reducer) => {
  if (type === 'plus') return count + payload;
  if (type === 'minus') return count - payload;
  return count;
};

// export const CounterProvider = ({ children }: { children: ReactNode }) => {
export const CounterProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);
  // // const plusCount = () => setCount(count + 1);
  // const plusCount = () => setCount((preCount) => preCount + 1);
  // const minusCount = () => setCount((preCount) => preCount - 1);
  // vs
  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = (payload: number = 1) =>
    dispatch({ type: 'plus', payload });
  const minusCount = (payload: number = 1) =>
    dispatch({ type: 'minus', payload });
  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
