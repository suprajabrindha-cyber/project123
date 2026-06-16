import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Star, Heart, Leaf } from 'lucide-react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  currentSelectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onProductSelect: (p: Product) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

export default function ShopView({
  products,
  currentSelectedCategory,
  setSelectedCategory,
  onProductSelect,
  wishlist,
  toggleWishlist
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All'); // maps to Grade: Organic, Heirloom, Non-GMO...
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [sortBy, setSortBy] = useState<string>('popular'); // popular | price-asc | price-desc | rating

  // Available agriculture categories list
  const categories = ['All', 'Fruits', 'Vegetables', 'Seeds', 'Organic', 'Equipment'];
  
  // Available Grades (repurposed material field)
  const materials = ['All', 'Organic', 'Heirloom', 'Non-GMO', 'Premium'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text matching
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category matching
        const matchesCategory = currentSelectedCategory === 'All' || p.category === currentSelectedCategory;
        
        // Material/Grade matching
        const matchesMaterial = selectedMaterial === 'All' || p.materials.includes(selectedMaterial as any);
        
        // Price matching
        const matchesPrice = p.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesMaterial && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: popular
        const scoreA = (a.featured ? 2 : 0) + (a.bestSeller ? 1 : 0);
        const scoreB = (b.featured ? 2 : 0) + (b.bestSeller ? 1 : 0);
        return scoreB - scoreA;
      });
  }, [products, searchQuery, currentSelectedCategory, selectedMaterial, maxPrice, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="shop-view-container">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
          <Leaf className="h-3 w-3 fill-current text-emerald-500" />
          <span>DIRECT FROM THE SOIL</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none">
          Harvest <span className="italic font-normal text-emerald-700">Fresh Market</span>
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-400 font-light leading-relaxed">
          Explore pesticide-free regional crops, open-pollinated heritage seeds, and precision farming equipment. Click to customize weights or shipping parameters.
        </p>
      </div>

      {/* Grid of quick categories with green-theme tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-sand-200 pb-6" id="categories-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              currentSelectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm border-transparent'
                : 'bg-white text-charcoal-850 border border-sand-300 hover:border-emerald-600'
            }`}
            id={`category-pill-${cat}`}
          >
            {cat} {cat === 'All' ? 'Products' : ''}
          </button>
        ))}
      </div>

      {/* Filter and Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Refinement Panel */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-md border border-sand-200 shadow-xs">
          
          <div className="flex items-center justify-between border-b border-sand-100 pb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-charcoal-900 flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>Filter Produce</span>
            </span>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedMaterial('All');
                setMaxPrice(120);
                setSortBy('popular');
              }}
              className="text-[10px] text-emerald-700 font-bold tracking-wider uppercase hover:text-emerald-800 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Search bar input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-wider text-charcoal-405 uppercase">Keyword Search</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search Mango, tomato, seeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2.5 pl-9 pr-4 text-charcoal-950 focus:border-emerald-500 focus:outline-hidden"
                id="shop-input-search"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-charcoal-405" />
            </div>
          </div>

          {/* Purity Grade selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-wider text-charcoal-405 uppercase">Purity Grade Filter</label>
            <div className="flex flex-wrap gap-1 bg-sand-50 p-1.5 rounded-sm border border-sand-200">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`py-1.5 px-2 flex-1 text-[9px] font-bold uppercase rounded-sm cursor-pointer transition-all ${
                    selectedMaterial === mat 
                      ? 'bg-white shadow-sm text-emerald-850 border border-sand-105' 
                      : 'text-charcoal-400 hover:text-charcoal-800'
                  }`}
                  id={`material-filter-${mat}`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-charcoal-405">
              <span>Price Cap / Item</span>
              <span className="font-mono text-emerald-800 font-bold">${maxPrice} USD</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="120" 
              step="5"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-ew-resize"
              id="slider-filter-price"
            />
            <div className="flex justify-between text-[9px] font-mono text-charcoal-400">
              <span>$10</span>
              <span>$120</span>
            </div>
          </div>

          {/* Info Badge */}
          <div className="border border-emerald-600/10 bg-emerald-50/50 p-4 rounded-sm text-xs text-emerald-800 leading-relaxed font-light">
            ✨ <strong className="font-semibold text-emerald-900">Direct From Harvest:</strong> All items support custom weights, seed packages, or dynamic shipping lock levels on their details screens.
          </div>

        </div>

        {/* Right Side: Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Grid control bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-5 py-3.5 rounded-md border border-sand-200 shadow-xs">
            <p className="text-xs font-light text-charcoal-450 font-mono">
              Displaying <span className="font-bold text-charcoal-900 font-sans">{filteredProducts.length}</span> fresh products corresponding to filters
            </p>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2.5 text-xs text-charcoal-405 font-medium">
              <span>Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-sand-50 border border-sand-300 rounded-sm py-1.5 px-2.5 text-xs font-bold text-charcoal-900 focus:outline-hidden cursor-pointer"
                id="select-shop-sort"
              >
                <option value="popular font-bold">Signature Harvests</option>
                <option value="price-asc font-bold">Price: Low to High</option>
                <option value="price-desc font-bold">Price: High to Low</option>
                <option value="rating font-bold font-serif">Customer Happiness</option>
              </select>
            </div>
          </div>

          {/* Catalog Layout */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-md border border-sand-200">
              <span className="text-4xl">🌱</span>
              <h3 className="font-serif text-xl font-medium mt-4 text-charcoal-900">No Harvest Items Match</h3>
              <p className="text-xs text-charcoal-400 mt-1 max-w-sm mx-auto font-light leading-relaxed">
                Try widening your price cap sliders or resetting search parameters to explore our regional farm produce.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedMaterial('All');
                  setMaxPrice(120);
                }}
                className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] tracking-wider uppercase font-bold rounded-sm cursor-pointer"
              >
                Show All Produce
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isFavorite = wishlist.includes(p.id);
                return (
                  <div 
                    key={p.id}
                    className="flex flex-col bg-white rounded-md border border-sand-200 overflow-hidden shadow-xs hover:shadow-md transition-all group relative"
                    id={`product-card-${p.id}`}
                  >
                    
                    {/* Visual Photo Area */}
                    <div className="aspect-[4/5] bg-sand-100 p-3 flex items-center justify-center relative overflow-hidden">
                      
                      {/* Floating badging */}
                      <div className="absolute top-3 left-3 z-10 space-y-1">
                        {p.bestSeller && (
                          <span className="block rounded-xs bg-[#c0392b] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest shadow-sm">
                            Best Seller
                          </span>
                        )}
                        {p.featured && (
                          <span className="block rounded-xs bg-amber-500 text-charcoal-950 text-[8px] font-bold px-2 py-0.5 uppercase tracking-widest shadow-sm">
                            Highly Rated
                          </span>
                        )}
                      </div>

                      {/* Wishlist toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p.id);
                        }}
                        className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-charcoal-900 flex items-center justify-center hover:scale-108 active:scale-95 shadow-xs transition-all cursor-pointer border border-sand-205"
                        title={isFavorite ? "Remove from favorites" : "Save crop"}
                      >
                        <Heart className={`h-4.5 w-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-charcoal-400'}`} />
                      </button>

                      <div className="w-full h-full rounded-md overflow-hidden bg-white border border-sand-200/60 relative">
                        <img 
                          src={p.images[0]} 
                          referrerPolicy="no-referrer"
                          alt={p.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Fast Hover Action Overlay */}
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                        <button
                          onClick={() => onProductSelect(p)}
                          className="px-5 py-3 bg-white hover:bg-sand-100 text-[10px] font-bold uppercase tracking-widest text-emerald-850 rounded-sm cursor-pointer shadow-md transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-1.5"
                          id={`examine-btn-${p.id}`}
                        >
                          <Eye className="h-3.5 w-3.5 text-emerald-600" />
                          <span>View Product</span>
                        </button>
                      </div>

                    </div>

                    {/* Meta and details summary */}
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-3 bg-white">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-700 font-bold block">{p.style}</span>
                        <h3 
                          onClick={() => onProductSelect(p)}
                          className="font-serif text-base font-semibold text-charcoal-900 hover:text-emerald-700 transition-colors cursor-pointer truncate"
                          title={p.name}
                        >
                          {p.name}
                        </h3>
                        <p className="text-[11px] text-charcoal-405 font-light line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      {/* Price and Ratings */}
                      <div className="flex justify-between items-center pt-2.5 border-t border-sand-100">
                        <span className="font-mono text-emerald-900 font-bold text-sm block">
                          ${p.price} USD
                        </span>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                          <span className="text-[10px] font-bold text-charcoal-800">{p.rating}</span>
                          <span className="text-[9px] text-charcoal-400">({p.reviews.length})</span>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
