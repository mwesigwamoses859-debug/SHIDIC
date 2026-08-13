import { useState, useEffect } from 'react';
import { Search, Loader2, MapPin, Navigation, Clock, CheckCircle2, Car, Phone } from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function BookingTracker({ onBookingFound }: { onBookingFound?: (pickup: string, dropoff: string) => void }) {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [driver, setDriver] = useState<any>(null);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsLoading(true);
    setError("");
    setBooking(null);
    setDriver(null);

    try {
      // Remove "#SHD-" if the user pasted the full display ID
      let cleanId = searchId.trim().toUpperCase();
      if (cleanId.startsWith('#SHD-')) {
        cleanId = cleanId.replace('#SHD-', '');
      }

      // Query firestore by shortId
      const q = query(collection(db, "bookings"), where("shortId", "==", cleanId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Booking not found. Please check your ID and try again.");
      } else {
        const b = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as any;
        setBooking(b);
        if (onBookingFound && b.pickup && b.dropoff) {
          onBookingFound(b.pickup, b.dropoff);
        }
        
        if (b.driver_id) {
          // Fetch driver details if assigned
          const driverDoc = await getDoc(doc(db, "drivers", b.driver_id));
          if (driverDoc.exists()) {
             setDriver({ id: driverDoc.id, ...driverDoc.data() });
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching your booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'pending': return { text: 'Looking for driver', color: 'text-orange-600', bg: 'bg-orange-100', progress: 1 };
      case 'active': return { text: 'Driver assigned', color: 'text-blue-600', bg: 'bg-blue-100', progress: 2 };
      case 'ongoing': return { text: 'En route', color: 'text-[#FFC700]', bg: 'bg-yellow-100', progress: 3 };
      case 'completed': return { text: 'Completed', color: 'text-green-600', bg: 'bg-green-100', progress: 4 };
      case 'cancelled': return { text: 'Cancelled', color: 'text-red-600', bg: 'bg-red-100', progress: 0 };
      default: return { text: status, color: 'text-gray-600', bg: 'bg-gray-100', progress: 0 };
    }
  };

  const getEta = (status: string) => {
     if (status === 'pending') return 'Estimating...';
     if (status === 'active') return '5 - 10 mins';
     if (status === 'ongoing') return 'Arriving soon';
     if (status === 'completed') return 'Done';
     return '--';
  };

  return (
    <div className="flex-grow p-6 flex flex-col">
      <h3 className="text-2xl font-black text-gray-900 mb-6">Track Your Booking</h3>
      
      <form onSubmit={handleSearch} className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-2">Enter Booking ID</label>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. 8X9A2B4C"
              className="w-full bg-gray-50 border border-gray-200 py-4 pl-12 pr-4 rounded-xl focus:border-black focus:ring-1 focus:ring-black outline-none font-bold uppercase transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-black text-white px-8 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Track"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm font-bold mt-3">{error}</p>}
      </form>

      {booking && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Booking ID</p>
              <h4 className="text-2xl font-black text-gray-900">#SHD-{booking.shortId || booking.id.slice(0,8).toUpperCase()}</h4>
            </div>
            
            <div className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusDisplay(booking.status).bg} ${getStatusDisplay(booking.status).color}`}>
              {getStatusDisplay(booking.status).text}
            </div>
          </div>

          {/* Progress Timeline */}
          {booking.status !== 'cancelled' && (
            <div className="relative pt-2">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-1000 ease-in-out" 
                  style={{ width: `${(getStatusDisplay(booking.status).progress / 4) * 100}%` }}
                ></div>
              </div>
              <div className="relative flex justify-between">
                {[1, 2, 3, 4].map((step) => {
                  const isActive = getStatusDisplay(booking.status).progress >= step;
                  return (
                    <div key={step} className={`w-4 h-4 rounded-full border-4 shadow-sm transition-all duration-500 ${isActive ? 'bg-black border-white' : 'bg-gray-200 border-white'}`}></div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-3 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className={getStatusDisplay(booking.status).progress >= 1 ? 'text-black' : ''}>Requested</span>
                <span className={getStatusDisplay(booking.status).progress >= 2 ? 'text-black' : ''}>Assigned</span>
                <span className={getStatusDisplay(booking.status).progress >= 3 ? 'text-black' : ''}>En Route</span>
                <span className={getStatusDisplay(booking.status).progress >= 4 ? 'text-black' : ''}>Completed</span>
              </div>
            </div>
          )}

          {/* ETA & Driver */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-black">
                 <Clock size={20} />
               </div>
               <div>
                 <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Est. Arrival</p>
                 <p className="font-black text-xl text-gray-900">{getEta(booking.status)}</p>
               </div>
            </div>

            {driver ? (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-sm text-[#FFC700]">
                  <Car size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Driver Assigned</p>
                  <p className="font-black text-gray-900">{driver.name || driver.displayName || 'Your Driver'}</p>
                </div>
                <button className="ml-auto bg-white p-2 rounded-full shadow-sm text-gray-900 hover:text-black hover:bg-gray-100 transition-colors">
                  <Phone size={18} />
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center gap-2 border border-gray-100 border-dashed text-gray-400">
                <Loader2 size={16} className="animate-spin" />
                <span className="font-bold text-sm">Assigning driver...</span>
              </div>
            )}
          </div>

          {/* Locations */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#FFC700] mt-0.5" size={18} />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Pickup</p>
                <p className="font-bold text-gray-900">{booking.pickup}</p>
              </div>
            </div>
            <div className="h-px bg-gray-200 w-full ml-8"></div>
            <div className="flex items-start gap-3">
              <Navigation className="text-black mt-0.5" size={18} />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dropoff</p>
                <p className="font-bold text-gray-900">{booking.dropoff}</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
