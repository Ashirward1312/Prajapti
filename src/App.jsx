import { Routes, Route } from "react-router-dom";

import HeroSection from "./Pages/Hero/Hero";
import Header from "./Pages/Header/Header";
import Services from "./Pages/Services/Services";
import About from "./Pages/About/About";
import Why from "./Pages/Why/Why";
import Faq from "./Pages/Faq/Faq";
import Brand from "./Pages/Brands/Brands";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Pages/Footer/Footer";

import ScrollToTop from "./Pages/Footer/Scrolltotop";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Route change par top scroll */}
      <ScrollToTop />

      <main className="flex-grow">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* ✅ Header ke Home click ke liye */}
                <section id="home">
                  <HeroSection />
                </section>

                <section id="brands">
                  <Brand />
                </section>

                {/* ✅ Why Us click ke liye */}
                <section id="why">
                  <Why />
                </section>

                {/* Agar FAQ bhi nav me use karna hai to */}
                <section id="faq">
                  <Faq />
                </section>
              </>
            }
          />

          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer har page me */}
      <Footer />
    </div>
  );
}

export default App;