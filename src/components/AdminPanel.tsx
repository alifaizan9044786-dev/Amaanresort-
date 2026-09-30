import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { Room, Package, GalleryItem, Testimonial, BookingInquiry } from '../types';
import {
  X,
  LayoutDashboard,
  Bed,
  CalendarCheck,
  Package as PackageIcon,
  Image as ImageIcon,
  MessageSquare,
  Settings as SettingsIcon,
  Phone,
  MessageCircle,
  Save,
  Trash2,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    rooms,
    updateRoom,
    packages,
    updatePackage,
    gallery,
    addGalleryItem,
    testimonials,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    settings,
    updateSettings,
  } = useResort();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'rooms' | 'bookings' | 'packages' | 'gallery' | 'testimonials' | 'settings'
  >('overview');

  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomForm, setRoomForm] = useState<Partial<Room>>({});
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('Resort');

  if (!isAdminOpen) return null;

  const pendingInquiriesCount = inquiries.filter((inq) => inq.status === 'Pending').length;
  const whatsAppLeadsCount = inquiries.filter((inq) => inq.source === 'WhatsApp Direct').length;

  const handleStartEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomForm(room);
  };

  const handleSaveRoom = () => {
    if (!editingRoomId || !roomForm) return;
    const existing = rooms.find((r) => r.id === editingRoomId);
    if (existing) {
      updateRoom({ ...existing, ...roomForm } as Room);
    }
    setEditingRoomId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 3000);
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl || !newGalleryTitle) return;
    addGalleryItem({
      id: `gal-${Date.now()}`,
      title: newGalleryTitle,
      category: newGalleryCategory,
      image: newGalleryUrl,
    });
    setNewGalleryUrl('');
    setNewGalleryTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#070d1b] border border-[#c5a880]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080f1e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c5a880]/20 border border-[#c5a880]/50 flex items-center justify-center text-[#c5a880] font-luxury font-bold">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-luxury text-xl text-white font-medium">Amaan Resorts Admin Console</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  Pattoki &amp; Lahore Desk
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Staff Control • Inquiries, WhatsApp Leads &amp; Cottages
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0b1325] px-4 overflow-x-auto text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Inquiries &amp; Leads</span>
            {pendingInquiriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#c5a880] text-[#070d1b] text-[10px] font-bold flex items-center justify-center">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'rooms'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Bed className="w-4 h-4" />
            <span>Cottages &amp; Suites</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'packages'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <PackageIcon className="w-4 h-4" />
            <span>Day Pass &amp; Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Resort Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'testimonials'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>400+ Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-4 flex items-center gap-2 border-b-2 tracking-wider transition-colors shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#c5a880] text-[#c5a880]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings &amp; Maps</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#070d1b]">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0b1325] border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs uppercase tracking-wider">Total Inquiries</span>
                    <CalendarCheck className="w-4 h-4 text-[#c5a880]" />
                  </div>
                  <div className="text-2xl font-bold font-luxury text-white">{inquiries.length}</div>
                  <span className="text-[11px] text-emerald-400">Lahore &amp; Pattoki guests</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1325] border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs uppercase tracking-wider">WhatsApp Leads</span>
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-luxury text-white">{whatsAppLeadsCount}</div>
                  <span className="text-[11px] text-emerald-400">Connected to {settings.phone}</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1325] border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs uppercase tracking-wider">Social Proof</span>
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold font-luxury text-amber-400">400+ Reviews</div>
                  <span className="text-[11px] text-slate-400">4.8 ★ Average rating</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0b1325] border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs uppercase tracking-wider">Target Region</span>
                    <MapPin className="w-4 h-4 text-[#c5a880]" />
                  </div>
                  <div className="text-lg font-bold font-luxury text-white truncate">Lahore / Pattoki</div>
                  <span className="text-[11px] text-[#c5a880]">Main Multan Road (N-5)</span>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="bg-[#0b1325] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-luxury text-lg text-white font-medium">Recent Guest Inquiries</h4>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs text-[#c5a880] hover:underline">
                    View All Inquiries →
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{inq.guestName}</span>
                          <span className="text-[10px] text-slate-400">#{inq.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300">
                            {inq.source}
                          </span>
                        </div>
                        <span className="text-slate-400 block mt-0.5">
                          {inq.roomName || inq.packageName} • {inq.checkIn} to {inq.checkOut} ({inq.adults}A, {inq.kids}K)
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalam o Alaikum ${inq.guestName}! This is Amaan Resorts Pattoki regarding your inquiry for ${inq.checkIn}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INQUIRIES & LEADS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h4 className="font-luxury text-xl text-white font-medium">Inquiries &amp; Customer Submissions</h4>
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-[#0b1325] border border-white/10 space-y-3 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880] font-bold">
                          {inq.guestName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{inq.guestName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">Ref: #{inq.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-slate-300">
                              {inq.source}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            Logged on {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#121f3a] text-white border border-white/10 outline-none"
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Requested Stay</span>
                        <span className="font-medium text-white">{inq.roomName || inq.packageName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Dates</span>
                        <span>{inq.checkIn} to {inq.checkOut}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Phone</span>
                        <span className="text-white font-mono">{inq.phone}</span>
                      </div>
                    </div>

                    {inq.specialRequests && (
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
                        {inq.specialRequests}
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalam o Alaikum ${inq.guestName}! This is Amaan Resorts Pattoki. We received your booking inquiry for ${inq.checkIn}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs border border-emerald-500/40"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp ({inq.phone})</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROOMS */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <h4 className="font-luxury text-xl text-white font-medium">Executive Cottages &amp; Suites</h4>

              {editingRoomId && (
                <div className="p-5 rounded-2xl bg-[#0b1325] border border-[#c5a880]/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h5 className="font-luxury text-lg text-white font-medium">Edit {roomForm.name}</h5>
                    <button onClick={() => setEditingRoomId(null)} className="text-xs text-slate-400 hover:text-white">
                      Cancel ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Cottage / Suite Name</label>
                      <input
                        type="text"
                        value={roomForm.name || ''}
                        onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                        className="w-full bg-[#121f3a] text-white p-2.5 rounded-xl border border-white/10 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Pricing Label</label>
                      <input
                        type="text"
                        value={roomForm.pricingLabel || ''}
                        onChange={(e) => setRoomForm({ ...roomForm, pricingLabel: e.target.value })}
                        placeholder="e.g. Rates on Inquiry"
                        className="w-full bg-[#121f3a] text-white p-2.5 rounded-xl border border-white/10 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={roomForm.badge || ''}
                        onChange={(e) => setRoomForm({ ...roomForm, badge: e.target.value })}
                        className="w-full bg-[#121f3a] text-white p-2.5 rounded-xl border border-white/10 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveRoom}
                      className="px-5 py-2 rounded-xl bg-[#c5a880] text-[#070d1b] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-[#0b1325] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#080f1e] text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Cottage / Suite</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Pricing Status</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={room.image} alt={room.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-semibold text-white block">{room.name}</span>
                            <span className="text-[10px] text-slate-400">{room.tagline}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{room.category}</td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-400 font-semibold">{room.pricingLabel || 'Rates on Inquiry'}</span>
                        </td>
                        <td className="py-3 px-4">Up to {room.maxGuests} Guests</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleStartEditRoom(room)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium"
                          >
                            Edit Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <h4 className="font-luxury text-xl text-white font-medium">Day Passes &amp; Packages</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-2xl bg-[#0b1325] border border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={pkg.image} alt={pkg.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-luxury text-base text-white">{pkg.title}</h5>
                        <span className="text-xs text-[#c5a880] font-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-light">{pkg.shortDescription}</p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-medium">Pricing: On Inquiry / WhatsApp</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h4 className="font-luxury text-xl text-white font-medium">Resort Gallery</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((item) => (
                  <div key={item.id} className="relative rounded-xl overflow-hidden border border-white/10 group h-36">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2.5 text-xs">
                      <span className="text-[10px] text-[#c5a880] font-semibold">{item.category}</span>
                      <span className="text-white truncate font-medium">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <h4 className="font-luxury text-xl text-white font-medium">400+ Reviews Moderation</h4>
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-[#0b1325] border border-white/10 flex items-start gap-3">
                    <img src={t.avatar} alt={t.guestName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{t.guestName} ({t.location})</span>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className="text-slate-300 font-light mt-1">"{t.comment}"</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{t.stayType} • {t.roomName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h4 className="font-luxury text-xl text-white font-medium">Resort &amp; Location Settings</h4>
                <p className="text-xs text-slate-400">
                  Phone (03100007906), Google Maps link, and target region.
                </p>
              </div>

              {settingsSavedNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1">Resort Name</label>
                    <input
                      type="text"
                      value={settingsForm.resortName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, resortName: e.target.value })}
                      className="w-full bg-[#121f3a] text-white p-3 rounded-xl border border-white/10 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full bg-[#121f3a] text-white p-3 rounded-xl border border-white/10 outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">Physical Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full bg-[#121f3a] text-white p-3 rounded-xl border border-white/10 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">Google Maps URL</label>
                    <input
                      type="url"
                      value={settingsForm.googleMapsUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsUrl: e.target.value })}
                      className="w-full bg-[#121f3a] text-white p-3 rounded-xl border border-white/10 outline-none text-[11px] font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d8bd8a] to-[#aa8b5c] text-[#070d1b] font-bold text-xs uppercase tracking-wider shadow hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
