import { BookingSection } from "../components/BookingSection";
import { FareEstimator } from "../components/FareEstimator";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";

export function Book() {
  const { t } = useLanguage();
  return (
    <main className="pt-32 pb-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <Reveal direction="down">
          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-4 uppercase">
            {t("book.title")}
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Choose your vehicle and set your destination. We'll handle the rest.
          </p>
        </Reveal>
      </div>
      <BookingSection />
    </main>
  );
}
