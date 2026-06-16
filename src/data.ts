import { Court, Equipment, TimeSlot, OpenMatch } from './types';
import indoorCourtImg from './assets/images/padel_court_indoor_1781232790567.jpg';
import outdoorCourtImg from './assets/images/padel_court_outdoor_1781232805005.jpg';

export const COURTS_DATA: Court[] = [
  {
    id: 'court-1',
    name: 'The Grand Slam (Showcourt)',
    type: 'indoor',
    surface: 'Mondo Supercourt XN (WPT Official)',
    pricePerHour: 40, // $60 for 90-minute session
    features: ['Panoramic glass walls', 'Full HD instant replay recording', 'Advanced digital scoreboards', 'Vapor heating & cooling controls'],
    image: indoorCourtImg,
    description: 'Our ultimate elite indoor show court. Specially designed panoramic glass provides seamless spectator view and pro-level ball bounce.'
  },
  {
    id: 'court-2',
    name: 'Apex Arena',
    type: 'indoor',
    surface: 'Mondo Supercourt XN',
    pricePerHour: 36, // $54 for 90-minute session
    features: ['Panoramic crystal glass', 'Led high-contrast focus lights', 'Acoustic shock absorbers', 'Integrated water station'],
    image: indoorCourtImg,
    description: 'A premium indoor court perfect for high-speed technical rally control. Balanced rebound and high ceiling clearance of 11.5 meters.'
  },
  {
    id: 'court-3',
    name: 'Sunset Vista',
    type: 'outdoor',
    surface: 'STX Supercourt Blue Edition',
    pricePerHour: 30, // $45 for 90-minute session
    features: ['Windbreaking sound glass', 'Anti-glare sunset view layout', 'Pro-light twilight techpoles', 'Lounge sitting bay'],
    image: outdoorCourtImg,
    description: 'Experience majestic sunset rallies, protected from the seaside wind with specialized structural aerodynamics.'
  },
  {
    id: 'court-4',
    name: 'Coastal Breeze Stadium',
    type: 'outdoor',
    surface: 'Mondo Comfort Grass Green',
    pricePerHour: 28, // $42 for 90-minute session
    features: ['Ocean side air shield', 'Extra shock absorbent turf', 'Night match neon lights', 'Spectator deck'],
    image: outdoorCourtImg,
    description: 'Fresh atmosphere with a beautiful design. Wide runout zones of 3 meters on all sides allow for off-court retrievals like a pro.'
  }
];

export const EQUIPMENT_DATA: Equipment[] = [
  {
    id: 'eq-nox-at10',
    name: 'AT10 Genius 18K Alum',
    brand: 'Nox',
    type: 'racket',
    price: 8,
    rating: 4.9,
    image: '🔥',
    specs: {
      power: 9,
      control: 9.8,
      weight: '360 - 375g'
    }
  },
  {
    id: 'eq-bullpadel-vertex',
    name: 'Vertex 04 Juan Tello Edition',
    brand: 'Bullpadel',
    type: 'racket',
    price: 8,
    rating: 4.8,
    image: '⚡',
    specs: {
      power: 9.8,
      control: 8.8,
      weight: '365 - 375g'
    }
  },
  {
    id: 'eq-babolat-viper',
    name: 'Technical Viper Carbon',
    brand: 'Babolat',
    type: 'racket',
    price: 8,
    rating: 4.7,
    image: '💥',
    specs: {
      power: 10,
      control: 8.5,
      weight: '365g'
    }
  },
  {
    id: 'eq-balls',
    name: 'Pro Gold Padel Balls (Can of 3)',
    brand: 'Head',
    type: 'balls',
    price: 3,
    rating: 4.9,
    image: '🎾'
  },
  {
    id: 'eq-overgrip',
    name: 'Neon Cushion Pro Overgrip',
    brand: 'Bullpadel',
    type: 'accessories',
    price: 2,
    rating: 4.5,
    image: '🎗️'
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', start: '07:30', end: '09:00', label: '07:30 - 09:00', isPeak: false },
  { id: 'slot-2', start: '09:00', end: '10:30', label: '09:00 - 10:30', isPeak: false },
  { id: 'slot-3', start: '10:30', end: '12:00', label: '10:30 - 12:00', isPeak: false },
  { id: 'slot-4', start: '12:00', end: '13:30', label: '12:00 - 13:30', isPeak: false },
  { id: 'slot-5', start: '13:30', end: '15:00', label: '13:30 - 15:00', isPeak: false },
  { id: 'slot-6', start: '15:00', end: '16:30', label: '15:00 - 16:30', isPeak: false },
  { id: 'slot-7', start: '16:30', end: '18:00', label: '16:30 - 18:00', isPeak: true },
  { id: 'slot-8', start: '18:00', end: '19:30', label: '18:00 - 19:30', isPeak: true },
  { id: 'slot-9', start: '19:30', end: '21:00', label: '19:30 - 21:00', isPeak: true },
  { id: 'slot-10', start: '21:00', end: '22:30', label: '21:00 - 22:30', isPeak: true },
  { id: 'slot-11', start: '22:30', end: '00:00', label: '22:30 - 00:00', isPeak: false }
];

export const INITIAL_OPEN_MATCHES: OpenMatch[] = [
  {
    id: 'match-1',
    bookingId: 'booking-pre-1',
    courtName: 'The Grand Slam (Showcourt)',
    date: '2026-06-12',
    timeSlot: '18:00 - 19:30',
    hostName: 'Carlos M.',
    hostLevel: 'Advanced (5.0 - 7.0)',
    spotsLeft: 2,
    joinedPlayers: ['Carlos M.', 'Alvaro G.']
  },
  {
    id: 'match-2',
    bookingId: 'booking-pre-2',
    courtName: 'Sunset Vista',
    date: '2026-06-12',
    timeSlot: '16:30 - 18:00',
    hostName: 'Sofia R.',
    hostLevel: 'Intermediate (3.0 - 4.5)',
    spotsLeft: 1,
    joinedPlayers: ['Sofia R.', 'Marco D.', 'Elena L.']
  },
  {
    id: 'match-3',
    bookingId: 'booking-pre-3',
    courtName: 'Apex Arena',
    date: '2026-06-13',
    timeSlot: '19:30 - 21:00',
    hostName: 'Viktor T.',
    hostLevel: 'Beginner (1.0 - 2.5)',
    spotsLeft: 3,
    joinedPlayers: ['Viktor T.']
  }
];
