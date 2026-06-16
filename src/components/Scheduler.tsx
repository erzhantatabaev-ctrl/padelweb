import React from 'react';
import { TimeSlot } from '../types';
import { TIME_SLOTS } from '../data';
import { Calendar, Flame, Clock } from 'lucide-react';
import { useLanguage } from '../translations';

interface SchedulerProps {
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  selectedSlot: string; // Slot ID
  setSelectedSlot: (slotId: string) => void;
  courtPricePerHour: number;
}

export default function Scheduler({
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  courtPricePerHour,
}: SchedulerProps) {
  const { t, language } = useLanguage();

  // Generate 7 consecutive days starting from dynamic context
  const getNextSevenDays = () => {
    const days = [];
    const start = new Date(2026, 5, 11); // June 11, 2026, or raw date
    const now = new Date();
    const activeStart = now.getFullYear() >= 2026 ? now : start;

    for (let i = 0; i < 7; i++) {
      const d = new Date(activeStart);
      d.setDate(activeStart.getDate() + i);
      // Automatically output Arabic or English weekday and month names
      const dayName = d.toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-US', { month: 'short' });
      
      const year = d.getFullYear();
      const monthStr = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const formatted = `${year}-${monthStr}-${dayStr}`;

      days.push({
        formatted,
        dayName,
        dayNum,
        monthName,
      });
    }
    return days;
  };

  const dates = getNextSevenDays();

  // Helper to calculate cost for 1.5 hour session based on peak time multiplier
  const calculateSlotPrice = (slot: TimeSlot) => {
    const baseSessionPrice = courtPricePerHour * 1.5;
    return slot.isPeak ? Math.round(baseSessionPrice * 1.25) : baseSessionPrice;
  };

  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-6">
      
      {/* Dynamic Date Carousel */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight">{t('selectMatchDateLabel')}</h3>
            <p className="text-xs text-zinc-500 font-mono uppercase">{t('activeWindowLabel')}</p>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {dates.map((date) => {
            const isTodaySelected = selectedDate === date.formatted;
            return (
              <button
                key={date.formatted}
                onClick={() => setSelectedDate(date.formatted)}
                className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 min-w-[70px] border transition-all duration-200 cursor-pointer shrink-0 ${
                  isTodaySelected
                    ? 'border-lime-400 bg-lime-400/10 text-lime-400 shadow-md shadow-lime-400/5'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] uppercase font-bold tracking-wide">{date.dayName}</span>
                <span className="text-lg font-black tracking-tight my-0.5">{date.dayNum}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{date.monthName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedulers Time Slot Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight">{t('selectSessionSlot')}</h3>
              <p className="text-xs text-zinc-500 font-mono uppercase">{t('durationLabel')}</p>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-zinc-900 border border-zinc-800" />
              <span>{t('rateStandardLabel')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-orange-500/10 border border-orange-500/40" />
              <span>{t('ratePeakLabel')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot.id;
            const price = calculateSlotPrice(slot);
            return (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`relative flex flex-col justify-between items-start rounded-xl p-3.5 border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'border-lime-400 bg-lime-400/15 text-lime-400 shadow-md shadow-lime-400/5 ring-1 ring-lime-400/30'
                    : slot.isPeak
                    ? 'border-orange-500/25 bg-orange-500/5 hover:border-orange-500/50 hover:bg-orange-500/10'
                    : 'border-zinc-900 bg-zinc-950 hover:border-zinc-850 hover:bg-zinc-900/40'
                }`}
              >
                {slot.isPeak && (
                  <span className="absolute top-2 right-2 flex items-center gap-0.5 rounded bg-orange-500/10 px-1 py-0.5 font-mono text-[8px] font-black uppercase text-orange-400/90">
                    <Flame className="h-2.5 w-2.5 animate-pulse text-orange-500" />
                    {t('peakTag')}
                  </span>
                )}
                
                <span className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white">
                  {slot.label}
                </span>

                <div className="mt-3 leading-none">
                  <span className="font-mono text-[9px] text-zinc-400 block mb-0.5 uppercase">{t('sessionRateLabel')}</span>
                  <span className={`font-mono text-sm font-extrabold ${isSelected ? 'text-lime-400' : 'text-white'}`}>
                    ${price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
