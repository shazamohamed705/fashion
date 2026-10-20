/* ─── Shared product data ──────────────────────────────────────────────────
   Single source of truth used by ShopAllPage, NewArrivals, and
   ProductDetailsPage.
─────────────────────────────────────────────────────────────────────────── */

export const allProducts = [
  {
    id: 1,
    name: 'Cotton pull-on skirt',
    color: 'Sky',
    colorHex: '#a8c4d4',
    colors: [
      { label: 'Sky',  hex: '#a8c4d4' },
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Clay', hex: '#b07a5a' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    price: 1100,
    category: 'Women',
    fabric: 'Cotton',
    isNew: false,
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
    images: [
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'An easy shape for everyday life. Soft structure, room to move and a quiet Oat tone to make your own.',
    fabricCare:
      'Linen requires care and a relaxed silhouette. Check the garment label for the confirmed fibre composition and care instructions. Machine wash gentle, gentle cold wash, air dry and iron on a low setting for the first few washes.',
    tags: [],
  },
  {
    id: 2,
    name: 'Brushed cotton shirt',
    color: 'Moss',
    colorHex: '#8a9e7a',
    colors: [
      { label: 'Moss',  hex: '#8a9e7a' },
      { label: 'Ink',   hex: '#3a3a5c' },
      { label: 'Cream', hex: '#e8e0d0' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    price: 1320,
    category: 'Men',
    fabric: 'Cotton',
    isNew: false,
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
    images: [
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'Brushed for softness, built to last. A relaxed fit shirt that works as hard as you do — on and off duty.',
    fabricCare:
      '100% Cotton. Machine wash cold with like colours. Tumble dry low. Do not bleach. Iron on medium heat if needed.',
    tags: ['Organic Cotton'],
  },
  {
    id: 3,
    name: 'Loopback sweatshirt',
    color: 'Ink',
    colorHex: '#3a3a5c',
    colors: [
      { label: 'Ink',  hex: '#3a3a5c' },
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Clay', hex: '#b07a5a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 1380,
    category: 'Men',
    fabric: 'Cotton',
    isNew: true,
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
    images: [
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'A heavyweight loopback fleece sweatshirt with a boxy silhouette. Clean detailing, no logo. Just quality.',
    fabricCare:
      '80% Cotton, 20% Polyester loopback jersey. Machine wash cold. Tumble dry low. Do not iron print.',
    tags: [],
  },
  {
    id: 4,
    name: 'Textured knit polo',
    color: 'Clay',
    colorHex: '#b07a5a',
    colors: [
      { label: 'Clay', hex: '#b07a5a' },
      { label: 'Ink',  hex: '#3a3a5c' },
      { label: 'Sky',  hex: '#a8c4d4' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 1550,
    category: 'Men',
    fabric: 'Knit',
    isNew: true,
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
    images: [
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'Rich texture, clean collar. A polo that bridges smart and casual with minimal effort required.',
    fabricCare:
      '100% Merino Knit. Hand wash cold. Lay flat to dry. Do not bleach or tumble dry.',
    tags: [],
  },
  {
    id: 5,
    name: 'Play all day tee',
    color: 'Sky',
    colorHex: '#a8c4d4',
    colors: [
      { label: 'Sky',  hex: '#a8c4d4' },
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Moss', hex: '#8a9e7a' },
    ],
    sizes: ['2–3', '4–5', '6–7', '8–9', '10–11'],
    price: 480,
    category: 'Kids',
    fabric: 'Organic Cotton',
    isNew: false,
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
    images: [
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'Soft, sturdy, and ready for anything. Made from organic cotton so it\'s gentle on little skin.',
    fabricCare:
      '100% Organic Cotton. Machine wash warm. Tumble dry low. Do not iron directly on print.',
    tags: ['Organic Cotton'],
  },
  {
    id: 6,
    name: 'Cloud soft cardigan',
    color: 'Oat',
    colorHex: '#d4c9b0',
    colors: [
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Cream', hex: '#e8e0d0' },
      { label: 'Clay', hex: '#b07a5a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 850,
    category: 'Women',
    fabric: 'Knit',
    isNew: true,
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
    images: [
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'Lighter than it looks and warmer than you expect. A layering piece you will reach for daily.',
    fabricCare:
      '70% Merino Wool, 30% Cashmere. Dry clean recommended. Hand wash cold if necessary. Lay flat to dry.',
    tags: [],
  },
  {
    id: 7,
    name: 'Sunny day overshirt',
    color: 'Ink',
    colorHex: '#3a3a5c',
    colors: [
      { label: 'Ink',  hex: '#3a3a5c' },
      { label: 'Moss', hex: '#8a9e7a' },
      { label: 'Sky',  hex: '#a8c4d4' },
    ],
    sizes: ['4–5', '6–7', '8–9', '10–11'],
    price: 780,
    category: 'Kids',
    fabric: 'Linen',
    isNew: false,
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
    images: [
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'Throw it on, wear it open, or button it up. A laid-back linen overshirt built for summer adventures.',
    fabricCare:
      '100% Linen. Machine wash gentle cold. Air dry. Iron while slightly damp for best results.',
    tags: [],
  },
  {
    id: 8,
    name: 'Relaxed linen shirt',
    color: 'Oat',
    colorHex: '#d4c9b0',
    colors: [
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Clay', hex: '#b07a5a' },
      { label: 'Moss', hex: '#8a9e7a' },
      { label: 'Ink',  hex: '#3a3a5c' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    price: 1250,
    category: 'Women',
    fabric: 'Linen',
    isNew: false,
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
    images: [
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'An easy shape for everyday life. Soft structure, room to move and a quiet Oat tone to make your own.',
    fabricCare:
      'Linen requires care and a relaxed silhouette. Check the garment label for the confirmed fibre composition and care instructions. Machine wash gentle cold, air dry and iron on a low setting for the first few washes.',
    tags: ['Organic Cotton'],
  },
  {
    id: 9,
    name: 'Woven midi dress',
    color: 'Clay',
    colorHex: '#b07a5a',
    colors: [
      { label: 'Clay', hex: '#b07a5a' },
      { label: 'Oat',  hex: '#d4c9b0' },
      { label: 'Ink',  hex: '#3a3a5c' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    price: 1650,
    category: 'Women',
    fabric: 'Linen',
    isNew: true,
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
    images: [
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'A midi dress with movement. Woven linen, relaxed cut, and a length that works everywhere you do.',
    fabricCare:
      '100% Linen woven fabric. Machine wash gentle cold. Do not tumble dry. Iron on medium heat while damp.',
    tags: [],
  },
  {
    id: 10,
    name: 'Soft rib tee',
    color: 'Cream',
    colorHex: '#e8e0d0',
    colors: [
      { label: 'Cream', hex: '#e8e0d0' },
      { label: 'Oat',   hex: '#d4c9b0' },
      { label: 'Clay',  hex: '#b07a5a' },
      { label: 'Ink',   hex: '#3a3a5c' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 720,
    category: 'Women',
    fabric: 'Organic Cotton',
    isNew: true,
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
    images: [
      '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
      '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
      '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
      '/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg',
    ],
    description:
      'A fine-rib tee cut close but not tight. Organic cotton that softens with every wash.',
    fabricCare:
      '95% Organic Cotton, 5% Elastane rib jersey. Machine wash cold. Tumble dry low. Do not bleach.',
    tags: ['Organic Cotton'],
  },
];
