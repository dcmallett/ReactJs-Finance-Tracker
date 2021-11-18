//package imports
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';
import { useAuthContext } from '../../Hooks/useAuthContext';

//file imports
import styles from './Navbar.module.css';
import { Fragment } from 'react';


const Navbar = (props) => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    Finance Tracker
                </li>

                {/* if we do not have a user logged  in return the template that shows the li links for login  / signup*/}
                {!user && (
                    <Fragment>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Signup</Link>
                        </li>
                    </Fragment>
                )}
   

                {user && (
                    <Fragment>
                        {/*shows the users display name when logged in */}
                        <li>
                            Hello, {user.displayName}
                        </li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </Fragment>
       
                )}
            </ul>
        </nav>
    )
}

export default Navbar;