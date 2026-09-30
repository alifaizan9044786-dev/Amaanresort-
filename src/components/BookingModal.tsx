import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import {
  X,
  Calendar,
  Users,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

interface Privilege {
  id: string;
  name: string;
  description: string;
}

const availablePrivileges: Privilege[] = [
  {
    id: 'priv-1',
    name: 'Aab-o-Dana Executive Buffet Lunch / Dinner',
    description: 'Fresh salad bar, live barbecue, continental & Pakistani dishes',
  },
  {
    id: 'priv-2',
    name: 'Padel Tennis or Cricket Turf Slot',
    description: 'Reserved court slot with safety netting, turf & equipment',
  },
  {
    id: 'priv-3',
    name: 'Private Poolside Gazebo Setup',
    description: 'Exclusive shaded gazebo with table service for family picnic',
  },
  {
    id: 'priv-4',
    name: 'Dedicated Golf Buggy Chauffeur',
    description: 'Personal resort buggy driver throughout your stay',
  },
];

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingParams,
    rooms,
    packages,
    settings,
    addInquiry,
    getWhatsAppBookingUrl,
  } = useResort();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedType, setSelectedType] = useState<'room' | 'package'>('room');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(2);
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);

  // Guest Details
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestCity, setGuestCity] = useState<string>('Lahore');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmed booking state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Initialize from parameters
  useEffect(() => {
    if (isBookingModalOpen) {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

      setCheckIn(bookingParams.checkIn || today);
      setCheckOut(bookingParams.checkOut || tomorrow);

      if (bookingParams.packageId) {
        setSelectedType('package');
        setSelectedPackageId(bookingParams.packageId);
      } else {
        setSelectedType('room');
        setSelectedRoomId(bookingParams.roomId || (rooms.length > 0 ? rooms[0].id : ''));
      }

      if (bookingParams.adults) setAdults(bookingParams.adults);
      if (bookingParams.kids) setKids(bookingParams.kids);
      setStep(1);
    }
  }, [isBookingModalOpen, bookingParams, rooms]);

  if (!isBookingModalOpen) return null;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  const selectedPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

  const togglePrivilege = (id: string) => {
    setSelectedPrivileges((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleFinishBooking = (source: 'Online Form' | 'WhatsApp Direct') => {
    const bookingName = selectedType === 'room' ? selectedRoom?.name : selectedPackage?.title;

    const inq = addInquiry({
      guestName: guestName || 'Family Guest',
      phone: guestPhone || settings.phone,
      email: guestEmail || `${guestCity.toLowerCase()}@amaanresorts.com`,
      checkIn,
      checkOut,
      roomId: selectedType === 'room' ? selectedRoom?.id : undefined,
      roomName: selectedType === 'room' ? selectedRoom?.name : undefined,
      packageId: selectedType === 'package' ? selectedPackage?.id : undefined,
      packageName: selectedType === 'package' ? selectedPackage?.title : undefined,
      adults,
      kids,
      totalNights: nights,
      specialRequests: `City: ${guestCity}. ${specialRequests ? specialRequests + '. ' : ''}Preferences: ${
        selectedPrivileges.length > 0 ? selectedPrivileges.join(', ') : 'Standard package'
      }`,
      source,
      status: 'Confirmed',
    });

    setConfirmedBookingId(inq.id);
    setStep(4);

    if (source === 'WhatsApp Direct') {
      const summaryText = `*AMAAN RESORTS PATTOKI - INQUIRY REF #${inq.id}*\n\n` +
        `👤 *Guest Name:* ${guestName || 'Guest'}\n` +
        `📍 *City:* ${guestCity}\n` +
        `📞 *Phone:* ${guestPhone}\n` +
        `🏨 *Booking Request:* ${bookingName}\n` +
        `📅 *Dates:* ${checkIn} to ${checkOut} (${nights} night(s))\n` +
        `👥 *Family Count:* ${adults} Adults, ${kids} Children\n` +
        (selectedPrivileges.length > 0 ? `✨ *Addons:* ${selectedPrivileges.join(', ')}\n` : '') +
        (specialRequests ? `📝 *Notes:* ${specialRequests}\n` : '') +
        `\nAssalam o Alaikum! Please confirm package rates, waterpark passes, and room availability.`;

      const url = getWhatsAppBookingUrl({ notes: summaryText });
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={closeBookingModal} />

      {/* Wizard Modal */}
      <div className="relative z-10 w-full max-w-3xl bg-[#080f1e] border border-[#c5a880]/40 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070d1b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#c5a880] flex items-center justify-center bg-[#121f3a]">
              <span className="font-luxury text-sm font-bold text-[#c5a880]">A</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold block">
                Amaan Resorts • Pattoki &amp; Lahore Desk
              </span>
              <h3 className="font-luxury text-xl text-white font-medium">
                {step === 4 ? 'Inquiry Submitted' : 'Booking & Rate Inquiry'}
              </h3>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator (NO DOLLAR SIGN) */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-white/10 bg-[#0a1224] text-xs">
            <button
              onClick={() => setStep(1)}
              className={`py-3 px-4 font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${
                step === 1 ? 'bg-[#c5a880] text-[#070d1b]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>1. Stay &amp; Dates</span>
            </button>
            <button
              onClick={() => step > 1 && setStep(2)}
              className={`py-3 px-4 font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${
                step === 2 ? 'bg-[#c5a880] text-[#070d1b]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>2. Activities &amp; Meals</span>
            </button>
            <button
              onClick={() => step > 2 && setStep(3)}
              className={`py-3 px-4 font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${
                step === 3 ? 'bg-[#c5a880] text-[#070d1b]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>3. Guest Details</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* STEP 1: Select Stay & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Type Switcher */}
              <div className="flex gap-3 p-1 bg-white/5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedType('room')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedType === 'room'
                      ? 'bg-[#c5a880] text-[#070d1b] shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Cottages &amp; Suites
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('package')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedType === 'package'
                      ? 'bg-[#c5a880] text-[#070d1b] shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Family &amp; Group Packages
                </button>
              </div>

              {/* Selection Dropdown */}
              {selectedType === 'room' ? (
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                    Choose Your Cottage / Suite
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          selectedRoomId === room.id
                            ? 'bg-[#121f3a] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-luxury text-sm text-white font-medium block truncate">
                            {room.name}
                          </span>
                          <span className="text-xs text-emerald-400 font-semibold block">
                            {room.pricingLabel || 'Rates on Inquiry'}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">{room.view}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                    Choose Resort Package
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          selectedPackageId === pkg.id
                            ? 'bg-[#121f3a] border-[#c5a880] ring-1 ring-[#c5a880]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-luxury text-sm text-white font-medium block truncate">
                            {pkg.title}
                          </span>
                          <span className="text-xs text-[#c5a880] font-semibold block">
                            {pkg.duration}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">{pkg.idealFor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                    className="w-full bg-[#121f3a] text-white text-xs px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={4}>4 Adults</option>
                    <option value={6}>6+ Adults</option>
                    <option value={15}>15+ Group</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Children
                  </label>
                  <select
                    value={kids}
                    onChange={(e) => setKids(parseInt(e.target.value, 10))}
                    className="w-full bg-[#121f3a] text-white text-xs px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  >
                    <option value={0}>0 Children</option>
                    <option value={2}>2 Children</option>
                    <option value={4}>4 Children</option>
                    <option value={8}>8+ Children</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Preferences & Meals */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-luxury text-xl text-white font-medium mb-1">
                  Optional Meals &amp; Activities
                </h4>
                <p className="text-xs text-slate-400">
                  Select activities or dining preferences to include in your inquiry package.
                </p>
              </div>

              <div className="space-y-3">
                {availablePrivileges.map((priv) => {
                  const isSelected = selectedPrivileges.includes(priv.name);
                  return (
                    <div
                      key={priv.id}
                      onClick={() => togglePrivilege(priv.name)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#121f3a] border-[#c5a880] shadow-md'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#c5a880] text-[#070d1b]'
                              : 'border border-white/20 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">{priv.name}</span>
                          <span className="text-xs text-slate-400 font-light">{priv.description}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-emerald-400 shrink-0 ml-4">
                        Include in Quote
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact (NO DOLLAR SIGN) */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-luxury text-xl text-white font-medium mb-1">Primary Guest Information</h4>
                <p className="text-xs text-slate-400">
                  We will share direct rates, waterpark passes, and cottage availability immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Rehman"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03100007906"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Your City / Location
                  </label>
                  <select
                    value={guestCity}
                    onChange={(e) => setGuestCity(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Pattoki">Pattoki</option>
                    <option value="Kasur">Kasur</option>
                    <option value="Raiwind">Raiwind</option>
                    <option value="Okara">Okara</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                    Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Extra bedding, waterpark passes, Aab-o-Dana lunch buffet timing, arrival notes..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Inquiry Summary Box (NO DOLLAR SIGN) */}
              <div className="p-4 rounded-2xl bg-[#121f3a]/80 border border-[#c5a880]/30 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Requested Selection:</span>
                  <span className="font-semibold text-white">
                    {selectedType === 'room' ? selectedRoom?.name : selectedPackage?.title}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Visit Duration &amp; Dates:</span>
                  <span className="font-semibold text-white">
                    {checkIn} to {checkOut} ({nights} night(s))
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Family Count:</span>
                  <span className="font-semibold text-white">
                    {adults} Adults, {kids} Children from {guestCity}
                  </span>
                </div>

                {selectedPrivileges.length > 0 && (
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Add-ons:</span>
                    <span className="text-[#c5a880]">{selectedPrivileges.join(', ')}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-300">Pricing Model:</span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                    Official Quotation on WhatsApp / Call
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                  Inquiry Assigned • Ref #{confirmedBookingId}
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl text-white">
                  Thank You, {guestName || 'Valued Guest'}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light mt-1">
                  Your inquiry has been received by our reservations team for Amaan Resorts, Main Multan Road, Pattoki.
                </p>
              </div>

              {/* Inquiry Details Card */}
              <div className="max-w-md mx-auto bg-[#070d1b] border border-[#c5a880]/40 rounded-2xl p-5 text-left text-xs space-y-2.5 shadow-xl">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Request:</span>
                  <span className="text-white font-semibold">
                    {selectedType === 'room' ? selectedRoom?.name : selectedPackage?.title}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Dates:</span>
                  <span className="text-white font-semibold">
                    {checkIn} to {checkOut} ({nights} nights)
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Family &amp; City:</span>
                  <span className="text-white font-semibold">
                    {adults} Adults, {kids} Children • {guestCity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Direct Desk Phone:</span>
                  <span className="text-white font-mono">{settings.phoneDisplay}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => handleFinishBooking('WhatsApp Direct')}
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Summary</span>
                </button>

                <button
                  onClick={closeBookingModal}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 bg-[#070d1b] border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white transition-colors"
              >
                ← Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">
                Pattoki &amp; Lahore Direct Reservation
              </span>
            )}

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev + 1) as any)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleFinishBooking('WhatsApp Direct')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFinishBooking('Online Form')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
