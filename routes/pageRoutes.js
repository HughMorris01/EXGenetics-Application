import express from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// --- PAGE ROUTES ---
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Excelsior Genetics | Visionary Cultivation',
    currentPath: '/',
    pageScript: '/js/index.js',
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Our Story | Excelsior Genetics',
    currentPath: '/about',
  });
});

router.get('/cultivation', (req, res) => {
  res.render('cultivation', {
    title: 'Cultivation Science | Excelsior Genetics',
    currentPath: '/cultivation',
  });
});

router.get('/strains', (req, res) => {
  res.render('strains', {
    title: 'Featured Strains | Northern Legacy',
    currentPath: '/strains',
  });
});

router.get('/retail', (req, res) => {
  res.render('retail', {
    title: "Northern Legacy | 1000 Islands' Dispensary",
    currentPath: '/retail',
    pageScript: '/js/retail.js',
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us | Partnership Inquiry',
    currentPath: '/contact',
    pageScript: '/js/contact.js'
  });
});

router.get('/denied', (req, res) => {
  res.render('denied', { 
    title: 'Access Denied',
    currentPath: '/denied' 
  });
});

// --- API ROUTES ---
router.post('/contact', handleContactSubmit);

// --- 404 CATCH-ALL ---
// (This must stay at the very bottom of the router chain)
router.use((req, res) => {
  res.status(404).render('404', {
    title: '404 | Lost in the Clouds',
    currentPath: '/404'
  });
});

export default router;