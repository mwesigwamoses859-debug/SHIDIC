import fs from 'fs';

const newContent = `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CITIES = [
  { id: "kampala", nameKey: "map.kampala", lat: 0.347596, lon: 32.582520, isHub: true, status: "Available" },
  { id: "entebbe", nameKey: "Entebbe", lat: 0.051184, lon: 32.463708, status: "Available" },
  { id: "jinja", nameKey: "map.jinja", lat: 0.4478, lon: 33.2026, status: "Available" },
  { id: "mbarara", nameKey: "map.mbarara", lat: -0.6071, lon: 30.6545, status: "Available" },
  { id: "gulu", nameKey: "map.gulu", lat: 2.7724, lon: 32.2990, status: "Limited" },
  { id: "mbale", nameKey: "map.mbale", lat: 1.0804, lon: 34.1750, status: "Available" },
  { id: "arua", nameKey: "map.arua", lat: 3.0201, lon: 30.9110, status: "Limited" },
  { id: "moroto", nameKey: "map.moroto", lat: 2.5345, lon: 34.6666, status: "Limited" },
  { id: "soroti", nameKey: "map.soroti", lat: 1.7146, lon: 33.6111, status: "Limited" },
  { id: "fort_portal", nameKey: "map.fort_portal", lat: 0.6599, lon: 30.2736, status: "Limited" },
  { id: "kabale", nameKey: "map.kabale", lat: -1.2486, lon: 29.9885, status: "Limited" },
  { id: "hoima", nameKey: "map.hoima", lat: 1.4331, lon: 31.3524, status: "Available" },
  { id: "lira", nameKey: "map.lira", lat: 2.2499, lon: 32.8999, status: "Limited" },
];

const createCustomIcon = (isHub: boolean, status: string) => {
  const color = isHub ? 'bg-[#FFC700]' : (status === 'Available' ? 'bg-[#E60000]' : 'bg-gray-500');
  const size = isHub ? 'w-6 h-6' : 'w-4 h-4';
  const pulse = isHub ? \`<div class="absolute inset-0 rounded-full \${color} animate-ping opacity-75"></div>\` : '';
  
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: \`
      <div class="relative flex items-center justify-center \${size}">
        \${pulse}
        <div class="relative z-10 rounded-full \${size} \${color} border-[3px] border-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
      </div>
    \`,
    iconSize: isHub ? [24, 24] : [16, 16],
    iconAnchor: isHub ? [12, 12] : [8, 8],
  });
};

export function ServiceMap() {
  const { t } = useLanguage();
  const kampala = CITIES.find(c => c.id === 'kampala')!;

  return (
    <div className="bg-black/70 backdrop-blur-xl py-24 px-6 overflow-hidden relative border-y border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight">
            {t("map.title")}
          </h2>
          <div className="w-16 h-2 bg-[#FFC700] mx-auto mt-6"></div>
          <p className="text-gray-300 font-medium mt-6 text-lg max-w-2xl mx-auto">
            {t("map.desc")}
          </p>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <div className="relative w-full max-w-5xl mx-auto bg-zinc-900/50 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-2 shadow-2xl overflow-hidden h-[500px] md:h-[650px]">
            <MapContainer 
              center={[1.3733, 32.2903]} // Center of Uganda
              zoom={6.5} 
              style={{ height: '100%', width: '100%', borderRadius: '2rem', backgroundColor: '#09090b' }}
              scrollWheelZoom={false}
              maxBounds={[[-1.5, 29.5], [4.5, 35.0]]}
              maxBoundsViscosity={1.0}
              minZoom={6}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              
              {/* Draw Lines from Kampala to everywhere */}
              {CITIES.filter(c => !c.isHub).map(city => (
                <Polyline 
                  key={\`line-\${city.id}\`}
                  positions={[[kampala.lat, kampala.lon], [city.lat, city.lon]]} 
                  color={city.status === "Available" ? "#E60000" : "#64748b"} 
                  weight={2} 
                  dashArray="6, 8"
                  opacity={0.6}
                />
              ))}

              {/* Draw Markers */}
              {CITIES.map(city => (
                <Marker 
                  key={\`marker-\${city.id}\`} 
                  position={[city.lat, city.lon]}
                  icon={createCustomIcon(city.isHub || false, city.status)}
                >
                  <Popup className="custom-popup">
                    <div className="font-bold text-center p-1">
                      <p className="text-lg text-slate-900">{t(city.nameKey) || city.nameKey}</p>
                      <p className={\`text-xs font-black uppercase tracking-wider \${city.status === 'Available' ? 'text-green-600' : 'text-orange-500'}\`}>
                        {city.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Reveal>
      </div>
      
      {/* Global styles for the leaflet popup to fit the dark theme slightly better or standard clean white */}
      <style>{\`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          border: 1px solid #f1f5f9;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
        .custom-leaflet-icon {
          background: transparent;
          border: none;
        }
      \`}</style>
    </div>
  );
}
`;

fs.writeFileSync('src/components/ServiceMap.tsx', newContent);
