// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0JQdJTDxLoKRym1Pqa4zoxeVh3TlLoQ8",
  authDomain: "queue-interest.firebaseapp.com",
  projectId: "queue-interest",
  storageBucket: "queue-interest.appspot.com",
  messagingSenderId: "79849674144",
  appId: "1:79849674144:web:b12eeb5215c24e5c1ac0c5",
  measurementId: "G-5TJ0B7GSB5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
