# 🎯 Booking System Setup Guide

Complete guide to get your booking system with file uploads and email notifications running.

## ✅ What's Been Added

1. **File Upload** - Booking form now accepts up to 3 files (images/PDFs)
2. **Backend API** - Express server to handle submissions
3. **Email Notifications** - Owner alerts + customer confirmations
4. **Secure Viewing** - Token-based submission viewing (no dashboard needed)
5. **Simple Storage** - JSON files (upgrade to DB when ready)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Email (Choose One)

Create `server/.env` file:

**Option A - Gmail (Easiest for Testing):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=no-reply@psycotikcrew.com
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=changeme-to-random-string
PORT=3001
BASE_URL=http://localhost:3001
```

**Option B - SendGrid (Better for Production):**
```env
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=verified@yourdomain.com
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=changeme-to-random-string
PORT=3001
BASE_URL=http://localhost:3001
```

**Option C - Skip Email (Test Mode):**
```env
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=changeme-to-random-string
PORT=3001
BASE_URL=http://localhost:3001
```
*Submissions will be saved, but no emails sent. View URLs will be logged to console.*

### Step 3: Create Frontend .env

Create `.env` in **project root**:
```env
VITE_API_URL=http://localhost:3001
```

### Step 4: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 5: Test It!

1. Open http://localhost:5173/booking
2. Fill in the booking form
3. Upload some test files
4. Submit!
5. Check your email (or console logs if email not configured)

---

## 📧 Email Configuration Details

### Gmail Setup (Recommended for Testing)

1. **Enable 2FA** on your Gmail account
2. **Create App Password**:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Scroll down to "App passwords"
   - Generate password for "Mail" + "Other (Custom name)"
   - Copy the 16-character password
3. Use this password in `SMTP_PASS` (not your regular Gmail password)

### SendGrid Setup (Recommended for Production)

1. Sign up at https://sendgrid.com (Free: 100 emails/day)
2. Create API Key: Settings → API Keys → Create
3. Verify Sender: Settings → Sender Authentication
4. Add API key to `server/.env`

---

## 📁 Project Structure

```
psk-services/
├── src/
│   └── components/
│       └── BookingCalendar.tsx  ← Updated with file uploads
├── server/                       ← NEW backend folder
│   ├── index.js                 ← Express API server
│   ├── package.json
│   ├── .env                     ← Create this (your secrets)
│   ├── .env.example             ← Template
│   ├── data/                    ← Auto-created (submissions)
│   └── uploads/                 ← Auto-created (files)
├── .env                         ← Create this (frontend config)
└── ENV_SETUP.md                 ← Detailed env guide
```

---

## 🔧 How It Works

### Frontend Flow
1. User fills booking form at `/booking`
2. Selects date, time, event type
3. Uploads optional files (max 3)
4. Form submits via fetch to backend API

### Backend Flow
1. Receives POST to `/api/bookings`
2. Validates data & saves files to `uploads/`
3. Creates submission JSON in `data/`
4. Sends email to site owner with details
5. Sends confirmation email to customer
6. Returns success + view URL

### Viewing Submissions
- Each submission gets a unique URL with token
- Example: `http://localhost:3001/submission/abc-123?token=xyz`
- Token required to view (secure, no dashboard needed)
- Owner receives this link in email

---

## 🎨 No Dashboard Approach

Instead of building an admin dashboard, you get notifications via:

✅ **Email** - Every booking sends you an email with:
- Customer details
- Event info
- List of uploaded files
- Secure view link

✅ **Secure Links** - Click link in email to view full submission:
- See all form data
- Download uploaded files
- Professional formatted view

✅ **Direct Access** - Query submissions when needed:
```bash
# View all submissions
ls server/data/

# Read specific submission
cat server/data/<id>.json
```

✅ **Future Upgrade Path** - When you need a dashboard:
- Data already structured as JSON
- Easy to import into database
- Add admin UI as separate React page

---

## 📝 API Endpoints

### POST /api/bookings
Submit new booking with optional files.

**Request:**
```javascript
const formData = new FormData();
formData.append('date', '2025-10-15');
formData.append('timeSlot', '2:00 PM');
formData.append('eventType', 'Wedding');
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+44 123 456 7890');
formData.append('location', 'London Hall');
formData.append('details', 'Need lighting for 200 guests');
formData.append('files', fileInput.files[0]); // Optional
formData.append('files', fileInput.files[1]); // Optional

fetch('http://localhost:3001/api/bookings', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Booking submitted successfully",
  "viewUrl": "http://localhost:3001/submission/550e8400...?token=..."
}
```

### GET /submission/:id?token=xxx
View specific booking (requires token).

### GET /api/health
Health check.

---

## 🔒 Security Notes

### File Uploads
- ✅ Only images and PDFs allowed
- ✅ 10MB per file limit
- ✅ Max 3 files per submission
- ✅ Files stored outside web root
- ✅ Unique filenames (no overwrites)

### Submission Viewing
- ✅ Token-based authentication
- ✅ Tokens include submission ID + secret
- ✅ No public listing of submissions
- ✅ Each view link is unique

### Environment Variables
- ✅ `.env` files in `.gitignore`
- ✅ Never commit secrets to Git
- ✅ Change `VIEW_SECRET` in production

---

## 🚢 Production Deployment

### Environment Variables

Update `server/.env` for production:
```env
# Use production email service
SENDGRID_API_KEY=your-production-key
SMTP_FROM=booking@yourdomain.com
SITE_OWNER_EMAIL=owner@yourdomain.com

# Production URLs
BASE_URL=https://api.yourdomain.com
PORT=3001

# Secure secret (generate new one!)
VIEW_SECRET=<run: openssl rand -base64 32>
```

Update `.env` (frontend):
```env
VITE_API_URL=https://api.yourdomain.com
```

### Deployment Options

**Option 1: Separate Hosting**
- Frontend: Vercel/Netlify (static site)
- Backend: Railway/Render/DigitalOcean (Node server)

**Option 2: Same Server**
- Build frontend: `npm run build`
- Serve from backend: `app.use(express.static('dist'))`

**Option 3: Serverless**
- Backend: AWS Lambda / Vercel Functions
- Storage: S3 / Supabase Storage
- Database: Supabase / MongoDB Atlas

### Upgrade to Database

When ready, replace JSON storage:

```javascript
// Instead of:
fs.writeFileSync(path.join(dataDir, `${id}.json`), JSON.stringify(submission));

// Use Supabase:
const { data, error } = await supabase
  .from('bookings')
  .insert([submission]);

// Or MongoDB:
await db.collection('bookings').insertOne(submission);
```

---

## 🧪 Testing

### Manual Test
1. Go to http://localhost:5173/booking
2. Fill form with test data
3. Upload test image
4. Submit
5. Check email (or console)
6. Click view link from email

### Test Without Email
If email not configured:
- Check server console for output
- Copy the `viewUrl` from logs
- Paste in browser to view submission

### Verify File Upload
- Upload an image
- After submission, check `server/uploads/` folder
- File should be there with unique name

---

## ❓ Troubleshooting

### "Cannot connect to API"
```bash
# Check backend is running
cd server
npm run dev

# Verify frontend .env has correct URL
cat .env  # Should show VITE_API_URL=http://localhost:3001
```

### "Email not sending"
```bash
# Check server logs for errors
# Verify .env credentials
# Gmail users: must use App Password, not regular password
# SendGrid users: verify sender email
```

### "Access denied - invalid token"
- Ensure `VIEW_SECRET` is same in server/.env
- Don't edit token manually
- Get fresh link from email or console

### Files not uploading
- Check file type (must be image or PDF)
- Check file size (<10MB)
- Verify `server/uploads/` directory exists

---

## 📞 Next Steps

1. ✅ Test the booking form works
2. ✅ Configure email notifications
3. ✅ Test with real booking
4. 📝 Customize email templates in `server/index.js`
5. 📝 Add your logo to email
6. 📝 Update contact details in emails
7. 🚀 Deploy to production

---

## 💡 Customization Ideas

### Email Templates
Edit `server/index.js` around line 130 to customize emails:
```javascript
const emailHtml = `
  <!-- Add your logo -->
  <img src="https://yourdomain.com/logo.png" />
  <!-- Customize design -->
  <h2>New Booking Request</h2>
  ...
`;
```

### Add More Fields
In `BookingCalendar.tsx`, add new form fields:
```tsx
<Input name="guestCount" label="Number of Guests" />
```

In `server/index.js`, capture new fields:
```javascript
const { date, timeSlot, ..., guestCount } = req.body;
```

### Notification Webhooks
Instead of email, send to Slack/Discord:
```javascript
await fetch('https://hooks.slack.com/...', {
  method: 'POST',
  body: JSON.stringify({
    text: `New booking from ${name}`
  })
});
```

---

## 📚 Resources

- **Cursor Docs**: https://cursor.sh/docs
- **Express.js**: https://expressjs.com/
- **Nodemailer**: https://nodemailer.com/
- **SendGrid**: https://sendgrid.com/docs/
- **Supabase**: https://supabase.com/docs

---

## ✅ Commit Message

```
feat(booking): add file uploads, backend API, and email notifications

- Enhanced BookingCalendar component with file upload support (max 3 files)
- Created Express backend API server for handling booking submissions
- Implemented email notifications for owner and customer confirmations
- Added secure token-based submission viewing (no dashboard required)
- Configured SMTP and SendGrid email support
- Simple JSON-based storage (ready for DB upgrade)

Closes #[issue-number]
```

---

**Need help?** Check ENV_SETUP.md for detailed email configuration, or review server/README.md for backend-specific docs.

Happy booking! 🎉

