import fs from 'fs';
let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Replace Hero Background
heroContent = heroContent.replace(
  "https://images.unsplash.com/photo-1563720225384-966952701ce9?auto=format&fit=crop&q=80&w=2000",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Urban_Rising%2C_KAMPALA%2C_Uganda.jpg/1280px-Urban_Rising%2C_KAMPALA%2C_Uganda.jpg"
);

// Replace Hero Feature Image
heroContent = heroContent.replace(
  "https://images.unsplash.com/photo-1593950315186-76a92975b60c?auto=format&fit=crop&q=80&w=1200",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/2018-2023_Toyota_Alphard_X.jpg/1280px-2018-2023_Toyota_Alphard_X.jpg"
);

fs.writeFileSync('src/components/Hero.tsx', heroContent);

let aboutContent = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');
// Replace About Image
aboutContent = aboutContent.replace(
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kampala_traffic.jpg/800px-Kampala_traffic.jpg"
);

fs.writeFileSync('src/components/AboutSection.tsx', aboutContent);
