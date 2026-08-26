import { Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white border-t-4 border-[#FFC700]" id="contact">
      
      {/* Top Banner Area */}
      <div className="bg-[#FFC700] text-black">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-black text-[#FFC700] p-3 rounded-full">
              <Phone size={24} />
            </div>
            <div>
              <p className="font-bold text-sm uppercase">{t('footer.call')}</p>
              <p className="font-black text-xl lg:text-xl">0757474950 / 0392895930 / 0200979900</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-bold uppercase tracking-widest text-sm">{t('footer.ready')}</p>
            <p className="font-black uppercase tracking-wider text-xl">{t('footer.serve')}</p>
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold text-gray-400">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#FFC700] transition-colors"><Facebook size={20} /></a>
          <a href="#" className="hover:text-[#FFC700] transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-[#FFC700] transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
