// used to do 2 different things 
//Add new documents to a firestore collection || Remove documents from a fire store collection

import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            //takes all of our intialState props and add them to the obj
            //now we need to update the individual ones we want to change
            return { success: false, isPending: true, document: null, error: null }
        case 'ERROR': 
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'ADDED_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null }
        default:
            return state;
    }
}

//accepting the collection we want to work with. we use collection 
//so we can make the hook more reusable.
export const useFirestore = (collection) => {
    //useReducer response will represent the response we get back from firestore
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    //collection ref
    const ref = projectFirestore.collection(collection);

    //only dispatch if not cancelled
    //wrapping the dispatch inside this check. SO now we can call this function and pass in the action
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    //add a document
    //we pass in the document we want to add
    //save the obj as a firestore document
    const addDocument = async (doc) => {
        //do not need a payload as there is no data. Just need to return it to be true
        dispatch({ type: 'IS_PENDING' });
        
        try {
            //takes current D&T
            const createdAt = timestamp.fromDate(new Date());
            //represent whatever doc we want to save so we pass in the doc
            //later on the dispatch we add the addedDOcuments as the payload for reference in the future
            const addedDocuments = await ref.add({...doc, createdAt});
            //only updateState when the component using this hook is not on the page
            //when its not unmounted
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocuments })

        }
        catch(err) {
            //passing the error into the fire store reducer
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    //pass in the id of the document we want to delete to make the delete request
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response }
}
