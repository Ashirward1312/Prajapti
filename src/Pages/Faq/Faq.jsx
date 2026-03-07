// src/components/FAQ.jsx
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is included in a standard RO service?",
    a: "Complete inspection + cleaning of pre-filters, carbon, sediment, membrane, pump pressure, TDS level, flow rate, leakages, tank sanitation, taste & odor test, and final performance report.",
    icon: "🔧",
  },
  {
    q: "How long does RO installation take?",
    a: "Typically 45–90 minutes. Wall-mounting, drilling, or complex plumbing may extend it up to 2 hours.",
    icon: "⏱️",
  },
  {
    q: "When should I replace filters and membrane?",
    a: "Sediment & Carbon: Every 6–8 months\nRO Membrane: Every 18–24 months\nUV Lamp (if present): Every 12 months\n(Depends on water TDS and daily usage)",
    icon: "🔄",
  },
  {
    q: "What does the Annual Maintenance Contract (AMC) cover?",
    a: "4 scheduled services per year, free minor repairs, filter replacements (in select plans), priority support, and timely reminders.",
    icon: "📋",
  },
  {
    q: "Why is water flow slow or taste slightly off?",
    a: "Most common causes: clogged filters, low pump pressure, choked membrane, incorrect TDS setting, or air-locked tank. We diagnose and fix it on the spot.",
    icon: "💧",
  },
  {
    q: "Do you service all RO brands?",
    a: "Yes — Kent, Aquaguard, Pureit, Livpure, AO Smith, Blue Star, Eureka Forbes, Tata Swach, Nasaka, and even unbranded/local ROs. Genuine spares available for all major brands.",
    icon: "✅",
  },
  {
    q: "What warranty do I get after service?",
    a: "3–12 months warranty on replaced spare parts\n30 days service guarantee on labor\nEverything clearly mentioned on your job card",
    icon: "🛡️",
  },
  {
    q: "What is the ideal TDS level for drinking water?",
    a: "80–150 ppm is considered ideal. Below 50 ppm lacks minerals; above 300 ppm can affect taste and health over time.",
    icon: "📊",
  },
  {
    q: "Can we reuse RO waste water?",
    a: "Absolutely. Use it for mopping, gardening, toilet flushing, car washing, or even as pre-filter water. We also install zero-waste systems on request.",
    icon: "♻️",
  },
  {
    q: "Which RO is best for my home?",
    a: "We do a free water test first (TDS, hardness, iron, pH), then recommend the perfect model — RO+UV+UF+TDS Controller+Alkaline or Copper, exactly suited to your water.",
    icon: "🏠",
  },
];

/* ───── FAQ Item Component ───── */
function FAQItem({ faq, index, isOpen, onToggle, isVisible }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div
        className={`group rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-300
          ${
            isOpen
              ? "bg-white border-sky-200 shadow-lg shadow-sky-100/50"
              : "bg-white border-slate-200 hover:border-sky-200 hover:shadow-md"
          }`}
      >
        {/* Question Button */}
        <button
          onClick={() => onToggle(index)}
          className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
          aria-expanded={isOpen}
        >
          {/* Icon Badge */}
          <div
            className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300
              ${
                isOpen
                  ? "bg-sky-100 shadow-sm"
                  : "bg-slate-100 group-hover:bg-sky-50"
              }`}
          >
            {faq.icon}
          </div>

          {/* Question Text */}
          <span
            className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-colors duration-300
              ${isOpen ? "text-sky-700" : "text-slate-700 group-hover:text-slate-900"}`}
          >
            {faq.q}
          </span>

          {/* Chevron */}
          <div
            className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300
              ${
                isOpen
                  ? "bg-sky-500 text-white rotate-180"
                  : "bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600"
              }`}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </button>

        {/* Answer Content */}
        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{ maxHeight: height }}
        >
          <div ref={contentRef}>
            {/* Divider */}
            <div className="mx-4 sm:mx-6 h-px bg-slate-100" />

            <div className="px-4 sm:px-6 pt-4 pb-5 sm:pb-6 pl-[4rem] sm:pl-[4.75rem]">
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed whitespace-pre-line">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Main FAQ Component ───── */
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const el = sectionRef.current;
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

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white"
    >
      {/* ── Simple Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute -top-20 left-[15%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-sky-100/50 blur-[100px]" />
        <div className="absolute bottom-0 right-[10%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-cyan-100/40 blur-[90px]" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(14,165,233,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ═══════ Header ═══════ */}
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-sky-100 border border-sky-200 mb-5 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-sky-700 text-[10px] sm:text-xs font-semibold tracking-[2px] uppercase">
              FAQ
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight mb-3 sm:mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
              Questions
            </span>
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-4">
            <div className="w-10 sm:w-12 h-[2px] bg-gradient-to-r from-transparent to-sky-300 rounded" />
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <div className="w-10 sm:w-12 h-[2px] bg-gradient-to-l from-transparent to-sky-300 rounded" />
          </div>

          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our RO service, installation &
            maintenance — answered clearly.
          </p>
        </div>

        {/* ═══════ FAQ List ═══════ */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={activeIndex === index}
              onToggle={toggleFAQ}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ═══════ Bottom Help Text ═══════ */}
        <div
          className={`mt-10 sm:mt-12 text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xl sm:text-2xl">💬</span>
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-medium text-slate-700">
                Still have questions?
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                Call us at{" "}
                <a
                  href="tel:+918871863773"
                  className="text-sky-600 font-semibold hover:underline"
                >
                  +91 88718 63773
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}