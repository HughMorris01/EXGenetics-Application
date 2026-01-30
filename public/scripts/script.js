/* -----------------------------------------
   Excelsior Genetics - Core Logic
----------------------------------------- */

/* --- Age Verification Logic --- */
const setupAgeGate = () => {
  const overlay = document.getElementById('age-overlay');
  const verifyBtn = document.getElementById('age-verify-yes');
  const exitBtn = document.getElementById('age-verify-no');

  if (!overlay) return;

  // Check if the "cookie" exists in LocalStorage
  if (localStorage.getItem('exg_age_verified') === 'true') {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex'; // Ensure it shows if not verified
  }

  verifyBtn.addEventListener('click', () => {
    overlay.style.opacity = '0';
    // Set the "cookie" so it doesn't pop up again
    localStorage.setItem('exg_age_verified', 'true');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 600);
  });

  exitBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
};

// Add this to your existing DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
  setupAgeGate();
  // ... your other existing JS (copyright year, etc)
});

window.addEventListener('DOMContentLoaded', (event) => {
  // 1. Mobile Menu Toggle (Pure JS Replacement for Bootstrap)
  const menuToggle = document.querySelector('#mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      // Toggles classes for the hamburger animation and menu visibility
      menuToggle.classList.toggle('is-active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked (useful for mobile UX)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Automated Copyright Year
  const yearElement = document.querySelector('#copyrightYear');
  if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
  }
});

/* -----------------------------------------
   Back to Top Button Logic
----------------------------------------- */
let mybutton = document.getElementById('backToTop');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (mybutton) {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
