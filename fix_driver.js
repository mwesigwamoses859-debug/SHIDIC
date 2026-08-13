import fs from 'fs';
let content = fs.readFileSync('src/pages/Driver.tsx', 'utf8');

// replace useEffect check
content = content.replace('if (!user || !isOnline)', 'if (!isOnline)');
content = content.replace('user.uid', '(user ? user.uid : "demo-driver")');

fs.writeFileSync('src/pages/Driver.tsx', content);
