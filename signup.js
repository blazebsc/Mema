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

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        alert('Username already exists!');
        return;
    }
    
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    window.location.href = 'login.html';
}