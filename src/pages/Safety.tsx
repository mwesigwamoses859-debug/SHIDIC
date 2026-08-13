import { Shield, Wrench, Award, CheckCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { LocalTrafficUpdates } from '../components/LocalTrafficUpdates';
import { MeetOurDrivers } from '../components/MeetOurDrivers';

export function Safety() {
  const { t } = useLanguage();

  return (
    <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <Reveal direction="up" className="text-center mb-16">
          <div className="bg-[#FFC700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-black">
            <Shield size={40} className="text-black" />
          </div>
          <h1 className="text-black text-4xl font-black uppercase tracking-tight">{t('safety.title')}</h1>
          <div className="w-16 h-2 bg-[#E60000] mx-auto mt-4"></div>
          <p className="mt-6 text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            {t('safety.desc')}
          </p>
        </Reveal>

        {/* Local Traffic Updates powered by Gemini */}
        <div className="mb-16">
          <Reveal direction="up">
            <LocalTrafficUpdates />
          </Reveal>
        </div>

        {/* Info Blocks */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Reveal direction="left">
            <div className="bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 h-full">
              <div className="bg-[#E60000] p-4 rounded-full h-fit flex-shrink-0">
                <CheckCircle size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">{t('safety.vetting.title')}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{t('safety.vetting.desc')}</p>
              </div>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={100}>
            <div className="bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 h-full">
              <div className="bg-[#E60000] p-4 rounded-full h-fit flex-shrink-0">
                <Wrench size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">{t('safety.maintenance.title')}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{t('safety.maintenance.desc')}</p>
              </div>
            </div>
          </Reveal>
        </div>

        </div>
      <MeetOurDrivers />
    </main>
  );
}