const contactForm = document.querySelector('.portal-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

// Close Modal Logic
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: contactForm.querySelector('input[name="name"]').value,
    email: contactForm.querySelector('input[name="email"]').value,
    phone: contactForm.querySelector('input[name="phone"]').value, // <--- ADD THIS
    partnerType: contactForm.querySelector('select[name="type"]').value,
    business: contactForm.querySelector('input[name="business"]').value,
    message: contactForm.querySelector('textarea[name="message"]').value,
    honeypot: document.getElementById('honeypot').value,
  };

  fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((res) => res.text())
    .then((data) => {
      if (data === 'success') {
        // SHOW CUSTOM MODAL instead of alert
        successModal.style.display = 'flex';
        contactForm.reset();
      } else {
        alert('There was an issue sending your message. Please try again.');
      }
    });
});
