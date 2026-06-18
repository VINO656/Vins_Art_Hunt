const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

// Routes
app.use('/api/artworks', require('./routes/artworks'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/admin', require('./routes/admin'));

if (fs.existsSync(clientBuildPath)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
      return next();
    }

    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ovutoflove';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✦ MongoDB connected — the studio is open');
    // seedDatabase(); // Removed to prevent sample artworks from being added
  })
  .catch(err => console.log('MongoDB error:', err));

// Seed sample data
async function seedDatabase() {
  const Artwork = require('./models/Artwork');
  const count = await Artwork.countDocuments();
  if (count === 0) {
    const sampleArtworks = [
      {
        title: 'Whispers of the Moor',
        description: 'A dreamlike study in ink and watercolour — fog settling over ancient land, the kind that speaks in silence.',
        price: 4800,
        category: 'Watercolour',
        medium: 'Watercolour on cotton paper',
        dimensions: '30cm × 40cm',
        year: 2024,
        available: true,
        featured: true,
        tags: ['landscape', 'fog', 'ink', 'muted'],
        imageUrl: '/uploads/IMG-20260408-WA0024.jpg',
        driveImageId: ''
      },
      {
        title: 'The Botanist\'s Reverie',
        description: 'Pressed botanicals rendered in soft gouache — each petal a letter from the garden.',
        price: 3600,
        category: 'Gouache',
        medium: 'Gouache on toned paper',
        dimensions: '24cm × 32cm',
        year: 2024,
        available: true,
        featured: true,
        tags: ['botanical', 'floral', 'gouache', 'delicate'],
        imageUrl: '/uploads/IMG-20260525-WA0058.jpg',
        driveImageId: ''
      },
      {
        title: 'Portrait of an Afternoon',
        description: 'Light through gauze curtains, a teacup on the sill. Oil on linen, small and tender.',
        price: 7200,
        category: 'Oil',
        medium: 'Oil on linen',
        dimensions: '20cm × 25cm',
        year: 2023,
        available: true,
        featured: true,
        tags: ['interior', 'light', 'oil', 'quiet'],
        imageUrl: '/uploads/IMG-20260527-WA0031.jpg',
        driveImageId: ''
      },
      {
        title: 'Correspondence (I)',
        description: 'Layered tissue and ink — a letter never sent, preserved under wax.',
        price: 2900,
        category: 'Mixed Media',
        medium: 'Mixed media on board',
        dimensions: '18cm × 24cm',
        year: 2024,
        available: true,
        featured: false,
        tags: ['mixed media', 'abstract', 'paper', 'nostalgic'],
        imageUrl: '/uploads/IMG-20260531-WA0061.jpg',
        driveImageId: ''
      },
      {
        title: 'Ember Hours',
        description: 'The last light of evening in ochre and burnt sienna. A study in warmth and departure.',
        price: 5500,
        category: 'Oil',
        medium: 'Oil on panel',
        dimensions: '25cm × 35cm',
        year: 2023,
        available: true,
        featured: false,
        tags: ['landscape', 'sunset', 'oil', 'warm'],
        imageUrl: '/uploads/IMG-20260608-WA0003.jpg',
        driveImageId: ''
      },
      {
        title: 'Memory Jar',
        description: 'A collection of small moments — pressed flowers, pencil sketches, faded receipts — collaged into one quiet vessel.',
        price: 2200,
        category: 'Mixed Media',
        medium: 'Collage and ink on paper',
        dimensions: '15cm × 20cm',
        year: 2024,
        available: true,
        featured: false,
        tags: ['collage', 'mixed media', 'nostalgic', 'small'],
        imageUrl: '/uploads/IMG20260507133026.jpg',
        driveImageId: ''
      },
      {
        title: 'The Field in August',
        description: 'Sun-bleached grasses and wild chamomile — a landscape that smells like memory.',
        price: 4100,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '28cm × 38cm',
        year: 2024,
        available: false,
        featured: false,
        tags: ['landscape', 'summer', 'botanical', 'watercolour'],
        imageUrl: '/uploads/IMG20260507133234.jpg',
        driveImageId: ''
      },
      {
        title: 'Grandmother\'s Garden',
        description: 'Roses from a garden that no longer exists, painted from a photograph found in a tin box.',
        price: 6300,
        category: 'Gouache',
        medium: 'Gouache on illustration board',
        dimensions: '35cm × 45cm',
        year: 2023,
        available: true,
        featured: true,
        tags: ['floral', 'botanical', 'memory', 'gouache'],
        imageUrl: '/uploads/IMG20260507133708.jpg',
        driveImageId: ''
      },
      {
        title: 'Still Life in Blue',
        description: 'A quiet arrangement of objects from the windowsill, bathed in cool morning light.',
        price: 3900,
        category: 'Oil',
        medium: 'Oil on canvas board',
        dimensions: '22cm × 28cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['still life', 'oil', 'blue', 'morning'],
        imageUrl: '/uploads/IMG20260511191115.jpg',
        driveImageId: ''
      },
      {
        title: 'The Gilded Hour',
        description: 'Golden afternoon light pooling on rough paper — a meditation on the beauty of ordinary moments.',
        price: 5100,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '32cm × 42cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['light', 'watercolour', 'golden', 'afternoon'],
        imageUrl: '/uploads/IMG20260511222043.jpg',
        driveImageId: ''
      },
      {
        title: 'Tender Petals',
        description: 'Soft blooms painted with restraint — colour held back just enough to let the paper breathe.',
        price: 3300,
        category: 'Gouache',
        medium: 'Gouache on toned paper',
        dimensions: '20cm × 26cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['floral', 'gouache', 'delicate', 'petals'],
        imageUrl: '/uploads/IMG20260515132044.jpg',
        driveImageId: ''
      },
      {
        title: 'Ink Study No. 3',
        description: 'Pure mark-making in diluted ink on dampened paper — movement frozen mid-flow.',
        price: 1800,
        category: 'Ink',
        medium: 'Ink on wet paper',
        dimensions: '15cm × 21cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['ink', 'abstract', 'study', 'minimal'],
        imageUrl: '/uploads/IMG20260516172706.jpg',
        driveImageId: ''
      },
      {
        title: 'Night Garden',
        description: 'A garden remembered after dark — deep indigos and the pale glow of moonlit blossoms.',
        price: 6800,
        category: 'Oil',
        medium: 'Oil on linen',
        dimensions: '30cm × 40cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['night', 'garden', 'oil', 'indigo'],
        imageUrl: '/uploads/IMG20260516230459.jpg',
        driveImageId: ''
      },
      {
        title: 'The Turning Season',
        description: 'Leaves at the moment of change — ochre meeting green, a painting about thresholds.',
        price: 4500,
        category: 'Watercolour',
        medium: 'Watercolour on cotton paper',
        dimensions: '28cm × 36cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['autumn', 'leaves', 'watercolour', 'season'],
        imageUrl: '/uploads/IMG20260530184056.jpg',
        driveImageId: ''
      },
      {
        title: 'Rose Study',
        description: 'A single rose, observed with patience and painted with care. No flourish, just truth.',
        price: 2700,
        category: 'Gouache',
        medium: 'Gouache on illustration board',
        dimensions: '18cm × 22cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['rose', 'floral', 'gouache', 'study'],
        imageUrl: '/uploads/IMG20260531203456.jpg',
        driveImageId: ''
      },
      {
        title: 'Colour Field I',
        description: 'An abstract exploration of warm and cool — fields of colour breathing beside each other.',
        price: 3500,
        category: 'Mixed Media',
        medium: 'Acrylic and ink on paper',
        dimensions: '24cm × 32cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['abstract', 'colour', 'field', 'mixed media'],
        imageUrl: '/uploads/IMG20260612123052.jpg',
        driveImageId: ''
      },
      {
        title: 'Colour Field II',
        description: 'The second in a series — quieter, cooler, a breath after the warmth of the first.',
        price: 3500,
        category: 'Mixed Media',
        medium: 'Acrylic and ink on paper',
        dimensions: '24cm × 32cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['abstract', 'colour', 'field', 'mixed media'],
        imageUrl: '/uploads/IMG20260612123119.jpg',
        driveImageId: ''
      },
      {
        title: 'Morning Study',
        description: 'Painted in the first hour of light — a record of stillness before the day begins.',
        price: 2400,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '20cm × 28cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['morning', 'watercolour', 'light', 'study'],
        imageUrl: '/uploads/IMG20260612123142.jpg',
        driveImageId: ''
      },
      {
        title: 'Portrait in Terracotta',
        description: 'A figure rendered in warm terracotta tones — more feeling than likeness.',
        price: 7500,
        category: 'Oil',
        medium: 'Oil on canvas',
        dimensions: '30cm × 40cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['portrait', 'oil', 'terracotta', 'figure'],
        imageUrl: '/uploads/IMG20260612123148.jpg',
        driveImageId: ''
      },
      {
        title: 'The Patient Garden',
        description: 'A garden painted over three sittings — layers of observation that accumulate into truth.',
        price: 5800,
        category: 'Gouache',
        medium: 'Gouache on cotton paper',
        dimensions: '35cm × 45cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['garden', 'gouache', 'layers', 'observation'],
        imageUrl: '/uploads/IMG_20260423_211441.png',
        driveImageId: ''
      },
      {
        title: 'Afternoon Bloom',
        description: 'Flowers caught in the generous light of mid-afternoon — soft, certain, unhurried.',
        price: 4200,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '26cm × 34cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['bloom', 'afternoon', 'watercolour', 'floral'],
        imageUrl: '/uploads/IMG_20260423_214356.jpg',
        driveImageId: ''
      },
      {
        title: 'Green Hours',
        description: 'The quality of light in a garden just before rain — everything more vivid, more itself.',
        price: 3800,
        category: 'Watercolour',
        medium: 'Watercolour on cotton paper',
        dimensions: '24cm × 30cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['green', 'garden', 'rain', 'watercolour'],
        imageUrl: '/uploads/IMG_20260505_154512.png',
        driveImageId: ''
      },
      {
        title: 'Warm Dusk',
        description: 'The last warmth of the day gathered on paper before it disappears.',
        price: 4600,
        category: 'Oil',
        medium: 'Oil on panel',
        dimensions: '22cm × 30cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['dusk', 'warm', 'oil', 'evening'],
        imageUrl: '/uploads/IMG_20260505_205023.jpg',
        driveImageId: ''
      },
      {
        title: 'Soft Geometry',
        description: 'Where organic form meets measured mark — a painting about the tension between hand and mind.',
        price: 3100,
        category: 'Mixed Media',
        medium: 'Mixed media on paper',
        dimensions: '20cm × 26cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['abstract', 'geometry', 'mixed media', 'tension'],
        imageUrl: '/uploads/IMG_20260506_100207_925.webp',
        driveImageId: ''
      },
      {
        title: 'The Letter',
        description: 'Inspired by handwritten correspondence — the texture of paper, the weight of words.',
        price: 2900,
        category: 'Mixed Media',
        medium: 'Collage and ink on paper',
        dimensions: '18cm × 24cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['letter', 'collage', 'mixed media', 'text'],
        imageUrl: '/uploads/IMG_20260507_220246.jpg',
        driveImageId: ''
      },
      {
        title: 'White Morning',
        description: 'A painting of quietness — pale tones that ask the eye to slow down and stay.',
        price: 4400,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '28cm × 36cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['white', 'morning', 'watercolour', 'quiet'],
        imageUrl: '/uploads/IMG_20260511_130232.jpg',
        driveImageId: ''
      },
      {
        title: 'Shadow Play',
        description: 'The shapes made by light as it crosses objects through a window — impermanent and precise.',
        price: 3700,
        category: 'Oil',
        medium: 'Oil on board',
        dimensions: '20cm × 26cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['shadow', 'light', 'oil', 'window'],
        imageUrl: '/uploads/IMG_20260511_130242.jpg',
        driveImageId: ''
      },
      {
        title: 'Pink Study',
        description: 'A painting built from pinks — from dusty rose to near-red, a spectrum of warmth.',
        price: 3200,
        category: 'Gouache',
        medium: 'Gouache on toned paper',
        dimensions: '18cm × 24cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['pink', 'study', 'gouache', 'colour'],
        imageUrl: '/uploads/IMG_20260513_180956.jpg',
        driveImageId: ''
      },
      {
        title: 'Crimson Field',
        description: 'A field of red at the edge of abstraction — landscape felt rather than seen.',
        price: 5300,
        category: 'Oil',
        medium: 'Oil on linen',
        dimensions: '30cm × 40cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['crimson', 'field', 'oil', 'abstract'],
        imageUrl: '/uploads/IMG_20260513_181116.jpg',
        driveImageId: ''
      },
      {
        title: 'Sunday Afternoon',
        description: 'Slow painting for a slow day. Warm colours, no urgency.',
        price: 4000,
        category: 'Watercolour',
        medium: 'Watercolour on cotton paper',
        dimensions: '25cm × 33cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['sunday', 'afternoon', 'watercolour', 'warm'],
        imageUrl: '/uploads/IMG_20260530_180041.jpg',
        driveImageId: ''
      },
      {
        title: 'The Open Window',
        description: 'A window as metaphor — what comes in, what goes out, and what remains on the sill.',
        price: 6100,
        category: 'Oil',
        medium: 'Oil on canvas',
        dimensions: '35cm × 45cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['window', 'oil', 'light', 'interior'],
        imageUrl: '/uploads/IMG_20260601_140151.jpg',
        driveImageId: ''
      },
      {
        title: 'Featherlight',
        description: 'Delicate marks that hover above the surface — a painting about fragility and trust.',
        price: 2800,
        category: 'Mixed Media',
        medium: 'Mixed media on paper',
        dimensions: '18cm × 24cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['delicate', 'mixed media', 'fragility', 'mark'],
        imageUrl: '/uploads/IMG_20260609_234412_322.webp',
        driveImageId: ''
      },
      {
        title: 'Gold Leaf Meditation',
        description: 'A quiet painting anchored in gold — warmth as a state of being rather than a colour.',
        price: 7000,
        category: 'Mixed Media',
        medium: 'Gouache and gold leaf on board',
        dimensions: '25cm × 35cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['gold', 'meditation', 'mixed media', 'warm'],
        imageUrl: '/uploads/IMG_20260612_123323.jpg',
        driveImageId: ''
      },
      {
        title: 'Bloom in Winter',
        description: 'A flower that insists on colour in the coldest season. Small resistance, full beauty.',
        price: 3600,
        category: 'Gouache',
        medium: 'Gouache on illustration board',
        dimensions: '20cm × 26cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['bloom', 'winter', 'gouache', 'resilience'],
        imageUrl: '/uploads/IMG_20260612_123345.jpg',
        driveImageId: ''
      },
      {
        title: 'Layered Hours',
        description: 'Time accumulates in paint — each session visible beneath the next, a geology of attention.',
        price: 5500,
        category: 'Oil',
        medium: 'Oil on linen',
        dimensions: '28cm × 38cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['layers', 'time', 'oil', 'texture'],
        imageUrl: '/uploads/IMG_20260612_123503.png',
        driveImageId: ''
      },
      {
        title: 'Violet Dusk',
        description: 'The sky after the sun is gone but before the dark — that particular violet that belongs to no other hour.',
        price: 4900,
        category: 'Watercolour',
        medium: 'Watercolour on arches paper',
        dimensions: '30cm × 40cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['violet', 'dusk', 'watercolour', 'sky'],
        imageUrl: '/uploads/IMG_20260612_123537.png',
        driveImageId: ''
      },
      {
        title: 'The Quiet Room',
        description: 'An interior without people but full of their absence — objects that hold memory.',
        price: 6500,
        category: 'Oil',
        medium: 'Oil on canvas',
        dimensions: '32cm × 42cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['interior', 'quiet', 'oil', 'memory'],
        imageUrl: '/uploads/IMG_20260612_123607.jpg',
        driveImageId: ''
      },
      {
        title: 'Summer\'s End',
        description: 'The last warmth of the year held carefully in pigment — an act of preservation.',
        price: 4300,
        category: 'Watercolour',
        medium: 'Watercolour on cotton paper',
        dimensions: '26cm × 34cm',
        year: 2026,
        available: true,
        featured: false,
        tags: ['summer', 'end', 'watercolour', 'warmth'],
        imageUrl: '/uploads/IMG_20260612_123657.jpg',
        driveImageId: ''
      }
    ];
    await Artwork.insertMany(sampleArtworks);
    console.log('✦ Studio seeded with sample artworks');
  }
}

app.get('/', (req, res) => res.json({ message: '✦ OvutOfLove Art Store API — running' }));

app.listen(PORT, () => console.log(`✦ Studio open on port ${PORT}`));
