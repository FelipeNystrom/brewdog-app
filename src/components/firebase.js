import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA5lB3mGIAdmMVQ7-RweGdfboH6xCAKukk',
  authDomain: 'beerit-5467d.firebaseapp.com',
  databaseURL: 'https://beerit-5467d.firebaseio.com',
  projectId: 'beerit-5467d',
  storageBucket: 'beerit-5467d.appspot.com',
  messagingSenderId: '1099455670322'
};
firebase.initializeApp(config);
export default firebase;
