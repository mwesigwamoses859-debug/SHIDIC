import fs from 'fs';
let content = fs.readFileSync('src/components/MapRoute.tsx', 'utf8');
content = content.replace('mapId="DEMO_MAP_ID"', '');
fs.writeFileSync('src/components/MapRoute.tsx', content);
