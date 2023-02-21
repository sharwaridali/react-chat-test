// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCstBhWBGuQp61W8cAfNn80FJN5P0ZjU",
  authDomain: "react-chat-edae6.firebaseapp.com",
  projectId: "react-chat-edae6",
  storageBucket: "react-chat-edae6.appspot.com",
  messagingSenderId: "457684707603",
  appId: "1:457684707603:web:079d4b208dbb9e6fa3d2e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();