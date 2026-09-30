export interface Room {
  id: string;
  name: string;
  category: 'Villa' | 'Suite' | 'Cottage' | 'Room';
  tagline: string;
  pricingLabel?: string; // e.g. "Rates on Inquiry"
  badge?: string;
  unitSpace: string;
  bedType: string;
  maxGuests: number;
  adults: number;
  kids: number;
  view: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: {
    name: string;
    icon: string;
  }[];
  isAvailable: boolean;
}

export interface Package {
  id: string;
  title: string;
  duration: string;
  pricingLabel?: string;
  badge?: string;
  image: string;
  shortDescription: string;
  inclusions: string[];
  idealFor: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Waterpark' | 'Sports' | 'Family' | 'Dining' | 'Nature' | 'Resort';
  image: string;
  description: string;
  timing: string;
  pricing: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Waterpark' | 'Cottages' | 'Dining' | 'Sports' | 'Nature' | 'Resort';
  image: string;
  span?: string;
}

export interface Testimonial {
  id: string;
  guestName: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  stayType: string;
  roomName: string;
  comment: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  guestName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomId?: string;
  roomName?: string;
  adults: number;
  kids: number;
  packageId?: string;
  packageName?: string;
  totalNights: number;
  specialRequests?: string;
  source: 'Online Form' | 'WhatsApp Direct' | 'Direct Call';
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface ResortSettings {
  resortName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  address: string;
  targetRegion: string;
  reviewsCountText: string;
  googleMapsUrl: string;
  checkInTime: string;
  checkOutTime: string;
}
