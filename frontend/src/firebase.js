// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_ZKMxl-H8FHVuzTLJBuoKU4q01SwSReU",
  authDomain: "cooking-recipe-web-app.firebaseapp.com",
  projectId: "cooking-recipe-web-app",
  storageBucket: "cooking-recipe-web-app.appspot.com",
  messagingSenderId: "479122601231",
  appId: "1:479122601231:web:dd380cf8251c4c5bd13a7a",
  measurementId: "G-40K4YJY022",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getUserFromDB = async (uid) => {
  try {
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));
    const doc = await getDocs(userQuery);
    const data = doc.docs[0].data();

    console.log("user foundL");
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const removeRecipeForUser = (user, recipe) => {};

const saveRecipeForuser = (user, recipe) => {};

export {
  auth,
  db,
  // signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  // sendPasswordReset,
  logout,
  getUserFromDB,
};
