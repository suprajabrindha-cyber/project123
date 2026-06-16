import React, { useState } from 'react';
import { Settings, BarChart2, Package, ShoppingBag, Users, PlusCircle, Trash2, Tag } from 'lucide-react';
import { Product, Order, Coupon } from '../types';
import { LUXURY_COUPONS } from '../data/products';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (p: Product) => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
}

export default function AdminDashboard({
  products,
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'customers' | 'coupons'>('analytics');
  
  // Product Form variables
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Fruits' | 'Vegetables' | 'Seeds' | 'Organic' | 'Equipment'>('Fruits');
  const [newProdPrice, setNewProdPrice] = useState('45');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=600');

  // Coupon state
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>(LUXURY_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState('15');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  // Analytics helper aggregates
  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 12450; // mock starter base + dynamic sales
  const completedOrdersCount = orders.length + 38; // mock count base
  const totalSubscribersCount = 145;

  // Add Product handler
  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc) return;

    const added: Product = {
      id: `custom-added-${Date.now()}`,
      name: newProdName,
      description: newProdDesc,
      price: Number(newProdPrice),
      category: newProdCategory,
      stock: 15,
      rating: 4.8,
      style: `${newProdCategory} Fresh Harvest`,
      images: [newProdImg],
      materials: ['Organic'],
      materialDetails: [{ name: 'Spelt Raw Slats', description: 'Sustainable Spelt Timber', finish: 'Satin Clear coat' }],
      sizes: [
        { label: '1 Kg Small Box', width: 8, height: 10, multiplier: 1.0 },
        { label: '2.5 Kg Family Crate', width: 12, height: 16, multiplier: 1.4 }
      ],
      colors: [{ name: 'Natural Pine', hex: '#ebdfcd', priceAdjustment: 0 }],
      specifications: { 'Grower Soil': 'Bio-active Humus', 'Ripening': 'Natural Air' },
      reviews: []
    };

    onAddProduct(added);
    setIsAddingProduct(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  // Add Coupon handles
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    const couponCodeFormatted = newCouponCode.trim().toUpperCase();
    const coup: Coupon = {
      code: couponCodeFormatted,
      discountType: newCouponType,
      value: Number(newCouponVal),
      description: `${newCouponVal}${newCouponType === 'percentage' ? '%' : '$'} off eco crops.`
    };

    setActiveCoupons([...activeCoupons, coup]);
    setNewCouponCode('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="admin-root">
      
      {/* Header */}
      <div className="border-b border-sand-200 pb-6 mb-10 text-center md:text-left space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900 leading-none flex items-center justify-center md:justify-start space-x-3">
          <Settings className="h-8 w-8 text-emerald-600" />
          <span>Sustainable Grower Operations</span>
        </h1>
        <p className="text-xs text-charcoal-405 font-light">
          Monitor direct marketplace financial analytics, update harvest process tracking milestones, configure discount coupon registers, and catalog ready-to-home organic yields.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sand-100 pb-5 mb-8" id="admin-tabs">
        {[
          { id: 'analytics', label: 'Market Metrics', icon: BarChart2 },
          { id: 'products', label: 'Crops Catalog', icon: Package },
          { id: 'orders', label: 'Harvest Milestones', icon: ShoppingBag },
          { id: 'customers', label: 'Patrons Database', icon: Users },
          { id: 'coupons', label: 'Coupon Registry', icon: Tag }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4.5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-650 text-white shadow-sm border-transparent'
                  : 'bg-white text-charcoal-800 border border-sand-300 hover:border-emerald-600'
              }`}
              id={`admin-tab-pill-${tab.id}`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 sm:p-8 border border-sand-200 rounded-md shadow-2xs">
        
        {activeTab === 'analytics' && (
          <div className="space-y-10" id="admin-panel-analytics">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
              
              <div className="bg-sand-50 p-6 rounded-md border border-sand-200 shadow-2xs">
                <span className="text-[10px] text-charcoal-405 font-bold uppercase tracking-widest block">Consolidated Monetary Sales</span>
                <span className="font-serif text-3xl font-light text-charcoal-900 mt-2 block">${totalSalesRevenue} USD</span>
                <span className="text-[10px] text-emerald-700 font-semibold uppercase block mt-1.5 font-mono">📈 +14.2% above last quarter comparison</span>
              </div>

              <div className="bg-sand-50 p-6 rounded-md border border-sand-200 shadow-2xs">
                <span className="text-[10px] text-charcoal-405 font-bold uppercase tracking-widest block">Harvest Crates Dispatched</span>
                <span className="font-serif text-3xl font-light text-charcoal-900 mt-2 block">{completedOrdersCount} crates</span>
                <span className="text-[10px] text-emerald-700 font-semibold uppercase block mt-1.5 font-mono">🌱 Average purity rating: 4.88/5</span>
              </div>

              <div className="bg-sand-50 p-6 rounded-md border border-sand-200 shadow-2xs">
                <span className="text-[10px] text-charcoal-401 font-bold uppercase tracking-widest block">Subscribed Organic Patrons</span>
                <span className="font-serif text-3xl font-light text-charcoal-900 mt-2 block">{totalSubscribersCount} active users</span>
                <span className="text-[10px] text-charcoal-400 font-semibold uppercase block mt-1.5 font-mono">✓ Retention: 91% global scale</span>
              </div>

            </div>

            <div className="space-y-6 pt-6 border-t border-sand-100">
              <h3 className="font-serif text-lg font-bold text-charcoal-901">Quarterly Fresh Crop Demands Comparison</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Organic Alphonso Mangoes', sales: '$4,120', percent: 85 },
                  { name: 'Pure Cow Ghee A2', sales: '$3,890', percent: 79 },
                  { name: 'Premium Himachali Apples', sales: '$2,900', percent: 59 },
                  { name: 'Native Red Onions', sales: '$1,540', percent: 31 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs text-charcoal-800 font-light">
                      <span>{item.name}</span>
                      <span className="font-mono font-bold text-emerald-700">{item.sales} USD</span>
                    </div>
                    <div className="h-2 w-full bg-sand-150 rounded-xs overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-xs transition-all duration-500" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6" id="admin-panel-products">
            
            <div className="flex justify-between items-center border-b border-sand-100 pb-3">
              <div>
                <b className="font-serif text-xl tracking-tight text-charcoal-900 block font-serif">Harvest Catalog of Direct Crops ({products.length})</b>
                <span className="text-[11px] text-charcoal-405 font-light block">Create custom seeds weight, organic categories, or remove finished crop stock.</span>
              </div>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="px-4 py-2 bg-emerald-605 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer flex items-center space-x-1 font-bold"
                id="btn-admin-modal-toggle"
              >
                <PlusCircle className="h-4 w-4 text-white" />
                <span>{isAddingProduct ? 'Collapse form' : 'Add fresh harvest crop'}</span>
              </button>
            </div>

            {isAddingProduct && (
              <form onSubmit={handleAddNewProductSubmit} className="bg-sand-50 p-5 rounded-md border border-sand-200.5 space-y-4 text-xs font-light font-sans max-w-2xl">
                <h4 className="font-serif font-bold text-sm text-charcoal-900 flex items-center space-x-2">
                  <span>🌱 Create crop catalogue record</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#000511] block">Crop design title</label>
                    <input 
                      type="text" required placeholder="Raw organic ginger"
                      value={newProdName} onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-charcoal-900"
                      id="input-add-prod-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Base Price Per Unit ($)</label>
                    <input 
                      type="number" required placeholder="45"
                      value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-charcoal-900 font-mono"
                      id="input-add-prod-price"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-405 block">Harvest category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e: any) => setNewProdCategory(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden cursor-pointer"
                      id="select-add-prod-category"
                    >
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Organic">Organic</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#0c142c] block">Display Unsplash Photo URL</label>
                    <input 
                      type="text" required
                      value={newProdImg} onChange={(e) => setNewProdImg(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-charcoal-950 truncate"
                      id="input-add-prod-img"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#000d29] block">Description & Soil Specs</label>
                  <textarea 
                    rows={2} required
                    placeholder="Describe crop provenance, nutrition specs, soil details and post-harvest recommendations..."
                    value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full text-xs bg-white border border-sand-300 rounded-sm py-2 px-3 focus:outline-hidden text-charcoal-900 font-sans"
                    id="textarea-add-prod-desc"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer font-bold"
                  id="btn-add-prod-submit"
                >
                  Confirm add model catalog record
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div 
                  key={p.id} 
                  className="border border-sand-200 rounded-md p-4 bg-sand-50/20 flex gap-4 items-center justify-between shadow-e2xs font-sans text-xs"
                  id={`admin-prod-card-${p.id}`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <img src={p.images[0]} alt="" className="h-14 w-12 object-cover rounded-sm border shrink-0" />
                    <div className="overflow-hidden">
                      <b className="font-bold text-charcoal-900 block truncate text-xs" title={p.name}>{p.name}</b>
                      <span className="text-[9px] text-[#047857] font-bold block uppercase mt-0.5">{p.category} • ${p.price} USD</span>
                      <span className="text-[8px] text-charcoal-405 block italic font-mono mt-0.5">// {p.style}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-1.5 text-charcoal-400 hover:text-red-650 rounded-sm hover:bg-sand-100 cursor-pointer"
                    title="Delete product category model"
                    id={`btn-admin-delete-${p.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6" id="admin-panel-orders">
            
            <div className="border-b border-sand-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Manage Active Harvest Milestones ({orders.length})</h3>
              <p className="text-[11px] text-charcoal-405 font-light">
                Inspect patron requests, and update the order state status milestones dynamically (Received -&gt; Harvesting -&gt; Bio Packing -&gt; Cold Freight -&gt; Delivered).
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <span className="text-3xl block">🌱</span>
                <h4 className="font-serif text-lg font-medium text-charcoal-900">No Orders in register</h4>
                <p className="text-xs text-charcoal-405 font-light">
                  Once orders are placed by simulated customer accounts during checkout, they will populate here instantly for management.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div 
                    key={ord.id} 
                    className="border border-sand-200 rounded-md p-5 bg-sand-50/40 divide-y divide-sand-100 space-y-4"
                    id={`admin-order-card-${ord.id}`}
                  >
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 justify-center text-xs">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                          <span className="text-[9px] text-charcoal-405 font-bold block uppercase tracking-wider">Crop Order ID</span>
                          <span className="font-mono font-bold text-emerald-700 block text-[11px]">{ord.id}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-charcoal-405 font-bold block uppercase tracking-wider">Patron Name</span>
                          <span className="text-charcoal-900 block">{ord.address.name} ({ord.address.phone})</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-charcoal-405 font-bold block uppercase tracking-wider">Estimated Price Total</span>
                          <span className="font-mono font-bold text-emerald-800 block">${ord.total} USD</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <span className="font-bold text-[10px] uppercase text-charcoal-950 font-sans">Set Milestone Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-white border border-sand-300 rounded-sm py-1.5 px-2.5 text-xs font-bold text-charcoal-950 focus:outline-hidden cursor-pointer"
                          id={`select-status-ord-${ord.id}`}
                        >
                          <option value="Received">Received</option>
                          <option value="In Crafting">Harvesting</option>
                          <option value="Assembling">Bio Packing</option>
                          <option value="Shipped">Cold Freight</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 text-[11px] font-light text-charcoal-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-charcoal-900 block mb-1">Crops and crates requested</span>
                        <ul className="space-y-1 font-mono text-[10px]">
                          {ord.items.map((i, idx) => (
                            <li key={idx}>• {i.quantity} x {i.name} — <span className="text-charcoal-450 font-sans italic">{i.details}</span></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold text-charcoal-900 block mb-1 font-sans">Delivery destination coordinates</span>
                        <p className="font-mono text-[10px] leading-relaxed text-charcoal-450">
                          {ord.address.street}, {ord.address.city}, {ord.address.state} — {ord.address.zipCode}
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6" id="admin-panel-customers">
            
            <div className="border-b border-sand-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Patrons Database</h3>
              <p className="text-[11px] text-charcoal-405 font-light">
                Track client details, billing profiles, total transaction value, and geographic coordinates.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light divide-y divide-sand-200">
                <thead className="bg-sand-50 uppercase tracking-widest text-[9px] font-bold text-charcoal-450">
                  <tr>
                    <th className="py-3 px-4">Patron Representative</th>
                    <th className="py-3 px-4">Email Contact</th>
                    <th className="py-3 px-4">Crates ordered</th>
                    <th className="py-3 px-4 text-right">Value transactions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-150">
                  {[
                    { name: 'Priya Sundaram', email: 'priya.sundaram@cropenthusiast.com', count: orders.length + 2, spend: `$${orders.reduce((sum, o) => sum + o.total, 0) + 840}` },
                    { name: 'Alistair Sterling', email: 'alistair@sterlinginteriors.com', count: 3, spend: '$1,290' },
                    { name: 'Elena Rostova', email: 'elena.rostova@design.com', count: 4, spend: '$1,940' },
                    { name: 'Marcus Sterling', email: 'marcus@spaces.co', count: 1, spend: '$245' }
                  ].map((cust, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/50">
                      <td className="py-3 px-4 font-semibold text-charcoal-900 flex items-center space-x-2">
                        <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px] font-bold font-sans">
                          {cust.name.split(' ')[0][0]}{cust.name.split(' ')[1]?.[0] || ''}
                        </span>
                        <span>{cust.name}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-950">{cust.email}</td>
                      <td className="py-3 px-4 font-mono font-bold text-center">{cust.count} crates</td>
                      <td className="py-3 px-4 font-mono font-bold text-right text-emerald-800">{cust.spend} USD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="space-y-6" id="admin-panel-coupons">
            
            <div className="border-b border-sand-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Configure Market Coupons</h3>
              <p className="text-[11px] text-charcoal-405 font-light">
                Deploy direct promotional discounts for specific checkout spends and regional crop holidays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <form onSubmit={handleAddCoupon} className="md:col-span-4 bg-sand-50 p-5 rounded-md border border-sand-200.5 text-xs font-light font-sans space-y-4">
                <h4 className="font-serif font-bold text-sm text-charcoal-900 flex items-center space-x-2">
                  <span>🎟️ Mint Promo Coupon</span>
                </h4>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0b142c] block">Promo Code</label>
                  <input 
                    type="text" required placeholder="FARM30"
                    value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full text-xs bg-white border border-sand-305 rounded-sm py-2 px-3 focus:outline-hidden uppercase font-mono font-bold text-charcoal-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#000511] block">Value</label>
                    <input 
                      type="number" required placeholder="20"
                      value={newCouponVal} onChange={(e) => setNewCouponVal(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-305 rounded-sm py-2 px-3 focus:outline-hidden font-mono font-bold text-charcoal-950"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#565f6c] block">Type</label>
                    <select
                      value={newCouponType}
                      onChange={(e: any) => setNewCouponType(e.target.value)}
                      className="w-full text-xs bg-white border border-sand-305 rounded-sm py-2 px-3 focus:outline-hidden cursor-pointer font-bold"
                    >
                      <option value="percentage">% Percent</option>
                      <option value="fixed">$ Fixed Surcharge</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer shadow-sm font-bold"
                  id="btn-coupon-submit"
                >
                  Publish Coupon
                </button>
              </form>

              <div className="md:col-span-8 space-y-4">
                <span className="font-semibold text-charcoal-900 block text-xs">Active Coupon Registry records</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCoupons.map((c, idx) => (
                    <div key={idx} className="border border-sand-200.5 bg-sand-50/25 p-4 rounded-md flex items-center justify-between text-xs shadow-3xs" id={`coupon-row-${idx}`}>
                      <div className="space-y-1">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-100 text-[10px] px-2 py-0.5 rounded-sm uppercase inline-block font-bold">
                          {c.code}
                        </span>
                        <p className="font-light text-charcoal-800 text-[11px] font-sans">{c.description}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-600 block font-bold font-sans">Active</span>
                        <span className="text-[9px] font-mono text-charcoal-405 block">Multiuse</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
