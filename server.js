require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/denied', (req, res) => {
  res.sendFile(__dirname + '/public/views/denied.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/views/about.html');
});

app.get('/strains', (req, res) => {
  res.sendFile(__dirname + '/public/views/strains.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/views/contact.html');
});

app.post('/contact', (req, res) => {
  // 1. Honeypot Anti-Bot Check
  // If the hidden 'honeypot' field is filled, it's a bot.
  if (req.body.honeypot && req.body.honeypot !== '') {
    console.log('Bot submission blocked.');
    return res.send('success'); // Send success so the bot thinks it worked
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

  // Prepare the content for internal notification
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

  // Internal Notification (Sent to You and Jay)
  const adminMailOptions = {
    from: process.env.HI_EMAIL,
    to: [process.env.GREGS_EMAIL, process.env.JASONS_EMAIL], // Array sends to both
    subject: `EXG Portal: ${req.body.partnerType} Inquiry from ${req.body.name}`,
    text: internalMessage,
  };

  // Automated Confirmation (Sent to User)
  const confirmationOptions = {
    from: process.env.HI_EMAIL,
    to: req.body.email,
    subject: `Excelsior Genetics - Inquiry Received`,
    text: `Hi ${req.body.name}! We've received your inquiry regarding a ${req.body.partnerType} partnership. Our team is currently reviewing your message and we will get back to you shortly.`,
  };

  // Execution
  if (req.body.name !== undefined) {
    // Send Admin Notification
    transporter.sendMail(adminMailOptions, (err) => {
      if (err) console.log('Error sending admin notification:', err);
      else console.log('Successfully sent inquiry to Greg and Jason');
    });

    // Send User Confirmation
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

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

// Graceful Shutdown Logic
const gracefulShutdown = () => {
  console.log('SIGTERM/SIGINT signal received: closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed. Port 3000 is now free.');
    // If you add a database later, close the connection here
    process.exit(0);
  });

  // Force shutdown after 10s if graceful close fails
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
};
