import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CustomizerView from './components/CustomizerView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import UserOrdersView from './components/UserOrdersView';
import AdminDashboard from './components/AdminDashboard';

import { Product, CartItem, Order, Coupon } from './types';
import { LUXURY_PRODUCTS } from './data/products';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'customizer' | 'cart' | 'profile' | 'admin' | 'product-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Shopping cart, wishlist state management
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Synchronized Products registry (lets admin insert models)
  const [productsRegistry, setProductsRegistry] = useState<Product[]>(LUXURY_PRODUCTS);

  // Synchronized active checkout Orders list (coordinates profile tracking and admin updates!)
  const [orders, setOrders] = useState<Order[]>([]);

  // -----------------------------------------------------------------
  // State Mutators
  // -----------------------------------------------------------------

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleAddToCart = (partialItem: Partial<CartItem>) => {
    setCartItems((prevItems) => {
      // Generate standard match index check if same spec line exists
      const existingIdx = prevItems.findIndex(item => item.id === partialItem.id);
      
      if (existingIdx > -1) {
        const copy = [...prevItems];
        copy[existingIdx].quantity += (partialItem.quantity || 1);
        return copy;
      } else {
        const newItem: CartItem = {
          id: partialItem.id || `cart-line-${Date.now()}`,
          productId: partialItem.productId,
          product: partialItem.product,
          customFrame: partialItem.customFrame,
          selectedSize: partialItem.selectedSize,
          selectedColor: partialItem.selectedColor,
          selectedMaterial: partialItem.selectedMaterial,
          quantity: partialItem.quantity || 1
        };
        return [...prevItems, newItem];
      }
    });
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const targetQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, targetQty) };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWish) =>
      prevWish.includes(productId)
        ? prevWish.filter((id) => id !== productId)
        : [...prevWish, productId]
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const handleAddOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Admin additions mutators
  const handleAddCatalogProduct = (p: Product) => {
    setProductsRegistry((prev) => [p, ...prev]);
  };

  const handleEditCatalogProduct = (p: Product) => {
    setProductsRegistry((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const handleDeleteCatalogProduct = (id: string) => {
    setProductsRegistry((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateOrderStatusMilestone = (orderId: string, status: any) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: status };
        }
        return ord;
      })
    );
  };

  // Cart financial aggregates calculation
  const subtotal = cartItems.reduce((acc, item) => {
    const unitPrice = item.product ? item.product.price : (item.customFrame ? item.customFrame.price : 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountVal = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.minSpend && subtotal < appliedCoupon.minSpend) return 0;
    
    if (appliedCoupon.discountType === 'percentage') {
      return (subtotal * appliedCoupon.value) / 100;
    } else {
      return appliedCoupon.value;
    }
  })();

  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountVal + shippingCost);

  return (
    <div className="min-h-screen bg-sand-50 text-charcoal-900 selection:bg-gold-200 selection:text-gold-900" id="main-layout-root">
      
      {/* Universal Luxury Navbar Header */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
      />

      {/* Main Container Stage */}
      <main className="transition-opacity duration-300">
        {currentView === 'home' && (
          <HomeView 
            setCurrentView={setCurrentView} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}

        {currentView === 'shop' && (
          <ShopView 
            products={productsRegistry} 
            currentSelectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            onProductSelect={handleProductSelect} 
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailView 
            product={selectedProduct} 
            onBackToShop={() => setCurrentView('shop')} 
            onAddToCart={handleAddToCart} 
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'customizer' && (
          <CustomizerView 
            onAddToCart={handleAddToCart} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'cart' && (
          <CartView 
            cartItems={cartItems} 
            onUpdateQuantity={handleUpdateCartQuantity} 
            onRemoveItem={handleRemoveCartItem} 
            setCurrentView={setCurrentView} 
            appliedCoupon={appliedCoupon} 
            setAppliedCoupon={setAppliedCoupon} 
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView 
            cartItems={cartItems} 
            subtotal={subtotal} 
            discount={discountVal} 
            shipping={shippingCost} 
            total={grandTotal} 
            appliedCoupon={appliedCoupon} 
            onClearCart={handleClearCart} 
            onAddOrder={handleAddOrder} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'profile' && (
          <UserOrdersView 
            orders={orders} 
            wishlist={wishlist} 
            products={productsRegistry} 
            toggleWishlist={toggleWishlist} 
            onProductSelect={handleProductSelect} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            products={productsRegistry} 
            orders={orders} 
            onAddProduct={handleAddCatalogProduct} 
            onEditProduct={handleEditCatalogProduct} 
            onDeleteProduct={handleDeleteCatalogProduct} 
            onUpdateOrderStatus={handleUpdateOrderStatusMilestone} 
          />
        )}
      </main>

    </div>
  );
}
