import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

content = content.replace(
  'import { collection, addDoc, serverTimestamp } from "firebase/firestore";',
  'import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";'
);

content = content.replace(
  'import { TransportHistory } from "./TransportHistory";\nimport { LocationInsights } from "./LocationInsights";',
  'import { TransportHistory } from "./TransportHistory";\nimport { LocationInsights } from "./LocationInsights";\nimport { BookingTracker } from "./BookingTracker";\nimport { Search } from "lucide-react";'
);

content = content.replace(
  'const [activeTab, setActiveTab] = useState<"ride" | "delivery">("ride");',
  'const [activeTab, setActiveTab] = useState<"ride" | "delivery" | "track">("ride");'
);

const oldSubmit = `const docRef = await addDoc(collection(db, "bookings"), {
                      type: activeTab,
                      status: "pending",
                      name: data.name,
                      phone: data.phone,
                      pickup: data.pickup,
                      dropoff: data.dropoff,
                      date: data.date,
                      time: data.time,
                      vehicleType:
                        activeTab === "ride" ? selectedVehicle : null,
                      createdAt: serverTimestamp(),
                    });

                    setBookingId(docRef.id.slice(0, 8).toUpperCase());`;

const newSubmit = `const newDocRef = doc(collection(db, "bookings"));
                    const shortId = newDocRef.id.slice(0, 8).toUpperCase();
                    await setDoc(newDocRef, {
                      type: activeTab,
                      status: "pending",
                      shortId: shortId,
                      name: data.name,
                      phone: data.phone,
                      pickup: data.pickup,
                      dropoff: data.dropoff,
                      date: data.date,
                      time: data.time,
                      vehicleType:
                        activeTab === "ride" ? selectedVehicle : null,
                      createdAt: serverTimestamp(),
                    });

                    setBookingId(shortId);`;

content = content.replace(oldSubmit, newSubmit);

// Add the track tab
const oldTabs = `<button
                  onClick={() => setActiveTab("delivery")}
                  className={\`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all \${activeTab === "delivery" ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}\`}
                >
                  <Package size={20} /> {t("book.delivery")}
                </button>
              </div>`;

const newTabs = `<button
                  onClick={() => setActiveTab("delivery")}
                  className={\`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all \${activeTab === "delivery" ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}\`}
                >
                  <Package size={20} /> {t("book.delivery")}
                </button>
                <button
                  onClick={() => setActiveTab("track")}
                  className={\`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all \${activeTab === "track" ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}\`}
                >
                  <Search size={20} /> Track Booking
                </button>
              </div>`;

content = content.replace(oldTabs, newTabs);

// Form / Tracker conditionally render
const oldFormContent = `(
                <form`;
const newFormContent = `activeTab === "track" ? <BookingTracker /> : (
                <form`;

content = content.replace(oldFormContent, newFormContent);

fs.writeFileSync('src/components/BookingSection.tsx', content);
