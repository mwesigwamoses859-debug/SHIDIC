import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');
content = content.replace('import { LiveTracker } from "./LiveTracker";', '');
fs.writeFileSync('src/components/BookingSection.tsx', content);
