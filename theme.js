document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const toggleCheckbox = document.getElementById('dark-mode-checkbox');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if (toggleCheckbox) toggleCheckbox.checked = true;
    }

    // Listen for changes
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            document.documentElement.classList.toggle('dark');
            const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    }
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}