const contactForm = document.querySelector('.portal-form');
const submitBtn = contactForm ? contactForm.querySelector('.btn-portal') : null;
const statusModal = document.getElementById('status-modal');
const closeModalBtn = document.getElementById('close-modal');



// --- 1. CAPTCHA REFRESH LOGIC (NEW) ---
const refreshCaptcha = () => {
  if (!contactForm) return;

  // Generate two new random numbers between 1 and 10
  const newA = Math.floor(Math.random() * 10) + 1;
  const newB = Math.floor(Math.random() * 10) + 1;

  // Update the hidden inputs so the server gets the new math
  const inputA = contactForm.querySelector('input[name="math_a"]');
  const inputB = contactForm.querySelector('input[name="math_b"]');
  if (inputA) inputA.value = newA;
  if (inputB) inputB.value = newB;

  // Update the visual label (Find the <strong> tag)
  const labelStrong = contactForm.querySelector('.captcha-label strong');
  if (labelStrong) {
    labelStrong.innerText = `${newA} + ${newB}`;
  }

  // Clear the user's old answer
  const answerInput = contactForm.querySelector('input[name="math_answer"]');
  if (answerInput) {
    answerInput.value = '';
    answerInput.placeholder = '?';
  }
};

// --- 2. Auto-Clear Placeholder Logic ---
const captchaInput = document.querySelector('.captcha-input');
if (captchaInput) {
  captchaInput.addEventListener('focus', function() {
    this.placeholder = '';
  });
  captchaInput.addEventListener('blur', function() {
    this.placeholder = '?';
  });
}

// --- 3. Button State Management ---
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

// --- 4. Dual-Purpose Modal Controller ---
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

// --- 5. Form Submission Handler ---
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setButtonLoading(true);

    const formData = {
      name: contactForm.querySelector('input[name="name"]').value,
      email: contactForm.querySelector('input[name="email"]').value,
      phone: contactForm.querySelector('input[name="phone"]').value,
      partnerType: contactForm.querySelector('select[name="partnerType"]').value,
      business: contactForm.querySelector('input[name="business"]').value,
      message: contactForm.querySelector('textarea[name="message"]').value,
      honeypot: document.getElementById('honeypot').value,
      math_a: contactForm.querySelector('input[name="math_a"]').value,
      math_b: contactForm.querySelector('input[name="math_b"]').value,
      math_answer: contactForm.querySelector('input[name="math_answer"]').value,
    };

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
          refreshCaptcha(); // <--- NEW CAPTCHA ON SUCCESS
        } else if (data === 'captcha_error') {
          showStatusModal('error', 'Math Error', 'The security check answer was incorrect. Please try again.');
          refreshCaptcha(); // <--- NEW CAPTCHA ON ERROR (Force them to try again)
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
}