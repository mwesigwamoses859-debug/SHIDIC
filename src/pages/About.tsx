import { AboutSection } from '../components/AboutSection';

export function About() {
  return (
    <main 
      className="pt-20 min-h-screen relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <div className="relative z-10">
        <AboutSection />
      </div>
    </main>
  );
}
