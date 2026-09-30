import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle,
  Calendar,
  Users,
  Star,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, addInquiry, rooms, getWhatsAppBookingUrl } = useResort();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [roomId, setRoomId] = useState('all');
  const [adults, setAdults] = useState('2');
  const [kids, setKids] = useState('2');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmitOnline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const selectedRoom = rooms.find((r) => r.id === roomId);

    const inq = addInquiry({
      guestName: name,
      phone,
      email: email || `${city.toLowerCase()}@amaanresorts.com`,
      checkIn,
      checkOut,
      roomId: selectedRoom?.id,
      roomName: selectedRoom?.name || 'Waterpark & Cottage Inquiry',
      adults: parseInt(adults, 10),
      kids: parseInt(kids, 10),
      totalNights: 1,
      specialRequests: `City: ${city}. ${message}`,
      source: 'Online Form',
      status: 'Pending',
    });

    setSubmissionId(inq.id);
    setIsSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const selectedRoom = rooms.find((r) => r.id === roomId);
    const url = getWhatsAppBookingUrl({
      guestName: name || 'Valued Guest',
      roomName: selectedRoom?.name || 'Waterpark / Cottage Stay',
      checkIn,
      checkOut,
      guests: `${adults} Adults, ${kids} Children from ${city}`,
      notes: message || 'Assalam o Alaikum! Please provide package rates, waterpark passes, and cottage availability.',
    });

    // Also record lead in system
    addInquiry({
      guestName: name || 'WhatsApp Guest',
      phone: phone || settings.phone,
      email: email || `${city.toLowerCase()}@whatsapp.lead`,
      checkIn,
      checkOut,
      roomName: selectedRoom?.name || 'WhatsApp Inquiry',
      adults: parseInt(adults, 10),
      kids: parseInt(kids, 10),
      totalNights: 1,
      specialRequests: `City: ${city}. Notes: ${message}`,
      source: 'WhatsApp Direct',
      status: 'Pending',
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-[#070d1b] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information & Regional Focus */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lahore &amp; Pattoki Reservations</span>
              </div>
              <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-4">
                Plan Your <span className="italic text-[#c5a880]">Family Visit</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Connect directly with our reservation managers on phone or WhatsApp. We provide instant rates, family passes, cottage booking, and directions.
              </p>
            </div>

            {/* 400+ Reviews Social Proof Notice */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3.5">
              <div className="flex text-amber-400 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-amber-200">
                Over <strong>400+ 5-Star Reviews</strong> from satisfied families across Lahore, Kasur, and Pattoki!
              </span>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Phone card */}
              <a
                href={`tel:${settings.phone}`}
                className="p-5 rounded-2xl bg-[#080f1e] border border-white/10 hover:border-[#c5a880]/50 transition-all flex items-center gap-4 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#070d1b] transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Direct Call Reservations (24/7)
                  </span>
                  <span className="font-luxury text-xl sm:text-2xl text-white font-semibold group-hover:text-[#e6d5b8] transition-colors">
                    {settings.phoneDisplay}
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Click to speak directly with resort manager
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={getWhatsAppBookingUrl({ notes: 'Assalam o Alaikum! Inquiring from website for Amaan Resorts Pattoki.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-4 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
                    Instant WhatsApp Desk
                  </span>
                  <span className="font-luxury text-xl sm:text-2xl text-white font-semibold group-hover:text-emerald-200 transition-colors">
                    +92 310 0007906
                  </span>
                  <span className="text-xs text-emerald-300/80 block mt-0.5">
                    Instant photos, cottage rates, and location pin
                  </span>
                </div>
              </a>

              {/* Address Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Physical Address:</span>
                  <span>{settings.address}</span>
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c5a880] block mt-1 hover:underline"
                  >
                    Open Google Maps Link →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (NO DOLLAR SIGN) */}
          <div className="lg:col-span-7 bg-[#080f1e] border border-[#c5a880]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-luxury text-2xl sm:text-3xl text-white">Inquiry Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your inquiry reference (Ref: #{submissionId}) has been assigned to our Pattoki reservations desk.
                </p>
                <div className="p-4 rounded-2xl bg-[#121f3a]/60 border border-white/10 text-xs text-slate-300 max-w-md mx-auto text-left space-y-1">
                  <div><strong>Guest City:</strong> {city}</div>
                  <div><strong>Visit Dates:</strong> {checkIn} to {checkOut}</div>
                  <div><strong>Family:</strong> {adults} Adults, {kids} Children</div>
                  <div><strong>Phone:</strong> {phone}</div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Speed Up on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setMessage('');
                    }}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitOnline} className="space-y-4">
                <div>
                  <h3 className="font-luxury text-2xl text-white font-medium mb-1">
                    Send Booking &amp; Rate Inquiry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill in your details or message directly on WhatsApp for instant response.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imran Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03100007906"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* City & Accommodation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Your City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-3 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Pattoki">Pattoki</option>
                      <option value="Kasur">Kasur</option>
                      <option value="Raiwind">Raiwind</option>
                      <option value="Okara">Okara</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Sheikhupura">Sheikhupura</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Interested In
                    </label>
                    <select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-3 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none cursor-pointer"
                    >
                      <option value="all">Waterpark Day Pass &amp; Cottages</option>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Visit / Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="6">6+ Adults</option>
                      <option value="20">20+ Tour Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                      Children
                    </label>
                    <select
                      value={kids}
                      onChange={(e) => setKids(e.target.value)}
                      className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                    >
                      <option value="0">0 Children</option>
                      <option value="2">2 Children</option>
                      <option value="4">4 Children</option>
                      <option value="8">8+ Children</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1.5 font-medium">
                    Questions or Special Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g., family picnic, school outing, Aab-o-Dana lunch buffet, padel tennis booking..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none transition-all placeholder:text-slate-500 resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
