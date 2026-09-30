import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { MessageCircle, X, Send, Sparkles, Phone } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, getWhatsAppBookingUrl } = useResort();
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const quickPrompts = [
    'Waterpark family day pass rates & timings',
    'Executive red-brick cottage overnight stay inquiry',
    'Aab-o-Dana restaurant buffet & table booking',
    'Padel tennis & corporate picnic booking',
  ];

  const handleSendCustom = (customText?: string) => {
    const textToSend = customText || quickMessage || 'Hello Amaan Resorts concierge! I would like to inquire about booking.';
    const url = getWhatsAppBookingUrl({ notes: textToSend });
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setQuickMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#080f1e] border border-[#c5a880]/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                  <span className="font-luxury font-bold text-white text-base">A</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-900" />
              </div>
              <div>
                <h4 className="font-luxury font-semibold text-sm leading-tight">Amaan Concierge</h4>
                <span className="text-[11px] text-emerald-200 block">Online • Typically replies in 2 mins</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#080f1e] space-y-3">
            <div className="bg-[#121f3a]/80 p-3 rounded-2xl rounded-tl-none border border-white/10 text-xs text-slate-200">
              <p className="font-medium text-white mb-1">Welcome to Amaan Resorts! 🌴</p>
              <p className="text-slate-300 font-light">
                How may our concierge assist your stay today? Choose a quick question below or message directly.
              </p>
            </div>

            {/* Quick choices */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                Quick Inquiries:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendCustom(prompt)}
                  className="w-full text-left text-xs p-2.5 rounded-xl bg-white/5 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-white/5 text-slate-200 transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <span className="text-[#c5a880] group-hover:text-emerald-400 font-bold ml-1">→</span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustom()}
                  className="w-full bg-[#121f3a] text-xs text-white pl-3.5 pr-10 py-2.5 rounded-xl border border-white/10 focus:border-emerald-400 outline-none"
                />
                <button
                  onClick={() => handleSendCustom()}
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Phone direct option */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
              <span>Need immediate voice assistance?</span>
              <a href={`tel:${settings.phone}`} className="text-[#c5a880] font-semibold flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_6px_35px_rgba(16,185,129,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="WhatsApp Chat"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          {/* Notification Ping Badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c5a880] rounded-full border-2 border-[#070d1b] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c5a880] rounded-full border-2 border-[#070d1b]" />
        </div>

        <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline">
          WhatsApp Desk
        </span>
      </button>
    </div>
  );
};
