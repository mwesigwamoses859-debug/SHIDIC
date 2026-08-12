import { useState } from 'react';
import { Phone, Globe, Menu, X, LogIn, LogOut, ShieldCheck, Car } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'motion/react';

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, loginWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const closeMenu = () => setMobileMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `transition-colors font-bold ${isActive ? 'text-[#FFC700]' : 'text-white hover:text-[#FFC700]'}`;

  return (
    <nav className="bg-black text-white px-4 sm:px-6 py-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 z-50">
      <Link to="/" className="flex flex-col z-50" onClick={closeMenu}>
        <span className="text-[#FFC700] text-2xl font-black tracking-tighter leading-none">SHIDIC</span>
        <span className="text-white text-[10px] font-bold tracking-widest leading-none">TRANSPORTERS</span>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-8 text-sm font-semibold absolute left-1/2 -translate-x-1/2">
        <NavLink to="/" className={linkClass}>{t('nav.home')}</NavLink>
        <NavLink to="/about" className={linkClass}>{t('nav.about')}</NavLink>
        <NavLink to="/services" className={linkClass}>{t('nav.services')}</NavLink>
        <NavLink to="/safety" className={linkClass}>{t('nav.safety')}</NavLink>
        <NavLink to="/book" className={linkClass}>{t('nav.book')}</NavLink>
        <NavLink to="/contact" className={linkClass}>{t('nav.contact')}</NavLink>
      </div>

      <div className="flex items-center gap-3 z-50">
        <button 
          onClick={toggleLanguage} 
          className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-zinc-800 hover:text-[#FFC700] transition-colors border border-zinc-800"
          aria-label="Toggle Language"
        >
          <Globe size={14} />
          {language === 'en' ? 'EN' : 'SW'}
        </button>

        {user ? (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/driver" className="flex items-center gap-1.5 bg-zinc-900 text-[#FFC700] px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800" aria-label="Driver">
              <Car size={14} /> <span className="hidden md:inline">Driver Area</span>
            </Link>
            <Link to="/admin" className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800" aria-label="Admin">
              <ShieldCheck size={14} /> <span className="hidden md:inline">Admin</span>
            </Link>
            <button onClick={logout} className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors border border-zinc-800">
              <LogOut size={14} /> 
            </button>
            <img src={user.photoURL || ""} alt="Profile" className="w-8 h-8 rounded-full border border-zinc-800" />
          </div>
        ) : (
          <button onClick={loginWithGoogle} className="hidden sm:flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
            <LogIn size={14} /> Sign In
          </button>
        )}

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-[#FFC700] transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-zinc-800 lg:hidden py-6 px-6 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4 text-xl">
              <NavLink to="/" onClick={closeMenu} className={linkClass}>{t('nav.home')}</NavLink>
              <NavLink to="/about" onClick={closeMenu} className={linkClass}>{t('nav.about')}</NavLink>
              <NavLink to="/services" onClick={closeMenu} className={linkClass}>{t('nav.services')}</NavLink>
              <NavLink to="/safety" onClick={closeMenu} className={linkClass}>{t('nav.safety')}</NavLink>
              <NavLink to="/book" onClick={closeMenu} className={linkClass}>{t('nav.book')}</NavLink>
              <NavLink to="/contact" onClick={closeMenu} className={linkClass}>{t('nav.contact')}</NavLink>
            </div>
            
            <div className="h-px bg-zinc-800 w-full my-2"></div>
            
            <div className="flex flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <img src={user.photoURL || ""} alt="Profile" className="w-10 h-10 rounded-full border-2 border-zinc-800" />
                    <div>
                      <p className="text-sm font-bold text-white">{user.displayName}</p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/driver" onClick={closeMenu} className="flex items-center justify-center gap-2 bg-zinc-900 text-[#FFC700] px-4 py-3 rounded-xl font-bold border border-zinc-800">
                    <Car size={18} /> Driver Area
                  </Link>
                  <Link to="/admin" onClick={closeMenu} className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-4 py-3 rounded-xl font-bold border border-zinc-800">
                    <ShieldCheck size={18} /> Admin Panel
                  </Link>
                  <button onClick={() => { logout(); closeMenu(); }} className="flex items-center justify-center gap-2 bg-red-950/30 text-red-500 px-4 py-3 rounded-xl font-bold border border-red-900/50">
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <button onClick={() => { loginWithGoogle(); closeMenu(); }} className="flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-bold">
                  <LogIn size={18} /> Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
