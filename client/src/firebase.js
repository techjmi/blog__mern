// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzK7fZbUkxL0kc6p-prmF-4G75x4Eu6eA",
// apiKey:process.env.FIRE_BASE_API_KEY,
  authDomain: "mern-blog-577e2.firebaseapp.com",
  projectId: "mern-blog-577e2",
  storageBucket: "mern-blog-577e2.appspot.com",
  messagingSenderId: "260069015508",
  appId: "1:260069015508:web:042c48b0bc49cb91236041",
  measurementId: "G-FBL3KQDQHH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);