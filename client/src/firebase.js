import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stackjobs-login.firebaseapp.com",
  projectId: "stackjobs-login",
  storageBucket: "stackjobs-login.firebasestorage.app",
  messagingSenderId: "391922359657",
  appId: "1:391922359657:web:6f509f1426352dcfab71f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}