import fs from 'fs';
let content = fs.readFileSync('src/pages/About.tsx', 'utf8');
content = content.replace(
  "import { AboutSection } from '../components/AboutSection';",
  "import { AboutSection } from '../components/AboutSection';\nimport { MeetOurDrivers } from '../components/MeetOurDrivers';"
);
content = content.replace(
  "<AboutSection />",
  "<AboutSection />\n      <MeetOurDrivers />"
);
fs.writeFileSync('src/pages/About.tsx', content);
