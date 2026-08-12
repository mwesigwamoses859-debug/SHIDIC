import fs from 'fs';
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Import useAuth
content = content.replace(
  "import { useLanguage } from '../context/LanguageContext';",
  "import { useLanguage } from '../context/LanguageContext';\nimport { useAuth } from '../context/AuthContext';\nimport { LogIn, LogOut, ShieldCheck } from 'lucide-react';"
);

// Destructure from useAuth
content = content.replace(
  'const { language, toggleLanguage, t } = useLanguage();',
  'const { language, toggleLanguage, t } = useLanguage();\n  const { user, loginWithGoogle, logout } = useAuth();'
);

// Add auth UI
const authUI = `
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/admin" className="hidden sm:flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800" aria-label="Admin">
              <ShieldCheck size={14} /> Admin
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800">
              <LogOut size={14} /> 
            </button>
            <img src={user.photoURL || ""} alt="Profile" className="w-8 h-8 rounded-full border border-zinc-800" />
          </div>
        ) : (
          <button onClick={loginWithGoogle} className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
            <LogIn size={14} /> Sign In
          </button>
        )}
      </div>
    </nav>
`;

content = content.replace(
  '</div>\n    </nav>',
  authUI
);

fs.writeFileSync('src/components/Navbar.tsx', content);
