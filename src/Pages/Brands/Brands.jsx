// src/components/ServiceAreas.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import filterImg from "../img/1.png";

const PRODUCT_SECTION_ID = "product"; // ✅ ProductSection me <section id="product" ...> add kar dena
const PRODUCT_ROUTE = "/product";
const HEADER_OFFSET = 96; // fixed header height offset

/* ──────────────────────────────────────────
   BRANDS DATA  (✅ Blue Mount top, ✅ Others last)
   ────────────────────────────────────────── */
const BRANDS = [
  { name: "Blue Mount", popular: true },

  { name: "Aquaguard", popular: true },
  { name: "Kent", popular: true },
  { name: "Livpure", popular: true },
  { name: "Havells", popular: true },
  { name: "Pureit", popular: true },

  { name: "Blue Star", popular: false },
  { name: "Nasaka", popular: false },
  { name: "Eurotouch", popular: false },
  { name: "Eurotech", popular: false },
  { name: "Aquasafe", popular: false },
  { name: "Aquagrand", popular: false },

  { name: "Others RO", popular: false }, // ✅ always last
];

/* ──────────────────────────────────────────
   SERVICE AREAS DATA
   ────────────────────────────────────────── */
const SERVICE_AREAS = {
  raipur: {
    title: "Raipur City",
    icon: "🏙️",
    color: "sky",
    areas: [
      "Shankar Nagar",
      "Civil Lines",
      "Devendra Nagar",
      "Samta Colony",
      "Pandri",
      "Telibandha",
      "Tatibandh",
      "Rajendra Nagar",
      "Gudhiyari",
      "Bhatagaon",
      "Mowa",
      "Saddu",
      "Kabir Nagar",
      "Kota",
      "Tikrapara",
      "Pachpedi Naka",
      "Fafadih",
      "Byron Bazar",
      "Vidhan Sabha Road",
      "Avanti Vihar",
      "Khamardih",
      "Bhanpuri",
      "Birgaon",
      "Raipura",
      "Changurabhata",
      "Santoshi Nagar",
      "Mathpuraina",
      "Amlidih",
      "Shanti Nagar",
      "Amanaka",
      "Siltara",
      "Amleshwar",
    ],
  },
  nayaRaipur: {
    title: "Naya Raipur",
    icon: "🌆",
    color: "emerald",
    areas: [
      "Sector 1-30",
      "Mantralaya",
      "Jungle Safari",
      "Purkhauti Muktangan",
      "AIIMS Raipur",
      "IIT Bhilai Campus",
      "Rakhi",
      "Nawagaon",
      "Cheria",
      "Kokadi",
    ],
  },
  bhilaiDurg: {
    title: "Bhilai - Durg",
    icon: "🏭",
    color: "violet",
    areas: [
      "Bhilai Sector 1-10",
      "Durg City",
      "Supela",
      "Nehru Nagar",
      "Civic Center",
      "Junwani",
      "Khursipar",
      "Risali",
      "Bhilai Charoda",
      "Kumhari",
      "Jamul",
      "Utai",
      "Camp 1 & 2",
      "Maroda",
      "Vaishali Nagar",
      "Power House",
    ],
  },
  mahasamund: {
    title: "Mahasamund",
    icon: "🌾",
    color: "amber",
    areas: [
      "Mahasamund City",
      "Bagbahra",
      "Pithora",
      "Saraipali",
      "Basna",
      "Komakhan",
      "Sirpur",
      "Tumgaon",
      "Chhura",
    ],
  },
  otherDistricts: {
    title: "Other Districts",
    icon: "📍",
    color: "rose",
    areas: [
      "Rajnandgaon",
      "Balod",
      "Bemetara",
      "Kawardha",
      "Bilaspur",
      "Korba",
      "Raigarh",
      "Jagdalpur",
      "Dhamtari",
      "Gariaband",
      "Kanker",
      "Kondagaon",
      "Sukma",
      "Janjgir-Champa",
      "Mungeli",
    ],
  },
};

/* Color mappings for region accents */
const COLOR_MAP = {
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    dot: "bg-sky-500",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    headerBg: "bg-gradient-to-r from-sky-50 to-sky-100/50",
    ring: "ring-sky-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    headerBg: "bg-gradient-to-r from-emerald-50 to-emerald-100/50",
    ring: "ring-emerald-100",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    dot: "bg-violet-500",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    headerBg: "bg-gradient-to-r from-violet-50 to-violet-100/50",
    ring: "ring-violet-100",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    headerBg: "bg-gradient-to-r from-amber-50 to-amber-100/50",
    ring: "ring-amber-100",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    dot: "bg-rose-500",
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    headerBg: "bg-gradient-to-r from-rose-50 to-rose-100/50",
    ring: "ring-rose-100",
  },
};

/* ──────────────────────────────────────────
   HOOK: InView once
   ────────────────────────────────────────── */
function useInViewOnce(ref, options = { threshold: 0.08 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.unobserve(e.target);
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);

  return visible;
}

/* ──────────────────────────────────────────
   BRAND CARD (Clickable -> Product section)
   ────────────────────────────────────────── */
function BrandCard({ brand, index, isVisible, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 30}ms` }}
      aria-label={`View products for ${brand.name}`}
    >
      <div className="group relative flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300">
        {/* Subtle hover glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-50/0 to-blue-50/0 group-hover:from-sky-50/50 group-hover:to-blue-50/30 transition-all duration-300" />

        {/* Icon */}
        <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-sky-100 transition-colors">
          <img
            src={filterImg}
            alt="RO Filter"
            className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Brand Info */}
        <div className="relative min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 truncate group-hover:text-sky-800 transition-colors">
              {brand.name}
            </span>

            {brand.popular && brand.name !== "Others RO" && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 px-2 py-0.5 rounded-full">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Popular
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[11px] text-slate-500">Service • Repair • AMC</span>
          </div>
        </div>

        {/* Mobile Popular Badge */}
        {brand.popular && brand.name !== "Others RO" && (
          <span className="sm:hidden absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-[9px] font-bold text-white bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-sm">
            ★
          </span>
        )}
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────
   AREA SECTION — Accordion
   ────────────────────────────────────────── */
function AreaSection({
  regionKey,
  region,
  isExpanded,
  onToggle,
  isVisible,
  showAll,
  onToggleShowAll,
  index,
}) {
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  const colors = COLOR_MAP[region.color] || COLOR_MAP.sky;

  const displayedAreas = useMemo(() => {
    return showAll ? region.areas : region.areas.slice(0, 10);
  }, [showAll, region.areas]);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isExpanded) {
      requestAnimationFrame(() => setMaxH(contentRef.current.scrollHeight));
    } else {
      setMaxH(0);
    }
  }, [isExpanded, showAll, displayedAreas.length]);

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
          isExpanded
            ? `${colors.border} ring-1 ${colors.ring}`
            : "border-slate-200/80"
        }`}
      >
        {/* Header */}
        <button
          type="button"
          onClick={() => onToggle(regionKey)}
          className={`w-full flex items-center justify-between gap-3 px-5 py-4 transition cursor-pointer ${
            isExpanded
              ? colors.headerBg
              : "bg-slate-50/50 hover:bg-slate-100/60"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`h-11 w-11 rounded-xl flex items-center justify-center text-2xl ${
                isExpanded ? colors.bg : "bg-white"
              } border ${
                isExpanded ? colors.border : "border-slate-200"
              } transition-all duration-300`}
            >
              {region.icon}
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-800">{region.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                <p className="text-[11px] text-slate-500 font-medium">
                  {region.areas.length} service areas
                </p>
              </div>
            </div>
          </div>

          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded
                ? `${colors.bg} ${colors.border} border`
                : "bg-white border border-slate-200"
            } ${isExpanded ? "rotate-180" : ""}`}
          >
            <svg
              className={`w-4 h-4 transition-colors ${
                isExpanded ? colors.text : "text-slate-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Content */}
        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{ maxHeight: isExpanded ? maxH : 0, opacity: isExpanded ? 1 : 0 }}
        >
          <div ref={contentRef} className="px-5 pb-5 pt-3">
            <div className={`h-px w-full ${colors.bg} mb-4`} />

            <div className="flex flex-wrap gap-2">
              {displayedAreas.map((area, i) => (
                <span
                  key={area}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 hover:scale-[1.03] ${colors.pill}`}
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <svg
                    className={`w-2.5 h-2.5 ${colors.text} opacity-60`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {area}
                </span>
              ))}
            </div>

            {region.areas.length > 10 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleShowAll(regionKey);
                }}
                className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${colors.text} hover:opacity-80 cursor-pointer transition-opacity`}
              >
                {showAll ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    Show All {region.areas.length} Areas
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────── */
export default function ServiceAreas() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const isVisible = useInViewOnce(sectionRef);

  const [expandedRegion, setExpandedRegion] = useState("raipur");
  const [showAllMap, setShowAllMap] = useState(() =>
    Object.fromEntries(Object.keys(SERVICE_AREAS).map((k) => [k, false]))
  );

  // ✅ Smooth scroll helper (same page)
  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  }, []);

  // ✅ Go to product section/page
  const goToProducts = useCallback(() => {
    // If Product section exists on same page -> scroll
    if (scrollToId(PRODUCT_SECTION_ID)) return;

    // Else navigate to /product and use hash (best simple)
    navigate(`${PRODUCT_ROUTE}#${PRODUCT_SECTION_ID}`);
  }, [navigate, scrollToId]);

  // ✅ Brand sort: Blue Mount first, Others RO last, then popular, then rest
  const sortedBrands = useMemo(() => {
    const seen = new Set();
    const uniq = [];

    BRANDS.forEach((b, idx) => {
      const key = b.name.trim().toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      uniq.push({ ...b, __idx: idx });
    });

    const rank = (b) => {
      const n = b.name.toLowerCase();
      if (n === "blue mount" || n === "bluemount") return 0;
      if (n.includes("others")) return 3;
      if (b.popular) return 1;
      return 2;
    };

    return uniq.sort((a, b) => {
      const ra = rank(a);
      const rb = rank(b);
      if (ra !== rb) return ra - rb;
      return a.__idx - b.__idx; // stable
    });
  }, []);

  const handleToggle = useCallback((key) => {
    setExpandedRegion((prev) => (prev === key ? null : key));
  }, []);

  const handleToggleShowAll = useCallback((key) => {
    setShowAllMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service-areas"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-64 h-64 bg-sky-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-bold text-sky-700 tracking-wider uppercase">
              Trusted RO Experts in Chhattisgarh
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Brands We Service &{" "}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Areas We Cover
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Prajapati Enterprise provides end-to-end RO support—from domestic
            maintenance and filter replacement to industrial RO plant servicing
            and water cooler solutions.
          </p>
        </div>

        {/* ── Brands Section ── */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-1 rounded-full bg-gradient-to-b from-sky-500 to-blue-600" />

              {/* ✅ Clicking this heading takes to Product section */}
              <button
                type="button"
                onClick={goToProducts}
                className="text-left"
                aria-label="Go to Products"
              >
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 hover:text-sky-700 transition-colors">
                  Brands We Repair & Service
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Tap any brand to view products
                </p>
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 10a6 6 0 1112 0 6 6 0 01-12 0zm6-3a1 1 0 00-1 1v2.2l-.7.7a1 1 0 101.4 1.4l1-1A1 1 0 0011 11V8a1 1 0 00-1-1z" />
              </svg>
              Blue Mount first • Others last
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sortedBrands.map((brand, index) => (
              <BrandCard
                key={brand.name}
                brand={brand}
                index={index}
                isVisible={isVisible}
                onClick={goToProducts} // ✅ click -> product section/page
              />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="flex items-center gap-2 text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
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
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {/* ── Service Areas ── */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                Service Coverage Map
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
              Our Service Areas in{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Chhattisgarh
              </span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Fast doorstep service across Raipur, Naya Raipur, Bhilai–Durg, Mahasamund,
              and nearby districts with{" "}
              <span className="font-semibold text-slate-700">same-day availability</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(SERVICE_AREAS).map(([key, region], index) => (
              <AreaSection
                key={key}
                regionKey={key}
                region={region}
                isExpanded={expandedRegion === key}
                onToggle={handleToggle}
                isVisible={isVisible}
                showAll={!!showAllMap[key]}
                onToggleShowAll={handleToggleShowAll}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}