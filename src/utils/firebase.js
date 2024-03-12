// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../helpers/apiKeys";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBee_a4jljQ2pdNt7AuTgMupfStWUvCutk",
//   authDomain: "netflix-gpt-70a08.firebaseapp.com",
//   projectId: "netflix-gpt-70a08",
//   storageBucket: "netflix-gpt-70a08.appspot.com",
//   messagingSenderId: "258811736065",
//   appId: "1:258811736065:web:312175bb6f4154b11d9000",
//   measurementId: "G-QF6YXCV6HR",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
