import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Clock, MapPin, Car, Package, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function TransportHistory() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Get booking IDs from localStorage
    const savedIds = JSON.parse(localStorage.getItem("shidic_booking_ids") || "[]");
    
    if (!savedIds || savedIds.length === 0) {
      setLoading(false);
      setHasHistory(false);
      return;
    }
    
    setHasHistory(true);

    // We can query up to 10 ids at once with 'in', so we'll slice the last 10
    const recentIds = savedIds.slice(-10);

    const q = query(
      collection(db, "bookings"),
      where("__name__", "in", recentIds)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort client-side by date since __name__ query restricts sorting on other fields easily
      historyData.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
      
      setBookings(historyData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching history:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!hasHistory) return null;

  return (
    <Reveal direction="up" delay={300} className="mt-12 w-full">
      <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <Clock className="text-[#E60000]" /> Transport History
      </h3>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#E60000]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E60000]">
                    {booking.type === 'ride' ? <Car size={20} /> : <Package size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 capitalize">{booking.type}</h4>
                    <p className="text-xs text-gray-500 font-medium">#{booking.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${
                  booking.status === 'completed' ? 'bg-green-100 text-green-700' : 
                  booking.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {booking.status || 'Pending'}
                </span>
              </div>
              
              <div className="relative pl-6 space-y-4 mb-4 flex-grow">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-gray-300 border-2 border-white"></div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Pickup</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{booking.pickup}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-[#E60000] border-2 border-white"></div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Dropoff</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{booking.dropoff}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <div className="text-xs text-gray-500 font-medium">
                  {booking.date} at {booking.time}
                </div>
                {booking.estimatedPrice && (
                  <div className="font-black text-gray-900">
                    {Number(booking.estimatedPrice).toLocaleString()} UGX
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Reveal>
  );
}
