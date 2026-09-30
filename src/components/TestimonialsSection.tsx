import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Award, ThumbsUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useResort();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#070d1b] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Experiences</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            400+ Verified <span className="italic text-[#c5a880]">Positive Reviews</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Rated 4.8 out of 5 stars by hundreds of families, couples, school tours, and corporate groups from Lahore, Pattoki, Kasur, and surrounding cities.
          </p>

          {/* Review Score Counter Badges */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-2xl font-bold font-luxury text-amber-400">4.8</span>
              <div className="flex flex-col text-left">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Average Rating</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-2xl font-bold font-luxury text-emerald-400">400+</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white">Google &amp; Social Reviews</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Verified Guests</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-2xl font-bold font-luxury text-[#c5a880]">98%</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white">Family Recommendation</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Top Rated in Punjab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Spotlight Slider */}
        <div className="max-w-4xl mx-auto bg-[#080f1e] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl relative">
          <Quote className="w-16 h-16 text-[#c5a880]/15 absolute top-6 right-8 pointer-events-none" />

          {/* Testimonial Content */}
          <div className="relative z-10">
            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-6 text-amber-400">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
              <span className="text-xs text-slate-400 ml-2 font-light">
                Verified Stay • {testimonials[currentIndex].stayType}
              </span>
            </div>

            {/* Comment Text */}
            <p className="text-white text-base sm:text-xl font-light font-luxury italic leading-relaxed mb-8">
              "{testimonials[currentIndex].comment}"
            </p>

            {/* Guest Identity & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].guestName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#c5a880]/50"
                />
                <div>
                  <h4 className="font-luxury text-lg text-white font-medium">
                    {testimonials[currentIndex].guestName}
                  </h4>
                  <div className="text-xs text-[#c5a880] flex items-center gap-1.5">
                    <span>{testimonials[currentIndex].location}</span>
                    <span>•</span>
                    <span className="text-slate-400">{testimonials[currentIndex].roomName}</span>
                  </div>
                </div>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  0{currentIndex + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Testimonial Cards Grid Below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-[#121f3a]/80 border-[#c5a880]/60 shadow-xl'
                  : 'bg-[#080f1e]/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 font-light line-clamp-3 mb-3 leading-relaxed">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src={t.avatar}
                  alt={t.guestName}
                  className="w-8 h-8 rounded-full object-cover border border-[#c5a880]/40"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">{t.guestName}</span>
                  <span className="text-[10px] text-slate-400">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
