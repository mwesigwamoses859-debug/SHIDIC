import fs from 'fs';

const newContent = `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

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

export function ServiceMap() {
  const { t } = useLanguage();
  const kampala = CITIES.find(c => c.id === 'kampala')!;

  return (
    <div className="bg-white/85 backdrop-blur-md py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal direction="up" className="text-center mb-12">
          <h2 className="text-slate-900 text-3xl md:text-4xl font-black uppercase tracking-tight">
            {t("map.title")}
          </h2>
          <div className="w-16 h-2 bg-[#E60000] mx-auto mt-6"></div>
          <p className="text-slate-600 font-medium mt-6 text-lg max-w-2xl mx-auto">
            {t("map.desc")}
          </p>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-2 shadow-2xl overflow-hidden h-[500px] md:h-[600px]">
            <MapContainer 
              center={[1.3733, 32.2903]} // Center of Uganda
              zoom={6} 
              style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Draw Lines from Kampala to everywhere */}
              {CITIES.filter(c => !c.isHub).map(city => (
                <Polyline 
                  key={\`line-\${city.id}\`}
                  positions={[[kampala.lat, kampala.lon], [city.lat, city.lon]]} 
                  color={city.status === "Available" ? "#E60000" : "#64748b"} 
                  weight={3} 
                  dashArray="10, 10"
                  opacity={0.6}
                />
              ))}

              {/* Draw Markers */}
              {CITIES.map(city => (
                <Marker key={\`marker-\${city.id}\`} position={[city.lat, city.lon]}>
                  <Popup>
                    <div className="font-bold text-center">
                      <p className="text-lg">{t(city.nameKey) || city.nameKey}</p>
                      <p className={\`text-xs uppercase \${city.status === 'Available' ? 'text-green-600' : 'text-orange-500'}\`}>
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
    </div>
  );
}
`;

fs.writeFileSync('src/components/ServiceMap.tsx', newContent);
