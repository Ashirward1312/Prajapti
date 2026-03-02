import { useEffect, useState, useCallback, useRef } from "react";
import logo from "../img/logo.png";

/* ──────────────────────────────────────────
   NAV LINKS DATA (outside component — no re-creation)
   ────────────────────────────────────────── */
const SERVICE_ITEMS = [
  {
    label: "RO Installation",
    href: "#installation",
    desc: "Professional same-day setup with live demo",
    icon: "M12 4v1m6 11h2m-6 0h.01M12 12h.01M4 16h2m10-6a4 4 0 11-8 0 4 4 0 018 0zM9 20h6",
  },
  {
    label: "RO Repair",
    href: "#repair",
    desc: "Quick diagnosis & expert repair service",
    icon: "M11.42 15.17l-5.3-5.3a2.12 2.12 0 113-3l5.3 5.3m1.06-1.06l2.83-2.83a2.12 2.12 0 113 3l-2.83 2.83M7.5 21l3-3m0 0l-3-3m3 3H3",
  },
  {
    label: "Filter Change",
    href: "#filter",
    desc: "Genuine filters for every purifier brand",
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  },
  {
    label: "AMC Plans",
    href: "#amc",
    desc: "Annual maintenance contracts with full coverage",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", children: SERVICE_ITEMS },
  { label: "Products", href: "#products" },
];

/* ──────────────────────────────────────────
   REUSABLE ICON COMPONENT
   ────────────────────────────────────────── */
const Icon = ({ d, className = "h-4 w-4", strokeWidth = 2 }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d={d}
    />
  </svg>
);

/* ──────────────────────────────────────────
   HEADER COMPONENT
   ────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [deskDrop, setDeskDrop] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownTimerRef = useRef(null);

  /* ── Scroll Detection ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Close Dropdown on Outside Click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDeskDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Close Dropdown on Escape ── */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setDeskDrop(false);
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* ── Desktop Dropdown Hover (with delay to prevent flicker) ── */
  const handleDropEnter = useCallback(() => {
    clearTimeout(dropdownTimerRef.current);
    setDeskDrop(true);
  }, []);

  const handleDropLeave = useCallback(() => {
    dropdownTimerRef.current = setTimeout(() => {
      setDeskDrop(false);
    }, 150);
  }, []);

  /* ── Close mobile menu helper ── */
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, []);

  /* ── Smooth scroll to section ── */
  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      closeMobile();
      setDeskDrop(false);

      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [closeMobile]
  );

  return (
    <>
      {/* ══════════════════════════════
         MAIN HEADER
         ══════════════════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/85 shadow-[0_4px_40px_-8px_rgba(0,0,0,.6)] backdrop-blur-2xl border-b border-white/[.05]"
            : "bg-transparent"
        }`}
      >
        {/* Top accent line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-8">
          {/* ════════ LOGO ════════ */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group relative z-10 flex items-center gap-2.5 select-none flex-shrink-0"
          >
            <div className="relative flex-shrink-0">
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-sky-500/10 backdrop-blur-sm transition-all duration-300 group-hover:border-sky-400/30 group-hover:shadow-sky-500/25 group-hover:scale-110">
                <img
                  src={logo}
                  alt="Prajapati Enterprises"
                  className="h-full w-full object-contain p-1"
                  loading="eager"
                />
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-sky-400/0 blur-md transition-all duration-500 group-hover:bg-sky-400/15" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[15px] sm:text-lg font-extrabold tracking-tight text-white transition-colors duration-300">
                Prajapati{" "}
                <span className="hidden sm:inline text-sky-400">
                  Enterprises
                </span>
                <span className="sm:hidden text-sky-400">E.</span>
              </span>
            </div>
          </a>

          {/* ════════ DESKTOP NAV ════════ */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="menubar"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) =>
              link.children ? (
                /* ── Services Dropdown ── */
                <li
                  key={link.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleDropEnter}
                  onMouseLeave={handleDropLeave}
                >
                  <button
                    type="button"
                    onClick={() => setDeskDrop((v) => !v)}
                    aria-expanded={deskDrop}
                    aria-haspopup="true"
                    className={`group flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 ${
                      deskDrop
                        ? "bg-white/[.06] text-white"
                        : "text-slate-300 hover:bg-white/[.04] hover:text-white"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`h-3 w-3 transition-all duration-300 ${
                        deskDrop
                          ? "rotate-180 text-sky-400"
                          : "text-slate-500 group-hover:text-slate-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Panel */}
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-2.5 transition-all duration-250 ${
                      deskDrop
                        ? "pointer-events-auto opacity-100 translate-y-0 visible"
                        : "pointer-events-none opacity-0 translate-y-2 invisible"
                    }`}
                    role="menu"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/[.07] bg-slate-950/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,.75)] backdrop-blur-2xl">
                      {/* Top highlight */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
                      <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-sky-500/8 blur-[50px]" />

                      <div className="p-2 space-y-0.5">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={(e) => {
                              handleNavClick(e, child.href);
                              setDeskDrop(false);
                            }}
                            className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[.06]"
                            role="menuitem"
                          >
                            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[.07] bg-white/[.03] text-sky-400 transition-all duration-200 group-hover/item:border-sky-400/25 group-hover/item:bg-sky-500/10 group-hover/item:shadow-lg group-hover/item:shadow-sky-500/10">
                              <Icon
                                d={child.icon}
                                className="h-[18px] w-[18px]"
                                strokeWidth={1.5}
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13px] font-semibold text-white transition-colors group-hover/item:text-sky-300">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-[11px] leading-snug text-slate-500 transition-colors group-hover/item:text-slate-400">
                                {child.desc}
                              </span>
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="border-t border-white/[.06] px-3 py-2.5">
                        <a
                          href="#services"
                          onClick={(e) => {
                            handleNavClick(e, "#services");
                            setDeskDrop(false);
                          }}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-medium text-slate-500 transition-all hover:bg-white/[.04] hover:text-sky-400"
                        >
                          View all services
                          <Icon d="M9 5l7 7-7 7" className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                /* ── Regular Link ── */
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group relative rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/[.04] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 block"
                  >
                    {link.label}
                    <span className="absolute bottom-0.5 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              )
            )}
          </ul>

          {/* ════════ RIGHT ACTIONS ════════ */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Desktop Phone */}
            <a
              href="tel:+919876543210"
              className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.03] px-3.5 py-2 text-[13px] font-medium text-slate-300 backdrop-blur transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[.07] hover:text-white"
            >
              <Icon
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                className="h-4 w-4 text-sky-400"
              />
              <span className="hidden xl:inline">+91 98765 43210</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Mobile Phone Icon */}
            <a
              href="tel:+919876543210"
              className="inline-flex lg:hidden items-center justify-center rounded-xl border border-white/[.08] bg-white/[.03] p-2.5 text-sky-400 hover:bg-white/[.06] transition-all duration-200"
              aria-label="Call us"
            >
              <Icon
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                className="h-4 w-4"
              />
            </a>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[.97]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              <Icon
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                className="relative h-4 w-4"
              />
              <span className="relative">Contact</span>
            </a>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative z-[101] flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.04] backdrop-blur transition-all hover:bg-white/[.1] active:scale-95 lg:hidden"
            >
              <div className="flex h-[18px] w-5 flex-col justify-between">
                <span
                  className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? "translate-y-[8px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${
                    mobileOpen ? "w-0 opacity-0" : "w-full"
                  }`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? "-translate-y-[8px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ══════════════════════════════
         MOBILE OVERLAY (backdrop)
         ══════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ══════════════════════════════
         MOBILE SIDE DRAWER
         ══════════════════════════════ */}
      <aside
        className={`fixed inset-y-0 right-0 z-[95] flex w-[85vw] max-w-[400px] flex-col border-l border-white/[.06] bg-slate-950/[.97] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-sky-500/[.06] blur-[80px]" />
        <div className="pointer-events-none absolute -right-10 bottom-32 h-36 w-36 rounded-full bg-cyan-400/[.06] blur-[60px]" />

        {/* ── Mobile Header ── */}
        <div className="flex items-center justify-between border-b border-white/[.06] px-5 py-4 flex-shrink-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-2.5"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-md shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-400/30">
              <img
                src={logo}
                alt="Prajapati Enterprises"
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            <span className="text-base font-bold text-white">
              Prajapati <span className="text-sky-400">E.</span>
            </span>
          </a>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] text-slate-400 hover:text-white hover:bg-white/[.08] transition-all active:scale-90"
          >
            <Icon d="M6 18L18 6M6 6l12 12" className="h-4 w-4" />
          </button>
        </div>

        {/* ── Mobile Navigation Links ── */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) =>
            link.children ? (
              /* ── Services Accordion ── */
              <div key={link.label}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 focus:outline-none ${
                    servicesOpen
                      ? "bg-white/[.05] text-white"
                      : "text-slate-300 hover:bg-white/[.04] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                        servicesOpen
                          ? "bg-sky-500/15 text-sky-400"
                          : "bg-white/[.05] text-slate-400"
                      }`}
                    >
                      <Icon
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        className="h-4 w-4"
                        strokeWidth={1.5}
                      />
                    </span>
                    {link.label}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-all duration-300 ${
                      servicesOpen
                        ? "rotate-180 text-sky-400"
                        : "text-slate-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    servicesOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 space-y-0.5 border-l border-white/[.06] pl-3 py-2">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={(e) => handleNavClick(e, child.href)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[.04] active:bg-white/[.06] group/item"
                      >
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[.06] bg-white/[.03] text-sky-400 transition-all duration-200 group-hover/item:border-sky-400/20 group-hover/item:bg-sky-500/10">
                          <Icon
                            d={child.icon}
                            className="h-4 w-4"
                            strokeWidth={1.5}
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-white transition-colors group-hover/item:text-sky-300">
                            {child.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">
                            {child.desc}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ── Regular Mobile Link ── */
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium text-slate-300 transition-all duration-200 hover:bg-white/[.04] hover:text-white active:bg-white/[.06]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[.05] text-slate-400 flex-shrink-0">
                  {link.label === "Home" && (
                    <Icon
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  )}
                  {link.label === "About" && (
                    <Icon
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  )}
                  {link.label === "Products" && (
                    <Icon
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  )}
                </span>
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* ── Mobile Bottom CTA ── */}
        <div className="space-y-2.5 border-t border-white/[.06] p-4 flex-shrink-0">
          <a
            href="tel:+919876543210"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[.08] bg-white/[.04] py-3 text-sm font-medium text-white transition-all hover:bg-white/[.08] active:scale-[.98]"
          >
            <Icon
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              className="h-4 w-4 text-sky-400"
            />
            Call: +91 98765 43210
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/30 active:scale-[.98]"
          >
            <Icon
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              className="h-4 w-4"
            />
            Contact Us
          </a>
        </div>
      </aside>
    </>
  );
}