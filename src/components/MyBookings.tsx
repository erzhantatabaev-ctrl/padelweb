import React from 'react';
import { Booking } from '../types';
import { Clock, Calendar, XCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../translations';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export default function MyBookings({ bookings, onCancelBooking }: MyBookingsProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
          {t('ticketsTitle')}
        </h2>
        <p className="text-xs text-zinc-400 font-mono uppercase mt-0.5">
          {t('ticketsSub')}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/40">
          <Calendar className="h-8 w-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mt-4">{t('emptyTickets')}</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
            {t('emptyTicketsDesc')}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const hasRentals = booking.rentals && booking.rentals.length > 0;
            // Translate court name if possible, otherwise use fallback
            const trCourtName = t(`${booking.courtId}-name` as any) || booking.courtName;

            return (
              <div
                key={booking.id}
                className="relative rounded-2xl border border-zinc-850 bg-zinc-950 overflow-hidden flex flex-col justify-between shadow-lg hover:border-zinc-700 transition"
              >
                {/* Boarding ticket side notch visualization */}
                <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-zinc-955 border-r border-zinc-800 transform -translate-y-1/2 z-10" />
                <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-zinc-955 border-l border-zinc-800 transform -translate-y-1/2 z-10" />

                {/* Ticket header */}
                <div className="p-5 border-b border-dashed border-zinc-800/80 bg-gradient-to-r from-zinc-950 to-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-black uppercase tracking-wider text-lime-400 bg-lime-400/10 px-2.5 py-0.5 rounded">
                      {booking.isPublicMatch ? t('publicLobbyTag') : t('privateLobbyTag')}
                    </span>
                    <span className="font-mono text-xs font-black text-zinc-500 uppercase tracking-wide">
                      {t('ticketCode')} {booking.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight mt-3 leading-tight">
                    {trCourtName}
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono mt-0.5">
                    {t('arenaComplex')}
                  </p>
                </div>

                {/* Ticket body info */}
                <div className="p-5 space-y-4">
                  
                  {/* Date & Time slot */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900">
                      <p className="font-mono text-[9px] text-zinc-500 uppercase">{t('ticketMatchDate')}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-white font-bold text-xs">
                        <Calendar className="h-3.5 w-3.5 text-lime-400" />
                        <span>{booking.date}</span>
                      </div>
                    </div>

                    <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900">
                      <p className="font-mono text-[9px] text-zinc-500 uppercase">{t('ticketTimeslot')}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-white font-bold text-xs/none">
                        <Clock className="h-3.5 w-3.5 text-lime-400 shrink-0" />
                        <span className="truncate">{booking.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Player & Contact Roster Info */}
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-zinc-500 uppercase">{t('ticketHost')}</p>
                    <div className="flex justify-between text-xs pb-1.5 border-b border-zinc-900/60">
                      <span className="text-white font-bold">{booking.playerName}</span>
                      <span className="text-zinc-400 font-mono text-[10.5px]">
                        {booking.playerLevel.split(' ')[0]} {t('ticketRating')}
                      </span>
                    </div>
                  </div>

                  {/* Rental details list */}
                  {hasRentals ? (
                    <div>
                      <p className="font-mono text-[9px] text-zinc-505 uppercase mb-2">{t('ticketGearTitle')}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {booking.rentals.map((rental, idx) => {
                          const isBalls = rental.equipmentId === 'eq-balls';
                          const isGrip = rental.equipmentId === 'eq-overgrip';
                          const trRentalName = isBalls ? t('spectatorGear') : isGrip ? t('accessGear') : rental.name;
                          return (
                            <span
                              key={idx}
                              className="font-mono text-[10px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-850 rounded px-2.5 py-1"
                            >
                              ⭐ {trRentalName} <span className="text-lime-400 font-black">x{rental.quantity}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="font-mono text-[9.5px] text-zinc-600 uppercase leading-snug">{t('ticketOwnGear')}</p>
                  )}

                  {/* Visual simulated barcode */}
                  <div className="pt-4 border-t border-zinc-900 flex flex-col items-center justify-center">
                    <div className="flex h-10 w-full items-center gap-[2.5px] overflow-hidden opacity-75">
                      {Array.from({ length: 48 }).map((_, index) => {
                        const heights = ['h-9', 'h-10', 'h-8', 'h-10'];
                        const widths = ['w-[1px]', 'w-[2px]', 'w-[3px]', 'w-[1.5px]'];
                        const heightClass = heights[index % heights.length];
                        const widthClass = widths[index % widths.length];
                        const colorClass = index % 7 === 0 ? 'bg-zinc-800' : 'bg-white';
                        return (
                          <div
                            key={index}
                            className={`${heightClass} ${widthClass} ${colorClass} shrink-0`}
                          />
                        );
                      })}
                    </div>
                    <span className="font-mono text-[9px] text-zinc-500 mt-2 tracking-[0.4em] uppercase">
                      * VP-{booking.id.toUpperCase()}-X *
                    </span>
                  </div>

                </div>

                {/* Ticket footer */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex justify-between items-center sm:gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block leading-none">{t('ticketTotalSecured')}</span>
                    <span className="font-mono text-base font-black text-lime-400 mt-1 inline-block">
                      ${booking.price}
                    </span>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onCancelBooking(booking.id)}
                      className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-zinc-90 w hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/20 text-zinc-400 hover:text-red-400 font-bold font-mono text-[10.5px] uppercase cursor-pointer transition flex items-center gap-1.5"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>{t('cancelBookingBtn')}</span>
                    </button>
                    <div className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold font-mono text-[10px] uppercase">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{t('securedStatus')}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
