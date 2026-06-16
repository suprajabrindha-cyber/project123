import React from 'react';
import { ShoppingBag, User, Settings, Sparkles, Paintbrush, Compass } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'shop' | 'customizer' | 'cart' | 'profile' | 'admin' | 'product-detail';
  setCurrentView: (view: any) => void;
  cartCount: number;
}

export default function Navbar({ currentView, setCurrentView, cartCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Brand Logo - Fresh agriculture styling */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex cursor-pointer items-center space-x-2"
            id="nav-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold-500 bg-charcoal-900 shadow-sm">
              <span className="font-serif font-semibold text-lg text-gold-300">🌱</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest text-charcoal-900 sm:text-xl uppercase">
                HARVEST
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-emerald-600 uppercase">
                ORGANICS & CO.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => setCurrentView('home')}
              className={`luxury-hover-line cursor-pointer pb-1 transition-colors ${
                currentView === 'home' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : 'text-charcoal-800 hover:text-emerald-600'
              }`}
              id="nav-link-home"
            >
              Our Fields
            </button>
            <button
              onClick={() => setCurrentView('shop')}
              className={`luxury-hover-line cursor-pointer pb-1 transition-colors ${
                currentView === 'shop' || currentView === 'product-detail' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : 'text-charcoal-800 hover:text-emerald-600'
              }`}
              id="nav-link-shop"
            >
              Fresh Market
            </button>
            <button
              onClick={() => setCurrentView('customizer')}
              className="group flex cursor-pointer items-center space-x-1.5 rounded-full border border-emerald-600 px-4 py-1.5 text-xs tracking-wider text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all font-semibold uppercase"
              id="nav-link-customizer"
            >
              <Sparkles className="h-3 w-3 text-emerald-600 transition-transform group-hover:rotate-12" />
              <span>Bespoke Box Builder</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Quick Profile Link */}
            <button
              onClick={() => setCurrentView('profile')}
              className={`p-2 rounded-full hover:bg-sand-200 transition-colors cursor-pointer relative ${
                currentView === 'profile' ? 'text-gold-500 bg-sand-100' : 'text-charcoal-800'
              }`}
              title="My Account"
              id="nav-btn-profile"
            >
              <User className="h-5.5 w-5.5" />
            </button>

            {/* Owner Admin Dashboard Shortcut */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`p-2 rounded-full hover:bg-sand-200 transition-colors cursor-pointer ${
                currentView === 'admin' ? 'text-gold-500 bg-sand-100' : 'text-charcoal-800'
              }`}
              title="Admin Dashboard"
              id="nav-btn-admin"
            >
              <Settings className="h-5.5 w-5.5" />
            </button>

            {/* Shopping Bag with elegant counter */}
            <button
              onClick={() => setCurrentView('cart')}
              className={`p-2 rounded-full hover:bg-sand-200 transition-colors cursor-pointer relative ${
                currentView === 'cart' ? 'text-gold-500 bg-sand-100' : 'text-charcoal-800'
              }`}
              title="Shopping Cart"
              id="nav-btn-cart"
            >
              <ShoppingBag className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal-900 text-[10px] font-bold text-gold-300 ring-2 ring-sand-50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Sub header for Mobile Navigation Row */}
      <div className="flex md:hidden border-t border-sand-200 bg-sand-100 divide-x divide-sand-200 text-center text-xs tracking-wider uppercase font-semibold">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex-1 py-3 cursor-pointer ${currentView === 'home' ? 'text-emerald-700 bg-sand-50' : 'text-charcoal-400'}`}
        >
          Fields
        </button>
        <button 
          onClick={() => setCurrentView('shop')}
          className={`flex-1 py-3 cursor-pointer ${currentView === 'shop' || currentView === 'product-detail' ? 'text-emerald-700 bg-sand-50' : 'text-charcoal-405'}`}
        >
          Market
        </button>
        <button 
          onClick={() => setCurrentView('customizer')}
          className={`flex-1 py-3 cursor-pointer flex items-center justify-center space-x-1 ${currentView === 'customizer' ? 'text-emerald-700 bg-sand-50' : 'text-charcoal-400'}`}
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Bespoke</span>
        </button>
      </div>
    </nav>
  );
}
