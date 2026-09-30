import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import aabODanaDiningImg from '../assets/images/aab_o_dana_dining_1790761264933.jpg';
import fountainRockCaveImg from '../assets/images/fountain_rock_cave_1790761307840.jpg';
import kidsFamilyLawnImg from '../assets/images/kids_family_lawn_1790761384628.jpg';
import { Sparkles, UtensilsCrossed, Clock, Wine, Flame, ChevronRight, MessageCircle } from 'lucide-react';

export const DiningSection: React.FC = () => {
  const { settings, getWhatsAppBookingUrl } = useResort();
  const [selectedVenue, setSelectedVenue] = useState<'aabodana' | 'buffet' | 'outdoor'>('aabodana');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [diningDate, setDiningDate] = useState('');
  const [diningGuests, setDiningGuests] = useState('4');
  const [diningTime, setDiningTime] = useState('20:00');
  const [diningVenueName, setDiningVenueName] = useState('Aab-o-Dana Multi Cuisine');

  const venues = [
    {
      id: 'aabodana',
      name: 'Aab-o-Dana Multi Cuisine',
      cuisine: 'Pakistani Delicacies, Live Barbecue & Continental Specialties',
      atmosphere: 'Modern glass-front dining with polished granite & views of waterpark',
      hours: 'Lunch: 01:00 PM - 04:30 PM | Dinner: 07:30 PM - 11:30 PM',
      image: aabODanaDiningImg,
      highlights: [
        'Live charcoal grilled mutton chops, chicken tikka & seekh kabab',
        'Traditional Lahori Handi, Biryani & freshly baked naan',
        'Continental chicken steaks, pasta & crispy appetizers',
      ],
    },
    {
      id: 'buffet',
      name: 'Executive Grand Buffet Hall',
      cuisine: 'Lavish Multi-Course Buffet & Salad Bar',
      atmosphere: 'Spacious banquet hall with designer lighting for families & tour groups',
      hours: 'Weekend Buffets & Special Group Bookings',
      image: aabODanaDiningImg,
      highlights: [
        'Tiered display of 15+ fresh organic garden salads & dressings',
        'Live soup counters, fried fish & hot appetizers',
        'Lavish traditional & western dessert buffet (Kheer, Gulab Jamun, Pastries)',
      ],
    },
    {
      id: 'outdoor',
      name: 'Lawn & Gazebo Evening Dining',
      cuisine: 'Live Barbecue Under the Stars & High Tea',
      atmosphere: 'Open-air green lawns facing illuminated rock waterfall & fountains',
      hours: 'High Tea: 04:30 PM - 07:00 PM | Night Barbecue: 08:00 PM onwards',
      image: kidsFamilyLawnImg,
      highlights: [
        'Private wooden gazebo seating for family privacy',
        'Doodh Patti chai, karak tea, pakoras & fresh samosas',
        'Starlit family dining with background fountain illumination',
      ],
    },
  ];

  const currentVenue = venues.find((v) => v.id === selectedVenue) || venues[0];

  const handleOpenReservation = (venueTitle: string) => {
    setDiningVenueName(venueTitle);
    setReservationModalOpen(true);
  };

  const getDiningWhatsAppUrl = () => {
    return getWhatsAppBookingUrl({
      notes: `Table Reservation & Menu Inquiry at *${diningVenueName}* at Amaan Resorts Pattoki for ${diningGuests} guests on ${diningDate || 'Upcoming visit'} at ${diningTime}.`,
    });
  };

  return (
    <section id="dining" className="py-24 bg-[#0b1325] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Cuisine Culinary Experience</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Aab-o-Dana <span className="italic text-[#c5a880]">Dining &amp; Buffets</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            From sizzling desi barbecue and steaming handis to continental steaks and lavish weekend buffets, our kitchen prepares fresh, hygienic gourmet meals for families visiting from Lahore, Pattoki, and Kasur.
          </p>
        </div>

        {/* Venue Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenue(venue.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2.5 cursor-pointer ${
                selectedVenue === venue.id
                  ? 'bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] shadow-xl shadow-[#c5a880]/20 scale-105'
                  : 'bg-[#121f3a]/60 hover:bg-[#121f3a] text-slate-300 border border-white/5'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>{venue.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Venue Showcase Card */}
        <div className="bg-[#080f1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
            <img
              src={currentVenue.image}
              alt={currentVenue.name}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block mb-1">
                {currentVenue.cuisine}
              </span>
              <h3 className="font-luxury text-2xl sm:text-3xl text-white font-normal mb-3">
                {currentVenue.name}
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                {currentVenue.atmosphere}
              </p>

              <div className="space-y-3 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span>{currentVenue.hours}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-8">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Menu &amp; Buffet Specialties:
                </span>
                {currentVenue.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs (NO DOLLAR SIGN) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenReservation(currentVenue.name)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer"
              >
                Reserve Family Table
              </button>

              <a
                href={getWhatsAppBookingUrl({
                  notes: `Assalam o Alaikum! Please send today's Aab-o-Dana dining menu and buffet rates for Amaan Resorts Pattoki.`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Menu</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Table Reservation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#080f1e] border border-[#c5a880]/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="font-luxury text-2xl text-white mb-1">Reserve Table at {diningVenueName}</h3>
            <p className="text-xs text-slate-400 mb-6">
              Amaan Resorts, Main Multan Road, Near Pattoki &amp; Lahore.
            </p>

            <div className="space-y-4 text-left">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={diningDate}
                  onChange={(e) => setDiningDate(e.target.value)}
                  className="w-full bg-[#121f3a] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Time</label>
                  <select
                    value={diningTime}
                    onChange={(e) => setDiningTime(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  >
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="17:00">05:00 PM (High Tea)</option>
                    <option value="20:00">08:00 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Barbecue)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Family Members</label>
                  <select
                    value={diningGuests}
                    onChange={(e) => setDiningGuests(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  >
                    <option value="2">2 Persons</option>
                    <option value="4">4-5 Family</option>
                    <option value="8">8-10 Members</option>
                    <option value="15">15+ Party</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={getDiningWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setReservationModalOpen(false)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => setReservationModalOpen(false)}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
