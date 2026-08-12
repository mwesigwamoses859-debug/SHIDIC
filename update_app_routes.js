import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'import { Safety } from "./pages/Safety";',
  'import { Safety } from "./pages/Safety";\nimport { Admin } from "./pages/Admin";'
);

content = content.replace(
  '</Routes>',
  `  <Route
          path="/admin"
          element={
            <PageTransition>
              <Admin />
            </PageTransition>
          }
        />
      </Routes>`
);

fs.writeFileSync('src/App.tsx', content);
