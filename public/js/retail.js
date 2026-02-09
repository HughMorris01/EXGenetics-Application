document.addEventListener('DOMContentLoaded', () => {
  // 1. Set your specific start date (Year, Month-1, Day)
  const startDate = new Date(2023, 10, 17); 

  const updateClock = () => {
    const today = new Date();
    
    // 2. Total difference in milliseconds
    const diff = Math.abs(today - startDate);

    // 3. Time Calculations
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // 4. Formatting (Adds a leading zero if the number is less than 10)
    const d = days;
    const h = hours < 10 ? '0' + hours : hours;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = seconds < 10 ? '0' + seconds : seconds;

    // 5. Update the Display
    const clockElement = document.getElementById('days-waiting');
    if (clockElement) {
      clockElement.textContent = `${d}:${h}:${m}:${s}`;
    }
  };

  // Run immediately so there's no 1-second delay on refresh
  updateClock();
  
  // Update every 1 second
  setInterval(updateClock, 1000);
});