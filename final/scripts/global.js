import { applyTheme, setupThemeToggle } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Apply and setup the theme toggle on all pages
    applyTheme();
    setupThemeToggle();
});