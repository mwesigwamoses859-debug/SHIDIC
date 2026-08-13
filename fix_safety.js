import fs from 'fs';
let content = fs.readFileSync('src/pages/Safety.tsx', 'utf8');

content = content.replace(
  "import { LocalTrafficUpdates } from '../components/LocalTrafficUpdates';",
  "import { LocalTrafficUpdates } from '../components/LocalTrafficUpdates';\nimport { MeetOurDrivers } from '../components/MeetOurDrivers';"
);

// I'll just use string replacement
const targetStart = "{/* Driver Profiles Section */}";
const split = content.split(targetStart);
if (split.length > 1) {
    const newContent = split[0] + "</div><MeetOurDrivers /></main>;\n}";
    fs.writeFileSync('src/pages/Safety.tsx', newContent);
} else {
    console.log("Could not find section");
}
