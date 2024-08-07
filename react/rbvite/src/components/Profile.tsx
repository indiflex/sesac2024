import { Session } from '../App';

type Props = {
  session: Session;
  logout: () => void;
};

export default function Profile({ session: { loginUser }, logout }: Props) {
  return (
    <>
      <h1>{loginUser?.name}</h1>
      <button onClick={logout} className='btn-primary mt-3'>
        SignOut
      </button>
    </>
  );
}
