export type PlayLevel = 'Beginner (1.0 - 2.5)' | 'Intermediate (3.0 - 4.5)' | 'Advanced (5.0 - 7.0)';

export interface Court {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor';
  surface: string; // e.g. "Mondo Supercourt XN"
  pricePerHour: number;
  features: string[];
  image: string;
  description: string;
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  type: 'racket' | 'balls' | 'accessories';
  price: number;
  rating: number;
  image: string;
  specs?: {
    power: number; // 1-10
    control: number; // 1-10
    weight: string;
  };
}

export interface TimeSlot {
  id: string; // e.g., "08:00-09:30"
  start: string;
  end: string;
  label: string;
  isPeak: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "08:00-09:30"
  price: number;
  playerName: string;
  playerPhone: string;
  playerEmail: string;
  playerLevel: PlayLevel;
  isPublicMatch: boolean;
  joinedPlayers: string[]; // Names of people who joined if public
  neededPlayers: number; // 0 to 3
  rentals: {
    equipmentId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
}

export interface OpenMatch {
  id: string; // links to bookingId
  bookingId: string;
  courtName: string;
  date: string;
  timeSlot: string;
  hostName: string;
  hostLevel: PlayLevel;
  spotsLeft: number;
  joinedPlayers: string[];
}
