# Quick Setup Guide

## For First Time Users

### Step 1: Install Everything
```bash
npm run install-all
```

### Step 2: Configure Server
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI
nano .env
```

### Step 3: Run Locally
```bash
cd ..
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## Environment Variables Needed

### Server (.env)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/database
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_RECEIVER=admin@example.com
UPI_ID=your-upi@bank
UPI_NAME=Your Store Name
```

---

## For Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

Quick summary:
1. Push to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy

---

## Project Structure

```
ovutoflove/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (CartContext)
│   │   └── assets/      # Images, fonts
│   └── package.json
│
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Email, helpers
│   ├── uploads/         # Image storage
│   ├── index.js         # Entry point
│   └── package.json
│
├── package.json         # Root scripts
└── README.md            # Project info
```

---

## NPM Scripts

```bash
npm run install-all     # Install all dependencies
npm run dev             # Run frontend + backend together
npm run build           # Build React for production
npm start               # Run backend only
npm run server          # Run backend only (alias)
npm run client          # Run frontend only
```

---

## Common Issues

**Q: Port 3000 or 5000 already in use?**
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>
```

**Q: MongoDB connection failed?**
- Verify MONGO_URI in server/.env
- Check network access in MongoDB Atlas
- Ensure credentials are correct

**Q: Images not showing?**
- Check server/uploads/ folder has images
- Verify image paths in MongoDB
- Server must be running to serve /uploads/

---

Need help? See DEPLOYMENT.md for detailed instructions.
