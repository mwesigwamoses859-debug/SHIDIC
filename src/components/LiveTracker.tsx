import { useState, useEffect } from "react";
import { Phone, Star } from "lucide-react";

export function LiveTracker() {
  const [status, setStatus] = useState("Finding driver...");
  const [eta, setEta] = useState("...");

  // Simulate real-time status updates synced with the 8-second CSS animation loop
  useEffect(() => {
    const cycle = () => {
      setStatus("Finding driver...");
      setEta("--");
      setTimeout(() => {
        setStatus("Driver en route");
        setEta("3 min");
      }, 1500);
      setTimeout(() => {
        setStatus("Arriving soon");
        setEta("1 min");
      }, 6000);
    };

    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#f8fafc] rounded-3xl overflow-hidden shadow-inner border border-gray-200 flex flex-col group">
      {/* Map Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full object-cover opacity-90"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <style>
              {`
                @keyframes driveRoute {
                  0% { transform: translate(40px, 80px) rotate(0deg); opacity: 0; }
                  5% { transform: translate(40px, 80px) rotate(0deg); opacity: 1; }
                  25% { transform: translate(280px, 80px) rotate(0deg); }
                  30% { transform: translate(280px, 80px) rotate(90deg); }
                  70% { transform: translate(280px, 320px) rotate(90deg); }
                  75% { transform: translate(280px, 320px) rotate(0deg); }
                  90% { transform: translate(360px, 320px) rotate(0deg); opacity: 1; }
                  95% { transform: translate(360px, 320px) rotate(0deg); opacity: 0; }
                  100% { transform: translate(40px, 80px) rotate(0deg); opacity: 0; }
                }
                .animate-car {
                  animation: driveRoute 8s ease-in-out infinite;
                }
                .pulse-pin {
                  animation: pulsePin 2s ease-out infinite;
                }
                @keyframes pulsePin {
                  0% { transform: scale(0.5); opacity: 1; }
                  100% { transform: scale(2.5); opacity: 0; }
                }
              `}
            </style>
          </defs>
          {/* Terrain/Grid */}
          <rect x="0" y="0" width="400" height="400" fill="#f1f5f9" />
          {/* Blocks / Parks (abstract) */}
          <rect x="20" y="20" width="220" height="40" rx="8" fill="#e2e8f0" />
          <rect
            x="320"
            y="20"
            width="60"
            height="260"
            rx="8"
            fill="#dcfce7"
          />{" "}
          {/* Park */}
          <rect x="20" y="120" width="220" height="160" rx="8" fill="#e2e8f0" />
          <rect
            x="20"
            y="320"
            width="220"
            height="60"
            rx="8"
            fill="#e0f2fe"
          />{" "}
          {/* Water */}
          <rect x="320" y="360" width="60" height="20" rx="8" fill="#e2e8f0" />
          {/* Background dashed roads */}
          <path
            d="M 0,80 L 400,80 M 280,0 L 280,400 M 0,320 L 400,320 M 360,0 L 360,400"
            stroke="#cbd5e1"
            strokeWidth="20"
            strokeLinecap="square"
            opacity="0.5"
          />
          {/* GPS Route Line */}
          <path
            d="M 40,80 L 280,80 L 280,320 L 360,320"
            fill="none"
            stroke="#FFC700"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pickup Pin */}
          <g transform="translate(360, 320)">
            <circle cx="0" cy="0" r="16" fill="#000000" className="pulse-pin" />
            <circle cx="0" cy="0" r="6" fill="#000000" />
            <circle cx="0" cy="0" r="2" fill="#FFC700" />
          </g>
          {/* Animated Car (Top-down view) */}
          <g className="animate-car">
            <circle
              cx="0"
              cy="0"
              r="14"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Chassis */}
            <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#000000" />
            {/* Roof / Windshield */}
            <rect x="-4" y="-4" width="8" height="8" rx="1" fill="#FFC700" />
          </g>
        </svg>
      </div>

      {/* Top Status Overlay */}
      <div className="absolute top-4 left-4 right-4 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between z-10 border border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC700] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFC700]"></span>
          </div>
          <span className="font-bold text-sm tracking-wide">{status}</span>
        </div>
        <div className="text-[10px] font-black bg-white/10 px-2 py-1 rounded text-white tracking-widest uppercase">
          Live Tracker
        </div>
      </div>

      {/* Driver Info Overlay (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 flex items-center justify-between z-10 transition-transform transform translate-y-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Driver"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center border-2 border-white shadow-sm whitespace-nowrap">
              4.9{" "}
              <Star
                size={8}
                className="ml-[2px] text-[#FFC700]"
                fill="currentColor"
              />
            </div>
          </div>
          <div>
            <h5 className="font-black text-gray-900 text-sm">Moses K.</h5>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mt-0.5">
              Toyota Hiace • UBK 456
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="block text-[9px] font-black text-gray-400 uppercase tracking-wider">
              ETA
            </span>
            <span className="block font-black text-lg text-black leading-none mt-1">
              {eta}
            </span>
          </div>
          <a
            href="tel:+256757474950"
            className="bg-black hover:bg-gray-800 p-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 text-white shadow-lg"
          >
            <Phone size={18} fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}
