import React, { useState, useEffect } from 'react';
import SportHeader from './components/SportHeader';
import ClubStats from './components/ClubStats';
import CourtCard from './components/CourtCard';
import Scheduler from './components/Scheduler';
import RentalHub from './components/RentalHub';
import MatchmakingBoard from './components/MatchmakingBoard';
import MyBookings from './components/MyBookings';
import CourtLocationMap from './components/CourtLocationMap';
import SportChatbot from './components/SportChatbot';
import { useLanguage } from './translations';
import heroBannerImg from './assets/images/padel_hero_banner_1781232773952.jpg';

import { COURTS_DATA, EQUIPMENT_DATA, TIME_SLOTS, INITIAL_OPEN_MATCHES } from './data';
import { Court, Equipment, TimeSlot, Booking, OpenMatch, PlayLevel } from './types';
import { Shield, Sparkles, AlertCircle, ShoppingBag, Send, CheckSquare, Target, Trophy, HelpCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { t, language } = useLanguage();
  // Navigation & General States
  const [activeTab, setActiveTab] = useState('courts'); // 'courts' | 'matchmaking' | 'bookings'
  
  // Selection states (Checkout and Scheduling)
  const [selectedCourtId, setSelectedCourtId] = useState('court-1');
  const [selectedDate, setSelectedDate] = useState('2026-06-12'); // Standard active date
  const [selectedSlotId, setSelectedSlotId] = useState('slot-7'); // Standard 16:30 - 18:00
  const [selectedRentals, setSelectedRentals] = useState<Record<string, number>>({});

  // Checkout info form states
  const [playerName, setPlayerName] = useState('Erzhan T.'); // Personalized layout
  const [playerPhone, setPlayerPhone] = useState('+1 (555) 723-3500');
  const [playerEmail, setPlayerEmail] = useState('erzhantatabaev@gmail.com');
  const [playerLevel, setPlayerLevel] = useState<PlayLevel>('Intermediate (3.0 - 4.5)');
  const [isPublicMatch, setIsPublicMatch] = useState(false);

  // Success notifications states
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [latestBookingCode, setLatestBookingCode] = useState('');

  // Roster persistence loading
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('veloce_padel_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    // Initialize with a beautiful demo pass for stunning first visit layout!
    const defaultBooking: Booking = {
      id: 'tx-8041',
      courtId: 'court-1',
      courtName: 'The Grand Slam (Showcourt)',
      date: '2026-06-12',
      timeSlot: '18:00 - 19:30',
      price: 61, // $60 court + $11 equipment
      playerName: 'Erzhan T.',
      playerPhone: '+1 (555) 723-3500',
      playerEmail: 'erzhantatabaev@gmail.com',
      playerLevel: 'Intermediate (3.0 - 4.5)',
      isPublicMatch: true,
      joinedPlayers: ['Erzhan T.', 'Carlos M.'],
      neededPlayers: 2,
      rentals: [
        { equipmentId: 'eq-nox-at10', name: 'AT10 Genius 18K Alum', quantity: 1, price: 8 },
        { equipmentId: 'eq-balls', name: 'Pro Gold Padel Balls (Can of 3)', quantity: 1, price: 3 }
      ],
      createdAt: new Date().toISOString()
    };
    return [defaultBooking];
  });

  const [openMatches, setOpenMatches] = useState<OpenMatch[]>(() => {
    const saved = localStorage.getItem('veloce_padel_open_matches');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_OPEN_MATCHES;
  });

  // Watchers to synchronize state to localStorage
  useEffect(() => {
    localStorage.setItem('veloce_padel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('veloce_padel_open_matches', JSON.stringify(openMatches));
  }, [openMatches]);

  // Calculations
  const activeCourt = COURTS_DATA.find((c) => c.id === selectedCourtId) || COURTS_DATA[0];
  const activeSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[6];

  // Base slot price logic
  const courtSessionPrice = activeCourt.pricePerHour * 1.5;
  const courtPriceCalculated = activeSlot.isPeak
    ? Math.round(courtSessionPrice * 1.25)
    : courtSessionPrice;

  // Equipment rental price calculation
  const rentalPriceCalculated = (Object.entries(selectedRentals) as [string, number][]).reduce((sum, [id, qty]) => {
    const item = EQUIPMENT_DATA.find((e) => e.id === id);
    if (item && qty > 0) {
      return sum + item.price * qty;
    }
    return sum;
  }, 0);

  const grandTotalPrice = courtPriceCalculated + rentalPriceCalculated;

  // Rental update callback hook
  const handleRentalQtyChange = (id: string, qty: number) => {
    setSelectedRentals((prev) => {
      const copy = { ...prev };
      if (qty <= 0) {
        delete copy[id];
      } else {
        copy[id] = qty;
      }
      return copy;
    });
  };

  // Checkout Reserve callback
  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !playerPhone.trim() || !playerEmail.trim()) {
      alert(language === 'ar' ? 'الرجاء ملء جميع بيانات اللاعب المطلوبة.' : 'Please fill out all player information details.');
      return;
    }

    const bookingId = `tx-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build equipment array
    const rentalsList = Object.entries(selectedRentals)
      .map(([id, qty]) => {
        const item = EQUIPMENT_DATA.find((e) => e.id === id);
        return item
          ? {
              equipmentId: id,
              name: item.name,
              quantity: qty,
              price: item.price,
            }
          : null;
      })
      .filter(Boolean) as { equipmentId: string; name: string; quantity: number; price: number }[];

    // Build core booking
    const newBooking: Booking = {
      id: bookingId,
      courtId: selectedCourtId,
      courtName: activeCourt.name,
      date: selectedDate,
      timeSlot: activeSlot.label,
      price: grandTotalPrice,
      playerName: playerName.trim(),
      playerPhone: playerPhone.trim(),
      playerEmail: playerEmail.trim(),
      playerLevel: playerLevel,
      isPublicMatch: isPublicMatch,
      joinedPlayers: [playerName.trim()],
      neededPlayers: isPublicMatch ? 3 : 0,
      rentals: rentalsList,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // If public match cascade creation to open matches board
    if (isPublicMatch) {
      const newOpenMatch: OpenMatch = {
        id: `match-${bookingId}`,
        bookingId: bookingId,
        courtName: activeCourt.name,
        date: selectedDate,
        timeSlot: activeSlot.label,
        hostName: playerName.trim(),
        hostLevel: playerLevel,
        spotsLeft: 3,
        joinedPlayers: [playerName.trim()],
      };
      setOpenMatches((prev) => [newOpenMatch, ...prev]);
    }

    // visual notification flow
    setLatestBookingCode(bookingId.toUpperCase());
    setShowSuccessNotification(true);
    
    // Clear dynamic states
    setSelectedRentals({});
    setIsPublicMatch(false);

    // Roll tab to bookings securely
    setTimeout(() => {
      setActiveTab('bookings');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);

    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 4500);
  };

  // Join match trigger callback from the matchmaking board
  const handleJoinMatch = (matchId: string, joinerName: string, joinerLevel: PlayLevel) => {
    // 1. Update open matches counters
    setOpenMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId && m.spotsLeft > 0) {
          return {
            ...m,
            spotsLeft: m.spotsLeft - 1,
            joinedPlayers: [...m.joinedPlayers, joinerName],
          };
        }
        return m;
      })
    );

    // 2. Also align the primary booking details for the host user's reference!
    const relatedBookingId = matchId.replace('match-', '');
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === relatedBookingId && b.neededPlayers > 0) {
          return {
            ...b,
            neededPlayers: b.neededPlayers - 1,
            joinedPlayers: [...b.joinedPlayers, joinerName],
          };
        }
        return b;
      })
    );
  };

  // Cancel booking callback trigger
  const handleCancelBooking = (id: string) => {
    const confirmMsg = language === 'ar'
      ? 'هل أنت متأكد من رغبتك في إلغاء تذكرة الحجز؟ سيؤدي هذا إلى إتاحة الفترة الزمنية للاعبين الآخرين.'
      : 'Are you sure you want to cancel this booking pass? This releases the slot time to other league players.';
    if (confirm(confirmMsg)) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      // Remove matchmaking card if open
      setOpenMatches((prev) => prev.filter((m) => m.bookingId !== id));
    }
  };

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col justify-between selection:bg-lime-400 selection:text-zinc-900 pb-16">
      
      {/* App sport header navbar */}
      <SportHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        openMatchCount={openMatches.filter((m) => m.spotsLeft > 0).length}
      />

      {/* Main body canvas */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
        
        {/* Banner Success Modal popup layout */}
        <AnimatePresence>
          {showSuccessNotification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-zinc-950 font-sans shadow-lg shadow-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-full bg-zinc-950/25 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="font-extrabold uppercase text-sm tracking-wide">{t('securedAlertTitle')}</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    {language === 'ar' ? 'تم تأمين وتثبيت حجزك برقم ' : 'Your court ticket '}
                    <span className="font-mono font-black underline">#{latestBookingCode}</span> 
                    {language === 'ar' ? '. جاري تحويلك إلى تذكرة الدخول الرقمية الفورية...' : ' has been locked. Transferring you to your digital entry boarding pass...'}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-zinc-950 text-emerald-400 px-3 py-1 rounded-md border border-emerald-400/25">
                {t('depositGuaranteed')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic content dispatcher based on active tab view */}
        <AnimatePresence mode="wait">
          {activeTab === 'courts' && (
            <motion.div
              key="courts-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              
              {/* Dynamic Hero Banner Visual */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                {/* Colorful ambient sport overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 via-emerald-500/15 to-cyan-500/10 mix-blend-color-dodge z-5 animate-pulse" style={{ animationDuration: '8s' }} />
                <img
                  src={heroBannerImg}
                  alt="Elite Padel Stadium"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 scale-100 hover:scale-[1.03]"
                />
                
                <div className="relative p-6 sm:p-10 lg:p-12 z-20 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/10 px-3 py-1 border border-lime-400/20 font-mono text-[10px] uppercase font-bold text-lime-400 tracking-wider">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>{t('heroBadge')}</span>
                  </div>

                  <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl leading-none">
                    {t('heroTitleRow1')}<br/>
                    {t('heroTitleRow2')}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                    {t('heroBannerDesc')}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <span className="h-2 w-2 rounded-full bg-lime-400" />
                      <span>{t('heroStatCourts')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <span className="h-2 w-2 rounded-full bg-lime-400" />
                      <span>{t('heroStatDemos')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento dashboard stats */}
              <ClubStats />

              {/* Central split layout */}
              <div className="grid gap-8 lg:grid-cols-3">
                
                {/* Left Columns - Court Finder & Timing Scheduler */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Court Selector panel header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 text-zinc-950 text-xs font-black shadow-glow">
                        1
                      </div>
                      <h2 className="text-xl font-black uppercase tracking-tight text-white">
                        {t('step1')}
                      </h2>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                      {t('step1Sub')}
                    </p>
                    
                    {/* Courts layout grid slider */}
                    <div className="grid gap-5 sm:grid-cols-2 mt-5">
                      {COURTS_DATA.map((court) => (
                        <CourtCard
                           key={court.id}
                           court={court}
                           isSelected={selectedCourtId === court.id}
                           onSelect={() => setSelectedCourtId(court.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Schedulers Selector Date & Time card */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-lime-400 text-zinc-950 text-xs font-black shadow-glow font-bold">
                        2
                      </div>
                      <h2 className="text-xl font-black uppercase tracking-tight text-white">
                        {t('step2')}
                      </h2>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                      {t('step2Sub')}
                    </p>

                    <div className="mt-5">
                      <Scheduler
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedSlot={selectedSlotId}
                        setSelectedSlot={setSelectedSlotId}
                        courtPricePerHour={activeCourt.pricePerHour}
                      />
                    </div>
                  </div>

                </div>

                {/* Right Columns - Checkout, rentals and payment setup form */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* Court Summary box preview */}
                  <div className="rounded-2xl border border-lime-400/20 bg-gradient-to-br from-zinc-950 to-zinc-900/40 p-6 space-y-4 relative overflow-hidden shadow-lg shadow-lime-400/5">
                    <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-lime-400 to-transparent" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center justify-between">
                      <span>{t('formTitle')}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-ping" />
                    </h3>

                    <div className="space-y-3 font-mono text-xs">
                      
                      {/* Active Court details line */}
                      <div className="flex justify-between items-start">
                        <span className="text-zinc-400">{t('courtLabel')}</span>
                        <span className="text-gradient font-black text-right pl-4 uppercase">
                          {t(`${activeCourt.id}-name` as any) || activeCourt.name}
                        </span>
                      </div>

                      {/* Active Date line */}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t('dateLabel')}</span>
                        <span className="text-lime-400 font-black tracking-wide">{selectedDate}</span>
                      </div>

                      {/* Active Slot line */}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t('timeslotLabel')}</span>
                        <span className="text-cyan-400 font-black tracking-wide">{activeSlot.label}</span>
                      </div>

                      {/* Floor specs confirmation */}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{language === 'ar' ? 'نوع الساحة:' : 'ARENA TYPE:'}</span>
                        <span className="text-zinc-300 uppercase font-medium">
                          {activeCourt.type === 'indoor' ? t('indoor') : t('outdoor')} ({(t(`${activeCourt.id}-surface` as any) || activeCourt.surface).split(' ')[0]})
                        </span>
                      </div>

                      {/* Prime Demand modifier status */}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t('rateScaleLabel')}</span>
                        <span className={`font-black uppercase px-2 py-0.5 rounded text-[10px] ${
                          activeSlot.isPeak 
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20'
                        }`}>
                          {activeSlot.isPeak ? t('primeRate') : t('standardRate')}
                        </span>
                      </div>

                      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center">
                        <span className="text-zinc-400 font-bold">{t('courtCostLabel')}</span>
                        <span className="text-base font-black text-white hover:text-lime-400 transition-colors">${courtPriceCalculated}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rental Selection Module */}
                  <RentalHub
                    selectedRentals={selectedRentals}
                    onQtyChange={handleRentalQtyChange}
                  />

                  {/* Unified Player Information & Checkout finalization Form */}
                  <form onSubmit={handleBookSlot} className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-5">
                    
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-tight">{t('step4Title')}</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase">{t('playerCredsSub')}</p>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs font-mono">
                      
                      {/* Player name input */}
                      <div>
                        <label className="block text-zinc-500 uppercase font-black text-[9.5px] tracking-wide mb-1">
                          {t('lblCaptainName')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder={language === 'ar' ? 'ادخل اسمك بالكامل' : 'Your Full Name'}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:border-lime-400 focus:outline-none text-white font-bold"
                        />
                      </div>

                      {/* Phone contact input */}
                      <div>
                        <label className="block text-zinc-500 uppercase font-black text-[9.5px] tracking-wide mb-1">
                          {t('lblPhoneContact')} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={playerPhone}
                          onChange={(e) => setPlayerPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:border-lime-400 focus:outline-none text-white font-bold"
                        />
                      </div>

                      {/* Email contact input */}
                      <div>
                        <label className="block text-zinc-500 uppercase font-black text-[9.5px] tracking-wide mb-1">
                          {t('lblEmailCreds')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={playerEmail}
                          onChange={(e) => setPlayerEmail(e.target.value)}
                          placeholder="name@personal.com"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:border-lime-400 focus:outline-none text-white font-bold"
                        />
                      </div>

                      {/* Personal Match Playing Level */}
                      <div>
                        <label className="block text-zinc-500 uppercase font-black text-[9.5px] tracking-wide mb-1">
                          {t('lblRatingLevel')} *
                        </label>
                        <select
                          value={playerLevel}
                          onChange={(e) => setPlayerLevel(e.target.value as PlayLevel)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 focus:border-lime-400 focus:outline-none text-white font-bold"
                        >
                          <option value="Beginner (1.0 - 2.5)">{language === 'ar' ? 'مبتدئ (1.0 - 2.5)' : 'Beginner (1.0 - 2.5)'}</option>
                          <option value="Intermediate (3.0 - 4.5)">{language === 'ar' ? 'متوسط (3.0 - 4.5)' : 'Intermediate (3.0 - 4.5)'}</option>
                          <option value="Advanced (5.0 - 7.0)">{language === 'ar' ? 'متقدم (5.0 - 7.0)' : 'Advanced (5.0 - 7.0)'}</option>
                        </select>
                      </div>

                      {/* Match visibility switch */}
                      <div className="bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-900 space-y-2">
                        <label className="block text-zinc-500 uppercase font-black text-[9px] tracking-widest leading-none mb-1">
                          {language === 'ar' ? 'خيارات مطابقة الردهات' : 'Lobby Matching Options'}
                        </label>
                        
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                            <input
                              type="radio"
                              name="match_visibility"
                              checked={!isPublicMatch}
                              onChange={() => setIsPublicMatch(false)}
                              className="accent-lime-400"
                            />
                            <span>🔒 {language === 'ar' ? 'خاص مغلق' : 'Private'}</span>
                          </label>

                          <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                            <input
                              type="radio"
                              name="match_visibility"
                              checked={isPublicMatch}
                              onChange={() => setIsPublicMatch(true)}
                              className="accent-lime-400"
                            />
                            <span>📢 {language === 'ar' ? 'مباراة عامة' : 'Public Match'}</span>
                          </label>
                        </div>
                        
                        <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                          {isPublicMatch
                            ? (language === 'ar' ? '📢 سيتمكن لاعبو الدوحة الآخرون من رؤية هذه الفترة الرياضية في صالة الألعاب المفتوحة والإنضمام إليك!' : '📢 Other Veloce players can see this slot on the Matchmaking Board and sign up to play with you!')
                            : (language === 'ar' ? '🔒 مباراة خاصة مغلقة. لن تظهر بمخطط الردهات المتاحة.' : '🔒 Private match. No matchmaking active. Invite your own players.')}
                        </p>
                      </div>

                      {/* Cost Summary list */}
                      <div className="pt-3 border-t border-zinc-900 space-y-1.5 font-bold">
                        <div className="flex justify-between text-zinc-400 font-medium">
                          <span>{language === 'ar' ? 'سعر حجز الملعب:' : 'Court Rental:'}</span>
                          <span>${courtPriceCalculated}</span>
                        </div>
                        {rentalPriceCalculated > 0 && (
                          <div className="flex justify-between text-zinc-400 font-medium">
                            <span>{language === 'ar' ? 'استئجار المعدات والمضارب:' : 'Hardware Rental:'}</span>
                            <span>${rentalPriceCalculated}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-white text-sm tracking-tight border-t border-zinc-800 pt-2 font-black">
                          <span>{t('totalPriceLabel')}</span>
                          <span className="text-lime-400">${grandTotalPrice}</span>
                        </div>
                      </div>

                      {/* Book Button */}
                      <button
                        type="submit"
                        className="w-full bg-lime-400 hover:bg-lime-300 font-black text-xs uppercase tracking-wider py-4 rounded-xl text-zinc-950 transition-all duration-300 transform active:scale-98 shadow-lg shadow-lime-400/10 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckSquare className="h-4 w-4 stroke-[3]" />
                        <span>{t('bookBtn')}</span>
                      </button>

                      <p className="text-[9.5px] text-zinc-500 text-center leading-normal">
                        {t('textPolicy')}
                      </p>

                    </div>
                  </form>

                </div>

              </div>

              {/* Veloce Arena Sectors and Maps GPS Integration */}
              <CourtLocationMap onSelectCourtId={(id) => setSelectedCourtId(id)} />

            </motion.div>
          )}

          {activeTab === 'matchmaking' && (
            <motion.div
              key="matchmaking-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <MatchmakingBoard
                openMatches={openMatches}
                onJoinMatch={handleJoinMatch}
              />
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              key="bookings-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <MyBookings
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Interactive Assist Coach Chatbot */}
        <SportChatbot />

      </main>

      {/* Styled Footer */}
      <footer className="mt-16 border-t border-zinc-900 py-8 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 text-center space-y-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-[10px] font-black text-zinc-950">
              V
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              {language === 'ar' ? 'شركة ونادي ملاعب فيلوتشي للباديل' : 'VELOCE PADEL CLUB & ARENAS CO.'}
            </span>
          </div>
          
          <p className="text-xs text-zinc-500 font-mono leading-relaxed max-w-md mx-auto">
            {t('footerText')}
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] text-zinc-400 uppercase">
            <span>{t('footerContact')}</span>
            <span>{t('footerLocation')}</span>
            <span>{t('footerHours')}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
