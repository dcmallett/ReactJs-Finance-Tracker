import { Fragment, useState } from 'react';
import styles from './Login.module.css';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLoginFormHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <Fragment>
            <form onSubmit={submitLoginFormHandler} className={styles['login-form']}>
                <h2>Login</h2>
                <label>
                    <span>Email:</span>
                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                    />
                </label>
                <button className="btn">Login</button>
            </form>
        </Fragment>
    )
}

export default Login;