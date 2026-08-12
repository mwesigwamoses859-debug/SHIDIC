import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-shidictransporte-e0dd38bb-077a-4de8-9d0d-f178a83e3089");

const drivers = [
  { name: 'Moses K.', vehicleType: 'boda', rating: 4.9, trips: 1240, experience: '4 years', image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80', active: true },
  { name: 'Sarah N.', vehicleType: 'standard', rating: 4.8, trips: 850, experience: '3 years', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=400&q=80', active: true },
  { name: 'John S.', vehicleType: 'vip', rating: 5.0, trips: 2100, experience: '6 years', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80', active: true },
  { name: 'David M.', vehicleType: 'boda', rating: 4.7, trips: 430, experience: '1 year', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', active: true }
];

async function seed() {
  for (const d of drivers) {
    await addDoc(collection(db, 'drivers'), d);
  }
  console.log('Seeded drivers!');
  process.exit(0);
}
seed();
