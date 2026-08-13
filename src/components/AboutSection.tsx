import { Car, UserCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-white/85 backdrop-blur-md py-20 px-6" id="about">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-center">
        {/* Decorative Image */}
        <Reveal direction="left" className="hidden lg:block h-full min-h-[400px] w-full">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kampala_traffic.jpg/800px-Kampala_traffic.jpg" alt="Professional Driver" className="w-full h-full object-cover rounded-3xl shadow-xl" />
        </Reveal>
        
        {/* About Text */}
        <Reveal direction="up" className="space-y-6">
          <h2 className="text-black text-4xl font-black uppercase tracking-tight">{t('about.title')}</h2>
          <div className="w-16 h-2 bg-[#E60000]"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            {t('about.desc')}
          </p>
          <Link to="/book" className="inline-block bg-[#FFC700] text-black font-black uppercase tracking-wider px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors mt-4">
            {t('about.btn')}
          </Link>
        </Reveal>

        {/* Why Choose Us List */}
        <Reveal direction="right" delay={200} className="space-y-8 bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-black text-3xl font-black uppercase tracking-tight mb-6">{t('about.why')}</h2>
          
          <div className="flex gap-6">
            <div className="bg-[#FFC700] p-4 rounded-full h-fit flex-shrink-0">
              <Car size={24} className="text-black" />
            </div>
            <div>
              <h3 className="text-black font-black text-xl mb-1">{t('about.why1.title')}</h3>
              <p className="text-gray-600 font-medium">{t('about.why1.desc')}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="bg-[#FFC700] p-4 rounded-full h-fit flex-shrink-0">
              <UserCheck size={24} className="text-black" />
            </div>
            <div>
              <h3 className="text-black font-black text-xl mb-1">{t('about.why2.title')}</h3>
              <p className="text-gray-600 font-medium">{t('about.why2.desc')}</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="bg-[#FFC700] p-4 rounded-full h-fit flex-shrink-0">
              <Clock size={24} className="text-black" />
            </div>
            <div>
              <h3 className="text-black font-black text-xl mb-1">{t('about.why3.title')}</h3>
              <p className="text-gray-600 font-medium">{t('about.why3.desc')}</p>
            </div>
          </div>

        </Reveal>

      </div>
    </div>
  );
}
