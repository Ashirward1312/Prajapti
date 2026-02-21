// src/components/HeroSection.jsx
import { useEffect, useMemo, useState } from "react";

import bg from "../img/hero.jpg";
import img1 from "../img/h1.png";
import img2 from "../img/h2.png";
import img3 from "../img/h3.png";

export default function HeroSection() {
  const slideData = useMemo(
    () => [
      {
        src: img1,
        label: "Installation",
        title: "RO Installation",
        desc: "New purifier setup with proper fitting & demo.",
      },
      {
        src: img2,
        label: "Service",
        title: "RO Repair & Service",
        desc: "Filter change, low flow, leakage, noise issues.",
      },
      {
        src: img3,
        label: "Best Purifier",
        title: "Best Purifier Suggestion",
        desc: "Right model selection as per water TDS & usage.",
      },
    ],
    []
  );

  const SLIDE_MS = 4000;

  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % slideData.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [slideData.length]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-slate-950">
      {/* Background */}
      <img
        src={bg}
        alt="Water purifier background"
        className="absolute inset-0 h-full w-full object-cover object-center animate-[slowZoom_25s_ease-in-out_infinite]"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

      {/* Glow Orbs */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-96 w-96 rounded-full bg-sky-500/15 blur-[150px] animate-[float_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-[130px] animate-[float_10s_ease-in-out_infinite_reverse]" />

      {/* Floating Particles */}
      <div className="pointer-events-none" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 h-1 w-1 rounded-full bg-sky-400/35 animate-[rise_var(--dur)_linear_infinite]"
            style={{
              left: `${8 + i * 9}%`,
              "--dur": `${10 + (i % 5) * 2}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 py-14">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div
            className={[
              "transition-all duration-1000 delay-150",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/20 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-5 py-2.5 backdrop-blur-2xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
              </span>
              <span className="text-sm font-medium tracking-wide text-sky-300">
                Trusted RO Service in Raipur
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Water Purifier
              <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
                Repair Experts
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              RO repair, installation & maintenance with{" "}
              <span className="font-medium text-sky-400">
                fast doorstep support
              </span>{" "}
              and genuine spare parts.
            </p>

            {/* Active Slide Info */}
            <div className="mt-8 relative min-h-[92px]">
              {slideData.map((s, i) => (
                <div
                  key={s.title}
                  className={[
                    "transition-all duration-700 ease-out",
                    active === i
                      ? "opacity-100 translate-y-0"
                      : "absolute inset-0 opacity-0 translate-y-3 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
                    <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-[40px]" />

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-gradient-to-br from-sky-500/20 to-cyan-400/10">
                        <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.65)]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
                            {s.label}
                          </span>
                          <span className="h-px w-6 bg-white/15" />
                          <span className="text-sm font-semibold text-white">
                            {s.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+919876543210"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-500 hover:from-sky-400 hover:to-cyan-400 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]" />
                <span className="relative inline-flex items-center gap-3">
                  <svg
                    className="h-5 w-5 animate-[ring_2s_ease-in-out_infinite]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call Now
                </span>
              </a>

              <a
                href="#services"
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-sky-400/30 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Our Services
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — Clean Image Only Card (Slightly Smaller) */}
          <div
            className={[
              "flex justify-center lg:justify-end transition-all duration-1000 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="relative w-full max-w-sm">
              {/* Premium Frame */}
              <div className="relative rounded-[2.25rem] bg-gradient-to-b from-white/20 via-white/10 to-white/0 p-[1px] shadow-[0_30px_110px_-45px_rgba(0,0,0,0.95)]">
                <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-2xl">
                  {/* Highlights */}
                  <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-sky-400/12 blur-[70px]" />
                  <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-[80px]" />

                  {/* Image stage — clean, no bottom content */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    {/* light sweep */}
                    <div className="pointer-events-none absolute inset-0 opacity-60 animate-[sweep_4.6s_ease-in-out_infinite] [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.10),transparent)]" />

                    {slideData.map((s, i) => (
                      <img
                        key={s.title}
                        src={s.src}
                        alt={s.title}
                        className={[
                          "absolute inset-0 h-full w-full object-contain p-6",
                          "transition-all duration-[900ms] ease-out",
                          active === i
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-6",
                        ].join(" ")}
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    ))}

                    {/* subtle bottom fade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -right-3 -top-3 z-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-amber-500/30">
                ⭐ Top Rated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Animations */}
      <style>{`
        @keyframes slowZoom { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes float {
          0%,100%{transform:translateY(0) translateX(0)}
          25%{transform:translateY(-20px) translateX(10px)}
          50%{transform:translateY(-10px) translateX(-10px)}
          75%{transform:translateY(-30px) translateX(5px)}
        }
        @keyframes rise {
          0%{transform:translateY(0) scale(0);opacity:0}
          10%{opacity:1;transform:translateY(-10vh) scale(1)}
          100%{transform:translateY(-110vh) scale(.6);opacity:0}
        }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes ring {
          0%,100%{transform:rotate(0deg)}
          10%{transform:rotate(15deg)}
          20%{transform:rotate(-10deg)}
          30%{transform:rotate(5deg)}
          40%{transform:rotate(0deg)}
        }
        @keyframes sweep {
          0%{transform:translateX(-120%)}
          60%{transform:translateX(120%)}
          100%{transform:translateX(120%)}
        }
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}