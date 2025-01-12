document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const toggleCheckbox = document.getElementById('dark-mode-checkbox');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (toggleCheckbox) toggleCheckbox.checked = true;
    }

    // Listen for changes
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // Only check auth on app.html
    const currentPage = window.location.pathname;
    if (currentPage.includes('app.html')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');

        if (!isLoggedIn || !username) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('username').textContent = username;
        }
    }
});

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', () => {
    const passwordField = document.getElementById('password_field');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
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