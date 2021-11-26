// used to do 2 different things 
//Add new documents to a firestore collection || Remove documents from a fire store collection

import { useReducer, useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    //collection ref
    const ref = projectFirestore.collection(collection);

    //add a document
    const addDocument = async (doc) => {

    }

    //delete a document
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response }
}
