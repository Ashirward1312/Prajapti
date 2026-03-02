// // src/components/HeroSection.jsx
// import { useEffect, useMemo, useState } from "react";

// import bg from "../img/hero.jpg";
// import img1 from "../img/h1.png";
// import img2 from "../img/h2.png";
// import img3 from "../img/h3.png";

// export default function HeroSection() {
//   const slideData = useMemo(
//     () => [
//       {
//         src: img1,
//         label: "Installation",
//         title: "RO Installation",
//         desc: "New purifier setup with proper fitting & demo.",
//       },
//       {
//         src: img2,
//         label: "Service",
//         title: "RO Repair & Service",
//         desc: "Filter change, low flow, leakage, noise issues.",
//       },
//       {
//         src: img3,
//         label: "Best Purifier",
//         title: "Best Purifier Suggestion",
//         desc: "Right model selection as per water TDS & usage.",
//       },
//     ],
//     []
//   );

//   const SLIDE_MS = 4000;

//   const [active, setActive] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => setLoaded(true), []);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setActive((p) => (p + 1) % slideData.length);
//     }, SLIDE_MS);
//     return () => clearInterval(id);
//   }, [slideData.length]);

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
//       {/* Background */}
//       <img
//         src={bg}
//         alt="Water purifier background"
//         className="absolute inset-0 h-full w-full object-cover object-center animate-[slowZoom_25s_ease-in-out_infinite]"
//       />

//       {/* Overlays */}
//       <div className="absolute inset-0 bg-slate-950/60 sm:bg-slate-950/75" />
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent sm:from-slate-950 via-slate-950/80 to-slate-950/30" />
//       <div className="absolute inset-0 bg-gradient-to-t from-transparent sm:from-slate-950 via-transparent to-slate-950/50" />

//       {/* Glow Orbs */}
//       <div className="hidden md:block pointer-events-none absolute left-10 top-1/4 h-96 w-96 rounded-full bg-sky-500/15 blur-[150px] animate-[float_8s_ease-in-out_infinite]" />
//       <div className="hidden md:block pointer-events-none absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-[130px] animate-[float_10s_ease-in-out_infinite_reverse]" />

//       {/* Floating Particles */}
//       <div className="pointer-events-none hidden sm:block" aria-hidden="true">
//         {[...Array(10)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute bottom-0 h-1 w-1 rounded-full bg-sky-400/35 animate-[rise_var(--dur)_linear_infinite]"
//             style={{
//               left: `${8 + i * 9}%`,
//               "--dur": `${10 + (i % 5) * 2}s`,
//               animationDelay: `${i * 0.7}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Grid Pattern */}
//       <div
//         className="hidden sm:block absolute inset-0 opacity-[0.03]"
//         aria-hidden="true"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
//           backgroundSize: "60px 60px",
//         }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 py-8 sm:py-14">
//         <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
//           {/* LEFT */}
//           <div
//             className={[
//               "transition-all duration-700 delay-150",
//               loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
//             ].join(" ")}
//           >
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/20 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-5 py-2.5 backdrop-blur-2xl">
//               <span className="relative flex h-2.5 w-2.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
//                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
//               </span>
//               <span className="text-sm font-medium tracking-wide text-sky-300">
//                 Trusted RO Service in Raipur
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
//               Water Purifier
//               <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
//                 Repair Experts
//               </span>
//             </h1>
//             <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
//               RO repair, installation & maintenance with{" "}
//               <span className="font-medium text-sky-400">
//                 fast doorstep support
//               </span>{" "}
//               and genuine spare parts.
//             </p>

//             <p className="mt-4 text-sm text-sky-300/80">Fast same-day service • Genuine parts • Certified technicians</p>

//             {/* Active Slide Info */}
//             <div className="mt-6 relative min-h-[92px]">
//               {slideData.map((s, i) => (
//                 <div
//                   key={s.title}
//                   className={[
//                     "transition-all duration-700 ease-out",
//                     active === i
//                       ? "opacity-100 translate-y-0"
//                       : "absolute inset-0 opacity-0 translate-y-3 pointer-events-none",
//                   ].join(" ")}
//                 >
//                   <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">
//                     <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
//                     <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-[40px]" />

//                     <div className="relative flex items-start gap-4">
//                       <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/20 to-cyan-400/10">
//                         <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.65)]" />
//                       </div>

//                       <div className="min-w-0">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
//                             {s.label}
//                           </span>
//                           <span className="h-px w-6 bg-white/15" />
//                           <span className="text-sm font-semibold text-white">
//                             {s.title}
//                           </span>
//                         </div>
//                         <p className="mt-1 text-xs leading-relaxed text-slate-400">
//                           {s.desc}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA */}
//             <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
//               <a
//                 href="tel:+919876543210"
//                 className="group relative inline-flex w-full sm:w-auto justify-center items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:from-sky-400 hover:to-cyan-400 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98]"
//               >
//                 <span className="pointer-events-none absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]" />
//                 <span className="relative inline-flex items-center gap-3">
//                   <svg
//                     className="h-5 w-5 animate-[ring_2s_ease-in-out_infinite]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   Call Now
//                 </span>
//               </a>

//               <a
//                 href="#services"
//                 className="group inline-flex w-full sm:w-auto items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
//               >
//                 Our Services
//                 <svg
//                   className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 8l4 4m0 0l-4 4m4-4H3"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* RIGHT — Clean Image Only Card (Slightly Smaller) */}
//           <div
//             className={[
//               "flex justify-center lg:justify-end transition-all duration-700 delay-200",
//               loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
//             ].join(" ")}
//           >
//             <div className="relative w-full max-w-[420px] sm:max-w-sm lg:max-w-md">
//               {/* Premium Frame */}
//               <div className="relative rounded-[2.25rem] bg-gradient-to-b from-white/20 via-white/10 to-white/0 p-[1px] shadow-[0_30px_110px_-45px_rgba(0,0,0,0.95)]">
//                 <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-2xl">
//                   {/* Highlights */}
//                   <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-sky-400/12 blur-[70px]" />
//                   <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-[80px]" />

//                   {/* Image stage — clean, no bottom content */}
//                   <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden hover:scale-[1.02] transition-transform duration-300">
//                     {/* light sweep */}
//                     <div className="pointer-events-none absolute inset-0 opacity-60 animate-[sweep_4.6s_ease-in-out_infinite] [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.10),transparent)]" />

//                     {slideData.map((s, i) => (
//                       <img
//                         key={s.title}
//                         src={s.src}
//                         alt={s.title}
//                         className={[
//                           "absolute inset-0 h-full w-full object-contain p-6",
//                           "transition-all duration-[700ms] ease-out",
//                           active === i
//                             ? "opacity-100 scale-100 translate-y-0"
//                             : "opacity-0 scale-95 translate-y-6",
//                         ].join(" ")}
//                         loading={i === 0 ? "eager" : "lazy"}
//                       />
//                     ))}

//                     {/* subtle bottom fade */}
//                     <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/50 to-transparent" />
//                   </div>
//                 </div>
//               </div>

//               {/* Badge */}
//               <div className="absolute -right-2 -top-2 z-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-3 py-1.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-amber-500/30">
//                 ⭐ Top Rated
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

//       {/* Animations */}
//       <style>{`
//         @keyframes slowZoom { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
//         @keyframes float {
//           0%,100%{transform:translateY(0) translateX(0)}
//           25%{transform:translateY(-20px) translateX(10px)}
//           50%{transform:translateY(-10px) translateX(-10px)}
//           75%{transform:translateY(-30px) translateX(5px)}
//         }
//         @keyframes rise {
//           0%{transform:translateY(0) scale(0);opacity:0}
//           10%{opacity:1;transform:translateY(-10vh) scale(1)}
//           100%{transform:translateY(-110vh) scale(.6);opacity:0}
//         }
//         @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
//         @keyframes ring {
//           0%,100%{transform:rotate(0deg)}
//           10%{transform:rotate(15deg)}
//           20%{transform:rotate(-10deg)}
//           30%{transform:rotate(5deg)}
//           40%{transform:rotate(0deg)}
//         }
//         @keyframes sweep {
//           0%{transform:translateX(-120%)}
//           60%{transform:translateX(120%)}
//           100%{transform:translateX(120%)}
//         }
//         @keyframes progress {
//           from { transform: scaleX(0); }
//           to { transform: scaleX(1); }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation: none !important; transition: none !important; }
//         }
//       `}</style>
//     </section>
//   );
// }
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap";
import img1 from "../img/bg1.png";
import img2 from "../img/bg2.png";
import img3 from "../img/bg3.png";
import img4 from "../img/bg4.png";
import img5 from "../img/bg5.png";

/* ──────────────────────────────────────────────────────
   SLIDES DATA
   ────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    image: img1,
    heading: "Every Leading Brand",
    highlight: "One Destination",
    subtitle:
      "From Kent and Aquaguard to Livpure and Pureit — explore our curated selection of premium water purifiers from all major brands, all under one roof.",
    features: [
      "All Major Brands in Stock",
      "RO · UV · UF Technologies",
      "100% Genuine Products",
      "Competitive Pricing Guaranteed",
    ],
    badge: "Complete Range",
    accentColor: "#0ea5e9",
    accentLight: "#38bdf8",
    glowColor: "rgba(14,165,233,0.12)",
  },
  {
    id: 2,
    image: img2,
    heading: "Professional Repair",
    highlight: "& Servicing",
    subtitle:
      "Our certified technicians deliver expert diagnostics and repairs for every purifier brand — ensuring your system runs flawlessly and your water stays crystal pure.",
    features: [
      "Multi-Brand Expertise",
      "Certified Service Engineers",
      "Same-Day Appointments",
      "90-Day Service Guarantee",
    ],
    badge: "Expert Care",
    accentColor: "#8b5cf6",
    accentLight: "#a78bfa",
    glowColor: "rgba(139,92,246,0.12)",
  },
  {
    id: 3,
    image: img3,
    heading: "Annual Maintenance",
    highlight: "Plans",
    subtitle:
      "Invest in worry-free hydration with our comprehensive AMC packages — scheduled maintenance visits, complimentary filter changes, and priority support throughout the year.",
    features: [
      "Scheduled Maintenance Visits",
      "Complimentary Filter Changes",
      "Priority Customer Support",
      "Transparent Pricing — No Hidden Fees",
    ],
    badge: "Peace of Mind",
    accentColor: "#10b981",
    accentLight: "#34d399",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    id: 4,
    image: img4,
    heading: "Genuine Filter",
    highlight: "Replacement",
    subtitle:
      "Restore peak performance with 100% original filters and components — from sediment cartridges and carbon blocks to RO membranes and UV lamps.",
    features: [
      "100% Original Components",
      "Complete Filter Range Available",
      "Professional Installation Included",
      "Extended Filter Life Assurance",
    ],
    badge: "Authentic Parts",
    accentColor: "#f59e0b",
    accentLight: "#fbbf24",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    id: 5,
    image: img5,
    heading: "Professional",
    highlight: "Installation",
    subtitle:
      "Experience seamless setup by our trained professionals — including comprehensive water quality testing, TDS calibration, and a complete operational walkthrough.",
    features: [
      "Complimentary Professional Setup",
      "Water Quality Analysis & Testing",
      "TDS Calibration & Optimization",
      "Complete Usage Guidance",
    ],
    badge: "Complimentary Setup",
    accentColor: "#f43f5e",
    accentLight: "#fb7185",
    glowColor: "rgba(244,63,94,0.10)",
  },
];

/* ──────────────────────────────────────────────────────
   AMBIENT BUBBLES (CSS-only background)
   ────────────────────────────────────────────────────── */
const Bubbles = () => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: Math.random() * 14 + 4,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        dur: Math.random() * 12 + 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-3%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.2), rgba(56,189,248,0.02))",
            border: "1px solid rgba(56,189,248,0.05)",
            animation: `bubbleFloat ${b.dur}s ease-in infinite ${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────────────
   MAIN HERO COMPONENT
   ────────────────────────────────────────────────────── */
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* Refs */
  const imageContainerRef = useRef(null);
  const floatRef = useRef(null);
  const textContainerRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);
  const glowRef = useRef(null);

  const cur = SLIDES[currentIndex];

  /* ── Auto-advance to next slide ── */
  const handleAutoNext = useCallback(() => {
    setCurrentIndex((p) => (p + 1) % SLIDES.length);
  }, []);

  /* ── Manual navigation ── */
  const goToPrev = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    setCurrentIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToNext = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    setCurrentIndex((p) => (p + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback((i) => {
    if (timelineRef.current) timelineRef.current.kill();
    setCurrentIndex(i);
  }, []);

  /* ──────────────────────────────────
     GSAP ANIMATION ENGINE
     ────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const textEls =
        textContainerRef.current?.querySelectorAll(".anim-item");

      /* Set initial states */
      gsap.set(imageContainerRef.current, {
        xPercent: -140,
        scale: 0.78,
        opacity: 0,
        rotation: -2,
      });
      if (textEls?.length) {
        gsap.set(textEls, { y: 28, opacity: 0 });
      }
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /* Continuous float on the image */
      gsap.to(floatRef.current, {
        y: -16,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* ── Main Timeline ── */
      const tl = gsap.timeline({
        delay: 0.05,
        onComplete: handleAutoNext,
      });

      /* ENTER — Image slides in from left */
      tl.to(
        imageContainerRef.current,
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      /* ENTER — Text staggers in */
      if (textEls?.length) {
        tl.to(
          textEls,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "power2.out",
          },
          0.25
        );
      }

      /* HOLD — Pause in center (3 seconds) */
      tl.to({}, { duration: 3 });

      /* EXIT — Text fades out */
      if (textEls?.length) {
        tl.to(textEls, {
          y: -18,
          opacity: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.in",
        });
      }

      /* EXIT — Image slides out to right */
      tl.to(
        imageContainerRef.current,
        {
          xPercent: 140,
          scale: 0.78,
          opacity: 0,
          rotation: 2,
          duration: 1,
          ease: "power3.in",
        },
        "-=0.25"
      );

      /* Progress bar — synced to total duration */
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: tl.totalDuration(),
        ease: "none",
      });

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, [currentIndex, handleAutoNext]);

  /* ──────────────────────────────────
     RENDER
     ────────────────────────────────── */
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#020617] via-[#0a192f] to-[#0c2d48] overflow-hidden font-sans select-none">
      {/* ═══ Background Layers ═══ */}
      <Bubbles />

      {/* Ambient gradient orbs */}
      <div
        ref={glowRef}
        className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-[2s]"
        style={{ backgroundColor: cur.glowColor }}
      />
      <div
        className="absolute bottom-0 -right-24 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none transition-all duration-[2s]"
        style={{ backgroundColor: cur.glowColor, opacity: 0.4 }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ═══ Main Content ═══ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 flex items-center min-h-screen py-10">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          {/* ──────────────────────────
             LEFT — Text Content
             ────────────────────────── */}
          <div
            ref={textContainerRef}
            className="w-full lg:w-[44%] text-center lg:text-left flex-shrink-0"
          >
            {/* Premium Badge */}
            <div className="anim-item">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: cur.accentColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: cur.accentColor }}
                  />
                </span>
                <span
                  className="text-[11px] sm:text-xs font-semibold tracking-[2px] uppercase"
                  style={{ color: cur.accentLight }}
                >
                  {cur.badge}
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="anim-item mt-6 text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-white leading-[1.06] tracking-tight">
              {cur.heading}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${cur.accentColor}, ${cur.accentLight})`,
                }}
              >
                {cur.highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="anim-item mt-4 sm:mt-5 text-blue-200/35 text-sm sm:text-[15px] leading-relaxed max-w-lg mx-auto lg:mx-0">
              {cur.subtitle}
            </p>

            {/* Divider */}
            <div className="anim-item mt-6 mb-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent max-w-md mx-auto lg:mx-0" />

            {/* Features List */}
            <ul className="anim-item space-y-3 max-w-md mx-auto lg:mx-0">
              {cur.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-[13px] sm:text-sm text-blue-100/45"
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cur.accentColor}15` }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: cur.accentColor }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ──────────────────────────
             RIGHT — Sliding Image + Controls
             ────────────────────────── */}
          <div className="w-full lg:w-[56%] relative flex flex-col items-center">
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full blur-[120px] transition-all duration-[2s]"
                style={{
                  backgroundColor: cur.glowColor,
                  animation: "glowPulse 4s ease-in-out infinite",
                }}
              />
            </div>

            {/* Decorative Rings */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/2 left-1/2 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed opacity-[0.04] transition-colors duration-[2s]"
                style={{
                  borderColor: cur.accentColor,
                  animation: "ringRotate 50s linear infinite",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full border opacity-[0.025] transition-colors duration-[2s]"
                style={{
                  borderColor: cur.accentColor,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>

            {/* ── Image Slide Container ── */}
            <div className="overflow-hidden relative w-full flex justify-center items-center min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]">
              <div ref={imageContainerRef} className="will-change-transform">
                <div ref={floatRef}>
                  <img
                    src={cur.image}
                    alt={cur.heading}
                    className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-auto object-contain"
                    style={{
                      filter: `drop-shadow(0 30px 50px ${cur.accentColor}18) drop-shadow(0 12px 20px rgba(0,0,0,0.3))`,
                    }}
                    draggable="false"
                  />
                </div>
              </div>
            </div>

            {/* ── Controls ── */}
            <div className="mt-3 flex flex-col items-center gap-4 w-full max-w-sm">
              {/* Arrows + Dots Row */}
              <div className="flex items-center gap-4">
                {/* Prev Arrow */}
                <button
                  onClick={goToPrev}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer active:scale-90"
                  aria-label="Previous"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-500 cursor-pointer ${
                        i === currentIndex
                          ? "w-9 h-2.5 shadow-lg"
                          : "w-2.5 h-2.5 bg-white/[0.08] hover:bg-white/20"
                      }`}
                      style={
                        i === currentIndex
                          ? {
                              background: `linear-gradient(90deg, ${cur.accentColor}, ${cur.accentLight})`,
                              boxShadow: `0 0 14px ${cur.accentColor}45`,
                            }
                          : {}
                      }
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Next Arrow */}
                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer active:scale-90"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full rounded-full will-change-transform"
                  style={{
                    background: `linear-gradient(90deg, ${cur.accentColor}, ${cur.accentLight})`,
                    transformOrigin: "left center",
                  }}
                />
              </div>

              {/* Counter */}
              <span className="text-white/[0.12] text-xs font-mono tracking-[3px]">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}