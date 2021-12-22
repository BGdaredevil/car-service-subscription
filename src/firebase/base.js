import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// const app = initializeApp({
//   apiKey: "AIzaSyDZC_kmSYGJ5YqoO4UZu0v7CqWXB0HGY-Q",
//   authDomain: "react-softuni-assignment.firebaseapp.com",
//   projectId: "react-softuni-assignment",
//   storageBucket: "react-softuni-assignment.appspot.com",
//   messagingSenderId: "634901749296",
//   appId: "1:634901749296:web:75c491dc9b4e86625917f5",
// });
// the above is hardcoded because for some reason it is not read correctly in the docker file

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY || "AIzaSyDZC_kmSYGJ5YqoO4UZu0v7CqWXB0HGY-Q",
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN || "react-softuni-assignment.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "react-softuni-assignment",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "react-softuni-assignment.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "634901749296",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:634901749296:web:75c491dc9b4e86625917f5",
});

export const auth = getAuth(app);
export default onAuthStateChanged;
