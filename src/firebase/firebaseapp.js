import { initializeApp } from 'firebase/app';
/// Firebase Auth imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

/// Firebase DB imports
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  setDocs,
  writeBatch,
  query,
} from 'firebase/firestore';
/// Firebase config file
const firebaseConfig = {
  apiKey: 'AIzaSyAv3FLsrNVpng-85kctKuvSQ6j0Kc4YyyA',
  authDomain: 'portfolio-project-1-eaaf2.firebaseapp.com',
  projectId: 'portfolio-project-1-eaaf2',
  storageBucket: 'portfolio-project-1-eaaf2.appspot.com',
  messagingSenderId: '802258685124',
  appId: '1:802258685124:web:00f335492aa41b41b08d91',
};

/// Initialize the app
const app = initializeApp(firebaseConfig);

/// Make auth instance by calling getAuth methdod.
export const auth = getAuth(app);

/// Configuring the provider of Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

/// The function to use to sign in with google. Needed with auth and provider as parameters
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

///Making new user by email and password
export const createNewUserFromEmailandPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  // userCredential return ediyor!!
  return await createUserWithEmailAndPassword(auth, email, password);
};

/// Checks if user is signed in or not!
export const onAuthStateChangedListener = () =>
  /// callbacke dikkat!!
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('logged in');
      console.log(user.uid);
      console.log(user.email);
    } else {
      console.log('not logged in');
    }
  });

export const signInUser = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  signOut(auth);
};

/// DB CODE STARTS HERE
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title] = items;
    return acc;
  }, {});
  console.log(categoryMap);
};

getCategoriesAndDocuments();
