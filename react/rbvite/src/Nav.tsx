import { clsx } from 'clsx';
import { Link, NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul className='flex justify-around'>
        <li>
          <Link to='/' className='btn' replace>
            Home
          </Link>
        </li>
        <li>
          <NavLink
            to='/myinfo'
            className={({ isActive }) => clsx(isActive ? 'btn-primary' : 'btn')}
            // style={({ isActive }) => (isActive ? { color: 'red' } : {})}
          >
            MyInfo
          </NavLink>
        </li>
      </ul>
      <hr className='mb-3' />
    </nav>
  );
}
