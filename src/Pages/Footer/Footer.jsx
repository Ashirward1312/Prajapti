// src/components/Footer.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../img/logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ArrowUp,
  Star,
  Droplets,
  Shield,
  Wrench,
} from "lucide-react";

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP = "918871863773";
const EMAIL = "info@prajapatienterprises.com";
const ADDRESS =
  "Opposite Honda Showroom, Urla Road, Ward 36, Shahid Nagar, Birgaon, Raipur, Chhattisgarh — 493221";
const MAP_URL = "https://maps.google.com/?q=21.306077,81.624294";

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Choose Us", href: "#why-choose-us" },
  { name: "Contact", href: "#contact" },
  { name: "Book Service", href: `tel:${PHONE}` },
];

const services = [
  { name: "RO Installation", href: "#services" },
  { name: "RO Repair", href: "#services" },
  { name: "AMC Plans", href: "#services" },
  { name: "Filter Replacement", href: "#services" },
  { name: "Commercial RO", href: "#services" },
  { name: "Uninstall & Shifting", href: "#services" },
];

const brands = [
  "Kent",
  "Aquaguard",
  "Livpure",
  "Pureit",
  "Nasaka",
  "Eureka Forbes",
  "Blue Star",
  "AO Smith",
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-950 overflow-hidden"
    >
      {/* ─── bg decorations ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* glow orbs */}
        <div className="absolute -top-40 left-[10%] w-[500px] h-[500px] bg-sky-500/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-cyan-400/[0.03] rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-sky-400/[0.03] rounded-full blur-[100px]" />
        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* ═══════ TOP CTA BANNER ═══════ */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 -mt-1">
          <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* banner bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-300/15 rounded-full blur-[50px]" />

            <div className="relative z-10 py-10 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-white/20">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Available 7 Days
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                  Need RO Service?{" "}
                  <span className="text-cyan-200">Call Now!</span>
                </h3>
                <p className="text-sky-100 text-sm mt-1 max-w-md">
                  Expert doorstep RO service in Raipur — same day visit
                  guaranteed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden bg-white text-sky-600 font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-sky-900/20 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <span className="pointer-events-none absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-sky-100/60 to-transparent transition-transform duration-1000 group-hover:translate-x-[200%]" />
                  <Phone
                    size={16}
                    className="relative group-hover:animate-bounce"
                  />
                  <span className="relative">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-white/30 text-white font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/50 hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN FOOTER ═══════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* ── col 1: brand ── */}
          <div className="lg:col-span-4">
            {/* logo + name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-sky-400/20 bg-white/5 backdrop-blur-sm p-1 flex items-center justify-center shadow-lg shadow-sky-500/10">
                <img
                  src={logo}
                  alt="Prajapati Enterprise"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  Prajapati Enterprise
                </h3>
                <p className="text-sky-400 text-[11px] font-semibold tracking-wide">
                  RO Water Purifier Experts
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-sm">
              Your trusted partner for RO water purifier installation, repair,
              and maintenance in Raipur. Providing clean, safe &amp; pure
              drinking water since 2009.
            </p>

            {/* rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                4.9/5 (500+ reviews)
              </span>
            </div>

            {/* social links */}
            <div className="flex gap-3">
              {[
                {
                  label: "Facebook",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "#",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: `https://wa.me/${WHATSAPP}`,
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/30 hover:bg-sky-500/10 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── col 2: quick links ── */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-cyan-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 text-sm hover:text-sky-400 transition-colors duration-300"
                  >
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all duration-300"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── col 3: services ── */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-cyan-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.href}
                    className="group flex items-center gap-2 text-slate-400 text-sm hover:text-sky-400 transition-colors duration-300"
                  >
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all duration-300"
                    />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── col 4: contact ── */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-sky-400 to-cyan-400" />
              Contact Info
            </h4>

            <div className="space-y-4">
              {/* phone */}
              <a
                href={`tel:${PHONE}`}
                className="group flex items-start gap-3 hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-xl border border-sky-400/15 bg-sky-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-sky-400/30 group-hover:bg-sky-500/20 transition-all duration-300">
                  <Phone size={14} className="text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Phone
                  </div>
                  <div className="text-sm font-semibold text-slate-300 group-hover:text-sky-400 transition-colors">
                    {PHONE_DISPLAY}
                  </div>
                </div>
              </a>

              {/* email */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-start gap-3 hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-xl border border-sky-400/15 bg-sky-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-sky-400/30 group-hover:bg-sky-500/20 transition-all duration-300">
                  <Mail size={14} className="text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Email
                  </div>
                  <div className="text-sm font-semibold text-slate-300 group-hover:text-sky-400 transition-colors break-all">
                    {EMAIL}
                  </div>
                </div>
              </a>

              {/* address */}
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-xl border border-sky-400/15 bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-sky-400/30 group-hover:bg-sky-500/20 transition-all duration-300">
                  <MapPin size={14} className="text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Address
                  </div>
                  <div className="text-sm text-slate-300 leading-relaxed group-hover:text-sky-400 transition-colors">
                    {ADDRESS}
                  </div>
                </div>
              </a>

              {/* timing */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl border border-sky-400/15 bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Working Hours
                  </div>
                  <div className="text-sm font-semibold text-slate-300">
                    Mon – Sun: 9 AM – 8 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── brands strip ─── */}
        <div
          className={`mt-14 pt-8 border-t border-white/5 transition-all duration-1000 delay-400 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[3px] flex items-center gap-2">
              <Wrench size={12} className="text-sky-400" />
              Brands We Service
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {brands.map((brand, i) => (
                <span
                  key={i}
                  className="border border-white/[0.06] bg-white/[0.02] rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-sky-400 hover:border-sky-400/20 hover:bg-sky-500/5 transition-all duration-300 cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── trust badges ─── */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {[
            {
              icon: <Shield size={16} />,
              text: "Verified Business",
            },
            {
              icon: <Droplets size={16} />,
              text: "Pure Water Guaranteed",
            },
            {
              icon: <Clock size={16} />,
              text: "Same Day Service",
            },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-slate-500 text-xs font-semibold"
            >
              <span className="text-sky-400">{badge.icon}</span>
              {badge.text}
              {i < 2 && (
                <span className="hidden md:inline-block ml-4 w-1 h-1 rounded-full bg-slate-700" />
              )}
            </div>
          ))}
        </div>

        {/* ─── bottom bar ─── */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center md:text-left">
              © {year}{" "}
              <span className="font-semibold text-slate-400">
                Prajapati Enterprise
              </span>
              . All rights reserved. RO Water Purifier Service in Raipur.
            </p>

            <div className="flex items-center gap-1 text-slate-600 text-xs">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>in Raipur</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ SCROLL TO TOP ═══════ */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl
          bg-gradient-to-br from-sky-500 to-cyan-500
          text-white shadow-lg shadow-sky-500/30
          flex items-center justify-center
          hover:shadow-xl hover:shadow-sky-500/40 hover:scale-110
          active:scale-95
          transition-all duration-500
          ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
      >
        <ArrowUp size={20} />
      </button>

      {/* ─── animations ─── */}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.6; transform: translateY(-10vh) scale(1); }
          100% { transform: translateY(-110vh) scale(0.4); opacity: 0; }
        }
      `}</style>
    </footer>
  );
}