import { Plane, Users, Briefcase, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const services = [
    { 
      icon: Plane, 
      title: t('services.s1.title'), 
      desc: t('services.s1.desc'),
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
    },
    { 
      icon: Users, 
      title: t('services.s2.title'), 
      desc: t('services.s2.desc'),
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
    },
    { 
      icon: Briefcase, 
      title: t('services.s3.title'), 
      desc: t('services.s3.desc'),
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2187&auto=format&fit=crop"
    },
    { 
      icon: MapPin, 
      title: t('services.s4.title'), 
      desc: t('services.s4.desc'),
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
    },
  ];

  return (
    <main 
      className="pt-32 pb-20 min-h-screen relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal direction="up">
          <div className="mb-12 bg-white/95 backdrop-blur-md p-8 rounded-3xl max-w-3xl shadow-xl">
            <h1 className="text-black text-4xl font-black uppercase tracking-tight">{t('services.title')}</h1>
            <div className="w-16 h-2 bg-[#E60000] mt-4"></div>
            <p className="mt-4 text-gray-800 font-medium text-lg max-w-2xl">
              {t('services.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 100}>
              <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-gray-900 flex flex-col justify-end h-[400px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-[#FFC700] p-4 rounded-full h-fit w-fit mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <service.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-white font-black text-3xl mb-3 uppercase tracking-wide">{service.title}</h3>
                  <p className="text-gray-200 font-medium text-lg leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    {service.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
