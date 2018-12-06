import firebase from 'firebase/app'; // main firebase component
import 'firebase/firestore';
import 'firebase/auth';
import config from './firebaseConfig';

firebase.initializeApp(config);

// Secondary app used for merely creating a new user without signing out current user
// Any database modification will need to be made by the default app
// This user will not be able to modify the list of admins as it has not permissions
const secondaryApp = firebase.initializeApp(config, 'Secondary');

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
const authRefForCreate = secondaryApp.auth();

export {
  db,
  performancesRef,
  adminsRef,
  authRef,
  authRefForCreate,
};
