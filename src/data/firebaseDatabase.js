// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebaseConfig.json"
import {
    getFirestore
} from 'firebase/firestore';

initializeApp(firebaseConfig);

export const database = getFirestore();

