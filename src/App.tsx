/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResortProvider } from './context/ResortContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { RoomsSection } from './components/RoomsSection';
import { HighlightBanner } from './components/HighlightBanner';
import { DiningSection } from './components/DiningSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { PackagesSection } from './components/PackagesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RoomDetailModal } from './components/RoomDetailModal';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <ResortProvider>
      <div className="min-h-screen bg-[#070d1b] text-slate-100 flex flex-col font-sans selection:bg-[#c5a880] selection:text-[#070d1b]">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero with Search Widget & Feature Tiles */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Villas & Suites */}
          <RoomsSection />

          {/* Mid-page Destination Spotlight & Video Banner */}
          <HighlightBanner />

          {/* Culinary & Dining Experience */}
          <DiningSection />

          {/* Leisure & Activities */}
          <ActivitiesSection />

          {/* Luxury Promotional Packages */}
          <PackagesSection />

          {/* Gallery with Lightbox */}
          <GallerySection />

          {/* Guest Reviews & Testimonials */}
          <TestimonialsSection />

          {/* Location & Google Maps */}
          <LocationSection />

          {/* Contact & Direct Inquiries */}
          <ContactSection />
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Interactive Modals & Floating Tools */}
        <RoomDetailModal />
        <BookingModal />
        <AdminPanel />
        <FloatingWhatsApp />
      </div>
    </ResortProvider>
  );
}
