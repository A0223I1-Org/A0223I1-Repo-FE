import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyAXUCkSHcMV3MlPAInrluM2vuVUlY7wCwU",
    authDomain: "e-commerce-contact-190c8.firebaseapp.com",
    databaseURL: "https://e-commerce-contact-190c8-default-rtdb.firebaseio.com",
    projectId: "e-commerce-contact-190c8",
    storageBucket: "e-commerce-contact-190c8.appspot.com",
    messagingSenderId: "92074217267",
    appId: "1:92074217267:web:67a02ac029fc30c8423846"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database}