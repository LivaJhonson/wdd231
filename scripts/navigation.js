// scripts/navigation.js
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mainNav = document.getElementById('main-nav');

    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Change hamburger icon to 'X' and back
            menuButton.textContent = mainNav.classList.contains('open') ? '✖' : '☰';
        });

        // Optional: Close menu when a nav link is clicked (useful for single-page sites or quick navigation)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close menu if on a small screen (where hamburger is active)
                if (window.innerWidth < 768) { // Matches the min-width in larger.css
                    mainNav.classList.remove('open');
                    menuButton.textContent = '☰';
                }
            });
        });
    }
});