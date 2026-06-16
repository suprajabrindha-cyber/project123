import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, MapPin, Settings2, ShieldAlert, LogOut, Check, Star, RefreshCw } from 'lucide-react';
import { Order, Product } from '../types';

interface UserOrdersViewProps {
  orders: Order[];
  wishlist: string[];
  products: Product[];
  toggleWishlist: (id: string) => void;
  onProductSelect: (p: Product) => void;
  setCurrentView: (view: any) => void;
}

export default function UserOrdersView({
  orders,
  wishlist,
  products,
  toggleWishlist,
  onProductSelect,
  setCurrentView
}: UserOrdersViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address' | 'settings'>('orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Filter bookmarked products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="user-orders-root">
      
      {!isLoggedIn ? (
        /* Login Form Gate */
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg border border-sand-300 shadow-xl space-y-6" id="login-stage">
          <div className="text-center space-y-2">
            <span className="font-serif text-[10px] tracking-[0.25em] text-emerald-700 block uppercase font-bold">Patron Lounge</span>
            <h2 className="font-serif text-3xl font-light text-charcoal-900 leading-none">The Grower Collective</h2>
            <p className="text-xs text-charcoal-405 font-light leading-relaxed">
              Log in to manage custom family crates, active crop dispatching progress, and saved agricultural seeds.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-light font-sans">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Email Account</label>
              <input 
                type="email" 
                required
                placeholder="patron@sustainable-earth.org"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-emerald-850 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Private Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-emerald-850 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-widest uppercase rounded-sm cursor-pointer shadow-xs transition-colors"
              id="btn-login-submit"
            >
              Sign In to Harvest Portal
            </button>
          </form>

          <p className="text-[10px] text-center text-charcoal-405 font-light">
            New to our farm? <button onClick={() => setIsLoggedIn(true)} className="text-emerald-700 underline cursor-pointer font-bold font-sans">Access with test demo profile</button>
          </p>
        </div>
      ) : (
        /* Authenticated profile view */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Side: Account descriptor card */}
          <div className="lg:col-span-3 bg-white p-6 rounded-md border border-sand-200 shadow-2xs space-y-6">
            
            <div className="text-center space-y-3 pb-6 border-b border-sand-100">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-serif text-emerald-800 text-xl font-bold font-sans shadow-xs">
                PS
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 leading-tight">Priya Sundaram</h3>
                <span className="text-[10px] text-emerald-700 tracking-wider font-mono uppercase block mt-1">Organic Patron Member</span>
              </div>
            </div>

            {/* Nav tabs */}
            <div className="flex flex-col space-y-1 text-xs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full py-2.5 px-3 rounded-xs text-left cursor-pointer transition-colors flex items-center justify-between ${
                  activeTab === 'orders' ? 'bg-emerald-50 text-emerald-850 font-bold' : 'text-charcoal-800 hover:bg-sand-100'
                }`}
                id="tab-profile-orders"
              >
                <span>My Active Orders</span>
                {orders.length > 0 && (
                  <span className="h-5 w-5 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                    {orders.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full py-2.5 px-3 rounded-xs text-left cursor-pointer transition-colors flex items-center justify-between ${
                  activeTab === 'wishlist' ? 'bg-emerald-50 text-emerald-850 font-bold' : 'text-charcoal-800 hover:bg-sand-100'
                }`}
                id="tab-profile-wishlist"
              >
                <span>My Saved Crops ❤️</span>
                {wishlist.length > 0 && (
                  <span className="h-5 w-5 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('address')}
                className={`w-full py-2.5 px-3 rounded-xs text-left cursor-pointer transition-colors ${
                  activeTab === 'address' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-charcoal-800 hover:bg-sand-100'
                }`}
                id="tab-profile-address"
              >
                Delivery Address
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full py-2.5 px-3 rounded-xs text-left cursor-pointer transition-colors ${
                  activeTab === 'settings' ? 'bg-emerald-50 text-emerald-850 font-bold' : 'text-charcoal-800 hover:bg-sand-100'
                }`}
                id="tab-profile-settings"
              >
                Lounge settings
              </button>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full py-2 border border-sand-300 text-charcoal-500 hover:text-red-500 hover:border-red-300 rounded-sm text-[10px] tracking-wider uppercase font-bold text-center block cursor-pointer flex items-center justify-center space-x-1.5 font-bold"
              id="btn-profile-logout"
            >
              <LogOut className="h-3.5 w-3.5 text-red-500" />
              <span>Exit Harvest Lounge</span>
            </button>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-md border border-sand-200 shadow-e2xs">
            
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-sand-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">Active Crop Records</h3>
                  <p className="text-[11px] text-charcoal-405 font-light">
                    Track crop hand-plucking, sustainable packing, and cold express air-controlled shipment stages.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <span className="text-4xl block">🌱</span>
                    <h4 className="font-serif text-lg font-medium text-charcoal-900">No Orders Processed</h4>
                    <p className="text-xs text-charcoal-405 font-light max-w-xs mx-auto">
                      Any orders checkout processed using our Razorpay Sandbox will populate securely here for real-time tracking demonstrations.
                    </p>
                    <button 
                      onClick={() => setCurrentView('shop')}
                      className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] tracking-wider uppercase font-bold rounded-sm border border-transparent cursor-pointer"
                    >
                      Browse Fresh Market
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => {
                      const isExpanded = expandedOrderId === ord.id;
                      return (
                        <div 
                          key={ord.id} 
                          className="border border-sand-200 rounded-md overflow-hidden bg-sand-50/40"
                          id={`order-cabinet-${ord.id}`}
                        >
                          <div 
                            onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                            className="bg-sand-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-sand-100/50 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-xs">
                              <div>
                                <span className="text-[9px] text-charcoal-405 font-bold tracking-wider uppercase block">Order Date</span>
                                <span className="font-semibold text-charcoal-900 font-mono">{ord.createdAt}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-charcoal-405 font-bold tracking-wider uppercase block">Order ID</span>
                                <span className="font-mono font-bold text-emerald-700">{ord.id}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-charcoal-405 font-bold tracking-wider uppercase block">Freight Status</span>
                                <span className="rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] px-2 py-0.5 block mt-0.5 border border-emerald-300/10">
                                  ● {ord.status}
                                </span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center bg-white p-2 border border-sand-200 sm:border-0 sm:p-0 rounded-sm">
                              <span className="font-serif font-bold text-sm text-charcoal-900 block px-2">${ord.total} USD</span>
                              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest px-2 hover:underline">
                                {isExpanded ? 'Shrink' : 'Expand Details'}
                              </span>
                            </div>
                          </div>

                          {/* Expanded detail tracking */}
                          {isExpanded && (
                            <div className="p-5 bg-white border-t border-sand-200 text-xs space-y-6">
                              
                              <div className="space-y-3.5">
                                <span className="text-[10px] font-bold tracking-widest text-charcoal-950 uppercase block font-sans">Freshness Dispatch Timeline</span>
                                <div className="grid grid-cols-5 gap-1 position-relative">
                                  {[
                                    { label: 'Received', done: true },
                                    { label: 'Harvesting', done: ord.status !== 'Received' },
                                    { label: 'Bio Packing', done: ord.status === 'Assembling' || ord.status === 'Shipped' || ord.status === 'Delivered' },
                                    { label: 'Cold Freight', done: ord.status === 'Shipped' || ord.status === 'Delivered' },
                                    { label: 'Arrived', done: ord.status === 'Delivered' }
                                  ].map((prog, pi) => (
                                    <div key={pi} className="flex flex-col items-center">
                                      <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono ${
                                        prog.done ? 'bg-emerald-600 border border-emerald-700 text-white font-bold' : 'bg-sand-200 text-charcoal-450 border'
                                      }`}>
                                        {pi + 1}
                                      </div>
                                      <span className="text-[8px] font-medium tracking-wide mt-1 text-charcoal-405 uppercase text-center block truncate w-full">{prog.label}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="border-t border-sand-100 pt-4 space-y-3">
                                <span className="font-semibold text-charcoal-900 block font-serif text-sm">Dispatched Crop Specifications</span>
                                {ord.items.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-sand-50 text-xs">
                                    <div className="flex items-center space-x-3">
                                      <img src={item.image} alt="" className="h-10 w-9 object-cover rounded-xs border shrink-0" />
                                      <div>
                                        <b className="font-bold text-charcoal-900 block">{item.name}</b>
                                        <span className="text-charcoal-405 font-mono text-[10px] block">{item.details}</span>
                                      </div>
                                    </div>
                                    <span className="font-mono text-emerald-900 font-bold shrink-0 block">
                                      {item.quantity} x ${item.price} (${item.quantity * item.price} USD)
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-sand-50 p-4 rounded-md font-light text-charcoal-800">
                                <div className="space-y-1">
                                  <span className="font-semibold block text-charcoal-900">Delivery Location Address</span>
                                  <p className="font-mono text-[11px] leading-relaxed">
                                    {ord.address.name}<br />
                                    {ord.address.street}, {ord.address.city}, {ord.address.state} — {ord.address.zipCode}
                                  </p>
                                </div>
                                <div className="space-y-1.5 sm:text-right font-sans">
                                  <span className="font-semibold block text-charcoal-900">Payment Breakdown Log</span>
                                  <p>Market Subtotal: ${ord.subtotal} | Discounts applied: -${ord.discount}</p>
                                  <p>Express: {ord.shipping === 0 ? 'Complimentary' : `$${ord.shipping} USD`}</p>
                                  <p className="border-t border-sand-200 pt-1.5 font-bold font-serif text-emerald-900 text-sm">
                                    Total Amount: ${ord.total} USD
                                  </p>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="border-b border-sand-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">Your Bookmarked Organic Crops</h3>
                  <p className="text-[11px] text-charcoal-405 font-light">
                    Keep track of seed grades and direct orchard models you saved.
                  </p>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <span className="text-4xl block">❤️</span>
                    <h4 className="font-serif text-lg font-medium text-charcoal-900">Wishlist is Empty</h4>
                    <p className="text-xs text-charcoal-405 font-light max-w-xs mx-auto">
                      Click the romantic heart icon on any crop cards in the collection catalogs to save here.
                    </p>
                    <button 
                      onClick={() => setCurrentView('shop')}
                      className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] tracking-wider uppercase font-bold rounded-sm border border-transparent cursor-pointer"
                    >
                      Browse Crops
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p) => (
                      <div 
                        key={p.id} 
                        className="flex bg-white rounded-md border border-sand-200 overflow-hidden relative shadow-2xs p-3 gap-3"
                        id={`wishlist-row-${p.id}`}
                      >
                        <img src={p.images[0]} alt="" className="h-16 w-14 object-cover rounded-xs border" />
                        <div className="flex-1 flex flex-col justify-between text-xs font-light max-w-[140px]">
                          <div>
                            <span className="font-serif font-bold text-charcoal-900 block truncate" title={p.name}>{p.name}</span>
                            <span className="text-[10px] text-charcoal-405 block">{p.style}</span>
                          </div>
                          <span className="font-mono text-emerald-950 font-bold block">${p.price}</span>
                        </div>
                        
                        <div className="flex flex-col justify-between items-end">
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="text-[9px] text-[#c0392b] hover:underline font-bold font-sans cursor-pointer"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => onProductSelect(p)}
                            className="px-2 py-1 bg-emerald-650 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase rounded-sm cursor-pointer"
                          >
                            Investigate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="space-y-6">
                <div className="border-b border-sand-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">Saved Addresses</h3>
                  <p className="text-[11px] text-charcoal-405 font-light">
                    Store and edit your shipping coordinates for rapid farm-to-table delivery.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-emerald-555 bg-emerald-50/10 p-5 rounded-md flex justify-between items-start text-xs font-light">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-charcoal-905">Priya Sundaram</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#065f46] bg-emerald-100 px-1.5 py-0.5 rounded-sm">Default</span>
                      </div>
                      <p className="font-mono text-charcoal-800 leading-relaxed text-[11px]">
                        Flat 405, Prestige Shantiniketan<br />
                        Bangalore Whitefield, Karnataka, India — 560048
                      </p>
                      <p className="text-charcoal-405 font-mono">Mobile Contact: +91 98765 43210</p>
                    </div>
                    <button className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider hover:underline cursor-pointer">Modify</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="border-b border-sand-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">Lounge Settings</h3>
                  <p className="text-[11px] text-charcoal-405 font-light">
                    Manage notifications, direct farm announcements, and secure credentials options.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-light max-w-md">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-450 block">Opt-in notifications</label>
                    <label className="flex items-center space-x-2 text-charcoal-800 p-2 border border-sand-200 rounded-sm cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="accent-emerald-600 h-3.5 w-3.5" />
                      <span>Notify me via SMS when my harvest is plucking or on cold-regulation shipping</span>
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#0b1324] block">Lounge Password Security</label>
                    <button className="px-3.5 py-2 border border-sand-300 text-charcoal-800 bg-sand-50 rounded-sm font-bold uppercase tracking-wider text-[10px] block cursor-pointer hover:bg-sand-100">
                      Alter password
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
