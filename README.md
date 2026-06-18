# OvutOfLove — Art Store
> A vintage-aesthetic MERN stack website for an original art store.

---

## Stack
- **Frontend:** React 18, React Router v6
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Fonts:** Playfair Display, EB Garamond, Cormorant Garamond (Google Fonts)

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Install dependencies
```bash
npm run install-all
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI
```

### 3. Run in development
```bash
npm run dev
```
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### 4. Build for production
```bash
npm run build
```
Then serve the `client/build` folder via Express.

---

## Project Structure
```
ovutoflove/
├── client/                  # React app
│   └── src/
│       ├── components/      # Navbar, Footer, ArtworkCard, CartDrawer
│       ├── context/         # CartContext
│       └── pages/           # Home, Gallery, ArtworkDetail, About, Contact
└── server/                  # Express API
    ├── models/              # Artwork, Order (Mongoose)
    └── routes/              # artworks, categories, orders, contact
```

---

## Features
- **Gallery** with category filters, search, sold/available toggle
- **Artwork detail** page with sticky image
- **Cart/Collection drawer** with enquiry checkout form
- **Orders API** — stores purchase enquiries in MongoDB
- **Contact form** — wired to API
- **Auto-seeded** with 8 sample artworks on first run
- **Vintage aesthetic** — parchment palette, Playfair Display, sepia filters, paper texture

---

## Connecting your Google Drive images
In `server/index.js`, update each artwork's `imageUrl` or `driveImageId` field with your own Google Drive image URLs.

For Google Drive images, use this URL format:
```
https://drive.google.com/uc?export=view&id=<FILE_ID>
```

---

## Deployment
- **MongoDB Atlas** — free tier works well
- **Frontend** — Vercel or Netlify (`client/build`)
- **Backend** — Railway, Render, or any Node host
- Update `client/package.json` proxy for production backend URL
