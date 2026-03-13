import React, { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Droplets,
  Gauge,
  MessageCircle,
  Ruler,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  CheckCircle2,
  Phone,
  Filter,
  Info,
  X,
} from "lucide-react";

import p1 from "../img/p1.jpeg";
import p2 from "../img/p2.jpeg";
import p3 from "../img/bm_elite.png";

const WHATSAPP_NUMBER = "+918871863773";

const products = [
  {
    id: 1,
    code: "BM30",
    name: "Silver Shakti BM30",
    price: "₹13,990",
    originalPrice: "₹18,500",
    image: p1,
    shortDescription:
      "Sleek alkaline RO purifier with premium finish for daily family use.",
    bestUse:
      "Ideal for homes needing clean, mineral-enhanced water with stylish wall-mounted design.",
    quickPoints: ["12L Storage", "Wall Mount", "5 Stage RO"],
    technology: "Silver Shakti Zinc Copper Alkaline RO with LED",
    capacity: "Up to 18 Litres/Hour",
    weight: "6.450 kg",
    dimension: "415 × 270 × 540 mm",
    filters:
      "Sediment → Activated Carbon → RO → Zinc → Copper → Anti-Oxidant Alkaline → Silver Shakti",
    highlights: [
      "Elegant LED display for modern kitchens",
      "Balanced alkaline water output",
      "Space-saving wall mounted design",
      "Smooth daily use for family needs",
    ],
    rating: 4.7,
    reviews: 238,
  },
  {
    id: 2,
    code: "BD51",
    name: "Silver Shakti BD51",
    price: "₹23,990",
    originalPrice: "₹30,000",
    image: p2,
    shortDescription:
      "Premium self-cooling purifier with matka effect and advanced RO + UV protection.",
    bestUse:
      "Best for those wanting premium cooling, advanced purification, and luxury design.",
    quickPoints: ["9L Storage", "Self Cooling", "6 Stage RO+UV", "Matka Tech"],
    technology:
      "Silver Shakti Zinc Copper Alkaline RO + UV with LED Washable Tank",
    capacity: "Up to 18 Litres/Hour",
    weight: "10 kg",
    dimension: "340 × 360 × 540 mm",
    filters:
      "Sediment → Activated Carbon → RO → UV → Zinc → Copper → Silver Shakti → Washable Tank",
    highlights: [
      "Self cooling with natural matka feel",
      "RO + UV dual purification",
      "LED finish with washable tank",
      "Premium body for luxury interiors",
    ],
    rating: 4.9,
    reviews: 186,
  },
  {
    id: 3,
    code: "BD79",
    name: "Silver Shakti BD79",
    price: "₹22,990",
    originalPrice: "₹29,500",
    image: p3,
    shortDescription:
      "Powerful 7-stage purifier with RO, UF, UV and alkaline enrichment.",
    bestUse:
      "Perfect for families needing multi-stage purification with high-capacity output.",
    quickPoints: ["12L Storage", "Wall Mount", "7 Stage RO+UF+UV"],
    technology: "Silver Shakti Zinc Copper Alkaline RO UF + UV with LED",
    capacity: "Up to 18 Litres/Hour",
    weight: "6.650 kg",
    dimension: "415 × 270 × 540 mm",
    filters:
      "Sediment → Activated Carbon → RO → UF → UV → Zinc → Copper → Alkaline → Silver Shakti → Auto Flash",
    highlights: [
      "Advanced RO + UF + UV triple protection",
      "Premium LED front panel",
      "Auto Flash support system",
      "Designed for maximum purification",
    ],
    rating: 4.8,
    reviews: 312,
  },
];

const ProductSection = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const orderOnWhatsApp = (product) => {
    const message = `Hi! I'm interested in *${product.name}* (${product.code}) at ${product.price}. Please share details about ordering, installation, and delivery.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="relative min-h-screen bg-slate-950 pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400">
            <Zap size={15} className="text-blue-400" />
            Premium Water Purifiers
          </div>

          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Pure Water,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Technology
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
            Advanced RO purifiers engineered for Indian homes. Premium build,
            cutting-edge filtration, instant WhatsApp ordering.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-6">
          {products.map((product) => {
            const isExpanded = expandedId === product.id;

            return (
              <div
                key={product.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 sm:rounded-3xl ${
                  isExpanded
                    ? "border-blue-500/30 bg-slate-900 shadow-2xl shadow-blue-500/10"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
                  {/* Image Section */}
                  <div
                    className="group relative flex-shrink-0 cursor-pointer overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 lg:w-72 xl:w-80"
                    onClick={() => setSelectedImage(product.image)}
                  >
                    <div className="flex h-56 items-center justify-center p-4 sm:h-64 lg:h-full lg:min-h-[280px]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-110 sm:max-h-56 lg:max-h-full"
                      />
                    </div>

                    {/* ✅ Badge removed from here */}

                    <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                      <span className="rounded-lg bg-black/50 px-2 py-1 text-[11px] font-mono font-semibold text-slate-300 backdrop-blur-sm">
                        {product.code}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 lg:p-7">
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white sm:text-2xl">
                            {product.name}
                          </h3>

                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  className={
                                    i < Math.floor(product.rating)
                                      ? "fill-current"
                                      : "text-slate-600"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-slate-400">
                              {product.rating}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 sm:text-right">
                          <span className="text-2xl font-extrabold text-white sm:text-3xl">
                            {product.price}
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {product.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.quickPoints.map((point, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300"
                          >
                            <CheckCircle2 size={12} className="text-blue-400" />
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={() => orderOnWhatsApp(product)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-600/30"
                      >
                        <MessageCircle size={17} />
                        Order on WhatsApp
                        <ArrowRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpand(product.id)}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                          isExpanded
                            ? "bg-blue-500/15 text-blue-400 hover:bg-blue-500/20"
                            : "border border-slate-700 bg-transparent text-slate-300 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <Info size={16} />
                        {isExpanded ? "Hide Specs" : "View Specs"}
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const message = `Hi, I have a question about ${product.name} (${product.code}). Can you help?`;
                          window.open(
                            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
                            "_blank"
                          );
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-400 transition hover:border-slate-600 hover:text-slate-300 sm:px-4"
                      >
                        <Phone size={15} />
                        <span className="sm:hidden">Call Us</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-800 px-5 py-6 sm:px-6 sm:py-8 lg:px-7">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <SpecCard
                          icon={<Gauge size={20} />}
                          label="Purification Rate"
                          value={product.capacity}
                          color="blue"
                        />
                        <SpecCard
                          icon={<Scale size={20} />}
                          label="Net Weight"
                          value={product.weight}
                          color="violet"
                        />
                        <SpecCard
                          icon={<Ruler size={20} />}
                          label="Dimensions"
                          value={product.dimension}
                          color="cyan"
                        />
                        <SpecCard
                          icon={<Droplets size={20} />}
                          label="Stages"
                          value={
                            product.quickPoints.find((p) => p.includes("Stage")) ||
                            "Multi-Stage"
                          }
                          color="emerald"
                        />
                      </div>

                      <div className="mt-6 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                              <ShieldCheck size={17} />
                            </div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                              Technology
                            </h4>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-300">
                            {product.technology}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                              <Filter size={17} />
                            </div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-violet-400">
                              Filtration Pipeline
                            </h4>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-400">
                            {product.filters}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-300">
                          <Sparkles size={16} className="text-amber-400" />
                          Key Highlights
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {product.highlights.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 rounded-xl bg-slate-800/60 px-4 py-3"
                            >
                              <BadgeCheck
                                size={16}
                                className="mt-0.5 flex-shrink-0 text-emerald-400"
                              />
                              <p className="text-sm text-slate-300">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-cyan-500/15 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                              <Droplets size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                                Best For
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                                {product.bestUse}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => orderOnWhatsApp(product)}
                            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
                          >
                            <MessageCircle size={16} />
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage}
            alt="Product Preview"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

const specColors = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/15",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/15",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/15",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
};

const specIconBg = {
  blue: "bg-blue-500/15 text-blue-400",
  violet: "bg-violet-500/15 text-violet-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
};

const SpecCard = ({ icon, label, value, color = "blue" }) => (
  <div className={`rounded-xl border p-4 ${specColors[color]}`}>
    <div
      className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${specIconBg[color]}`}
    >
      {icon}
    </div>
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-sm font-bold text-slate-200">{value}</p>
  </div>
);

export default ProductSection;