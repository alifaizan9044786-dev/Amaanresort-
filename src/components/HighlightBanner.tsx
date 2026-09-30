import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import waterparkImg from '../assets/images/waterpark_slides_1790761234078.jpg';
import fountainRockCaveImg from '../assets/images/fountain_rock_cave_1790761307840.jpg';
import poolReflectionImg from '../assets/images/pool_reflection_1790761368058.jpg';
import { Star, ArrowRight, Play, Sparkles, MapPin } from 'lucide-react';

export const HighlightBanner: React.FC = () => {
  const { openBookingModal } = useResort();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="py-16 bg-[#070d1b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dual Spotlight Cards (NO DOLLAR SIGNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spotlight 1: Giant Slides & Wave Pool */}
          <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src={waterparkImg}
              alt="Amaan Resorts Waterpark & Wave Pool"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/95 via-[#070d1b]/50 to-transparent flex flex-col justify-end p-6 sm:p-8 text-center items-center">
              <span className="font-luxury text-xl font-bold text-[#c5a880] mb-1">
                Family &amp; Group Day Pass
              </span>
              <h3 className="font-luxury text-xl sm:text-2xl text-white font-medium mb-1">
                Giant Water Slides &amp; Wave Pool
              </h3>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-xs text-slate-300 ml-1 font-sans">400+ Reviews</span>
              </div>
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-2 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#070d1b] transition-all cursor-pointer"
              >
                INQUIRE DAY PASS
              </button>
            </div>
          </div>

          {/* Spotlight 2: Nature Sanctuary & Reflection Pool */}
          <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src={poolReflectionImg}
              alt="Tranquil Reflection Pool at Amaan Resorts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/95 via-[#070d1b]/50 to-transparent flex flex-col justify-end p-6 sm:p-8 text-center items-center">
              <span className="font-luxury text-xl font-bold text-[#c5a880] mb-1">
                Overnight Staycation
              </span>
              <h3 className="font-luxury text-xl sm:text-2xl text-white font-medium mb-1">
                Executive Red-Brick Cottages
              </h3>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className="text-xs text-slate-300 ml-1 font-sans">Rated 4.8 ★</span>
              </div>
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-2 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#070d1b] transition-all cursor-pointer"
              >
                INQUIRE COTTAGE STAY
              </button>
            </div>
          </div>
        </div>

        {/* Grand Panoramic Rock Waterfall Banner (Real Amaan Architecture) */}
        <div className="relative rounded-3xl overflow-hidden border border-[#c5a880]/30 shadow-2xl min-h-[460px] flex items-center justify-center p-6 sm:p-12 text-center group">
          <img
            src={fountainRockCaveImg}
            alt="Monumental Waterfall Rock Cave at Amaan Resorts"
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b] via-[#070d1b]/70 to-[#070d1b]/60" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Regional Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c5a880] text-[#070d1b] font-bold text-xs uppercase tracking-wider mb-4 shadow-lg">
              <MapPin className="w-3.5 h-3.5" /> 45 Minutes from Lahore • Main Multan Road, Pattoki
            </div>

            <h3 className="font-luxury text-2xl sm:text-4xl lg:text-5xl font-normal text-white mb-3 tracking-tight">
              Amaan Signature Waterfall &amp; 50-Acre Nature Park
            </h3>

            {/* 5-star rating */}
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-200 ml-2 font-sans font-medium">
                400+ Verified Positive Reviews by Lahore &amp; Pattoki Guests
              </span>
            </div>

            <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-2xl text-balance">
              Featuring monumental rock architecture, a high-altitude water fountain jet, vast manicured lawns with wooden seating, and a sprawling botanical sanctuary designed for peaceful family time.
            </p>

            <button
              onClick={() => openBookingModal()}
              className="px-8 py-3 rounded-full border-2 border-white/80 hover:border-[#c5a880] text-white hover:bg-white hover:text-[#070d1b] text-xs uppercase tracking-[0.25em] font-bold transition-all shadow-xl cursor-pointer"
            >
              SEND RESERVATION INQUIRY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
