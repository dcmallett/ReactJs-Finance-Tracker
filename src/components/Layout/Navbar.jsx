//package imports
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';

//file imports
import styles from './Navbar.module.css';


const Navbar = (props) => {

    const { logout } = useLogout();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    Finance Tracker
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Signup</Link>
                </li>
                <li>
                    <button className='btn' onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;