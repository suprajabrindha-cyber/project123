import React, { useState } from 'react';
import { CreditCard, Truck, Shield, ArrowRight, Check, Send, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { Address, CartItem, Coupon, Order, OrderItem } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  setCurrentView: (view: any) => void;
}

export default function CheckoutView({
  cartItems,
  subtotal,
  discount,
  shipping,
  total,
  appliedCoupon,
  onClearCart,
  onAddOrder,
  setCurrentView
}: CheckoutViewProps) {
  // Address parameters
  const [addressName, setAddressName] = useState('Priya Sundaram');
  const [addressStreet, setAddressStreet] = useState('Flat 405, Prestige Shantiniketan');
  const [addressCity, setAddressCity] = useState('Bangalore Whitefield');
  const [addressState, setAddressState] = useState('Karnataka');
  const [addressZip, setAddressZip] = useState('560048');
  const [addressPhone, setAddressPhone] = useState('+91 98765 43210');

  // Razorpay simulation states
  const [isPayingRazorpay, setIsPayingRazorpay] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState<'methods' | 'processing' | 'success'>('methods');
  const [paymentOption, setPaymentOption] = useState<'card' | 'upi' | 'netbank'>('card');
  const [cardNumber, setCardNumber] = useState('4321 0987 6543 2100');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCVV, setCardCVV] = useState('228');
  
  // Checkout processing status
  const [orderCompleted, setOrderCompleted] = useState<Order | null>(null);

  // Trigger Razorpay modal overlay
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressName || !addressStreet || !addressCity || !addressZip || !addressPhone) return;
    
    setIsPayingRazorpay(true);
    setRazorpayStep('methods');
  };

  // Confirm Razorpay mock payment steps
  const handleConfirmRazorpayPayment = () => {
    setRazorpayStep('processing');
    
    setTimeout(() => {
      // Setup detailed Order model
      const mockOrderItemComponents: OrderItem[] = cartItems.map((c) => ({
        id: c.id,
        name: c.product ? c.product.name : 'Bespoke Family Harvest Crate Box',
        image: c.product ? c.product.images[0] : (c.customFrame?.sourceImage || ''),
        price: c.product ? c.product.price : (c.customFrame?.price || 0),
        quantity: c.quantity,
        details: c.product 
          ? `Weight: ${c.selectedSize}, basket: ${c.selectedColor}`
          : `Custom Air-Ventilation: ${c.customFrame?.width}x${c.customFrame?.height}" • Slat: ${c.customFrame?.frameStyle} • Bedding: ${c.customFrame?.matColor}`
      }));

      const finalAddress: Address = {
        id: `adr-${Date.now()}`,
        name: addressName,
        street: addressStreet,
        city: addressCity,
        state: addressState,
        zipCode: addressZip,
        phone: addressPhone,
        isDefault: true
      };

      const finalOrder: Order = {
        id: `HRV-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: 'usr-customer-01',
        userName: addressName,
        userEmail: 'priya.sundaram@cropenthusiast.com',
        items: mockOrderItemComponents,
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: total,
        address: finalAddress,
        status: 'Received',
        createdAt: new Date().toISOString().split('T')[0],
        trackingNumber: `CROP-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
        couponUsed: appliedCoupon?.code,
        paymentDetails: {
          method: `Razorpay Simulated ${paymentOption.toUpperCase()}`,
          transactionId: `pay_${Math.random().toString(36).substring(2, 16)}`,
          completedAt: new Date().toISOString()
        }
      };

      onAddOrder(finalOrder);
      setOrderCompleted(finalOrder);
      setRazorpayStep('success');

      setTimeout(() => {
        setIsPayingRazorpay(false);
        onClearCart();
      }, 1500);

    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="checkout-root">
      
      {orderCompleted ? (
        /* Order Success Page */
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-14 border border-sand-300 rounded-lg shadow-xl text-center space-y-8" id="checkout-success-view">
          
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-700 uppercase block font-mono">AUTHORIZED PAYMENT SUMMARY</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none">
              Your Basket is <br />
              <span className="italic font-normal text-emerald-700">Being Freshly Plucked!</span>
            </h1>
            <p className="text-xs text-charcoal-405 font-light leading-relaxed max-w-md mx-auto">
              Our orchard coordinators have received your specifications. We are hand-picking direct from local sustainable trees, chilling appropriately to trap enzymes, and shipping in organic breathing boxes.
            </p>
          </div>

          {/* Details breakdown */}
          <div className="bg-sand-50 p-6 rounded-md border border-sand-200 text-left text-xs space-y-4 font-light">
            <div className="flex justify-between border-b border-sand-100 pb-2">
              <span className="font-bold text-charcoal-900">Crop Order Reference</span>
              <span className="font-mono font-bold text-emerald-700">{orderCompleted.id}</span>
            </div>

            <div className="flex justify-between border-b border-sand-100 pb-2">
              <span className="font-bold text-[#1d273a] font-sans">Authorized Transaction ID</span>
              <span className="font-mono text-charcoal-450">{orderCompleted.paymentDetails.transactionId}</span>
            </div>

            <div className="flex justify-between border-b border-sand-100 pb-2">
              <span className="font-bold text-[#1a2332]">Express Thermal Tracking</span>
              <span className="font-mono text-charcoal-405">{orderCompleted.trackingNumber}</span>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-charcoal-900 block">Deliver to Address</span>
              <p className="font-mono text-[11px] text-coal-450 leading-relaxed">
                {orderCompleted.address.name}<br />
                {orderCompleted.address.street}, {orderCompleted.address.city}, {orderCompleted.address.state} — {orderCompleted.address.zipCode}
              </p>
            </div>
          </div>

          {/* Progression timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-charcoal-905 uppercase block">Harvest Progression Status</h3>
            <div className="grid grid-cols-5 gap-1.5 relative">
              
              <div className="absolute top-3 left-4 right-4 h-0.5 bg-sand-200 z-0" />
              
              {[
                { label: 'Authorized', active: true },
                { label: 'Hand-Plucking', active: false },
                { label: 'Crate Packing', active: false },
                { label: 'Cold Freight', active: false },
                { label: 'Delivered', active: false }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center relative z-10 text-[9px] font-medium uppercase tracking-wider">
                  <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center border font-mono ${
                    step.active ? 'bg-emerald-600 border-emerald-700 text-white font-bold' : 'bg-white border-sand-300 text-charcoal-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="mt-1.5 font-light text-center truncate w-full block text-charcoal-405">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-sand-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
            <button
              onClick={() => setCurrentView('profile')}
              className="px-6 py-3.5 bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold tracking-widest uppercase rounded-sm cursor-pointer shadow-xs font-bold"
              id="success-btn-profile"
            >
              Track on Profile Dashboard
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-6 py-3.5 border border-sand-300 text-charcoal-800 hover:bg-sand-100 text-xs font-bold tracking-widest uppercase rounded-sm cursor-pointer"
              id="success-btn-home"
            >
              Return Home
            </button>
          </div>

        </div>
      ) : (
        /* Regular Checkout Form */
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-8 bg-white p-6 rounded-md border border-sand-200 shadow-2xs space-y-6">
            
            <h3 className="text-sm font-bold tracking-widest border-b border-sand-100 pb-2.5 flex items-center space-x-2 text-emerald-800 uppercase">
              <Truck className="h-4.5 w-4.5 text-emerald-600" />
              <span>Conveyance Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Consignee Name</label>
                <input 
                  type="text" 
                  required
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2.5 px-3 focus:outline-hidden font-medium text-charcoal-900"
                  id="checkout-input-name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#565c6b] block">Contact Phone (Mobile/Primary)</label>
                <input 
                  type="text" 
                  required
                  value={addressPhone}
                  onChange={(e) => setAddressPhone(e.target.value)}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2.5 px-3 focus:outline-hidden font-medium text-charcoal-900"
                  id="checkout-input-phone"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Street Address / Homestead / Landmark</label>
                <input 
                  type="text" 
                  required
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2.5 px-3 focus:outline-hidden font-medium text-charcoal-900"
                  id="checkout-input-street"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">City / Town District</label>
                <input 
                  type="text" 
                  required
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                  className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2.5 px-3 focus:outline-hidden font-medium text-charcoal-900"
                  id="checkout-input-city"
                />
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-405 block">State</label>
                    <input 
                      type="text" 
                      required
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                      className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden font-medium text-charcoal-900"
                      id="checkout-input-state"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal-405 block">Pincode / ZIP</label>
                    <input 
                      type="text" 
                      required
                      value={addressZip}
                      onChange={(e) => setAddressZip(e.target.value)}
                      className="w-full text-xs bg-sand-50 border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden font-mono font-bold text-charcoal-900"
                      id="checkout-input-zip"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-sand-100 p-4 rounded-md border border-sand-305 text-xs text-charcoal-800 leading-relaxed font-light">
              🚀 <strong className="font-semibold">Razorpay India Gateway Integration:</strong> Clicking authorization triggers our secure custom merchant billing popover. This lets you practice safe sandbox payments directly inside this container environment.
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              id="checkout-btn-auth-payment"
            >
              <span>Authorize Payment & Order</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-5 rounded-md border border-sand-200 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-emerald-800 border-b border-sand-100 pb-2.5">
                Crop Basket Recap ({cartItems.length})
              </h3>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                {cartItems.map((item, id) => {
                  const isB = !item.product && !!item.customFrame;
                  const itemTitle = isB ? 'Custom Bespoke Harvest Box' : (item.product?.name || '');
                  const itemImg = isB ? item.customFrame?.sourceImage : (item.product?.images[0] || '');
                  const itemPrice = isB ? (item.customFrame?.price || 0) : (item.product?.price || 0);

                  return (
                    <div key={id} className="flex items-center justify-between text-xs font-light">
                      <div className="flex items-center space-x-2.5">
                        <img src={itemImg} alt="" className="h-9 w-8 object-cover rounded-xs border border-sand-200 shrink-0" />
                        <div>
                          <span className="font-semibold text-charcoal-900 block truncate max-w-[140px]" title={itemTitle}>{itemTitle}</span>
                          <span className="text-charcoal-405 block text-[10px]">Qty {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono text-emerald-900 font-bold">${itemPrice * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-md border border-sand-200 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal-905 border-b border-sand-100 pb-2">
                Secure Invoice Detail
              </h3>

              <div className="space-y-2.5 text-xs text-charcoal-800 font-light font-sans">
                <div className="flex justify-between">
                  <span>Harvest Subtotal</span>
                  <span className="font-mono">${subtotal} USD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Slashed</span>
                    <span className="font-mono">-${discount} USD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold Express Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? <b className="text-emerald-600 tracking-wider font-extrabold text-[10px]">COMPLIMENTARY</b> : `$${shipping} USD`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-sand-110 pt-3 text-sm font-bold">
                  <span className="text-charcoal-900 uppercase">Grand Total Invoice</span>
                  <span className="font-serif text-lg text-emerald-955">${total} USD</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[10px] text-charcoal-405 uppercase font-medium pt-3.5 border-t border-sand-100">
                <Shield className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>100% Quality Harvest Guarantee</span>
              </div>
            </div>

          </div>

        </form>
      )}

      {/* RAZORPAY PORTAL */}
      {isPayingRazorpay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/80 backdrop-blur-xs p-4" id="razorpay-overlay-stage">
          
          <div className="w-full max-w-md bg-[#0c1328] text-white rounded-lg border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            
            <div className="bg-[#111936] p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="h-7 w-7 rounded-sm bg-emerald-600 flex items-center justify-center font-bold font-mono text-white text-sm">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wider uppercase text-slate-100 font-sans">Razorpay Secure</h4>
                  <p className="text-[9px] text-[#4dd0e1] font-mono">ID: mer_organic_crop_vault</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-[9px] text-slate-400 block uppercase">Total Invoice</span>
                <span className="font-bold text-sm text-[#4dd0e1]">${total} USD</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
              
              {razorpayStep === 'methods' && (
                <div className="space-y-4">
                  <div className="bg-[#112233] p-3 text-center rounded-sm border border-emerald-400/20 text-xs text-emerald-300 font-mono leading-relaxed">
                    Organic Market Sandbox Environment. Demo Test Mode. No actual funds requested.
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Select Razorpay Option</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentOption('card')}
                        className={`py-2 px-2.5 rounded-sm border cursor-pointer text-center transition-all ${
                          paymentOption === 'card' ? 'bg-emerald-650 border-emerald-600 text-white font-bold' : 'border-white/10 text-slate-400 hover:text-white'
                        }`}
                        id="razor-opt-card"
                      >
                        <CreditCard className="h-3.5 w-3.5 mx-auto mb-1" />
                        <span className="text-[9px] tracking-wide uppercase block">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption('upi')}
                        className={`py-2 px-2.5 rounded-sm border cursor-pointer text-center transition-all ${
                          paymentOption === 'upi' ? 'bg-emerald-650 border-emerald-600 text-white font-bold' : 'border-white/10 text-slate-400 hover:text-white'
                        }`}
                        id="razor-opt-upi"
                      >
                        <Send className="h-3.5 w-3.5 mx-auto mb-1" />
                        <span className="text-[9px] tracking-wide uppercase block">UPI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption('netbank')}
                        className={`py-2 px-2.5 rounded-sm border cursor-pointer text-center transition-all ${
                          paymentOption === 'netbank' ? 'bg-emerald-650 border-emerald-600 text-white font-bold' : 'border-white/10 text-slate-400 hover:text-white'
                        }`}
                        id="razor-opt-net"
                      >
                        <Building2 className="h-3.5 w-3.5 mx-auto mb-1" />
                        <span className="text-[9px] tracking-wide uppercase block">Netbank</span>
                      </button>
                    </div>
                  </div>

                  {paymentOption === 'card' && (
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-[8px] tracking-wider text-slate-400 block font-mono">CREDIT/DEBIT CARD NUMBER</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#111936] text-xs font-mono py-2 px-3 rounded-xs border border-white/10 focus:outline-hidden text-emerald-300"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[8px] tracking-wider text-slate-400 block font-mono">EXPIRY</label>
                          <input 
                            type="text" 
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-[#111936] text-xs font-mono py-2 px-3 rounded-xs border border-white/10 focus:outline-hidden text-center text-emerald-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] tracking-wider text-slate-400 block font-mono">CVV SECRET</label>
                          <input 
                            type="password" 
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            className="w-full bg-[#111936] text-xs font-mono py-2 px-3 rounded-xs border border-white/10 focus:outline-hidden text-center text-emerald-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentOption === 'upi' && (
                    <div className="space-y-2 pt-4 text-center">
                      <p className="text-xs text-slate-300">Enter your UPI VPA handle address (e.g. GooglePay/PhonePe)</p>
                      <input 
                        type="text" 
                        placeholder="priya.sundaram@okaxis" 
                        className="bg-[#111936] text-xs font-mono text-center py-2 px-3 rounded-sm border border-white/10 w-full focus:outline-hidden text-[#4dd0e1]"
                      />
                    </div>
                  )}

                  {paymentOption === 'netbank' && (
                    <div className="space-y-2 pt-4">
                      <p className="text-[10px] text-slate-400 block">Select standard Indian banking handles</p>
                      <select className="bg-[#111936] text-xs py-2 px-3 rounded-sm border border-white/10 w-full text-slate-200 cursor-pointer">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Commercial Bank</option>
                        <option>Axis National Bank</option>
                      </select>
                    </div>
                  )}

                </div>
              )}

              {razorpayStep === 'processing' && (
                <div className="text-center space-y-6 py-6 font-mono">
                  <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold tracking-wider text-slate-205 block">Authorizing Bank Transaction...</p>
                    <p className="text-[10px] text-slate-450">Connecting with live merchant ledger tunnels.</p>
                  </div>
                </div>
              )}

            </div>

            {razorpayStep === 'methods' && (
              <div className="bg-[#111936] p-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPayingRazorpay(false)}
                  className="flex-1 py-2.5 bg-transparent hover:bg-white/5 rounded-sm text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRazorpayPayment}
                  className="flex-1 py-2.5 bg-emerald-650 hover:bg-emerald-600 rounded-sm text-xs font-bold uppercase tracking-wider border border-emerald-500 shadow-md cursor-pointer text-white flex items-center justify-center space-x-1.5"
                  id="razorpay-pay-submit"
                >
                  <span>Pay Securely</span>
                  <ExternalLink className="h-3 w-3 text-white" />
                </button>
              </div>
            )}

            <div className="p-2 bg-[#0a0f21] text-[9px] text-[#4dd0e1] text-center font-mono opacity-80 border-t border-white/5">
              Securely powered by Razorpay gateways (Sandbox mock simulation)
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
