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
  //   console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.HI_EMAIL,
      pass: process.env.HI_EMAIL_PASSWORD,
    },
  });

  const mailOptions1 = {
    from: process.env.HI_EMAIL,
    to: process.env.GREGS_EMAIL,
    subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
    text: req.body.message,
  };

  // const mailOptions2 = {
  //   from: process.env.HI_EMAIL,
  //   to: process.env.JASONS_EMAIL,
  //   subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
  //   text: req.body.message,
  // };

  const confirmationOptions = {
    from: process.env.HI_EMAIL,
    to: req.body.email,
    subject: `Message Receipt Confirmation`,
    text: "Hi! We've received the message that you sent through our website and will get back to you shortly.",
  };

  if (req.body.name !== undefined) {
    transporter.sendMail(mailOptions1, (err, info) => {
      if (err) {
        console.log(err);
        res.send('error');
      } else {
        console.log('successfully sent email');
        res.send('success');
      }
    });

    // transporter.sendMail(mailOptions2, (err, info) => {
    //   if (err) {
    //     console.log(err);
    //     res.send('error');
    //   } else {
    //     res.send('success');
    //     console.log('successfully sent email');
    //   }
    // });

    transporter.sendMail(confirmationOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.send('error');
      } else {
        res.send('success');
        console.log('successfully sent email');
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
