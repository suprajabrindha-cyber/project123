import { Product } from '../types';

export const LUXURY_PRODUCTS: Product[] = [
  {
    id: 'alphonso-mango',
    name: 'Ratnagiri Alphonso Mangoes',
    description: 'The undisputed "King of Mangoes", hand-plucked from our sun-washed coastal groves in Ratnagiri.',
    longDescription: 'Nurtured in late spring along the volcanic seaside soils of Maharashtra, our premium Alphonso mangoes are renowned for their non-fibrous saffron pulp, creamy texture, and unmatched sweet aroma. Every single mango undergoes a rigorous hand-selection process for sizing and color, then is naturally ripened in organic straw beds. Delivered in our custom ventilated heritage craft boxes.',
    price: 32,
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Fruits',
    style: 'Seasonal Fresh',
    rating: 4.9,
    stock: 45,
    materials: ['Organic'],
    materialDetails: [
      {
        name: 'Globally Certified Organic',
        description: '100% synthetic-fertilizer-free cultivation with natural rock dust and compost.',
        finish: 'Naturally Ripened in Straw'
      }
    ],
    sizes: [
      { label: '1 Dozen Box (12 pcs)', width: 3, height: 4, multiplier: 1.0 },
      { label: '2 Dozen Shared Box', width: 6, height: 8, multiplier: 1.8 },
      { label: '5 Dozen Banquet Crate', width: 12, height: 16, multiplier: 4.2 }
    ],
    colors: [
      { name: 'Saffron Rich Gold', hex: '#ffc000', priceAdjustment: 0 },
      { name: 'Emerald Hint Selections', hex: '#6b8e23', priceAdjustment: -2 }
    ],
    specifications: {
      'Harvest Region': 'Ratnagiri, Maharashtra, India',
      'Farming Method': 'Natural Vedic Agriculture',
      'Pesticide State': 'Zero chemical spray guarantee',
      'Ripening Process': 'Acoustic straw beds (ethylene-free)',
      'Packaging': 'Recyclable natural paper mesh'
    },
    featured: true,
    bestSeller: true,
    reviews: [
      {
        id: 'rev-mango-1',
        userName: 'Ananya Deshmukh',
        userEmail: 'ananya.d@mumbai.in',
        rating: 5,
        comment: 'Unbelievable aroma! The moment we slid open the crate, the entire living room smelled like summer. Super juicy and absolutely no fibers.',
        date: '2026-05-12',
        isVerified: true
      },
      {
        id: 'rev-mango-2',
        userName: 'Rajesh Patel',
        userEmail: 'rajesh.p@organicfoods.com',
        rating: 5,
        comment: 'Most Alfonso ordered online are chemically ripened and taste sour inside. These ones are genuinely naturally ripened. Absolute top tier!',
        date: '2026-06-02',
        isVerified: true
      }
    ]
  },
  {
    id: 'shimla-apple',
    name: 'Shimla Royal Delicious Red Apples',
    description: 'Crisp, high-altitude cold-climate apples from our heritage orchards in Himachal Pradesh.',
    longDescription: 'Grown at over 7,500 feet elevation on the snowy hills of Shimla, these magnificent Royal Delicious apples thrive on pure glacial runoffs and crisp Himalayan breezes. Hand-harvested during late morning to protect their natural waxy shield, they provide an incredibly juicy crunch with standard sweet mineral undertones. Packed raw, unpolished, and completely free of artificial industrial wax coatings.',
    price: 18,
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Fruits',
    style: 'High-Altitude Cold Crop',
    rating: 4.8,
    stock: 120,
    materials: ['Organic', 'Heirloom'],
    materialDetails: [
      {
        name: 'Glacial Orchard Sourced',
        description: 'Sustainable hill terrace farming, watered solely by snowmelt streams.',
        finish: 'Strictly Raw & Unwaxed'
      }
    ],
    sizes: [
      { label: '2 Kg Trial Pack', width: 2, height: 2, multiplier: 1.0 },
      { label: '5 Kg Family Basket', width: 5, height: 5, multiplier: 2.3 },
      { label: '10 Kg Pantry Box', width: 10, height: 10, multiplier: 4.2 }
    ],
    colors: [
      { name: 'Ruby Stripe Delicious', hex: '#8b0000', priceAdjustment: 0 },
      { name: 'Golden Glow Delicious', hex: '#ffd700', priceAdjustment: 2 }
    ],
    specifications: {
      'Orchard Elevation': '7,800 feet (Himalayan Range)',
      'Harvesting Season': 'Early Autumn selection',
      'Storage life': 'Up to 21 days in normal ventilation',
      'Treatment': 'Mild neem-oil cold spray seeping'
    },
    featured: true,
    reviews: [
      {
        id: 'rev-apple-1',
        userName: 'Siddharth Iyer',
        userEmail: 'sid.iyer@techleads.org',
        rating: 5,
        comment: 'So sweet and crisp. Unlike the ones in mainstream supermarkets which feel mushy and coated in thick wax, these have a delightful earthy crunch.',
        date: '2026-05-28',
        isVerified: true
      }
    ]
  },
  {
    id: 'vine-tomato',
    name: 'Organic Vine-Ripened Plum Tomatoes',
    description: 'Juicy, bright red cherry-plum tomatoes harvested directly on their lush green vines for premium freshness.',
    longDescription: 'Nurtured inside geothermal climate-controlled shade-nets, these plum tomatoes draw minerals directly from a pristine sand-soil bed integrated with bio-fertilizers. Because they are harvested on-the-vine, they continue maturing during transit, arriving at your kitchen with maximum lycopene content, robust firm texture, and a spectacular herbaceous tang.',
    price: 12,
    images: [
      'https://images.unsplash.com/photo-1595855759920-865823967d12?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Vegetables',
    style: 'Hydro-Sandy Greenhouse',
    rating: 4.7,
    stock: 200,
    materials: ['Non-GMO', 'Organic'],
    materialDetails: [
      {
        name: 'Direct Root Compost Feed',
        description: 'Moistened using slow drip lines and rich earthworm vermicompost slurry.',
        finish: '100% Pesticide-Free Vine'
      }
    ],
    sizes: [
      { label: '1 Kg Punnet', width: 1, height: 1, multiplier: 1.0 },
      { label: '3 Kg Batch Tray', width: 3, height: 3, multiplier: 2.7 },
      { label: '5 Kg Kitchen Supply Crate', width: 5, height: 5, multiplier: 4.2 }
    ],
    colors: [
      { name: 'Deep Crimson Red', hex: '#d11a2a', priceAdjustment: 0 },
      { name: 'Sunburst Crimson Orange', hex: '#e9692c', priceAdjustment: 0 }
    ],
    specifications: {
      'Greenhouse Location': 'Ooty Hills, Tamil Nadu',
      'Pest Control': 'Bio-predator integration (no toxic chemicals)',
      'Water System': 'Subsoil smart micro-drip flow',
      'Brix sweetness': '6.8 Index guarantee'
    },
    featured: false,
    bestSeller: true,
    reviews: [
      {
        id: 'rev-tomato-1',
        userName: 'Meera Krishnan',
        userEmail: 'meera@gourmetchef.in',
        rating: 5,
        comment: 'These are the only tomatoes that make my marinara sauce taste rich and thick without adding canned paste. The green vine smell is incredibly fresh!',
        date: '2026-06-11',
        isVerified: true
      }
    ]
  },
  {
    id: 'heritage-carrot',
    name: 'Dharmapuri Heirloom Orange Carrots',
    description: 'Sweet, fibrous purple-orange carrots harvested under rich loamy sub-soil beds.',
    longDescription: 'Cultivated from local native seed varieties conserved across generations in Dharmapuri, these carrots possess a stunningly deep orange core filled with beta-carotene. They are harvested at sunrise when the soil temperature is lowest, keeping their natural sugars locked inside. We wash them with purified ozone water to clear soil mud while keeping their delicate sweet skin intact.',
    price: 10,
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444312645910-ffa97365665d?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Vegetables',
    style: 'Deep Loam Cultivated',
    rating: 4.9,
    stock: 150,
    materials: ['Heirloom', 'Organic'],
    materialDetails: [
      {
        name: 'A-Grade Loam Heartwood',
        description: 'Tilled deeply in sand-clay mixed compost blocks, allowing roots to dive straight.',
        finish: 'Mild Ozone Triple Washed'
      }
    ],
    sizes: [
      { label: '1 Kg Sand-Free Pack', width: 1, height: 1, multiplier: 1.0 },
      { label: '3 Kg Juicing Crate', width: 3, height: 3, multiplier: 2.8 },
      { label: '5 Kg Feast Basket', width: 5, height: 5, multiplier: 4.3 }
    ],
    colors: [
      { name: 'Classic Soil Orange', hex: '#ed872d', priceAdjustment: 0 },
      { name: 'Heirloom Velvet Red-Purple', hex: '#5e2f3d', priceAdjustment: 2 }
    ],
    specifications: {
      'Soil Profile': 'Sandy loam high-drainage compost block',
      'Average size': '6 to 8 inches length',
      'Nutritional focus': 'Extra high beta-carotene content',
      'Washing state': 'Ozone washed, ready for salads'
    },
    featured: true,
    reviews: [
      {
        id: 'rev-carrot-1',
        userName: 'Beatrice Duzza',
        userEmail: 'beatrice@salads.com',
        rating: 5,
        comment: 'So sweet! My children just eat them raw like fruit. The heirloom red variety is intensely sweet and wonderful for dynamic juicing.',
        date: '2026-04-18',
        isVerified: true
      }
    ]
  },
  {
    id: 'bilova-cow-ghee',
    name: 'A2 Vedic Bilona Grass-Fed Ghee',
    description: 'Slow-cooked organic butter ghee prepared from free-grazing Indian Gir cows using the ancient bilona method.',
    longDescription: 'This liquid gold is prepared meticulously from pure A2 milk curd. We churn the biological curd clockwise and counter-clockwise using wood hand-stirrers (Bilona) to produce butter. The butter is then slow-boiled over charcoal wood fire in handmade copper cauldrons at 118 degrees Celsius, producing a granular, intensely fragrant, nutty ghee with ultimate healing bio-properties.',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a40?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Organic',
    style: 'Ancient Vedic Recipe',
    rating: 5.0,
    stock: 35,
    materials: ['Premium', 'Organic'],
    materialDetails: [
      {
        name: 'A2 Gir Breed Milked',
        description: 'Grazed on organic clover, lemon grass, and holy tulsi fields.',
        finish: 'Slow Copper-Boined Granite-Cooked'
      }
    ],
    sizes: [
      { label: '500 ml Glass Jar', width: 1, height: 1, multiplier: 1.0 },
      { label: '1 Litre Glass Jar', width: 2, height: 2, multiplier: 1.85 },
      { label: '2.5 Litre Feast Tin', width: 5, height: 5, multiplier: 4.4 }
    ],
    colors: [
      { name: 'Granular Golden Yellow', hex: '#ffd300', priceAdjustment: 0 },
      { name: 'Medicinal Herb-Infused', hex: '#ca9e33', priceAdjustment: 8 }
    ],
    specifications: {
      'Source Cow Breed': 'Gir Cattle (Bos Indicus)',
      'Method Quality': 'Curd-derived (no milk-fat separation used)',
      'Boiling Vessel': 'Pure virgin red copper double cauldrons',
      'Acidity index': '0.24% Ultra low acid value'
    },
    featured: true,
    bestSeller: true,
    reviews: [
      {
        id: 'rev-ghee-1',
        userName: 'Achyuta Acharya',
        userEmail: 'achyuta@vedicastrology.org',
        rating: 5,
        comment: 'This is authentic ghee like my grandmother used to prepare over cow-dung hearths in our village. The granular structure and heavy aroma are divine.',
        date: '2026-06-01',
        isVerified: true
      }
    ]
  },
  {
    id: 'field-soil-meter',
    name: 'Direct Agri-Tech Smart Moisture & pH Meter',
    description: 'Instant, battery-free dual-probe sensor to optimize irrigation levels and fertilizer absorption.',
    longDescription: 'Achieve scientific precision on your home farm or vegetable garden. Our heavy-duty dual probe utilizes advanced metallic galvanic cells to detect subsoil hydration and active hydrogen-ion (pH) potential in less than 10 seconds. Helps you stop root-rot, check nitrogen washouts, and know when to apply water.',
    price: 36,
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Equipment',
    style: 'Precision Farming tech',
    rating: 4.7,
    stock: 50,
    materials: ['Premium'],
    materialDetails: [
      {
        name: 'Aircraft-Grade Copper-Alloy Probes',
        description: 'Robust, rust-proof copper & aluminum dual pins for high conduction accuracy.',
        finish: 'Waterproof Mechanical Dial Display'
      }
    ],
    sizes: [
      { label: 'Standard 8" Dual Probe Meter', width: 2, height: 8, multiplier: 1.0 },
      { label: 'Extended 12" Deep-Root Soil Meter', width: 3, height: 12, multiplier: 1.4 }
    ],
    colors: [
      { name: 'Forest Field Green', hex: '#224d17', priceAdjustment: 0 },
      { name: 'High-Visibility Neon Orange', hex: '#ff5f1f', priceAdjustment: 3 }
    ],
    specifications: {
      'Probe Length': '8.2 inches copper-aluminum alloy',
      'Power Source': 'No Battery (Ambient galvanic current induced)',
      'Moisture Range': '1 to 10 (Dry to Wet scale)',
      'Subsoil pH Range': '3.5 to 8.0 (Acidic to Alkaline scale)'
    },
    bestSeller: true,
    reviews: [
      {
        id: 'rev-meter-1',
        userName: 'Farmer Murugan',
        userEmail: 'murugan@agricorp.co.in',
        rating: 5,
        comment: 'Very handy tool. I use it to check my chili beds every morning before starting the drip lines. Stopped my overwatering issues completely!',
        date: '2026-05-15',
        isVerified: true
      }
    ]
  },
  {
    id: 'organic-millet-seeds',
    name: 'Heritage Finger Millet (Ragi) Seeds',
    description: '100% natural organic pearl-finger millet seeds for high-yield grain farming.',
    longDescription: 'Nurtured organically by local seed conservers in the dry plains of Karnataka, this indigenous Finger Millet variety is highly resilient to dry weather, requiring 50% less water than polished grain crops. Offers superb germinating vigor, generating massive rich ears packed with trace minerals, calcium, and dietary dietary fiber under minimal rain soil.',
    price: 15,
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'Seeds',
    style: 'Drought Resilient Grains',
    rating: 4.8,
    stock: 90,
    materials: ['Heirloom', 'Non-GMO'],
    materialDetails: [
      {
        name: 'Native Drought-Proof Specimen',
        description: 'Genetically unedited, open-pollinated seeds naturally hardened on sun-baked fields.',
        finish: 'Eco-Grade Airtight Seed-Seal'
      }
    ],
    sizes: [
      { label: '1,000 Seeds Pack (Starter)', width: 1, height: 1, multiplier: 1.0 },
      { label: '5,000 Seeds Crop Box', width: 2, height: 5, multiplier: 2.8 },
      { label: '25,000 Seeds Master Farmer Crate', width: 5, height: 25, multiplier: 9.5 }
    ],
    colors: [
      { name: 'Crimson Brown Ragi', hex: '#63442d', priceAdjustment: 0 },
      { name: 'Kodo Pearl Millet Grey', hex: '#bc9c80', priceAdjustment: 0 }
    ],
    specifications: {
      'Germination Rate': '94% or above under ideal moisture',
      'Maturation Timeline': '110 to 125 days from seed germination',
      'Soil Compatibility': 'Red soil, clay, and dry gravelly soils',
      'Recommended Depth': '0.5 to 1.0 inches deep tilling'
    },
    reviews: [
      {
        id: 'rev-seed-1',
        userName: 'Santhosh Gowda',
        userEmail: 'santhosh.gowda@farmsoil.org',
        rating: 5,
        comment: 'Seeded this along my dry border plot. Germinated in just 4 days with absolutely minimal drip watering. The birds in the fields love the fresh ears!',
        date: '2026-05-30',
        isVerified: true
      }
    ]
  }
];

export const STARTER_UPLOAD_TEMPLATES = [
  {
    id: 'tpl-1',
    name: 'Red Soil Clay Patch',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
    author: 'Karnal Organic Hub'
  },
  {
    id: 'tpl-2',
    name: 'Terrace Potting Mix Layout',
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop',
    author: 'Urban Farming Club'
  },
  {
    id: 'tpl-3',
    name: 'Hydroponic Greenhouse Rack',
    url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1200&auto=format&fit=crop',
    author: 'Vellore Tech Farms'
  }
];

export const AVAILABLE_MATS = [
  { name: 'None (Pure Virgin Soil Bed)', hex: 'transparent', price: 0 },
  { name: 'Bio-Active Vermicompost Feed', hex: '#4e3629', price: 8 },
  { name: 'Organic Cold-Pressed Neem Cake', hex: '#4a5d4e', price: 12 },
  { name: 'Compressed Swirl Coco-Peat Humus', hex: '#b38b6d', price: 10 },
  { name: 'Granular Mycorrhizae Root Booster', hex: '#2f3e46', price: 15 },
  { name: 'Vedic Panchagavya Growth Serum', hex: '#ca9c55', price: 18 }
];

export const AVAILABLE_GLAZINGS = [
  { name: 'Standard Farm Direct Cargo', desc: 'Secure protective boxes, delivered in 48 hours', price: 5 },
  { name: 'Thermo-Regulated Fresh Lock', desc: 'Active cooling containers, preserves critical enzymes and hydration', price: 15 },
  { name: 'Express Aerial Flight Drone', desc: 'O-Zone air speed flight, arrives under 24 hours in thermal shield', price: 30 },
  { name: 'In-Field Direct Personal Collection', desc: 'Schedule a visit to harvest it with your own hands!', price: 0 }
];

export const AVAILABLE_SIZES = [
  { label: 'Small Household Trial (1 Kg / Pack)', width: 1, height: 1, baseCost: 10 },
  { label: 'Medium Family Fresh Crate (5 Kg)', width: 2, height: 4, baseCost: 28 },
  { label: 'Large Community Direct Share (12 Kg)', width: 3, height: 6, baseCost: 55 },
  { label: 'Mega Commercial Farm Cooperatives (30 Kg)', width: 5, height: 10, baseCost: 110 }
];

export const CUSTOMER_SHOWCASE = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-865823967d12?q=80&w=600&auto=format&fit=crop',
    customer: 'Meenakshi & Balaji',
    location: 'Coimbatore, India',
    tag: '#OrganicHomeKitchen',
    quote: 'Awesome Alfonzo Mangoes! The custom sized build was extremely solid and shipping took only 2 days is unbelievable.'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop',
    customer: 'Vidhya Ramaswamy',
    location: 'Bangalore, India',
    tag: '#HydroponicsIndia',
    quote: 'The Organic tomatoes arrived inside the Thermo-Regulated box still smells exactly of the fresh field dew.'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600&auto=format&fit=crop',
    customer: 'Pranav Nair',
    location: 'Chennai, India',
    tag: '#GardenHarvests',
    quote: 'We set up our small terrace patch using their heirloom Finger Millet and carrot organic packs. Exceptional seed success rates!'
  }
];

export const LUXURY_COUPONS = [
  { code: 'HARVEST15', discountType: 'percentage', value: 15, minSpend: 100, description: '15% off orders above $100' },
  { code: 'FARMFRESH40', discountType: 'fixed', value: 40, minSpend: 250, description: '$40 off bulk agricultural orders above $250' }
];
