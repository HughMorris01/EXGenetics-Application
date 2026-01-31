/**
 * Excelsior Genetics - Master Logic
 * Refactored for modularity, performance, and stability.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. CONFIGURATION (The Control Center) ---
  const CONFIG = {
    ageStorageKey: 'exg_age_verified', // Key for LocalStorage
    animDuration: 600, // Matches CSS transition time
    scrollThreshold: 300, // Scroll distance before button appears
    redirectUrl: 'https://google.com', // Where under-21s go
  };

  // --- 2. AGE VERIFICATION SYSTEM ---
  const initAgeGate = () => {
    const overlay = document.getElementById('age-overlay');
    if (!overlay) return;

    // Check LocalStorage: If verified, hide immediately
    if (localStorage.getItem(CONFIG.ageStorageKey) === 'true') {
      overlay.style.display = 'none';
      return;
    }

    // Ensure visibility if not verified
    overlay.style.display = 'flex';

    // "Yes" Action
    document.getElementById('age-verify-yes')?.addEventListener('click', () => {
      overlay.style.opacity = '0'; // Trigger CSS Fade
      localStorage.setItem(CONFIG.ageStorageKey, 'true');

      // Remove from DOM after animation completes
      setTimeout(() => {
        overlay.style.display = 'none';
      }, CONFIG.animDuration);
    });

    // "No" Action
    document.getElementById('age-verify-no')?.addEventListener('click', () => {
      window.location.href = CONFIG.redirectUrl;
    });
  };

  // --- 3. MOBILE NAVIGATION ---
  const initMobileMenu = () => {
    const toggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-menu a');

    if (!toggle || !nav) return;

    // Toggle Menu State
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('is-active');
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive); // Accessibility Win
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

  // --- 4. UTILITIES (Scroll & Date) ---
  const initUtilities = () => {
    // A. Copyright Year
    const yearSpan = document.querySelector('#copyrightYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // B. Back to Top Logic (Jitter-Free Fade Version)
    const topBtn = document.getElementById('backToTop');
    const footer = document.querySelector('.site-footer');

    if (topBtn && footer) {
      // 1. Scroll Detection
      window.addEventListener('scroll', () => {
        const scrolled =
          document.documentElement.scrollTop || document.body.scrollTop;

        // Basic Visibility Check
        if (scrolled > CONFIG.scrollThreshold) {
          // COLLISION DETECTION:
          // Check distance to the bottom of the page
          // (window.innerHeight + window.scrollY) = Current Viewport Bottom
          const distToBottom =
            document.body.offsetHeight - (window.innerHeight + window.scrollY);
          const footerHeight = footer.offsetHeight;

          // If we are within the footer zone (plus 50px buffer), fade out
          if (distToBottom < footerHeight + 50) {
            topBtn.style.opacity = '0';
            topBtn.style.pointerEvents = 'none'; // Prevent clicking while invisible
          } else {
            topBtn.style.opacity = '1';
            topBtn.style.pointerEvents = 'auto';
            topBtn.style.display = 'flex'; // Ensure it's visible for the fade in
          }
        } else {
          // Hide when at the top of the page
          topBtn.style.opacity = '0';
          topBtn.style.pointerEvents = 'none';
        }
      });

      // 2. Click Action (Smooth Scroll)
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // --- INITIALIZE ALL MODULES ---
  initAgeGate();
  initMobileMenu();
  initUtilities();
});
