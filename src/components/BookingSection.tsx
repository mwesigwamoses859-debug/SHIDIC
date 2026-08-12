import { useState, useEffect } from "react";
import {
  Phone,
  ShieldCheck,
  Users,
  Clock,
  MapPin,
  Navigation,
  Car,
  Bike,
  Package,
  FileText,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";
import { LiveTracker } from "./LiveTracker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { CheckCircle2 } from "lucide-react";

export function BookingSection() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ride" | "delivery">("ride");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<
    "boda" | "standard" | "vip"
  >("standard");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const vehicles = [
    {
      id: "boda",
      icon: Bike,
      name: t("book.vehicle.boda"),
      desc: t("book.vehicle.boda.desc"),
      price: "UGX 3,000+",
    },
    {
      id: "standard",
      icon: Car,
      name: t("book.vehicle.standard"),
      desc: t("book.vehicle.standard.desc"),
      price: "UGX 10,000+",
    },
    {
      id: "vip",
      icon: ShieldCheck,
      name: t("book.vehicle.vip"),
      desc: t("book.vehicle.vip.desc"),
      price: "UGX 50,000+",
    },
  ];

  return (
    <div id="booking-section" className="max-w-7xl mx-auto px-6 mt-12 pb-24">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Booking Form Card */}
        <Reveal
          direction="up"
          className="w-full lg:w-3/5 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
        >
          {isLoading ? (
            <div className="p-8 animate-pulse flex-grow flex flex-col">
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-12 bg-gray-200 rounded-full w-24"></div>
                <div className="h-12 bg-gray-100 rounded-full w-24"></div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="h-24 bg-gray-100 rounded-xl"></div>
                <div className="h-24 bg-gray-100 rounded-xl"></div>
                <div className="h-24 bg-gray-100 rounded-xl"></div>
              </div>
              <div className="h-14 bg-gray-200 rounded-xl w-full mt-auto"></div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col">
              {/* Header Tabs */}
              <div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
                <button
                  onClick={() => setActiveTab("ride")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${activeTab === "ride" ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <Car size={20} /> {t("book.ride")}
                </button>
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${activeTab === "delivery" ? "bg-black text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <Package size={20} /> {t("book.delivery")}
                </button>
              </div>

              <form
                className="p-6 md:p-8 space-y-6 flex-grow flex flex-col"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                    const formData = new FormData(
                      e.currentTarget as HTMLFormElement,
                    );
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
                      vehicleType:
                        activeTab === "ride" ? selectedVehicle : null,
                      createdAt: serverTimestamp(),
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
                }}
              >
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                      placeholder={t("book.name")}
                    />
                  </div>
                  <div>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                      placeholder={t("book.phone")}
                    />
                  </div>
                </div>

                {/* Locations (Uber Style) */}
                <div className="relative">
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 flex flex-col justify-between items-center z-0">
                    <div className="w-3 h-3 bg-black rounded-full -ml-[5px] mt-1"></div>
                    <div className="w-3 h-3 bg-[#E60000] rounded-none -ml-[5px] mb-1"></div>
                  </div>

                  <div className="space-y-3 relative z-10 pl-12">
                    <input
                      required
                      name="pickup"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                      placeholder={t("book.pickup")}
                    />
                    <input
                      required
                      name="dropoff"
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                      placeholder={t("book.dropoff")}
                    />
                  </div>
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    name="date"
                    type="date"
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                  />
                  <input
                    required
                    name="time"
                    type="time"
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-medium"
                  />
                </div>

                {/* Vehicle Selection */}
                {activeTab === "ride" && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Select Vehicle</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {vehicles.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVehicle(v.id as any)}
                          className={`cursor-pointer border-2 p-4 rounded-2xl flex flex-col items-center text-center transition-all ${selectedVehicle === v.id ? "border-black bg-gray-50 ring-2 ring-black ring-offset-1" : "border-gray-100 hover:border-gray-300"}`}
                        >
                          <v.icon
                            size={32}
                            className={`mb-2 ${selectedVehicle === v.id ? "text-black" : "text-gray-500"}`}
                          />
                          <span className="font-bold text-gray-900">
                            {v.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {v.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    {isSubmitting ? "Processing..." : t("book.submit")}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Reveal>

        {/* Right Side - Map Graphic & Trust */}
        <Reveal
          direction="up"
          delay={200}
          className="w-full lg:w-2/5 flex flex-col gap-6"
        >
          {isLoading ? (
            <div className="bg-gray-200 rounded-3xl h-full min-h-[400px] animate-pulse"></div>
          ) : (
            <>
              {/* Trip Summary Card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText size={18} className="text-[#FFC700]" /> Trip
                    Summary
                  </h4>
                  <span className="bg-green-100 text-green-700 font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-wide">
                    Confirmed
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 divide-x divide-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                      Booking ID
                    </span>
                    <span className="font-black text-gray-900 text-sm">
                      #SHD-8492
                    </span>
                  </div>
                  <div className="flex flex-col pl-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                      Driver
                    </span>
                    <span className="font-black text-gray-900 text-sm">
                      Moses K.
                    </span>
                  </div>
                  <div className="flex flex-col pl-3">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                      Plate
                    </span>
                    <span className="font-black text-gray-900 text-sm">
                      UBK 456
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Tracker Simulation */}
              <div className="flex-grow min-h-[400px]">
                <LiveTracker />
              </div>

              {/* Contact Banner */}
              <div className="bg-[#E60000] rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6 justify-center">
                <div className="bg-white text-[#E60000] p-4 rounded-full flex-shrink-0">
                  <Phone size={36} />
                </div>
                <div className="text-white text-center sm:text-left">
                  <h4 className="font-bold text-xl tracking-wider mb-1">
                    {t("book.contact")}
                  </h4>
                  <p className="text-[#FFC700] font-black text-2xl">
                    +256 757474950
                  </p>
                </div>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </div>
  );
}
