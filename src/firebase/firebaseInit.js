import firebase from 'firebase/app'; // main firebase component
import 'firebase/firestore';
import 'firebase/auth';
import config from './firebaseConfig';

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

const performancesRef = db.collection('performances');
const adminsRef = db.collection('admins');
const authRef = firebase.auth();
// second ref that allows us to create a new user without singning current user out
const authRefForCreate = firebase.auth();

export {
  db,
  performancesRef,
  adminsRef,
  authRef,
  authRefForCreate,
};
