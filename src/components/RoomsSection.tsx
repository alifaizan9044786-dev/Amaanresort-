import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Room } from '../types';
import {
  Sparkles,
  ArrowRight,
  Check,
  Calendar,
  MessageCircle,
  Eye,
  Home,
  Star,
} from 'lucide-react';

export const RoomsSection: React.FC = () => {
  const { rooms, settings, setActiveRoomModal, openBookingModal, getWhatsAppBookingUrl } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Cottage', 'Suite', 'Villa', 'Room'];

  const filteredRooms =
    activeCategory === 'All'
      ? rooms
      : rooms.filter((r) => r.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="rooms" className="py-24 bg-[#080f1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Accommodation</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Cottages, Suites &amp; <span className="italic text-[#c5a880]">Pavilions</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Authentic red-brick architecture, split air conditioning, private rooftop viewing decks, and peaceful garden surroundings. Inquiry-based reservations with best rates guaranteed.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121f3a]/60 p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#c5a880] text-[#070d1b] shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'All' ? 'All Accommodations' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid (NO DOLLAR SIGNS, INQUIRY BASED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => {
            const whatsAppUrl = getWhatsAppBookingUrl({
              roomName: room.name,
              notes: `Inquiry for ${room.name} at Amaan Resorts Pattoki. Please share rates, family packages, and availability.`,
            });

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-slate-100"
              >
                {/* Image & Header */}
                <div
                  className="relative h-56 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveRoomModal(room)}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badge */}
                  {room.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#080f1e]/90 backdrop-blur-md text-[#d8bd8a] border border-[#c5a880]/30 shadow-md">
                      {room.badge}
                    </span>
                  )}

                  {/* Quick Inspect Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#080f1e] text-[11px] font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> View Cottage Details
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between text-slate-800">
                  <div>
                    {/* Inquiry Badge (NO DOLLAR SIGN) */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {room.pricingLabel || 'Rates on Inquiry'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">Available</span>
                    </div>

                    {/* Room Title */}
                    <h3
                      onClick={() => setActiveRoomModal(room)}
                      className="font-luxury text-lg font-bold text-[#080f1e] hover:text-[#aa8b5c] transition-colors cursor-pointer mb-2 line-clamp-1"
                    >
                      {room.name}
                    </h3>

                    {/* Specifications */}
                    <div className="space-y-1.5 mb-5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#aa8b5c] shrink-0" />
                        <span>Space: {room.unitSpace}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#aa8b5c] shrink-0" />
                        <span className="truncate">{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#aa8b5c] shrink-0" />
                        <span>{room.view}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#aa8b5c] shrink-0" />
                        <span>Up to {room.maxGuests} Guests • AC &amp; Attached Bath</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveRoomModal(room)}
                      className="text-[11px] font-bold tracking-wider uppercase text-slate-700 hover:text-[#aa8b5c] flex items-center gap-1 group/btn transition-colors cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-emerald-600 text-transparent" />
                      </a>

                      <button
                        onClick={() => openBookingModal({ roomId: room.id })}
                        className="px-3 py-2 rounded-xl bg-[#080f1e] hover:bg-[#121f3a] text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow hover:shadow-md"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regional Visitors Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121f3a] via-[#1a2b4d] to-[#121f3a] border border-[#c5a880]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#c5a880]/20 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-luxury text-xl text-white font-semibold">Special Packages for Lahore &amp; Pattoki Visitors</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                Planning a family reunion, birthday celebration, or corporate team outing? Get tailored group pricing and private dining arrangements on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${settings.phone}`}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors"
            >
              Call: {settings.phone}
            </a>
            <button
              onClick={() => openBookingModal()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
