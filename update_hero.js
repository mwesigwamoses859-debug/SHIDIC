import fs from 'fs';
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace(
  '<h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">',
  '<h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">'
);

fs.writeFileSync('src/components/Hero.tsx', content);
