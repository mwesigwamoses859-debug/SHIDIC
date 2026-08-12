import fs from 'fs';

let content = fs.readFileSync('src/pages/Safety.tsx', 'utf8');

content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport { LocalTrafficUpdates } from '../components/LocalTrafficUpdates';"
);

content = content.replace(
  '{/* Info Blocks */}',
  `{/* Local Traffic Updates powered by Gemini */}\n        <div className="mb-16">\n          <Reveal direction="up">\n            <LocalTrafficUpdates />\n          </Reveal>\n        </div>\n\n        {/* Info Blocks */}`
);

fs.writeFileSync('src/pages/Safety.tsx', content);
