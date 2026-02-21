// src/components/ServicesSection.jsx
import { useState, useEffect, useRef } from "react";

const services = [
  {
    title: "RO Water Purifier Installation",
    desc: "Professional installation for all brands ensuring leakage-free and aesthetic setup in your kitchen.",
    points: [
      "Wall mounting expertise",
      "Inlet/Outlet pipe fitting",
      "Pre-filter setup",
      "TDS adjustment",
    ],
    button: "Book Installation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-400",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    borderHover: "hover:border-blue-300",
    shadowHover: "hover:shadow-blue-100/60",
    accentDot: "bg-blue-400",
    btnGradient: "from-blue-500 to-blue-600",
    btnHover: "hover:from-blue-600 hover:to-blue-700",
    checkColor: "text-blue-500",
    badge: "Installation",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "RO Water Purifier Repair",
    desc: "Quick diagnosis and repair for low flow, bad taste, noise, and electrical faults.",
    points: [
      "2-hour response time",
      "Genuine spare parts",
      "Motor & Pump repair",
      "SMPS replacement",
    ],
    button: "Book Repair",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-400",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    borderHover: "hover:border-orange-300",
    shadowHover: "hover:shadow-orange-100/60",
    accentDot: "bg-orange-400",
    btnGradient: "from-orange-500 to-orange-600",
    btnHover: "hover:from-orange-600 hover:to-orange-700",
    checkColor: "text-orange-500",
    badge: "Repair",
    badgeBg: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    title: "RO Maintenance (AMC)",
    desc: "Comprehensive AMC plans with scheduled service visits to keep purifier running smoothly.",
    points: [
      "3 mandatory services/year",
      "Free filter replacement",
      "No visiting charges",
      "Priority support",
    ],
    button: "Book AMC",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-400",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderHover: "hover:border-emerald-300",
    shadowHover: "hover:shadow-emerald-100/60",
    accentDot: "bg-emerald-400",
    btnGradient: "from-emerald-500 to-emerald-600",
    btnHover: "hover:from-emerald-600 hover:to-emerald-700",
    checkColor: "text-emerald-500",
    badge: "AMC",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Filter Replacement",
    desc: "Timely replacement of Sediment, Carbon, RO Membrane, and UV lamps for pure water.",
    points: [
      "High-quality membranes",
      "Activated carbon filters",
      "Sediment removal",
      "Post-carbon treatment",
    ],
    button: "Book Replacement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    gradient: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    borderHover: "hover:border-violet-300",
    shadowHover: "hover:shadow-violet-100/60",
    accentDot: "bg-violet-400",
    btnGradient: "from-violet-500 to-violet-600",
    btnHover: "hover:from-violet-600 hover:to-violet-700",
    checkColor: "text-violet-500",
    badge: "Filter",
    badgeBg: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    title: "Commercial RO Plants",
    desc: "Installation and service for 25LPH to 500LPH commercial RO systems in Raipur.",
    points: [
      "Custom plant design",
      "Heavy-duty pumps",
      "Industrial membranes",
      "Monthly maintenance",
    ],
    button: "Book Commercial RO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 20h20M5 20V8l7-5 7 5v12M9 20v-4a3 3 0 0 1 6 0v4"/>
        <path d="M9 12h1M14 12h1"/>
      </svg>
    ),
    gradient: "from-sky-500 to-blue-400",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    borderHover: "hover:border-sky-300",
    shadowHover: "hover:shadow-sky-100/60",
    accentDot: "bg-sky-400",
    btnGradient: "from-sky-500 to-sky-600",
    btnHover: "hover:from-sky-600 hover:to-sky-700",
    checkColor: "text-sky-500",
    badge: "Commercial",
    badgeBg: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    title: "Uninstallation & Shifting",
    desc: "Safe uninstallation and reinstallation service when moving to a new home in Raipur.",
    points: [
      "Safe dismantling",
      "Transport packing",
      "Re-installation",
      "Performance check",
    ],
    button: "Book Shifting",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    gradient: "from-rose-500 to-pink-400",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    borderHover: "hover:border-rose-300",
    shadowHover: "hover:shadow-rose-100/60",
    accentDot: "bg-rose-400",
    btnGradient: "from-rose-500 to-rose-600",
    btnHover: "hover:from-rose-600 hover:to-rose-700",
    checkColor: "text-rose-500",
    badge: "Shifting",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-100",
  },
];



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

function StatItem({ stat, animate }) {
  const count = useCounter(stat.value, animate);
  return (
    <div className="text-center group">
      <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
        {stat.icon}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {count}
        {stat.suffix}
      </div>
      <div className="text-slate-500 text-sm font-medium mt-1">{stat.label}</div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`
          relative bg-white rounded-2xl border border-slate-100 
          p-7 transition-all duration-500 cursor-pointer overflow-hidden
          ${service.borderHover} ${service.shadowHover}
          hover:shadow-2xl hover:-translate-y-3
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Accent Bar */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}
            transition-all duration-500 origin-left
            ${isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
          `}
        />

        {/* Background Pattern on Hover */}
        <div
          className={`
            absolute inset-0 transition-opacity duration-700 pointer-events-none
            ${isHovered ? "opacity-[0.03]" : "opacity-0"}
          `}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Corner Decoration */}
        <div
          className={`
            absolute -top-12 -right-12 w-32 h-32 rounded-full transition-all duration-700
            bg-gradient-to-br ${service.gradient} pointer-events-none
            ${isHovered ? "opacity-[0.06] scale-100" : "opacity-0 scale-50"}
          `}
        />

        {/* Badge */}
        <div className="flex items-center justify-between mb-5">
          <span
            className={`
              text-[11px] font-bold tracking-wider uppercase px-3 py-1
              rounded-full border ${service.badgeBg}
            `}
          >
            {service.badge}
          </span>
          <span className="text-slate-200 text-4xl font-black select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Icon */}
        <div
          className={`
            relative w-14 h-14 rounded-xl ${service.iconBg} ${service.iconColor}
            flex items-center justify-center mb-5 transition-all duration-500
            ${isHovered ? "scale-110 rotate-[-6deg] shadow-lg" : ""}
          `}
        >
          {service.icon}

          {/* Ping effect */}
          <div
            className={`
              absolute inset-0 rounded-xl ${service.iconBg}
              transition-all duration-500 pointer-events-none
              ${isHovered ? "animate-ping opacity-40" : "opacity-0"}
            `}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-slate-900 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5">
          {service.desc}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`h-[2px] flex-1 bg-gradient-to-r ${service.gradient} rounded-full opacity-20`} />
          <div className={`w-1.5 h-1.5 rounded-full ${service.accentDot} opacity-40`} />
          <div className={`h-[2px] flex-1 bg-gradient-to-l ${service.gradient} rounded-full opacity-20`} />
        </div>

        {/* Feature Points */}
        <ul className="space-y-3 mb-7">
          {service.points.map((point, i) => (
            <li
              key={i}
              className={`
                flex items-center gap-3 text-sm text-slate-600
                transition-all duration-300
              `}
              style={{
                transitionDelay: isHovered ? `${i * 60}ms` : "0ms",
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <span
                className={`
                  w-5 h-5 rounded-full ${service.iconBg} ${service.checkColor}
                  flex items-center justify-center flex-shrink-0
                  transition-all duration-300
                `}
                style={{
                  transitionDelay: isHovered ? `${i * 60}ms` : "0ms",
                  transform: isHovered ? "scale(1.15)" : "scale(1)",
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className={`
            w-full py-3 px-6 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-r ${service.btnGradient} ${service.btnHover}
            transform transition-all duration-300
            hover:shadow-lg active:scale-[0.98]
            flex items-center justify-center gap-2 group/btn
          `}
        >
          <span>{service.button}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Bottom shine line */}
        <div
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full
            bg-gradient-to-r ${service.gradient}
            transition-all duration-700
            ${isHovered ? "w-3/4 opacity-40" : "w-0 opacity-0"}
          `}
        />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40">

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Circles */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-[5%] w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite 1s" }} />
        <div className="absolute bottom-20 left-[30%] w-64 h-64 bg-violet-200/15 rounded-full blur-3xl"
          style={{ animation: "pulse 5s ease-in-out infinite 2s" }} />
        <div className="absolute top-40 right-[30%] w-48 h-48 bg-emerald-200/15 rounded-full blur-3xl"
          style={{ animation: "pulse 6s ease-in-out infinite 0.5s" }} />

        {/* Water drops decoration */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 bg-blue-300/10 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `bounce ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-full px-5 py-2 mb-6 shadow-sm shadow-blue-100/50">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </div>
            <span className="text-blue-600 text-xs font-bold tracking-[3px] uppercase">
              Our Services
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-800 leading-tight mb-5">
            Premium{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                RO Water Purifier
              </span>
              {/* Underline decoration */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8c40-5 80-7 120-6s100 4 176-1" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            <span className="text-slate-700">Services in Raipur</span>
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-12 h-[2px] rounded bg-gradient-to-r from-transparent to-blue-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-300/50" />
            <div className="w-12 h-[2px] rounded bg-gradient-to-l from-transparent to-blue-400" />
          </div>

        

        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        

       
      </div>
    </section>
  );
}