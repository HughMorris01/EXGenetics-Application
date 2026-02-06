document.addEventListener('DOMContentLoaded', () => {
  const startDate = new Date('2023-11-15');
    const today = new Date();
    
    // Calculate difference in time (milliseconds)
    const timeDiff = today - startDate;
    
    // Convert to days (1000ms * 60s * 60m * 24h)
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Update the number
    const counterElement = document.getElementById('days-waiting');
    if (counterElement) {
      counterElement.textContent = dayDiff;
    }


  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // --- Configuration ---
  const SPEED_NORMAL = 0.5; // Auto-scroll speed
  const SPEED_FAST = 15;    // Button click speed
  
  let currentOffset = 0;
  let targetSnap = null;    // Used for button clicks
  let isSnapping = false;

  // Measure one slide (width + gap)
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

    // Determine how much to move this frame
    let moveAmount = SPEED_NORMAL;

    // If snapping (button clicked), move faster towards the target
    if (isSnapping && targetSnap !== null) {
      // Calculate distance remaining to the snap point
      // (The snap point is essentially "one slide width away")
      const distance = Math.abs(targetSnap - currentOffset);
      
      if (distance < SPEED_FAST) {
        // We are close enough, snap exactly and stop fast mode
        moveAmount = distance; 
        isSnapping = false;
        targetSnap = null;
      } else {
        moveAmount = SPEED_FAST;
      }
    }

    // Apply movement (negative moves left)
    currentOffset -= moveAmount;

    // --- INFINITE LOOP LOGIC ---
    // If the first slide has gone completely off-screen to the left...
    if (Math.abs(currentOffset) >= slideWidth) {
      // 1. Move the first slide to the very end of the list
      const firstSlide = track.firstElementChild;
      track.appendChild(firstSlide);
      
      // 2. Instantly reset the offset by adding one slide width back
      // This makes it look seamless because we physically moved the DOM element
      currentOffset += slideWidth;
      
      // If we were snapping, adjust the target because our coordinate system just shifted
      if (targetSnap !== null) {
        targetSnap += slideWidth;
      }
    }

    // Apply the visual transform
    track.style.transform = `translateX(${currentOffset}px)`;

    requestAnimationFrame(animate);
  };

  // --- Button Events ---
  
  nextBtn.addEventListener('click', () => {
    const slideWidth = getSlideWidth();
    // Set a target: "Slide a full card width from where we are now"
    // Since we are moving left (negative), we subtract width
    targetSnap = currentOffset - slideWidth;
    isSnapping = true;
  });

  // Prev button logic (Optional: For a conveyor, usually we just speed up forward, 
  // but if you want to reverse, it's complex. Let's make Prev just "Pause" or behave like Next for now)
  prevBtn.addEventListener('click', () => {
     // For a true infinite conveyor, "Prev" often just accelerates forward too 
     // unless we write reverse logic. Let's keep it simple: Both buttons advance content.
     const slideWidth = getSlideWidth();
     targetSnap = currentOffset - slideWidth;
     isSnapping = true;
  });

  // Start the engine
  requestAnimationFrame(animate);
});