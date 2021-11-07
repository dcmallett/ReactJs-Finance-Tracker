import { Fragment, useState } from 'react';
import styles from './Signup.module.css';


const Signup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');


    const submitFormHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <Fragment>
            <form onSubmit={submitFormHandler} className={styles['signup-form']}>
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
                <label>
                    <span>Display Name:</span>
                    <input 
                    type="text" 
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                    />
                </label>
                <button className='btn'>Signup</button>
            </form>
        </Fragment>
    )
}

export default Signup;