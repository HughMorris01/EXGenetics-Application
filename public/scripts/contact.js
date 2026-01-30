const contactForm = document.querySelector('.portal-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: contactForm.querySelector('input[name="name"]').value,
    email: contactForm.querySelector('input[name="email"]').value,
    partnerType: contactForm.querySelector('select[name="type"]').value, // This line is the fix
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
        alert('Thank you! Your inquiry has been sent to our team.');
        contactForm.reset();
      } else {
        alert('There was an issue sending your message. Please try again.');
      }
    });
});
