//package imports
import { Link } from 'react-router-dom';

//file imports
import styles from './Navbar.module.css';


const Navbar = (props) => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    Finance Calc
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Signup</Link>
                </li>
                
            </ul>
        </nav>
    )
}

export default Navbar;