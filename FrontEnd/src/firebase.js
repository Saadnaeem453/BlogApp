// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-e0dda.firebaseapp.com",
    projectId: "mern-blog-e0dda",
    storageBucket: "mern-blog-e0dda.appspot.com",
    messagingSenderId: "103628907272",
    appId: "1:103628907272:web:38fdcc9436602e1dffc2bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);