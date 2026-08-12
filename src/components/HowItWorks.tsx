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
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-black text-4xl font-black uppercase tracking-tight">{t('hiw.title')}</h2>
          <div className="w-16 h-2 bg-[#E60000] mx-auto mt-4"></div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gray-200 z-0"></div>

          {steps.map((step, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 200} className="relative z-10 text-center flex flex-col items-center">
              <div className="bg-white border-4 border-[#FFC700] w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <step.icon size={40} className="text-[#E60000]" />
              </div>
              <h3 className="text-2xl font-black text-black mb-3">{step.title}</h3>
              <p className="text-gray-600 font-medium max-w-sm">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
