import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../context/LanguageContext';

export function FareEstimator() {
  const { t } = useLanguage();
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);

  const routes = [
    { label: 'Kampala ➔ Entebbe Airport', price: 120000 },
    { label: 'Kampala ➔ Jinja', price: 200000 },
    { label: 'Entebbe Airport ➔ Jinja', price: 300000 },
    { label: 'Within Kampala (City Tour)', price: 80000 },
  ];

  return (
    <Reveal direction="down" className="mb-12">
      <div className="bg-[#FFC700] p-6 md:p-8 rounded-2xl shadow-xl border-4 border-black text-black">
        <div className="flex items-center gap-3 mb-6">
          <Calculator size={32} />
          <h3 className="text-2xl font-black uppercase tracking-wide">{t('fare.title')}</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-full md:w-2/3">
            <label className="block font-bold mb-2">{t('fare.route')}</label>
            <select 
              className="w-full bg-white border-2 border-black p-4 rounded-md font-bold text-lg outline-none focus:ring-0 cursor-pointer"
              onChange={(e) => setEstimatedFare(Number(e.target.value) || null)}
              defaultValue=""
            >
              <option value="" disabled>{t('fare.select')}</option>
              {routes.map((route, idx) => (
                <option key={idx} value={route.price}>{route.label}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-1/3 bg-black text-white p-4 rounded-md flex flex-col justify-center items-center min-h-[76px]">
            <span className="text-sm font-bold text-gray-400">{t('fare.estimated')}</span>
            <span className="text-2xl font-black tracking-wider text-[#FFC700]">
              {estimatedFare ? `UGX ${estimatedFare.toLocaleString()}` : '---'}
            </span>
          </div>
        </div>
        
        <p className="text-sm font-semibold mt-4 text-black/70">
          * {t('fare.note')}
        </p>
      </div>
    </Reveal>
  );
}
