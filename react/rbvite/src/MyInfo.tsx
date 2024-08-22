import { useRef } from 'react';
import { LoginImperativeHandler } from './components/Login';
import My from './components/My';

export default function MyInfo() {
  const loginFnRef = useRef<LoginImperativeHandler>(null);

  return <My loginFnRef={loginFnRef} />;
}
