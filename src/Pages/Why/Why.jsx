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
} from "lucide-react";

const features = [
  {
    icon: <Wrench size={24} />,
    title: "Expert Technicians",
    desc: "Certified professionals with 10+ years experience repairing all RO purifier brands with precision and care.",
    stat: "10+",
    statLabel: "Years Exp.",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "100% Genuine Parts",
    desc: "We use only authentic filters and membranes for long-lasting performance and pure water quality.",
    stat: "100%",
    statLabel: "Original",
  },
  {
    icon: <Clock size={24} />,
    title: "Same-Day Service",
    desc: "Fast doorstep service across Raipur to restore clean drinking water without any delay.",
    stat: "2hr",
    statLabel: "Response",
  },
  {
    icon: <IndianRupee size={24} />,
    title: "Affordable AMC Plans",
    desc: "Transparent pricing with no hidden charges. AMC plans starting from just ₹999/year.",
    stat: "₹999",
    statLabel: "Starting",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "All Brands Supported",
    desc: "Expert repair for Kent, Aquaguard, Livpure, Nasaka, Eurotech, Pureit and many more brands.",
    stat: "50+",
    statLabel: "Brands",
  },
  {
    icon: <Droplets size={24} />,
    title: "Guaranteed Water Purity",
    desc: "Ensuring safe, healthy and pure drinking water for your family, office, and business needs.",
    stat: "99%",
    statLabel: "Pure",
  },
];

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP = "918871863773";

/* ─── card ─── */
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
          setTimeout(() => setIsVisible(true), index * 100);
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7
          backdrop-blur-xl overflow-hidden cursor-default
          transition-all duration-500
          hover:bg-white/10 hover:border-sky-400/30 hover:-translate-y-2
          hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.15)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500
            transition-all duration-500 origin-left
            ${isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
        />

        {/* corner glow */}
        <div
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-sky-500/15 blur-[60px]
            transition-all duration-700 pointer-events-none
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        />
        <div
          className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-cyan-400/10 blur-[50px]
            transition-all duration-700 pointer-events-none
            ${isHovered ? "opacity-80 scale-100" : "opacity-0 scale-50"}`}
        />

        

        {/* icon + stat row */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          {/* icon */}
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-2xl border border-sky-400/20
                bg-gradient-to-br from-sky-500/20 to-cyan-400/10
                flex items-center justify-center text-sky-400
                transition-all duration-500
                ${isHovered ? "scale-110 rotate-[-6deg] shadow-lg shadow-sky-500/20 border-sky-400/40" : ""}`}
            >
              {feature.icon}
            </div>
            {/* ping */}
            <div
              className={`absolute inset-0 rounded-2xl bg-sky-400/20
                pointer-events-none transition-opacity duration-500
                ${isHovered ? "animate-ping opacity-30" : "opacity-0"}`}
            />
          </div>

          {/* mini stat */}
          <div
            className={`rounded-xl px-3 py-1.5 text-center border border-sky-400/15
              bg-sky-500/10 backdrop-blur-sm
              transition-all duration-300 ${isHovered ? "scale-105 border-sky-400/30" : ""}`}
          >
            <div className="text-lg font-extrabold text-sky-300 leading-none">
              {feature.stat}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              {feature.statLabel}
            </div>
          </div>
        </div>

        {/* title */}
        <h3
          className={`text-lg font-bold mb-2 transition-colors duration-300
            ${isHovered ? "text-sky-300" : "text-white"}`}
        >
          {feature.title}
        </h3>

        {/* divider */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[2px] w-8 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 opacity-40" />
        </div>

        {/* description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          {feature.desc}
        </p>

        {/* bottom check */}
        <div
          className={`flex items-center gap-2 transition-all duration-500
            ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
        >
          <CheckCircle2 size={14} className="text-cyan-400" />
          <span className="text-xs font-semibold text-slate-400">
            Verified &amp; Trusted
          </span>
        </div>

        {/* inner border glow on hover */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500
            ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            boxShadow: "inset 0 0 30px rgba(56,189,248,0.05)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── counter hook ─── */
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

/* ─── main ─── */
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
      className="relative py-20 md:py-28 overflow-hidden bg-slate-950"
    >
      {/* ─── bg decorations ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />

        {/* glow orbs */}
        <div className="absolute -top-32 left-[15%] w-[500px] h-[500px] bg-sky-500/[0.07] rounded-full blur-[150px]" />
        <div
          className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-cyan-400/[0.06] rounded-full blur-[130px]"
          style={{ animation: "pulse 8s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] bg-sky-400/[0.05] rounded-full blur-[120px]"
          style={{ animation: "pulse 10s ease-in-out infinite 3s" }}
        />

        {/* floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sky-400/30"
            style={{
              left: `${5 + i * 8}%`,
              bottom: "0",
              animation: `rise ${10 + (i % 5) * 2}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ─── header ─── */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/20 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-5 py-2.5 mb-6 backdrop-blur-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400" />
            </span>
            <span className="text-sky-300 text-xs font-semibold tracking-[3px] uppercase">
              Why Choose Us
            </span>
          </div>

          {/* title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            <span className="text-white">Raipur&apos;s Most </span>
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
              Trusted RO
            </span>
            <br />
            <span className="text-white">Repair Experts</span>
          </h2>

          {/* divider */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-sky-400/60 rounded" />
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
            <div className="w-14 h-[1px] bg-gradient-to-l from-transparent to-sky-400/60 rounded" />
          </div>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Reliable, fast and affordable RO water purifier service in Raipur.
            Expert technicians, genuine parts, and guaranteed satisfaction.
          </p>

          {/* trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              { text: "Certified Team", icon: <BadgeCheck size={14} /> },
              { text: "Genuine Parts", icon: <ShieldCheck size={14} /> },
              { text: "Same Day Visit", icon: <Clock size={14} /> },
              { text: "All Brands", icon: <Star size={14} /> },
            ].map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5
                  text-slate-300 text-xs font-semibold px-4 py-2 rounded-full
                  backdrop-blur-sm
                  hover:border-sky-400/30 hover:bg-sky-500/10 hover:text-sky-300
                  transition-all duration-300 cursor-default"
              >
                <span className="text-sky-400">{pill.icon}</span>
                {pill.text}
              </span>
            ))}
          </div>
        </div>

        {/* ─── cards grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* ─── bottom CTA + stats ─── */}
        <div
          ref={statsRef}
          className={`mt-16 md:mt-20 transition-all duration-1000 delay-300 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden">
            {/* top accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

            {/* inner glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sky-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

            

                {/* center divider */}
                
            
          </div>
        </div>

        
      </div>

      {/* ─── keyframes ─── */}
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
      `}</style>
    </section>
  );
}