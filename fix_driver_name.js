import fs from 'fs';
let content = fs.readFileSync('src/components/BookingTracker.tsx', 'utf8');
content = content.replace(
  "driver.displayName || 'Moses K.'",
  "driver.name || driver.displayName || 'Your Driver'"
);
fs.writeFileSync('src/components/BookingTracker.tsx', content);
