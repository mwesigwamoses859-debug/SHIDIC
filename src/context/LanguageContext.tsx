import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "sw";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "HOME",
    "nav.about": "ABOUT US",
    "nav.services": "SERVICES",
    "nav.book": "BOOK NOW",
    "nav.contact": "CONTACT US",
    "hero.safe": "SAFE AND RELIABLE",
    "hero.offering": "OFFERING",
    "hero.pickup": "PICKUP AND",
    "hero.dropoff": "DROP OFF",
    "hero.serviceFor": "SERVICE FOR",
    "hero.airport": "AIRPORT",
    "hero.school": "SCHOOL CHILDREN",
    "hero.business": "BUSINESS WORKERS",
    "hero.trips": "TRIPS",
    "hero.thisMonth": "THIS MONTH",
    "hero.saveUpTo": "Save Up To",
    "book.title": "BOOK YOUR RIDE",
    "book.dropoff": "Drop Off Location",
    "book.ride": "Ride",
    "book.delivery": "Delivery",
    "book.rentals": "Rentals",
    "book.vehicle.boda": "Boda Boda",
    "book.vehicle.boda.desc": "Fast and affordable motorcycle ride",
    "book.vehicle.standard": "Standard Car",
    "book.vehicle.standard.desc": "Comfortable everyday rides",
    "book.vehicle.vip": "Executive / VIP",
    "book.vehicle.vip.desc": "Premium vehicles for business & luxury",
    "book.name": "Full Name",
    "book.phone": "Phone Number",
    "book.pickup": "Pick Up Location",
    "book.service": "Service Type",
    "book.service.airport": "Airport Transfer",
    "book.service.school": "School Run",
    "book.service.business": "Business Trip",
    "book.service.general": "General Travel",
    "book.date": "Date",
    "book.time": "Time",
    "book.passengers": "Number of Passengers",
    "book.submit": "BOOK NOW VIA WHATSAPP",
    "book.contact": "CALL OR WHATSAPP",
    "book.safety": "YOUR SAFETY",
    "book.safety.desc": "OUR PRIORITY",
    "book.pro": "PROFESSIONAL DRIVERS",
    "book.pro.desc": "YOU CAN TRUST",
    "book.ontime": "ON TIME",
    "book.ontime.desc": "EVERY TIME EVERYWHERE",
    "about.title": "ABOUT US",
    "about.desc":
      "Shidic Transporters is your trusted transport partner offering safe, comfortable and reliable pickup and drop off services. We are committed to excellent service and customer satisfaction. Whether you need an airport transfer, a daily school run, or business travel arrangements, our modern fleet and professional team are ready to serve you.",
    "about.btn": "BOOK A RIDE",
    "about.why": "WHY CHOOSE US?",
    "about.why1.title": "Safe & Reliable",
    "about.why1.desc":
      "Your safety is our top priority. We maintain our vehicles to the highest standards.",
    "about.why2.title": "Professional Drivers",
    "about.why2.desc":
      "Experienced, vetted, and well-trained drivers ensuring a smooth journey.",
    "about.why3.title": "On Time Service",
    "about.why3.desc":
      "Punctual and dependable every time. We respect your schedule.",
    "services.title": "OUR SERVICES",
    "services.desc":
      "We offer a range of specialized transport services to meet your daily commuting, business, and travel needs with the highest standard of safety and comfort.",
    "services.s1.title": "AIRPORT TRANSFERS",
    "services.s1.desc":
      "Reliable and timely airport pickups and drop-offs to ensure you never miss a flight.",
    "services.s2.title": "SCHOOL CHILDREN",
    "services.s2.desc":
      "Safe and comfortable daily transport for your children to and from school.",
    "services.s3.title": "BUSINESS WORKERS",
    "services.s3.desc":
      "Professional transport services tailored for corporate employees and business trips.",
    "services.s4.title": "TRIPS & TRAVEL",
    "services.s4.desc":
      "Comfortable rides for your weekend getaways, city tours, and long-distance travels.",
    "contact.title": "CONTACT US",
    "contact.desc":
      "We are available 24/7. Reach out to us via WhatsApp, phone, or email and we'll get back to you immediately.",
    "contact.call": "Call / WhatsApp",
    "contact.chat": "Chat on WhatsApp",
    "contact.office": "Office Location",
    "contact.available": "Available Nationwide",
    "contact.email": "Email Us",
    "footer.call": "Call or Whatsapp",
    "footer.ready": "WE ARE READY TO",
    "footer.serve": "SERVE YOU ANYTIME, ANYWHERE!",
    "footer.rights": "Shidic Transporters. All Rights Reserved.",
    "nav.safety": "DRIVERS & SAFETY",
    "hiw.title": "HOW IT WORKS",
    "hiw.step1.title": "1. Book via WhatsApp",
    "hiw.step1.desc": "Send us your pickup details and preferred time.",
    "hiw.step2.title": "2. Driver Arrives",
    "hiw.step2.desc":
      "Our professional driver will arrive on time at your location.",
    "hiw.step3.title": "3. Safe Journey",
    "hiw.step3.desc":
      "Enjoy a comfortable and secure ride to your destination.",
    "fleet.title": "OUR FLEET",
    "fleet.van": "7-Seater Executive Van",
    "fleet.sedan": "Premium Sedan",
    "fleet.ac": "Air Conditioning",
    "fleet.wifi": "Free WiFi",
    "fleet.luggage": "Ample Luggage Space",
    "fleet.seats": "Seats",
    "fare.title": "ROUTE FARE ESTIMATOR",
    "fare.route": "Select Route",
    "fare.select": "-- Choose a popular route --",
    "fare.estimated": "Estimated Fare:",
    "fare.note":
      "Note: Fares are estimates and may vary slightly based on exact pickup/dropoff points.",
    "safety.title": "SAFETY & DRIVERS",
    "safety.desc":
      "Your safety is our priority. Meet the professionals behind the wheel.",
    "safety.vetting.title": "Strict Vetting Process",
    "safety.vetting.desc":
      "Every driver undergoes background checks, defensive driving courses, and regular evaluations.",
    "safety.maintenance.title": "Vehicle Maintenance",
    "safety.maintenance.desc":
      "Our fleet is inspected weekly to ensure every vehicle meets top safety and comfort standards.",
    "safety.profiles.title": "MEET OUR TOP DRIVERS",
    "safety.exp": "Years Experience",
    "map.title": "OUR SERVICE AREAS",
    "map.desc": "Seamless connections across the whole of Uganda.",
    "map.entebbe": "Entebbe Airport",
    "map.kampala": "Kampala",
    "map.jinja": "Jinja",
    "map.mbarara": "Mbarara",
    "map.gulu": "Gulu",
    "map.mbale": "Mbale",
    "map.arua": "Arua",
    "map.moroto": "Moroto",
    "map.soroti": "Soroti",
    "map.fort_portal": "Fort Portal",
    "map.kabale": "Kabale",
    "map.hoima": "Hoima",
    "map.lira": "Lira",
  },
  sw: {
    "nav.home": "NYUMBANI",
    "nav.about": "KUHUSU SISI",
    "nav.services": "HUDUMA",
    "nav.book": "WEKA NAFASI",
    "nav.contact": "WASILIANA NASI",
    "hero.safe": "SALAMA NA YA KUAMINIWA",
    "hero.offering": "TUNATOA HUDUMA YA",
    "hero.pickup": "KUCHUKUA NA",
    "hero.dropoff": "KUSHUSHA",
    "hero.serviceFor": "HUDUMA KWA",
    "hero.airport": "UWANJA WA NDEGE",
    "hero.school": "WATOTO WA SHULE",
    "hero.business": "WAFANYAKAZI",
    "hero.trips": "SAFARI",
    "hero.thisMonth": "MWEZI HUU",
    "hero.saveUpTo": "Okoa Hadi",
    "book.title": "WEKA NAFASI YA SAFARI",
    "book.dropoff": "Mahali pa Kushushwa",
    "book.ride": "Safari",
    "book.delivery": "Kutuma",
    "book.rentals": "Kukodisha",
    "book.vehicle.boda": "Boda Boda",
    "book.vehicle.boda.desc": "Usafiri wa haraka na nafuu",
    "book.vehicle.standard": "Gari la Kawaida",
    "book.vehicle.standard.desc": "Usafiri wa starehe wa kila siku",
    "book.vehicle.vip": "VIP / Kifahari",
    "book.vehicle.vip.desc": "Magari ya kifahari kwa biashara",
    "book.name": "Jina Kamili",
    "book.phone": "Nambari ya Simu",
    "book.pickup": "Mahali pa Kuchukuliwa",
    "book.service": "Aina ya Huduma",
    "book.service.airport": "Usafiri wa Uwanja wa Ndege",
    "book.service.school": "Usafiri wa Shule",
    "book.service.business": "Safari ya Kibiashara",
    "book.service.general": "Safari za Kawaida",
    "book.date": "Tarehe",
    "book.time": "Muda",
    "book.passengers": "Idadi ya Abiria",
    "book.submit": "WEKA NAFASI KUPITIA WHATSAPP",
    "book.contact": "PIGA AU WHATSAPP",
    "book.safety": "USALAMA WAKO",
    "book.safety.desc": "KIPAUMBELE CHETU",
    "book.pro": "MADEREVA WATAALAMU",
    "book.pro.desc": "UNAOWEZA KUWAAMINI",
    "book.ontime": "KWA WAKATI",
    "book.ontime.desc": "KILA WAKATI KILA MAHALI",
    "about.title": "KUHUSU SISI",
    "about.desc":
      "Shidic Transporters ni mshirika wako wa usafiri anayeaminika, tunatoa huduma salama na za uhakika za kuchukua na kushusha. Tumejitolea kutoa huduma bora. Iwe unahitaji usafiri wa uwanja wa ndege, shule, au biashara, timu yetu ipo tayari kukuhudumia.",
    "about.btn": "WEKA NAFASI",
    "about.why": "KWA NINI UTUCHAGUE?",
    "about.why1.title": "Salama na Ya Kuaminiwa",
    "about.why1.desc":
      "Usalama wako ni kipaumbele chetu. Tunatunza magari yetu katika viwango vya juu.",
    "about.why2.title": "Madereva Wataalamu",
    "about.why2.desc":
      "Madereva wenye uzoefu, waliothibitishwa na kufunzwa vyema.",
    "about.why3.title": "Huduma Kwa Wakati",
    "about.why3.desc":
      "Tunafika kwa wakati kila mara. Tunaheshimu ratiba yako.",
    "services.title": "HUDUMA ZETU",
    "services.desc":
      "Tunatoa aina mbalimbali za huduma za usafiri ili kukidhi mahitaji yako ya kila siku ya usafiri kwa kiwango cha juu cha usalama na faraja.",
    "services.s1.title": "USAHIRI WA UWANJA WA NDEGE",
    "services.s1.desc":
      "Tunakuchukua na kukushusha kwa wakati ili kuhakikisha hukosi safari yako ya ndege.",
    "services.s2.title": "WATOTO WA SHULE",
    "services.s2.desc":
      "Usafiri salama na wa starehe wa kila siku kwa watoto wako kwenda na kurudi shuleni.",
    "services.s3.title": "WAFANYAKAZI WA BIASHARA",
    "services.s3.desc":
      "Huduma za usafiri wa kitaalamu kwa wafanyakazi na safari za kibiashara.",
    "services.s4.title": "SAFARI NA UTALII",
    "services.s4.desc":
      "Usafiri wa starehe kwa mapumziko ya mwishoni mwa wiki, na safari za masafa marefu.",
    "contact.title": "WASILIANA NASI",
    "contact.desc":
      "Tupo masaa 24/7. Wasiliana nasi kupitia WhatsApp, simu, au barua pepe na tutakujibu mara moja.",
    "contact.call": "Piga / WhatsApp",
    "contact.chat": "Soga kwenye WhatsApp",
    "contact.office": "Ofisi Yetu",
    "contact.available": "Inapatikana Nchi Nzima",
    "contact.email": "Barua Pepe",
    "footer.call": "Piga au Whatsapp",
    "footer.ready": "TUKO TAYARI",
    "footer.serve": "KUKUHUDUMIA WAKATI WOWOTE!",
    "footer.rights": "Shidic Transporters. Haki Zote Zimehifadhiwa.",
    "nav.safety": "MADEREVA NA USALAMA",
    "hiw.title": "JINSI INAVYOFANYA KAZI",
    "hiw.step1.title": "1. Weka Nafasi WhatsApp",
    "hiw.step1.desc":
      "Tutumie maelezo yako ya kuchukuliwa na muda unaopendelea.",
    "hiw.step2.title": "2. Dereva Kufika",
    "hiw.step2.desc": "Dereva wetu mtaalamu atafika kwa wakati mahali pako.",
    "hiw.step3.title": "3. Safari Salama",
    "hiw.step3.desc": "Furahia safari ya starehe na salama hadi ufikapo.",
    "fleet.title": "MAGARI YETU",
    "fleet.van": "Gari la Watu 7 (Executive Van)",
    "fleet.sedan": "Gari Dogo (Premium Sedan)",
    "fleet.ac": "Kiyoyozi",
    "fleet.wifi": "WiFi ya Bure",
    "fleet.luggage": "Nafasi Kubwa ya Mizigo",
    "fleet.seats": "Viti",
    "fare.title": "KADIRIO LA BEI YA SAFARI",
    "fare.route": "Chagua Njia",
    "fare.select": "-- Chagua njia maarufu --",
    "fare.estimated": "Kadirio la Bei:",
    "fare.note":
      "Kumbuka: Bei hizi ni makadirio na zinaweza kubadilika kulingana na mahali hasa pa kuchukuliwa/kushushwa.",
    "safety.title": "USALAMA NA MADEREVA",
    "safety.desc":
      "Usalama wako ni kipaumbele chetu. Kutana na wataalamu wetu wa udereva.",
    "safety.vetting.title": "Uchunguzi Mkali",
    "safety.vetting.desc":
      "Kila dereva hupitia ukaguzi wa usalama, mafunzo ya udereva wa kujihami, na tathmini za mara kwa mara.",
    "safety.maintenance.title": "Matengenezo ya Magari",
    "safety.maintenance.desc":
      "Magari yetu hukaguliwa kila wiki ili kuhakikisha yanakidhi viwango vya juu vya usalama na faraja.",
    "safety.profiles.title": "KUTANA NA MADEREVA WETU BORA",
    "safety.exp": "Miaka ya Uzoefu",
    "map.title": "MAENEO TUNAYOHUDUMIA",
    "map.desc": "Tunatoa huduma nchi nzima kote Uganda.",
    "map.entebbe": "Entebbe Airport",
    "map.kampala": "Kampala",
    "map.jinja": "Jinja",
    "map.mbarara": "Mbarara",
    "map.gulu": "Gulu",
    "map.mbale": "Mbale",
    "map.arua": "Arua",
    "map.moroto": "Moroto",
    "map.soroti": "Soroti",
    "map.fort_portal": "Fort Portal",
    "map.kabale": "Kabale",
    "map.hoima": "Hoima",
    "map.lira": "Lira",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "sw" : "en"));
  };

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
