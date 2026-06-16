import React from 'react';
import { Equipment } from '../types';
import { EQUIPMENT_DATA } from '../data';
import { ShoppingBag, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../translations';

interface RentalHubProps {
  selectedRentals: Record<string, number>;
  onQtyChange: (id: string, qty: number) => void;
}

export default function RentalHub({ selectedRentals, onQtyChange }: RentalHubProps) {
  const { t, language } = useLanguage();

  // Dynamic equipment descriptive text if needed
  const getTranslatedItemName = (item: Equipment) => {
    // Standard names are perfect, but accessories can be translated
    if (item.id === 'eq-balls') return t('spectatorGear');
    if (item.id === 'eq-overgrip') return t('accessGear');
    return item.name;
  };

  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight">{t('rentalHubTitle')}</h3>
          <p className="text-xs text-zinc-500 font-mono uppercase">{t('rentalHubSub')}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {EQUIPMENT_DATA.map((item) => {
          const qty = selectedRentals[item.id] || 0;
          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                qty > 0
                  ? 'border-lime-400 bg-zinc-900/40 shadow-md shadow-lime-400/2'
                  : 'border-zinc-900 bg-zinc-950 hover:border-zinc-805'
              }`}
            >
              {/* Top portion header */}
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-2xl">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-lime-400 bg-lime-400/10 px-1.5 py-0.5 rounded">
                      {item.brand}
                    </span>
                    {item.specs && (
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-tight">
                        ⚡ {item.specs.weight}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight mt-1 line-clamp-1">
                    {getTranslatedItemName(item)}
                  </h4>
                  <p className="font-mono text-xs font-black text-white mt-0.5">
                    ${item.price} <span className="text-[10px] font-normal text-zinc-500">{t('sessionSuffix')}</span>
                  </p>
                </div>
              </div>

              {/* Racket performance metrics */}
              {item.specs && (
                <div className="space-y-1.5 mt-3 pt-3 border-t border-zinc-900/60 font-mono text-[10px]">
                  <div>
                    <div className="flex justify-between text-zinc-400 mb-0.5">
                      <span>{t('powerAttack')}</span>
                      <span className="text-white font-bold">{item.specs.power}/10</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${item.specs.power * 10}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-400 mb-0.5">
                      <span>{t('techControl')}</span>
                      <span className="text-white font-bold">{item.specs.control}/10</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-lime-400 rounded-full"
                        style={{ width: `${item.specs.control * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Select Control */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-900/40">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{t('rentQuantity')}</span>
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (qty > 0) onQtyChange(item.id, qty - 1);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center font-mono text-xs font-bold text-white">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => onQtyChange(item.id, qty + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
