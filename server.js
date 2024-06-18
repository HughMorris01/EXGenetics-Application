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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
