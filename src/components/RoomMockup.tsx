import React, { useState } from 'react';
import { Home, Minimize2, Move, Compass } from 'lucide-react';
import { FrameMaterial } from '../types';

interface RoomMockupProps {
  imageUrl: string;
  frameStyle: string; // e.g. Fruits, Vegetables...
  material: FrameMaterial;
  matColor: string; // e.g. None, Pine, Bamboo...
  matSize: number; // inches
  frameColorHex?: string; // hex color code
  frameWidth?: number; // border width
  sizeLabel?: string; // size label
}

// 3 premium high-end living spaces with clear kitchen & dining settings
const INTERIOR_TEMPLATES = [
  {
    id: 'kitchen-counter',
    name: 'Artisanal Kitchen Counter-top',
    bg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    defaultX: 50, // center horizontal %
    defaultY: 55, // vertical %
    defaultScale: 1.0,
    wallColor: 'Sand Stone'
  },
  {
    id: 'dining-setup',
    name: 'Rustic Dining Table Runner',
    bg: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    defaultX: 52,
    defaultY: 48,
    defaultScale: 0.95,
    wallColor: 'Limestone Gray'
  },
  {
    id: 'pantry-shelf',
    name: 'Vedic Household Eco-Pantry',
    bg: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
    defaultX: 50,
    defaultY: 45,
    defaultScale: 0.85,
    wallColor: 'Chalk White'
  }
];

export default function RoomMockup({
  imageUrl,
  frameStyle,
  material,
  matColor,
  matSizeResponse = 1.5,
  frameColorHex = '#d4af37',
  frameWidth = 14,
  sizeLabel = 'Standard 1 Kg Air Crate'
}: RoomMockupProps & { matSizeResponse?: number }) {
  const [selectedRoom, setSelectedRoom] = useState(INTERIOR_TEMPLATES[0]);
  const [frameX, setFrameX] = useState(50); // horizontal %
  const [frameY, setFrameY] = useState(55); // vertical %
  const [scale, setScale] = useState(1.0); // manual scale adjust

  // Set crate border mock styling based on wood choice
  const getCrateStyleCSS = (): React.CSSProperties => {
    let borderWidthPx = Math.max(10, frameWidth * 1.1); 
    return {
      border: `${borderWidthPx}px solid ${frameColorHex}`,
      boxShadow: '0 25px 40px -10px rgba(0,0,0,0.4), inset 0 2px 8px rgba(0,0,0,0.15)',
      borderRadius: '4px'
    };
  };

  const handleReset = () => {
    setFrameX(selectedRoom.defaultX);
    setFrameY(selectedRoom.defaultY);
    setScale(selectedRoom.defaultScale);
  };

  return (
    <div className="flex flex-col space-y-6" id="room-mockup-wrapper">
      
      {/* Interactive Mockup Stage */}
      <div className="relative overflow-hidden rounded-xl border border-sand-300 bg-sand-200 aspect-[16/10] w-full shadow-lg">
        
        {/* Background Kitchen/pantry Scene */}
        <img 
          src={selectedRoom.bg} 
          alt={selectedRoom.name}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Overlay to blend shadows smoothly */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/10 via-transparent to-transparent pointer-events-none" />

        {/* Dynamic Fresh Harvest Box on Table */}
        <div 
          className="absolute origin-center transition-all duration-300 select-none cursor-grab active:cursor-grabbing flex items-center justify-center bg-white"
          style={{
            left: `${frameX}%`,
            top: `${frameY}%`,
            transform: `translate(-50%, translate-y-[-50%]) scale(${scale * 0.45})`,
            ...getCrateStyleCSS()
          }}
          id="mockup-frame-element"
        >
          {/* Crate Filling Area with styled wooden padding representing container edges */}
          <div 
            className="w-full h-full flex items-center justify-center relative bg-[#faf9f6] p-4"
            style={{
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* Inner Art Photo Print */}
            <img 
              src={imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop'} 
              referrerPolicy="no-referrer"
              alt="Crate Preview"
              className="max-h-[220px] object-contain transition-all duration-100 rounded-xs"
              style={{
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>

        {/* Overlay Label for Scale reference */}
        <div className="absolute bottom-4 left-4 rounded-md bg-emerald-950/90 border border-emerald-400/20 px-4 py-1.5 text-[10px] font-mono font-medium tracking-widest text-emerald-200 backdrop-blur-xs shadow-md">
          {sizeLabel} — Air-Lock: Fresh Ventilation
        </div>

        {/* Real-time packing alignment helper */}
        <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-white/90 bg-emerald-800/90 border border-emerald-400/25 px-3 py-1 rounded-sm backdrop-blur-xs uppercase select-none">
          Live Interactive Pantry Visualizer
        </div>

      </div>

      {/* Control Station Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-sand-100/70 p-5 rounded-lg border border-sand-300">
        
        {/* Step 1: Select Room Environment */}
        <div className="space-y-3">
          <label className="text-xs font-semibold tracking-widest text-charcoal-800 uppercase flex items-center space-x-2">
            <Home className="h-3.5 w-3.5 text-emerald-700" />
            <span>Select Dining/Kitchen Area</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {INTERIOR_TEMPLATES.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  setFrameX(room.defaultX);
                  setFrameY(room.defaultY);
                  setScale(room.defaultScale);
                }}
                className={`flex flex-col text-left p-1.5 rounded-md border transition-all cursor-pointer bg-white ${
                  selectedRoom.id === room.id 
                    ? 'border-emerald-600 ring-1 ring-emerald-500/20' 
                    : 'border-sand-300 hover:border-sand-400'
                }`}
                id={`room-select-${room.id}`}
              >
                <div className="h-10 w-full overflow-hidden rounded-xs bg-sand-200">
                  <img src={room.bg} alt="" className="h-full w-full object-cover" />
                </div>
                <span className="mt-1 text-[9px] font-bold truncate text-charcoal-900 block" title={room.name}>
                  {room.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Wall Placement Controls */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-widest text-charcoal-800 uppercase flex items-center space-x-2">
              <Compass className="h-3.5 w-3.5 text-emerald-700" />
              <span>Calibrate Space & Container Scale</span>
            </span>
            
            {/* Wall Position controller sliders */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-medium text-charcoal-400">
                <span className="flex items-center space-x-1.5">
                  <Move className="h-3.5 w-3.5" />
                  <span>Vertical Slide (Placement)</span>
                </span>
                <span className="font-mono text-xs">{frameY}% height</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="85" 
                value={frameY} 
                onChange={(e) => setFrameY(Number(e.target.value))}
                className="w-full accent-emerald-600"
                id="slider-room-vertical"
              />

              <div className="flex items-center justify-between text-[11px] font-medium text-charcoal-400">
                <span className="flex items-center space-x-1.5">
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Interactive Box Scale</span>
                </span>
                <span className="font-mono text-xs">{Math.round(scale * 100)}% scale</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1.6" 
                step="0.05"
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-emerald-600"
                id="slider-room-scale"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-sand-200/50 p-2 rounded-md">
            <span className="text-[10px] text-charcoal-405 font-medium">Auto-align crate box to center balance</span>
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-white border border-sand-300 rounded-md text-[10px] font-bold text-charcoal-800 hover:text-charcoal-900 hover:bg-sand-50 transition-colors cursor-pointer"
              id="btn-room-recenter"
            >
              Recenter
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
