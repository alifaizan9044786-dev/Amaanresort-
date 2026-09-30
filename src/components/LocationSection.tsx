import React from 'react';
import { useResort } from '../context/ResortContext';
import { MapPin, Navigation, Car, Compass, Phone, Sparkles, ExternalLink, Clock } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings } = useResort();

  return (
    <section id="location" className="py-24 bg-[#080f1e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Easy Regional Access</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Location &amp; <span className="italic text-[#c5a880]">Directions Map</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Located directly on Main Multan Road (N-5) near Pattoki — seamlessly accessible from Lahore, Kasur, Raiwind, and Okara with ample secure parking.
            </p>
          </div>

          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all self-start md:self-auto cursor-pointer"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Map & Arrival Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-7 bg-[#0b1325] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative min-h-[380px] lg:min-h-[460px] flex flex-col justify-between">
            {/* Embedded Google Map centering on Pattoki / Multan Road, Kasur */}
            <div className="relative flex-1 w-full min-h-[320px] overflow-hidden bg-slate-900">
              <iframe
                title="Amaan Resorts Google Map Pattoki Lahore"
                src="https://maps.google.com/maps?q=Pattoki%20Multan%20Road%20Punjab%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-125 saturate-75 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-[#080f1e]/95 backdrop-blur-md border border-[#c5a880]/40 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-lg">
                <MapPin className="w-4 h-4 text-[#c5a880] animate-bounce" />
                <span className="text-xs font-semibold text-white">Amaan Resorts, Main Multan Road, Pattoki</span>
              </div>
            </div>

            {/* Bottom Bar with Link */}
            <div className="p-4 sm:p-5 bg-[#080f1e] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white block">Official Google Maps Link</span>
                <span className="text-[#c5a880] truncate max-w-xs block font-mono text-[11px]">
                  {settings.googleMapsUrl}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Call: {settings.phone}</span>
                </a>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  <span>Get Live Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Travel times & Regional Accessibility */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-6 rounded-2xl bg-[#0b1325] border border-white/10">
              <h3 className="font-luxury text-xl text-white mb-4">Driving Times from Nearby Cities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Lahore (Thokar Niaz Baig / Ring Road)</span>
                    <span className="text-xs text-emerald-400 font-medium">45 - 55 Minutes straight drive via Multan Road (N-5)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Pattoki City Center</span>
                    <span className="text-xs text-emerald-400 font-medium">Just 5 - 10 Minutes drive</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Raiwind / Bahria Town Lahore</span>
                    <span className="text-xs text-slate-300">30 - 35 Minutes via Raiwind-Pattoki link</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Kasur City</span>
                    <span className="text-xs text-slate-300">35 - 40 Minutes via Kasur-Chunian-Pattoki route</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Okara / Sahiwal</span>
                    <span className="text-xs text-slate-300">45 Minutes via GT Road / N-5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Security Guarantee */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121f3a] to-[#0b1325] border border-[#c5a880]/30 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                Family &amp; Vehicle Safety
              </span>
              <h4 className="font-luxury text-lg text-white font-medium mb-1.5">
                Spacious Secure Parking &amp; 24/7 Security
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-3">
                Over 300+ covered and open secure car parking bays with security guards, CCTV cameras, and luggage assistance.
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
                <span>Direct Navigation Assistance:</span>
                <a href={`tel:${settings.phone}`} className="text-[#c5a880] font-bold hover:underline">
                  {settings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
