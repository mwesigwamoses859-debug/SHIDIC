import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// replace \` with `
content = content.replace(/\\`/g, '`');
// replace \$ with $
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('src/components/BookingSection.tsx', content);
