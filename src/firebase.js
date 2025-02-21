// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDagO6kX4dg5jONXIkZhqYjW2rPBmBgHRw",
  authDomain: "todo-list-sa.firebaseapp.com",
  databaseURL: "https://todo-list-sa-default-rtdb.firebaseio.com",
  projectId: "todo-list-sa",
  storageBucket: "todo-list-sa.firebasestorage.app",
  messagingSenderId: "519685523115",
  appId: "1:519685523115:web:d659c618215cb61d4ed9ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
