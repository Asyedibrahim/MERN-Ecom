// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ecom-66142.firebaseapp.com",
  projectId: "mern-ecom-66142",
  storageBucket: "mern-ecom-66142.appspot.com",
  messagingSenderId: "633570726758",
  appId: "1:633570726758:web:f0fe655304076969eaeea7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);