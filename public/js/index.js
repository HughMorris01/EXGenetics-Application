document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Days Waiting Counter ---
  const startDate = new Date('2023-11-15');
  const today = new Date();
  const timeDiff = today - startDate;
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  const counterElement = document.getElementById('days-waiting');
  if (counterElement) {
    counterElement.textContent = dayDiff;
  }

  // --- 2. Bi-Directional Infinite Carousel ---
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // Configuration
  const SPEED_NORMAL = 0.5; // Passive scroll speed (always moves left)
  const SPEED_FAST = 15;    // Snap speed when button clicked
  
  let currentOffset = 0;
  let targetSnap = null;    // Where we want to end up
  let isSnapping = false;

  // Helper: Get width of one card + its margin
  const getSlideWidth = () => {
    const firstSlide = track.firstElementChild;
    if (!firstSlide) return 0;
    const style = window.getComputedStyle(firstSlide);
    const marginRight = parseFloat(style.marginRight) || 0;
    return firstSlide.getBoundingClientRect().width + marginRight;
  };

  const animate = () => {
    const slideWidth = getSlideWidth();
    if (!slideWidth) {
      requestAnimationFrame(animate);
      return;
    }

    // --- MOVEMENT LOGIC ---
    if (isSnapping && targetSnap !== null) {
      // We are snapping to a specific point (Next or Prev)
      const diff = targetSnap - currentOffset;
      
      if (Math.abs(diff) < SPEED_FAST) {
        // Close enough: Snap exactly
        currentOffset = targetSnap;
        isSnapping = false;
        targetSnap = null;
      } else {
        // Move fast towards target (Math.sign handles direction)
        currentOffset += Math.sign(diff) * SPEED_FAST;
      }
    } else {
      // Passive Mode: Always drift slowly to the left
      currentOffset -= SPEED_NORMAL;
    }

    // --- INFINITE LOOP LOGIC (Boundaries) ---

    // 1. Left Boundary: First slide has gone off-screen
    if (currentOffset <= -slideWidth) {
      const firstSlide = track.firstElementChild;
      track.appendChild(firstSlide); // Move head to tail
      currentOffset += slideWidth;   // Adjust coordinate to match visual change
      
      // If snapping, adjust target too so we don't lose our spot
      if (targetSnap !== null) targetSnap += slideWidth;
    }

    // 2. Right Boundary: We are pulling empty space from the left
    // (This happens when we click "Prev" repeatedly)
    if (currentOffset > 0) {
      const lastSlide = track.lastElementChild;
      track.prepend(lastSlide);      // Move tail to head
      currentOffset -= slideWidth;   // Adjust coordinate
      
      if (targetSnap !== null) targetSnap -= slideWidth;
    }

    // Apply the transform
    track.style.transform = `translateX(${currentOffset}px)`;
    requestAnimationFrame(animate);
  };

  // --- Button Events ---

  nextBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    // Move LEFT (Negative)
    targetSnap = Math.round((currentOffset - slideWidth) / slideWidth) * slideWidth;
    isSnapping = true;
  });

  prevBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    
    // SAFETY: If we are at 0 (start), we need to prepend an item *immediately*
    // before we try to move right, otherwise we see empty space.
    if (currentOffset >= 0) {
      const lastSlide = track.lastElementChild;
      track.prepend(lastSlide);
      currentOffset -= slideWidth;
    }

    // Move RIGHT (Positive)
    // We snap to the next "grid" position to the right
    targetSnap = Math.round((currentOffset + slideWidth) / slideWidth) * slideWidth;
    isSnapping = true;
  });

  // Start the engine
  requestAnimationFrame(animate);
});