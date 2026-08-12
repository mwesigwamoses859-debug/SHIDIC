import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Import Driver page
if (!content.includes('import { Driver }')) {
  content = content.replace(
    'import { Admin } from "./pages/Admin";',
    'import { Admin } from "./pages/Admin";\nimport { Driver } from "./pages/Driver";'
  );
}

// Add Driver route
if (!content.includes('path="/driver"')) {
  content = content.replace(
    '</Routes>',
    `  <Route
          path="/driver"
          element={
            <PageTransition>
              <Driver />
            </PageTransition>
          }
        />
      </Routes>`
  );
}

fs.writeFileSync('src/App.tsx', content);
