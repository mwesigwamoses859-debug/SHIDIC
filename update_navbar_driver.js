import fs from 'fs';
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Import Car icon if not present
if (!content.includes('Car')) {
  content = content.replace(
    'import { LogIn, LogOut, ShieldCheck } from \'lucide-react\';',
    'import { LogIn, LogOut, ShieldCheck, Car } from \'lucide-react\';'
  );
}

// Add Driver link next to Admin link
if (!content.includes('to="/driver"')) {
  content = content.replace(
    '<Link to="/admin"',
    '<Link to="/driver" className="hidden sm:flex items-center gap-1.5 bg-zinc-900 text-[#FFC700] px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800" aria-label="Driver">\n              <Car size={14} /> Driver Area\n            </Link>\n            <Link to="/admin"'
  );
}

fs.writeFileSync('src/components/Navbar.tsx', content);
