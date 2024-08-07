import { ReactNode, useState } from 'react';

type Props = {
  name?: string;
  age?: number;
  children: ReactNode;
};

export default function Hello({ name, age, children }: Props) {
  const [x, setX] = useState(10);

  return (
    <>
      <h2>
        Hello, {name} ({age}+{x})
      </h2>
      {children}
      <button onClick={() => setX((p) => p + 1)} className='btn-primary'>
        XXX
      </button>
    </>
  );
}
