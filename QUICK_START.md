# ⚡ Quick Start - Booking System

## 🎯 Goal
Get your booking system running in 5 minutes.

---

## 📋 Step-by-Step

### 1️⃣ Install Backend
```bash
npm run server:install
```

### 2️⃣ Create Server Config
Create file: `server/.env`

**Paste this (for testing without email):**
```env
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=test-secret-change-later
PORT=3001
BASE_URL=http://localhost:3001
```

### 3️⃣ Create Frontend Config
Create file: `.env` (in project root)

**Paste this:**
```env
VITE_API_URL=http://localhost:3001
```

### 4️⃣ Start Backend
Open Terminal 1:
```bash
npm run server:dev
```

Wait for: `✓ Running on http://localhost:3001`

### 5️⃣ Start Frontend
Open Terminal 2:
```bash
npm run dev
```

### 6️⃣ Test It!
1. Open: http://localhost:5173/booking
2. Fill in the form
3. Upload a test image (optional)
4. Click "Request Booking"
5. ✅ Success! Check Terminal 1 for the submission

---

## 📧 Add Email Notifications (Optional)

### Gmail Setup (3 minutes)

1. **Get App Password:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Go to: https://myaccount.google.com/apppasswords
   - Create password for "Mail" + "Other"
   - Copy the 16-character password

2. **Update `server/.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop
   SMTP_FROM=no-reply@psycotikcrew.com
   SITE_OWNER_EMAIL=your-email@gmail.com
   VIEW_SECRET=test-secret-change-later
   PORT=3001
   BASE_URL=http://localhost:3001
   ```

3. **Restart Backend:**
   - Stop Terminal 1 (Ctrl+C)
   - Run: `npm run server:dev`

4. **Test:**
   - Submit another booking
   - Check your Gmail inbox! 📬

---

## 🎉 You're Done!

### What You Have Now:
✅ Booking form with calendar
✅ File upload support (up to 3 files)
✅ Email notifications (if configured)
✅ Secure submission viewing
✅ All data saved in `server/data/`

### What Happens When Someone Books:
1. Form submitted → Saved to `server/data/[id].json`
2. Files uploaded → Saved to `server/uploads/`
3. Email sent to you (if configured)
4. Confirmation email sent to customer
5. You get a secure link to view the submission

### View Submissions:
- **With email**: Click the link in your email
- **Without email**: Check Terminal 1 logs for the view URL
- **Manual**: Open `server/data/` folder and view the JSON files

---

## 🚀 Next Steps

1. ✅ Test booking form
2. 📧 Configure email (see above)
3. 🎨 Customize email templates in `server/index.js`
4. 🔒 Change `VIEW_SECRET` to something secure
5. 📱 Share booking link: http://localhost:5173/booking

---

## 💡 Useful Commands

```bash
# Frontend
npm run dev              # Start frontend dev server
npm run build            # Build for production

# Backend
npm run server:dev       # Start backend (auto-reload)
npm run server           # Start backend (production)
npm run server:install   # Install backend dependencies

# View all bookings
ls server/data/          # List all submissions

# Read a booking
cat server/data/[id].json
```

---

## 🆘 Troubleshooting

**"Cannot connect to API"**
→ Backend not running. Run: `npm run server:dev`

**"Port 3001 already in use"**
→ Something else using port 3001. Change `PORT` in `server/.env` to 3002

**"Email not sending"**
→ Check `server/.env` has correct Gmail App Password (not your regular password)

**Files not uploading?**
→ Check file is image or PDF, and < 10MB

---

## 📚 More Help

- **Full setup guide**: [BOOKING_SETUP_GUIDE.md](./BOOKING_SETUP_GUIDE.md)
- **Email config**: [ENV_SETUP.md](./ENV_SETUP.md)
- **Backend API docs**: [server/README.md](./server/README.md)

---

**Need help? All submission data is in `server/data/` - just open the JSON files!** 🎯

