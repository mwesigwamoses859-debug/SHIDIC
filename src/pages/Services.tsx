import { Plane, Users, Briefcase, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const services = [
    { icon: Plane, title: t('services.s1.title'), desc: t('services.s1.desc') },
    { icon: Users, title: t('services.s2.title'), desc: t('services.s2.desc') },
    { icon: Briefcase, title: t('services.s3.title'), desc: t('services.s3.desc') },
    { icon: MapPin, title: t('services.s4.title'), desc: t('services.s4.desc') },
  ];

  return (
    <main className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal direction="up">
          <div className="mb-12">
            <h1 className="text-black text-4xl font-black uppercase tracking-tight">{t('services.title')}</h1>
            <div className="w-16 h-2 bg-[#E60000] mt-4"></div>
            <p className="mt-4 text-gray-600 font-medium text-lg max-w-2xl">
              {t('services.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 100}>
              <div className="flex gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-[#FFC700] p-4 rounded-full h-fit flex-shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon size={32} className="text-[#E60000]" />
                </div>
                <div>
                  <h3 className="text-black font-black text-2xl mb-2">{service.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
