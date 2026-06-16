import React, { useState } from 'react';
import { MapPin, Navigation, Info, ShieldCheck, Sparkles, Phone, Compass } from 'lucide-react';

interface LocationInfo {
  id: string;
  name: string;
  courts: string[];
  coords: { lat: number; lng: number };
  address: string;
  phone: string;
  pinColor: string;
  description: string;
}

const DO_LOCATIONS: LocationInfo[] = [
  {
    id: 'loc-1',
    name: 'Sector A: Veloce West Bay Dome',
    courts: ['The Grand Slam Showcourt', 'Apex Arena'],
    coords: { lat: 25.3223, lng: 51.5284 }, // West Bay / Diplomatic Area
    address: 'Diplomatic Street, West Bay, Doha, Qatar',
    phone: '+974 4455 0101',
    pinColor: '#a3e635', // Sleek Lime
    description: 'Indoor pro dome featuring WPT-approved panoramic turf with high altitude double ceilings.'
  },
  {
    id: 'loc-2',
    name: 'Sector B: Veloce Sunset Vista (The Pearl)',
    courts: ['Sunset Vista Outdoor'],
    coords: { lat: 25.3712, lng: 51.5476 }, // Porto Arabia / The Pearl
    address: 'Porto Arabia Towers Marina, The Pearl-Qatar, Doha',
    phone: '+974 4455 0102',
    pinColor: '#f97316', // Sunset Orange
    description: 'Magnificent outdoor courts reflecting waterfront breeze and premium sunset twilight ambiance.'
  },
  {
    id: 'loc-3',
    name: 'Sector C: Coastal Breeze Katara Stadium',
    courts: ['Coastal Breeze green grass'],
    coords: { lat: 25.3548, lng: 51.5244 }, // Katara Village
    address: 'Shakespeare Boulevard, Katara Cultural Village, Doha',
    phone: '+974 4455 0103',
    pinColor: '#06b6d4', // Breeze Cyan
    description: 'Bespoke turf courts surrounded by culture, arts, and high energy spectators.'
  }
];

export default function CourtLocationMap({ onSelectCourtId }: { onSelectCourtId: (id: string) => void }) {
  // Default to West Bay Dome
  const [selectedLoc, setSelectedLoc] = useState<LocationInfo>(DO_LOCATIONS[0]);
  const [zoomLevel, setZoomLevel] = useState(15);
  // Color configuration: 'vibrant' (original rich Google Maps colors) or 'cyber-dark' (dark inverted slate style)
  const [colorMode, setColorMode] = useState<'vibrant' | 'cyber-dark'>('vibrant');
  // Map standard type: 'm' (roadmap view) or 'k' (high-definition satellite view)
  const [mapType, setMapType] = useState<'m' | 'k'>('m');

  const handleSelectLocation = (loc: LocationInfo) => {
    setSelectedLoc(loc);
    setZoomLevel(15);
  };

  // Build the embed URL safely using the coordinate values and active view type
  const iframeSrc = `https://maps.google.com/maps?q=${selectedLoc.coords.lat},${selectedLoc.coords.lng}&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  // Determine current inline filter style based on active colorMode
  const mapFilterStyle = colorMode === 'cyber-dark' 
    ? { border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%) contrast(110%)' }
    : { border: 0, filter: 'none' };

  return (
    <div id="veloce-interactive-map-dashboard" className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-4 sm:p-6 space-y-6 my-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/10 px-2.5 py-0.5 border border-lime-400/20 font-mono text-[10px] uppercase font-bold text-lime-400 tracking-wider">
            <Compass className="h-3.5 w-3.5" />
            <span>Doha Elite Arena GPS System</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            Veloce Doha Locations & Hubs
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-md">
          Quickly select any of our premium arenas below to update the interactive Doha Google Map instantly. No additional configuration needed!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Places List in Doha */}
        <div className="space-y-3.5 lg:col-span-1 max-h-[450px] overflow-y-auto pr-1">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-2">
            Select Active Arena Sector
          </div>
          {DO_LOCATIONS.map((loc) => {
            const isSelected = selectedLoc.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-zinc-900 border-lime-400/40 shadow-md shadow-lime-400/5'
                    : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-805'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-extrabold uppercase text-xs text-white tracking-wide">
                    {loc.name}
                  </h4>
                  <span
                    className="h-2.5 w-2.5 rounded-full block shrink-0 mt-0.5"
                    style={{ backgroundColor: loc.pinColor }}
                  />
                </div>
                
                <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                  {loc.description}
                </p>

                <p className="text-[10px] text-zinc-500 mt-3 font-mono flex items-center gap-1">
                  <Navigation className="h-3 w-3 text-zinc-500 shrink-0" />
                  <span className="truncate">{loc.address}</span>
                </p>

                <div className="mt-3.5 pt-3.5 border-t border-zinc-900/80 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-lime-400 uppercase font-bold">
                    {loc.courts.length} Active {loc.courts.length === 1 ? 'Court' : 'Courts'}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-0.5">
                    <Phone className="h-2.5 w-2.5 text-zinc-500" /> {loc.phone}
                  </span>
                </div>
              </button>
            );
          })}
          
          <div className="bg-zinc-900/20 p-4 rounded-2xl border border-zinc-900/60 flex items-start gap-2.5 text-[11px] text-zinc-400 leading-relaxed font-sans mt-4">
            <Info className="h-4.5 w-4.5 text-lime-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-white uppercase block">WPT Pro Out-of-bounds Zone</span>
              Our Doha properties feature standard wide runoff alleys allowing elite out-of-boundary saves.
            </div>
          </div>
        </div>

        {/* Right Side: Map Canvas using IFRAME */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-zinc-900 h-[400px] lg:h-[480px] relative bg-zinc-900 flex flex-col">
          {/* Virtual Top Bar simulating custom dashboard overlay */}
          <div className="bg-zinc-900 border-b border-zinc-950 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono shrink-0">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase font-bold text-white">Live Map Tracker</span>
              <span className="text-zinc-650">|</span>
              <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-xs">{selectedLoc.address}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Map Type Toggle */}
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-850">
                <button
                  onClick={() => setMapType('m')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition duration-150 ${
                    mapType === 'm'
                      ? 'bg-lime-400 text-zinc-950 shadow'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                  title="Standard Map View"
                >
                  Roadmap
                </button>
                <button
                  onClick={() => setMapType('k')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition duration-150 ${
                    mapType === 'k'
                      ? 'bg-lime-400 text-zinc-950 shadow'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                  title="Satellite View"
                >
                  Satellite
                </button>
              </div>

              {/* Color Mode Toggle */}
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-850">
                <button
                  onClick={() => setColorMode('vibrant')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition duration-150 flex items-center gap-1 ${
                    colorMode === 'vibrant'
                      ? 'bg-emerald-500 text-white shadow font-extrabold text-[9.5px]'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                  title="Vibrant high contract original colors"
                >
                  🎨 Full Color
                </button>
                <button
                  onClick={() => setColorMode('cyber-dark')}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition duration-150 flex items-center gap-1 ${
                    colorMode === 'cyber-dark'
                      ? 'bg-zinc-800 text-white shadow border border-zinc-700'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                  title="Cyber Dark slate map"
                >
                  🕶️ Cyber Dark
                </button>
              </div>

              {/* Zoom Buttons */}
              <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-850 overflow-hidden divide-x divide-zinc-800">
                <button 
                  onClick={() => setZoomLevel(prev => Math.min(18, prev + 1))}
                  className="bg-transparent hover:bg-zinc-800 text-zinc-300 font-bold px-2 py-1 transition flex items-center"
                  title="Zoom In"
                >
                  +
                </button>
                <button 
                  onClick={() => setZoomLevel(prev => Math.max(10, prev - 1))}
                  className="bg-transparent hover:bg-zinc-800 text-zinc-300 font-bold px-2 py-1 transition flex items-center"
                  title="Zoom Out"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative">
            <iframe
              title={`Google Map - ${selectedLoc.name}`}
              src={iframeSrc}
              width="100%"
              height="100%"
              style={mapFilterStyle}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-b-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
