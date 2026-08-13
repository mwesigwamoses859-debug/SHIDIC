import { BookingSection } from "../components/BookingSection";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";

export function Book() {
  const { t } = useLanguage();

  return (
    <main 
      className="pt-32 pb-12 min-h-screen relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <Reveal direction="down">
            <div className="bg-white/85 backdrop-blur-md p-8 rounded-3xl max-w-3xl mx-auto shadow-xl">
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4 uppercase">
                {t("book.title")}
              </h1>
              <div className="w-16 h-2 bg-[#E60000] mx-auto mb-4"></div>
              <p className="text-gray-800 text-lg font-medium max-w-2xl mx-auto">
                Choose your vehicle and set your destination. We'll handle the rest.
              </p>
            </div>
          </Reveal>
        </div>

        <BookingSection />
      </div>
    </main>
  );
}
