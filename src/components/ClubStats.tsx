import React from 'react';
import { Shield, Zap, Flame, Clock } from 'lucide-react';
import { useLanguage } from '../translations';

export default function ClubStats() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('stat1Label'),
      value: '11.5m',
      desc: t('stat1Desc'),
      icon: <Zap className="h-4 w-4 text-lime-400" />
    },
    {
      label: t('stat2Label'),
      value: 'MONDO',
      desc: t('stat2Desc'),
      icon: <Flame className="h-4 w-4 text-orange-500" />
    },
    {
      label: t('stat3Label'),
      value: '98%',
      desc: t('stat3Desc'),
      icon: <Shield className="h-4 w-4 text-indigo-400" />
    },
    {
      label: t('stat4Label'),
      value: '24/7',
      desc: t('stat4Desc'),
      icon: <Clock className="h-4 w-4 text-emerald-400" />
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 relative overflow-hidden group hover:border-lime-500/30 hover:bg-gradient-athletic hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-40 transition-all duration-300 group-hover:scale-110">
            {stat.icon}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{stat.label}</p>
          <p className="mt-1 font-mono text-xl font-extrabold text-white tracking-tight">{stat.value}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{stat.desc}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
}
