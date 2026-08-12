import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0334327910",
  appId: "1:943697172862:web:17e46e7cc7914816e33b2f",
  apiKey: "AIzaSyCXl6ppSOdW29_5FGEnMEXXtTpCs1RaMMk",
  authDomain: "gen-lang-client-0334327910.firebaseapp.com",
  storageBucket: "gen-lang-client-0334327910.firebasestorage.app",
  messagingSenderId: "943697172862"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-shidictransporte-e0dd38bb-077a-4de8-9d0d-f178a83e3089");
