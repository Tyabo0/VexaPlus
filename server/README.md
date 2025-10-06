# PSK Services Booking Backend API

Backend server for handling booking submissions, file uploads, and email notifications.

## Features

- ✅ Booking form submissions with validation
- ✅ File uploads (images, PDFs up to 10MB each, max 3 files)
- ✅ Email notifications (owner + customer confirmations)
- ✅ Secure submission viewing with token-based access
- ✅ JSON-based storage (simple fallback - replace with DB in production)
- ✅ SMTP & SendGrid support

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your email configuration:

**Option A: Gmail SMTP**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password if 2FA enabled
SMTP_FROM=no-reply@psycotikcrew.com
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=change-this-to-random-string
```

**Option B: SendGrid**
```env
SENDGRID_API_KEY=your-api-key
SMTP_FROM=no-reply@psycotikcrew.com
SITE_OWNER_EMAIL=booking@psycotikcrew.com
VIEW_SECRET=change-this-to-random-string
```

### 3. Run Server

```bash
# Development (with auto-reload on Node 18+)
npm run dev

# Production
npm start
```

Server will start at `http://localhost:3001`

## API Endpoints

### POST /api/bookings
Submit a new booking with optional file uploads.

**Request (multipart/form-data):**
```
date: 2025-10-15
timeSlot: 2:00 PM
eventType: Wedding
name: John Doe
email: john@example.com
phone: +44 123 456 7890
location: London Event Hall
details: Need lighting for 200 guests
files: [file1, file2, ...]  (optional, max 3)
```

**Response:**
```json
{
  "success": true,
  "id": "uuid-here",
  "message": "Booking submitted successfully",
  "viewUrl": "http://localhost:3001/submission/uuid?token=xxx"
}
```

### GET /submission/:id?token=xxx
View a specific booking submission (requires valid token).

### GET /api/health
Health check endpoint.

## Email Configuration Guide

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → 2-Step Verification → App passwords
3. Use the generated password in `SMTP_PASS`

### SendGrid Setup
1. Sign up at sendgrid.com (free tier: 100 emails/day)
2. Create API key: Settings → API Keys → Create API Key
3. Add to `SENDGRID_API_KEY`

## Storage

- **Submissions**: Stored as JSON in `server/data/`
- **Files**: Stored in `server/uploads/`

⚠️ **Production Note**: Replace JSON file storage with a proper database (PostgreSQL, MongoDB, Supabase, etc.)

## Security

- Submission views require token authentication
- Change `VIEW_SECRET` to a secure random string in production
- File uploads limited to images and PDFs
- File size limit: 10MB per file

## Upgrading to Database

To use Supabase or PostgreSQL instead of JSON:

1. Install database client (e.g., `npm install @supabase/supabase-js`)
2. Replace file writes in `server/index.js` with database inserts
3. Store files in Supabase Storage or S3

## Troubleshooting

**Email not sending?**
- Check SMTP credentials
- Verify firewall allows outbound port 587
- Check server logs for error messages
- Gmail users: ensure App Password is used, not regular password

**Files not uploading?**
- Check `server/uploads/` directory exists and is writable
- Verify file size < 10MB
- Ensure file type is allowed (images, PDFs only)

## Support

For issues or questions, contact: booking@psycotikcrew.com

