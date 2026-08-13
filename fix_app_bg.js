import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the main wrapper div
const target = '<div className="min-h-screen bg-black font-sans selection:bg-[#FFC700] selection:text-black scroll-smooth">';
const replacement = `<div className="min-h-screen bg-black font-sans selection:bg-[#FFC700] selection:text-black scroll-smooth relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/KAMPALA_CITY.jpg/1280px-KAMPALA_CITY.jpg')" }}>
          <div className="fixed inset-0 bg-black/85 z-0 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col min-h-screen">`;

content = content.replace(target, replacement);

const target2 = `        </div>
      </BrowserRouter>`;
const replacement2 = `          </div>
        </div>
      </BrowserRouter>`;
content = content.replace(target2, replacement2);

fs.writeFileSync('src/App.tsx', content);
