// src/components/Header.jsx
import { useEffect, useState, useCallback } from "react";
import logo from "../img/logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [deskDrop, setDeskDrop] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    {
      label: "Services",
      href: "#services",
      children: [
        {
          label: "RO Installation",
          href: "#installation",
          desc: "Same-day setup with demo",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v1m6 11h2m-6 0h.01M12 12h.01M4 16h2m10-6a4 4 0 11-8 0 4 4 0 018 0zM9 20h6"
            />
          ),
        },
        {
          label: "RO Repair",
          href: "#repair",
          desc: "Quick diagnosis & fix",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.7 6.3a4 4 0 00-5.66 5.66L3 18v3h3l6.04-6.04a4 4 0 005.66-5.66l-2.1 2.1-2.83-2.83 1.93-2.27Z"
            />
          ),
        },
        {
          label: "Filter Change",
          href: "#filter",
          desc: "Genuine filters for all brands",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          ),
        },
        {
          label: "AMC Plans",
          href: "#amc",
          desc: "Annual maintenance contracts",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          ),
        },
      ],
    },
    { label: "Products", href: "#products" },
  ];

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "bg-slate-950/85 shadow-[0_4px_40px_-8px_rgba(0,0,0,.6)] backdrop-blur-2xl border-b border-white/[.05]"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

        <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-6 px-5 lg:h-[76px]">
          {/* ══════════ LOGO ══════════ */}
          <a
            href="#"
            className="group relative z-10 flex items-center gap-3 select-none"
          >
            {/* Logo Image */}
            <div className="relative flex-shrink-0">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-sky-500/10 backdrop-blur-sm transition-all duration-300 group-hover:border-sky-400/30 group-hover:shadow-sky-500/25 group-hover:scale-110">
                <img
                  src={logo}
                  alt="AquaPure Logo"
                  className="h-full w-full object-contain p-1"
                />
              </div>
              {/* Glow behind logo on hover */}
              <div className="pointer-events-none absolute -inset-1 rounded-xl bg-sky-400/0 blur-md transition-all duration-500 group-hover:bg-sky-400/15" />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-300 sm:text-[20px]">
                Prajapati <span className="text-sky-400">Enterprises</span>
              </span>
              
            </div>
          </a>

          {/* ══════════ DESKTOP NAV ══════════ */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) =>
              l.children ? (
                <li
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setDeskDrop(true)}
                  onMouseLeave={() => setDeskDrop(false)}
                >
                  <button
                    type="button"
                    className="group flex items-center gap-1 rounded-xl px-4 py-2 text-[14px] font-medium text-slate-300 transition-all duration-300 hover:bg-white/[.06] hover:text-white"
                  >
                    {l.label}
                    <svg
                      className={[
                        "ml-0.5 h-3 w-3 text-slate-500 transition-transform duration-300",
                        deskDrop ? "rotate-180 text-sky-400" : "",
                      ].join(" ")}
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
                    <span className="absolute bottom-0.5 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </button>

                  {/* dropdown */}
                  <div
                    className={[
                      "absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3 transition-all duration-300",
                      deskDrop
                        ? "pointer-events-auto opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 translate-y-3",
                    ].join(" ")}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/[.07] bg-slate-950/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,.75)] backdrop-blur-2xl">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
                      <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-sky-500/10 blur-[50px]" />

                      <div className="p-2 space-y-0.5">
                        {l.children.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            className="group/i flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[.06]"
                          >
                            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[.07] bg-white/[.03] text-sky-400 transition-all duration-200 group-hover/i:border-sky-400/25 group-hover/i:bg-sky-500/10 group-hover/i:shadow-lg group-hover/i:shadow-sky-500/10">
                              <svg
                                className="h-[18px] w-[18px]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                {c.icon}
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13px] font-semibold text-white transition-colors group-hover/i:text-sky-300">
                                {c.label}
                              </span>
                              <span className="mt-0.5 block text-[11px] leading-snug text-slate-500 transition-colors group-hover/i:text-slate-400">
                                {c.desc}
                              </span>
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="border-t border-white/[.06] px-3 py-2.5">
                        <a
                          href="#services"
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-medium text-slate-500 transition-all hover:bg-white/[.04] hover:text-sky-400"
                        >
                          View all services
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative rounded-xl px-4 py-2 text-[14px] font-medium text-slate-300 transition-all duration-300 hover:bg-white/[.06] hover:text-white"
                  >
                    {l.label}
                    <span className="absolute bottom-0.5 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              )
            )}
          </ul>

          {/* ══════════ RIGHT ACTIONS ══════════ */}
          <div className="flex items-center gap-2.5">
            {/* phone */}
            <a
              href="tel:+919876543210"
              className="hidden items-center gap-2 rounded-xl border border-white/[.07] bg-white/[.03] px-3.5 py-2 text-[13px] font-medium text-slate-300 backdrop-blur transition-all duration-300 hover:border-sky-400/20 hover:bg-white/[.07] hover:text-white md:inline-flex"
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
              <span className="hidden xl:inline">+91 98765 43210</span>
            </a>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:scale-[1.04] active:scale-[.97]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
              <svg
                className="relative h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="relative">Contact Us</span>
            </a>

            {/* hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.04] backdrop-blur transition-all hover:bg-white/[.1] lg:hidden"
            >
              <div className="flex h-[18px] w-5 flex-col justify-between">
                <span
                  className={[
                    "block h-[2px] w-full rounded-full bg-white transition-all duration-300 origin-center",
                    mobileOpen ? "translate-y-[8px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[2px] w-full rounded-full bg-white transition-all duration-300",
                    mobileOpen ? "scale-x-0 opacity-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[2px] w-full rounded-full bg-white transition-all duration-300 origin-center",
                    mobileOpen ? "-translate-y-[8px] -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ══════════ MOBILE MENU ══════════ */}
      <div
        className={[
          "fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={closeMobile}
      />

      <aside
        className={[
          "fixed inset-y-0 right-0 z-[95] flex w-[82vw] max-w-[360px] flex-col border-l border-white/[.06] bg-slate-950/[.97] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* glows */}
        <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-sky-500/8 blur-[80px]" />
        <div className="pointer-events-none absolute -right-10 bottom-32 h-36 w-36 rounded-full bg-cyan-400/8 blur-[60px]" />

        {/* mobile header with logo */}
        <div className="flex items-center justify-between border-b border-white/[.06] px-5 py-4">
          <a
            href="#"
            onClick={closeMobile}
            className="group flex items-center gap-2.5"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-md shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-400/30">
              <img
                src={logo}
                alt="AquaPure Logo"
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            <span className="text-base font-bold text-white">
              Aqua<span className="text-sky-400">Pure</span>
            </span>
          </a>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] text-slate-400 hover:text-white"
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

        {/* links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {links.map((l) =>
            l.children ? (
              <div key={l.label}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-slate-300 transition-colors hover:bg-white/[.05] hover:text-white"
                >
                  {l.label}
                  <svg
                    className={[
                      "h-4 w-4 text-slate-500 transition-transform duration-300",
                      servicesOpen ? "rotate-180 text-sky-400" : "",
                    ].join(" ")}
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

                <div
                  className={[
                    "overflow-hidden transition-all duration-400 ease-out",
                    servicesOpen
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="ml-4 space-y-0.5 border-l border-white/[.06] pl-3 py-1.5">
                    {l.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        onClick={closeMobile}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[.05]"
                      >
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[.06] bg-white/[.03] text-sky-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {c.icon}
                          </svg>
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-white">
                            {c.label}
                          </span>
                          <span className="block text-[11px] text-slate-500">
                            {c.desc}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-300 transition-colors hover:bg-white/[.05] hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* bottom CTA */}
        <div className="space-y-2.5 border-t border-white/[.06] p-4">
          <a
            href="tel:+919876543210"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[.08] bg-white/[.04] py-3 text-sm font-medium text-white transition hover:bg-white/[.08]"
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
            Call: +91 98765 43210
          </a>

          <a
            href="#contact"
            onClick={closeMobile}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20"
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Us
          </a>
        </div>
      </aside>
    </>
  );
}