import { useState } from 'react';
import projectAuth from '../firebase/config';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

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
            console.log(res.user);

            if (!res) {
                throw new Error ('Could not complete signup');
            }

            //add display name to user
            //1. we create the user then we need to update the profile
            //so we can add a display name for the user
            await res.user.updateProfile({ displayName });


            //reset is pending and error to null
            setIsPending(false);
            setError(null);
        }
        catch(err) {
            console.log(err.message);
            setError(err.message);
            //set is pending to false so if we get somthing back we do not need to load any more
            setIsPending(false);
        }
    }
    
    return { signup, error, isPending}
}