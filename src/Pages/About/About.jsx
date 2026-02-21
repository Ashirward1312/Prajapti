// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";

/* ───── counter hook ───── */
function useCounter(target, shouldAnimate, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldAnimate) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [shouldAnimate, target, duration]);
  return count;
}

/* ───── stat item ───── */
function AnimatedStat({ value, suffix, label, icon, animate, delay }) {
  const count = useCounter(value, animate);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [animate, delay]);

  return (
    <div
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/80 flex items-center justify-center text-2xl shadow-sm hover:scale-110 transition-transform duration-300 cursor-default">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
        {count}
        {suffix}
      </div>
      <div className="text-slate-500 text-[11px] font-bold mt-2 tracking-widest uppercase">
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
  { value: 5000, suffix: "+", label: "Happy Customers", icon: "😊" },
  { value: 15, suffix: "+", label: "Years Experience", icon: "🏆" },
  { value: 50, suffix: "+", label: "Brands Covered", icon: "🏷️" },
  { value: 99, suffix: "%", label: "Satisfaction", icon: "⭐" },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    title: "Free Water Testing",
    desc: "Get your water quality checked absolutely free before choosing the right purifier.",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "AMC & Repair Services",
    desc: "Annual maintenance contracts and quick repair with genuine parts guarantee.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "100% Satisfaction",
    desc: "Customer satisfaction guaranteed with transparent pricing and quality service.",
    color: "amber",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Same Day Service",
    desc: "Quick response with same-day installation and repair service across Raipur.",
    color: "violet",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-500",
    hoverBg: "group-hover:bg-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-500",
    hoverBg: "group-hover:bg-emerald-100",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-500",
    hoverBg: "group-hover:bg-amber-100",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-500",
    hoverBg: "group-hover:bg-violet-100",
  },
};

/* ───── main component ───── */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [mapHovered, setMapHovered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSectionVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      {/* ───── bg decorations ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -top-36 -left-36 w-[420px] h-[420px] bg-blue-100/40 rounded-full blur-3xl" />
        <div
          className="absolute top-1/2 -right-28 w-[380px] h-[380px] bg-cyan-100/30 rounded-full blur-3xl"
          style={{ animation: "pulse 5s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-[340px] h-[340px] bg-blue-100/25 rounded-full blur-3xl"
          style={{ animation: "pulse 6s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-40 right-[28%] w-52 h-52 bg-violet-100/15 rounded-full blur-3xl"
          style={{ animation: "pulse 7s ease-in-out infinite" }}
        />

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-2.5 bg-blue-300/15 rounded-full"
            style={{
              left: `${6 + i * 12}%`,
              top: `${18 + (i % 3) * 22}%`,
              animation: `bounce ${2.2 + i * 0.35}s ease-in-out infinite ${
                i * 0.45
              }s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ───── section header ───── */}
        <div
          className={`text-center mb-14 md:mb-16 transition-all duration-1000 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-5 py-2 mb-6 shadow-sm shadow-blue-100/40">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            <span className="text-blue-600 text-xs font-bold tracking-[3px] uppercase">
              About Us
            </span>
          </div>

          {/* title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-800 leading-tight mb-4">
            Clean, Safe &amp;{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Pure Drinking
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6c30-4 60-5 90-4s70 3 106-1"
                  stroke="url(#aboutGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="aboutGrad"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            <span className="text-slate-700">Water — Every Time!</span>
          </h2>

          {/* divider */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-400 rounded" />
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-300/50" />
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-400 rounded" />
          </div>

          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted water purifier installation, repair, and maintenance
            services. Professional AMC, filter replacement, and commercial RO
            solutions — all in one place.
          </p>
        </div>

        {/* ═════════════ 2-col grid ═════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ───── LEFT COLUMN ───── */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              sectionVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-14"
            }`}
          >
            {/* company card */}
            <div className="relative bg-white rounded-2xl border border-slate-100 shadow-lg shadow-blue-100/30 p-6 md:p-7 mb-8 overflow-hidden group hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-full" />

              <div className="flex items-center gap-4 ml-3">
                {/* real logo */}
                <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-blue-200/40 border-2 border-blue-100 group-hover:scale-105 transition-transform duration-500 bg-white flex items-center justify-center p-1">
                  <img
                    src={logo}
                    alt="Prajapati Enterprise Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-snug truncate">
                    Prajapati Enterprise
                  </h3>
                  <p className="text-blue-500 text-sm font-semibold mt-0.5">
                    RO Water Purifier Experts • Since 2009
                  </p>
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-slate-500 font-medium ml-1">
                      4.9/5 (500+ reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* about text */}
            <div className="space-y-4 mb-8">
              <p className="text-slate-600 text-[15px] leading-[1.8]">
                At{" "}
                <span className="font-bold text-slate-800">
                  Prajapati Enterprise
                </span>
                , we specialize in high-quality water purifiers designed to give
                your family or business access to
                <span className="font-semibold text-blue-600">
                  {" "}
                  clean, safe, and great-tasting water
                </span>
                . Whether you need RO, UV, or alkaline water purification
                systems, we provide expert installation, maintenance, and
                support.
              </p>
              <p className="text-slate-600 text-[15px] leading-[1.8]">
                Trusted by thousands of local customers in{" "}
                <span className="font-semibold text-slate-800">
                  Raipur, Chhattisgarh
                </span>
                , our solutions are affordable, reliable, and tailored to your
                specific water quality needs. We believe every family deserves
                pure drinking water.
              </p>
            </div>

            {/* feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => {
                const c = colorMap[f.color];
                return (
                  <div
                    key={i}
                    className="group relative bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-100/80 hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
                  >
                    <div
                      className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${c.bg} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} ${c.border} border flex items-center justify-center mb-3 ${c.hoverBg} transition-colors duration-300`}
                      >
                        {f.icon}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {f.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group"
              >
                <svg
                  className="w-[18px] h-[18px] group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us Now
              </a>

              <a
                href={`https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white border-2 border-emerald-200 text-emerald-600 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* ───── RIGHT COLUMN ───── */}
          <div
            className={`transition-all duration-1000 delay-[400ms] ${
              sectionVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-14"
            }`}
          >
            {/* map card */}
            <div
              className="relative bg-white rounded-2xl border border-slate-100 shadow-lg shadow-blue-100/30 overflow-hidden hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setMapHovered(true)}
              onMouseLeave={() => setMapHovered(false)}
            >
              <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

              {/* map */}
              <div className="relative w-full h-[280px] md:h-[330px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14868.499956298232!2d81.624294!3d21.306077!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDE4JzIxLjkiTiA4McKwMzcnMjcuNSJF!5e0!3m2!1sen!2sus!4v1771676244237!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prajapati Enterprise Location"
                />

                {/* overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent transition-opacity duration-500 ${
                    mapHovered
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                />

                {/* pin */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full transition-all duration-500 ${
                    mapHovered
                      ? "opacity-0 scale-50"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-400/40 animate-bounce">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-black/10 rounded-full blur-[3px]" />
                  </div>
                </div>

                {/* hint */}
                <div
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transition-all duration-500 ${
                    mapHovered
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-blue-500 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                    Hover to interact with map
                  </span>
                </div>
              </div>

              {/* location details */}
              <div className="p-5 md:p-6">
                {/* address */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">
                      Visit Our Store
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar,
                      Birgaon, Raipur, Chhattisgarh — 493221
                    </p>
                  </div>
                </div>

                {/* contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {/* phone */}
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-3 bg-slate-50 hover:bg-blue-50 rounded-xl p-3 border border-slate-100 hover:border-blue-200 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Phone
                      </div>
                      <div className="text-sm font-bold text-slate-700">
                        {PHONE_DISPLAY}
                      </div>
                    </div>
                  </a>

                  {/* whatsapp */}
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-slate-50 hover:bg-emerald-50 rounded-xl p-3 border border-slate-100 hover:border-emerald-200 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        WhatsApp
                      </div>
                      <div className="text-sm font-bold text-slate-700">
                        {PHONE_DISPLAY}
                      </div>
                    </div>
                  </a>

                  {/* timing */}
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Timing
                      </div>
                      <div className="text-sm font-bold text-slate-700">
                        9 AM – 8 PM
                      </div>
                    </div>
                  </div>

                  {/* days */}
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Open Days
                      </div>
                      <div className="text-sm font-bold text-slate-700">
                        Mon – Sun
                      </div>
                    </div>
                  </div>
                </div>

                {/* directions */}
                <a
                  href="https://maps.google.com/?q=21.306077,81.624294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white font-semibold text-sm py-3.5 rounded-xl hover:from-slate-900 hover:to-slate-800 hover:shadow-lg active:scale-[0.98] transition-all duration-300 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Get Directions on Google Maps
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  label: "Verified Business",
                  bg: "bg-emerald-50",
                  text: "text-emerald-500",
                  border: "border-emerald-100",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  label: "Quick Response",
                  bg: "bg-blue-50",
                  text: "text-blue-500",
                  border: "border-blue-100",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ),
                  label: "Trusted Locally",
                  bg: "bg-rose-50",
                  text: "text-rose-500",
                  border: "border-rose-100",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-2 py-4 rounded-xl border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default ${b.border}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${b.bg} ${b.text}`}
                  >
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 text-center leading-tight px-1">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ───── stats section ───── */}
        <div
          ref={statsRef}
          className="mt-20 md:mt-24 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-50/80 p-8 md:p-12 overflow-hidden relative"
        >
          {/* bg deco */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-cyan-50/40 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">
              Why{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Raipur Trusts Us
              </span>
            </h3>
            <p className="text-slate-400 text-sm">
              Our numbers tell the story
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {stats.map((stat, i) => (
              <div key={i} className="relative">
                <AnimatedStat
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                  animate={statsVisible}
                  delay={i * 150}
                />
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}