import { Reducer, useReducer } from 'react';

const reducer2 = (pre: number, offset: number) => pre + offset;

function myReducer(reducer: Reducer);

export default function StateReduce() {
  const [count, plusCount] = useReducer((pre) => pre + 1, 0);
  const [count2, plusCount2] = useReducer(reducer2, 0);

  return (
    <div className='flex flex-wrap justify-between'>
      <button onClick={plusCount} className='btn-primary'>
        {count} - plus
      </button>
      <button onClick={() => plusCount2(10)} className='btn-primary mx-2'>
        {count2} - plus2
      </button>
    </div>
  );
}
