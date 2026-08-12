const fs = require('fs');
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// Imports
content = content.replace(
  'import { LiveTracker } from "./LiveTracker";',
  'import { LiveTracker } from "./LiveTracker";\nimport { collection, addDoc, serverTimestamp } from "firebase/firestore";\nimport { db } from "../lib/firebase";\nimport { CheckCircle2 } from "lucide-react";'
);

// State
content = content.replace(
  'const [selectedVehicle, setSelectedVehicle] = useState<',
  'const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isSuccess, setIsSuccess] = useState(false);\n  const [bookingId, setBookingId] = useState<string | null>(null);\n  const [selectedVehicle, setSelectedVehicle] = useState<'
);

// Success View
const successView = `
          {isSuccess ? (
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 font-medium max-w-sm mx-auto mb-6">
                Your request has been received. We will connect you with a driver shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 w-full max-w-xs">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Booking ID</p>
                <p className="font-mono font-bold text-lg text-gray-900">{bookingId}</p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Book Another
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">`;

content = content.replace(
  '<div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">',
  successView
);

// Also need to close the success view ternary at the bottom of the form
content = content.replace(
  '</form>\n            </div>',
  '</form>\n            </div>\n          )}'
);

// Form submit handler
const newSubmit = `onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                    const formData = new FormData(e.currentTarget as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    
                    const docRef = await addDoc(collection(db, "bookings"), {
                      type: activeTab,
                      status: "pending",
                      name: data.name,
                      phone: data.phone,
                      pickup: data.pickup,
                      dropoff: data.dropoff,
                      date: data.date,
                      time: data.time,
                      vehicleType: activeTab === 'ride' ? selectedVehicle : null,
                      createdAt: serverTimestamp()
                    });
                    
                    setBookingId(docRef.id.slice(0, 8).toUpperCase());
                    setIsSuccess(true);
                    (e.target as HTMLFormElement).reset();
                  } catch (error) {
                    console.error("Error adding booking: ", error);
                    alert("Failed to submit booking. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}`;

content = content.replace(
  /onSubmit=\{\(e\) => \{[\s\S]*?\}\}/,
  newSubmit
);

// Update button text to show loading state
content = content.replace(
  /\{t\("book\.submit"\)\}\n\s*<\/button>/,
  '{isSubmitting ? "Processing..." : t("book.submit")}\n                  </button>'
);
content = content.replace(
  'disabled={isLoading}',
  'disabled={isLoading || isSubmitting}'
);
content = content.replace(
  'type="submit"',
  'type="submit"\n                    disabled={isSubmitting}'
);


fs.writeFileSync('src/components/BookingSection.tsx', content);
