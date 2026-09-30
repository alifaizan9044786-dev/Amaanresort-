import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Shield,
  ArrowRight,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, getWhatsAppBookingUrl, setIsAdminOpen } = useResort();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#050914] text-slate-400 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="flex items-center gap-3 group inline-block">
              <div className="w-11 h-11 rounded-full border border-[#c5a880] flex items-center justify-center bg-gradient-to-br from-[#121f3a] to-[#070d1b]">
                <span className="font-luxury text-2xl font-bold text-[#c5a880]">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-luxury text-2xl font-bold tracking-[0.2em] text-white uppercase leading-none">
                  Amaan
                </span>
                <span className="text-[10px] tracking-[0.35em] text-[#c5a880] uppercase mt-1">
                  Resorts &amp; Sanctuary
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Punjab's premier family vacation estate. Located on Main Multan Road (N-5) near Pattoki — only 45 minutes from Lahore. Features giant water slides, wave pool, executive red-brick cottages, and Aab-o-Dana multi-cuisine dining. Rated 4.8★ with 400+ positive reviews.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppBookingUrl({ notes: 'Footer WhatsApp inquiry' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600/30 hover:border-emerald-500/50 border border-white/10 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4 text-[#c5a880]" />
              </a>
              <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-[#c5a880] transition-colors">
                  About Amaan Resorts
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-[#c5a880] transition-colors">
                  Villas, Suites &amp; Cottages
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-[#c5a880] transition-colors">
                  Gourmet Dining &amp; Lounge
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-[#c5a880] transition-colors">
                  Leisure, Spa &amp; Activities
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#c5a880] transition-colors">
                  Honeymoon &amp; Family Packages
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a880] transition-colors">
                  Photo &amp; Video Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#c5a880] transition-colors">
                  Contact &amp; Reservations Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
              Reservations
            </h4>
            <div className="space-y-3 text-xs">
              <a href={`tel:${settings.phone}`} className="flex items-start gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={getWhatsAppBookingUrl({ notes: 'Footer WhatsApp inquiry' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-emerald-400 text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp Desk</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span className="truncate">{settings.email}</span>
              </div>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span className="line-clamp-2">View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Newsletter & Club (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
              Amaan Privileges Club
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Subscribe to receive private invitations, seasonal suite rate privileges, and complimentary spa vouchers.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Thank you! Privileges newsletter sent.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-[#121f3a] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#c5a880] outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#c5a880] hover:bg-[#aa8b5c] text-[#070d1b] font-bold text-xs rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">We respect your privacy. No spam.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar with Admin / Staff Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Amaan Resorts. All rights reserved. Luxury Nature &amp; Vacation Sanctuary.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#c5a880] transition-colors py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#c5a880]/30"
            >
              <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Resort Admin &amp; Staff Portal</span>
            </button>
            <a href="#home" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
