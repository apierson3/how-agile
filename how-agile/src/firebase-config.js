// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8hAWk4xWaSAoOVF2p6Wshfna5KW0JxTU",
  authDomain: "how-agile.firebaseapp.com",
  projectId: "how-agile",
  storageBucket: "how-agile.firebasestorage.app",
  messagingSenderId: "9814075305",
  appId: "1:9814075305:web:ad431fa424faac760906b8",
  measurementId: "G-8F2HV2Z4JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();