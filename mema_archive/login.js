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
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'app.html';
    } else {
        alert('Invalid username or password!');
    }
}