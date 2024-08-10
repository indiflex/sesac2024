import { useSession } from '../hooks/session-context';

export default function Profile() {
  const {
    session: { loginUser },
    logout,
  } = useSession();
  return (
    <>
      <h1>{loginUser?.name}</h1>
      <button onClick={logout} className='btn-primary mt-3'>
        SignOut
      </button>
    </>
  );
}
