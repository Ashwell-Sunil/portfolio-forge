import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Paste your Firebase web-app credentials here.
 * Console → Project settings → Your apps → SDK setup and configuration.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCDFLaDKk2oddzrvUEyEnjwtVcPj3vRYm4",
  authDomain: "protfolioforge.firebaseapp.com",
  projectId: "protfolioforge",
  storageBucket: "protfolioforge.firebasestorage.app",
  messagingSenderId: "96172063507",
  appId: "1:96172063507:web:16fb09dd41374ec725f8e6",
  measurementId: "G-7CQLJF5R4H"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null;
let auth = null;
let db = null;
let storage = null;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage, googleProvider };
