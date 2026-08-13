import fs from 'fs';
let content = fs.readFileSync('src/pages/Safety.tsx', 'utf8');
content = content.replace(
  '</div><MeetOurDrivers /></main>;\n}',
  '</div>\n      <MeetOurDrivers />\n    </main>\n  );\n}'
);
fs.writeFileSync('src/pages/Safety.tsx', content);
