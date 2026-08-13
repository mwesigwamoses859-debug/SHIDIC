import fs from 'fs';
let content = fs.readFileSync('src/components/ServiceMap.tsx', 'utf8');

// replace \` with `
content = content.replace(/\\`/g, '`');
// replace \$ with $
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('src/components/ServiceMap.tsx', content);
