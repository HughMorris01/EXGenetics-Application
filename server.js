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
      user: process.env.GREGS_EMAIL,
      pass: process.env.GREGS_PASSWORD,
    },
  });

  const mailOptions1 = {
    from: process.env.GREGS_EMAIL,
    to: process.env.GREGS_EMAIL,
    subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
    text: req.body.message,
  };

  const mailOptions2 = {
    from: process.env.GREGS_EMAIL,
    to: process.env.JASONS_EMAIL,
    subject: `Message from: ${req.body.name} <${req.body.email}> : ${req.body.subject}`,
    text: req.body.message,
  };

  const confirmationOptions = {
    from: process.env.GREGS_EMAIL,
    to: req.body.email,
    subject: `Message Receipt Confirmation`,
    text: "We've received the message that you sent through our website and will get back to you shortly.",
  };

  if (req.body.name !== undefined) {
    transporter.sendMail(mailOptions1, (err, info) => {
      if (err) {
        console.log(err);
        res.send('error');
      } else {
        res.send('success');
        console.log('successfully sent email');
      }
    });

    transporter.sendMail(mailOptions2, (err, info) => {
      if (err) {
        console.log(err);
        res.send('error');
      } else {
        res.send('success');
        console.log('successfully sent email');
      }
    });

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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
