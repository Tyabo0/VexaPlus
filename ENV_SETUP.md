# Environment Variables Setup Guide

This document explains how to configure environment variables for the PSK Services booking system.

## Frontend Environment Variables

Create a `.env` file in the **project root** directory:

```env
# Frontend Environment Variables (for Vite)

# API Configuration
VITE_API_URL=http://localhost:3001
```

For production, update to your production API URL:
```env
VITE_API_URL=https://api.yourdomain.com
```

## Backend Environment Variables

Create a `.env` file in the **server/** directory:

```env
# Email Configuration (choose ONE method below)

# Option 1: SMTP (Gmail, Outlook, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=no-reply@psycotikcrew.com

# Option 2: SendGrid (comment out SMTP if using this)
# SENDGRID_API_KEY=your-sendgrid-api-key
# SMTP_FROM=no-reply@psycotikcrew.com

# Site Configuration
SITE_OWNER_EMAIL=booking@psycotikcrew.com
BASE_URL=http://localhost:3001

# Security - CHANGE THIS IN PRODUCTION!
VIEW_SECRET=your-secure-random-secret-key-change-this

# Server Port
PORT=3001
```

## Email Configuration Options

### Option 1: Gmail SMTP

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create App Password**:
   - Go to Google Account → Security → 2-Step Verification
   - Scroll to "App passwords" and click
   - Select "Mail" and your device
   - Copy the generated 16-character password
3. **Add to `.env`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=abcd efgh ijkl mnop  # Your app password
   SMTP_FROM=no-reply@psycotikcrew.com
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Sign up** at [sendgrid.com](https://sendgrid.com) (Free tier: 100 emails/day)
2. **Create API Key**:
   - Settings → API Keys → Create API Key
   - Give it "Full Access" or "Mail Send" permissions
   - Copy the API key (you'll only see it once!)
3. **Verify Sender**:
   - Settings → Sender Authentication
   - Verify a single sender email address
4. **Add to `.env`**:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
   SMTP_FROM=verified-email@yourdomain.com
   ```

### Option 3: Other SMTP Providers

**Outlook/Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

**Custom SMTP:**
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=true  # or false
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Security Considerations

### VIEW_SECRET

This is used to generate secure tokens for viewing submissions. 

**Generate a secure secret:**
```bash
# On macOS/Linux:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use any random string generator
```

Example:
```env
VIEW_SECRET=kJ8s9dH3mN2pQ7xW1vB6cF4tY5rE9uI2
```

### Production Deployment

When deploying to production:

1. ✅ Change `VIEW_SECRET` to a secure random string
2. ✅ Update `BASE_URL` to your production domain
3. ✅ Update `VITE_API_URL` to your production API
4. ✅ Use environment-specific email credentials
5. ✅ Never commit `.env` files to Git (they're in `.gitignore`)

## Testing Without Email

If you don't want to configure email immediately, the server will still work:

- Submissions will be saved to `server/data/`
- Email notifications will be logged to console instead
- You can view submissions using the console-printed URL

The server logs will show:
```
⚠ Email not configured. Submission saved but no notification sent.
View submission at: http://localhost:3001/submission/abc-123?token=xyz
```

## Environment Files Checklist

- [ ] Created `/env` (frontend)
- [ ] Created `server/.env` (backend)
- [ ] Configured email method (SMTP or SendGrid)
- [ ] Changed `VIEW_SECRET` to secure random string
- [ ] Updated `SITE_OWNER_EMAIL` to your email
- [ ] Tested email sending works

## Troubleshooting

**"Email not configured" warning?**
- Check that `server/.env` exists and has SMTP or SendGrid config

**Emails not sending?**
- Verify credentials are correct
- Check firewall allows port 587 outbound
- Gmail users: must use App Password, not regular password
- SendGrid users: verify sender email address

**"Access denied - token required"?**
- Ensure `VIEW_SECRET` is the same in `.env` file
- Token is automatically generated and sent in emails

**API connection refused?**
- Ensure backend server is running (`cd server && npm start`)
- Check `VITE_API_URL` matches backend port (default 3001)

## Quick Start Commands

```bash
# 1. Install backend dependencies
cd server
npm install

# 2. Create environment file
# (manually create server/.env with the content above)

# 3. Start backend server
npm run dev

# 4. In another terminal, start frontend
cd ..
npm run dev
```

Your booking system should now be fully functional! 🎉

