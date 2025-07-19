document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // Last modified date for footer
    document.getElementById('lastmodified').textContent = document.lastModified;

    // Hamburger menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }

    // Directory Page Specific Functionality
    const memberDisplay = document.querySelector('.member-display');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');

    let membersData = []; // To store fetched member data

    async function getMembers() {
        // Corrected path: Go up one level (from 'scripts/') to 'chamber/', then into 'data/' to find 'members.json'
        const url = '../data/members.json';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers(membersData); // Display in default (grid) view
        } catch (error) {
            console.error('Error loading member data:', error);
            if (memberDisplay) {
                memberDisplay.innerHTML = '<p>Error loading member data. Please try again later.</p>';
            }
        }
    }

    function displayMembers(members, view = 'grid') {
        if (!memberDisplay) return;

        memberDisplay.innerHTML = ''; // Clear existing content
        memberDisplay.classList.remove('grid-view', 'list-view');
        memberDisplay.classList.add(`${view}-view`);

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');

            // Create elements for member data
            const img = document.createElement('img');
            // Path to images folder relative to directory.html (which is in 'chamber/')
            img.src = `images/${member.image}`;
            img.alt = `${member.name} logo`;
            img.loading = 'lazy'; // Lazy load images

            const name = document.createElement('h3');
            name.textContent = member.name;

            const address = document.createElement('p');
            address.classList.add('member-address');
            address.textContent = member.address;

            const phone = document.createElement('p');
            phone.classList.add('member-phone');
            phone.textContent = member.phone;

            const website = document.createElement('a');
            website.classList.add('member-website');
            website.href = member.website;
            website.textContent = 'Website';
            website.target = '_blank'; // Open in new tab

            const membershipLevel = document.createElement('p');
            membershipLevel.classList.add('member-membership');
            membershipLevel.textContent = `Membership: ${member.membershipLevel}`;

            const otherInfo = document.createElement('p');
            otherInfo.classList.add('member-other-info');
            otherInfo.textContent = member.otherInfo;

            // Append elements to the card
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(membershipLevel);
            card.appendChild(otherInfo);

            memberDisplay.appendChild(card);
        });
    }

    // View Toggle Buttons
    if (gridViewBtn && listViewBtn && memberDisplay) {
        gridViewBtn.addEventListener('click', () => {
            displayMembers(membersData, 'grid');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            displayMembers(membersData, 'list');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });

        // Set initial active state
        gridViewBtn.classList.add('active'); // Grid view is default
    }

    // Call the function to load members when the page loads
    if (memberDisplay) { // Only call if on the directory page
        getMembers();
    }
});