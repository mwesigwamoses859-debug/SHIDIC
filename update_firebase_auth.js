import fs from 'fs';
let content = fs.readFileSync('src/lib/firebase.ts', 'utf8');
content = content.replace(
  'const app = initializeApp(firebaseConfig);',
  'export const app = initializeApp(firebaseConfig);'
);
fs.writeFileSync('src/lib/firebase.ts', content);
