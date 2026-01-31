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

// --- JOKE QUEUE ---
const cannabisJokes = [
  'What do you call a potato that smokes cannabis? A baked potato.....',
  "To be blunt... I think we're going to be best buds.....",
  "Why is a roach clip called a roach clip? Because 'pot holder' was taken.....",
  'What do you call a cannabis plant with ambition? A high achiever.....',
  "Why don't joints last long at work? They always get burned out.....",
  "What is a cannabis plant's favorite drink? Root beer.",
  'Why did the plant go to therapy? To get to the root of its problems.....',
];

const getRandomJoke = () =>
  cannabisJokes[Math.floor(Math.random() * cannabisJokes.length)];

// --- 3. CONTACT FORM LOGIC ---
app.post('/contact', (req, res) => {
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

  const selectedJoke = getRandomJoke();

  // SHARED SIGNATURE HTML
  const signatureHTML = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee;">
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #000;">The Bot-any Dept. (Automated)</p>
      <p style="margin: 2px 0; font-size: 14px; color: #f8c25d; font-weight: 600;">Digital Cultivation Liaison | Excelsior Genetics, LLC</p>
      <p style="margin: 2px 0; font-size: 14px; color: #333;">42901 NY-12, Suite B | Alexandria Bay, NY 13607</p>
      <p style="margin: 2px 0; font-size: 14px;"><a href="https://www.exgenetics.com" style="color: #333; text-decoration: none; font-weight: 600;">www.exgenetics.com</a></p>
    </div>
  `;

  // LEGAL FOOTER HTML
  const legalFooterHTML = `
    <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; font-size: 11px; color: #999999; text-align: justify; line-height: 1.4; border-top: 1px solid #eeeeee;">
      <p style="margin-bottom: 10px; margin-top: 0;"><strong style="color: #666666;">Confidentiality Notice:</strong><br>
      This email and any accompanying attachments are intended solely for the designated recipient(s)...</p>
      <p style="margin-bottom: 0;"><strong style="color: #666666;">Cannabis Industry Disclaimer:</strong><br>
      Excelsior Genetics, LLC operates in the cannabis sector...</p>
    </div>
  `;

  // 1. ADMIN EMAIL OPTIONS (Internal - Now with Logo & Phone)
  const adminMailOptions = {
    from: `"EXG Digital Liaison" <${process.env.HI_EMAIL}>`,
    to: [process.env.GREGS_EMAIL, process.env.JASONS_EMAIL],
    subject: `EXG Portal: ${req.body.partnerType} Inquiry from ${req.body.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
        
        <div style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 3px solid #f8c25d;">
          <img src="https://exgenetics.com/assets/logo_clear_bg.png" alt="Excelsior Genetics" width="150" style="display: block; margin: 0 auto;">
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hey Guys,</p>
          <p>We just received this message through the website. I sent them a confirmation email, but you'll want to reach out whenever you have a few minutes.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #f8c25d; margin: 25px 0;">
            <p style="margin-top:0; font-size: 14px; text-transform: uppercase; color: #888; font-weight: bold;">Inquiry Details</p>
            <ul style="padding-left: 20px; margin-bottom: 20px;">
              <li><strong>Name:</strong> ${req.body.name}</li>
              <li><strong>Email:</strong> ${req.body.email}</li>
              <li><strong>Phone:</strong> ${req.body.phone || 'N/A'}</li>
              <li><strong>Type:</strong> ${req.body.partnerType}</li>
              <li><strong>Business:</strong> ${req.body.business || 'N/A'}</li>
            </ul>
            <p style="margin-top:0; font-size: 14px; text-transform: uppercase; color: #888; font-weight: bold;">Message</p>
            <p style="font-style: italic;">"${req.body.message}"</p>
          </div>

          <p style="margin-top: 30px; color: #555; text-align: center;">
            I shared this <em><strong>Joke of the Day:</strong> "${selectedJoke}"</em>
          </p>
          
          ${signatureHTML}
        </div>
      </div>
    `,
  };

  // 2. USER CONFIRMATION OPTIONS (External)
  const confirmationOptions = {
    from: `"EXG Digital Liaison" <${process.env.HI_EMAIL}>`,
    to: req.body.email,
    subject: `Received: Your Inquiry to Excelsior Genetics`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6; border: 1px solid #e0e0e0;">
        
        <div style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 3px solid #f8c25d;">
          <img src="https://exgenetics.com/assets/logo_clear_bg.png" alt="Excelsior Genetics" width="150" style="display: block; margin: 0 auto;">
        </div>

        <div style="padding: 30px 25px; background-color: #ffffff;">
          <h2 style="color: #000000; margin-top: 0; font-weight: 700;">Hi ${req.body.name},</h2>
          
          <p>Thank you for reaching out to <strong>Excelsior Genetics</strong>.</p>
          
          <p>We have received your inquiry through the partnership portal on our website. Our leadership team is currently reviewing your message to determine how we can collaborate to bring world-class quality to the North Country.</p>
          
          <p>You can expect to hear from a human member of our team shortly.</p>
          
          <p style="margin-top: 30px; color: #555; text-align: center;">
            <em><strong>Joke of the Day:</strong> "${selectedJoke}"</em>
          </p>
          
          ${signatureHTML}
        </div>

        ${legalFooterHTML}
      </div>
    `,
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
