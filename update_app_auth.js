import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'import { LanguageProvider } from "./context/LanguageContext";',
  'import { LanguageProvider } from "./context/LanguageContext";\nimport { AuthProvider } from "./context/AuthContext";'
);

content = content.replace(
  '<LanguageProvider>',
  '<AuthProvider>\n    <LanguageProvider>'
);

content = content.replace(
  '</LanguageProvider>',
  '</LanguageProvider>\n    </AuthProvider>'
);

fs.writeFileSync('src/App.tsx', content);
