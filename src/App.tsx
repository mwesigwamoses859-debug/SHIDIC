import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollProgress } from "./components/ScrollProgress";
import { PageTransition } from "./components/PageTransition";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Book } from "./pages/Book";
import { Contact } from "./pages/Contact";
import { Safety } from "./pages/Safety";
import { Admin } from "./pages/Admin";
import { Driver } from "./pages/Driver";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error React 18+ key type conflict with react-router */}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/safety"
          element={
            <PageTransition>
              <Safety />
            </PageTransition>
          }
        />
        <Route
          path="/book"
          element={
            <PageTransition>
              <Book />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <Admin />
            </PageTransition>
          }
        />
        <Route
          path="/driver"
          element={
            <PageTransition>
              <Driver />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black font-sans selection:bg-[#FFC700] selection:text-black scroll-smooth">
          <ScrollProgress />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </LanguageProvider>
    </AuthProvider>
  );
}
