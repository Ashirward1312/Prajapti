import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";

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

/* ───── small icons (premium) ───── */
const Icons = {
  droplet: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.7s7 7.2 7 12.1a7 7 0 0 1-14 0C5 9.9 12 2.7 12 2.7z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.3 4.2L18 7.5l-4.1 1.3L12 13l-1.9-4.2L6 7.5l4.7-1.3L12 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l.8 2.5L22 16l-2.2.6L19 19l-.8-2.4L16 16l2.2-.5L19 13z" />
    </svg>
  ),
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
      <div className="mx-auto mb-4 w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur flex items-center justify-center text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.08)] group-hover:shadow-[0_0_60px_rgba(56,189,248,0.12)] transition-shadow duration-500">
        {icon}
      </div>

      <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
        {c}
        <span className="text-sky-300/90">{suffix}</span>
      </div>

      <div className="text-[11px] font-semibold text-slate-500 mt-2 tracking-[2.5px] uppercase">
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

const features = [
  { icon: Icons.droplet, title: "Free Water Testing", desc: "Complimentary water analysis before choosing the right purifier." },
  { icon: Icons.shield, title: "AMC & Repairs", desc: "Genuine parts, clear pricing, and reliable annual maintenance." },
  { icon: Icons.bolt, title: "Same Day Service", desc: "Fast installation & repair service across Raipur city." },
  { icon: Icons.spark, title: "Quality Promise", desc: "Clean workmanship, strong finishing, and satisfaction focus." },
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
    <section id="about" ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-[#040A16]">
      {/* ── premium background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* gradient mesh blobs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-sky-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-32 w-[650px] h-[650px] bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-0 w-[750px] h-[750px] bg-cyan-500/10 rounded-full blur-[160px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* top hairline */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {/* ═══════ HEADER ═══════ */}
        <div
          className={`text-center mb-24 transition-all duration-1000 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 border border-white/10 bg-white/[0.04] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300" />
            </span>
            <span className="text-sky-300/90 text-[11px] font-semibold tracking-[3px] uppercase">
              About Us
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
            Pure Water,
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                Healthy Life
              </span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[78%] h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Trusted RO installation, repair & AMC — serving Raipur with quality workmanship since 2009.
          </p>
        </div>

        {/* ═══════ COMPANY CARD ═══════ */}
        <div
          className={`mb-28 transition-all duration-1000 delay-200 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            {/* inner top shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent" />
            {/* corner glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-500/10 blur-3xl rounded-full" />

            <div className="p-8 md:p-12 lg:p-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* left */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="relative w-[92px] h-[92px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 p-2.5 mb-6">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 ring-1 ring-sky-400/10 rounded-2xl pointer-events-none" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
                    Prajapati Enterprise
                  </h3>
                  <p className="text-sky-300/70 text-sm font-medium tracking-wide mb-5">
                    RO Water Purifier Experts
                  </p>

                  <div className="flex items-center gap-1 mb-7">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-slate-500 ml-2 font-medium">4.9 / 5</span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`tel:${PHONE}`}
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-300 hover:-translate-y-0.5"
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
                      className="inline-flex items-center gap-2 border border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-300 hover:bg-emerald-500/[0.10] hover:border-emerald-300/30 text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                        <path d="M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
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
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-slate-300/80 text-[15px] md:text-base leading-[1.95]">
                    At <span className="text-white font-semibold">Prajapati Enterprise</span>, we deliver premium RO solutions so your family gets{" "}
                    <span className="text-sky-200 font-semibold">clean, safe & great-tasting water</span>.
                    From RO/UV to alkaline systems — we handle installation, maintenance, and year‑round support.
                  </p>

                  <p className="text-slate-300/80 text-[15px] md:text-base leading-[1.95]">
                    Trusted by thousands in <span className="text-white font-semibold">Raipur, Chhattisgarh</span>, we recommend the right purifier based on your water quality — not guesswork.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-3">
                    {["15+ Years", "50+ Brands", "Clean Fitting", "Genuine Parts"].map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-2 text-xs font-medium text-slate-300/70 border border-white/10 rounded-full px-4 py-2 bg-white/[0.03]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300/70" />
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

        {/* ═══════ FEATURES ═══════ */}
        <div
          className={`mb-28 transition-all duration-1000 delay-300 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-14">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
              Why Choose <span className="text-sky-300">Us</span>
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">Services designed around your needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
              >
                {/* sheen */}
                <div className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur flex items-center justify-center text-sky-300 mb-5">
                    {f.icon}
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2 tracking-tight">{f.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>

                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ MAP + CONTACT ═══════ */}
        <div
          className={`mb-28 transition-all duration-1000 delay-400 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />

            <div className="grid lg:grid-cols-2">
              {/* map */}
              <div
                className="relative h-[320px] lg:h-auto lg:min-h-[420px]"
                onMouseEnter={() => setMapH(true)}
                onMouseLeave={() => setMapH(false)}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14868.499956298232!2d81.624294!3d21.306077!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDE4JzIxLjkiTiA4McKwMzcnMjcuNSJF!5e0!3m2!1sen!2sus!4v1771676244237!5m2!1sen!2sus"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location"
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
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-sky-500/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/[0.06] backdrop-blur-md px-5 py-2 rounded-full border border-white/10 transition-all duration-500 ${
                    mapH ? "opacity-0 translate-y-3" : "opacity-100"
                  }`}
                >
                  <span className="text-[11px] text-slate-300/70 font-medium tracking-wide">
                    Hover to explore map
                  </span>
                </div>

                <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              {/* contact */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <h4 className="text-xl font-extrabold text-white mb-2 tracking-tight">Our Location</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar, Birgaon, Raipur, Chhattisgarh — 493221
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      label: "Phone",
                      value: PHONE_DISPLAY,
                      href: `tel:${PHONE}`,
                      icon: (
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
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
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                          <path d="M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                        </svg>
                      ),
                    },
                    {
                      label: "Hours",
                      value: "9 AM – 8 PM  •  Mon – Sun",
                      icon: (
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
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
                        className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-sky-300/20 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-sky-400/[0.08] border border-sky-300/20 flex items-center justify-center text-sky-200 flex-shrink-0 group-hover:bg-sky-400/[0.12] transition-colors duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 font-semibold tracking-[2px] uppercase">
                            {item.label}
                          </div>
                          <div className="text-sm font-medium text-slate-200 mt-0.5">{item.value}</div>
                        </div>
                      </Tag>
                    );
                  })}
                </div>

                <a
                  href="https://maps.google.com/?q=21.306077,81.624294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] hover:border-sky-300/20 text-sm font-semibold text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4 text-sky-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                  <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-sky-300/15 to-transparent" />
          </div>
        </div>

        {/* ═══════ STATS ═══════ */}
        <div
          ref={statsRef}
          className={`rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 md:p-16 transition-all duration-1000 delay-500 ${
            vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } shadow-[0_30px_120px_rgba(0,0,0,0.45)]`}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent -mt-10 md:-mt-16 mb-10 md:mb-14 -mx-10 md:-mx-16" />

          <div className="text-center mb-14">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Trusted by <span className="text-sky-300">Raipur</span>
            </h3>
            <p className="text-slate-500 text-sm">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
            {stats.map((s, i) => (
              <div key={i} className="relative">
                <Stat value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} run={sVis} delay={i * 150} />
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}