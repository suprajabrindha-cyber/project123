import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Percent, ArrowRight, ShieldCheck, CornerDownRight } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { LUXURY_COUPONS } from '../data/products';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  setCurrentView: (view: any) => void;
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  setCurrentView,
  appliedCoupon,
  setAppliedCoupon
}: CartViewProps) {
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Surcharges subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.product ? item.product.price : (item.customFrame ? item.customFrame.price : 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  // Apply Coupon discount formula
  const discountVal = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minSpend && subtotal < appliedCoupon.minSpend) {
      return 0;
    }
    if (appliedCoupon.discountType === 'percentage') {
      return (subtotal * appliedCoupon.value) / 100;
    } else {
      return appliedCoupon.value;
    }
  })();

  const shippingCost = subtotal > 150 ? 0 : 25; // Surcharge or Free above $150
  const grandTotal = Math.max(0, subtotal - discountVal + shippingCost);

  // Core handler for promo validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const trimmedInput = couponCodeInput.trim().toUpperCase();
    const match = LUXURY_COUPONS.find(c => c.code === trimmedInput);

    if (!match) {
      setCouponError('Invalid promotion code. Codes are uppercase (e.g., FARM15).');
      return;
    }

    if (match.minSpend && subtotal < match.minSpend) {
      setCouponError(`This code requires a minimum market order spend above $${match.minSpend}.`);
      return;
    }

    setAppliedCoupon(match as Coupon);
    setCouponSuccess(`Promotion code "${match.code}" applied! You saved ${match.discountType === 'percentage' ? `${match.value}%` : `$${match.value}`}.`);
    setCouponCodeInput('');
  };

  const handleRemovePromo = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="cart-view-container">
      
      {/* Header */}
      <div className="border-b border-sand-200 pb-6 mb-10 text-center md:text-left space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none flex items-center justify-center md:justify-start space-x-3">
          <ShoppingBag className="h-8 w-8 text-emerald-600" />
          <span>Your Fresh Harvest Basket</span>
        </h1>
        <p className="text-xs text-charcoal-405 font-light">
          Review your pesticide-free seasonal crops and custom heritage box configurations before dispatching.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-md border border-sand-200 shadow-2xs space-y-6 max-w-xl mx-auto">
          <span className="text-5xl block animate-bounce">🌱</span>
          <h2 className="font-serif text-2xl font-light text-charcoal-900">Your Basket is Empty</h2>
          <p className="text-xs text-charcoal-405 font-light leading-relaxed max-w-xs mx-auto">
            Ready to stock up on sun-sweetened alphonso fruits and heirloom seeds? Let us harvest directly for you.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center pt-2 px-6">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
              id="empty-cart-btn-shop"
            >
              Explore Fresh Market
            </button>
            <button
              onClick={() => setCurrentView('customizer')}
              className="px-5 py-3 border border-sand-300 text-charcoal-800 hover:bg-sand-50 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
              id="empty-cart-btn-builder"
            >
              Custom Box Builder
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of items */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => {
              const isBespoke = !item.product && !!item.customFrame;
              const title = isBespoke ? `Bespoke Harvest Box Selection` : (item.product?.name || '');
              const image = isBespoke ? item.customFrame?.sourceImage : (item.product?.images[0] || '');
              const description = isBespoke 
                ? `Focal Spec: ${item.customFrame?.imageName.slice(0, 24)}...`
                : (item.product?.description || '');
              const unitPrice = isBespoke ? (item.customFrame?.price || 0) : (item.product?.price || 0);
              
              const configSpec = isBespoke 
                ? `${item.customFrame?.width}" x ${item.customFrame?.height}" Box • Slat Style: ${item.customFrame?.frameStyle} • Cushioning Bedding: ${item.customFrame?.matColor} • Preservation: ${item.customFrame?.glazing}`
                : `Weight / Pack: ${item.selectedSize || 'Standard Pack'} • Timber Basket finish: ${item.selectedColor || 'Regular Slats'} • Purity: verified 100% Organic`;

              return (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row bg-white p-5 rounded-md border border-sand-200 shadow-2xs gap-4 relative justify-between object-fill"
                  id={`cart-line-item-${item.id}`}
                >
                  
                  <div className="flex gap-4">
                    <div className="h-24 w-20 bg-sand-50 p-1 border border-sand-300 rounded-sm flex items-center justify-center shrink-0">
                      <div 
                        className="w-full h-full p-1 bg-white border flex items-center justify-center overflow-hidden"
                        style={{
                          borderColor: isBespoke ? selectedProfileHex(item.customFrame?.frameStyle) : '#cccccc',
                          borderWidth: isBespoke ? '3px' : '1px'
                        }}
                      >
                        <img 
                          src={image} 
                          referrerPolicy="no-referrer"
                          alt={title} 
                          className="h-full w-full object-cover rounded-2xs" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal-900 leading-tight">
                          {title}
                        </h3>
                        {isBespoke && (
                          <span className="rounded-xs bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wide">
                            Bespoke Box
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] text-charcoal-405 font-light max-w-md hidden sm:block">
                        {description}
                      </p>

                      <div className="text-[10px] sm:text-xs text-charcoal-650 font-mono flex items-start gap-1">
                        <CornerDownRight className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{configSpec}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex sm:flex-col justify-between items-center sm:items-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-0 border-sand-100 font-mono">
                    
                    <span className="font-mono text-emerald-900 font-bold text-sm block">
                      ${unitPrice * item.quantity} USD
                    </span>

                    {/* Quantity selectors */}
                    <div className="flex items-center space-x-1 border border-sand-305 bg-sand-50 rounded-sm">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="h-7 w-7 flex items-center justify-center hover:bg-sand-200 transition-colors text-charcoal-800 disabled:opacity-20 cursor-pointer"
                        disabled={item.quantity <= 1}
                        id={`cart-qty-dec-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs font-bold px-2 text-charcoal-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="h-7 w-7 flex items-center justify-center hover:bg-sand-200 transition-colors text-charcoal-800 cursor-pointer"
                        id={`cart-qty-inc-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-charcoal-400 hover:text-[#c0392b] transition-colors rounded-sm hover:bg-sand-100 cursor-pointer"
                      title="Remove from basket"
                      id={`cart-trash-${item.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code */}
            <div className="bg-white p-5 rounded-md border border-sand-200 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 flex items-center space-x-1.5">
                <Percent className="h-4 w-4 text-emerald-600" />
                <span>Harvest Coupons</span>
              </h3>

              {!appliedCoupon ? (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="FARM15, HARVEST50..."
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-sand-50 border border-sand-300 rounded-sm text-xs py-2 px-3 focus:outline-hidden uppercase placeholder-charcoal-400"
                    id="cart-input-coupon"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-sm border border-emerald-400/25 text-xs text-emerald-800">
                  <span className="font-semibold">{appliedCoupon.code} Applied</span>
                  <button 
                    onClick={handleRemovePromo}
                    className="p-1 text-emerald-600 hover:text-emerald-700 italic cursor-pointer font-bold text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && <p className="text-[10px] text-red-500 font-mono leading-relaxed">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-700 font-medium leading-relaxed">{couponSuccess}</p>}
              
              <div className="text-[10px] text-charcoal-405 leading-relaxed bg-sand-50 p-2.5 rounded-xs">
                💡 Active coupon codes: <b className="text-charcoal-800 font-mono font-bold">FARM15</b> (Save 15% spend &gt;$150) or <b className="text-charcoal-800 font-mono font-bold">HARVEST50</b> (Save $50 spend &gt;$300).
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-white p-6 rounded-md border border-sand-200 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-900 border-b border-sand-100 pb-2.5">
                Market Payment Summary
              </h3>

              <div className="space-y-3.5 text-xs text-charcoal-800 font-light font-sans">
                <div className="flex justify-between">
                  <span>Fresh Harvest Subtotal</span>
                  <span className="font-mono text-charcoal-900 font-semibold">${subtotal} USD</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Coupon ({appliedCoupon.code})</span>
                    <span className="font-mono font-semibold">-${discountVal} USD</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Air-Regulated Cold Express Shipping</span>
                  <span className="font-mono text-charcoal-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">Free Above $150</span>
                    ) : (
                      `$${shippingCost} USD`
                    )}
                  </span>
                </div>

                {subtotal < 150 && (
                  <p className="text-[9px] text-emerald-700 italic bg-emerald-50 p-2 border border-emerald-200/20">
                    Add ${150 - subtotal} more of custom crops to qualify for complimentary cold-regulated bio shipping.
                  </p>
                )}

                <div className="flex justify-between border-t border-sand-200 pt-4 text-sm font-bold">
                  <span className="text-charcoal-900 uppercase">Grand Total Estimate</span>
                  <span className="font-serif text-lg text-charcoal-900">${grandTotal} USD</span>
                </div>
              </div>

              {/* Gilded Authorization action */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                id="btn-cart-checkout"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 pt-3 border-t border-sand-100 text-[10px] text-charcoal-405 font-medium uppercase tracking-wide">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Safe Direct Grower Encrypted checkout</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function selectedProfileHex(styleName?: string) {
  if (!styleName) return '#10b981';
  if (styleName.includes('Bamboo')) return '#e2ba49';
  if (styleName.includes('Pine')) return '#ebdcc5';
  if (styleName.includes('Mahogany')) return '#4e3323';
  return '#10b981';
}
