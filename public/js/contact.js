const contactForm = document.querySelector('.portal-form');
const submitBtn = contactForm ? contactForm.querySelector('.btn-portal') : null;
const statusModal = document.getElementById('status-modal');
const closeModalBtn = document.getElementById('close-modal');

// --- 1. Button State Management ---
const setButtonLoading = (isLoading) => {
  if (!submitBtn) return;
  if (isLoading) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message';
  }
};

// --- 2. Dual-Purpose Modal Controller ---
const showStatusModal = (type, title, message) => {
  const titleEl = document.getElementById('modal-title');
  const msgEl = document.getElementById('modal-message');
  const iconContainer = document.getElementById('modal-icon-container');

  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = message;
  
  if (iconContainer) {
    if (type === 'success') {
      iconContainer.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #36f53f;"></i>';
    } else {
      iconContainer.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ff4d4d;"></i>';
    }
  }
  
  if (statusModal) statusModal.style.display = 'flex';
};

// Close Modal Event
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    statusModal.style.display = 'none';
  });
}

// --- 3. Form Submission Handler (Integrated with reCAPTCHA v3) ---
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setButtonLoading(true);

    // Trigger Google reCAPTCHA validation invisible check
    grecaptcha.ready(function() {
      // IMPORTANT: Replace 'YOUR_SITE_KEY' below with your actual Google Site Key
      grecaptcha.execute('6LeRhnIsAAAAAMku8cBhoSbLDQ7Q80D3TyTf9wAr', {action: 'contact'}).then(function(token) {
        
        // Build the payload payload ONLY after getting the token
        const formData = {
          name: contactForm.querySelector('input[name="name"]').value,
          email: contactForm.querySelector('input[name="email"]').value,
          phone: contactForm.querySelector('input[name="phone"]').value,
          partnerType: contactForm.querySelector('select[name="partnerType"]').value,
          business: contactForm.querySelector('input[name="business"]').value,
          message: contactForm.querySelector('textarea[name="message"]').value,
          honeypot: document.getElementById('honeypot').value,
          recaptcha_token: token // <--- Pass the generated token to the server
        };

        // Send the AJAX request to your Express server
        fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((res) => res.text())
          .then((data) => {
            setButtonLoading(false);
            if (data === 'success') {
              showStatusModal('success', 'Inquiry Received', 'Thank you for reaching out! A confirmation has been sent to your inbox.');
              contactForm.reset();
            } else if (data === 'captcha_error') {
              // Updated error message to reflect bot detection instead of math failure
              showStatusModal('error', 'Verification Failed', 'Our security system flagged this request. Please try again later.');
            } else {
              showStatusModal('error', 'Submission Failed', 'Our system is having trouble. Please check your credentials or email us directly.');
            }
          })
          .catch((err) => {
            setButtonLoading(false);
            console.error(err);
            showStatusModal('error', 'Network Error', 'Something went wrong with the connection.');
          });
      });
    });
  });
}

// --- 4. Character Counter Logic ---
const messageInput = document.querySelector('textarea[name="message"]');
const charCounter = document.getElementById('char-counter');
const maxLength = 1000;

if (messageInput && charCounter) {
  messageInput.addEventListener('input', () => {
    const currentLength = messageInput.value.length;
    const remaining = maxLength - currentLength;

    charCounter.innerText = `${remaining} characters remaining`;

    // Add 'warning' class when under 100 characters
    if (remaining < 100) {
      charCounter.classList.add('warning');
    } else {
      charCounter.classList.remove('warning');
    }

    // Add 'limit-reached' class when at 0
    if (remaining === 0) {
      charCounter.classList.add('limit-reached');
    } else {
      charCounter.classList.remove('limit-reached');
    }
  });
}