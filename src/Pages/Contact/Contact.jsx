// src/components/LetsConnect.jsx
import { useMemo, useState } from "react";

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP_NUMBER = "918871863773";

const LOCATION = {
  title: "Prajapati Enterprise (Raipur)",
  address:
    "Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar, Birgaon, Raipur, Chhattisgarh — 493221",
  mapUrl: "https://maps.google.com/?q=21.306077,81.624294",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14868.499956298232!2d81.624294!3d21.306077!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDE4JzIxLjkiTiA4McKwMzcnMjcuNSJF!5e0!3m2!1sen!2sus!4v1771676244237!5m2!1sen!2sus",
};

/* ──────────────────────────────────────────
   BUBBLES (Desktop only for smoothness)
   ────────────────────────────────────────── */
function Bubbles({ enabled = true }) {
  const bubbles = useMemo(() => {
    const colors = [
      "rgba(56,189,248,0.18)", // sky
      "rgba(34,211,238,0.14)", // cyan
      "rgba(148,163,184,0.10)", // slate
    ];

    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      size: Math.random() * 16 + 6,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      dur: Math.random() * 10 + 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      border: "rgba(56,189,248,0.10)",
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
            bottom: "-6%",
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, rgba(56,189,248,0.01))`,
            border: `1px solid ${b.border}`,
            animation: `bubbleFloat ${b.dur}s ease-in infinite ${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LetsConnect() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    message: "",
  });

  const waLink = useMemo(() => {
    const lines = [
      "Hi Prajapati Enterprise, I need RO service.",
      form.name ? `Name: ${form.name}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.area ? `Area: ${form.area}` : null,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#071A2F] to-[#0B2B44] text-white">
      {/* spacing for fixed header */}
      <div className="pt-[78px] sm:pt-[86px] lg:pt-[96px]" />

      {/* background layers */}
      <Bubbles enabled />

      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-10 -right-40 h-[540px] w-[540px] rounded-full bg-cyan-400/10 blur-[150px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-18 lg:pb-20">
        {/* HERO */}
        <section className="pt-8 sm:pt-10 lg:pt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[2px] uppercase text-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,.45)]" />
            Let&apos;s Connect
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Quick RO Service Booking in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Raipur
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Call or WhatsApp — share your RO brand, issue and location. We’ll
            respond fast.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-white font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] px-6 py-3.5 text-emerald-200 font-semibold hover:bg-emerald-500/[0.12] hover:border-emerald-400/30 active:scale-[0.98] transition-all"
            >
              <WhatsAppIcon className="h-5 w-5 text-emerald-300" />
              WhatsApp Now
            </a>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7">
          {/* LEFT: Contact cards + map */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard>
              <div className="flex items-start gap-3">
                <IconBox tone="sky">
                  <PhoneIcon className="h-5 w-5" />
                </IconBox>
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-white">
                    Call Us
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Quick booking & support
                  </div>

                  <a
                    href={`tel:${PHONE}`}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 px-4 py-3 text-sm font-semibold text-sky-200 transition"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-start gap-3">
                <IconBox tone="emerald">
                  <WhatsAppIcon className="h-5 w-5" />
                </IconBox>
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-white">
                    WhatsApp
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Share brand, issue & area
                  </div>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500/[0.10] hover:bg-emerald-500/[0.14] border border-emerald-400/20 px-4 py-3 text-sm font-semibold text-emerald-200 transition"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </GlassCard>

            {/* Location + Map (kept, baaki extra blocks hata diye) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-white/10">
                <div className="flex items-start gap-3">
                  <IconBox tone="sky">
                    <PinIcon className="h-5 w-5" />
                  </IconBox>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-white">
                      {LOCATION.title}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {LOCATION.address}
                    </div>

                    <a
                      href={LOCATION.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center w-full rounded-xl border border-sky-400/20 bg-sky-500/10 hover:bg-sky-500/14 px-4 py-3 text-sm font-semibold text-sky-200 transition"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative h-[220px] sm:h-[250px]">
                <iframe
                  src={LOCATION.embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prajapati Enterprise Location"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_90px_-70px_rgba(56,189,248,.55)]">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Send a Message
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Submit karte hi WhatsApp open hoga with your details.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldDark
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Enter your name"
                  />
                  <FieldDark
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Enter phone"
                    required
                  />
                </div>

                <FieldDark
                  label="Area / Locality"
                  name="area"
                  value={form.area}
                  onChange={onChange}
                  placeholder="e.g. Shankar Nagar, Pandri..."
                />

                <div>
                  <label className="block text-xs font-bold tracking-wide text-slate-200 mb-2">
                    Problem / Requirement
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="e.g. Low flow, bad taste, leakage, filter change..."
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-sky-500/15 focus:border-sky-400/40 transition resize-none"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-white font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <SendIcon className="h-5 w-5" />
                    Send on WhatsApp
                  </button>

                  <a
                    href={`tel:${PHONE}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.10] px-6 py-3.5 text-slate-100 font-semibold transition active:scale-[0.98]"
                  >
                    <PhoneIcon className="h-5 w-5 text-sky-300" />
                    Call Instead
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  Details are used only for service booking.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.65; transform: translateY(-10vh) scale(1); }
          100% { transform: translateY(-120vh) scale(0.45); opacity: 0; }
        }
      `}</style>
    </main>
  );
}

/* ──────────────────────────────────────────
   Small UI helpers
   ────────────────────────────────────────── */
function GlassCard({ children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-6 shadow-[0_22px_70px_-60px_rgba(15,23,42,.8)]">
      {children}
    </div>
  );
}

function IconBox({ children, tone = "sky" }) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
      : "bg-sky-500/10 border-sky-400/20 text-sky-200";

  return (
    <div
      className={`h-10 w-10 rounded-2xl border flex items-center justify-center flex-shrink-0 ${cls}`}
    >
      {children}
    </div>
  );
}

function FieldDark({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-wide text-slate-200 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-sky-500/15 focus:border-sky-400/40 transition"
      />
    </div>
  );
}

/* ──────────────────────────────────────────
   Icons (no extra library)
   ────────────────────────────────────────── */
function PhoneIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
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
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
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
  );
}

function SendIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 2l-7 20-4-9-9-4 20-7z"
      />
    </svg>
  );
}