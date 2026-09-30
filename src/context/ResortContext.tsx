import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, Package, Activity, GalleryItem, Testimonial, ResortSettings, BookingInquiry } from '../types';
import {
  initialRooms,
  initialPackages,
  initialActivities,
  initialGallery,
  initialTestimonials,
  initialSettings,
  initialInquiries,
} from '../data/resortData';

interface BookingParams {
  checkIn?: string;
  checkOut?: string;
  roomId?: string;
  packageId?: string;
  adults?: number;
  kids?: number;
}

interface ResortContextType {
  settings: ResortSettings;
  updateSettings: (newSettings: Partial<ResortSettings>) => void;
  rooms: Room[];
  updateRoom: (updatedRoom: Room) => void;
  addRoom: (newRoom: Room) => void;
  deleteRoom: (id: string) => void;
  packages: Package[];
  updatePackage: (pkg: Package) => void;
  activities: Activity[];
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  inquiries: BookingInquiry[];
  addInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt'>) => BookingInquiry;
  updateInquiryStatus: (id: string, status: BookingInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // UI state
  activeRoomModal: Room | null;
  setActiveRoomModal: (room: Room | null) => void;
  isBookingModalOpen: boolean;
  bookingParams: BookingParams;
  openBookingModal: (params?: BookingParams) => void;
  closeBookingModal: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeLightboxIndex: number | null;
  setActiveLightboxIndex: (index: number | null) => void;

  // WhatsApp Helpers
  getWhatsAppBookingUrl: (details?: {
    roomName?: string;
    packageName?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    guestName?: string;
    notes?: string;
  }) => string;
}

const ResortContext = createContext<ResortContextType | undefined>(undefined);

export const ResortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage (v2) or defaults
  const [settings, setSettings] = useState<ResortSettings>(() => {
    const saved = localStorage.getItem('amaan_v2_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('amaan_v2_rooms');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('amaan_v2_packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [activities] = useState<Activity[]>(initialActivities);

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('amaan_v2_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('amaan_v2_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    const saved = localStorage.getItem('amaan_v2_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // Modal and wizard states
  const [activeRoomModal, setActiveRoomModal] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingParams, setBookingParams] = useState<BookingParams>({});
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('amaan_v2_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('amaan_v2_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('amaan_v2_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('amaan_v2_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('amaan_v2_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('amaan_v2_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const updateSettings = (newSettings: Partial<ResortSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const addRoom = (newRoom: Room) => {
    setRooms((prev) => [newRoom, ...prev]);
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updatePackage = (pkg: Package) => {
    setPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
  };

  const addTestimonial = (t: Testimonial) => {
    setTestimonials((prev) => [t, ...prev]);
  };

  const addInquiry = (inquiryData: Omit<BookingInquiry, 'id' | 'createdAt'>): BookingInquiry => {
    const newInq: BookingInquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = (id: string, status: BookingInquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const openBookingModal = (params: BookingParams = {}) => {
    setBookingParams(params);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // Build clean WhatsApp message URL
  const getWhatsAppBookingUrl = (details?: {
    roomName?: string;
    packageName?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    guestName?: string;
    notes?: string;
  }) => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `Hello *${settings.resortName}*! 👋\nI would like to inquire about booking a stay.\n\n`;

    if (details?.guestName) {
      text += `👤 *Guest Name:* ${details.guestName}\n`;
    }
    if (details?.roomName) {
      text += `🏨 *Accommodation:* ${details.roomName}\n`;
    }
    if (details?.packageName) {
      text += `🎁 *Package:* ${details.packageName}\n`;
    }
    if (details?.checkIn) {
      text += `📅 *Check-in Date:* ${details.checkIn}\n`;
    }
    if (details?.checkOut) {
      text += `📅 *Check-out Date:* ${details.checkOut}\n`;
    }
    if (details?.guests) {
      text += `👥 *Guests:* ${details.guests}\n`;
    }
    if (details?.notes) {
      text += `📝 *Notes/Requests:* ${details.notes}\n`;
    }
    text += `\nPlease provide availability, rates, and booking confirmation. Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <ResortContext.Provider
      value={{
        settings,
        updateSettings,
        rooms,
        updateRoom,
        addRoom,
        deleteRoom,
        packages,
        updatePackage,
        activities,
        gallery,
        addGalleryItem,
        testimonials,
        addTestimonial,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        activeRoomModal,
        setActiveRoomModal,
        isBookingModalOpen,
        bookingParams,
        openBookingModal,
        closeBookingModal,
        isAdminOpen,
        setIsAdminOpen,
        activeLightboxIndex,
        setActiveLightboxIndex,
        getWhatsAppBookingUrl,
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResort must be used within a ResortProvider');
  }
  return context;
};
