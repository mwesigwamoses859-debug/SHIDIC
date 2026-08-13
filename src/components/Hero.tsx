import { Link } from "react-router-dom";
import { Car, Package, Phone, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="text-white overflow-hidden relative min-h-[85vh] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Urban_Rising%2C_KAMPALA%2C_Uganda.jpg/1280px-Urban_Rising%2C_KAMPALA%2C_Uganda.jpg')" }}>
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#FFC700] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#E60000] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 w-full">
        {/* Left Column - Content */}
        <Reveal
          direction="left"
          className="flex flex-col items-start justify-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Go anywhere with <span className="text-[#FFC700]">SHIDIC</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed">
              Request a ride, hop in, and go. Reliable, safe, and professional
              transportation across Uganda at your fingertips.
            </p>
          </div>

          {/* Service Selector Widget */}
          <div className="bg-white rounded-3xl p-2 flex w-full max-w-md shadow-2xl">
            <Link
              to="/book"
              className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group"
            >
              <Car
                size={32}
                className="text-black mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-black font-bold text-sm">Ride</span>
            </Link>
            <div className="w-2"></div>
            <Link
              to="/book"
              className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group"
            >
              <Package
                size={32}
                className="text-black mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-black font-bold text-sm">Package</span>
            </Link>
            <div className="w-2"></div>
            <a
              href="tel:+256757474950"
              className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group"
            >
              <Phone
                size={32}
                className="text-[#E60000] mb-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-black font-bold text-sm">Call Us</span>
            </a>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors border border-gray-700"
          >
            See prices <ArrowRight size={20} />
          </Link>
        </Reveal>

        {/* Right Column - Image */}
        <Reveal
          direction="right"
          delay={200}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Main Visual */}
          <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-zinc-900 bg-zinc-800 z-10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/2018-2023_Toyota_Alphard_X.jpg/1280px-2018-2023_Toyota_Alphard_X.jpg"
              alt="Transport"
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div className="bg-[#FFC700] text-black px-4 py-2 rounded-lg font-black uppercase tracking-wider shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                Top Rated Drivers
              </div>
            </div>
          </div>

          {/* Decorative shapes behind image */}
          <div className="absolute top-10 -right-10 w-full h-full bg-[#E60000] rounded-[3rem] -z-0 opacity-20 transform rotate-6"></div>
          <div className="absolute -bottom-10 -left-10 w-full h-full bg-[#FFC700] rounded-[3rem] -z-0 opacity-20 transform -rotate-6"></div>
        </Reveal>
      </div>
    </div>
  );
}
