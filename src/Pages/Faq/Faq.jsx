import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is included in a standard RO service?",
    a: "Complete inspection + cleaning of pre-filters, carbon, sediment, membrane, pump pressure, TDS level, flow rate, leakages, tank sanitation, taste & odor test, and final performance report.",
  },
  {
    q: "How long does RO installation take?",
    a: "Typically 45–90 minutes. Wall-mounting, drilling, or complex plumbing may extend it up to 2 hours.",
  },
  {
    q: "When should I replace filters and membrane?",
    a: "Sediment & Carbon: Every 6–8 months\nRO Membrane: Every 18–24 months\nUV Lamp (if present): Every 12 months\n(Depends on water TDS and daily usage)",
  },
  {
    q: "What does the Annual Maintenance Contract (AMC) cover?",
    a: "4 scheduled services per year, free minor repairs, filter replacements (in select plans), priority support, and timely reminders.",
  },
  {
    q: "Why is water flow slow or taste slightly off?",
    a: "Most common causes: clogged filters, low pump pressure, choked membrane, incorrect TDS setting, or air-locked tank. We diagnose and fix it on the spot.",
  },
  {
    q: "Do you service all RO brands?",
    a: "Yes — Kent, Aquaguard, Pureit, Livpure, AO Smith, Blue Star, Eureka Forbes, Tata Swach, Nasaka, and even unbranded/local ROs. Genuine spares available for all major brands.",
  },
  {
    q: "What warranty do I get after service?",
    a: "3–12 months warranty on replaced spare parts\n30 days service guarantee on labor\nEverything clearly mentioned on your job card",
  },
  {
    q: "What is the ideal TDS level for drinking water?",
    a: "80–150 ppm is considered ideal. Below 50 ppm lacks minerals; above 300 ppm can affect taste and health over time.",
  },
  {
    q: "Can we reuse RO waste water?",
    a: "Absolutely. Use it for mopping, gardening, toilet flushing, car washing, or even as pre-filter water. We also install zero-waste systems on request.",
  },
  {
    q: "Which RO is best for my home?",
    a: "We do a free water test first (TDS, hardness, iron, pH), then recommend the perfect model — RO+UV+UF+TDS Controller+Alkaline or Copper, exactly suited to your water.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3">
            Everything you need to know about RO service & maintenance
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${isOpen 
                  ? "bg-blue-600 text-white shadow-lg scale-[1.02]" 
                  : "bg-white border-blue-100 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-lg">
                    {faq.q}
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300
                    ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`px-6 transition-all duration-500 ease-in-out
                  ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}