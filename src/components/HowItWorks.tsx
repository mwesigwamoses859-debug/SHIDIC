import { MessageCircle, UserCheck, ShieldCheck } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../context/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageCircle,
      title: t('hiw.step1.title'),
      desc: t('hiw.step1.desc'),
    },
    {
      icon: UserCheck,
      title: t('hiw.step2.title'),
      desc: t('hiw.step2.desc'),
    },
    {
      icon: ShieldCheck,
      title: t('hiw.step3.title'),
      desc: t('hiw.step3.desc'),
    }
  ];

  return (
    <div className="py-20 px-6 relative bg-gray-900 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/KAMPALA_CITY.jpg/1280px-KAMPALA_CITY.jpg')" }}>
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-white text-4xl font-black uppercase tracking-tight">{t('hiw.title')}</h2>
          <div className="w-16 h-2 bg-[#E60000] mx-auto mt-4"></div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-white/10 z-0"></div>
          
          {steps.map((step, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 200} className="relative z-10 text-center flex flex-col items-center">
              <div className="bg-zinc-900 border-4 border-[#FFC700] w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <step.icon size={40} className="text-[#E60000]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 font-medium max-w-sm">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
