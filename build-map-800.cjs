const fs = require('fs');
const path = fs.readFileSync('uganda-path-800.txt', 'utf8');
const cities = JSON.parse(fs.readFileSync('projected-cities-800.json', 'utf8'));

let content = `import { Reveal } from './Reveal';
import { useLanguage } from '../context/LanguageContext';

export function ServiceMap() {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal direction="up" className="text-center mb-12">
          <h2 className="text-slate-900 text-4xl font-black uppercase tracking-tight">{t('map.title')}</h2>
          <div className="w-16 h-2 bg-[#E60000] mx-auto mt-6"></div>
          <p className="text-slate-600 font-medium mt-6 text-lg max-w-2xl mx-auto">{t('map.desc')}</p>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <div className="relative w-full max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-4 lg:p-8 shadow-2xl overflow-hidden aspect-square">
            
            <svg viewBox="0 0 800 800" className="w-full h-full relative z-10">
              <defs>
                <style>
                  {\`
                    @keyframes moveDash {
                      to { stroke-dashoffset: -24; }
                    }
                    .animated-route {
                      stroke-dasharray: 8 8;
                      animation: moveDash 1.5s linear infinite;
                    }
                    .pulse-ring {
                      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                    @keyframes pulse {
                      0%, 100% { opacity: 1; transform: scale(1); }
                      50% { opacity: .1; transform: scale(1.5); }
                    }
                  \`}
                </style>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E60000" />
                  <stop offset="100%" stopColor="#FFC700" />
                </linearGradient>
              </defs>

              {/* Uganda Shape */}
              <path 
                d="${path}" 
                fill="#f8fafc" 
                stroke="#cbd5e1" 
                strokeWidth="2.5" 
                className="drop-shadow-lg"
              />

              {/* Decorative Latitude/Longitude lines inside the 800x800 box */}
              <path d="M 0 400 L 800 400" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 400 0 L 400 800" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

`;

Object.keys(cities).filter(k => k !== 'kampala').forEach(k => {
  const start = cities.kampala;
  const end = cities[k];
  
  // Create a slight curve by offsetting the control point
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const cx = start[0] + dx / 2 - dy * 0.15; // perpendicular offset
  const cy = start[1] + dy / 2 + dx * 0.15;

  content += `              <path d="M ${start[0]} ${start[1]} Q ${cx} ${cy} ${end[0]} ${end[1]}" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" className="animated-route opacity-60" />\n`;
});

content += `\n              {/* City Nodes */}\n`;

Object.keys(cities).forEach(k => {
  const c = cities[k];
  const isKampala = k === 'kampala';
  const yOffset = k === 'entebbe' ? 24 : -16;
  const xOffset = (k === 'kampala' || k === 'hoima') ? -35 : (k === 'mbale' || k === 'jinja' || k === 'moroto' || k === 'soroti') ? 20 : 0;
  
  content += `
              <g transform="translate(${c[0]}, ${c[1]})">
                ${isKampala ? `<circle cx="0" cy="0" r="28" fill="#E60000" className="pulse-ring opacity-20" />` : ''}
                <circle cx="0" cy="0" r="${isKampala ? 10 : 5}" fill="${isKampala ? '#E60000' : '#0f172a'}" />
                ${isKampala ? `<circle cx="0" cy="0" r="4" fill="#FFC700" />` : ''}
                
                <text 
                  x="${xOffset}" 
                  y="${yOffset}" 
                  fill="${isKampala ? '#E60000' : '#1e293b'}" 
                  className="text-[14px] ${isKampala ? 'font-black text-lg' : 'font-bold'}" 
                  textAnchor="${(k === 'mbale' || k === 'jinja' || k === 'moroto' || k === 'soroti') ? 'start' : 'middle'}"
                  style={{ textShadow: '0 2px 4px rgba(255,255,255,1), 0 0 6px rgba(255,255,255,1), 0 0 10px rgba(255,255,255,1)' }}
                >
                  {t('map.${k}')}
                </text>
              </g>
`;
});

content += `
            </svg>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/ServiceMap.tsx', content);
