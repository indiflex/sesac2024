import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hello name='Jade' age={33}>
        <strong>ccc</strong>
      </Hello>

      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
