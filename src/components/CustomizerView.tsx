import React, { useState, useMemo } from 'react';
import { Upload, ShoppingBag, Eye, RotateCcw, Sliders, Check, Frame, Ruler, Send } from 'lucide-react';
import { CustomFrameConfig, FrameMaterial, CartItem } from '../types';
import { STARTER_UPLOAD_TEMPLATES, AVAILABLE_MATS, AVAILABLE_GLAZINGS, AVAILABLE_SIZES } from '../data/products';
import RoomMockup from './RoomMockup';

interface CustomizerViewProps {
  onAddToCart: (item: Partial<CartItem>) => void;
  setCurrentView: (view: any) => void;
}

// Custom crate templates
const DESIGN_PROFILES = [
  { id: 'bamboo-weave', name: 'Premium Bamboo Weave Slats', material: 'Organic' as FrameMaterial, hex: '#e2ba49', width: 14, price: 50 },
  { id: 'pine-slats', name: 'Nordic Fragrant Pine Crate Wood', material: 'Premium' as FrameMaterial, hex: '#ebdcc5', width: 12, price: 35 },
  { id: 'walnut-basket', name: 'Heritage Dark Mahogany Cedar Basket', material: 'Premium' as FrameMaterial, hex: '#4e3323', width: 16, price: 65 },
  { id: 'minimal-card', name: 'Recycled Fiberboard Vent Box', material: 'Non-GMO' as FrameMaterial, hex: '#1e1e20', width: 8, price: 20 }
];

export default function CustomizerView({ onAddToCart, setCurrentView }: CustomizerViewProps) {
  // Configurator state variables mapped to crops and agriculture parameters
  const [selectedImage, setSelectedImage] = useState(STARTER_UPLOAD_TEMPLATES[0].url);
  const [imageName, setImageName] = useState(STARTER_UPLOAD_TEMPLATES[0].name);
  const [selectedProfile, setSelectedProfile] = useState(DESIGN_PROFILES[1]); // Pine slats default
  const [matColor, setMatColor] = useState(AVAILABLE_MATS[1]); // Compost / Bedding selection
  const [matSize, setMatSize] = useState<number>(1.5); // bedding cushion density
  const [selectedSize, setSelectedSize] = useState(AVAILABLE_SIZES[1]); // 2.5 kg standard box default
  const [selectedGlazing, setSelectedGlazing] = useState(AVAILABLE_GLAZINGS[0]); // Nitrogen freshness lock
  const [activeWorkspaceTab, setTab] = useState<'build' | 'room'>('build');
  const [customFileLoading, setCustomFileLoading] = useState(false);
  const [customFileError, setCustomFileError] = useState('');

  // Sizing adjust states (independent if needed)
  const [customWidth, setCustomWidth] = useState<number>(12);
  const [customHeight, setCustomHeight] = useState<number>(16);

  // Live custom photo uploading handler for Soil Reports or Crop recipes
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomFileLoading(true);
    setCustomFileError('');

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
        setImageName(file.name);
      } else {
        setCustomFileError('Unable to parse organic image data.');
      }
      setCustomFileLoading(false);
    };
    reader.onerror = () => {
      setCustomFileError('File processing encountered an error.');
      setCustomFileLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Drag over upload container utilities
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          setImageName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculation formula for custom pieces:
  // (Base Size Surcharge + Crate Base Slats + Bedding/Compost Surcharge + Freshness Gas Surcharge)
  const calculatedPrice = useMemo(() => {
    const sizeCost = selectedSize.baseCost;
    const profileCost = selectedProfile.price;
    const matSurcharge = matColor.price + (matSize > 0 ? matSize * 8 : 0);
    const glazeSurcharge = selectedGlazing.price;
    
    return Math.round(sizeCost + profileCost + matSurcharge + glazeSurcharge);
  }, [selectedSize, selectedProfile, matColor, matSize, selectedGlazing]);

  // Handle bag adding
  const handleAddBespokeToCart = () => {
    const bespokeConfig: CustomFrameConfig = {
      sourceImage: selectedImage,
      imageName: imageName,
      frameStyle: selectedProfile.name,
      material: selectedProfile.material,
      width: selectedSize.width,
      height: selectedSize.height,
      matColor: matColor.name,
      matSize: matColor.name.includes('None') ? 0 : matSize,
      glazing: selectedGlazing.name as any,
      price: calculatedPrice
    };

    onAddToCart({
      id: `bespoke-${Date.now()}`,
      customFrame: bespokeConfig,
      quantity: 1,
      selectedSize: `${selectedSize.width}" x ${selectedSize.height}"`,
      selectedColor: selectedProfile.name,
      selectedMaterial: selectedProfile.material
    });

    setCurrentView('cart');
  };

  // Pre-formatted WhatsApp order builder
  const getWhatsAppMessageUrl = () => {
    const textDesc = `Hi Harvest Organics, I designed a bespoke family harvest crate combination:\n` +
      `- Focal Crop: ${imageName}\n` +
      `- Slat Style: ${selectedProfile.name} (${selectedProfile.material})\n` +
      `- Crate Size Capacity: ${selectedSize.width}x${selectedSize.height} standard inches\n` +
      `- Moisture Bedding Cushion: ${matColor.name} (${matSize} inches)\n` +
      `- Preservation Shielding: ${selectedGlazing.name}\n` +
      `- Estimated Harvest Cost: $${calculatedPrice} USD.\n` +
      `Could we process and dispatch this package on my command? Thank you!`;
      
    return `https://wa.me/919876543210?text=${encodeURIComponent(textDesc)}`;
  };

  // Crate border render style generator
  const getActiveFrameStyle = (): React.CSSProperties => {
    let thickPx = Math.max(10, selectedProfile.width * 1.0);
    return {
      border: `${thickPx}px solid ${selectedProfile.hex}`,
      boxShadow: '0 20px 45px -10px rgba(0,0,0,0.25), inset 0 2px 6px rgba(0,0,0,0.1)',
      borderRadius: '4px'
    };
  };

  const matColorHexVal = matColor.hex === 'transparent' ? 'transparent' : matColor.hex;
  const computedPadding = matColorHexVal === 'transparent' ? 0 : Math.max(8, matSize * 15);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="customizer-root">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-sand-200 pb-8 mb-10 gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-700 uppercase block">Atelier Sandbox Forge</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none">
            Bespoke <span className="italic font-normal text-emerald-700">Harvest Box Builder</span>
          </h1>
        </div>

        {/* Workspace mode selector tabs */}
        <div className="flex bg-sand-200 p-1.5 rounded-sm border border-sand-300">
          <button
            onClick={() => setTab('build')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-xs transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeWorkspaceTab === 'build' ? 'bg-white shadow-xs text-charcoal-900 border border-sand-150' : 'text-charcoal-450 hover:text-charcoal-800'
            }`}
            id="tab-customizer-build"
          >
            <Frame className="h-3.5 w-3.5 text-emerald-700" />
            <span>Customize Box</span>
          </button>
          <button
            onClick={() => setTab('room')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-xs transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeWorkspaceTab === 'room' ? 'bg-white shadow-xs text-charcoal-900 border border-sand-150' : 'text-charcoal-450 hover:text-charcoal-800'
            }`}
            id="tab-customizer-room"
          >
            <Eye className="h-3.5 w-3.5 text-emerald-600" />
            <span>AR Dining Table Preview</span>
          </button>
        </div>
      </div>

      {/* Main panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Dynamic Canvas / Table setup */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {activeWorkspaceTab === 'build' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white border border-sand-200 rounded-md min-h-[500px] shadow-2xs">
              
              {/* Simulated box */}
              <div 
                className="max-w-[420px] bg-white transition-all duration-300 flex items-center justify-center"
                style={{
                  ...getActiveFrameStyle()
                }}
                id="bespoke-render-canvas"
              >
                {/* Bedding cushion wrapper */}
                <div
                  className="w-full h-full flex items-center justify-center relative bg-white transition-all duration-300"
                  style={{
                    padding: `${computedPadding}px`,
                    backgroundColor: matColorHexVal !== 'transparent' ? matColorHexVal : '#faf9f6',
                    boxShadow: matColorHexVal !== 'transparent' ? 'inset 0 1px 4px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {/* Outer border indicator */}
                  {matColorHexVal !== 'transparent' && (
                    <div className="absolute inset-0 border border-emerald-900/10 pointer-events-none" style={{ margin: `${computedPadding}px` }} />
                  )}

                  {/* Inner crop image uploaded */}
                  <img 
                    src={selectedImage} 
                    referrerPolicy="no-referrer"
                    alt="Custom crop harvest review" 
                    className="max-h-[300px] object-contain shadow-xs transition-all duration-150 rounded-xs"
                  />
                </div>

              </div>

              {/* Specifications blueprint */}
              <div className="mt-8 text-center text-xs space-y-1.5 font-light text-charcoal-405 font-mono">
                <p className="text-charcoal-900 font-bold uppercase tracking-wider font-sans">Harvest Box Specifications</p>
                <p>{selectedSize.width}" x {selectedSize.height}" Crate Profile • {selectedProfile.name} Frame</p>
                {matColor.name !== 'None (Full bleed Art)' && <p>{matSize}" Moisture Cushion ({matColor.name})</p>}
                <p>Preservation Level: {selectedGlazing.name}</p>
              </div>

            </div>
          ) : (
            <div className="flex-1 bg-white p-6 border border-sand-200 rounded-md shadow-2xs">
              
              <RoomMockup 
                imageUrl={selectedImage} 
                frameStyle={selectedProfile.name} 
                material={selectedProfile.material} 
                matColor={matColor.name} 
                matSize={matSize}
                frameColorHex={selectedProfile.hex}
                frameWidth={selectedProfile.width}
                sizeLabel={`${selectedSize.width}"x${selectedSize.height}" Organic Crate`}
              />

            </div>
          )}

          {/* Starter Crops selector */}
          <div className="bg-sand-100 p-4.5 rounded-md border border-sand-200 space-y-3">
            <h4 className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase">Don't have a picture? Select a focal regional crop template</h4>
            <div className="grid grid-cols-3 gap-3">
              {STARTER_UPLOAD_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setSelectedImage(tpl.url);
                    setImageName(tpl.name);
                  }}
                  className={`flex items-center space-x-2 p-1.5 bg-white rounded-md border text-left cursor-pointer transition-all ${
                    selectedImage === tpl.url ? 'border-emerald-600 bg-emerald-50/20' : 'border-sand-300 hover:border-sand-405'
                  }`}
                  id={`btn-customizer-tpl-${tpl.id}`}
                >
                  <img src={tpl.url} alt="" className="h-10 w-10 object-cover rounded-xs" />
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-bold truncate text-charcoal-900">{tpl.name}</span>
                    <span className="block text-[8px] text-charcoal-405 truncate">{tpl.author}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right controller */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-white p-6 rounded-md border border-sand-200 shadow-2xs space-y-6">
            
            <h3 className="text-xs font-bold tracking-widest text-charcoal-900 uppercase border-b border-sand-100 pb-2.5 flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-emerald-600" />
              <span>Configure Bespoke Box Options</span>
            </h3>

            {/* Custom Soil certification upload */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-charcoal-900 block">1. Optional: Upload Soil Test Report or Recipe Card</label>
              <div 
                className="border-2 border-dashed border-sand-300 rounded-md p-5 text-center bg-sand-50/50 hover:bg-emerald-50/10 hover:border-emerald-400 transition-all cursor-pointer relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                id="dropzone-art-upload"
              >
                <div className="space-y-2 text-xs font-light text-charcoal-405">
                  <Upload className="h-6 w-6 mx-auto text-emerald-600" />
                  <p><span className="font-bold text-emerald-700">Click to import</span> or drag custom certificate here</p>
                  <p className="text-[10px] text-charcoal-400">Supports PDF, JPEG, PNG, WEBP soil diagnostics</p>
                </div>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="input-file-art-upload"
                />
              </div>
              {customFileLoading && <p className="text-[10px] text-emerald-600 animate-pulse font-mono">Synthesizing file upload bytes...</p>}
              {customFileError && <p className="text-[10px] text-red-500 font-mono">{customFileError}</p>}
            </div>

            {/* Wood slats selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-900">2. Select Timber Slats Finish</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">{selectedProfile.material} weave</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DESIGN_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`p-2 rounded-sm border text-left cursor-pointer transition-all flex flex-col justify-between h-[82px] bg-white ${
                      selectedProfile.id === profile.id 
                        ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-800' 
                        : 'border-sand-300 hover:border-sand-405'
                    }`}
                    id={`btn-custom-profile-${profile.id}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="h-4 w-4 rounded-full border border-sand-300" style={{ backgroundColor: profile.hex }} />
                      {selectedProfile.id === profile.id && <div className="h-3.5 w-3.5 rounded-full bg-emerald-600 flex items-center justify-center"><Check className="h-2 w-2 text-white" /></div>}
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-charcoal-900 truncate" title={profile.name}>{profile.name}</span>
                      <span className="block text-[8px] text-charcoal-455 font-mono mt-0.5">+${profile.price} usd</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Box dimensions sizing */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-900">3. Select Crate Dimensions / Capacity</span>
                <span className="text-emerald-700 font-bold font-mono text-[11px]">{selectedSize.width}" x {selectedSize.height}" inches</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {AVAILABLE_SIZES.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2 transition-all rounded-sm text-center border cursor-pointer ${
                      selectedSize.label === sz.label 
                        ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-800' 
                        : 'border-sand-300 hover:border-sand-405 bg-white text-xs text-charcoal-800'
                    }`}
                    id={`btn-custom-size-${sz.width}`}
                  >
                    <span className="block text-xs font-semibold">{sz.width}"x{sz.height}"</span>
                    <span className="block text-[9px] text-charcoal-450 font-mono mt-0.5">${sz.baseCost} surcharge</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bedding moisture matting */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-charcoal-900">4. Moisture Cushion Bedding</span>
                <span className="text-emerald-700 font-bold text-[10px] uppercase">{matColor.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {AVAILABLE_MATS.map((mat) => (
                  <button
                    key={mat.name}
                    onClick={() => setMatColor(mat)}
                    className={`h-7 w-7 rounded-full border cursor-pointer transition-all ${
                      matColor.name === mat.name 
                        ? 'border-emerald-600 scale-110 shadow-sm ring-2 ring-emerald-605/15' 
                        : 'border-sand-300 hover:border-emerald-650'
                    }`}
                    style={{ backgroundColor: mat.hex === 'transparent' ? '#ffffff' : mat.hex }}
                    title={`${mat.name} ($${mat.price})`}
                    id={`btn-custom-mat-color-${mat.name.split(' ')[0]}`}
                  >
                    {mat.hex === 'transparent' && <span className="text-[16px] text-red-500 block leading-none font-bold">/</span>}
                    {matColor.name === mat.name && mat.hex !== 'transparent' && <span className="h-1.5 w-1.5 rounded-full bg-white block mx-auto mix-blend-difference" />}
                  </button>
                ))}
              </div>

              {/* Bedding cushion slider width */}
              {matColor.name !== 'None (Full bleed Art)' && (
                <div className="space-y-1 bg-sand-50 p-3 rounded-sm border border-sand-200">
                  <div className="flex justify-between items-center text-[10px] font-mono text-charcoal-500">
                    <span>Crate Bedding Padding border width</span>
                    <b className="font-bold text-emerald-800">{matSize} inches</b>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3.0" 
                    step="0.25"
                    value={matSize} 
                    onChange={(e) => setMatSize(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-ew-resize"
                    id="slider-custom-mat-size"
                  />
                  <div className="flex justify-between text-[9px] text-charcoal-450 font-mono">
                    <span>0.5" Sleek</span>
                    <span>3.0" Dense cushioning</span>
                  </div>
                </div>
              )}
            </div>

            {/* Freshness preservation seal selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal-900 block">5. Atmospheric Preservation Lock Pack</label>
              <select
                value={selectedGlazing.name}
                onChange={(e) => {
                  const match = AVAILABLE_GLAZINGS.find(g => g.name === e.target.value);
                  if (match) setSelectedGlazing(match);
                }}
                className="w-full select bg-white border border-sand-300 text-xs py-2.5 px-3 rounded-sm text-charcoal-950 focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                id="select-custom-glaze"
              >
                {AVAILABLE_GLAZINGS.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name} (+${g.price} Surcharge / {g.desc})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Pricing summary */}
          <div className="bg-emerald-950 text-white p-6 rounded-md border border-emerald-500/25 space-y-4">
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Total Est Packing Cost</span>
                <span className="font-serif text-3xl font-light tracking-tight text-white mt-1 block">
                  ${calculatedPrice} <span className="font-sans text-xs text-emerald-300 font-bold">USD</span>
                </span>
              </div>

              {/* Reset Spec button */}
              <button 
                onClick={() => {
                  setSelectedImage(STARTER_UPLOAD_TEMPLATES[0].url);
                  setImageName(STARTER_UPLOAD_TEMPLATES[0].name);
                  setSelectedProfile(DESIGN_PROFILES[1]);
                  setMatColor(AVAILABLE_MATS[1]);
                  setMatSize(1.5);
                  setSelectedSize(AVAILABLE_SIZES[1]);
                  setSelectedGlazing(AVAILABLE_GLAZINGS[0]);
                }}
                className="flex items-center space-x-1 p-2 border border-white/10 hover:border-white/30 rounded-xs text-[10px] font-bold text-emerald-250 uppercase tracking-wider cursor-pointer font-mono"
                title="Reset Spec Builder"
              >
                <RotateCcw className="h-3 w-3 text-emerald-400" />
                <span>Reset spec</span>
              </button>
            </div>

            {/* Shopping trigger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddBespokeToCart}
                className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer border border-transparent shadow-xs"
                id="btn-custom-add-cart"
              >
                <ShoppingBag className="h-4.5 w-4.5 text-white" />
                <span>Add bespoke Crate to bag</span>
              </button>
              
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noreferrer"
                className="py-4 bg-white hover:bg-sand-100 text-emerald-950 text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md font-bold"
                id="btn-whatsapp-custom-order"
              >
                <Send className="h-4.5 w-4.5 text-emerald-600" />
                <span>WhatsApp Grower Detail</span>
              </a>
            </div>

            <div className="text-[10px] font-medium tracking-wide text-emerald-200 text-center">
              🛡️ Direct verified local farmer coordinate program.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
