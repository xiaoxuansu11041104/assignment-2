// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxvommNPmXy8iU17lEFV9Z5mhHgCQiyfI",
  authDomain: "assignment-2-31ab4.firebaseapp.com",
  projectId: "assignment-2-31ab4",
  storageBucket: "assignment-2-31ab4.appspot.com",
  messagingSenderId: "873186630268",
  appId: "1:873186630268:web:ff15a55b1d10b698e887f9",
  measurementId: "G-30ZTL9R7E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const database = getFirestore(app);