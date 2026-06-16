import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-charcoal-550 border border-sand-300 shadow-xl aspect-16/9 w-full max-w-4xl mx-auto" id="before-after-container">
      
      {/* Before Image - Dry, unmanaged field */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1532983330958-2f35be7940f2?q=80&w=1200&auto=format&fit=crop')`,
          filter: 'grayscale(15%) brightness(95%)'
        }}
      >
        <div className="absolute inset-x-0 bottom-6 text-center select-none">
          <span className="rounded-full bg-charcoal-900/65 px-4 py-1.5 text-xs font-semibold tracking-widest text-sand-50 uppercase backdrop-blur-xs">
            Arid, Depleted Land
          </span>
        </div>
      </div>

      {/* After Image - Lush organic farm high yield crop rows */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-75"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop')`,
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
        }}
      >
        {/* Subtle decorative gold-foil line or drop-shadow on comparison edge */}
        <div className="absolute inset-x-0 bottom-6 text-center select-none">
          <span className="rounded-full bg-emerald-700/95 px-4 py-1.5 text-xs font-semibold tracking-widest text-sand-50 uppercase backdrop-blur-xs shadow-sm border border-emerald-400">
            Regenerative Organic Cropping
          </span>
        </div>
      </div>

      {/* Vertical Slider Bar and Elegant Drag Handles */}
      <div 
        className="absolute bottom-0 top-0 w-1 bg-emerald-500 cursor-ew-resize pointer-events-none" 
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400 bg-charcoal-900 shadow-md">
          <ArrowLeftRight className="h-4 w-4 text-emerald-300" />
        </div>
      </div>

      {/* Standard Slider Overlay Input for 100% bug-free robust dragging */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={handleSliderChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        aria-label="Before and after transformation slider"
        id="before-after-scroller"
      />
      
      {/* Absolute Badges on Top Corners */}
      <div className="absolute top-4 left-4 rounded-md bg-charcoal-900/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-xs pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 rounded-md bg-gold-900/50 border border-gold-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-200 backdrop-blur-xs pointer-events-none">
        After
      </div>

    </div>
  );
}
