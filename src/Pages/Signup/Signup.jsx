import { Fragment, useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from '../../Hooks/useSignup';

const Signup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    //initalizing the hook
    const { signup, isPending, error } = useSignup(); 

    const submitFormHandler = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
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
                {!isPending &&<button className='btn'>Signup</button>}
                    {/*while is pending is true we want to disable the button */}
                {isPending && <button className='btn' disabled>Please wait</button>}

                {error && <p>{error}</p>}
            </form>
        </Fragment>
    )
}

export default Signup;