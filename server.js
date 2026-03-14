import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Custom Modules
import { petitionMiddleware } from './middleware/petition.js';
import pageRoutes from './routes/pageRoutes.js';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

// --- 1. CONFIGURATION ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. MIDDLEWARE ---
app.use(petitionMiddleware);

// --- 3. ROUTES ---
app.use('/', pageRoutes);

// --- 4. SERVER INIT & SHUTDOWN LOGIC ---
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

const gracefulShutdown = () => {
  console.log('SIGTERM/SIGINT signal received: closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed. Port 3000 is now free.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);