// src/components/WhyChooseUs.jsx
import { useState, useEffect, useRef } from "react";
import {
  Wrench,
  ShieldCheck,
  Clock,
  BadgeCheck,
  IndianRupee,
  Droplets,
  Phone,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: <Wrench size={22} />,
    title: "Expert Technicians",
    desc: "Certified professionals with 10+ years experience repairing all RO purifier brands with precision and care.",
    stat: "15+",
    statLabel: "Years Exp.",
    gradient: "from-sky-500 to-cyan-400",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "from-sky-500/20 to-cyan-400/10",
    borderHover: "hover:border-sky-400/30",
  },
  {
    icon: <BadgeCheck size={22} />,
    title: "100% Genuine Parts",
    desc: "We use only authentic filters and membranes for long-lasting performance and pure water quality.",
    stat: "100%",
    statLabel: "Original",
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "from-emerald-500/20 to-teal-400/10",
    borderHover: "hover:border-emerald-400/30",
  },
  {
    icon: <Clock size={22} />,
    title: "Same-Day Service",
    desc: "Fast doorstep service across Raipur to restore clean drinking water without any delay.",
    stat: "2hr",
    statLabel: "Response",
    gradient: "from-violet-500 to-purple-400",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "from-violet-500/20 to-purple-400/10",
    borderHover: "hover:border-violet-400/30",
  },
  {
    icon: <IndianRupee size={22} />,
    title: "Affordable AMC Plans ",
    desc: "Transparent pricing with no hidden charges. AMC plans starting from just ₹999/year for complete coverage.",
    stat: "₹999",
    statLabel: "Starting",
    gradient: "from-amber-500 to-orange-400",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "from-amber-500/20 to-orange-400/10",
    borderHover: "hover:border-amber-400/30",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "All Brands Supported",
    desc: "Expert repair for Kent, Aquaguard, Livpure, Nasaka, Eurotech, Pureit and many more brands.",
    stat: "50+",
    statLabel: "Brands",
    gradient: "from-rose-500 to-pink-400",
    glowColor: "rgba(244,63,94,0.15)",
    iconBg: "from-rose-500/20 to-pink-400/10",
    borderHover: "hover:border-rose-400/30",
  },
  {
    icon: <Droplets size={22} />,
    title: "Guaranteed Water Purity",
    desc: "Ensuring safe, healthy and pure drinking water for your family, office, and business needs.",
    stat: "99.9%",
    statLabel: "Pure",
    gradient: "from-blue-500 to-indigo-400",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "from-blue-500/20 to-indigo-400/10",
    borderHover: "hover:border-blue-400/30",
  },
];

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP = "918871863773";

/* ─── Feature Card ─── */
function FeatureCard({ feature, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 120);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`group relative h-full rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-white/[0.03]
          backdrop-blur-xl overflow-hidden cursor-default
          transition-all duration-500 ease-out
          hover:bg-white/[0.06] ${feature.borderHover} hover:-translate-y-2
          hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient}
            transition-all duration-500 origin-left
            ${isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
        />

        {/* Corner glow */}
        <div
          className={`absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[70px]
            transition-all duration-700 pointer-events-none
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          style={{ backgroundColor: feature.glowColor }}
        />
        <div
          className={`absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-[60px]
            transition-all duration-700 pointer-events-none
            ${isHovered ? "opacity-70 scale-100" : "opacity-0 scale-50"}`}
          style={{ backgroundColor: feature.glowColor }}
        />

        {/* Card Content */}
        <div className="relative z-10 p-5 sm:p-6 md:p-7 flex flex-col h-full">
          {/* Icon + Stat Row */}
          <div className="flex items-start justify-between mb-4 sm:mb-5">
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border border-white/10
                  bg-gradient-to-br ${feature.iconBg}
                  flex items-center justify-center text-sky-400
                  transition-all duration-500
                  ${isHovered ? "scale-110 rotate-[-6deg] shadow-lg border-white/20" : ""}`}
              >
                <span
                  className={`transition-colors duration-300`}
                  style={{
                    color: isHovered ? undefined : undefined,
                  }}
                >
                  {feature.icon}
                </span>
              </div>
              {/* Ping effect */}
              <div
                className={`absolute inset-0 rounded-xl sm:rounded-2xl
                  pointer-events-none transition-opacity duration-500
                  ${isHovered ? "animate-ping opacity-20" : "opacity-0"}`}
                style={{ backgroundColor: feature.glowColor }}
              />
            </div>

            {/* Stat Badge */}
            <div
              className={`rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-center border border-white/[0.08]
                bg-white/[0.04] backdrop-blur-sm flex-shrink-0
                transition-all duration-300 ${isHovered ? "scale-105 border-white/15 bg-white/[0.07]" : ""}`}
            >
              <div
                className={`text-base sm:text-lg font-extrabold leading-none bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
              >
                {feature.stat}
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                {feature.statLabel}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-base sm:text-lg font-bold mb-2 transition-colors duration-300
              ${isHovered ? "text-white" : "text-white/90"}`}
          >
            {feature.title}
          </h3>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`h-[2px] w-8 rounded-full bg-gradient-to-r ${feature.gradient} opacity-40
                transition-all duration-500 ${isHovered ? "w-12 opacity-70" : ""}`}
            />
            <div
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full opacity-40
                transition-all duration-500 ${isHovered ? "opacity-70 scale-125" : ""}`}
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                backgroundColor: feature.glowColor,
              }}
            />
          </div>

          {/* Description */}
          <p className="text-[13px] sm:text-sm text-slate-400/80 leading-relaxed flex-grow mb-4 sm:mb-5">
            {feature.desc}
          </p>

          {/* Bottom Verified Badge */}
          <div
            className={`flex items-center gap-2 transition-all duration-500
              ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
          >
            <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Verified &amp; Trusted
            </span>
          </div>
        </div>

        {/* Inner border glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-opacity duration-500
            ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            boxShadow: `inset 0 0 40px ${feature.glowColor}`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Counter Hook ─── */
function useCounter(target, shouldAnimate, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldAnimate) return;
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
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

/* ─── Main Component ─── */
export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

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
      { threshold: 0.05 }
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const custCount = useCounter(5000, statsVisible);
  const brandCount = useCounter(50, statsVisible);
  const satisfactionCount = useCounter(99, statsVisible);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-950"
    >
      {/* ─── Background Decorations ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50" />

        {/* Glow orbs */}
        <div className="absolute -top-32 left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-sky-500/[0.06] rounded-full blur-[120px] sm:blur-[150px]" />
        <div
          className="absolute top-1/2 -right-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-400/[0.05] rounded-full blur-[100px] sm:blur-[130px]"
          style={{ animation: "pulse 8s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-violet-400/[0.04] rounded-full blur-[100px] sm:blur-[120px]"
          style={{ animation: "pulse 10s ease-in-out infinite 3s" }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sky-400/25 hidden sm:block"
            style={{
              left: `${5 + i * 8}%`,
              bottom: "0",
              animation: `rise ${10 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* ─── Section Header ─── */}
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-sky-400/20 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-4 sm:px-5 py-2 sm:py-2.5 mb-5 sm:mb-6 backdrop-blur-2xl">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-sky-400" />
            </span>
            <span className="text-sky-300 text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[3px] uppercase">
              Why Choose Us
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-5">
            <span className="text-white">Raipur&apos;s Most </span>
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
              Trusted RO
            </span>
            <br className="hidden sm:block" />
            <span className="text-white"> Repair Experts</span>
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-5">
            <div className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-sky-400/60 rounded" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
            <div className="w-10 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-sky-400/60 rounded" />
          </div>

          <p className="text-slate-400/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Reliable, fast and affordable RO water purifier service in Raipur.
            Expert technicians, genuine parts, and guaranteed satisfaction.
          </p>

          {/* Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2">
            {[
              { text: "Certified Team", icon: <BadgeCheck size={13} /> },
              { text: "Genuine Parts", icon: <ShieldCheck size={13} /> },
              { text: "Same Day Visit", icon: <Clock size={13} /> },
              { text: "All Brands", icon: <Star size={13} /> },
            ].map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 border border-white/[0.07] bg-white/[0.03]
                  text-slate-400 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                  backdrop-blur-sm
                  hover:border-sky-400/25 hover:bg-sky-500/[0.06] hover:text-sky-300
                  transition-all duration-300 cursor-default"
              >
                <span className="text-sky-400">{pill.icon}</span>
                {pill.text}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

       

      </div>

      {/* ─── Keyframes ─── */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes rise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateY(-10vh) scale(1); }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(5deg); }
          40% { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}