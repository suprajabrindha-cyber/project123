import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ZoomIn, ShoppingBag, Truck, Info, Settings } from 'lucide-react';
import { Product, CartItem, Review } from '../types';
import RoomMockup from './RoomMockup';

interface ProductDetailViewProps {
  product: Product;
  onBackToShop: () => void;
  onAddToCart: (item: Partial<CartItem>) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  setCurrentView: (view: any) => void;
}

export default function ProductDetailView({
  product,
  onBackToShop,
  onAddToCart,
  wishlist,
  toggleWishlist,
  setCurrentView
}: ProductDetailViewProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // wood borders/slats
  const [selectedPreservation, setSelectedPreservation] = useState('Organic subsoil breathable crate');
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [userReviews, setUserReviews] = useState<Review[]>(product.reviews);
  const [activeSpecTab, setActiveTab] = useState<'details' | 'materials' | 'craftsmanship'>('details');

  const isFavorite = wishlist.includes(product.id);

  // Live updated price formula: (basePrice * sizeMultiplier) + colorPriceAdjustment + preservationAdjustment
  const livePrice = Math.round(
    product.price * selectedSize.multiplier + 
    selectedColor.priceAdjustment + 
    (selectedPreservation.includes('vacuum') ? 15 : 0)
  );

  const handleAddToCart = (expressCheck = false) => {
    onAddToCart({
      productId: product.id,
      product: product,
      selectedSize: selectedSize.label,
      selectedColor: selectedColor.name,
      selectedMaterial: product.materials[0],
      quantity: 1,
      // Unique item identity
      id: `${product.id}-${selectedSize.width}x${selectedSize.height}-${selectedColor.name.replace(/\s+/g, '')}`
    });
    
    if (expressCheck) {
      setCurrentView('cart');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev: Review = {
      id: `rev-added-${Date.now()}`,
      userName: reviewName,
      userEmail: 'farmer-enthusiast@earth.com',
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      isVerified: true
    };

    setUserReviews([newRev, ...userReviews]);
    setReviewName('');
    setReviewComment('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="product-detail-container">
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToShop}
          className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-emerald-850 hover:text-emerald-600 transition-colors cursor-pointer"
          id="btn-detail-back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Market Selection</span>
        </button>
        <span className="text-[10px] text-charcoal-400 font-mono">
          Organic SKU: {product.id.slice(0, 6).toUpperCase()}
        </span>
      </div>

      {/* Main product block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Photo presentation gallery with active slide */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Showcase framing box */}
          <div 
            className="aspect-square bg-white rounded-md border border-sand-300 relative overflow-hidden flex items-center justify-center p-6 cursor-zoom-in group shadow-xs"
            onClick={() => setIsZoomed(!isZoomed)}
            id="detail-image-box"
          >
            {/* Dynamic premium case frame border surrounding the image based on selected color */}
            <div 
              className="w-full h-full flex items-center justify-center bg-white transition-all duration-300"
              style={{
                border: `10px solid ${selectedColor.hex}`,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                transform: isZoomed ? 'scale(1.3)' : 'none'
              }}
            >
              <img 
                src={product.images[activeImageIdx]} 
                referrerPolicy="no-referrer"
                alt={product.name}
                className="max-h-full max-w-full object-contain select-none rounded-xs"
              />
            </div>

            {/* Quick Helper hint */}
            <div className="absolute bottom-3 right-3 rounded-sm bg-emerald-950/80 border border-emerald-500/25 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-emerald-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
              <ZoomIn className="h-3 w-3" />
              <span>{isZoomed ? 'Click to Shrink' : 'Click to Zoom'}</span>
            </div>
          </div>

          {/* Thumbnail slides list */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIdx(idx);
                  setIsZoomed(false);
                }}
                className={`aspect-square rounded-md overflow-hidden bg-sand-100 border relative cursor-pointer ${
                  activeImageIdx === idx 
                    ? 'border-emerald-600 ring-2 ring-emerald-600/10 shadow-xs' 
                    : 'border-sand-200 hover:border-sand-400'
                }`}
                id={`detail-thumb-${idx}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Quick core info cards */}
          <div className="bg-emerald-50/50 p-4 rounded-md border border-emerald-600/10 flex items-center justify-between text-xs space-x-4">
            <div className="flex items-center space-x-2 text-emerald-900 font-semibold">
              <Truck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span>Pesticide-Free Eco Freight</span>
            </div>
            <div className="flex items-center space-x-2 text-charcoal-405 font-light">
              <Info className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Dispatched in 24 hours post-harvest</span>
            </div>
          </div>

        </div>

        {/* Right Side: Custom Configurator */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-700 uppercase">
                {product.style} / field category: {product.category}
              </span>
              
              {/* Star Rating details */}
              <div className="flex items-center space-x-1.5">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <span className="text-xs font-bold text-charcoal-900">{product.rating}</span>
                <span className="text-xs text-charcoal-400">({userReviews.length} verified growers)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none animate-fade-in">
              {product.name}
            </h1>

            <p className="text-sm font-light leading-relaxed text-charcoal-850">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Core Configuration parameters */}
          <div className="bg-white p-6 rounded-md border border-sand-200 shadow-xs space-y-6">
            
            <h3 className="text-xs font-bold tracking-widest text-charcoal-900 uppercase border-b border-sand-100 pb-2.5 flex items-center space-x-1.5">
              <Settings className="h-4 w-4 text-emerald-600" />
              <span>Configure Crop Order Parameters</span>
            </h3>

            {/* Configurator Option 1: Sizes profile mapping to agricultural weights */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-charcoal-800">1. Select Harvest Packing weight</span>
                <span className="text-emerald-700 font-bold font-mono text-[11px]">Weight Options</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2.5 rounded-sm text-center border cursor-pointer transition-all ${
                      selectedSize.label === sz.label 
                        ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-800' 
                        : 'border-sand-300 hover:border-emerald-600 bg-white text-xs text-charcoal-800'
                    }`}
                    id={`btn-detail-size-${sz.label.replace(/\s+/g, '-')}`}
                  >
                    <span className="block text-xs font-bold font-serif">{sz.label}</span>
                    <span className="block text-[9px] text-charcoal-405 font-mono mt-0.5">x{sz.multiplier} rate</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator Option 2: Slat types for packaging */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-charcoal-800">2. External Gift Slat / Packing Basket</span>
                <span className="text-[11px] font-bold text-emerald-700 block">{selectedColor.name}</span>
              </div>
              <div className="flex items-center space-x-3 bg-sand-50 p-3.5 rounded-sm border border-sand-200 animate-slide-up">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`h-9 w-9 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${
                      selectedColor.name === col.name 
                        ? 'border-emerald-600 scale-108 shadow-sm ring-2 ring-emerald-600/10' 
                        : 'border-white hover:border-emerald-600'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={`${col.name}: ${col.priceAdjustment >= 0 ? '+' : ''}${col.priceAdjustment} price modifier`}
                    id={`btn-detail-color-${col.name.replace(/\s+/g, '-')}`}
                  >
                    {selectedColor.name === col.name && (
                      <span className="h-2 w-2 rounded-full bg-white block mix-blend-difference" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator Option 3: Preservation system */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal-800 block">3. Fresh-Lock Preservation System</label>
              <select
                value={selectedPreservation}
                onChange={(e) => setSelectedPreservation(e.target.value)}
                className="w-full bg-white border border-sand-300 text-xs py-2.5 px-3 rounded-sm text-charcoal-950 focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                id="select-detail-glass"
              >
                <option value="organic">Organic subsoil breathable crate (Included)</option>
                <option value="vacuum-seal">Active vacuum inert nitrogen gas freshness seal (+ $15 USD)</option>
              </select>
            </div>

          </div>

          {/* Pricing block */}
          <div className="bg-emerald-950 text-white p-6 rounded-md border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 gap-4">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Active Calculated Cost</span>
              <span className="font-serif text-3xl font-light tracking-tight text-white mt-1 block">
                ${livePrice} <span className="font-sans text-xs text-emerald-300 font-bold">USD</span>
              </span>
              <span className="text-[9px] text-emerald-200">Includes direct sustainable farmer payout share</span>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => handleAddToCart(false)}
                className="px-6 py-4.5 bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                id="btn-detail-add-cart"
              >
                <ShoppingBag className="h-4.5 w-4.5 text-white" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                className="px-6 py-4.5 bg-white text-emerald-950 hover:bg-sand-100 text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center cursor-pointer font-extrabold"
                id="btn-detail-instant-buy"
              >
                <span>Express Buy</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Gourmet setup preview container */}
      <section className="space-y-6 pt-12 border-t border-sand-300">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-700 uppercase">Interactive Setup Simulator</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light tracking-tight text-charcoal-900">
            Preview packing on <span className="italic font-normal">Kitchen Tables</span>
          </h2>
          <p className="text-xs text-charcoal-400 max-w-lg mx-auto font-light leading-relaxed">
            Uncover exactly how the premium {product.name} aligns with raw organic aesthetic setups. Shift placement or scale parameters relative to kitchen items live.
          </p>
        </div>

        <RoomMockup 
          imageUrl={product.images[0]} 
          frameStyle={product.category} 
          material={product.materials[0]} 
          matColor="None"
          matSize={1.5}
          frameColorHex={selectedColor.hex}
          frameWidth={14}
          sizeLabel={`${selectedSize.label} Pack`}
        />
      </section>

      {/* Tabs specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-sand-300">
        
        {/* Left Side Tab Specs */}
        <div className="md:col-span-6 space-y-6 bg-white p-6 rounded-md border border-sand-200">
          <div className="flex border-b border-sand-200 space-x-6 text-xs uppercase font-bold tracking-widest pb-3" id="specs-tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`cursor-pointer pb-2 hover:text-emerald-700 transition-colors ${activeSpecTab === 'details' ? 'border-b-2 border-emerald-600 text-emerald-800' : 'text-charcoal-400'}`}
            >
              Orchard Provenance
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`cursor-pointer pb-2 hover:text-emerald-700 transition-colors ${activeSpecTab === 'materials' ? 'border-b-2 border-emerald-600 text-emerald-800' : 'text-charcoal-400'}`}
            >
              Nutrition Values
            </button>
            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`cursor-pointer pb-2 hover:text-emerald-700 transition-colors ${activeSpecTab === 'craftsmanship' ? 'border-b-2 border-emerald-600 text-emerald-800' : 'text-charcoal-400'}`}
            >
              Home Preservation
            </button>
          </div>

          <div className="text-xs leading-relaxed text-charcoal-800 space-y-3 font-light font-sans">
            {activeSpecTab === 'details' && (
              <dl className="divide-y divide-sand-100 font-light text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2">
                    <dt className="font-semibold text-charcoal-900">{key}</dt>
                    <dd className="text-emerald-800 font-mono font-bold">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {activeSpecTab === 'materials' && (
              <div className="space-y-3">
                <p>
                  No commercial fertilizers. No post-harvest chemical ripening wraps. All test parameters indicate high organic carbon density, pure enzymes, and natural trace elements.
                </p>
                <div className="p-3 bg-emerald-50/50 rounded-xs border border-emerald-600/10">
                  <h4 className="font-serif font-bold text-emerald-950 mb-1">A2 Vedic / Humus Grown Guarantee</h4>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Our orchards maintain high microbial activity levels via deep-buried vermicultural bedding composts, ensuring max nutritional density.
                  </p>
                </div>
              </div>
            )}

            {activeSpecTab === 'craftsmanship' && (
              <div className="space-y-2">
                <p>
                  Because our fruit skins contain no high-gloss wax formulas or artificial preservation agents, we recommend holding them inside clay vessels wrapped loosely in dry hay or linen cloths.
                </p>
                <p className="font-mono text-[10px] text-emerald-700">// Ripens beautifully at natural ventilation temperature levels</p>
              </div>
            )}
          </div>
        </div>

        {/* Right verified reviews */}
        <div className="md:col-span-6 space-y-6">
          <h3 className="font-serif text-2xl font-light text-charcoal-900">
            Verified Customer Happiness ({userReviews.length})
          </h3>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {userReviews.map((rev) => (
              <div key={rev.id} className="bg-sand-50 p-4 rounded-md border border-sand-205 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-charcoal-900 mr-2">{rev.userName}</span>
                    {rev.isVerified && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 uppercase tracking-widest rounded-xs">
                        Verified customer
                      </span>
                    )}
                  </div>
                  <span className="text-charcoal-400 font-mono text-[10px]">{rev.date}</span>
                </div>

                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'opacity-25'}`} />
                  ))}
                </div>

                <p className="italic text-charcoal-800 leading-relaxed font-light">"{rev.comment}"</p>
              </div>
            ))}
          </div>

          {/* Add review form */}
          <form onSubmit={handleAddReview} className="bg-white p-5 rounded-md border border-sand-200 space-y-4 shadow-2xs">
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">Add Crop Quality Feedback</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-405 block">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seetha Lakshmi"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-405 block">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden cursor-pointer font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-405 block">Review Message</label>
              <textarea 
                required
                rows={2}
                placeholder="Share your taste, packing freshness, and shipping speed feedback..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] tracking-widest uppercase font-bold rounded-sm transition-colors cursor-pointer"
              id="btn-detail-review-submit"
            >
              Publish Crop Verification
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
