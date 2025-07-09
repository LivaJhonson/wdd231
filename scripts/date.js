// scripts/date.js
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set current year in the footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamically set last modified date in the footer
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        // document.lastModified returns a string like "MM/DD/YYYY HH:MM:SS"
        // No complex manipulation needed as per instructions.
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }
});