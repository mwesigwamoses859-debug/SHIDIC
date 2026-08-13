import fs from 'fs';
let content = fs.readFileSync('src/components/BookingTracker.tsx', 'utf8');

content = content.replace(
  'const handleSearch = async (e: React.FormEvent) => {',
  'const handleSearch = async (e: any) => {'
);

content = content.replace(
  'const b = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };',
  'const b = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as any;'
);

fs.writeFileSync('src/components/BookingTracker.tsx', content);
