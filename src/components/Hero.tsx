import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import heroImg from '../assets/images/resort_hero_main_1790761188432.jpg';
import waterparkImg from '../assets/images/waterpark_slides_1790761234078.jpg';
import brickVillasImg from '../assets/images/brick_villas_1790761246711.jpg';
import aabODanaDiningImg from '../assets/images/aab_o_dana_dining_1790761264933.jpg';
import {
  Calendar,
  Users,
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Sparkles,
  Waves,
  Home,
  UtensilsCrossed,
  Star,
  MapPin,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { rooms, settings, openBookingModal, getWhatsAppBookingUrl } = useResort();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [selectedRoomId, setSelectedRoomId] = useState('all');
  const [adults, setAdults] = useState('2');
  const [kids, setKids] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      checkIn,
      checkOut,
      roomId: selectedRoomId === 'all' ? undefined : selectedRoomId,
      adults: parseInt(adults, 10),
      kids: parseInt(kids, 10),
    });
  };

  const heroWhatsAppUrl = getWhatsAppBookingUrl({
    checkIn,
    checkOut,
    roomName: selectedRoomId !== 'all' ? rooms.find((r) => r.id === selectedRoomId)?.name : 'Family Day Pass / Cottage Stay',
    guests: `${adults} Adults, ${kids} Kids`,
    notes: 'Direct inquiry from Lahore/Pattoki guest on website hero.',
  });

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-12 overflow-hidden bg-[#070d1b]">
      {/* Background cinematic imagery with real Amaan Resorts architecture */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Amaan Resorts Lahore Pattoki Waterpark and Cottages"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b] via-[#070d1b]/70 to-[#070d1b]/80" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Floating ambient glow */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#c5a880]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-[#1a2b4d]/40 blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center mt-4 mb-8">
        {/* 400+ Reviews & Regional Highlight Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#c5a880]/40 text-xs sm:text-sm text-[#e6d5b8] mb-6 shadow-xl">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-semibold text-white">400+ Positive Reviews</span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1 text-[#d8bd8a]">
            <MapPin className="w-3.5 h-3.5" /> 45 Mins from Lahore • Main Multan Road, Pattoki
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white max-w-5xl tracking-tight leading-[1.1] mb-5 drop-shadow-lg">
          Experience Luxury, Waterpark &amp; Nature at{' '}
          <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#f3e8d2] via-[#c5a880] to-[#e6d5b8]">
            Amaan Resorts
          </span>
        </h1>

        {/* Supporting regional text */}
        <p className="max-w-3xl text-slate-200 text-sm sm:text-lg md:text-xl font-light leading-relaxed mb-8 text-balance drop-shadow">
          The ultimate family retreat and weekend vacation destination for families in Lahore, Pattoki, Kasur, and Okara. Enjoy giant twisting water slides, wave pool, executive red-brick cottages, Aab-o-Dana multi-cuisine dining, and lush botanical lawns.
        </p>

        {/* Direct Action CTAs (No Dollar Signs) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => openBookingModal()}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(197,168,128,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Inquire Stay / Day Pass
          </button>

          <a
            href={heroWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Inquiry</span>
          </a>

          <a
            href={`tel:${settings.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#121f3a]/80 hover:bg-[#1a2b4d] border border-white/15 text-slate-200 hover:text-white font-medium text-xs backdrop-blur-md transition-all"
          >
            <Phone className="w-4 h-4 text-[#c5a880]" />
            <span>Call: {settings.phone}</span>
          </a>
        </div>

        {/* Inquiry-Based Availability & Booking Widget (NO DOLLAR SIGN) */}
        <div className="w-full max-w-5xl bg-[#080f1e]/90 backdrop-blur-xl border border-[#c5a880]/30 rounded-2xl shadow-2xl p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs gap-2">
            <span className="text-[#c5a880] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Check Dates &amp; Inquire Availability
            </span>
            <span className="text-slate-300 text-xs">
              Overnight Cottages • Waterpark Family Passes • Corporate Picnics
            </span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end text-left">
            {/* Arrival Date */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                Arrival / Visit Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#121f3a]/90 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
              />
            </div>

            {/* Departure Date */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                Departure Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#121f3a]/90 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
              />
            </div>

            {/* Accommodation or Day Pass */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                Stay / Experience Type
              </label>
              <div className="relative">
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#121f3a]/90 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Cottages &amp; Passes</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1 block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Family Members</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full bg-[#121f3a]/90 text-white text-xs px-2 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="6">6+ Adults</option>
                  <option value="15">15+ Group</option>
                </select>
                <select
                  value={kids}
                  onChange={(e) => setKids(e.target.value)}
                  className="w-full bg-[#121f3a]/90 text-white text-xs px-2 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                >
                  <option value="0">0 Kids</option>
                  <option value="2">2 Kids</option>
                  <option value="4">4 Kids</option>
                  <option value="8">8+ Kids</option>
                </select>
              </div>
            </div>

            {/* Send Inquiry Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer h-[42px]"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Inquire Availability</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick 3 Feature Highlights (Real Amaan Resorts Facilities) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Waterpark & Wave Pool */}
          <a
            href="#activities"
            className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:border-[#c5a880]/60 hover:-translate-y-1 block"
          >
            <img
              src={waterparkImg}
              alt="Waterpark and Wave Pool at Amaan Resorts"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/95 via-[#070d1b]/60 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/60 flex items-center justify-center backdrop-blur-md group-hover:bg-[#c5a880] group-hover:text-[#070d1b] text-[#c5a880] transition-colors">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-xl font-semibold text-white tracking-wide group-hover:text-[#e6d5b8] transition-colors">
                    Waterpark &amp; Wave Pool
                  </h3>
                  <p className="text-xs text-slate-300 font-light">Giant slides, splash bucket &amp; loungers</p>
                </div>
              </div>
            </div>
          </a>

          {/* Card 2: Executive Red-Brick Cottages */}
          <a
            href="#rooms"
            className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:border-[#c5a880]/60 hover:-translate-y-1 block"
          >
            <img
              src={brickVillasImg}
              alt="Executive Red-Brick Cottages at Amaan Resorts"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/95 via-[#070d1b]/60 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/60 flex items-center justify-center backdrop-blur-md group-hover:bg-[#c5a880] group-hover:text-[#070d1b] text-[#c5a880] transition-colors">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-xl font-semibold text-white tracking-wide group-hover:text-[#e6d5b8] transition-colors">
                    Executive Brick Cottages
                  </h3>
                  <p className="text-xs text-slate-300 font-light">Rooftop terraces &amp; private gardens</p>
                </div>
              </div>
            </div>
          </a>

          {/* Card 3: Aab-o-Dana Multi-Cuisine Dining */}
          <a
            href="#dining"
            className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:border-[#c5a880]/60 hover:-translate-y-1 block"
          >
            <img
              src={aabODanaDiningImg}
              alt="Aab-o-Dana Multi Cuisine Restaurant"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/95 via-[#070d1b]/60 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/60 flex items-center justify-center backdrop-blur-md group-hover:bg-[#c5a880] group-hover:text-[#070d1b] text-[#c5a880] transition-colors">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury text-xl font-semibold text-white tracking-wide group-hover:text-[#e6d5b8] transition-colors">
                    Aab-o-Dana Restaurant
                  </h3>
                  <p className="text-xs text-slate-300 font-light">Lavish buffets, grills &amp; Continental</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
