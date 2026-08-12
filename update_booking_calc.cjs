const fs = require('fs');
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// Imports
content = content.replace(
  'import { CheckCircle2 } from "lucide-react";',
  'import { CheckCircle2, Calculator } from "lucide-react";\nimport { TransportHistory } from "./TransportHistory";'
);

// State variables
content = content.replace(
  /const \[bookingId, setBookingId\] = useState<string \| null>\(null\);/,
  `const [bookingId, setBookingId] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(5);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);`
);

// Calculate price effect
const calcEffect = `
  useEffect(() => {
    let baseRate = 0;
    let perKm = 0;
    
    if (activeTab === "ride") {
      if (selectedVehicle === "boda") {
        baseRate = 2000; perKm = 1500;
      } else if (selectedVehicle === "standard") {
        baseRate = 5000; perKm = 3000;
      } else if (selectedVehicle === "vip") {
        baseRate = 10000; perKm = 6000;
      }
    } else {
      // delivery
      baseRate = 3000; perKm = 2000;
    }
    
    setEstimatedPrice(baseRate + (distance * perKm));
  }, [distance, activeTab, selectedVehicle]);

  const vehicles = [`;
  
content = content.replace(
  'const vehicles = [',
  calcEffect
);

// Update addDoc to include estimatedPrice and distance
content = content.replace(
  'vehicleType: activeTab === \'ride\' ? selectedVehicle : null,',
  `vehicleType: activeTab === 'ride' ? selectedVehicle : null,
                      distance,
                      estimatedPrice,`
);

// Add booking ID storage
content = content.replace(
  'setBookingId(docRef.id.slice(0, 8).toUpperCase());',
  `setBookingId(docRef.id.slice(0, 8).toUpperCase());
                    
                    // Save to local history
                    const savedIds = JSON.parse(localStorage.getItem("shidic_booking_ids") || "[]");
                    if (!savedIds.includes(docRef.id)) {
                      savedIds.push(docRef.id);
                      localStorage.setItem("shidic_booking_ids", JSON.stringify(savedIds));
                    }`
);

// Add the price calculator UI above the submit button
const calculatorUI = `
                {/* Price Calculator */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-2">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Calculator size={18} className="text-[#E60000]" /> Estimated Cost
                    </h4>
                    <span className="font-black text-xl text-gray-900">
                      {estimatedPrice.toLocaleString()} UGX
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                      <span>Est. Distance</span>
                      <span>{distance} km</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                      className="w-full accent-black h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-1">
                      <span>1 km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">`;

content = content.replace(
  '<div className="mt-auto pt-6">',
  calculatorUI
);

// Show price and distance in success view
const successExtra = `
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 w-full max-w-xs space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Booking ID</p>
                  <p className="font-mono font-bold text-sm text-gray-900">{bookingId}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimated Price</p>
                  <p className="font-bold text-sm text-gray-900">{estimatedPrice.toLocaleString()} UGX</p>
                </div>
              </div>`;

content = content.replace(
  /<div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 w-full max-w-xs">\s*<p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Booking ID<\/p>\s*<p className="font-mono font-bold text-lg text-gray-900">\{bookingId\}<\/p>\s*<\/div>/,
  successExtra
);

// Add TransportHistory component at the bottom of the section
content = content.replace(
  '        </Reveal>\n      </div>\n    </div>',
  '        </Reveal>\n      </div>\n      \n      {/* Transport History Section */}\n      <TransportHistory />\n    </div>'
);


fs.writeFileSync('src/components/BookingSection.tsx', content);
