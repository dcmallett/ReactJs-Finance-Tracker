// import create context to create the context
//import useReducer to handle our state
import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            //when the case matches 'login' we want to return a new state obj
            //we take the current state and spread it.
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state;
    }
}

export const AuthContextProvider = (props) => {
    //two intial arguments it takes is our reducer function and intial state
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
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