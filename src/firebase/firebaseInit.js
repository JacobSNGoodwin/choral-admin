import firebase from 'firebase/app'; // main firebase component
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
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
const auditionsRef = db.collection('auditions');
const authRef = firebase.auth();
const storageRef = firebase.storage().ref();

export {
  db,
  performancesRef,
  adminsRef,
  authRef,
  storageRef,
  auditionsRef,
};
