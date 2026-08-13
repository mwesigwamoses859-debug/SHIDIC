import fs from 'fs';

function replaceInFile(filepath, targetRegex, replacement) {
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(filepath, content);
  }
}

// Update Pages
replaceInFile('src/pages/Services.tsx', /bg-white/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/pages/Contact.tsx', /bg-slate-50/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/pages/Driver.tsx', /bg-gray-50/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/pages/Admin.tsx', /bg-gray-100/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/pages/Safety.tsx', /bg-white/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/pages/Book.tsx', /bg-slate-50/g, 'bg-white/85 backdrop-blur-md');

// Update Components
replaceInFile('src/components/AboutSection.tsx', /bg-white/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/components/MeetOurDrivers.tsx', /bg-gray-50/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/components/ServiceMap.tsx', /bg-slate-50/g, 'bg-white/85 backdrop-blur-md');
replaceInFile('src/components/BookingSection.tsx', /bg-slate-50/g, 'bg-transparent');
