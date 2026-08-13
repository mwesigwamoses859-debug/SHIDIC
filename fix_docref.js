import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

content = content.replace(/docRef\.id/g, 'newDocRef.id');

fs.writeFileSync('src/components/BookingSection.tsx', content);
