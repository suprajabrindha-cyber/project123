import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, Star, Award, Shield, Truck, 
  ChevronRight, CloudRain, Sun, Calendar, Thermometer, 
  Droplet, Wind, MapPin, CheckCircle2, User, BookOpen, Quote
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { CUSTOMER_SHOWCASE } from '../data/products';

interface HomeViewProps {
  setCurrentView: (view: any) => void;
  setSelectedCategory: (cat: any) => void;
}

export default function HomeView({ setCurrentView, setSelectedCategory }: HomeViewProps) {
  // Weather state (simulated dynamic tracker for our main farm hubs)
  const [selectedFarmHub, setSelectedFarmHub] = useState<'Ratnagiri' | 'Shimla' | 'Ooty'>('Ratnagiri');
  const [ambientTemp, setAmbientTemp] = useState(31);
  const [soilMoisture, setSoilMoisture] = useState(68);
  const [weatherCondition, setWeatherCondition] = useState('Sunny Dew');

  useEffect(() => {
    if (selectedFarmHub === 'Ratnagiri') {
      setAmbientTemp(32);
      setSoilMoisture(72);
      setWeatherCondition('Coastal Sunshine');
    } else if (selectedFarmHub === 'Shimla') {
      setAmbientTemp(19);
      setSoilMoisture(54);
      setWeatherCondition('Glacial Breeze');
    } else {
      setAmbientTemp(23);
      setSoilMoisture(81);
      setWeatherCondition('Misty Showers');
    }
  }, [selectedFarmHub]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('shop');
  };

  const farmBlogPosts = [
    {
      title: 'Deciphering Soil pH and Organic Carbon',
      summary: 'Learn how compost loading transforms chalky alkaline sand into sweet loam suited for crimson tomatoes.',
      category: 'Soil Science',
      date: 'June 12, 2026',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=400'
    },
    {
      title: 'Drip Irrigation: Hydration with 60% Water Saving',
      summary: 'A complete blueprint to laying sub-surface micro drip tubes directly beneath root zones to avoid evaporation loss.',
      category: 'Smart Farming',
      date: 'May 28, 2026',
      readTime: '7 min read',
      img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=400'
    },
    {
      title: 'Ancillary Companion Planting Secrets',
      summary: 'Why growing marigolds, garlic, and wild coriander bordering your carrots keeps root flies and aphids away naturally.',
      category: 'Pest Control',
      date: 'May 04, 2026',
      readTime: '4 min read',
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400'
    }
  ];

  return (
    <div className="space-y-24 pb-16 bg-sand-50" id="home-view-wrapper">
      
      {/* 1. HERO SECTION: Agricultural Drone Shot & Fresh Produce Overlay */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" id="hero-section">
        {/* Farm Aerial Background Picture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop" 
            alt="Scenic organic green farmland landscape" 
            className="w-full h-full object-cover opacity-85 scale-102"
          />
          {/* Natural Gradient Dark Shading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/65 to-charcoal-950/40" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 w-full sm:px-6 lg:px-8 text-left text-white space-y-8 py-20">
          <div className="space-y-4 max-w-3xl">
            {/* Eco subtitle */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-600/30 border border-emerald-400/40 px-4 py-1.5 backdrop-blur-md text-emerald-300">
              <Sparkles className="h-4 w-4 animate-spin-slow" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                100% Certified Sustainable Agriculture
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-none text-white">
              Cultivating Trust, <br />
              <span className="font-serif font-normal italic text-emerald-300">Harvesting Pure Freshness</span>
            </h1>

            <p className="text-sm sm:text-lg text-sand-150 font-light max-w-2xl leading-relaxed">
              We connect you directly to India’s finest regional family orchards and soil guardians. Experience Alphonso mangoes, unwaxed Shimla apples, and stone-ground Vedic ghee, harvested specifically on your command.
            </p>
          </div>

          {/* Premium Farming Actions */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 max-w-xl">
            <button 
              onClick={() => setCurrentView('shop')}
              className="px-8 py-4.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold tracking-widest uppercase rounded-sm shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              id="hero-btn-shop"
            >
              <span>Explore Fresh Market</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setCurrentView('customizer')}
              className="px-8 py-4.5 bg-transparent border border-white/40 hover:border-white hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
              id="hero-btn-customizer"
            >
              <span>Build Bespoke Harvest Box</span>
            </button>
          </div>

          {/* Living Interactive Live Weather / Soil Metrics Tracker */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl" id="farm-live-widget">
            <div className="bg-charcoal-900/40 backdrop-blur-md rounded-md p-4 border border-white/5 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Ambient Active Station</span>
              <div className="flex items-center space-x-1.5">
                <MapPin className="h-4.5 w-4.5 text-emerald-300" />
                <select 
                  className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer text-white" 
                  value={selectedFarmHub}
                  onChange={(e) => setSelectedFarmHub(e.target.value as any)}
                >
                  <option value="Ratnagiri" className="bg-charcoal-900 text-white">Ratnagiri Coastal Groves</option>
                  <option value="Shimla" className="bg-charcoal-900 text-white">Shimla Alpine Terraces</option>
                  <option value="Ooty" className="bg-charcoal-900 text-white">Ooty Hydro-Sands</option>
                </select>
              </div>
            </div>
            <div className="bg-charcoal-900/40 backdrop-blur-md rounded-md p-4 border border-white/5 space-y-1">
              <span className="text-[10px] text-sand-300 uppercase tracking-widest block font-medium">Temperature</span>
              <div className="flex items-center space-x-2 text-white">
                <Thermometer className="h-5 w-5 text-amber-400" />
                <p className="text-lg font-bold font-mono">{ambientTemp}°C</p>
              </div>
            </div>
            <div className="bg-charcoal-900/40 backdrop-blur-md rounded-md p-4 border border-white/5 space-y-1">
              <span className="text-[10px] text-sand-300 uppercase tracking-widest block font-medium">Sub-Soil Moisture</span>
              <div className="flex items-center space-x-2 text-white">
                <Droplet className="h-5 w-5 text-sky-400" />
                <p className="text-lg font-bold font-mono">{soilMoisture}% Hydrated</p>
              </div>
            </div>
            <div className="bg-charcoal-900/40 backdrop-blur-md rounded-md p-4 border border-white/5 space-y-1">
              <span className="text-[10px] text-sand-300 uppercase tracking-widest block font-medium">Climate Feed</span>
              <div className="flex items-center space-x-2 text-white">
                <Sun className="h-5 w-5 text-gold-400" />
                <p className="text-sm font-semibold truncate text-emerald-200">{weatherCondition}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SHOP BY CATEGORY: Quick triggers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10" id="category-section">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-700 uppercase block">Harvest Categories</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900">
              Browse <span className="italic font-normal">Our Fresh Fields</span>
            </h2>
          </div>
          <p className="text-xs text-charcoal-400 max-w-md font-light leading-relaxed">
            Choose from soil-derived pesticide-free vegetables, sun-sweetened seasonal organic fruits, non-GMO ancient seeds, granular Vedic nutrition jars, or pro agricultural instruments.
          </p>
        </div>

        {/* 5 column category items cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 'Fruits', label: 'Orchard Fruits', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400', count: 'Mango, Apple, Citrus' },
            { id: 'Vegetables', label: 'Earthy Vegetables', img: 'https://images.unsplash.com/photo-1595855759920-865823967d12?q=80&w=400', count: 'Vine Tomato, Carrot' },
            { id: 'Seeds', label: 'Heritage Seeds', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400', count: 'Open Pollinated' },
            { id: 'Organic', label: 'Vedic Nutrition', img: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?q=80&w=400', count: 'Copper Bilona Ghee' },
            { id: 'Equipment', label: 'Precision Tools', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400', count: 'Agri Sensors & shears' },
          ].map((cat, idx) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategorySelect(cat.id as any)}
              className="group relative h-80 rounded-md overflow-hidden bg-emerald-50 border border-sand-250 cursor-pointer shadow-xs"
              id={`cat-card-${cat.id}`}
            >
              <img 
                src={cat.img} 
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/30 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end h-full">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-300">Category 0{idx + 1}</span>
                <h3 className="font-serif text-lg font-medium leading-tight mt-1 text-white group-hover:text-emerald-300 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[10px] text-sand-300 font-light mt-1">{cat.count}</p>
                <div className="mt-3 flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Shop Market</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FARMS: Interactive Map/Region Showcase */}
      <section className="bg-emerald-900 text-white py-20" id="featured-farms-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-300 uppercase">Sustainable Heritage</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
              Featured <span className="italic font-normal">Organic Farmlands</span>
            </h2>
            <p className="text-xs text-emerald-100 font-light">
              We certify and coordinate logistics directly with multi-generational family estates where farming is treated as sacred guardianship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ratnagiri Shore Mango Groves',
                location: 'Maharashtra Coastline',
                soil: 'Deep Volcanic Basalt, sea breezy loam',
                water: 'Subsoil saltwater barrier springs',
                specialty: 'Ratnagiri Saffron Alphonso',
                img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600'
              },
              {
                name: 'Himalayan Snowy Orchard Terraces',
                location: 'Shimla Slopes, 7,800 ft',
                soil: 'Rich mineral glacial sediment mud',
                water: 'Natural high peak snowmelt flows',
                specialty: 'Royal Delicious unwaxed apples',
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600'
              },
              {
                name: 'Anamalai Eco Vermi-Beds',
                location: 'Ooty Foothills, Tamil Nadu',
                soil: 'Black loam rich in nitrogen humus',
                water: 'Precision subsoil smart micro-drip',
                specialty: 'Vine-Ripened cluster vegetables',
                img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600'
              }
            ].map((farm, idx) => (
              <div 
                key={idx}
                className="bg-charcoal-900/35 border border-white/10 rounded-md overflow-hidden hover:border-emerald-400/40 transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] w-full relative">
                  <img src={farm.img} alt={farm.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-emerald-600 font-bold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-sm">
                    {farm.location}
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-medium tracking-tight text-white">{farm.name}</h3>
                    <p className="text-xs text-emerald-200">Main produce: <strong className="text-white">{farm.specialty}</strong></p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10 text-xs text-sand-300 font-light space-y-1.5">
                    <p>🌱 <strong>Soil Mix:</strong> {farm.soil}</p>
                    <p>💧 <strong>Irrigation:</strong> {farm.water}</p>
                  </div>
                  
                  <button 
                    onClick={() => setCurrentView('shop')}
                    className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold uppercase tracking-widest rounded-sm transition-all text-white"
                  >
                    View Harvest Market
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FRESH HARVEST CALENDAR SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="harvest-calendar-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1.5 text-emerald-700">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase">Living Harvest Index</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
              Honoring Nature's <br />
              <span className="italic font-normal">Seasonal Rhythms</span>
            </h2>

            <p className="text-sm text-charcoal-700 font-light leading-relaxed">
              We never force-grow crops off-season using heavy hormones or greenhouse artificial feeding. Below is our dynamic, active harvest schedule detailing which crops are flourishing this month.
            </p>

            <div className="divide-y divide-sand-200 font-light text-xs text-charcoal-800">
              <div className="py-3 flex justify-between">
                <span>🍉 <strong>Spring Peak:</strong> Watermelons, Sugarcane juice</span>
                <span className="text-emerald-700 font-bold">Completed</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>🥭 <strong>Summer Peak:</strong> Alphonso Mangoes, Sweet Lemons</span>
                <span className="text-amber-600 font-bold flex items-center space-x-1">
                  <span>● Active harvesting</span>
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span>🍎 <strong>Autumn Peak:</strong> Shimla Orchard Apples, Sweet Pears</span>
                <span className="text-emerald-700 font-medium">Coming next</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>🥕 <strong>All-Weather Roots:</strong> Heirloom Carrots, Plum Tomatoes</span>
                <span className="text-emerald-700 font-bold">Standard Available</span>
              </div>
            </div>

            <button 
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3.5 bg-charcoal-900 text-emerald-300 hover:text-white hover:bg-charcoal-850 text-xs font-bold tracking-widest uppercase rounded-sm cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Buy Fresh Season Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="lg:col-span-7">
            <BeforeAfterSlider />
            <p className="text-center text-[10px] text-charcoal-500 font-mono tracking-widest mt-3 uppercase">
              ↔ Slide to view how unyielding dry dirt transforms into deep-rooted soil biology
            </p>
          </div>
        </div>
      </section>

      {/* 5. MEET OUR FARMERS: Human Connection & Sustainability */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="farmers-section">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-700 uppercase">The Soil Keepers</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900">
            Meet <span className="italic font-normal">Our Farmers</span>
          </h2>
          <p className="text-xs text-charcoal-405 max-w-lg mx-auto font-light">
            We bypass middlemen, offering direct-to-bank premium prices to our growers. Your orders support honest, sustainable living wages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Subramanian Swaminathan',
              role: 'Ratnagiri Orchard Head',
              experience: '35 Years Guarding Mango Trees',
              quote: 'My father planted these Alphonso mango trees on basalt rock. Each generation, we load copper bio-mix to feed their deep taproots naturally.',
              img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=400&fit=crop'
            },
            {
              name: 'Devika Singhania',
              role: 'Shimla Alpine terrace Head',
              experience: '22 Years of Himalayan Orchard Husbandry',
              quote: 'Our apple trees sleep beneath thick mountain fog in winter. When spring melts alpine waters, our unpolished Royal Delicious are hand-chosen.',
              img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&fit=crop'
            },
            {
              name: 'Santhosh Gowda',
              role: 'Mandya Dry-Grain Conserver',
              experience: 'Founder of regional Indigenous Seeds Forum',
              quote: 'These finger millets do not ask for costly chemical packets or endless water pumps. Native seeds are built to grow in absolute harmony with local rain.',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop'
            }
          ].map((farmer, idx) => (
            <div 
              key={idx}
              className="bg-white border border-sand-200 rounded-md p-6 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-emerald-500">
                    <img src={farmer.img} alt={farmer.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-charcoal-905">{farmer.name}</h4>
                    <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-wider">{farmer.role}</p>
                    <p className="text-[10px] text-charcoal-405 font-mono">{farmer.experience}</p>
                  </div>
                </div>
                
                <p className="font-serif text-xs italic text-charcoal-700 leading-relaxed pt-2">
                  "{farmer.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand-100 flex justify-between items-center text-[10px] text-emerald-600 font-bold tracking-widest uppercase">
                <span>Verified Grower</span>
                <span>Verified Organic ✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FARM TO TABLE PROCESS TIMELINE */}
      <section className="bg-sand-100 border-y border-sand-200 py-20" id="process-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-emerald-700 uppercase">The Soil-to-Plate Path</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900">
              The Farm-to-Table <span className="italic font-normal">Timeline</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { title: '1. Day Sunrise Pluck', desc: 'Farmers examine density, color, and stem dew. Crop plucked with wood scissors at cool sunrise temperatures to stop sugar damage.' },
              { title: '2. Ozone Cold Wash', desc: 'Washed in mild, chemical-free ozone water to clear mud while preserving the natural bio-active protective skin layers.' },
              { title: '3. Fresh-Lock Cold Pack', desc: 'Crops loaded inside cardboard mesh boxes, maintaining 14°C to preserve vital micro-enzymes and natural moisture.' },
              { title: '4. Direct Home Delivery', desc: 'Fast flight / cold container transit. Arrives at your home raw, unwaxed, sweet, and bursting with high mineral nutrition.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-md border border-sand-250 relative space-y-3">
                <span className="absolute -top-4 -left-2 bg-emerald-600 text-white font-mono font-bold text-xs h-8 w-8 rounded-full flex items-center justify-center border-2 border-sand-100">
                  {idx + 1}
                </span>
                <h4 className="font-serif text-base font-bold text-charcoal-900 pt-2">{step.title}</h4>
                <p className="text-xs text-charcoal-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VALUE PILLARS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="values-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-sand-200">
          
          <div className="flex items-start space-x-4 p-4">
            <div className="h-12 w-12 rounded-sm border border-emerald-600/30 bg-emerald-50 flex items-center justify-center shrink-0">
              <Award className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-medium tracking-tight text-charcoal-900">100% Pesticide Free</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-light">
                We integrate natural neem sprays, beneficial helper bugs, and rock dust fertilizing to keep trace elements pure and toxic chemicals out.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4">
            <div className="h-12 w-12 rounded-sm border border-emerald-600/30 bg-emerald-50 flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-medium tracking-tight text-charcoal-900">Heritage Open Pollinated</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-light">
                Our seed catalogs are open-pollinated, genetically unedited varieties. Keep and dry your harvest seeds to grow beautiful crops next year too!
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4">
            <div className="h-12 w-12 rounded-sm border border-emerald-600/30 bg-emerald-50 flex items-center justify-center shrink-0">
              <Truck className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-medium tracking-tight text-charcoal-900">Cold Chain Fresh Lock</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-light">
                We track transit thermal states, shipping via active air and ventilated mesh crates to completely stop mold and thermal rot.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="reviews-section">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-700 uppercase">AESTHETIC LIVING STORIES</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900">
            Fresh <span className="italic font-normal">Market Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_SHOWCASE.map((story, idx) => (
            <div 
              key={idx}
              className="flex flex-col bg-white rounded-md overflow-hidden border border-sand-200 shadow-xs group"
              id={`story-card-${idx}`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-sand-100 relative">
                <img 
                  src={story.imageUrl} 
                  alt={story.customer} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute top-4 left-4 rounded-md bg-charcoal-950/70 border border-emerald-500/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-xs">
                  {story.tag}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="flex space-x-1.5 text-emerald-600 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-500" />
                  ))}
                </div>

                <p className="font-serif text-sm italic text-charcoal-800 leading-relaxed">
                  "{story.quote}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-sand-100 text-xs text-charcoal-800">
                  <span className="font-semibold">{story.customer}</span>
                  <span className="text-charcoal-400 font-light">{story.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. BLOG AND FARMING TIPS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="blog-section">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-700 uppercase">Knowledge Center</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-charcoal-900">
            Farming <span className="italic font-normal">Tips & Field Notes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {farmBlogPosts.map((post, idx) => (
            <div key={idx} className="bg-white border border-sand-200 rounded-md overflow-hidden flex flex-col justify-between">
              <div>
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 space-y-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2 py-1 rounded-sm">
                    {post.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-charcoal-905">{post.title}</h4>
                  <p className="text-xs text-charcoal-400 font-light leading-relaxed">{post.summary}</p>
                </div>
              </div>
              
              <div className="px-6 pb-6 pt-3 border-t border-sand-100 flex justify-between items-center text-[10px] text-charcoal-405">
                <span>{post.date}</span>
                <span className="font-semibold text-emerald-700">{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ELITE OUTREACH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="concierge-section">
        <div className="rounded-lg bg-emerald-950 p-8 sm:p-14 text-center text-white relative overflow-hidden border border-emerald-500/20">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-400 uppercase">Agronomist Consultation</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-none text-white">
              Planning a <span className="italic font-normal">Commercial Farm?</span>
            </h2>
            <p className="text-sm text-emerald-100 font-light leading-relaxed">
              Connect directly with our head agricultural researcher on WhatsApp. Get help checking municipal soil reports, selecting drip lines, or structuring bulk crop purchase contracts.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%2520organic%20farming%2520advisory%20services%20and%2520coordinating%2520bulk%20produce." 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center space-x-2"
                id="btn-whatsapp-concierge"
              >
                <span>Direct WhatsApp Agronomist</span>
              </a>
              <button 
                onClick={() => setCurrentView('customizer')}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm"
              >
                Assemble Custom Crate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footnote details */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 border-t border-sand-300 text-xs text-charcoal-450" id="footer-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌱</span>
              <span className="font-serif text-base font-bold tracking-widest text-charcoal-900 uppercase">HARVEST ORGANICS</span>
            </div>
            <p className="font-light leading-relaxed">
              Handpacked directly in high-altitude orchards and coastal volcanic farms. Restoring soil biology through open-pollinated heirloom seeds, vermicompost, and direct trade.
            </p>
            <p className="font-mono text-[10px] text-coal-400">
              Harvest Organics © 2026. All rights reserved.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-charcoal-900 uppercase tracking-widest text-xs">The Station Hubs</h4>
            <ul className="space-y-2 font-light">
              <li><span className="text-charcoal-900">Ratnagiri Grove:</span> Bhandarpule Shore Road, 415612 Maharashtra, India</li>
              <li><span className="text-charcoal-900">Shimla Orchards:</span> Near Kufri Terrace plots, Himachal Pradesh, India</li>
              <li><span className="text-charcoal-950">Soil Assistance:</span> agronomist@harvestorganics.com</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-charcoal-900 uppercase tracking-widest text-xs">Fresh Categories</h4>
            <ul className="space-y-2 font-light">
              <li><button onClick={() => handleCategorySelect('Fruits')} className="hover:text-emerald-700 block text-left cursor-pointer">Sun-Ripened Fruits</button></li>
              <li><button onClick={() => handleCategorySelect('Vegetables')} className="hover:text-emerald-700 block text-left cursor-pointer">Pesticide-Free Vegetables</button></li>
              <li><button onClick={() => handleCategorySelect('Seeds')} className="hover:text-emerald-700 block text-left cursor-pointer">High-Germination open seeds</button></li>
              <li><button onClick={() => handleCategorySelect('Organic')} className="hover:text-emerald-700 block text-left cursor-pointer">Stone-Ground Vedic Oils & Ghee</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-charcoal-900 uppercase tracking-widest text-xs">Purity Guarantee</h4>
            <p className="font-light leading-relaxed">
              All harvest deliveries are packed inside thermo-regulated fresh-lock cargo. We replace any damaged tomatoes or bruised peaches free of charge within 24 hours. No receipts required.
            </p>
            <div className="flex space-x-3 text-lg pt-1">
              <span>🥭</span>
              <span>🥕</span>
              <span>🌾</span>
              <span>🚜</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
