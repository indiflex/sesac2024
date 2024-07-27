import { ReactNode, useState } from 'react';

export default function Hello({
  name,
  age,
  children,
}: {
  name?: string;
  age?: number;
  children: ReactNode;
}) {
  const [x, setX] = useState(10);

  return (
    <>
      <h2>
        Hello, {name} ({age}+{x})
      </h2>
      {children}
      <button onClick={() => setX((p) => p + 1)}>XXX</button>
    </>
  );
}
