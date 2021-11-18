// import create context to create the context
//import useReducer to handle our state
import { createContext, useReducer, useEffect } from 'react';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            //when the case matches 'login' we want to return a new state obj
            //we take the current state and spread it.
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true}
        default:
            return state;
    }
}

export const AuthContextProvider = (props) => {
    //two intial arguments it takes is our reducer function and intial state
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        //perform a check to see if we already have a user logged in
        authIsReady: false
    });

    //check to see if a component is first evaluated
    useEffect(() => {
        //communicates when firebase when there is some change in the communication status.
        //so if the user is logged in or not.
        //returns a function which is stored in unsub. so it unsubcribes from this function
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user})
            unsub();
        })
    }, [])



    console.log('AuthContext state:', state)

    return (
        //we add a vlaue obj and spread out the different properties in state
        //and add the dispatch funtion we can use the this inside the hooks directly 
        //to update our context values
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}