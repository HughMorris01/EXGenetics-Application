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
      document.body.classList.add('lock-scroll');
    }

    // B. Handle "I am 21+" Click
    if (btnYes) {
      btnYes.addEventListener('click', () => {
        sessionStorage.setItem('exg_age_verified', 'true');
        document.body.classList.remove('lock-scroll');
        
        const blocker = document.getElementById('age-gate-blocker');
        if (blocker) blocker.remove();

        // TRIGGER ANIMATION:
        ageOverlay.classList.add('rect-shrink');
        ageOverlay.classList.add('final-fade');

        // CLEANUP: Matches the exact 1.6s CSS footprint
        setTimeout(() => {
          ageOverlay.style.display = 'none';
        }, 1600); 
      });
    }

    // C. Handle "Exit" Click (The Fix)
    if (btnNo) {
      btnNo.addEventListener('click', () => {
        // Redirect them to your existing denied page
        window.location.href = '/denied';
      });
    }

    // --- INFINITE SCROLL CAROUSEL ---
  const initCarousel = () => {
    const container = document.querySelector('.carousel-track-container');
    const track = document.querySelector('.carousel-track');
    
    if (!container || !track) return;

    // 1. Create a massive runway (copy it 6 times just like Northern Legacy)
    const originalContent = track.innerHTML;
    // .repeat() is a clean way to duplicate the string 6 times
    track.innerHTML = originalContent.repeat(6); 

    let isInteracting = false;
    let animationId;

    // 2. Start in the dead center so they can instantly swipe left
    // We use a tiny timeout to ensure the DOM has calculated the new width first
    setTimeout(() => {
      container.scrollLeft = container.scrollWidth / 2;
    }, 100);

    // 3. Pause auto-scroll on touch/hover
    container.addEventListener('mouseenter', () => isInteracting = true);
    container.addEventListener('mouseleave', () => isInteracting = false);
    container.addEventListener('touchstart', () => isInteracting = true);
    container.addEventListener('touchend', () => setTimeout(() => isInteracting = false, 500));

    // 4. Continuous rolling logic
    const autoScroll = () => {
      if (!isInteracting) {
        container.scrollLeft += 0.8; 
      }

      const halfWidth = container.scrollWidth / 2;
      
      // Use the exact same thresholds from your React component
      if (container.scrollLeft >= halfWidth + 500) {
        container.scrollLeft -= halfWidth;
      } else if (container.scrollLeft <= 5) { // The '5' buffer prevents mobile wall-bouncing
        container.scrollLeft += halfWidth;
      }
      
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
  };

  initCarousel();
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
      document.body.classList.toggle('lock-scroll');
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-active');
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('lock-scroll');
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