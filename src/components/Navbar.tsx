import { Phone, Globe } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `transition-colors ${isActive ? 'text-[#FFC700]' : 'hover:text-[#FFC700]'}`;

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 z-50">
      <Link to="/" className="flex flex-col">
        <span className="text-[#FFC700] text-2xl font-black tracking-tighter leading-none">SHIDIC</span>
        <span className="text-white text-xs font-bold tracking-widest leading-none">TRANSPORTERS</span>
      </Link>
      
      <div className="hidden md:flex space-x-8 text-sm font-semibold">
        <NavLink to="/" className={linkClass}>{t('nav.home')}</NavLink>
        <NavLink to="/about" className={linkClass}>{t('nav.about')}</NavLink>
        <NavLink to="/services" className={linkClass}>{t('nav.services')}</NavLink>
        <NavLink to="/safety" className={linkClass}>{t('nav.safety')}</NavLink>
        <NavLink to="/book" className={linkClass}>{t('nav.book')}</NavLink>
        <NavLink to="/contact" className={linkClass}>{t('nav.contact')}</NavLink>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage} 
          className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-zinc-800 hover:text-[#FFC700] transition-colors border border-zinc-800"
          aria-label="Toggle Language"
        >
          <Globe size={14} />
          {language === 'en' ? 'EN' : 'SW'}
        </button>

        <a href="https://wa.me/256757474950?text=Hello!" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-[#FFC700] text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors">
          <Phone size={18} />
          <span>+256 757474950</span>
        </a>
      </div>
    </nav>
  );
}
