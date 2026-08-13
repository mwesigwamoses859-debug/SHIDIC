import { useState, useEffect } from "react";
import { Phone, ShieldCheck, Users, Clock, MapPin, Navigation, Car, Bike, Package, FileText, CheckCircle2, Calculator, Search, Wallet, Banknote } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { MapRoute } from "./MapRoute";
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TransportHistory } from "./TransportHistory";
import { LocationInsights } from "./LocationInsights";
import { BookingTracker } from "./BookingTracker";
import { BookingReceipt } from "./BookingReceipt";

export function BookingSection() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ride" | "delivery" | "track">("ride");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [lastBookingData, setLastBookingData] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  
  const [distance, setDistance] = useState<number>(5);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "momo">("cash");
  
  // Guest fields
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<"boda" | "standard" | "vip">("standard");
  const [driverStatus, setDriverStatus] = useState<"assigning" | "assigned">("assigning");

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let baseRate = 0;
    let perKm = 0;
    if (activeTab === "ride") {
      if (selectedVehicle === "boda") { baseRate = 2000; perKm = 1500; } 
      else if (selectedVehicle === "standard") { baseRate = 5000; perKm = 3000; } 
      else if (selectedVehicle === "vip") { baseRate = 10000; perKm = 6000; }
    } else {
      baseRate = 3000; perKm = 2000;
    }
    setEstimatedPrice(Math.round(baseRate + distance * perKm));
  }, [distance, activeTab, selectedVehicle]);

  const vehicles = [
    { id: "boda", icon: Bike, name: t("book.vehicle.boda"), price: "UGX 3K+" },
    { id: "standard", icon: Car, name: t("book.vehicle.standard"), price: "UGX 10K+" },
    { id: "vip", icon: ShieldCheck, name: t("book.vehicle.vip"), price: "UGX 50K+" },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        type: activeTab,
        pickup,
        dropoff,
        distance,
        date,
        time,
        vehicle: selectedVehicle,
        price: estimatedPrice,
        paymentMethod,
        customerName: user ? user.displayName : guestName,
        customerEmail: user ? user.email : "",
        customerPhone: guestPhone,
        userId: user ? user.uid : "guest",
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      
      const savedData = {
        ...bookingData,
        id: docRef.id,
        createdAt: new Date().toISOString()
      };
      
      setLastBookingData(savedData);
      setBookingId(docRef.id);
      setIsSuccess(true);
      setDriverStatus("assigning");
      
      // Simulate driver finding for demo purposes if no driver picks it up, but also listen
      
      const unsub = onSnapshot(doc(db, "bookings", docRef.id), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.status === 'accepted' || data.status === 'ongoing') {
            setDriverStatus("assigned");
          }
        }
      });
      // Fallback visual for the demo if nobody is on the Driver page
      setTimeout(() => {
        setDriverStatus(prev => prev === "assigning" ? "assigned" : prev);
      }, 5000);

      
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to submit booking. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="booking-section" className="max-w-7xl mx-auto px-6 mt-12 pb-24">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Left Side - Booking Form */}
        <Reveal direction="up" className="w-full lg:w-3/5 bg-transparent rounded-3xl border border-gray-100 overflow-hidden flex flex-col backdrop-blur-xl bg-white/85 shadow-2xl">
          {isLoading ? (
            <div className="p-8 animate-pulse flex-grow flex flex-col">
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col h-full relative">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => { setActiveTab("ride"); setIsSuccess(false); }}
                  className={`flex-1 py-5 font-bold text-sm tracking-wide transition-all border-b-2 ${activeTab === "ride" ? "border-black text-black bg-white" : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                >
                  <Car size={18} className="inline mr-2" /> {t("book.tab.ride")}
                </button>
                <button
                  onClick={() => { setActiveTab("delivery"); setIsSuccess(false); }}
                  className={`flex-1 py-5 font-bold text-sm tracking-wide transition-all border-b-2 ${activeTab === "delivery" ? "border-black text-black bg-white" : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                >
                  <Package size={18} className="inline mr-2" /> Delivery
                </button>
                <button
                  onClick={() => { setActiveTab("track"); setIsSuccess(false); }}
                  className={`flex-1 py-5 font-bold text-sm tracking-wide transition-all border-b-2 ${activeTab === "track" ? "border-black text-black bg-white" : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-black"}`}
                >
                  <Search size={18} className="inline mr-2" /> Track
                </button>
              </div>

              {activeTab === "track" ? (
                <BookingTracker />
              ) : isSuccess ? (
                <div className="p-12 flex flex-col items-center justify-center text-center h-full flex-grow bg-white/50">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-black mb-3">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-2 font-medium">Your request has been securely placed.</p>
                  <div className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-lg mb-8 tracking-wider border border-gray-200">
                    ID: #SHD-{bookingId?.substring(0, 6).toUpperCase()}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowReceipt(true)}
                      className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
                    >
                      View Receipt
                    </button>
                    <button
                      onClick={() => { setIsSuccess(false); setPickup(""); setDropoff(""); }}
                      className="bg-gray-200 text-black px-8 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors active:scale-95"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-grow flex flex-col">
                  {!user && (
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-2">
                      <p className="text-sm font-bold text-orange-800 mb-3">Book as Guest</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input required value={guestName} onChange={e => setGuestName(e.target.value)} type="text" placeholder="Your Name" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none font-medium text-sm" />
                        <input required value={guestPhone} onChange={e => setGuestPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none font-medium text-sm" />
                      </div>
                    </div>
                  )}

                  {/* Locations */}
                  <div className="relative">
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>
                    <div className="space-y-4 relative z-10">
                      <input required value={pickup} onChange={e => setPickup(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 p-4 pl-14 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium" placeholder={t("book.pickup")} />
                      <input required value={dropoff} onChange={e => setDropoff(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 p-4 pl-14 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium" placeholder={t("book.dropoff")} />
                    </div>
                  </div>

                  <LocationInsights pickup={pickup} dropoff={dropoff} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required value={date} onChange={e => setDate(e.target.value)} type="date" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium" />
                    <input required value={time} onChange={e => setTime(e.target.value)} type="time" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium" />
                  </div>

                  {activeTab === "ride" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900">Select Vehicle</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {vehicles.map((v) => (
                          <div key={v.id} onClick={() => setSelectedVehicle(v.id as any)} className={`cursor-pointer border-2 p-3 rounded-xl flex flex-col items-center text-center transition-all ${selectedVehicle === v.id ? "border-black bg-gray-50 ring-2 ring-black" : "border-gray-100 hover:border-gray-300"}`}>
                            <v.icon size={24} className={`mb-1 ${selectedVehicle === v.id ? "text-black" : "text-gray-500"}`} />
                            <span className="font-bold text-xs text-gray-900">{v.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Payment Method</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div onClick={() => setPaymentMethod("cash")} className={`cursor-pointer border-2 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${paymentMethod === "cash" ? "border-black bg-gray-50 ring-2 ring-black" : "border-gray-100"}`}>
                        <Banknote size={20} className={paymentMethod === "cash" ? "text-black" : "text-gray-500"} />
                        <span className="font-bold text-sm">Cash</span>
                      </div>
                      <div onClick={() => setPaymentMethod("momo")} className={`cursor-pointer border-2 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${paymentMethod === "momo" ? "border-black bg-gray-50 ring-2 ring-black" : "border-gray-100"}`}>
                        <Wallet size={20} className={paymentMethod === "momo" ? "text-black" : "text-gray-500"} />
                        <span className="font-bold text-sm">Mobile Money</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Calculator */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <Calculator size={18} className="text-[#E60000]" /> Estimated Cost
                      </h4>
                      <span className="font-black text-xl text-gray-900">{estimatedPrice.toLocaleString()} UGX</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                      <span>Distance</span>
                      <span className="font-bold text-black">{distance.toFixed(1)} km</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg active:scale-[0.98]">
                      {isSubmitting ? "Processing..." : t("book.submit")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </Reveal>

        {/* Right Side - Map Graphic */}
        <Reveal direction="up" delay={200} className="w-full lg:w-2/5 flex flex-col gap-6">
          {isLoading ? (
            <div className="bg-gray-200 rounded-3xl h-full min-h-[400px] animate-pulse"></div>
          ) : (
            <>
              {isSuccess && bookingId && (
                <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <FileText size={18} className="text-[#FFC700]" /> Trip Status
                    </h4>
                    <span className={`font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-wide ${driverStatus === 'assigned' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700 animate-pulse'}`}>
                      {driverStatus === 'assigned' ? 'Driver Assigned' : 'Finding Driver...'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Payment</span>
                      <span className="font-black text-gray-900 text-sm uppercase">{paymentMethod}</span>
                    </div>
                    <div className="flex flex-col pl-3 border-l border-gray-100">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Est. Cost</span>
                      <span className="font-black text-gray-900 text-sm">{estimatedPrice.toLocaleString()} UGX</span>
                    </div>
                  </div>
                  {driverStatus === 'assigned' && (
                    <div className="mt-2 bg-green-50 p-3 rounded-xl border border-green-100 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center"><UserCheck className="text-green-700" size={20} /></div>
                      <div>
                        <p className="text-xs font-bold text-green-800">Driver John is on the way!</p>
                        <p className="text-xs text-green-600">Toyota Prius • UAB 123C</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex-grow min-h-[400px]">
                <MapRoute pickup={pickup} dropoff={dropoff} onDistanceCalculated={(dist) => setDistance(dist)} />
              </div>
              
              <div className="bg-[#E60000] rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6 justify-center">
                <div className="bg-white text-[#E60000] p-4 rounded-full flex-shrink-0">
                  <Phone size={36} />
                </div>
                <div className="text-white text-center sm:text-left">
                  <h4 className="font-bold text-xl tracking-wider mb-1">{t("book.contact")}</h4>
                  <p className="text-[#FFC700] font-black text-2xl">+256 757474950</p>
                </div>
              </div>
            </>
          )}
        </Reveal>
      </div>

      <TransportHistory />
      
      {showReceipt && lastBookingData && (
        <BookingReceipt booking={lastBookingData} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}

// Quick fallback for UserCheck import missing
function UserCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  );
}
