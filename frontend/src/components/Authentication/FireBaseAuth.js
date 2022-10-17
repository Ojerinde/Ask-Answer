// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ4Jly_L7UeoeftwFIcBdapOChLkVl6C8",
  authDomain: "ask-answer-joel.firebaseapp.com",
  projectId: "ask-answer-joel",
  storageBucket: "ask-answer-joel.appspot.com",
  messagingSenderId: "756671972339",
  appId: "1:756671972339:web:798ac2e9e8f18c0df94886",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export { app, auth, provider, signInWithRedirect, onAuthStateChanged, signOut };
