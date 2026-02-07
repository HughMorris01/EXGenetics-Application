/**
 * Excelsior Genetics - Master Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const CONFIG = {
    animDuration: 600, 
    scrollThreshold: 300,
    mobileBreakpoint: 768, // Matches your CSS media query
  };

  // --- 1. AGE GATE MODULE ---
  const initAgeGate = () => {
    const ageOverlay = document.getElementById('age-overlay');
    const btnYes = document.getElementById('btn-verify-yes');
    const btnNo = document.getElementById('btn-verify-no');

    if (!ageOverlay) return;

    // A. Check Session immediately
    if (sessionStorage.getItem('exg_age_verified') !== 'true') {
      ageOverlay.style.display = 'flex';
      
      // FIX: LOCK THE SCROLL
      // This stops the user from scrolling the background, 
      // which fixes the "flashing blur" glitch.
      document.body.classList.add('lock-scroll');
    }

    // B. Handle "I am 21+" Click
    if (btnYes) {
      btnYes.addEventListener('click', () => {
        sessionStorage.setItem('exg_age_verified', 'true');

        // FIX: UNLOCK THE SCROLL
        // Allow the user to scroll again immediately
        document.body.classList.remove('lock-scroll');

        // TRIGGER ANIMATION:
        ageOverlay.classList.add('rect-shrink');
        ageOverlay.classList.add('final-fade');

        // CLEANUP:
        setTimeout(() => {
          ageOverlay.style.display = 'none';
        }, 2200); 
      });
    }
  }

  // --- 2. MOBILE NAVIGATION ---
  const initMobileMenu = () => {
    const toggle = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-menu a');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('is-active');
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-active');
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  // --- 3. UTILITIES (Scroll & Date) ---
  const initUtilities = () => {
    // A. Copyright Year
    const yearSpan = document.querySelector('#copyrightYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // B. Back to Top Logic (Hybrid: Collision detection on Mobile only)
    const topBtn = document.getElementById('backToTop');
    const footer = document.querySelector('.site-footer');
    
    if (topBtn) {
      // Helper to Hide/Show
      const toggleBtn = (show) => {
        topBtn.style.opacity = show ? '1' : '0';
        topBtn.style.pointerEvents = show ? 'auto' : 'none';
      };

      window.addEventListener('scroll', () => {
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;

        // 1. If we are at the top, always hide
        if (scrolled <= CONFIG.scrollThreshold) {
          toggleBtn(false);
          return;
        }

        // 2. If we are scrolled down...
        if (isMobile && footer) {
          // MOBILE: Check for collision with footer
          const distToBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY);
          const footerHeight = footer.offsetHeight;

          // If button is entering footer territory, hide it
          if (distToBottom < footerHeight + 20) {
            toggleBtn(false);
          } else {
            toggleBtn(true);
          }
        } else {
          // DESKTOP: Always show (no collision check needed)
          toggleBtn(true);
        }
      });

      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // --- INITIALIZE MODULES ---
  initAgeGate();
  initMobileMenu();
  initUtilities();
});