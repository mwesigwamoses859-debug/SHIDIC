import fs from 'fs';
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Replace the hardcoded bg-[#111111] with a background image overlay
content = content.replace(
  '<div className="bg-[#111111] text-white overflow-hidden relative min-h-[85vh] flex items-center">',
  '<div className="text-white overflow-hidden relative min-h-[85vh] flex items-center bg-cover bg-center" style={{ backgroundImage: "url(\'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000\')" }}>\n      <div className="absolute inset-0 bg-black/70 z-0"></div>'
);

// We need to keep the z-indexes correct.
fs.writeFileSync('src/components/Hero.tsx', content);
