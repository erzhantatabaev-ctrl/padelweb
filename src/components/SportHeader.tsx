import React from 'react';
import { Trophy, Calendar, Users, MapPin, Sparkles, Flame, Clock } from 'lucide-react';
import { useLanguage } from '../translations';

interface SportHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  openMatchCount: number;
}

export default function SportHeader({ activeTab, setActiveTab, bookingCount, openMatchCount }: SportHeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="border-b border-white/5 bg-zinc-950 sticky top-0 z-45 overflow-hidden">
      {/* High-octane pro athletic colored accent stripe */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 shadow-glow" />
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 shadow-lg shadow-lime-500/20 shrink-0">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4 animate-ping rounded-full bg-lime-400 ring-2 ring-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-block font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                  {t('eliteLeague')}
                </span>
              </div>
              <h1 className="text-base font-black uppercase tracking-tight text-white sm:text-2xl leading-none">
                Veloce<span className="text-gradient">Padel</span>
              </h1>
            </div>
          </div>

          {/* Sporty Club Stats - Hidden on tablets/mobile */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2 border-r border-zinc-800 pr-5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('liveSlots')}</span>
            </div>
            <div className="flex items-center gap-2 border-r border-zinc-800 pr-5">
              <MapPin className="h-4 w-4 text-lime-400" />
              <span>{t('westBayDome')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-zinc-300 font-semibold uppercase">{t('openRoof')}</span>
            </div>
          </div>

          {/* Navigation Action Hub & Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Tabs selector */}
            <div className="flex rounded-lg bg-zinc-900 p-0.5 sm:p-1 border border-zinc-800 shrink-0">
              <button
                id="tab-courts-bttn"
                onClick={() => setActiveTab('courts')}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-250 ${
                  activeTab === 'courts'
                    ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{t('reserve')}</span>
              </button>
              
              <button
                id="tab-matchmaking-bttn"
                onClick={() => setActiveTab('matchmaking')}
                className={`relative flex items-center gap-1 sm:gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-250 ${
                  activeTab === 'matchmaking'
                    ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Users className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{t('matchmaking')}</span>
                {openMatchCount > 0 && (
                  <span className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full bg-orange-500 text-[8px] sm:text-[10px] font-bold text-white ring-1 sm:ring-2 ring-zinc-950">
                    {openMatchCount}
                  </span>
                )}
              </button>

              <button
                id="tab-bookings-bttn"
                onClick={() => setActiveTab('bookings')}
                className={`relative flex items-center gap-1 sm:gap-1.5 rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-250 ${
                  activeTab === 'bookings'
                    ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">{t('myTickets')}</span>
                {bookingCount > 0 && (
                  <span className="absolute -top-1 sm:-top-1.5 -right-1 sm:-right-1.5 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full bg-lime-400 text-[8px] sm:text-[10px] font-bold text-zinc-950 ring-1 sm:ring-2 ring-zinc-950">
                    {bookingCount}
                  </span>
                )}
              </button>
            </div>

            {/* Language Switch Segment Pill */}
            <div className="flex rounded-lg bg-zinc-900 p-0.5 sm:p-1 border border-zinc-800 text-[10px] sm:text-xs font-mono font-black shrink-0">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-md transition-all uppercase cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-tr from-lime-400 to-emerald-500 text-zinc-950 font-extrabold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="English Language"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-md transition-all uppercase cursor-pointer ${
                  language === 'ar'
                    ? 'bg-gradient-to-tr from-lime-400 to-emerald-500 text-zinc-950 font-extrabold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="اللغة العربية"
              >
                عربي
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
