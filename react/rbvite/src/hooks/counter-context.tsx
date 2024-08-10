import {
  createContext,
  PropsWithChildren,
  // ReactNode,
  useContext,
  useState,
} from 'react';

const defCtx = {
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
};

type CounterContextProps = typeof defCtx;

// type CounterContextProps = {
//   count: number;
//   plusCount: () => void;
//   minusCount: () => void;
// };

const CounterContext = createContext<CounterContextProps>(defCtx);

// export const CounterProvider = ({ children }: { children: ReactNode }) => {
export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  // const plusCount = () => setCount(count + 1);
  const plusCount = () => setCount((preCount) => preCount + 1);
  const minusCount = () => setCount((preCount) => preCount - 1);
  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
