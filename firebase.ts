// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpM3DWJezMnxhIq2zQSmQC26CCPV8Og24",
  authDomain: "bitgin-hw.firebaseapp.com",
  projectId: "bitgin-hw",
  storageBucket: "bitgin-hw.appspot.com",
  messagingSenderId: "62268577156",
  appId: "1:62268577156:web:a77f0a2b176ca7ff83b9d1",
  measurementId: "G-MC1M9J7EZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
