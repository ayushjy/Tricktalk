import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCRgEQwdAulk3cJORK27aMXxEduzvIM9bM",
    authDomain: "discord-discussion.firebaseapp.com",
    projectId: "discord-discussion",
    storageBucket: "discord-discussion.appspot.com",
    messagingSenderId: "1080685517856",
    appId: "1:1080685517856:web:2eb468fa3e7ca48065f045",
    measurementId: "G-5C8BRDNHR8"
  };

const firebaseApp =initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db= getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
export {auth,provider};
export default db;



