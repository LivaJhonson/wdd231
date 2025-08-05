// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Last Visit Date Logic (localStorage) ---
    const visitMessageDiv = document.getElementById('visit-message');
    const lastVisit = Number(localStorage.getItem('lastVisitTimestamp'));
    const now = Date.now();
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day

    if (lastVisit) {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / oneDay);
        if (daysSinceLastVisit < 1) {
            visitMessageDiv.textContent = 'Back so soon! Awesome!';
        } else if (daysSinceLastVisit === 1) {
            visitMessageDiv.textContent = 'You last visited 1 day ago.';
        } else {
            visitMessageDiv.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    } else {
        visitMessageDiv.textContent = 'Welcome! Let us know if you have any questions.';
    }

    // Save the current timestamp for the next visit
    localStorage.setItem('lastVisitTimestamp', now);

    // --- Dynamic Card Generation from JSON ---
    const discoverGridContainer = document.getElementById('discover-grid-container');
    const jsonUrl = 'data/discover.json';

    async function loadDiscoverItems() {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const items = await response.json();
            createDiscoverCards(items);
        } catch (error) {
            console.error('Error fetching discover data:', error);
            discoverGridContainer.innerHTML = '<p>Error loading discover items. Please try again later.</p>';
        }
    }

   // scripts/discover.js

// ... (existing code for localStorage is fine, no changes needed there) ...

function createDiscoverCards(items) {
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        // Create the figure for the image
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.loading = 'lazy';
        figure.appendChild(img);

        // Create a container for the text content
        const textContainer = document.createElement('div');
        textContainer.classList.add('discover-card-text-content');

        const h2 = document.createElement('h2');
        h2.textContent = item.name;

        const address = document.createElement('address');
        address.textContent = item.address;

        const description = document.createElement('p');
        description.textContent = item.description;

        const learnMoreBtn = document.createElement('a');
        learnMoreBtn.href = item.buttonUrl;
        learnMoreBtn.textContent = 'Learn More';
        learnMoreBtn.classList.add('btn-secondary');

        // Append text elements to the new container
        textContainer.appendChild(h2);
        textContainer.appendChild(address);
        textContainer.appendChild(description);
        textContainer.appendChild(learnMoreBtn);

        // Append the image and the text container to the card
        card.appendChild(figure);
        card.appendChild(textContainer);

        discoverGridContainer.appendChild(card);
    });
}
    loadDiscoverItems();

});