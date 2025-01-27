// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVyMZB25uVZoQmdRrSai-JftbWFgEUYsg",
  authDomain: "acheev-app.firebaseapp.com",
  projectId: "acheev-app",
  storageBucket: "acheev-app.appspot.com",
  messagingSenderId: "44087386785",
  appId: "1:44087386785:web:d4a653a8f8f052d38a06e0",
  measurementId: "G-T273DNP5TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const firestore = getFirestore(app);