// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcPaQTEq7mtxmMGxQxVR5480h8G7vFHoQ",
    authDomain: "uploading-a9e6a.firebaseapp.com",
    projectId: "uploading-a9e6a",
    storageBucket: "uploading-a9e6a.appspot.com",
    messagingSenderId: "989897993690",
    appId: "1:989897993690:web:f60076de5725066fe2e4e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)