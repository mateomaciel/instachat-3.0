// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHS8rufRh5dV8KGGSiVjeEb9cKHT3S-UE",
  authDomain: "instachat-26748.firebaseapp.com",
  projectId: "instachat-26748",
  storageBucket: "instachat-26748.appspot.com",
  messagingSenderId: "608349332977",
  appId: "1:608349332977:web:9457b1730fd9a694099050"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = firebase.auth();
export const db = app.firestore();