import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');
content = content.replace(
  '<div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">',
  '<div className="flex overflow-x-auto border-b border-gray-100 p-2 gap-2 bg-gray-50/50 scrollbar-hide">'
);
fs.writeFileSync('src/components/BookingSection.tsx', content);
