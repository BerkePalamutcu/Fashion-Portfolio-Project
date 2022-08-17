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
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
  addDoc,
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

// MY DB CODE STARTS HERE
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  // data method comes from firebase
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};
export const addData = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addUserData = async (data) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      try {
        await setDoc(doc(db, 'users', uid), { data });
        // console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      return;
    }
  });
};

export const getUserData = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      try {
        const docRef = doc(db, 'users', uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      return;
    }
  });
};
