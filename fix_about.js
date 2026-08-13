import fs from 'fs';
let content = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

// I will insert a 3-column layout where the image is in the middle, or just change the lg:grid-cols-2 to include a nice image.
content = content.replace(
  '<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">',
  `<div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-center">
        {/* Decorative Image */}
        <Reveal direction="left" className="hidden lg:block h-full min-h-[400px] w-full">
          <img src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&q=80&w=800" alt="Professional Driver" className="w-full h-full object-cover rounded-3xl shadow-xl" />
        </Reveal>`
);

content = content.replace(
  '<Reveal direction="left" className="space-y-6">',
  '<Reveal direction="up" className="space-y-6">'
);

fs.writeFileSync('src/components/AboutSection.tsx', content);
