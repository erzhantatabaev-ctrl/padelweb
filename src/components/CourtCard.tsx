import React from 'react';
import { Court } from '../types';
import { Shield, Sparkles, Check, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../translations';

interface CourtCardProps {
  key?: string | number;
  court: Court;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CourtCard({ court, isSelected, onSelect }: CourtCardProps) {
  const { t } = useLanguage();

  // Dynamically resolve translations if keys exist, otherwise fallback safely
  const nameKey = `${court.id}-name` as any;
  const surfaceKey = `${court.id}-surface` as any;
  const descKey = `${court.id}-desc` as any;

  const translatedName = t(nameKey) || court.name;
  const translatedSurface = t(surfaceKey) || court.surface;
  const translatedDesc = t(descKey) || court.description;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border overflow-hidden transition-all duration-300 ${
        isSelected
          ? court.type === 'indoor'
            ? 'border-lime-400 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 shadow-lg shadow-lime-400/10 ring-2 ring-lime-400/30'
            : 'border-orange-400 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 shadow-lg shadow-orange-500/10 ring-2 ring-orange-400/20'
          : 'border-zinc-900 bg-zinc-950 hover:border-zinc-800'
      }`}
    >
      {/* Court Image wrapper */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-zinc-900">
        <img
          src={court.image}
          alt={translatedName}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Type Badge (Indoor/Outdoor) */}
        <span className={`absolute top-3 left-3 rounded-full font-mono text-[10px] uppercase font-black tracking-widest px-3 py-1 shadow-md ${
          court.type === 'indoor'
            ? 'bg-gradient-to-r from-lime-400 to-emerald-500 text-zinc-950 font-extrabold'
            : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold'
        }`}>
          {court.type === 'indoor' ? t('indoor') : t('outdoor')}
        </span>

        {/* Price Tag */}
        <div className="absolute top-3 right-3 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-900 px-3 py-1.5 text-right">
          <p className="font-mono text-[9px] text-zinc-500 leading-none uppercase">{t('rateTitle')}</p>
          <p className="font-mono text-sm sm:text-base font-extrabold text-lime-400 leading-tight tracking-tight mt-0.5">
            ${court.pricePerHour * 1.5} <span className="text-[9.5px] text-zinc-400 font-normal">QAR</span>
          </p>
        </div>
      </div>

      {/* Details section */}
      <div className="p-5 flex flex-col justify-between h-[210px]">
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight line-clamp-1">{translatedName}</h3>
          <p className="font-mono text-[10.5px] text-zinc-500 mt-1 uppercase tracking-wide">
            {translatedSurface}
          </p>
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {translatedDesc}
          </p>
        </div>

        {/* Key specs and bullet highlights */}
        <div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 py-3 border-t border-b border-zinc-900 mt-3">
            {court.features.slice(0, 2).map((feat, index) => (
              <div key={index} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                <span className="h-1 w-1 rounded-full bg-lime-400 inline-block shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
            {court.features.slice(2, 4).map((feat, index) => (
              <div key={index} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                <span className="h-1 w-1 rounded-full bg-lime-400 inline-block shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              {court.type === 'indoor' ? t('climateControl') : t('skyDeck')}
            </span>
            <div className={`flex h-6 items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-all ${
              isSelected 
                ? court.type === 'indoor' ? 'text-lime-400 font-extrabold text-[12px]' : 'text-orange-400 font-extrabold text-[12px]'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}>
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>{t('selectedCourtBtn')}</span>
                </>
              ) : (
                <span className="hover:underline">{t('selectCourtBtn')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
