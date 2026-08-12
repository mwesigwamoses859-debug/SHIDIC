import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Star, ShieldCheck, Car } from "lucide-react";
import { Reveal } from "./Reveal";

export function MeetOurDrivers() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const q = query(collection(db, "drivers"));
        const querySnapshot = await getDocs(q);
        const driverData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDrivers(driverData);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-6">Meet Our Drivers</h2>
          <p className="text-gray-500 font-medium">
            Our authorized drivers are experienced, highly rated, and dedicated to getting you or your package safely to the destination.
          </p>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {drivers.map((driver, idx) => (
              <Reveal key={driver.id} direction="up" delay={idx * 100} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50">
                  <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{driver.name}</h3>
                <div className="flex items-center gap-1 text-[#FFC700] mb-4">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-gray-900 text-sm">{driver.rating}</span>
                </div>
                <div className="w-full space-y-2 mt-auto">
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-xl text-sm">
                    <span className="text-gray-500 font-medium">Experience</span>
                    <span className="font-bold text-gray-900">{driver.experience}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-xl text-sm">
                    <span className="text-gray-500 font-medium">Vehicle</span>
                    <span className="font-bold text-gray-900 capitalize flex items-center gap-1">
                      <Car size={14} /> {driver.vehicleType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-xl text-sm">
                    <span className="text-gray-500 font-medium">Trips</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <ShieldCheck size={14} className="text-green-500" /> {driver.trips}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
