# PSK Services - Professional Sound & Lighting

Modern, responsive website for PSK Services (Psycotik Crew) - Professional sound and lighting services for events.

## 🎯 Features

- ✅ Modern, responsive design with Tailwind CSS
- ✅ Service showcase and portfolio
- ✅ **Booking system with file uploads (NO BACKEND REQUIRED!)**
- ✅ **Email notifications via Web3Forms**
- ✅ Blog and references sections
- ✅ Contact forms
- ✅ **100% Frontend-only solution**

## 🚀 Quick Start (2 Minutes - No Backend!)

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Free Web3Forms Access Key

1. Go to: **https://web3forms.com**
2. Enter your email (where you'll receive bookings)
3. Click "Create Access Key"
4. Copy your access key

### 3. Configure Environment

Create `.env` in project root:
```env
VITE_WEB3FORMS_KEY=your-access-key-here
```

**Example:**
```env
VITE_WEB3FORMS_KEY=a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test It!

1. Open: http://localhost:8080/booking
2. Fill in the booking form
3. Upload files (optional)
4. Submit
5. Check your email inbox! 📧

**See [SIMPLE_QUICK_START.md](./SIMPLE_QUICK_START.md) for detailed setup.**

## 📁 Project Structure

```
psk-services/
├── src/                          # Frontend React app
│   ├── components/              # React components
│   │   ├── BookingCalendar.tsx # Booking form with file uploads
│   │   └── ui/                  # shadcn/ui components
│   ├── pages/                   # Page components
│   │   ├── Booking.tsx         # Booking page
│   │   ├── Services.tsx
│   │   └── ...
│   └── main.tsx                # App entry point
├── server/                      # Backend API (NEW)
│   ├── index.js                # Express server
│   ├── package.json            # Backend dependencies
│   ├── data/                   # Booking submissions (auto-created)
│   └── uploads/                # Uploaded files (auto-created)
├── public/                      # Static assets
└── dist/                        # Production build
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Optional Backend Scripts (if using backend approach)
- `npm run server:install` - Install backend dependencies
- `npm run server:dev` - Start backend in dev mode
- `npm run server` - Start backend in production mode

**Note: Backend is optional! Default setup uses Web3Forms (no backend needed).**

## 📧 Booking System (No Backend Required!)

The booking system includes:

- **Interactive Calendar** - Date & time selection
- **File Uploads** - Up to 3 images/PDFs per booking (5MB each)
- **Email Notifications** - Automatic emails sent directly to your inbox
- **No Server Needed** - 100% frontend using Web3Forms
- **Free Forever** - 250 submissions/month on free plan
- **Static Hosting Ready** - Deploy anywhere (Vercel, Netlify, GitHub Pages)

### How It Works

1. Customer fills booking form at `/booking`
2. Form submits directly to Web3Forms API (HTTPS)
3. Web3Forms sends formatted email to your inbox
4. Files attached to the email automatically
5. Customer can optionally receive auto-reply confirmation
6. No database, no server, no maintenance!

### Why No Backend?

✅ **Simpler** - Just add one access key
✅ **Faster** - No server setup or maintenance
✅ **Cheaper** - Free (or $9/month for high volume)
✅ **Reliable** - 99.9% uptime SLA
✅ **Secure** - HTTPS, SPAM protection built-in
✅ **Scalable** - Handles traffic spikes automatically

**See [NO_BACKEND_SETUP.md](./NO_BACKEND_SETUP.md) for detailed instructions.**

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **date-fns** - Date utilities

### Form Handling
- **Web3Forms** - Form submission service (no backend required)
- Supports file uploads, email notifications, SPAM protection

### Optional Backend (if you prefer self-hosted)
- **Node.js** - Runtime
- **Express** - Web framework
- **Multer** - File upload handling
- **Nodemailer** - Email sending

## 📚 Documentation

### No Backend (Recommended)
- [SIMPLE_QUICK_START.md](./SIMPLE_QUICK_START.md) - 2-minute setup guide ⭐
- [NO_BACKEND_SETUP.md](./NO_BACKEND_SETUP.md) - Complete Web3Forms setup

### With Backend (Optional)
- [BOOKING_SETUP_GUIDE.md](./BOOKING_SETUP_GUIDE.md) - Full backend setup
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment configuration
- [server/README.md](./server/README.md) - Backend API docs

## 🚢 Production Deployment

### Build Frontend

```bash
npm run build
```

### Deploy to Static Hosting (No Backend Needed!)

**Vercel / Netlify:**
1. Connect your Git repository
2. Add environment variable:
   - Key: `VITE_WEB3FORMS_KEY`
   - Value: `your-access-key`
3. Deploy!

**GitHub Pages:**
1. Add Web3Forms key to GitHub Secrets
2. Build and deploy

**Cloudflare Pages:**
1. Connect repository
2. Add environment variable
3. Deploy

### Optional: Deploy with Backend

If using the optional backend approach:
- Frontend: Vercel/Netlify (static)
- Backend: Railway/Render (Node.js)
- See [BOOKING_SETUP_GUIDE.md](./BOOKING_SETUP_GUIDE.md)

## 🔒 Security

- ✅ Environment variables not committed to Git
- ✅ Token-based submission viewing
- ✅ File type validation (images/PDFs only)
- ✅ File size limits (10MB per file)
- ✅ CORS protection
- ✅ Secure email configuration

## 🧪 Testing

### Test Booking Form

1. Go to http://localhost:8080/booking
2. Select date and time
3. Fill in contact information
4. Upload test files (optional - max 3 files, 5MB each)
5. Submit
6. Check your email inbox! 📧

### What You'll Receive

An email with:
- Subject: "New Booking: [Event Type] - [Customer Name]"
- All booking details (date, time, location, etc.)
- Customer contact info
- File attachments (if uploaded)

No server console to check - emails arrive directly in your inbox!

## 🆘 Troubleshooting

**"Access key not defined" error?**
- Create `.env` file in project root
- Add: `VITE_WEB3FORMS_KEY=your-key`
- Restart dev server: `npm run dev`

**Not receiving emails?**
- Check spam/junk folder
- Verify access key is correct
- Login to web3forms.com to check submission logs
- Check you used the correct email when creating key

**Form not submitting?**
- Check browser console (F12) for errors
- Verify internet connection
- Make sure access key is valid

**Files not attaching?**
- Max file size: 5MB per file (free plan)
- Max 3 files per submission
- Only images and PDFs allowed

## 📞 Support

For detailed setup help:
1. Read [SIMPLE_QUICK_START.md](./SIMPLE_QUICK_START.md) - Quick 2-minute setup
2. Check [NO_BACKEND_SETUP.md](./NO_BACKEND_SETUP.md) - Complete guide
3. Visit https://web3forms.com/docs for Web3Forms help

**For backend approach (optional):**
- Read [BOOKING_SETUP_GUIDE.md](./BOOKING_SETUP_GUIDE.md)
- Check [ENV_SETUP.md](./ENV_SETUP.md)

## 📝 License

Private project for PSK Services (Psycotik Crew)

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Express**
