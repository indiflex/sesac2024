'use client';

import { useEffect, useState } from 'react';

export default function CSR() {
  console.log('********');
  const dt = new Date().toString();
  const [dtStr, setDtStr] = useState('');
  useEffect(() => setDtStr(dt), [dt]);
  return (
    <>
      <h3 className='text-3xl'>CSR</h3>
      <p>This is client page: {dtStr}</p>
    </>
  );
}
