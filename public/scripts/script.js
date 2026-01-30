/* -----------------------------------------
   Excelsior Genetics - Core Logic
----------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  /* --- 1. Age Verification Logic --- */
  const overlay = document.getElementById('age-overlay');
  const verifyBtn = document.getElementById('age-verify-yes');
  const exitBtn = document.getElementById('age-verify-no');

  if (overlay) {
    // Check if verified in LocalStorage
    if (localStorage.getItem('exg_age_verified') === 'true') {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'flex';
      overlay.style.opacity = '1'; // Ensure visibility on mobile
    }

    verifyBtn.addEventListener('click', () => {
      overlay.style.opacity = '0';
      localStorage.setItem('exg_age_verified', 'true');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 600);
    });

    exitBtn.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  /* --- 2. Mobile Menu Toggle --- */
  const menuToggle = document.querySelector('#mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* --- 3. Automated Copyright Year --- */
  const yearElement = document.querySelector('#copyrightYear');
  if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
  }
});

/* --- 4. Back to Top Button Logic --- */
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const mybutton = document.getElementById('backToTop');
  if (mybutton) {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      mybutton.style.display = 'flex';
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
