import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, activeLightboxIndex, setActiveLightboxIndex } = useResort();
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Waterpark', 'Cottages', 'Dining', 'Sports', 'Nature', 'Resort'];

  const filteredItems =
    activeTab === 'All'
      ? gallery
      : gallery.filter((item) => item.category.toLowerCase() === activeTab.toLowerCase());

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % gallery.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="gallery" className="py-24 bg-[#080f1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Resort Photography</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Amaan Resorts <span className="italic text-[#c5a880]">in Pictures</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              Take an authentic visual tour of our waterpark slides, red-brick executive cottages, Aab-o-Dana dining hall, and 50+ acres of verdant grounds.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121f3a]/60 p-1.5 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#c5a880] text-[#070d1b] shadow'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => {
            const originalIndex = gallery.findIndex((g) => g.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(originalIndex >= 0 ? originalIndex : idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg h-64 sm:h-72 ${
                  item.span || 'col-span-1'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b]/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-1">
                        {item.category} • Amaan Resorts
                      </span>
                      <h4 className="font-luxury text-base sm:text-lg text-white font-medium">{item.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && gallery[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous / Next buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image & Caption */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={gallery[activeLightboxIndex].image}
              alt={gallery[activeLightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
            />
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                {gallery[activeLightboxIndex].category} • Amaan Resorts, Multan Road, Pattoki
              </span>
              <h3 className="font-luxury text-xl sm:text-2xl text-white font-medium mt-1">
                {gallery[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Photo {activeLightboxIndex + 1} of {gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
