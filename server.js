require('dotenv').config(); // simplified path
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Added for safer file paths
const port = process.env.PORT || 3000;

const app = express();

// --- 1. CONFIGURATION ---
// Tell Express to use EJS for templates
app.set('view engine', 'ejs');
// Tell Express your templates are in the 'views' folder
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Serve static assets (CSS, JS, Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. PAGE ROUTES ---
// Notice how much cleaner this is? No more full file paths.

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Northern Legacy | Visionary Cultivation',
    currentPath: '/',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Our Story | Excelsior Genetics',
    currentPath: '/about',
  });
});

app.get('/strains', (req, res) => {
  res.render('strains', {
    title: 'Featured Strains | Northern Legacy',
    currentPath: '/strains',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | Partnership Inquiry',
    currentPath: '/contact',
  });
});

app.get('/denied', (req, res) => {
  res.render('denied', { title: 'Access Denied' });
});

// --- 3. CONTACT FORM LOGIC (Unchanged) ---
app.post('/contact', (req, res) => {
  // Honeypot Anti-Bot Check
  if (req.body.honeypot && req.body.honeypot !== '') {
    console.log('Bot submission blocked.');
    return res.send('success');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.HI_EMAIL,
      pass: process.env.HI_EMAIL_PASSWORD,
    },
  });

  const internalMessage = `
    New Partnership Inquiry:
    ------------------------
    Type: ${req.body.partnerType}
    Name: ${req.body.name}
    Business: ${req.body.business || 'N/A'}
    Email: ${req.body.email}
    
    Message:
    ${req.body.message}
  `;

  const adminMailOptions = {
    from: process.env.HI_EMAIL,
    to: [process.env.GREGS_EMAIL, process.env.JASONS_EMAIL],
    subject: `EXG Portal: ${req.body.partnerType} Inquiry from ${req.body.name}`,
    text: internalMessage,
  };

  const confirmationOptions = {
    from: process.env.HI_EMAIL,
    to: req.body.email,
    subject: `Excelsior Genetics - Inquiry Received`,
    text: `Hi ${req.body.name}! We've received your inquiry regarding a ${req.body.partnerType} partnership. Our team is currently reviewing your message and we will get back to you shortly.`,
  };

  if (req.body.name !== undefined) {
    transporter.sendMail(adminMailOptions, (err) => {
      if (err) console.log('Error sending admin notification:', err);
      else console.log('Successfully sent inquiry to Greg and Jason');
    });

    transporter.sendMail(confirmationOptions, (err) => {
      if (err) {
        console.log('Error sending user confirmation:', err);
        return res.send('error');
      } else {
        console.log('Successfully sent confirmation to user');
        res.send('success');
      }
    });
  }
});

// --- 4. SERVER START ---
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

// Graceful Shutdown Logic
const gracefulShutdown = () => {
  console.log('SIGTERM/SIGINT signal received: closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed. Port 3000 is now free.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
