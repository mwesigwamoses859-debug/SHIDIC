import fs from 'fs';
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// replace useEffect check
content = content.replace('if (!user) return;', '/* if (!user) return; removed for demo */');

fs.writeFileSync('src/pages/Admin.tsx', content);
