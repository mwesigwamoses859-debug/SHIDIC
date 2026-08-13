import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// Replace LiveTracker import
content = content.replace(
  'import { LiveTracker } from "./LiveTracker";',
  'import { LiveTracker } from "./LiveTracker";\nimport { MapRoute } from "./MapRoute";'
);

// We need to keep LiveTracker for the "active" or "success" state if we want, or replace it entirely.
// The user said: "there should be a map direction when the user has requested for a ride".
// So I will replace the LiveTracker simulation entirely with MapRoute!

content = content.replace(
  '<LiveTracker />',
  '<MapRoute pickup={pickup} dropoff={dropoff} onDistanceCalculated={(dist) => setDistance(dist)} />'
);

// Remove the manual distance slider
// Target:
// <div className="space-y-2">
//   <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
//     <span>Est. Distance</span>
//     <span>{distance} km</span>
//   </div>
//   <input
//     type="range"
//     min="1"
//     max="100"
//     value={distance}
//     onChange={(e) => setDistance(Number(e.target.value))}
//     className="w-full accent-black h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//   />
//   <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-1">
//     <span>1 km</span>
//     <span>100 km</span>
//   </div>
// </div>

const sliderRegex = /<div className="space-y-2">[\s\S]*?<div className="flex justify-between text-\[10px\] text-gray-400 font-bold uppercase mt-1">[\s\S]*?<\/span>[\s\S]*?<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>/m;

content = content.replace(sliderRegex, `
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-medium text-gray-600 bg-white p-3 rounded-xl border border-gray-100">
      <span className="flex items-center gap-2"><MapPin size={16}/> Calculated Distance</span>
      <span className="font-bold text-black">{distance.toFixed(1)} km</span>
    </div>
    <p className="text-[10px] text-gray-400 uppercase font-bold text-center mt-2">
      Distance is calculated automatically based on pickup and dropoff locations via Google Maps.
    </p>
  </div>
`);

fs.writeFileSync('src/components/BookingSection.tsx', content);
