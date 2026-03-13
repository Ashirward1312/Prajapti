// src/components/HeroSection.jsx
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import gsap from "gsap";

import img1 from "../img/bg1.png";
import img2 from "../img/bm_elite.png";
import img3 from "../img/bg3.png";
import img4 from "../img/bg4.png";
import img5 from "../img/havells.png";

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

function useMediaQuery(query, initial = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return initial;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    setMatches(mq.matches);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

/**
 * Bubbles: desktop pe zyada, mobile pe off
 * (desktop view "rich" + mobile smooth)
 */
const Bubbles = ({ enabled, count = 18, intensity = 1 }) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 18 + 6,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        dur: Math.random() * 11 + 10,
        blur: Math.random() * 2,
        alpha: (Math.random() * 0.12 + 0.1) * intensity,
      })),
    [count, intensity]
  );

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-6%",
            filter: `blur(${b.blur}px)`,
            background: `radial-gradient(circle at 30% 30%, rgba(56,189,248,${b.alpha}), rgba(56,189,248,0.012))`,
            border: "1px solid rgba(56,189,248,0.08)",
            animation: `bubbleFloat ${b.dur}s ease-in infinite ${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const rootRef = useRef(null);
  const imageContainerRef = useRef(null);
  const floatRef = useRef(null);
  const textContainerRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  const cur = SLIDES[currentIndex];

  // preload (jank kam)
  useEffect(() => {
    if (typeof window === "undefined") return;
    SLIDES.forEach((s) => {
      const im = new Image();
      im.src = s.image;
    });
  }, []);

  const handleAutoNext = useCallback(() => {
    setCurrentIndex((p) => (p + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
    setCurrentIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToNext = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
    setCurrentIndex((p) => (p + 1) % SLIDES.length);
  }, []);

  const goTo = useCallback((i) => {
    timelineRef.current?.kill();
    timelineRef.current = null;
    setCurrentIndex(i);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    if (prefersReducedMotion) {
      timelineRef.current?.kill();
      timelineRef.current = null;
      gsap.set([imageContainerRef.current, textContainerRef.current], {
        clearProps: "all",
        opacity: 1,
      });
      gsap.set(progressRef.current, { clearProps: "all", scaleX: 1 });
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = null;
    gsap.killTweensOf([
      imageContainerRef.current,
      floatRef.current,
      progressRef.current,
    ]);

    const ctx = gsap.context(() => {
      const textEls = textContainerRef.current?.querySelectorAll(".anim-item");
      const mm = gsap.matchMedia();

      gsap.set([imageContainerRef.current, textContainerRef.current], {
        force3D: true,
      });

      // Mobile: super smooth simple
      mm.add("(max-width: 768px)", () => {
        gsap.set(imageContainerRef.current, { y: 14, scale: 0.99, opacity: 0 });
        if (textEls?.length) gsap.set(textEls, { y: 12, opacity: 0 });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: handleAutoNext,
          defaults: { ease: "power2.out" },
        });

        tl.to(imageContainerRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0);

        if (textEls?.length) {
          tl.to(
            textEls,
            { y: 0, opacity: 1, duration: 0.38, stagger: 0.06 },
            0.08
          );
        }

        tl.to({}, { duration: 2.15 });

        if (textEls?.length) {
          tl.to(
            textEls,
            { y: -8, opacity: 0, duration: 0.22, stagger: 0.03, ease: "power2.in" },
            "out"
          );
        }
        tl.to(
          imageContainerRef.current,
          { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" },
          "out"
        );

        gsap.to(progressRef.current, {
          scaleX: 1,
          duration: tl.totalDuration(),
          ease: "none",
        });

        timelineRef.current = tl;
      });

      // Desktop/Tablet: proper slide animation
      mm.add("(min-width: 769px)", () => {
        gsap.set(imageContainerRef.current, {
          xPercent: -120,
          scale: 0.88,
          opacity: 0,
          rotation: -1.5,
        });

        if (textEls?.length) gsap.set(textEls, { y: 18, opacity: 0 });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

        if (floatRef.current) {
          gsap.to(floatRef.current, {
            y: -12,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: handleAutoNext,
          defaults: { ease: "power3.out" },
        });

        tl.to(
          imageContainerRef.current,
          { xPercent: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.9 },
          0
        );

        if (textEls?.length) {
          tl.to(
            textEls,
            { y: 0, opacity: 1, duration: 0.48, stagger: 0.075, ease: "power2.out" },
            0.18
          );
        }

        tl.to({}, { duration: 2.55 });

        if (textEls?.length) {
          tl.to(
            textEls,
            { y: -14, opacity: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" },
            "out"
          );
        }

        tl.to(
          imageContainerRef.current,
          {
            xPercent: 120,
            scale: 0.88,
            opacity: 0,
            rotation: 1.5,
            duration: 0.9,
            ease: "power3.in",
          },
          "out-=0.12"
        );

        gsap.to(progressRef.current, {
          scaleX: 1,
          duration: tl.totalDuration(),
          ease: "none",
        });

        timelineRef.current = tl;
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [currentIndex, handleAutoNext, prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      id="home"
      className="
        relative w-full overflow-hidden font-sans select-none box-border
        min-h-screen
        bg-gradient-to-br from-[#020617] via-[#0a192f] to-[#0c2d48]
        pt-[72px] sm:pt-[80px] lg:pt-[90px]
      "
    >
      {/* Desktop pe zyada bubbles */}
      <Bubbles
        enabled={!isMobile && !prefersReducedMotion}
        count={isDesktop ? 30 : 18}
        intensity={isDesktop ? 1.35 : 1}
      />

      {/* Glows */}
      <div
        className="absolute top-0 -left-40 w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] lg:w-[520px] lg:h-[520px] rounded-full blur-[90px] sm:blur-[120px] lg:blur-[150px] pointer-events-none transition-all duration-[2s]"
        style={{ backgroundColor: cur.glowColor }}
      />
      <div
        className="absolute bottom-0 -right-24 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[430px] lg:h-[430px] rounded-full blur-[85px] sm:blur-[115px] lg:blur-[135px] pointer-events-none transition-all duration-[2s]"
        style={{ backgroundColor: cur.glowColor, opacity: 0.3 }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Main */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        {/* ✅ More UP: top padding almost removed */}
        <div className="pt-0 pb-6 sm:pt-1 sm:pb-10 lg:pt-2 lg:pb-12 grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* TEXT */}
          <div
            ref={textContainerRef}
            className="lg:col-span-5 text-center lg:text-left"
          >
            <div className="anim-item flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]">
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: cur.accentColor }}
                />
                <span
                  className="text-[11px] sm:text-[12px] font-semibold tracking-[2px] uppercase"
                  style={{ color: cur.accentLight }}
                >
                  {cur.badge}
                </span>
              </div>
            </div>

            <h1 className="anim-item mt-3 sm:mt-4 text-[1.8rem] sm:text-[2.35rem] md:text-[2.7rem] lg:text-[3.05rem] xl:text-[3.4rem] font-black text-white leading-[1.06] tracking-tight">
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

            <p className="anim-item mt-3 text-slate-200/55 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
              {cur.subtitle}
            </p>

            <div className="anim-item mt-4 mb-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent max-w-xs sm:max-w-md mx-auto lg:mx-0" />

            <ul className="anim-item space-y-2.5 max-w-md mx-auto lg:mx-0">
              {cur.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-[12px] sm:text-[13px] lg:text-[14px] text-slate-200/60"
                >
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cur.accentColor}18` }}
                  >
                    <svg
                      className="w-2.5 h-2.5"
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

          {/* IMAGE + CONTROLS */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            {/* Rings (desktop) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <div
                className="absolute top-1/2 left-1/2 w-[380px] h-[380px] rounded-full border border-dashed opacity-[0.045]"
                style={{
                  borderColor: cur.accentColor,
                  animation: "ringRotate 54s linear infinite",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 w-[270px] h-[270px] rounded-full border opacity-[0.03]"
                style={{
                  borderColor: cur.accentColor,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>

            {/* image area */}
            <div className="relative w-full flex items-center justify-center h-[260px] sm:h-[340px] lg:h-[430px]">
              <div
                ref={imageContainerRef}
                className="will-change-transform transform-gpu"
              >
                <div ref={floatRef}>
                  <img
                    src={cur.image}
                    alt={cur.heading}
                    className="w-44 sm:w-60 lg:w-[340px] xl:w-[400px] h-auto object-contain"
                    style={{
                      filter: isMobile
                        ? "drop-shadow(0 10px 18px rgba(0,0,0,0.22))"
                        : `drop-shadow(0 26px 46px ${cur.accentColor}18) drop-shadow(0 12px 22px rgba(0,0,0,0.28))`,
                    }}
                    draggable="false"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={goToPrev}
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer active:scale-90"
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

                <div className="flex items-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-500 cursor-pointer ${
                        i === currentIndex
                          ? "w-8 h-2 shadow-lg"
                          : "w-2 h-2 bg-white/[0.08] hover:bg-white/20"
                      }`}
                      style={
                        i === currentIndex
                          ? {
                              background: `linear-gradient(90deg, ${cur.accentColor}, ${cur.accentLight})`,
                              boxShadow: `0 0 12px ${cur.accentColor}40`,
                            }
                          : {}
                      }
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer active:scale-90"
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

              <span className="text-white/[0.12] text-[11px] font-mono tracking-[3px]">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />

      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.55; transform: translateY(-10vh) scale(1); }
          100% { transform: translateY(-115vh) scale(0.4); opacity: 0; }
        }
        @keyframes ringRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}