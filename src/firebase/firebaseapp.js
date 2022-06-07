import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAv3FLsrNVpng-85kctKuvSQ6j0Kc4YyyA',
  authDomain: 'portfolio-project-1-eaaf2.firebaseapp.com',
  projectId: 'portfolio-project-1-eaaf2',
  storageBucket: 'portfolio-project-1-eaaf2.appspot.com',
  messagingSenderId: '802258685124',
  appId: '1:802258685124:web:00f335492aa41b41b08d91',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
