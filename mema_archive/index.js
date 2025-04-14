document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
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
}