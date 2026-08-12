import { Shield, Wrench, Award, CheckCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';

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

        {/* Info Blocks */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Reveal direction="left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 h-full">
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
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 h-full">
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

        {/* Driver Profiles Section */}
        <Reveal direction="up" className="mb-12 text-center">
          <h2 className="text-black text-3xl font-black uppercase tracking-tight">{t('safety.profiles.title')}</h2>
          <div className="w-12 h-1 bg-[#FFC700] mx-auto mt-4"></div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'John K.', exp: '8', rating: '4.9/5', img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400&h=400' },
            { name: 'David M.', exp: '12', rating: '5.0/5', img: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400&h=400' },
            { name: 'Peter W.', exp: '6', rating: '4.8/5', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
          ].map((driver, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 150}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
                <div className="h-64 overflow-hidden relative">
                  <img src={driver.img} alt={driver.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-[#FFC700] text-black font-black px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                    <Award size={16} /> {driver.rating}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black mb-1">{driver.name}</h3>
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{driver.exp} {t('safety.exp')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  );
}
