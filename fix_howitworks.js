import fs from 'fs';
let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

// Replace standard div with a background image one
const target = '<div className="bg-gray-50 py-20 px-6">';
const replacement = `<div className="py-20 px-6 relative bg-gray-900 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/KAMPALA_CITY.jpg/1280px-KAMPALA_CITY.jpg')" }}>
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">`;

content = content.replace(target, replacement);
// We also need to fix closing tags, wait. Let's do it safely.
