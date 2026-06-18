# Deployment Guide - OvutOfLove Art Store

A complete guide to deploy this MERN stack application to production.

---

## Prerequisites

1. **GitHub Account** - to host the code repository
2. **MongoDB Atlas Account** - for the cloud database (free tier available)
3. **Render Account** (or Vercel/Railway/Heroku) - to host the application
4. **Node.js 18+** - installed locally for testing

---

## Local Setup (Before Deployment)

### 1. Clone or Navigate to Project
```bash
cd ovutoflove
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Configure Environment
```bash
# Copy example to actual .env
cp server/.env.example server/.env

# Edit with your values
# nano server/.env  (or use your editor)
```

### 4. Test Locally
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## MongoDB Atlas Setup

### 1. Create Account
- Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up with email or Google

### 2. Create a Free Cluster
- Click "Create" → Select "Shared" (free tier)
- Choose a cloud provider (AWS recommended)
- Select your region
- Name the cluster (e.g., "ovutoflove-cluster")
- Click "Create Deployment"

### 3. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Username: e.g., `art_store_user`
- Password: Generate a strong one
- Database privileges: "Read and write to any database"
- Click "Add User"

### 4. Allow Network Access
- Go to "Network Access"
- Click "Add IP Address"
- For testing: click "Allow Access from Anywhere" (0.0.0.0/0)
- For production: Add specific server IPs
- Click "Confirm"

### 5. Get Connection String
- Go to "Clusters" → Click "Connect"
- Choose "Drivers" → "Node.js"
- Copy the connection string
- Replace `<username>`, `<password>`, `<database>`
- It should look like:
  ```
  mongodb+srv://art_store_user:your_password@cluster0.xxxxx.mongodb.net/ovutoflove?retryWrites=true&w=majority
  ```

---

## GitHub Setup

### 1. Create Repository
- Go to [https://github.com/new](https://github.com/new)
- Repository name: `Vins_Art_Hunt` (or your choice)
- Make it **Public** (for free deployment hosts)
- Do NOT add README, .gitignore, or license (you have them)
- Click "Create repository"

### 2. Push Code to GitHub
```bash
cd c:\Users\VINS\Downloads\ovutoflove-art-store\ovutoflove

git config user.email "your-email@gmail.com"
git config user.name "Your Name"

git add .
git commit -m "Initial commit: MERN art store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Vins_Art_Hunt.git
git push -u origin main
```

---

## Deploy on Render

### 1. Connect GitHub to Render
- Go to [https://render.com](https://render.com)
- Sign up → Connect GitHub account
- Authorize Render to access your repos

### 2. Create Web Service
- Click "New" → "Web Service"
- Select your repository
- Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | ovutoflove-art-store |
| **Environment** | Node |
| **Region** | (Choose closest to you) |
| **Branch** | main |
| **Build Command** | `npm run install-all && npm run build` |
| **Start Command** | `npm start` |

### 3. Add Environment Variables
Click "Advanced" → Add environment variables:

```
MONGO_URI=mongodb+srv://art_store_user:your_password@cluster0.xxxxx.mongodb.net/ovutoflove?retryWrites=true&w=majority

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

NOTIFICATION_RECEIVER=admin@example.com

UPI_ID=your-upi@bank
UPI_NAME=OvutOfLove Art Store
```

**Note on SMTP:** For Gmail, generate an "App Password":
1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Use it for SMTP_PASS

### 4. Deploy
- Click "Create Web Service"
- Wait for the first deploy (5-10 minutes)
- You'll get a URL like: `https://ovutoflove-art-store.onrender.com`

### 5. Test Deployment
- Open your Render URL
- Test the gallery, artworks, contact form
- Check MongoDB Atlas to confirm data is being saved

---

## Alternative Deployment Platforms

### Vercel (Frontend Only)
```bash
cd client
npm install -g vercel
vercel deploy
```

### Railway
- Similar to Render
- Go to [https://railway.app](https://railway.app)
- Connect GitHub, add same environment variables

### Heroku (Legacy - Credit card required)
- Similar deployment process
- Use `Procfile` to configure

---

## Post-Deployment

### 1. Update Image URLs
In `server/index.js`, artwork images are stored in `/server/uploads/`. For the deployed app:
- Either keep local uploads (works on Render's ephemeral storage for 30 days)
- Or migrate to cloud storage (Google Drive, AWS S3, Cloudinary)

### 2. Enable Auto-Deploy
On Render:
- Go to your service settings
- Scroll to "Deploy" section
- Toggle "Auto-Deploy" to push changes automatically when you update GitHub

### 3. Monitor Logs
On Render:
- Click your service
- Go to "Logs" tab
- Monitor for errors in real-time

### 4. Backup Database
Regularly export MongoDB data:
```bash
mongodump --uri="your-connection-string" --out=./backup
```

---

## Troubleshooting

### App shows blank page
- Check Render logs for build errors
- Verify `npm run build` completed without errors

### Database connection fails
- Check MONGO_URI in Render environment variables
- Verify username/password in connection string
- Check MongoDB Atlas network access (should include 0.0.0.0/0)

### Emails not sending
- Verify SMTP credentials
- For Gmail: use App Password, not regular password
- Check email logs in Render dashboard

### Images not loading
- Verify `/uploads` folder has images
- Check the image path format (`/uploads/filename.jpg`)
- For production, consider cloud storage

---

## Development Workflow After Deployment

1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub: `git push`
4. Render automatically deploys (if auto-deploy enabled)
5. Changes live in 2-5 minutes

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use strong MongoDB passwords
- [ ] Enable 2FA on MongoDB Atlas
- [ ] Use App Passwords for Gmail (not regular password)
- [ ] Make GitHub repo private if containing secrets
- [ ] Rotate credentials if accidentally exposed
- [ ] Keep Node.js dependencies updated: `npm audit fix`

---

## Support & Resources

- **MongoDB Atlas Docs**: https://docs.mongodb.com/atlas/
- **Render Docs**: https://render.com/docs
- **Express.js Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## Questions?

If deployment fails, check:
1. All environment variables are set
2. Build command output in Render logs
3. MongoDB connection string is correct
4. GitHub repo has all necessary files
