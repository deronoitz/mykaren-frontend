import firebase from 'firebase';
import config from "./config"
// const {
//     NEXT_PUBLIC_FIREBASE_API_KEY,
//     NEXT_PUBLIC_AUTH_DOMAIN,
//     NEXT_PUBLIC_DATABASE_URL,
//     NEXT_PUBLIC_PROJECT_ID,
//     NEXT_PUBLIC_STORAGE_BUCKET,
//     NEXT_PUBLIC_MESSAGING_SENDER_ID,
//     NEXT_PUBLIC_APP_ID,
//     NEXT_PUBLIC_MEASUREMENT_ID,
// } = process && process.env;

// export const firebaseConfig = {
//     apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
//     databaseURL: NEXT_PUBLIC_DATABASE_URL,
//     projectId: NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
//     appId: NEXT_PUBLIC_APP_ID,
//     measurementId: NEXT_PUBLIC_MEASUREMENT_ID,
// };

const firebase_app = !firebase.apps.length && firebase.initializeApp(config);
export default firebase_app