// src/Pages/Header/Header.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../img/logo.png";

const NAV_LINKS = [
  { label: "Home", href: "home", type: "section" },
  { label: "Services", href: "services", type: "route", to: "/services" },
  // { label: "Why Us", href: "why", type: "section" },
  { label: "About", href: "about", type: "route", to: "/about" },
  { label: "Product", href: "product", type: "route", to: "/product" },
];

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP_URL =
  "https://wa.me/918871863773?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service";

// ✅ Only these pages should use LIGHT (white) header
const LIGHT_HEADER_ROUTES = new Set(["/services", "/about", "/contact"]);
// ✅ "/" and "/product" will now use DARK/TRANSPARENT header (hero jaisa mix)

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  // ✅ CHANGE HERE
  const isLightPage = LIGHT_HEADER_ROUTES.has(location.pathname);
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/services") setActiveSection("services");
    else if (location.pathname === "/about") setActiveSection("about");
    else if (location.pathname === "/contact") setActiveSection("contact");
    else if (location.pathname === "/product") setActiveSection("product");
    else if (location.pathname !== "/") setActiveSection("home");
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = NAV_LINKS.map((link) => link.href);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen || logoModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen, logoModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setLogoModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const doScroll = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) {
      if (sectionId === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const headerHeight = 94;
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback(
    (sectionId) => {
      closeMobile();
      if (location.pathname !== "/") {
        navigate("/");
        let tries = 0;
        const t = setInterval(() => {
          tries += 1;
          const el = document.getElementById(sectionId);
          if (el || tries > 24) {
            clearInterval(t);
            doScroll(sectionId);
          }
        }, 50);
        return;
      }
      doScroll(sectionId);
    },
    [closeMobile, location.pathname, navigate, doScroll]
  );

  const handleNavClick = useCallback(
    (link) => {
      if (link.type === "route") {
        closeMobile();
        navigate(link.to);
        return;
      }
      scrollToSection(link.href);
    },
    [closeMobile, navigate, scrollToSection]
  );

  const getNavIcon = (label) => {
    const icons = {
      Home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      Services:
        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      "Why Us":
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      About:
        "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      Product:
        "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    };
    return icons[label] || "";
  };

  const headerShellClass = isLightPage
    ? "bg-white/92 shadow-xl shadow-slate-200/60 backdrop-blur-2xl border-b border-slate-100"
    : scrolled
      ? "bg-[#020617]/88 shadow-2xl shadow-black/30 backdrop-blur-2xl border-b border-white/[.04]"
      : "bg-transparent";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${headerShellClass}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-70" />

        <nav className="mx-auto flex h-[74px] sm:h-[82px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[92px] lg:px-8">
          {/* LOGO */}
          <button
            onClick={() => setLogoModalOpen(true)}
            className="group relative z-10 flex items-center gap-3 sm:gap-3.5 select-none flex-shrink-0 cursor-pointer focus:outline-none"
            aria-label="View Prajapati Enterprise Logo"
            title="Click to view logo"
          >
            <div className="relative flex-shrink-0">
              <div
                className={`relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 overflow-hidden rounded-2xl border-2 transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
                  isLightPage
                    ? "border-sky-200 bg-white shadow-lg shadow-sky-100/50 group-hover:border-sky-400 group-hover:shadow-sky-200/70"
                    : "border-sky-500/20 bg-sky-950/50 shadow-lg shadow-sky-500/10 group-hover:border-sky-400/50 group-hover:shadow-sky-400/25"
                }`}
              >
                <img
                  src={logo}
                  alt="PRAJAPATI ENTERPRISE"
                  className="h-full w-full object-contain p-1.5"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div
                className={`pointer-events-none absolute -inset-2 rounded-[22px] transition-all duration-500 ${
                  isLightPage
                    ? "bg-sky-400/0 group-hover:bg-sky-400/15 blur-md"
                    : "bg-sky-400/0 group-hover:bg-sky-400/10 blur-lg"
                }`}
              />

              <div
                className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  isLightPage
                    ? "border-white bg-sky-500 shadow-sm group-hover:scale-125"
                    : "border-slate-900 bg-sky-400 shadow-sm shadow-sky-400/50 group-hover:scale-125"
                }`}
              />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className={`text-[15px] sm:text-[18px] lg:text-[21px] font-black tracking-tight uppercase transition-colors duration-300 ${
                  isLightPage ? "text-slate-800" : "text-white"
                }`}
              >
                PRAJAPATI{" "}
                <span
                  className={`${
                    isLightPage ? "text-sky-600" : "text-sky-400"
                  } hidden sm:inline`}
                >
                  ENTERPRISE
                </span>
                <span
                  className={`${
                    isLightPage ? "text-sky-600" : "text-sky-400"
                  } sm:hidden`}
                >
                  E.
                </span>
              </span>

              <span
                className={`hidden sm:block text-[10px] lg:text-[11px] font-semibold tracking-[1px] uppercase mt-1 transition-colors duration-300 ${
                  isLightPage ? "text-slate-500" : "text-slate-400"
                }`}
              >
                शुद्ध से ज़्यादा सेहतमंद
              </span>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="menubar"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link)}
                  className={`group relative rounded-xl px-4 py-2.5 text-[14px] xl:text-[15px] font-semibold transition-all duration-200 cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50
                    ${
                      isLightPage
                        ? activeSection === link.href
                          ? "text-sky-700 bg-sky-50/90"
                          : "text-slate-600 hover:text-sky-700 hover:bg-sky-50/70"
                        : activeSection === link.href
                          ? "text-sky-300 bg-sky-500/10"
                          : "text-slate-300 hover:text-sky-300 hover:bg-sky-500/8"
                    }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                      isLightPage ? "bg-sky-500" : "bg-sky-400"
                    } ${
                      activeSection === link.href
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-50"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Desktop Phone */}
            <a
              href={`tel:${PHONE}`}
              className={`hidden lg:inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                isLightPage
                  ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700"
                  : "border-white/[.06] bg-white/[.03] text-slate-300 hover:border-sky-500/20 hover:bg-sky-500/8 hover:text-sky-300"
              }`}
            >
              <svg
                className={`h-4 w-4 ${
                  isLightPage ? "text-sky-600" : "text-sky-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ animation: "headerRing 2.5s ease-in-out infinite" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Mobile Phone */}
            <a
              href={`tel:${PHONE}`}
              className={`inline-flex lg:hidden items-center justify-center rounded-xl border p-2.5 sm:p-3 transition-all duration-200 active:scale-95 ${
                isLightPage
                  ? "border-slate-200 bg-slate-50 text-sky-600 hover:bg-sky-50 hover:border-sky-200"
                  : "border-white/[.06] bg-white/[.03] text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/20"
              }`}
              aria-label="Call us"
            >
              <svg
                className="h-4.5 w-4.5"
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
            </a>

            {/* Tablet WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex lg:hidden items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/8 p-2.5 sm:p-3 text-emerald-500 hover:bg-emerald-500/15 transition-all duration-200 active:scale-95"
              aria-label="WhatsApp"
            >
              <svg
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </a>

            {/* CTA Desktop */}
            <button
              onClick={() => navigate("/contact")}
              className={`group relative hidden lg:inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-[14px] font-bold text-white transition-all duration-300 active:scale-[.97] cursor-pointer
                ${
                  isContactPage
                    ? "bg-gradient-to-r from-sky-700 to-cyan-600 shadow-lg shadow-sky-600/25 ring-1 ring-sky-400/30"
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.02]"
                }`}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              <span className="relative">Let&apos;s Connect</span>
            </button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`relative z-[101] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border transition-all active:scale-95 lg:hidden cursor-pointer ${
                isLightPage
                  ? "border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200"
                  : "border-white/[.06] bg-white/[.03] hover:bg-sky-500/10 hover:border-sky-500/20"
              }`}
            >
              <div className="flex h-[16px] w-[18px] flex-col justify-between">
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    isLightPage ? "bg-slate-800" : "bg-white"
                  } ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isLightPage ? "bg-slate-800" : "bg-white"
                  } ${mobileOpen ? "w-0 opacity-0" : "w-full"}`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    isLightPage ? "bg-slate-800" : "bg-white"
                  } ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* LOGO MODAL */}
      {logoModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setLogoModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fadeIn" />

          <div
            className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLogoModalOpen(false)}
              className="absolute -top-2 right-0 sm:-right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white transition-all duration-300 active:scale-90 cursor-pointer backdrop-blur-sm"
              aria-label="Close logo preview"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative">
              <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-sky-500/10 animate-pulse" />
              <div className="absolute -inset-12 sm:-inset-16 rounded-full border border-sky-500/5" />

              <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 overflow-hidden rounded-3xl sm:rounded-[2rem] border-2 border-white/10 bg-white shadow-2xl shadow-sky-500/20">
                <img
                  src={logo}
                  alt="PRAJAPATI ENTERPRISE"
                  className="h-full w-full object-contain p-6 sm:p-8"
                />
              </div>

              <div className="pointer-events-none absolute -inset-8 rounded-full bg-sky-500/8 blur-3xl" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-[3px] sm:tracking-[5px]">
                PRAJAPATI <span className="text-sky-400">ENTERPRISE</span>
              </h2>

              <div className="mx-auto mt-3 sm:mt-4 h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-sky-300/90 tracking-wide">
                💧 शुद्ध से ज़्यादा सेहतमंद
              </p>

              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Bringing pure, mineral-rich &amp; healthy RO water to every Indian home.
                <br />
                Trusted by thousands of families.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
              <button
                onClick={() => {
                  setLogoModalOpen(false);
                  scrollToSection("home");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[.97] cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Home
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setLogoModalOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-2.5 text-sm font-bold text-emerald-400 hover:bg-emerald-500/15 transition-all duration-300 active:scale-[.97]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            <p className="text-[11px] text-slate-500 mt-2">Tap anywhere outside to close</p>
          </div>
        </div>
      )}

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed inset-y-0 right-0 z-[160] flex w-[84vw] max-w-[390px] flex-col border-l border-white/[.04] bg-[#020617]/[.98] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/[.05] px-4 sm:px-5 py-4 flex-shrink-0">
          <button
            onClick={() => {
              closeMobile();
              setLogoModalOpen(true);
            }}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label="View Logo"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-sky-500/20 bg-sky-950/50 shadow-lg shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-400/40">
              <img src={logo} alt="PRAJAPATI ENTERPRISE" className="h-full w-full object-contain p-0.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-black text-white uppercase tracking-wide">
                PRAJAPATI <span className="text-sky-400">ENTERPRISE</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-[0.8px]">
                Tap logo to preview
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.06] bg-white/[.03] text-slate-400 hover:text-white hover:bg-white/[.06] transition-all active:scale-90 cursor-pointer"
          >
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-3 bg-sky-950/30 border-b border-sky-500/8">
          <p className="text-[11px] font-bold text-sky-400 tracking-[1px] uppercase text-center">
            💧 शुद्ध से ज़्यादा सेहतमंद
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-4 space-y-1.5">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 sm:px-4 py-3.5 text-[15px] font-medium transition-all duration-200 cursor-pointer focus:outline-none ${
                activeSection === link.href
                  ? "bg-sky-500/10 text-sky-300 border border-sky-500/15"
                  : "text-slate-300 border border-transparent hover:bg-white/[.03] hover:text-white hover:border-white/[.04]"
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 transition-all ${
                  activeSection === link.href
                    ? "bg-sky-500/15 text-sky-400"
                    : "bg-white/[.04] text-slate-500"
                }`}
              >
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getNavIcon(link.label)} />
                </svg>
              </span>

              {link.label}

              {activeSection === link.href && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="space-y-2.5 border-t border-white/[.05] p-3 sm:p-4 flex-shrink-0">
          <a
            href={`tel:${PHONE}`}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[.06] bg-white/[.03] py-3 text-sm font-medium text-white transition-all hover:bg-sky-500/8 hover:border-sky-500/15 active:scale-[.98]"
          >
            <svg className="h-4.5 w-4.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE_DISPLAY}
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/12 bg-emerald-500/[.06] py-3 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/[.10] active:scale-[.98]"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            WhatsApp Us
          </a>

          <button
            onClick={() => {
              closeMobile();
              navigate("/contact");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 active:scale-[.98] cursor-pointer"
          >
            Let&apos;s Connect
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes headerRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(5deg); }
          40% { transform: rotate(0deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}