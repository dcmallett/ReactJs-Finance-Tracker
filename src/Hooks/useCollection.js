import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';


export const useCollection = (collection, _query, _orderBy) => {
    //this will be used to store the documents we retrieve from the collection
    //i.e the transactions
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // If we don't use a ref --> than an infinite loop in useEffect will happen
    // _query is an array and is different on every function call.
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        //pass in collection we want to listen to
        //let = becuase we might update this reference in the future

        let ref = projectFirestore.collection(collection);

        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            //orderBy takes 2 args the propertyName and ascending or desc
            ref = ref.orderBy(...orderBy)
        }

        //fire a function for us everytime we get a snapshot back from the collection
        //we get a first snapshot.
        //everytime we perform an action i.e delete update etc we get a snapshot
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            //docs represents an array of documents form the snapshot
            snapshot.docs.forEach(doc => {
                //this results will push an object 
                //obj will contain all the document data
                //this id key prop is the id of the document in firestore
                results.push({...doc.data(), id: doc.id });
            });

            //update state
            setDocuments(results);
            setError(null);
        //onsnapshot we pass on a 2nd arg which is an error
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data');
        })

        //unsubscribe on unmount
        return () => unsubscribe()


    }, [collection, query, orderBy])

    return { documents, error }
}