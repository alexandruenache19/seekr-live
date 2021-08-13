import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import "firebase/performance"; // If you need it

const clientCredentials = {
  apiKey: "AIzaSyB7GQBB6eShF3FOUx1OpnCaMFYV4loQKW0",
  authDomain: "jurist-law.firebaseapp.com",
  databaseURL: "https://jurist-law-default-rtdb.firebaseio.com",
  projectId: "jurist-law",
  storageBucket: "jurist-law.appspot.com",
  messagingSenderId: "746275699840",
  appId: "1:746275699840:web:6946e5cdc34befae4cfa65",
  measurementId: "G-EEFM6N6DB6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // // Check that `window` is in scope for the analytics module!
  // if (typeof window !== 'undefined') {
  //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
  //   if ('measurementId' in clientCredentials) {
  //     firebase.analytics()
  //     firebase.performance()
  //   }
  // }
}

export default firebase;
