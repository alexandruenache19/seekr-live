import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/database"; // If you need it
// import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import "firebase/performance"; // If you need it

const NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyAhpfn4y_u8T8MT9sVXfrZ_Hq3gP3s7AOg";
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "seekr-live.firebaseapp.com";
const NEXT_PUBLIC_FIREBASE_DATABASE_URL =
  "https://seekr-live-default-rtdb.firebaseio.com";
const NEXT_PUBLIC_FIREBASE_PROJECT_ID = "seekr-live";
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "seekr-live.appspot.com";
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "729457766335";
const NEXT_PUBLIC_FIREBASE_APP_ID = "1:729457766335:web:06ca5153842eef5357fb0a";
const NEXT_PUBLIC_FIREBASE_MEASUEREMENT_ID = "G-6DPMN8B0MW";

const clientCredentials = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: NEXT_PUBLIC_FIREBASE_MEASUEREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
