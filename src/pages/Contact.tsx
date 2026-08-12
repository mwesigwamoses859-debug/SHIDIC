import { Phone, MapPin, Mail } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { t } = useLanguage();

  return (
    <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal direction="up">
          <div className="mb-12 text-center">
            <h1 className="text-black text-4xl font-black uppercase tracking-tight">{t('contact.title')}</h1>
            <div className="w-16 h-2 bg-[#E60000] mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              {t('contact.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Reveal direction="up" delay={100}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
              <div className="bg-[#FFC700] p-4 rounded-full mb-6">
                <Phone size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-black mb-2">{t('contact.call')}</h3>
              <p className="text-gray-600 font-medium">+256 757474950</p>
              <p className="text-gray-600 font-medium">+256 777474950</p>
              
              <a 
                href="https://wa.me/256757474950?text=Hello!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 bg-[#25D366] text-white font-bold py-2 px-6 rounded-full hover:bg-[#20b858] transition-colors w-full"
              >
                {t('contact.chat')}
              </a>
            </div>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
              <div className="bg-[#FFC700] p-4 rounded-full mb-6">
                <MapPin size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-black mb-2">{t('contact.office')}</h3>
              <p className="text-gray-600 font-medium">Kampala, Uganda</p>
              <p className="text-gray-600 font-medium">{t('contact.available')}</p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 flex flex-col items-center">
              <div className="bg-[#FFC700] p-4 rounded-full mb-6">
                <Mail size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-black mb-2">{t('contact.email')}</h3>
              <p className="text-gray-600 font-medium">info@shidict.com</p>
              <p className="text-gray-600 font-medium">bookings@shidict.com</p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
