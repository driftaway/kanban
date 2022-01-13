import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSew74KVh0w98AZtb0D59B_fSeypSUE0Y",
  authDomain: "kanban-board-72094.firebaseapp.com",
  projectId: "kanban-board-72094",
  storageBucket: "kanban-board-72094.appspot.com",
  messagingSenderId: "547649626194",
  appId: "1:547649626194:web:c34f673747dde6c9a63f8b"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    console.log(response)
    return ['success', 'You have successfully logged in']
  } catch (err) {
    return ['error', err.message]
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => auth.signOut();

export {
  auth,
  db,
  // signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};