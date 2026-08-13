import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { Car, MapPin, Power, CheckCircle, Navigation, DollarSign } from "lucide-react";
import { Reveal } from "../components/Reveal";

export function Driver() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [availableRides, setAvailableRides] = useState<any[]>([]);
  const [myActiveRide, setMyActiveRide] = useState<any | null>(null);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    if (!isOnline) {
      setAvailableRides([]);
      return;
    }

    // Listen for pending rides
    const qPending = query(collection(db, "bookings"), where("status", "==", "pending"));
    const unsubPending = onSnapshot(qPending, (snapshot) => {
      setAvailableRides(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    });

    // Listen for driver's active/accepted rides
    const qActive = query(collection(db, "bookings"), where("driver_id", "==", (user ? user.uid : "demo-driver")));
    const unsubActive = onSnapshot(qActive, (snapshot) => {
      const myRides = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      const active = myRides.find(r => r.status === "accepted" || r.status === "ongoing");
      setMyActiveRide(active || null);
      
      // Calculate earnings from completed
      const total = myRides
        .filter(r => r.status === "completed")
        .reduce((sum, r) => sum + (Number(r.estimatedPrice) || 0), 0);
      setEarnings(total);
    });

    return () => {
      unsubPending();
      unsubActive();
    };
  }, [user, isOnline]);

  const acceptRide = async (rideId: string) => {
    try {
      await updateDoc(doc(db, "bookings", rideId), {
        status: "accepted",
        driver_id: (user ? user.uid : "demo-driver"),
        accepted_at: new Date().toISOString()
      });
    } catch (e) {
      alert("Failed to accept ride. Someone else might have taken it.");
    }
  };

  const updateRideStatus = async (rideId: string, status: string) => {
    await updateDoc(doc(db, "bookings", rideId), { status });
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen">
        <h2 className="text-2xl font-black mb-4">Driver Portal</h2>
        <p>Please sign in to access the driver application.</p>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-24 bg-white/85 backdrop-blur-md min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header & Earnings */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Driver Mode</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Welcome back, {user.displayName}</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="px-4 py-2">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Today's Earnings</p>
              <p className="text-xl font-black text-gray-900 flex items-center"><DollarSign size={18}/> {earnings.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all ${isOnline ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-300'}`}
            >
              <Power size={24} />
            </button>
          </div>
        </div>

        {!isOnline ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Power size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">You are offline</h3>
            <p className="text-gray-500">Go online to start receiving ride requests.</p>
          </div>
        ) : myActiveRide ? (
          /* Active Trip View */
          <Reveal direction="up" className="bg-white rounded-3xl p-6 shadow-xl border-2 border-black">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {myActiveRide.status === 'accepted' ? 'En Route to Pickup' : 'Trip Ongoing'}
              </span>
              <span className="font-mono font-bold">{myActiveRide.id.slice(0,8).toUpperCase()}</span>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-3 rounded-full"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Pickup</p>
                  <p className="font-bold text-lg">{myActiveRide.pickup}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#E60000]/10 text-[#E60000] p-3 rounded-full"><Navigation size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Dropoff</p>
                  <p className="font-bold text-lg">{myActiveRide.dropoff}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {myActiveRide.status === 'accepted' ? (
                <button 
                  onClick={() => updateRideStatus(myActiveRide.id, 'ongoing')}
                  className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Confirm Arrived & Start Trip
                </button>
              ) : (
                <button 
                  onClick={() => updateRideStatus(myActiveRide.id, 'completed')}
                  className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <CheckCircle size={20} /> Complete Trip
                </button>
              )}
            </div>
          </Reveal>
        ) : (
          /* Available Rides List */
          <div className="space-y-4">
            <h3 className="font-bold text-gray-500 uppercase tracking-wider text-sm mb-4">Nearby Requests ({availableRides.length})</h3>
            {availableRides.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-medium">Finding rides...</p>
                </div>
              </div>
            ) : (
              availableRides.map(ride => (
                <Reveal key={ride.id} direction="up" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">New</span>
                      <span className="font-bold text-gray-900">{ride.distance} km</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-black text-green-600">{Number(ride.estimatedPrice).toLocaleString()} UGX</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 space-y-1">
                      <p className="flex items-center gap-2"><MapPin size={14}/> {ride.pickup}</p>
                      <p className="flex items-center gap-2 text-gray-400"><Navigation size={14}/> {ride.dropoff}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => acceptRide(ride.id)}
                    className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 self-start sm:self-center w-full sm:w-auto"
                  >
                    Accept
                  </button>
                </Reveal>
              ))
            )}
          </div>
        )}

      </div>
    </main>
  );
}
