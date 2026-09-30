import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { Phone, MessageCircle, Menu, X, Shield, CalendarCheck, Star } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, openBookingModal, getWhatsAppBookingUrl, setIsAdminOpen } = useResort();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Cottages & Suites', href: '#rooms' },
    { label: 'Waterpark', href: '#activities' },
    { label: 'Aab-o-Dana Dining', href: '#dining' },
    { label: 'Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Location Map', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro info announcement bar */}
      <div className="bg-[#050914] border-b border-white/5 text-xs text-slate-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 tracking-wider uppercase text-[11px] text-[#c5a880] font-medium">
              <span className="flex text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
                <Star className="w-3 h-3 fill-amber-400" />
              </span>
              <span>400+ Positive Reviews • Pattoki &amp; Lahore's Premier Family Waterpark &amp; Resort</span>
            </span>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Direct Desk: {settings.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-400">Quick 45-Min Drive from Lahore (Thokar Niaz Baig)</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 text-slate-400 hover:text-[#c5a880] transition-colors py-0.5 px-2 rounded bg-white/5 hover:bg-white/10"
              title="Open Resort Staff & Admin Dashboard"
            >
              <Shield className="w-3 h-3 text-[#c5a880]" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`fixed top-0 md:top-[33px] left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080f1ed9] backdrop-blur-md py-3 shadow-2xl border-b border-[#c5a880]/20'
            : 'bg-gradient-to-b from-[#070d1b]/95 via-[#070d1b]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#c5a880]/70 flex items-center justify-center bg-gradient-to-br from-[#1a2b4d] to-[#070d1b] shadow-inner group-hover:border-[#c5a880] transition-colors">
              <span className="font-luxury text-xl font-bold text-[#c5a880] tracking-widest">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-luxury text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#e6d5b8] transition-colors uppercase leading-none">
                Amaan
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#c5a880] uppercase font-light mt-1">
                Resorts • Lahore &amp; Pattoki
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-200 hover:text-[#c5a880] tracking-wider transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c5a880] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppBookingUrl({ notes: 'Assalam o Alaikum! I would like to inquire about Amaan Resorts Pattoki (Waterpark / Cottages / Day Pass).' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 hover:border-emerald-400 transition-all shadow-sm group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Inquiry</span>
            </a>

            {/* Primary Inquiry CTA */}
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#070d1b] bg-gradient-to-r from-[#d8bd8a] via-[#c5a880] to-[#aa8b5c] hover:opacity-95 hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all transform active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book / Inquire</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => openBookingModal()}
              className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase text-[#070d1b] bg-[#c5a880] sm:hidden"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#080f1e] border-l border-[#c5a880]/20 p-6 flex flex-col justify-between transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-[#c5a880] flex items-center justify-center bg-[#121f3a]">
                  <span className="font-luxury font-bold text-[#c5a880]">A</span>
                </div>
                <div>
                  <span className="font-luxury text-lg font-bold tracking-widest text-white block leading-none">
                    AMAAN RESORTS
                  </span>
                  <span className="text-[9px] tracking-widest text-[#c5a880] uppercase">Lahore &amp; Pattoki</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-slate-200 hover:text-[#c5a880] hover:translate-x-1 transition-all py-1.5 font-medium border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 text-slate-200 text-xs font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c5a880]" />
              <span>Call: {settings.phone}</span>
            </a>

            <a
              href={getWhatsAppBookingUrl({ notes: 'Mobile navigation inquiry from Lahore/Pattoki guest' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Inquire / Reserve Stay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
