// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";
import aboutImg1 from "../img/h1.png"; // Add your first image
import aboutImg2 from "../img/h2.png"; // Add your second image

/* ───── counter ───── */
function useCounter(target, run, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    let n = 0;
    const step = target / (duration / 16);

    const id = setInterval(() => {
      n += step;
      if (n >= target) {
        n = target;
        clearInterval(id);
      }
      setCount(Math.floor(n));
    }, 16);

    return () => clearInterval(id);
  }, [run, target, duration]);

  return count;
}

/* ───── small icons ───── */
const Icons = {
  users: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a3 3 0 0 0-2.3-2.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.7 3.1a4 4 0 0 1 0 7.8" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 6H5a2 2 0 0 0 2 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 6h2a2 2 0 0 1-2 4" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2V4h9.4l7.8 7.8a2 2 0 0 1 0 2.8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.01" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.9 6 6.6.7-5 4.4 1.5 6.5L12 16.9 6 19.6l1.5-6.5-5-4.4 6.6-.7L12 2z" />
    </svg>
  ),
};

/* ───── Stat component ───── */
function Stat({ value, suffix, label, icon, run, delay }) {
  const c = useCounter(value, run);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [run, delay]);

  return (
    <div
      className={`group text-center transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur flex items-center justify-center text-sky-300">
        {icon}
      </div>

      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
        {c}
        <span className="text-sky-300/90">{suffix}</span>
      </div>

      <div className="text-[9px] sm:text-[11px] font-semibold text-slate-500 mt-1.5 sm:mt-2 tracking-[2px] sm:tracking-[2.5px] uppercase">
        {label}
      </div>
    </div>
  );
}

/* ───── data ───── */
const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP = "918871863773";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Customers", icon: Icons.users },
  { value: 15, suffix: "+", label: "Years Experience", icon: Icons.trophy },
  { value: 50, suffix: "+", label: "Brands Covered", icon: Icons.tag },
  { value: 99, suffix: "%", label: "Satisfaction", icon: Icons.star },
];

/* ───── component ───── */
export default function AboutSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);

  const [vis, setVis] = useState(false);
  const [sVis, setSVis] = useState(false);
  const [mapH, setMapH] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          o.unobserve(e.target);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSVis(true);
          o.unobserve(e.target);
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) o.observe(statsRef.current);
    return () => o.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-[#040A16]"
    >
      {/* ── premium background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[900px] h-[400px] sm:h-[600px] lg:h-[900px] bg-sky-500/10 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-1/2 -left-32 w-[300px] sm:w-[450px] lg:w-[650px] h-[300px] sm:h-[450px] lg:h-[650px] bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute -bottom-40 right-0 w-[350px] sm:w-[550px] lg:w-[750px] h-[350px] sm:h-[550px] lg:h-[750px] bg-cyan-500/10 rounded-full blur-[120px] sm:blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.04] sm:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* ═══════ HEADER ═══════ */}
        <div
          className={`text-center mb-14 sm:mb-18 md:mb-24 transition-all duration-1000 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-8 border border-white/10 bg-white/[0.04] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300" />
            </span>
            <span className="text-sky-300/90 text-[10px] sm:text-[11px] font-semibold tracking-[2px] sm:tracking-[3px] uppercase">
              About Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-4 sm:mb-6 tracking-tight">
            Pure Water,
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                Healthy Life
              </span>
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-5">
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-sky-400/50 rounded" />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-sky-400/50 rounded" />
          </div>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2">
            Trusted RO installation, repair & AMC — serving Raipur with quality
            workmanship since 2009.
          </p>
        </div>

        {/* ═══════ IMAGE SHOWCASE SECTION 1 ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-100 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                {/* Image Container */}
                <div className="aspect-[4/3] sm:aspect-[16/10] relative">
                  <img
                    src={aboutImg1}
                    alt="RO Water Purifier Service"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A16]/60 via-transparent to-transparent" />
                </div>

                {/* Badge on Image */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-xs sm:text-sm font-semibold">Quality Service</p>
                      <p className="text-slate-400 text-[10px] sm:text-xs">Since 2009</p>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-sky-400/30 rounded-tr-2xl" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-l-2 border-sky-400/30 rounded-bl-2xl" />
              </div>

              {/* Floating Element */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 bg-sky-500/10 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-sky-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Delivering Pure Water to Every Home
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                At Prajapati Enterprise, we believe every family deserves access to clean, 
                safe drinking water. Our team of certified technicians brings years of 
                expertise to ensure your water purifier works flawlessly.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                From installation to maintenance, we provide comprehensive RO services 
                with genuine parts and transparent pricing.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {["Expert Technicians", "Genuine Parts", "Same Day Service", "All Brands"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-xs sm:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ COMPANY CARD ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-200 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-sky-500/10 blur-3xl rounded-full" />

            <div className="p-5 sm:p-8 md:p-12 lg:p-14">
              <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
                {/* left */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="relative w-[72px] h-[72px] sm:w-[92px] sm:h-[92px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 p-2 sm:p-2.5 mb-4 sm:mb-6">
                    <img
                      src={logo}
                      alt="Prajapati Enterprise Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 tracking-tight">
                    Prajapati Enterprise
                  </h3>
                  <p className="text-sky-300/70 text-xs sm:text-sm font-medium tracking-wide mb-4 sm:mb-5">
                    RO Water Purifier Experts
                  </p>

                  <div className="flex items-center gap-1 mb-5 sm:mb-7">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[10px] sm:text-xs text-slate-500 ml-2 font-medium">
                      4.9 / 5
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <a
                      href={`tel:${PHONE}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>

                    <a
                      href={`https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-300 text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* divider */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent mx-auto" />
                </div>
                <div className="lg:hidden h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* right */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <p className="text-slate-300/80 text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.95]">
                    At{" "}
                    <span className="text-white font-semibold">Prajapati Enterprise</span>, 
                    we deliver premium RO solutions so your family gets{" "}
                    <span className="text-sky-200 font-semibold">clean, safe & great-tasting water</span>. 
                    From RO/UV to alkaline systems — we handle installation, maintenance, and year‑round support.
                  </p>

                  <p className="text-slate-300/80 text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.95]">
                    Trusted by thousands in{" "}
                    <span className="text-white font-semibold">Raipur, Chhattisgarh</span>, 
                    we recommend the right purifier based on your water quality — not guesswork.
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3">
                    {["15+ Years", "50+ Brands", "Clean Fitting", "Genuine Parts"].map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-slate-300/70 border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.03]"
                      >
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-sky-300/70" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />
          </div>
        </div>

        {/* ═══════ IMAGE SHOWCASE SECTION 2 ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-250 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4">
                Why Choose Us
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Professional Service You Can Trust
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                We understand the importance of clean water for your family's health. 
                That's why we use only genuine parts and follow industry best practices 
                for every installation and repair.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                Our technicians are trained to handle all major RO brands including Kent, 
                Aquaguard, Livpure, Pureit, and many more.
              </p>

              {/* Stats Mini */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { num: "15+", label: "Years" },
                  { num: "5000+", label: "Customers" },
                  { num: "50+", label: "Brands" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-white">{item.num}</p>
                    <p className="text-slate-500 text-xs sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                {/* Image Container */}
                <div className="aspect-[4/3] sm:aspect-[16/10] relative">
                  <img
                    src={aboutImg2}
                    alt="RO Water Purifier Installation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A16]/60 via-transparent to-transparent" />
                </div>

                {/* Badge on Image */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-xs sm:text-sm font-semibold">Verified Experts</p>
                      <p className="text-slate-400 text-[10px] sm:text-xs">Certified Team</p>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl" />
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl" />
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28 bg-cyan-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* ═══════ MAP + CONTACT ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-300 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />

            <div className="grid lg:grid-cols-2">
              {/* map */}
              <div
                className="relative h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[420px]"
                onMouseEnter={() => setMapH(true)}
                onMouseLeave={() => setMapH(false)}
                onTouchStart={() => setMapH(true)}
                onTouchEnd={() => setMapH(false)}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14868.499956298232!2d81.624294!3d21.306077!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDE4JzIxLjkiTiA4McKwMzcnMjcuNSJF!5e0!3m2!1sen!2sus!4v1771676244237!5m2!1sen!2sus"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prajapati Enterprise Location"
                  style={{ filter: "brightness(0.58) contrast(1.18) saturate(0.75)" }}
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-[#040A16] via-[#040A16]/25 to-[#040A16]/55 transition-opacity duration-700 ${mapH ? "opacity-0" : "opacity-100"}`} />

                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full transition-all duration-500 ${mapH ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-sky-500/30">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>

                <div className={`absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 bg-white/[0.06] backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/10 transition-all duration-500 ${mapH ? "opacity-0 translate-y-3" : "opacity-100"}`}>
                  <span className="text-[10px] sm:text-[11px] text-slate-300/70 font-medium tracking-wide">
                    <span className="hidden sm:inline">Hover to explore map</span>
                    <span className="sm:hidden">Tap to explore map</span>
                  </span>
                </div>

                <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              {/* contact */}
              <div className="p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <h4 className="text-lg sm:text-xl font-extrabold text-white mb-1.5 sm:mb-2 tracking-tight">
                  Our Location
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar,
                  Birgaon, Raipur, Chhattisgarh — 493221
                </p>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    {
                      label: "Phone",
                      value: PHONE_DISPLAY,
                      href: `tel:${PHONE}`,
                      icon: (
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                    },
                    {
                      label: "WhatsApp",
                      value: PHONE_DISPLAY,
                      href: `https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service`,
                      external: true,
                      icon: (
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        </svg>
                      ),
                    },
                    {
                      label: "Hours",
                      value: "9 AM – 8 PM  •  Mon – Sun",
                      icon: (
                        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                  ].map((item, i) => {
                    const Tag = item.href ? "a" : "div";
                    return (
                      <Tag
                        key={i}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-400/[0.08] border border-sky-300/20 flex items-center justify-center text-sky-200 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-[1.5px] sm:tracking-[2px] uppercase">
                            {item.label}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5 truncate">
                            {item.value}
                          </div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>

                <a
                  href="https://maps.google.com/?q=21.306077,81.624294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 sm:gap-2.5 w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm font-semibold text-white transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-sky-300/15 to-transparent" />
          </div>
        </div>

        {/* ═══════ STATS ═══════ */}
        <div
          ref={statsRef}
          className={`rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-10 md:p-16 transition-all duration-1000 delay-500 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } shadow-[0_20px_80px_rgba(0,0,0,0.35)]`}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent -mt-6 sm:-mt-10 md:-mt-16 mb-8 sm:mb-10 md:mb-14 -mx-6 sm:-mx-10 md:-mx-16" />

          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Trusted by <span className="text-sky-300">Raipur</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-14">
            {stats.map((s, i) => (
              <div key={i} className="relative">
                <Stat
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  icon={s.icon}
                  run={sVis}
                  delay={i * 150}
                />
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 sm:h-14 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── keyframes ─── */}
      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(5deg); }
          40% { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}