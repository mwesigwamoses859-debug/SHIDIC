const fs = require('fs');
let content = fs.readFileSync('src/components/ServiceMap.tsx', 'utf8');

const newImports = `import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

export function ServiceMap() {
  const { t } = useLanguage();
  const [hoverInfo, setHoverInfo] = useState<{ visible: boolean; x: number; y: number; nameKey: string; status: "Available" | "Limited" } | null>(null);`;

content = content.replace(
  /import \{ Reveal \} from "\.\/Reveal";\nimport \{ useLanguage \} from "\.\.\/context\/LanguageContext";\n\nexport function ServiceMap\(\) \{\n  const \{ t \} = useLanguage\(\);/,
  newImports
);

const svgEndIndex = content.lastIndexOf('</svg>');
const firstCityIndex = content.indexOf('<g transform="translate(420.4990145837796, 548.6968591535494)">');

const citiesCode = `
              {/* Tooltip implementation */}
              {[
                { id: 'entebbe', translate: 'translate(420.4990145837796, 548.6968591535494)', nameKey: 'map.entebbe', textX: 0, textY: 24, textAnchor: 'middle', status: 'Available' },
                { id: 'kampala', translate: 'translate(434.25610183906656, 515.2753210800589)', nameKey: 'map.kampala', textX: -35, textY: -16, textAnchor: 'middle', status: 'Available', isHub: true },
                { id: 'jinja', translate: 'translate(503.9624206909575, 505.0106065236081)', nameKey: 'map.jinja', textX: 20, textY: -16, textAnchor: 'start', status: 'Available' },
                { id: 'mbarara', translate: 'translate(217.7363938538133, 622.5035056492834)', nameKey: 'map.mbarara', textX: 0, textY: -16, textAnchor: 'middle', status: 'Available' },
                { id: 'gulu', translate: 'translate(402.4182713339728, 242.84227776825446)', nameKey: 'map.gulu', textX: 0, textY: -16, textAnchor: 'middle', status: 'Limited' },
                { id: 'mbale', translate: 'translate(613.0982361577976, 432.7819634378352)', nameKey: 'map.mbale', textX: 20, textY: -16, textAnchor: 'start', status: 'Available' },
                { id: 'arua', translate: 'translate(246.12652983860244, 213.8421998469305)', nameKey: 'map.arua', textX: 0, textY: -16, textAnchor: 'middle', status: 'Limited' },
                { id: 'moroto', translate: 'translate(668.3062695839135, 269.5877980994655)', nameKey: 'map.moroto', textX: 20, textY: -16, textAnchor: 'start', status: 'Limited' },
                { id: 'soroti', translate: 'translate(549.7707136822355, 361.7289509050375)', nameKey: 'map.soroti', textX: 20, textY: -16, textAnchor: 'start', status: 'Limited' },
                { id: 'fort_portal', translate: 'translate(175.0501173988373, 480.20177226210507)', nameKey: 'map.fort_portal', textX: 0, textY: -16, textAnchor: 'middle', status: 'Limited' },
                { id: 'kabale', translate: 'translate(142.35878597015153, 694.7015760914176)', nameKey: 'map.kabale', textX: 0, textY: -16, textAnchor: 'middle', status: 'Limited' },
                { id: 'hoima', translate: 'translate(296.1124852453636, 393.3541382084369)', nameKey: 'map.hoima', textX: -35, textY: -16, textAnchor: 'middle', status: 'Available' },
                { id: 'lira', translate: 'translate(469.9122259497085, 301.5770725668938)', nameKey: 'map.lira', textX: 0, textY: -16, textAnchor: 'middle', status: 'Limited' },
              ].map(city => (
                <g 
                  key={city.id} 
                  transform={city.translate}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onMouseEnter={(e) => setHoverInfo({ visible: true, x: e.clientX, y: e.clientY, nameKey: city.nameKey, status: city.status })}
                  onMouseMove={(e) => setHoverInfo(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setHoverInfo(null)}
                >
                  {city.isHub ? (
                    <>
                      <circle cx="0" cy="0" r="28" fill="#E60000" className="pulse-ring opacity-20 pointer-events-none" />
                      <circle cx="0" cy="0" r="12" fill="#E60000" className="pointer-events-none" />
                      <circle cx="0" cy="0" r="4" fill="#FFC700" className="pointer-events-none" />
                      <circle cx="0" cy="0" r="28" fill="transparent" />
                    </>
                  ) : (
                    <>
                      <circle cx="0" cy="0" r="12" fill="transparent" />
                      <circle cx="0" cy="0" r="5" fill={city.status === "Available" ? "#FFC700" : "#0f172a"} className="pointer-events-none" />
                    </>
                  )}
                  <text
                    x={city.textX}
                    y={city.textY}
                    fill={city.isHub ? "#E60000" : "#1e293b"}
                    className={city.isHub ? "text-[14px] font-black text-lg pointer-events-none" : "text-[14px] font-bold pointer-events-none"}
                    textAnchor={city.textAnchor}
                    style={{
                      textShadow: "0 2px 4px rgba(255,255,255,1), 0 0 6px rgba(255,255,255,1), 0 0 10px rgba(255,255,255,1)",
                    }}
                  >
                    {t(city.nameKey)}
                  </text>
                </g>
              ))}
`;

const part1 = content.slice(0, firstCityIndex);
const part3 = content.slice(svgEndIndex);

let finalContent = part1 + citiesCode + part3;

finalContent = finalContent.replace('</div>\n    </div>', `</div>
      <AnimatePresence>
        {hoverInfo && hoverInfo.visible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed pointer-events-none z-50 bg-white shadow-2xl border border-gray-100 rounded-xl p-3 flex flex-col gap-1"
            style={{ 
              left: hoverInfo.x, 
              top: hoverInfo.y,
              transform: 'translate(-50%, -120%)' 
            }}
          >
            <div className="font-black text-slate-900 text-sm whitespace-nowrap">
              {t(hoverInfo.nameKey)}
            </div>
            <div className="flex items-center gap-1.5">
              <div className={hoverInfo.status === 'Available' ? 'w-2 h-2 rounded-full bg-green-500' : 'w-2 h-2 rounded-full bg-orange-400'}></div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                {hoverInfo.status}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>`);

fs.writeFileSync('src/components/ServiceMap.tsx', finalContent);
