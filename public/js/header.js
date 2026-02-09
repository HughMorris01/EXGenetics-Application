/**
 * header.js
 * Handles the transparent-to-black transition and hiding the top banner.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const scrollThreshold = 50; // Pixel point where the transition happens

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
});