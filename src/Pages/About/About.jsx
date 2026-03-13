// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";
import aboutImg1 from "../img/h1.png";
import aboutImg2 from "../img/h2.png";

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

/* ───── highlighted helpers ───── */
const BrandName = ({ className = "" }) => (
  <span
    className={`font-extrabold bg-gradient-to-r from-sky-200 via-cyan-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.25)] ${className}`}
  >
    Prajapati Enterprise
  </span>
);

const HighlightBadge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1.5 font-bold text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.08)] ${className}`}
  >
    {children}
  </span>
);

/* ───── small icons ───── */
const Icons = {
  users: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 21v-2a3 3 0 0 0-2.3-2.9"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.7 3.1a4 4 0 0 1 0 7.8"
      />
    </svg>
  ),
  trophy: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 4h10v5a5 5 0 0 1-10 0V4z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 6H5a2 2 0 0 0 2 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 6h2a2 2 0 0 1-2 4" />
    </svg>
  ),
  tag: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2V4h9.4l7.8 7.8a2 2 0 0 1 0 2.8z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.01" />
    </svg>
  ),
  star: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l2.9 6 6.6.7-5 4.4 1.5 6.5L12 16.9 6 19.6l1.5-6.5-5-4.4 6.6-.7L12 2z"
      />
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
const PHONE_1 = "+918871863773";
const PHONE_1_DISPLAY = "+91 88718 63773";

const PHONE_2 = "+919630352226";
const PHONE_2_DISPLAY = "+91 96303 52226";

const PHONE_3 = "+917879727388";
const PHONE_3_DISPLAY = "+91 78797 27388";

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
      className="relative overflow-hidden bg-[#040A16] py-16 sm:py-20 md:py-28 lg:py-36"
    >
      {/* ── premium background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[140px] lg:h-[900px] lg:w-[900px]" />
        <div className="absolute top-1/2 -left-32 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px] sm:h-[450px] sm:w-[450px] sm:blur-[140px] lg:h-[650px] lg:w-[650px]" />
        <div className="absolute -bottom-40 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px] sm:h-[550px] sm:w-[550px] sm:blur-[160px] lg:h-[750px] lg:w-[750px]" />

        <div
          className="absolute inset-0 opacity-[0.04] sm:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        {/* ═══════ HEADER ═══════ */}
        <div
          className={`text-center mb-14 sm:mb-18 md:mb-24 transition-all duration-1000 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur sm:mb-8 sm:gap-2.5 sm:px-5 sm:py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-300" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[2px] text-sky-300/90 sm:text-[11px] sm:tracking-[3px]">
              About Us
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
            Pure Water,
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                Healthy Life
              </span>
            </span>
          </h2>

          <div className="my-4 flex items-center justify-center gap-2 sm:my-5 sm:gap-3">
            <div className="h-[1px] w-8 rounded bg-gradient-to-r from-transparent to-sky-400/50 sm:w-12" />
            <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <div className="h-[1px] w-8 rounded bg-gradient-to-l from-transparent to-sky-400/50 sm:w-12" />
          </div>

          <div className="mx-auto max-w-3xl px-2">
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
              <HighlightBadge className="text-[11px] sm:text-sm md:text-base">
                Trusted RO installation, repair & AMC
              </HighlightBadge>
              <span className="mt-3 block">
                Serving Raipur with quality workmanship since 2009.
              </span>
            </p>
          </div>
        </div>

        {/* ═══════ IMAGE SHOWCASE SECTION 1 ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-100 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:rounded-3xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <img
                    src={aboutImg1}
                    alt="RO Water Purifier Service"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A16]/60 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md sm:px-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 text-sky-400 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white sm:text-sm">
                        Quality Service
                      </p>
                      <p className="text-[10px] text-slate-400 sm:text-xs">Since 2009</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 h-16 w-16 rounded-tr-2xl border-t-2 border-r-2 border-sky-400/30 sm:top-4 sm:right-4 sm:h-20 sm:w-20" />
                <div className="absolute bottom-3 left-3 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2 border-sky-400/30 sm:bottom-4 sm:left-4 sm:h-20 sm:w-20" />
              </div>

              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-sky-500/10 blur-2xl sm:-top-6 sm:-right-6 sm:h-28 sm:w-28" />
            </div>

            <div className="order-1 lg:order-2">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-sky-400 sm:mb-4 sm:text-sm">
                Our Mission
              </span>
              <h3 className="mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-3xl md:text-4xl">
                Delivering Healthy Water to Every Home
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-400 sm:mb-6 sm:text-base">
                At <BrandName />, we believe every family deserves access to clean,
                safe drinking water. Our team of certified technicians brings years of
                expertise to ensure your water purifier works flawlessly.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-slate-400 sm:mb-8 sm:text-base">
                From installation to maintenance, we provide comprehensive RO services
                with genuine parts and transparent pricing.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {["Expert Technicians", "Genuine Parts", "Same Day Service", "All Brands"].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 sm:h-6 sm:w-6">
                        <svg
                          className="h-3 w-3 text-emerald-400 sm:h-3.5 sm:w-3.5"
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
                      </div>
                      <span className="text-xs font-medium text-slate-300 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  )
                )}
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
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-3xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent" />
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl sm:h-72 sm:w-72" />

            <div className="p-5 sm:p-8 md:p-12 lg:p-14">
              <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
                  <div className="relative mb-4 h-[72px] w-[72px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-2 sm:mb-6 sm:h-[92px] sm:w-[92px] sm:rounded-2xl sm:p-2.5">
                    <img
                      src={logo}
                      alt="Prajapati Enterprise Logo"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="mb-1 text-xl font-extrabold tracking-tight sm:text-2xl">
                    <BrandName />
                  </h3>

                  <p className="mb-4 text-xs font-medium tracking-wide text-sky-300/70 sm:mb-5 sm:text-sm">
                    RO Water Purifier Experts
                  </p>

                  <div className="mb-5 flex items-center gap-1 sm:mb-7">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3.5 w-3.5 text-amber-300 sm:h-4 sm:w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-[10px] font-medium text-slate-500 sm:text-xs">
                      4.9 / 5
                    </span>
                  </div>

                  <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
                    <a
                      href={`tel:${PHONE_1}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 sm:px-6 sm:py-3"
                    >
                      <svg
                        className="h-4 w-4"
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
                      Call Now
                    </a>

                    <a
                      href={`https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service%20and%20would%20like%20more%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] px-5 py-2.5 text-sm font-semibold text-emerald-300 transition-all duration-300 sm:px-6 sm:py-3"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="hidden lg:col-span-1 lg:block">
                  <div className="mx-auto h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:hidden" />

                <div className="space-y-4 sm:space-y-5 lg:col-span-7">
                  <p className="text-sm leading-[1.8] text-slate-300/80 sm:text-[15px] sm:leading-[1.95] md:text-base">
                    At <BrandName />, we deliver premium RO solutions so your family gets{" "}
                    <span className="font-semibold text-sky-200">
                      clean, safe & healthy water
                    </span>
                    . From RO/UV to alkaline systems — we handle installation,
                    maintenance, and year‑round support.
                  </p>

                  <p className="text-sm leading-[1.8] text-slate-300/80 sm:text-[15px] sm:leading-[1.95] md:text-base">
                    <HighlightBadge className="mr-2 mb-2 sm:mb-0">
                      Trusted by thousands
                    </HighlightBadge>{" "}
                    in <span className="font-semibold text-white">Raipur, Chhattisgarh</span>,
                    we recommend the right purifier based on your water quality — not
                    guesswork.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 sm:gap-3 sm:pt-3">
                    {["15+ Years", "50+ Brands", "Clean Fitting", "Genuine Parts"].map(
                      (t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-slate-300/70 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
                        >
                          <span className="h-1 w-1 rounded-full bg-sky-300/70 sm:h-1.5 sm:w-1.5" />
                          {t}
                        </span>
                      )
                    )}
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
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-cyan-400 sm:mb-4 sm:text-sm">
                Why Choose Us
              </span>
              <h3 className="mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-3xl md:text-4xl">
                Professional Service You Can Trust
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-400 sm:mb-6 sm:text-base">
                We understand the importance of clean water for your family's health.
                That's why we use only genuine parts and follow industry best practices
                for every installation and repair.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-slate-400 sm:mb-8 sm:text-base">
                Our technicians are trained to handle all major RO brands including Kent,
                Aquaguard, Livpure, Pureit, and many more.
              </p>

              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { num: "15+", label: "Years" },
                  { num: "5000+", label: "Customers" },
                  { num: "50+", label: "Brands" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-white sm:text-3xl">{item.num}</p>
                    <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:rounded-3xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <img
                    src={aboutImg2}
                    alt="RO Water Purifier Installation"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A16]/60 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md sm:px-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 sm:h-10 sm:w-10">
                      <svg
                        className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white sm:text-sm">
                        Verified Experts
                      </p>
                      <p className="text-[10px] text-slate-400 sm:text-xs">Certified Team</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 left-3 h-16 w-16 rounded-tl-2xl border-t-2 border-l-2 border-cyan-400/30 sm:top-4 sm:left-4 sm:h-20 sm:w-20" />
                <div className="absolute bottom-3 right-3 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-cyan-400/30 sm:bottom-4 sm:right-4 sm:h-20 sm:w-20" />
              </div>

              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-cyan-500/10 blur-2xl sm:-bottom-6 sm:-left-6 sm:h-28 sm:w-28" />
            </div>
          </div>
        </div>

        {/* ═══════ MAP + CONTACT ═══════ */}
        <div
          className={`mb-14 sm:mb-20 md:mb-28 transition-all duration-1000 delay-300 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-3xl">
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
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prajapati Enterprise Location"
                  style={{ filter: "brightness(0.58) contrast(1.18) saturate(0.75)" }}
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#040A16] via-[#040A16]/25 to-[#040A16]/55 transition-opacity duration-700 ${
                    mapH ? "opacity-0" : "opacity-100"
                  }`}
                />

                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full transition-all duration-500 ${
                    mapH ? "opacity-0 scale-90" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 shadow-xl shadow-sky-500/30 sm:h-12 sm:w-12">
                    <svg
                      className="h-4 w-4 text-white sm:h-5 sm:w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 backdrop-blur-md transition-all duration-500 sm:bottom-5 sm:px-5 sm:py-2 ${
                    mapH ? "opacity-0 translate-y-3" : "opacity-100"
                  }`}
                >
                  <span className="text-[10px] font-medium tracking-wide text-slate-300/70 sm:text-[11px]">
                    <span className="hidden sm:inline">Hover to explore map</span>
                    <span className="sm:hidden">Tap to explore map</span>
                  </span>
                </div>

                <div className="absolute right-0 top-8 bottom-8 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />
              </div>

              {/* contact */}
              <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12">
                <h4 className="mb-1.5 text-lg font-extrabold tracking-tight text-white sm:mb-2 sm:text-xl">
                  Contact & Location
                </h4>
                <p className="mb-6 text-xs leading-relaxed text-slate-400 sm:mb-8 sm:text-sm">
                  Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar,
                  Birgaon, Raipur, Chhattisgarh — 493221
                </p>

                <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
                  {[
                    {
                      label: "Primary Phone",
                      value: PHONE_1_DISPLAY,
                      href: `tel:${PHONE_1}`,
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Support Phone",
                      value: PHONE_2_DISPLAY,
                      href: `tel:${PHONE_2}`,
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Service Phone",
                      value: PHONE_3_DISPLAY,
                      href: `tel:${PHONE_3}`,
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "WhatsApp",
                      value: PHONE_1_DISPLAY,
                      href: `https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service%20and%20would%20like%20more%20details.`,
                      external: true,
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        </svg>
                      ),
                    },
                    {
                      label: "Hours",
                      value: "9 AM – 8 PM  •  Mon – Sun",
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
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
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 sm:gap-4 sm:rounded-2xl sm:p-4"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-400/[0.08] text-sky-200 sm:h-10 sm:w-10 sm:rounded-2xl">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] font-semibold uppercase tracking-[1.5px] text-slate-500 sm:text-[10px] sm:tracking-[2px]">
                            {item.label}
                          </div>
                          <div className="mt-0.5 text-xs font-medium text-slate-200 sm:text-sm break-words">
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-xs font-semibold text-white transition-all duration-300 sm:gap-2.5 sm:rounded-2xl sm:py-3.5 sm:text-sm"
                >
                  <svg
                    className="h-3.5 w-3.5 text-sky-200 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
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
          <div className="-mt-6 -mx-6 mb-8 h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent sm:-mt-10 sm:-mx-10 sm:mb-10 md:-mt-16 md:-mx-16 md:mb-14" />

          <div className="mb-10 text-center sm:mb-14">
            <h3 className="mb-2 text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
              <HighlightBadge className="text-sm sm:text-base md:text-lg">
                Trusted by
              </HighlightBadge>{" "}
              <span className="text-sky-300">Raipur</span>
            </h3>
            <p className="text-xs text-slate-500 sm:text-sm">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-10 lg:gap-14">
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
                  <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent sm:h-14 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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