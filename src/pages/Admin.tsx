import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ShieldCheck, Car, Package, Loader2, CheckCircle, Users, Activity, Settings, XCircle } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useAuth } from "../context/AuthContext";

export function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"rides" | "drivers">("rides");
  const [bookings, setBookings] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* if (!user) return; removed for demo */
    setLoading(true);

    const qRides = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubRides = onSnapshot(qRides, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const qDrivers = query(collection(db, "drivers"));
    const unsubDrivers = onSnapshot(qDrivers, (snapshot) => {
      setDrivers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubRides();
      unsubDrivers();
    };
  }, [user]);

  const updateRideStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleDriverActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "drivers", id), { active: !currentStatus });
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen">
        <h2 className="text-2xl font-black mb-4">Admin Portal</h2>
        <p>Please sign in to access the admin dashboard.</p>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-3xl p-4 lg:p-6 shadow-sm border border-gray-100 lg:sticky top-24">
            <div className="flex items-center gap-3 mb-4 lg:mb-8">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-[#FFC700]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none">Admin</h1>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Control Panel</p>
              </div>
            </div>

            <nav className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setActiveTab("rides")}
                className={`flex-shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
                  activeTab === "rides" ? "bg-black text-white" : "text-gray-500 hover:bg-white/85 backdrop-blur-md"
                }`}
              >
                <Activity size={18} /> Live Operations
              </button>
              <button 
                onClick={() => setActiveTab("drivers")}
                className={`flex-shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
                  activeTab === "drivers" ? "bg-black text-white" : "text-gray-500 hover:bg-white/85 backdrop-blur-md"
                }`}
              >
                <Users size={18} /> Manage Drivers
              </button>
              <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-400 opacity-50 cursor-not-allowed text-sm">
                <Settings size={18} /> Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin text-black" size={40} />
            </div>
          ) : activeTab === "rides" ? (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-black">Live Operations</h2>
                  <p className="text-sm text-gray-500 font-medium">Monitor and dispatch active rides</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center">
                  <span className="block text-2xl font-black text-[#E60000]">{bookings.filter(b => b.status === 'pending' || b.status === 'active' || b.status === 'ongoing').length}</span>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <Reveal key={booking.id} direction="up" className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E60000]">
                          {booking.type === 'ride' ? <Car size={20} /> : <Package size={20} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{booking.name}</h4>
                          <p className="text-xs text-gray-500 font-medium">{booking.phone}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'active' || booking.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {booking.status || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="relative pl-6 space-y-4 mb-6 flex-grow">
                      <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/85 backdrop-blur-md"></div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-gray-300 border-2 border-white"></div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Pickup</p>
                        <p className="text-sm font-medium text-gray-900">{booking.pickup}</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-[#E60000] border-2 border-white"></div>
                        <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Dropoff</p>
                        <p className="text-sm font-medium text-gray-900">{booking.dropoff}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center mb-4 text-sm font-bold">
                      <span className="text-gray-500">Est. Price:</span>
                      <span>{Number(booking.estimatedPrice).toLocaleString()} UGX</span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        disabled={booking.status === 'active' || booking.status === 'ongoing' || booking.status === 'completed' || booking.status === 'cancelled'}
                        onClick={() => updateRideStatus(booking.id, 'active')}
                        className="flex-1 bg-black text-white py-2 rounded-xl text-sm font-bold disabled:opacity-50 transition-opacity"
                      >
                        Force Dispatch
                      </button>
                      <button 
                        disabled={booking.status === 'cancelled' || booking.status === 'completed'}
                        onClick={() => updateRideStatus(booking.id, 'cancelled')}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-bold disabled:opacity-50 transition-colors hover:bg-red-100"
                      >
                        <XCircle size={16} /> Cancel
                      </button>
                    </div>
                  </Reveal>
                ))}
                {bookings.length === 0 && (
                  <div className="col-span-full py-24 text-center">
                    <p className="text-gray-500 font-medium">No bookings found.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-black">Manage Drivers</h2>
                  <p className="text-sm text-gray-500 font-medium">Approve, suspend, and review drivers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drivers.map(driver => (
                  <Reveal key={driver.id} direction="up" className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-4 items-center">
                    <img src={driver.image} alt={driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">{driver.name}</h4>
                      <div className="flex gap-2 text-xs font-bold uppercase mt-1">
                        <span className="bg-white/85 backdrop-blur-md text-gray-600 px-2 py-0.5 rounded flex items-center gap-1"><Car size={10}/> {driver.vehicleType}</span>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">★ {driver.rating}</span>
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={() => toggleDriverActive(driver.id, driver.active)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${driver.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                      >
                        {driver.active ? 'Suspend' : 'Approve'}
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
