// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIy_SdBHZSO1wXePLeR4NY3UdGP2w-SsQ",
  authDomain: "twitter-80de7.firebaseapp.com",
  projectId: "twitter-80de7",
  storageBucket: "twitter-80de7.appspot.com",
  messagingSenderId: "822154473571",
  appId: "1:822154473571:web:87d47c2a013331ff5d8856",
  measurementId: "G-91KRWG0PJF",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
