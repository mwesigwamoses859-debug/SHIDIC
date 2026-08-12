import fs from 'fs';
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

content = content.replace(
  '<div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">',
  '<div className="bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 lg:sticky top-24">'
);

content = content.replace(
  '<div className="flex items-center gap-3 mb-8">',
  '<div className="flex items-center gap-3 mb-4 lg:mb-8">'
);

content = content.replace(
  '<nav className="space-y-2">',
  '<nav className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 scrollbar-hide">'
);

content = content.replace(
  /w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm/g,
  'flex-shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap'
);

fs.writeFileSync('src/pages/Admin.tsx', content);
