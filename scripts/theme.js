export function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
}

export function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '☀️'; // Sun emoji for light mode
    
    // Check for the initial theme and set the correct icon
    const initialTheme = localStorage.getItem('theme') || 'light';
    if (initialTheme === 'dark-mode') {
        themeToggle.innerHTML = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.className;
        if (currentTheme === 'dark-mode') {
            document.body.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
            themeToggle.innerHTML = '☀️';
        } else {
            document.body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.innerHTML = '🌙';
        }
    });
    
    // Add the toggle button to the header before the menu toggle
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    if (header && menuToggle) {
        header.insertBefore(themeToggle, menuToggle);
    }
}