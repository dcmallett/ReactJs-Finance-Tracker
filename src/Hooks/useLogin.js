import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../Hooks/useAuthContext';

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true)

        //try 
        try {
            //login
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            //dispatch login action
            //when we sign in we get a response. on the response we get a user obj
            //the payload for the dispatch is the user.
            dispatch({ type: 'LOGIN', payload: res.user})


            //set the state
            if (!isCancelled) {
                setIsPending(false);
                setError(null)
            }
        }

        //catch
        catch(err) {
            if(!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

    }

    useEffect(() => {
        setIsCancelled(true);
    }, [])

    return { login, isPending, error }

}

