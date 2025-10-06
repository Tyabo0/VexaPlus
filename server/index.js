// Backend server for PSK Services - Booking API
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// Configure email transporter
const createEmailTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  return null;
};

// Booking submission endpoint
app.post('/api/bookings', upload.array('files', 3), async (req, res) => {
  try {
    const id = uuidv4();
    const {
      date,
      timeSlot,
      eventType,
      name,
      email,
      phone,
      location,
      details
    } = req.body;

    // Validate required fields
    if (!date || !timeSlot || !eventType || !name || !email || !phone || !location) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Prepare submission data
    const submission = {
      id,
      date,
      timeSlot,
      eventType,
      name,
      email,
      phone,
      location,
      details: details || '',
      files: (req.files || []).map(f => ({
        originalname: f.originalname,
        filename: f.filename,
        path: f.path,
        size: f.size,
        mimetype: f.mimetype
      })),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save to JSON file (simple storage - replace with DB in production)
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, `${id}.json`),
      JSON.stringify(submission, null, 2)
    );

    // Create secret view token
    const secret = process.env.VIEW_SECRET || 'changeme-to-secure-secret';
    const viewToken = Buffer.from(`${id}::${secret}`).toString('base64');
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    const viewUrl = `${baseUrl}/submission/${id}?token=${encodeURIComponent(viewToken)}`;

    // Send email notification
    const transporter = createEmailTransporter();
    
    if (transporter) {
      try {
        const fileList = submission.files.length > 0
          ? submission.files.map(f => `- ${f.originalname} (${(f.size / 1024).toFixed(2)} KB)`).join('\n')
          : 'No attachments';

        const emailHtml = `
          <h2>New Booking Request</h2>
          <p><strong>Booking ID:</strong> ${id}</p>
          
          <h3>Event Details</h3>
          <ul>
            <li><strong>Event Type:</strong> ${eventType}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Time:</strong> ${timeSlot}</li>
            <li><strong>Location:</strong> ${location}</li>
          </ul>
          
          <h3>Client Information</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
          
          <h3>Additional Details</h3>
          <p>${details || 'No additional details provided'}</p>
          
          <h3>Attachments</h3>
          <pre>${fileList}</pre>
          
          <p><a href="${viewUrl}">View Full Submission</a></p>
        `;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'no-reply@psycotikcrew.com',
          to: process.env.SITE_OWNER_EMAIL || 'booking@psycotikcrew.com',
          subject: `New Booking: ${eventType} - ${name} (${date})`,
          html: emailHtml,
          text: `New booking request from ${name}\n\nEvent: ${eventType}\nDate: ${date}\nTime: ${timeSlot}\nLocation: ${location}\n\nView: ${viewUrl}`
        });

        console.log('✓ Email notification sent');
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠ Email not configured. Submission saved but no notification sent.');
      console.log('View submission at:', viewUrl);
    }

    // Send confirmation email to customer
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'no-reply@psycotikcrew.com',
          to: email,
          subject: `Booking Request Received - ${eventType}`,
          html: `
            <h2>Thank you for your booking request!</h2>
            <p>Hi ${name},</p>
            <p>We've received your booking request for <strong>${eventType}</strong> on <strong>${date}</strong> at <strong>${timeSlot}</strong>.</p>
            <p>Our team will review your request and contact you within 24-48 hours to discuss details and provide a customized quote.</p>
            
            <h3>Your Booking Details</h3>
            <ul>
              <li><strong>Event Type:</strong> ${eventType}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${timeSlot}</li>
              <li><strong>Location:</strong> ${location}</li>
              <li><strong>Booking Reference:</strong> ${id}</li>
            </ul>
            
            <p>If you have any questions, feel free to contact us at booking@psycotikcrew.com or call +44 123 456 7890.</p>
            
            <p>Best regards,<br>Psycotik Crew Team</p>
          `,
          text: `Thank you for your booking request!\n\nWe've received your request for ${eventType} on ${date} at ${timeSlot}.\nBooking Reference: ${id}\n\nWe'll contact you within 24-48 hours.`
        });
      } catch (error) {
        console.error('Customer confirmation email error:', error);
      }
    }

    res.json({
      success: true,
      id,
      message: 'Booking submitted successfully',
      viewUrl
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({
      error: 'Failed to process booking',
      message: error.message
    });
  }
});

// Submission view endpoint
app.get('/submission/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;

    if (!token) {
      return res.status(403).send('Access denied - token required');
    }

    // Verify token
    const secret = process.env.VIEW_SECRET || 'changeme-to-secure-secret';
    const decodedToken = Buffer.from(token, 'base64').toString('utf8');
    const expectedToken = `${id}::${secret}`;

    if (decodedToken !== expectedToken) {
      return res.status(403).send('Access denied - invalid token');
    }

    // Load submission data
    const dataFile = path.join(__dirname, 'data', `${id}.json`);
    
    if (!fs.existsSync(dataFile)) {
      return res.status(404).send('Submission not found');
    }

    const submission = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

    // Render simple HTML view
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Submission - ${id}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #333; margin-top: 0; }
          h2 { color: #555; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
          .info-grid {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 10px;
            margin: 20px 0;
          }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            background: #FFC107;
            color: white;
            font-weight: bold;
          }
          .files {
            list-style: none;
            padding: 0;
          }
          .files li {
            padding: 10px;
            margin: 5px 0;
            background: #f9f9f9;
            border-left: 3px solid #4CAF50;
          }
          .files a {
            color: #4CAF50;
            text-decoration: none;
          }
          .files a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Booking Submission</h1>
          <p><strong>ID:</strong> ${submission.id}</p>
          <p><strong>Status:</strong> <span class="status">${submission.status.toUpperCase()}</span></p>
          <p><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
          
          <h2>Event Details</h2>
          <div class="info-grid">
            <div class="label">Event Type:</div>
            <div class="value">${submission.eventType}</div>
            
            <div class="label">Date:</div>
            <div class="value">${submission.date}</div>
            
            <div class="label">Time:</div>
            <div class="value">${submission.timeSlot}</div>
            
            <div class="label">Location:</div>
            <div class="value">${submission.location}</div>
          </div>
          
          <h2>Client Information</h2>
          <div class="info-grid">
            <div class="label">Name:</div>
            <div class="value">${submission.name}</div>
            
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
            
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${submission.phone}">${submission.phone}</a></div>
          </div>
          
          <h2>Additional Details</h2>
          <p>${submission.details || '<em>No additional details provided</em>'}</p>
          
          <h2>Attachments</h2>
          ${submission.files.length > 0 ? `
            <ul class="files">
              ${submission.files.map(f => `
                <li>
                  <a href="/uploads/${f.filename}" target="_blank">${f.originalname}</a>
                  <br><small>${(f.size / 1024).toFixed(2)} KB - ${f.mimetype}</small>
                </li>
              `).join('')}
            </ul>
          ` : '<p><em>No files attached</em></p>'}
        </div>
      </body>
      </html>
    `;

    res.send(html);

  } catch (error) {
    console.error('Submission view error:', error);
    res.status(500).send('Error loading submission');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 PSK Services Booking API Server`);
  console.log(`📡 Running on http://localhost:${PORT}`);
  console.log(`📧 Email configured: ${createEmailTransporter() ? '✓ Yes' : '✗ No (set SMTP_* or SENDGRID_API_KEY in .env)'}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/bookings - Submit booking`);
  console.log(`  GET  /submission/:id?token=XXX - View submission`);
  console.log(`  GET  /api/health - Health check\n`);
});

