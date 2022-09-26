// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXjXIorhc09FWUFzxduxnFaveZlIC8h2g",
  authDomain: "kemaslakhatan.firebaseapp.com",
  projectId: "kemaslakhatan",
  storageBucket: "kemaslakhatan.appspot.com",
  messagingSenderId: "772969193522",
  appId: "1:772969193522:web:c7448bd0ab487647529c2b",
  measurementId: "G-Q6EEHN1LZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}