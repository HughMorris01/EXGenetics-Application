/**
 * Excelsior Genetics - Master Logic
 * Refactored: Age Gate logic moved to views/partials/agegate.ejs
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const CONFIG = {
    animDuration: 600, 
    scrollThreshold: 300, 
  };

  // --- 1. MOBILE NAVIGATION ---
  const initMobileMenu = () => {
    const toggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-menu a');

    if (!toggle || !nav) return;

    // Toggle Menu State
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('is-active');
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
    });

    // Close Menu on Link Click
    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-active');
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  // --- 2. UTILITIES (Scroll & Date) ---
  const initUtilities = () => {
    // A. Copyright Year
    const yearSpan = document.querySelector('#copyrightYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // B. Back to Top Logic
    const topBtn = document.getElementById('backToTop');
    const footer = document.querySelector('.site-footer');

    if (topBtn && footer) {
      // Scroll Detection
      window.addEventListener('scroll', () => {
        const scrolled =
          document.documentElement.scrollTop || document.body.scrollTop;

        // Basic Visibility Check
        if (scrolled > CONFIG.scrollThreshold) {
          // Collision Detection with Footer
          const distToBottom =
            document.body.offsetHeight - (window.innerHeight + window.scrollY);
          const footerHeight = footer.offsetHeight;

          // If within footer zone, fade out
          if (distToBottom < footerHeight + 50) {
            topBtn.style.opacity = '0';
            topBtn.style.pointerEvents = 'none';
          } else {
            topBtn.style.opacity = '1';
            topBtn.style.pointerEvents = 'auto';
            topBtn.style.display = 'flex';
          }
        } else {
          // Hide at top
          topBtn.style.opacity = '0';
          topBtn.style.pointerEvents = 'none';
        }
      });

      // Click Action
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // --- INITIALIZE MODULES ---
  initMobileMenu();
  initUtilities();
});