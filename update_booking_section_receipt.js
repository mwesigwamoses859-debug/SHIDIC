import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// Add imports
content = content.replace(
  'import { BookingTracker } from "./BookingTracker";\nimport { Search } from "lucide-react";',
  'import { BookingTracker } from "./BookingTracker";\nimport { Search, FileText } from "lucide-react";\nimport { BookingReceipt } from "./BookingReceipt";'
);

// Add state
content = content.replace(
  'const [bookingId, setBookingId] = useState<string | null>(null);',
  'const [bookingId, setBookingId] = useState<string | null>(null);\n  const [lastBookingData, setLastBookingData] = useState<any>(null);\n  const [showReceipt, setShowReceipt] = useState(false);'
);

// Update submit handler
const oldSubmit = `setBookingId(shortId);
                    setIsSuccess(true);`;

const newSubmit = `setBookingId(shortId);
                    setLastBookingData({
                      shortId,
                      name: data.name,
                      phone: data.phone,
                      pickup: data.pickup,
                      dropoff: data.dropoff,
                      date: data.date,
                      time: data.time,
                      type: activeTab,
                      vehicleType: activeTab === "ride" ? selectedVehicle : null,
                      distance: distance.toFixed(1),
                      estimatedPrice: estimatedPrice
                    });
                    setIsSuccess(true);`;

content = content.replace(oldSubmit, newSubmit);

// Update success view
const oldSuccessView = `<button
                    onClick={() => {
                        setIsSuccess(false);
                        setBookingId(null);
                        setPickup("");
                        setDropoff("");
                        setDistance(0);
                    }}
                    className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Book Another Ride
                  </button>`;

const newSuccessView = `<div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowReceipt(true)}
                      className="bg-white border-2 border-black text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText size={18} /> View Receipt
                    </button>
                    <button
                      onClick={() => {
                          setIsSuccess(false);
                          setBookingId(null);
                          setPickup("");
                          setDropoff("");
                          setDistance(0);
                      }}
                      className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                      Book Another Ride
                    </button>
                  </div>`;

content = content.replace(oldSuccessView, newSuccessView);

// Add the receipt modal at the end of the component
content = content.replace(
  '<TransportHistory />\n    </div>\n  );\n}',
  '<TransportHistory />\n      {showReceipt && lastBookingData && (\n        <BookingReceipt booking={lastBookingData} onClose={() => setShowReceipt(false)} />\n      )}\n    </div>\n  );\n}'
);

fs.writeFileSync('src/components/BookingSection.tsx', content);
