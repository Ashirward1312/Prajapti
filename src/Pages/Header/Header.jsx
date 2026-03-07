// src/Pages/Header/Header.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../img/logo.png";

/* ──────────────────────────────────────────
   NAV LINKS DATA
   (Contact ko NAV me se hata diya — ab CTA button ke andar hai)
   type:
   - "section" => scroll on home page
   - "route"   => navigate to a route
   ────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "home", type: "section" },
  { label: "Services", href: "services", type: "route", to: "/services" },
  { label: "Why Us", href: "why", type: "section" },
  { label: "About", href: "about", type: "route", to: "/about" },
];

const PHONE = "+918871863773";
const PHONE_DISPLAY = "+91 88718 63773";
const WHATSAPP_URL =
  "https://wa.me/918871863773?text=Hi%20Prajapati%20Enterprise%2C%20I%20need%20RO%20service";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  // Light pages: make header white + dark text for contrast
  const isLightPage = location.pathname !== "/";
  const isContactPage = location.pathname === "/contact";

  /* ── Scroll Detection ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── When route changes, set active for route-pages ── */
  useEffect(() => {
    if (location.pathname === "/services") setActiveSection("services");
    else if (location.pathname === "/about") setActiveSection("about");
    else if (location.pathname === "/contact") setActiveSection("contact"); // CTA active styling ke kaam aayega
    else if (location.pathname !== "/") setActiveSection("home");
  }, [location.pathname]);

  /* ── Active Section Detection (ONLY on home "/") ── */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = NAV_LINKS.map((link) => link.href);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

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

  /* ── Lock Body on Mobile Menu ── */
  useEffect(() => {
    if (mobileOpen) {
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
  }, [mobileOpen]);

  /* ── Close Mobile on Resize to Desktop ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Close on Escape ── */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* ── Smooth scroll helper ── */
  const doScroll = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) {
      if (sectionId === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const headerHeight = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  /* ── Scroll to section (and if not on home, go home first) ── */
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

  /* ── Nav click handler (route vs section) ── */
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

  /* ── Get icon for nav link ── */
  const getNavIcon = (label) => {
    const icons = {
      Home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      Services:
        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      "Why Us":
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      About:
        "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      FAQ: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    };
    return icons[label] || "";
  };

  // Header background classes
  const headerShellClass = isLightPage
    ? "bg-white/85 shadow-[0_12px_45px_-30px_rgba(2,132,199,.25)] backdrop-blur-2xl border-b border-slate-200/70"
    : scrolled
      ? "bg-[#040A16]/90 shadow-[0_4px_40px_-8px_rgba(0,0,0,.6)] backdrop-blur-2xl border-b border-white/[.06]"
      : "bg-transparent";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${headerShellClass}`}
      >
        {/* Top accent line */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
            isLightPage ? "via-sky-300/70" : "via-sky-500/40"
          } to-transparent`}
        />

        <nav className="mx-auto flex h-[64px] sm:h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-8">
          {/* LOGO */}
          <button
            onClick={() => scrollToSection("home")}
            className="group relative z-10 flex items-center gap-2 sm:gap-2.5 select-none flex-shrink-0 cursor-pointer"
            aria-label="Go to Home"
          >
            <div className="relative flex-shrink-0">
              <div
                className={`relative h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 overflow-hidden rounded-lg sm:rounded-xl border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${
                  isLightPage
                    ? "border-slate-200 bg-white shadow-md"
                    : "border-white/10 bg-white/5 shadow-lg shadow-sky-500/10 group-hover:border-sky-300/35 group-hover:shadow-sky-400/25"
                }`}
              >
                <img
                  src={logo}
                  alt="Prajapati Enterprise"
                  className="h-full w-full object-contain p-0.5 sm:p-1"
                  loading="eager"
                />
              </div>
              <div
                className={`pointer-events-none absolute -inset-1 rounded-xl blur-md transition-all duration-500 ${
                  isLightPage
                    ? "bg-sky-300/0 group-hover:bg-sky-300/25"
                    : "bg-sky-300/0 group-hover:bg-sky-300/18"
                }`}
              />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className={`text-sm sm:text-[15px] lg:text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                  isLightPage ? "text-slate-900" : "text-white"
                }`}
              >
                Prajapati{" "}
                <span
                  className={`${
                    isLightPage ? "text-sky-600" : "text-sky-400"
                  } hidden sm:inline`}
                >
                  Enterprise
                </span>
                <span
                  className={`${
                    isLightPage ? "text-sky-600" : "text-sky-400"
                  } sm:hidden`}
                >
                  E.
                </span>
              </span>
              <span className="hidden lg:block text-[9px] font-medium text-slate-500 tracking-[1.5px] uppercase mt-0.5">
                RO Water Purifier
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
                  className={`group relative rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40
                    ${
                      isLightPage
                        ? activeSection === link.href
                          ? "text-sky-700 bg-sky-50 border border-sky-200 shadow-[0_10px_30px_-22px_rgba(56,189,248,.35)]"
                          : "text-slate-600 border border-transparent hover:text-sky-700 hover:bg-sky-50 hover:border-sky-200/80"
                        : activeSection === link.href
                          ? "text-white bg-sky-500/12 border border-sky-400/20 shadow-[0_10px_30px_-20px_rgba(56,189,248,.45)]"
                          : "text-slate-300 border border-transparent hover:text-sky-100 hover:bg-sky-500/10 hover:border-sky-400/20 hover:shadow-[0_10px_30px_-22px_rgba(56,189,248,.35)]"
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full
                      bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-300
                      transition-all duration-300 origin-left
                      ${
                        activeSection === link.href
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-80"
                      }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Desktop Phone */}
            <a
              href={`tel:${PHONE}`}
              className={`hidden lg:inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[13px] font-medium backdrop-blur transition-all duration-300 ${
                isLightPage
                  ? "border-slate-200 bg-white/60 text-slate-700 hover:bg-sky-50 hover:border-sky-200"
                  : "border-white/[.07] bg-white/[.03] text-slate-300 hover:border-sky-400/20 hover:bg-sky-500/10 hover:text-sky-100"
              }`}
            >
              <svg
                className={`h-4 w-4 transition-colors ${
                  isLightPage ? "text-sky-600" : "text-sky-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ animation: "headerRing 2s ease-in-out infinite" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
              <span className="xl:hidden">Call Us</span>
            </a>

            {/* Mobile Phone Icon */}
            <a
              href={`tel:${PHONE}`}
              className={`inline-flex lg:hidden items-center justify-center rounded-lg sm:rounded-xl border p-2 sm:p-2.5 transition-all duration-200 active:scale-95 ${
                isLightPage
                  ? "border-slate-200 bg-white/70 text-sky-600 hover:bg-sky-50 hover:border-sky-200"
                  : "border-white/[.08] bg-white/[.03] text-sky-400 hover:bg-sky-500/10 hover:border-sky-400/20"
              }`}
              aria-label="Call us"
            >
              <svg
                className="h-4 w-4"
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

            {/* WhatsApp (mobile/tablet) */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex lg:hidden items-center justify-center rounded-lg sm:rounded-xl border border-emerald-400/15 bg-emerald-500/[.06] p-2 sm:p-2.5 text-emerald-500 hover:bg-emerald-500/[.10] transition-all duration-200 active:scale-95"
              aria-label="WhatsApp"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </a>

            {/* CTA Button - Desktop (CONTACT PAGE) */}
            <button
              onClick={() => navigate("/contact")}
              className={`group relative hidden lg:inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 active:scale-[.97] cursor-pointer
                ${
                  isContactPage
                    ? "bg-gradient-to-r from-sky-700 to-cyan-600 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/30"
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.03]"
                }`}
              aria-label="Let's Connect"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              <span className="relative">Let&apos;s Connect</span>
            </button>

            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`relative z-[101] flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border backdrop-blur transition-all active:scale-95 lg:hidden cursor-pointer ${
                isLightPage
                  ? "border-slate-200 bg-white/75 hover:bg-sky-50 hover:border-sky-200"
                  : "border-white/[.08] bg-white/[.04] hover:bg-sky-500/10 hover:border-sky-400/20"
              }`}
            >
              <div className="flex h-[16px] sm:h-[18px] w-[18px] sm:w-5 flex-col justify-between">
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    isLightPage ? "bg-slate-900" : "bg-white"
                  } ${mobileOpen ? "translate-y-[7px] sm:translate-y-[8px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    isLightPage ? "bg-slate-900" : "bg-white"
                  } ${mobileOpen ? "w-0 opacity-0" : "w-full"}`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    isLightPage ? "bg-slate-900" : "bg-white"
                  } ${mobileOpen ? "-translate-y-[7px] sm:-translate-y-[8px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER (dark) */}
      <aside
        className={`fixed inset-y-0 right-0 z-[95] flex w-[80vw] max-w-[360px] flex-col border-l border-white/[.06] bg-[#040A16]/[.98] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-white/[.06] px-4 sm:px-5 py-3.5 sm:py-4 flex-shrink-0">
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-2 cursor-pointer"
            aria-label="Go to Home"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-md shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-300/35">
              <img
                src={logo}
                alt="Prajapati Enterprise"
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-white">
              Prajapati <span className="text-sky-400">Enterprise</span>
            </span>
          </button>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] text-slate-400 hover:text-sky-100 hover:bg-sky-500/10 hover:border-sky-400/20 transition-all active:scale-90 cursor-pointer"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-3 sm:py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-[15px] font-medium transition-all duration-200 cursor-pointer focus:outline-none
                ${
                  activeSection === link.href
                    ? "bg-sky-500/12 text-white border border-sky-400/20 shadow-[0_12px_34px_-24px_rgba(56,189,248,.45)]"
                    : "text-slate-300 border border-transparent hover:bg-sky-500/10 hover:border-sky-400/15 hover:text-sky-100"
                }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300
                  ${
                    activeSection === link.href
                      ? "bg-sky-500/18 text-sky-300"
                      : "bg-white/[.05] text-slate-400"
                  }`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={getNavIcon(link.label)}
                  />
                </svg>
              </span>

              {link.label}

              {activeSection === link.href && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.55)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile bottom */}
        <div className="space-y-2 sm:space-y-2.5 border-t border-white/[.06] p-3 sm:p-4 flex-shrink-0">
          <a
            href={`tel:${PHONE}`}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[.08] bg-white/[.04] py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-all hover:bg-sky-500/10 hover:border-sky-400/20 active:scale-[.98]"
          >
            <svg
              className="h-4 w-4 text-sky-400"
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
            {PHONE_DISPLAY}
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-500/[.06] py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-500/[.10] active:scale-[.98]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            WhatsApp Us
          </a>

          {/* Mobile CTA -> /contact */}
          <button
            onClick={() => {
              closeMobile();
              navigate("/contact");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/35 active:scale-[.98] cursor-pointer"
          >
            Let&apos;s Connect
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes headerRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(5deg); }
          40% { transform: rotate(0deg); }
        }
      `}</style>
    </>
  );
}