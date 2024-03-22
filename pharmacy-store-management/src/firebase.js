// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiguIgrL-nqfhLr7BcOzqM60wqF9_m-Ps",
    authDomain: "fir-upload-405fb.firebaseapp.com",
    projectId: "fir-upload-405fb",
    storageBucket: "fir-upload-405fb.appspot.com",
    messagingSenderId: "671875619581",
    appId: "1:671875619581:web:0ca507e5d3cc1c9bebfc94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);