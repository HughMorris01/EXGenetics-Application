// Contact Form
const contactForm = document.querySelector('.contact-form');
const senderName = document.getElementById('name');
const senderEmail = document.getElementById('email');
const senderSubject = document.getElementById('subject');
const senderMessage = document.getElementById('message');
const inputs = document.querySelectorAll('.form-input');
const submitButton = document.getElementById('submit-btn');
let sentMessages = 0;
let errorMessages = 0;

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validate() === false) {
    return;
  }

  let formData = {
    name: senderName.value,
    email: senderEmail.value,
    subject: senderSubject.value,
    message: senderMessage.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/contact', true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    if (xhr.responseText === 'success') {
      if (sentMessages === 0) {
        document.querySelector('#success').innerHTML =
          "<h4 class='message-sent'>Thank you, we'll be in touch shortly.</h4>";
      } else if (sentMessages === 1) {
        document.querySelector('#success').innerHTML =
          "<h4 class='message-sent'>Thank you. We've received your message, again. &#128513;</h4>";
      } else {
        document.querySelector('#success').innerHTML =
          "<h4 class='message-sent'>Three is the limit, please try again later &#128526;</h4>";
        senderName.disabled = true;
        senderEmail.disabled = true;
        senderSubject.disabled = true;
        senderMessage.disabled = true;
        submitButton.disabled = true;
        submitButton.classList.add('disable-btn');
      }
      senderName.value = '';
      senderEmail.value = '';
      senderSubject.value = '';
      senderMessage.value = '';
      submitButton.style.border = 'none';

      sentMessages++;
    } else {
      if (errorMessages === 0) {
        document.querySelector('#success').innerHTML =
          "<h4 class='message-sent'>Uh, oh. Something went wrong.......</h4>";
        errorMessages++;
      } else {
        document.querySelector('#success').innerHTML =
          "<h4 class='message-sent'>There must be an issue, please try again later.</h4>";
      }
      senderName.value = '';
      senderEmail.value = '';
      senderSubject.value = '';
      senderMessage.value = '';
    }
  };
  xhr.send(JSON.stringify(formData));
});

const validate = () => {
  if (senderName.value === '') {
    document.getElementById('name-validation').innerHTML =
      'Please enter your name before submitting';
    senderName.classList.add('validation-failed');
    return false;
  }
  if (senderEmail.value === '') {
    document.getElementById('email-validation').innerHTML =
      'Please enter your email before submitting';
    senderEmail.classList.add('validation-failed');
    return false;
  }
  if (senderSubject.value === '') {
    document.getElementById('subject-validation').innerHTML =
      'Please enter a subject before submitting';
    senderSubject.classList.add('validation-failed');
    return false;
  }
  if (senderMessage.value === '') {
    document.getElementById('message-validation').innerHTML =
      'A message must be entered before submitting';
    senderMessage.classList.add('validation-failed');
    return false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    input.classList.remove('validation-failed');
    input.nextElementSibling.innerHTML = '';
  });
});
// End of Contact Form
