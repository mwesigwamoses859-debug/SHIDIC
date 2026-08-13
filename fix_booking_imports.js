import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// add 'doc' to firestore import
content = content.replace('collection, addDoc, serverTimestamp', 'collection, addDoc, serverTimestamp, doc');

// fix React.FormEvent
content = content.replace('e: React.FormEvent', 'e: any'); // lazy fix for demo

fs.writeFileSync('src/components/BookingSection.tsx', content);
