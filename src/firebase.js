
import { initializeApp } from "firebase/app";
import {getAuth} from  'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgGs6O08e3WhrxRkIy89yauYueJ7mgXyQ",
  authDomain: "chatyasir2.firebaseapp.com",
  projectId: "chatyasir2",
  storageBucket: "chatyasir2.appspot.com",
  messagingSenderId: "369476459117",
  appId: "1:369476459117:web:d9db1c7f90163de626fd64",
  measurementId: "G-3WRGBHVR9Q"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();