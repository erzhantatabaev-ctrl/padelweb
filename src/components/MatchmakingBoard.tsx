import React, { useState } from 'react';
import { OpenMatch, PlayLevel } from '../types';
import { Users, Calendar, Clock, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../translations';

interface MatchmakingBoardProps {
  openMatches: OpenMatch[];
  onJoinMatch: (matchId: string, playerName: string, playerLevel: PlayLevel) => void;
}

export default function MatchmakingBoard({ openMatches, onJoinMatch }: MatchmakingBoardProps) {
  const { t, language } = useLanguage();
  const [joiningMatchId, setJoiningMatchId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userLevel, setUserLevel] = useState<PlayLevel>('Intermediate (3.0 - 4.5)');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoinSubmit = (e: React.FormEvent, matchId: string) => {
    e.preventDefault();
    if (!userName.trim()) {
      setErrorMsg(language === 'ar' ? 'الاسم مطلوب' : 'Player name is required');
      return;
    }
    setErrorMsg('');
    onJoinMatch(matchId, userName.trim(), userLevel);
    
    // reset form
    setUserName('');
    setJoiningMatchId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
            {t('matchmakingTitle')}
          </h2>
          <p className="text-xs text-zinc-400 font-mono uppercase mt-0.5">
            {t('matchmakingSub')}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-900 font-mono text-xs">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-zinc-300 font-bold uppercase">
            {openMatches.length} {language === 'ar' ? 'مجموعات مفتوحة للتوظيف' : 'OPEN SESSIONS RECRUITING'}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {openMatches.length === 0 ? (
          <div className="col-span-2 text-center py-12 rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/40">
            <Users className="h-8 w-8 text-zinc-600 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mt-4">{t('emptyMatches')}</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
              {t('emptyMatchesDesc')}
            </p>
          </div>
        ) : (
          openMatches.map((match) => {
            const isJoining = joiningMatchId === match.id;
            const isFull = match.spotsLeft <= 0;

            return (
              <div
                key={match.id}
                className={`relative rounded-2xl border bg-zinc-950 p-5 flex flex-col justify-between transition-all duration-300 ${
                  isFull
                    ? 'border-zinc-900 opacity-60'
                    : 'border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/10'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider text-orange-400 bg-orange-400/15 px-2 py-0.5 rounded">
                      {t('publicLobbyTag')}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5 uppercase tracking-tight leading-none">
                      {t(`${match.bookingId.startsWith('court-') ? match.bookingId : 'court-1'}-name` as any) || match.courtName}
                    </h3>
                  </div>

                  {/* Spot Badge Status */}
                  <div className={`rounded-lg px-2.5 py-1.5 text-center font-mono ${
                    isFull
                      ? 'bg-zinc-900 text-zinc-600 border border-zinc-850'
                      : 'bg-zinc-900 text-orange-400 border border-orange-400/20'
                  }`}>
                    <p className="text-[9px] text-zinc-500 font-black leading-none uppercase">{language === 'ar' ? 'شاغر' : 'SPOTS LEFT'}</p>
                    <p className="text-lg font-black leading-none mt-1">
                      {match.spotsLeft} <span className="text-[10px] text-zinc-600">/ 4</span>
                    </p>
                  </div>
                </div>

                {/* Date & Time display */}
                <div className="flex gap-4 items-center bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 my-4 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-lime-400" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4">
                    <Clock className="h-4 w-4 text-lime-400" />
                    <span>{match.timeSlot}</span>
                  </div>
                </div>

                {/* Host Details & Current Squad */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 font-mono font-bold text-zinc-300 text-[10px] border border-zinc-800">
                        H
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[10px] font-mono leading-none">{t('hostLabel')}</p>
                        <p className="text-white font-bold max-w-[145px] truncate mt-0.5">{match.hostName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 text-[10px] font-mono leading-none">{t('requiredLevelLabel')}</p>
                      <p className="text-lime-400 font-bold mt-0.5 text-[11px] font-mono">{match.hostLevel.split(' ')[0]}</p>
                    </div>
                  </div>

                  {/* Joined Squad Members */}
                  <div className="pt-3 border-t border-zinc-900">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">{t('registeredPlayers')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {match.joinedPlayers.map((player, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10.5px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1"
                        >
                          🎾 {player}
                        </span>
                      ))}
                      {match.spotsLeft > 0 && Array.from({ length: match.spotsLeft }).map((_, idx) => (
                        <span
                          key={`empty-${idx}`}
                          className="font-mono text-[10.5px] border border-dashed border-zinc-850 hover:border-zinc-700 rounded px-2.5 py-1 text-zinc-600"
                        >
                          ⚡ {language === 'ar' ? 'مركز شاغر' : 'Open Position'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Join Match Form or Actions */}
                <div className="mt-4 pt-3 border-t border-zinc-900">
                  <AnimatePresence mode="wait">
                    {isJoining ? (
                      <motion.form
                        onSubmit={(e) => handleJoinSubmit(e, match.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3.5"
                      >
                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            {t('lblFullName')} *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={language === 'ar' ? 'ادخل اسمك بالكامل' : 'Enter display name'}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-lime-400 focus:outline-none text-white placeholder-zinc-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            {t('lblSkill')} *
                          </label>
                          <select
                            value={userLevel}
                            onChange={(e) => setUserLevel(e.target.value as PlayLevel)}
                            className="w-full text-xs font-mono font-bold bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 focus:border-lime-400 focus:outline-none text-white"
                          >
                            <option value="Beginner (1.0 - 2.5)">{language === 'ar' ? 'مبتدئ (1.0 - 2.5)' : 'Beginner (1.0 - 2.5)'}</option>
                            <option value="Intermediate (3.0 - 4.5)">{language === 'ar' ? 'متوسط (3.0 - 4.5)' : 'Intermediate (3.0 - 4.5)'}</option>
                            <option value="Advanced (5.0 - 7.0)">{language === 'ar' ? 'متقدم (5.0 - 7.0)' : 'Advanced (5.0 - 7.0)'}</option>
                          </select>
                        </div>

                        {errorMsg && (
                          <p className="text-red-500 text-[10.5px] font-mono">{errorMsg}</p>
                        )}

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 bg-lime-400 hover:bg-lime-300 text-zinc-955 font-black text-xs uppercase py-2.5 rounded-lg transition tracking-wider text-center cursor-pointer"
                          >
                            {language === 'ar' ? 'وظفني' : 'Recruit Me'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setJoiningMatchId(null);
                              setErrorMsg('');
                            }}
                            className="bg-zinc-805 hover:bg-zinc-700 text-zinc-400 hover:text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition tracking-wide cursor-pointer"
                          >
                            {t('cancelBtn')}
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <div>
                        {isFull ? (
                          <div className="flex items-center justify-center gap-2 bg-zinc-900/40 border border-zinc-900 rounded-lg py-3.5 font-mono text-xs text-zinc-500 font-bold uppercase">
                            <CheckCircle className="h-4 w-4" />
                            <span>{t('matchFull')}</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setJoiningMatchId(match.id)}
                            className="w-full bg-orange-500 hover:bg-orange-400 text-zinc-950 font-black text-xs uppercase py-3 rounded-xl transition tracking-wider leading-none flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 cursor-pointer"
                          >
                            <Plus className="h-4 w-4 stroke-[3]" />
                            <span>{t('joinBtn')}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
