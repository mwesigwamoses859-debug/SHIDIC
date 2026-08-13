import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

content = content.replace("const { onSnapshot } = await import('firebase/firestore');", "");
// also need to import onSnapshot at the top
content = content.replace('collection, addDoc, serverTimestamp, doc', 'collection, addDoc, serverTimestamp, doc, onSnapshot');

fs.writeFileSync('src/components/BookingSection.tsx', content);
