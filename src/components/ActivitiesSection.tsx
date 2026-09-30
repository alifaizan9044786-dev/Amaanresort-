import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Sparkles, Compass, Clock, CheckCircle2, MessageCircle } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const { activities, getWhatsAppBookingUrl } = useResort();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Waterpark', 'Sports', 'Nature', 'Dining', 'Resort'];

  const filtered =
    activeFilter === 'All'
      ? activities
      : activities.filter((act) => act.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="activities" className="py-24 bg-[#080f1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Day Family Entertainment</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Waterpark, Sports &amp; <span className="italic text-[#c5a880]">Activities</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              From giant twisting water slides and kids splash fortresses to floodlit cricket cages and padel tennis courts — there is endless adventure for every age.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121f3a]/60 p-1.5 rounded-2xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#c5a880] text-[#070d1b] shadow'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Leisure & Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((activity) => {
            const whatsAppUrl = getWhatsAppBookingUrl({
              notes: `Activity Inquiry: I would like to inquire about "${activity.title}" at Amaan Resorts Pattoki.`,
            });

            return (
              <div
                key={activity.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between border border-slate-100"
              >
                {/* Thumbnail Image */}
                <div className="h-44 relative overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#080f1e]/85 backdrop-blur-md text-[#d8bd8a]">
                    {activity.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between text-slate-800">
                  <div>
                    <h3 className="font-luxury text-base font-bold text-slate-900 group-hover:text-[#aa8b5c] transition-colors leading-snug mb-1.5 line-clamp-1">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed mb-3">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#aa8b5c]" />
                      <span>{activity.timing}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {activity.pricing}
                    </span>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-[#080f1e] hover:text-[#aa8b5c] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire</span>
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
