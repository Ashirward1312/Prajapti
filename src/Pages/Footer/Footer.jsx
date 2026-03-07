// src/components/Footer.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";

const WHATSAPP_URL =
  "https://wa.me/918871863773?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service";

const MAP_URL = "https://maps.google.com/?q=21.306077,81.624294";

const ADDRESS =
  "Opposite Honda Showroom, Urla Road, Shahid Nagar, Birgaon, Raipur (C.G.)";

const MIND_BRIDGE_WA = "917470958844";
const MIND_BRIDGE_DISPLAY = "747 095 8844";

/* Optional bubbles (desktop only) */
function Bubbles({ enabled = true }) {
  const bubbles = useMemo(() => {
    const colors = [
      "rgba(56,189,248,0.16)",
      "rgba(34,211,238,0.12)",
      "rgba(148,163,184,0.10)",
    ];
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      size: Math.random() * 18 + 6,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      dur: Math.random() * 10 + 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: Math.random() * 1.5,
      opacity: Math.random() * 0.35 + 0.25,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-10%",
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, rgba(56,189,248,0.01))`,
            border: "1px solid rgba(56,189,248,0.08)",
            animation: `footerBubbleFloat ${b.dur}s ease-in infinite ${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Footer() {
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setDesktop(e.matches);
    setDesktop(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    // ✅ FIX HERE: removed mt-16, added -mt-px to avoid seam line
    <footer className="relative -mt-px overflow-hidden bg-gradient-to-br from-[#020617] via-[#061a30] to-[#0b2b44] text-white">
      {/* Background */}
      <Bubbles enabled={desktop} />
      <div className="pointer-events-none absolute -top-44 -left-44 h-[540px] w-[540px] rounded-full bg-sky-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-8 -right-44 h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left group"
              aria-label="Go to Home"
            >
              <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur flex items-center justify-center overflow-hidden transition group-hover:bg-white/[0.10] group-hover:border-sky-400/20">
                <img
                  src={logo}
                  alt="logo"
                  className="h-full w-full object-contain p-1"
                  loading="lazy"
                />
              </div>

              <div>
                <h2 className="font-extrabold text-lg tracking-tight">
                  Prajapati <span className="text-sky-400">Enterprise</span>
                </h2>
                <p className="text-[11px] tracking-[2px] uppercase text-slate-400">
                  RO Water Purifier Service
                </p>
              </div>
            </button>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Multi-brand RO service & repair in Raipur and nearby areas with
              trained technicians and genuine parts.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.10] hover:border-sky-400/20 px-4 py-2.5 text-sm font-semibold text-sky-200 transition"
              >
                <PhoneIcon className="h-4 w-4 text-sky-300" />
                {PHONE_DISPLAY}
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] hover:bg-emerald-500/[0.12] hover:border-emerald-400/30 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition"
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-300" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-sm tracking-[2px] uppercase text-slate-200">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-sky-200 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/services")}
                  className="hover:text-sky-200 transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-sky-200 transition"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-sky-200 transition"
                >
                  Let&apos;s Connect
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-sm tracking-[2px] uppercase text-slate-200">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <PinIcon className="h-5 w-5 text-sky-300 mt-0.5" />
                <span className="leading-relaxed">{ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-sky-300" />
                <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
              </div>

              <div className="pl-7">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center justify-center gap-2 rounded-2xl border border-sky-400/20 bg-sky-500/10 hover:bg-sky-500/14 px-4 py-2.5 text-sm font-bold text-sky-100 transition"
                >
                  <PinIcon className="h-4 w-4 text-sky-300" />
                  Open Location
                  <ArrowUpRightIcon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - centered */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} All rights reserved to{" "}
            <span className="text-slate-200 font-semibold">
              Prajapati Enterprises
            </span>
            .
          </p>

          <p className="text-xs text-slate-400">
            Designed &amp; Developed by{" "}
            <a
              href={`https://wa.me/${MIND_BRIDGE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-200 hover:text-white font-semibold transition"
              title="Chat on WhatsApp"
            >
              MindBridge Tech
            </a>{" "}
            — WhatsApp:{" "}
            <a
              href={`https://wa.me/${MIND_BRIDGE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-200 hover:text-white font-semibold transition"
              title="Chat on WhatsApp"
            >
              {MIND_BRIDGE_DISPLAY}
            </a>
          </p>
        </div>
      </div>

      {/* Floating Back To Top (right) */}
      <div
        className={`fixed bottom-6 right-5 z-[120] transition-all duration-300 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollTop}
          className="group relative h-12 w-12 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.96] transition"
          aria-label="Back to top"
          title="Back to top"
        >
          <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-sky-400/0 blur-md transition group-hover:bg-sky-400/20" />
          <ArrowUpIcon className="h-5 w-5 text-white mx-auto relative" />
        </button>
      </div>

      <style>{`
        @keyframes footerBubbleFloat {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.65; transform: translateY(-10vh) scale(1); }
          100% { transform: translateY(-120vh) scale(0.45); opacity: 0; }
        }
      `}</style>
    </footer>
  );
}

/* Icons */
function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
      <path d="M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}
function PinIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function ArrowUpIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
  );
}
function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H7m10 0v10" />
    </svg>
  );
}