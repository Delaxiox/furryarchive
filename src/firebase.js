// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getFirestore, collection
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfopAc4hui-cnUxdHk-i9LtscBUyYNv1E",
  authDomain: "furry-archive.firebaseapp.com",
  databaseURL: "https://furry-archive-default-rtdb.firebaseio.com",
  projectId: "furry-archive",
  storageBucket: "furry-archive.appspot.com",
  messagingSenderId: "66748575199",
  appId: "1:66748575199:web:36e0c5364f62df7121686a"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export const conventionsRef = collection(db, 'conventions');
