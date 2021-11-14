import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../Hooks/useAuthContext';


export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        //resetting the error back to null. so if a mistake is made it resets the error each time they sign up
        setError(null);
        setIsPending(true);
        
        try {
            //signup
            //reaches out to firebase auth and tries to sign the user up with an email and password
            //and returns a response
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            //the user it just created.
        
            if (!res) {
                throw new Error ('Could not complete signup');
            }

            //add display name to user
            //1. we create the user then we need to update the profile
            //so we can add a display name for the user
            await res.user.updateProfile({ displayName });

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            //reset is pending and error to null
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }

        }
        catch(err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                //set is pending to false so if we get somthing back we do not need to load any more
                setIsPending(false);
            }
        }
    }

    //clean up function
    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, [])
    
    return { signup, error, isPending}
}