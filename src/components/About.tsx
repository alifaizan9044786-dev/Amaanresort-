import React from 'react';
import { useResort } from '../context/ResortContext';
import brickVillasImg from '../assets/images/brick_villas_1790761246711.jpg';
import entranceMonumentImg from '../assets/images/entrance_monument_1790761338792.jpg';
import { Sparkles, Award, ShieldCheck, HeartHandshake, ArrowRight, Star, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const { openBookingModal } = useResort();

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#0b1325] relative overflow-hidden border-t border-b border-white/5">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1a2b4d]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Real Photography of Amaan Resorts */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={brickVillasImg}
                alt="Amaan Resorts Executive Red Brick Cottages Pattoki Lahore"
                className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/70 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge with 400+ Reviews */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 z-20 bg-[#080f1e]/95 backdrop-blur-md border border-[#c5a880]/40 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-[280px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex text-amber-400 text-xs mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-bold font-luxury text-white">400+ Positive Reviews</div>
                  <div className="text-[10px] tracking-wider text-[#c5a880] uppercase">4.8 ★ Google &amp; Guest Rated</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Ranked #1 family waterpark &amp; luxury resort destination for Lahore, Pattoki, and Kasur residents.
              </p>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-40 h-40 border-t-2 border-l-2 border-[#c5a880]/40 rounded-tl-3xl pointer-events-none" />
          </div>

          {/* Right Column: Detailed Article about Amaan Resorts */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Nature &amp; Waterpark Haven</span>
            </div>

            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.2] mb-6">
              Welcome to <span className="italic text-[#e6d5b8]">Amaan Resorts</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-5">
              Nestled along Main Multan Road near Pattoki — only a comfortable <strong>45-minute drive from Lahore's Thokar Niaz Baig</strong> — Amaan Resorts is Punjab's most comprehensive family vacation estate, spanning over 50 acres of lush botanical orchards, palm groves, and crystal-blue aquatic facilities.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Designed specifically for families, school and college outings, corporate offsites, and couples seeking a serene break from urban smog and traffic. Amaan Resorts combines an electrifying full-scale <strong>Waterpark &amp; Wave Pool</strong> with private <strong>Executive Red-Brick Cottages</strong>, authentic fine dining at <strong>Aab-o-Dana Multi-Cuisine Restaurant</strong>, and modern sports facilities like Padel Tennis and Cricket net cages.
            </p>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c5a880]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-1">Executive Brick Cottages</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Private rooftop terraces, exposed brick aesthetic, split inverter cooling, and lush lawn gardens.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c5a880]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-1">Thrilling Waterpark &amp; Wave Pool</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Giant water slides, kids water splash fortress, wave pool, and certified family lifeguards.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c5a880]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 mb-2">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-1">Aab-o-Dana Multi Cuisine</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Lavish live barbecue, Pakistani handi, continental dishes, fresh breakfast, and chef buffets.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#c5a880]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-xs sm:text-sm mb-1">Padel &amp; Cricket Sports Arena</h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Modern padel tennis, floodlit cricket turf cages, jogging tracks, and electric buggy tours.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] text-[#070d1b] font-bold text-xs tracking-wider uppercase shadow-lg hover:opacity-95 transition-all"
              >
                <span>View Cottages &amp; Suites</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>Inquire Day Pass / Stay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
