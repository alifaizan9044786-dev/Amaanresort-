import React from 'react';
import { useResort } from '../context/ResortContext';
import { Sparkles, Check, ArrowRight, MessageCircle, Calendar, Users } from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, settings, openBookingModal, getWhatsAppBookingUrl } = useResort();

  return (
    <section id="packages" className="py-24 bg-[#070d1b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c5a880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Family &amp; Corporate Deals</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Special <span className="italic text-[#c5a880]">Resort Packages</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-3 leading-relaxed">
            All-inclusive day passes, weekend cottage staycations, and corporate retreats tailored for guests driving from Lahore, Pattoki, and Kasur.
          </p>
        </div>

        {/* Packages Cards Grid (NO DOLLAR SIGN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const whatsAppUrl = getWhatsAppBookingUrl({
              packageName: pkg.title,
              notes: `Package Inquiry: Interested in "${pkg.title}" (${pkg.duration}) at Amaan Resorts Pattoki. Please share group rates and availability.`,
            });

            return (
              <div
                key={pkg.id}
                className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl flex flex-col justify-between min-h-[460px] bg-[#0b1325]"
              >
                {/* Background Image */}
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b] via-[#070d1b]/80 to-[#070d1b]/40 group-hover:via-[#070d1b]/70 transition-colors" />

                {/* Top Section */}
                <div className="relative z-10 p-5 flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-[#d8bd8a] border border-[#c5a880]/30">
                    {pkg.idealFor}
                  </span>

                  {/* Circular Inquiry Tag (NO DOLLAR SIGN) */}
                  <div className="w-16 h-16 rounded-full bg-[#080f1e]/90 border border-[#c5a880]/60 backdrop-blur-md flex flex-col items-center justify-center text-white shadow-xl group-hover:border-[#c5a880] group-hover:scale-105 transition-all text-center px-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#c5a880] leading-none">Deal</span>
                    <span className="font-luxury font-bold text-xs text-white leading-tight mt-0.5">
                      On Inquiry
                    </span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-5 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-medium mb-1">
                    {pkg.duration}
                  </span>
                  <h3 className="font-luxury text-xl font-bold text-white group-hover:text-[#e6d5b8] transition-colors mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {pkg.shortDescription}
                  </p>

                  {/* Inclusions summary */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                    {pkg.inclusions.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => openBookingModal({ packageId: pkg.id })}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Inquire Package</span>
                    </button>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
