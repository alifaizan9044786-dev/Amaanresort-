import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import {
  X,
  Check,
  Calendar,
  Users,
  Maximize2,
  Bed,
  Eye,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

export const RoomDetailModal: React.FC = () => {
  const { activeRoomModal, setActiveRoomModal, openBookingModal, getWhatsAppBookingUrl, settings } = useResort();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeRoomModal) return null;

  const room = activeRoomModal;
  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsAppUrl = getWhatsAppBookingUrl({
    roomName: room.name,
    notes: `Inquiring about ${room.name} at Amaan Resorts Pattoki. Please share rates, packages, and availability for my family.`,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setActiveRoomModal(null)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#080f1e] border border-[#c5a880]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070d1b]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
              {room.category} • Amaan Resorts, Multan Road, Pattoki
            </span>
            <h3 className="font-luxury text-xl sm:text-2xl text-white font-medium">{room.name}</h3>
          </div>
          <button
            onClick={() => setActiveRoomModal(null)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Gallery Carousel */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden group">
            <img
              src={images[activeImageIndex]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImageIndex === i ? 'bg-[#c5a880] w-6' : 'bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {room.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#c5a880] text-[#070d1b] uppercase tracking-wider shadow-lg">
                {room.badge}
              </span>
            )}
          </div>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Maximize2 className="w-4 h-4 text-[#c5a880]" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Space</span>
                <span className="text-xs font-semibold text-white">{room.unitSpace}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Bed className="w-4 h-4 text-[#c5a880]" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Bed Type</span>
                <span className="text-xs font-semibold text-white truncate max-w-[120px]">{room.bedType}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#c5a880]" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Capacity</span>
                <span className="text-xs font-semibold text-white">Up to {room.maxGuests} Guests</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Eye className="w-4 h-4 text-[#c5a880]" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">View</span>
                <span className="text-xs font-semibold text-white truncate max-w-[120px]">{room.view}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-luxury text-lg text-white mb-2">About This Cottage / Suite</h4>
            <p className="text-slate-300 text-sm font-light leading-relaxed">{room.description}</p>
          </div>

          {/* Features Checklist */}
          <div>
            <h4 className="font-luxury text-lg text-white mb-3">Inclusions &amp; Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Badges */}
          <div>
            <h4 className="font-luxury text-lg text-white mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="p-4 rounded-xl bg-[#121f3a]/60 border border-white/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white block mb-0.5">Family &amp; Group Hospitality Guarantee</span>
              24/7 power backup generators, ice-cold split inverter air conditioning, secure walled compound with guards, and dedicated golf buggy service across the resort grounds.
            </div>
          </div>
        </div>

        {/* Footer Actions (NO DOLLAR SIGN) */}
        <div className="px-6 py-4 bg-[#070d1b] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 border border-emerald-500/40">
              {room.pricingLabel || 'Rates on Inquiry'}
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              Best price guaranteed for Lahore, Pattoki &amp; Kasur families
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Inquire on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setActiveRoomModal(null);
                openBookingModal({ roomId: room.id });
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] text-[#070d1b] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[#c5a880]/30 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire Availability</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
