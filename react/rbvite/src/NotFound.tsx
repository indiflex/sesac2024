import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <strong>{location.pathname}</strong> 을 페이지를 찾을 수 없습니다!
      </div>
      <div className='mt-3 text-center'>
        <button onClick={() => navigate('/')} className='btn-primary'>
          Go Home
        </button>
      </div>
    </>
  );
}
