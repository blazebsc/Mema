// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', () => {
    const passwordField = document.getElementById('password_field');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
  });
  
  // Form validation and submission
  document.querySelector('.form_container').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default submission
  
    const emailField = document.getElementById('email_field');
    const passwordField = document.getElementById('password_field');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
  
    let isValid = true;
  
    // Email validation
    if (!emailField.value.includes('@')) {
      emailError.style.display = 'block';
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      emailError.style.display = 'none';
    }
  
    // Password validation
    if (passwordField.value.length < 6) {
      passwordError.style.display = 'block';
      passwordError.textContent = 'Password must be at least 6 characters.';
      isValid = false;
    } else {
      passwordError.style.display = 'none';
    }
  
    if (isValid) {
      const btnText = document.getElementById('btn-text');
      const spinner = document.getElementById('spinner');
  
      btnText.style.display = 'none';
      spinner.style.display = 'block';
  
      // Simulate form submission delay
      setTimeout(() => {
        alert('Form submitted successfully!');
        btnText.style.display = 'block';
        spinner.style.display = 'none';
      }, 2000);
    }
  });
  