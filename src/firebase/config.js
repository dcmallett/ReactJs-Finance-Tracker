import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

};


//init firebase
firebase.initializeApp(firebaseConfig);

//init server
//this const can be anything
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;


export { projectFirestore, projectAuth, timestamp }