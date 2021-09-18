import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import "firebase/performance"; // If you need it

const clientCredentials = {
  apiKey: "AIzaSyAhpfn4y_u8T8MT9sVXfrZ_Hq3gP3s7AOg",
  authDomain: "seekr-live.firebaseapp.com",
  databaseURL: "https://seekr-live-default-rtdb.firebaseio.com",
  projectId: "seekr-live",
  storageBucket: "seekr-live.appspot.com",
  messagingSenderId: "729457766335",
  appId: "1:729457766335:web:06ca5153842eef5357fb0a",
  measurementId: "G-6DPMN8B0MW"
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
